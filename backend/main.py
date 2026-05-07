from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict
import uuid
import datetime
from contextlib import asynccontextmanager
import uvicorn
import random
import os

from models import Base, BusinessRecord, UBIDCluster, ActivityEvent, ReviewLog, ConfidenceScore, User, OTPStore
from matching_engine import calculate_confidence, get_match_action
from graph_service import GraphService
from activity_analyzer import classify_status
from seed_data import generate_mock_data, generate_activity_events
from auth_service import get_password_hash, verify_password, create_access_token
from pydantic import BaseModel, EmailStr

# Pydantic Schemas
class UserSignup(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class OTPVerify(BaseModel):
    email: EmailStr
    otp: str

class ForgotPasswordReq(BaseModel):
    email: EmailStr

class ResetPasswordReq(BaseModel):
    email: EmailStr
    otp: str
    new_password: str

# SQLAlchemy setup
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Use SQLite by default for easier local setup, switch to Postgres via ENV
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./trustgraph.db")

# SQLite needs special handling for concurrent access in some cases
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown logic can go here

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="UBID System API", lifespan=lifespan)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "UBID System API is running"}

@app.post("/seed")
def seed_database(db: Session = Depends(get_db)):
    # 1. Clear existing
    db.query(ActivityEvent).delete()
    db.query(BusinessRecord).delete()
    db.query(UBIDCluster).delete()
    db.query(ConfidenceScore).delete()
    db.query(ReviewLog).delete()
    
    # 2. Add records
    mock_records = generate_mock_data()
    for rec in mock_records:
        db_rec = BusinessRecord(**rec)
        db.add(db_rec)
    db.commit()
    return {"status": "Database seeded with mock records"}

@app.post("/process-links")
def process_links(db: Session = Depends(get_db)):
    records = db.query(BusinessRecord).all()
    gs = GraphService()
    gs.clear_graph()
    
    # Add all nodes to graph
    for r in records:
        gs.add_record_node(r.id, r.business_name)
    
    # Compare all pairs
    for i in range(len(records)):
        for j in range(i + 1, len(records)):
            res = calculate_confidence(records[i].__dict__, records[j].__dict__)
            score = res['score']
            action = get_match_action(score)
            
            if action == "AUTO_LINK":
                gs.add_match_edge(records[i].id, records[j].id, score)
            
            cs = ConfidenceScore(
                record_a_id=records[i].id,
                record_b_id=records[j].id,
                score=score,
                explanation=res['breakdown']
            )
            db.add(cs)
    
    db.commit()
    clusters = gs.get_clusters()
    
    ubid_map = {}
    for entry in clusters:
        r_id = entry['record_id']
        c_id = str(entry['cluster_id'])
        
        if c_id not in ubid_map:
            ubid = f"UBID-{uuid.uuid4().hex[:8].upper()}"
            new_cluster = UBIDCluster(ubid=ubid, primary_name="Pending...")
            db.add(new_cluster)
            ubid_map[c_id] = ubid
        
        rec = db.query(BusinessRecord).filter(BusinessRecord.id == r_id).first()
        rec.ubid = ubid_map[c_id]
    
    db.commit()
    all_clusters = db.query(UBIDCluster).all()
    for cluster in all_clusters:
        first_rec = cluster.records[0] if cluster.records else None
        if first_rec:
            cluster.primary_name = first_rec.business_name
        if not cluster.activity_events:
            events = generate_activity_events(cluster.ubid)
            for e in events:
                db.add(ActivityEvent(**e))
    
    db.commit()
    gs.close()
    return {"status": "Linking process complete", "clusters_found": len(all_clusters)}

@app.get("/dashboard-data")
def get_dashboard_data(db: Session = Depends(get_db)):
    clusters = db.query(UBIDCluster).all()
    result = []
    for c in clusters:
        events = [{"event_date": e.event_date, "event_type": e.event_type} for e in c.activity_events]
        status_info = classify_status(events)
        result.append({
            "ubid": c.ubid,
            "name": c.primary_name,
            "status": status_info['status'],
            "status_reason": status_info['reason'],
            "record_count": len(c.records),
            "records": [
                {
                    "source": r.source_system,
                    "name": r.business_name,
                    "gstin": r.gstin,
                    "pan": r.pan,
                    "address": r.address
                } for r in c.records
            ]
        })
    return result

@app.get("/review-matches")
def get_review_matches(db: Session = Depends(get_db)):
    matches = db.query(ConfidenceScore).filter(ConfidenceScore.score >= 0.5, ConfidenceScore.score < 0.85).all()
    result = []
    for m in matches:
        rec_a = db.query(BusinessRecord).filter(BusinessRecord.id == m.record_a_id).first()
        rec_b = db.query(BusinessRecord).filter(BusinessRecord.id == m.record_b_id).first()
        result.append({
            "id": m.id,
            "score": m.score,
            "explanation": m.explanation,
            "record_a": rec_a,
            "record_b": rec_b
        })
    return result

@app.post("/submit-review")
def submit_review(review_id: int, decision: str, db: Session = Depends(get_db)):
    score_rec = db.query(ConfidenceScore).filter(ConfidenceScore.id == review_id).first()
    if not score_rec:
        raise HTTPException(status_code=404, detail="Review item not found")
    log = ReviewLog(record_a_id=score_rec.record_a_id, record_b_id=score_rec.record_b_id, confidence_score=score_rec.score, decision=decision)
    db.add(log)
    if decision == 'APPROVE':
        rec_a = db.query(BusinessRecord).filter(BusinessRecord.id == score_rec.record_a_id).first()
        rec_b = db.query(BusinessRecord).filter(BusinessRecord.id == score_rec.record_b_id).first()
        rec_b.ubid = rec_a.ubid
    db.commit()
    return {"status": "Review processed"}

@app.post("/auth/signup")
def signup(data: UserSignup, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(email=data.email, hashed_password=get_password_hash(data.password), full_name=data.full_name)
    db.add(new_user)
    db.commit()
    return {"status": "User created successfully"}

@app.post("/auth/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Issue token immediately (OTP removed as requested)
    access_token = create_access_token(data={"sub": user.email})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "user": {"email": user.email, "full_name": user.full_name}
    }

@app.post("/auth/forgot-password")
def forgot_password(data: ForgotPasswordReq, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    otp = str(random.randint(100000, 999999))
    expires_at = datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
    otp_entry = OTPStore(email=data.email, otp=otp, expires_at=expires_at)
    db.add(otp_entry)
    db.commit()
    print(f"DEBUG: OTP for {data.email} is {otp}")
    return {"status": "OTP sent to email (simulated)"}

@app.post("/auth/verify-otp")
def verify_otp(data: OTPVerify, db: Session = Depends(get_db)):
    entry = db.query(OTPStore).filter(OTPStore.email == data.email, OTPStore.otp == data.otp).first()
    if not entry or entry.expires_at < datetime.datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
         raise HTTPException(status_code=404, detail="User not found")

    # Generate token after OTP verification
    access_token = create_access_token(data={"sub": user.email})
    
    # Cleanup OTP
    db.delete(entry)
    db.commit()
    
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "user": {"email": user.email, "full_name": user.full_name}
    }

@app.post("/auth/reset-password")
def reset_password(data: ResetPasswordReq, db: Session = Depends(get_db)):
    entry = db.query(OTPStore).filter(OTPStore.email == data.email, OTPStore.otp == data.otp).first()
    if not entry or entry.expires_at < datetime.datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    user = db.query(User).filter(User.email == data.email).first()
    user.hashed_password = get_password_hash(data.new_password)
    db.delete(entry)
    db.commit()
    return {"status": "Password reset successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
