import random
from datetime import datetime, timedelta
from matching_engine import normalize_text

def generate_mock_data():
    base_businesses = [
        {
            "name": "Reliance Industries Limited",
            "address": "Maker Chambers IV, Nariman Point, Mumbai, Maharashtra 400021",
            "gstin": "27AAACR4849L1ZJ",
            "pan": "AAACR4849L"
        },
        {
            "name": "Tata Consultancy Services",
            "address": "TCS House, Raveline Street, Fort, Mumbai 400001",
            "gstin": "27AAACT2727C1Z1",
            "pan": "AAACT2727C"
        },
        {
            "name": "Infosys Limited",
            "address": "Electronics City, Hosur Road, Bengaluru 560100",
            "gstin": "29AAACI4040P1Z2",
            "pan": "AAACI4040P"
        }
    ]

    records = []
    
    # Generate variations
    for i, base in enumerate(base_businesses):
        # 1. Exact match record (GST Dept)
        records.append({
            "source_system": "GST",
            "source_id": f"GST_{i}",
            "business_name": base["name"],
            "address": base["address"],
            "gstin": base["gstin"],
            "pan": base["pan"],
            "norm_name": normalize_text(base["name"]),
            "norm_address": normalize_text(base["address"])
        })
        
        # 2. Slight variation (MCA Dept) - Missing PAN/GST, minor name diff
        var_name = base["name"].replace("Limited", "Ltd")
        records.append({
            "source_system": "MCA",
            "source_id": f"MCA_{i}",
            "business_name": var_name,
            "address": base["address"].lower(),
            "gstin": None,
            "pan": base["pan"],
            "norm_name": normalize_text(var_name),
            "norm_address": normalize_text(base["address"])
        })

        # 3. Fuzzy match (Municipal Dept) - Inconsistent address, partial name
        fuzzy_name = base["name"].split()[0] + " " + base["name"].split()[1]
        fuzzy_addr = base["address"].split(",")[0] + ", Mumbai"
        records.append({
            "source_system": "Municipal",
            "source_id": f"MUN_{i}",
            "business_name": fuzzy_name,
            "address": fuzzy_addr,
            "gstin": None,
            "pan": None,
            "norm_name": normalize_text(fuzzy_name),
            "norm_address": normalize_text(fuzzy_addr)
        })

    # Add some random unconnected businesses
    for j in range(5):
        name = f"Small Shop {j}"
        addr = f"Street {j}, Locality X, 40000{j}"
        records.append({
            "source_system": "GST",
            "source_id": f"GST_S_{j}",
            "business_name": name,
            "address": addr,
            "gstin": f"27ABCDE{j}123F1Z{j}",
            "pan": f"ABCDE{j}123F",
            "norm_name": normalize_text(name),
            "norm_address": normalize_text(addr)
        })

    return records

def generate_activity_events(ubid):
    event_types = ["Inspection", "Renewal", "Tax Filing", "Electricity Bill"]
    events = []
    
    # 70% chance of being active
    is_active = random.random() < 0.7
    
    if is_active:
        num_events = random.randint(3, 10)
        base_date = datetime.utcnow()
    else:
        num_events = random.randint(1, 3)
        base_date = datetime.utcnow() - timedelta(days=random.randint(400, 800))

    for _ in range(num_events):
        event_date = base_date - timedelta(days=random.randint(0, 365))
        events.append({
            "ubid": ubid,
            "event_type": random.choice(event_types),
            "event_date": event_date,
            "description": f"Standard {random.choice(event_types)} process completed.",
            "value": random.uniform(100, 5000)
        })
    return events
