from datetime import datetime, timedelta
from typing import List, Dict

def classify_status(events: List[Dict]) -> Dict:
    """
    Classifies a business as Active, Dormant, or Closed based on events.
    Events should have 'event_date' and 'event_type'.
    """
    if not events:
        return {"status": "Closed", "reason": "No activity records found."}

    # Sort events by date descending
    sorted_events = sorted(events, key=lambda x: x['event_date'], reverse=True)
    latest_event = sorted_events[0]
    last_date = latest_event['event_date']
    
    now = datetime.utcnow()
    days_since_last = (now - last_date).days

    # Thresholds
    ACTIVE_THRESHOLD = 90  # 3 months
    DORMANT_THRESHOLD = 365 # 1 year

    if days_since_last <= ACTIVE_THRESHOLD:
        status = "Active"
        reason = f"Recent activity detected ({latest_event['event_type']} on {last_date.date()})."
    elif days_since_last <= DORMANT_THRESHOLD:
        status = "Dormant"
        reason = f"No activity in {days_since_last} days. Last activity: {latest_event['event_type']}."
    else:
        status = "Closed"
        reason = f"No activity for over a year. Last seen: {last_date.date()}."

    # Additional logic: Frequency
    recent_events_count = len([e for e in events if (now - e['event_date']).days <= 365])
    if status == "Active" and recent_events_count < 2:
        # Maybe it's becoming dormant?
        pass

    return {
        "status": status,
        "reason": reason,
        "last_activity": last_date,
        "event_count_1yr": recent_events_count
    }
