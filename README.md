# UBID System for Business Linking & Activity Detection

This is a full-stack prototype for a government-focused system that unifies fragmented business records and monitors activity.

## Tech Stack
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (Relational Data)
- **Graph**: Neo4j (Entity Resolution & Clustering)
- **Frontend**: React.js (Vite, Axios, Lucide)
- **Containerization**: Docker & Docker Compose

## Prerequisites
- Docker & Docker Compose installed on your machine.

## How to Run

1. **Clone the project** (or navigate to the project directory).
2. **Start the infrastructure**:
   ```bash
   docker-compose up --build
   ```
3. **Access the Application**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:8000](http://localhost:8000)
   - **Neo4j Dashboard**: [http://localhost:7474](http://localhost:7474) (Login: neo4j / password)

## Steps to Demo
1. Go to the **Dashboard**.
2. Click **"Reset & Seed"**. This will generate messy synthetic data across different government departments.
3. Click **"Run Linking Engine"**. This triggers the fuzzy matching and Neo4j graph clustering logic.
4. Expand the rows to see linked records from different sources.
5. Check the **Review Panel** to see medium-confidence matches that require human approval.
6. Observe the **Activity Status** (Active/Dormant/Closed) which is calculated based on simulated event timelines.

## Features
- **Fuzzy Matching**: Uses `RapidFuzz` for name and address similarity.
- **Graph Clustering**: Uses Neo4j to find connected components (clusters) of records.
- **Explainable Decisions**: Every match shows a score breakdown.
- **Activity Detection**: Heuristic-based classification of business status.
