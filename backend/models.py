from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class BusinessRecord(Base):
    __tablename__ = "business_records"

    id = Column(Integer, primary_key=True, index=True)
    source_system = Column(String)  # e.g., 'GST', 'MCA', 'Municipal'
    source_id = Column(String)      # ID in the original system
    business_name = Column(String)
    address = Column(Text)
    gstin = Column(String, nullable=True)
    pan = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    owner_name = Column(String, nullable=True)
    
    # Normalized fields for matching
    norm_name = Column(String, index=True)
    norm_address = Column(Text)
    
    ubid = Column(String, ForeignKey("ubid_clusters.ubid"), nullable=True)
    cluster = relationship("UBIDCluster", back_populates="records")

class UBIDCluster(Base):
    __tablename__ = "ubid_clusters"

    ubid = Column(String, primary_key=True, index=True)
    primary_name = Column(String)
    status = Column(String, default="Active")  # Active, Dormant, Closed
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)
    
    records = relationship("BusinessRecord", back_populates="cluster")
    activity_events = relationship("ActivityEvent", back_populates="cluster")

class ActivityEvent(Base):
    __tablename__ = "activity_events"

    id = Column(Integer, primary_key=True, index=True)
    ubid = Column(String, ForeignKey("ubid_clusters.ubid"))
    event_type = Column(String)  # Inspection, Renewal, Compliance, Electricity
    event_date = Column(DateTime)
    description = Column(Text)
    value = Column(Float, nullable=True)  # e.g., usage value
    
    cluster = relationship("UBIDCluster", back_populates="activity_events")

class ReviewLog(Base):
    __tablename__ = "review_logs"

    id = Column(Integer, primary_key=True, index=True)
    record_a_id = Column(Integer)
    record_b_id = Column(Integer)
    confidence_score = Column(Float)
    decision = Column(String)  # Approved, Rejected, Merged
    reviewer_notes = Column(Text)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class ConfidenceScore(Base):
    __tablename__ = "confidence_scores"

    id = Column(Integer, primary_key=True, index=True)
    record_a_id = Column(Integer)
    record_b_id = Column(Integer)
    score = Column(Float)
    explanation = Column(JSON)  # Breakdown of scores

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Integer, default=1)

class OTPStore(Base):
    __tablename__ = "otp_store"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    otp = Column(String)
    expires_at = Column(DateTime)
