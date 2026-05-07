import re
from rapidfuzz import fuzz, process
from typing import Dict, Any, List

def normalize_text(text: str) -> str:
    if not text:
        return ""
    # Lowercase, remove special chars, remove extra whitespace
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', '', text)
    text = " ".join(text.split())
    return text

def calculate_confidence(rec1: Dict[str, Any], rec2: Dict[str, Any]) -> Dict[str, Any]:
    score_breakdown = {}
    total_score = 0
    weights = {
        'gstin': 0.6,
        'pan': 0.5,
        'name': 0.3,
        'address': 0.2,
        'phone': 0.1
    }

    # 1. GSTIN Match (Highest weight)
    if rec1.get('gstin') and rec2.get('gstin'):
        if rec1['gstin'] == rec2['gstin']:
            score_breakdown['gstin'] = 1.0
            total_score += weights['gstin']
        else:
            score_breakdown['gstin'] = 0.0

    # 2. PAN Match
    if rec1.get('pan') and rec2.get('pan'):
        if rec1['pan'] == rec2['pan']:
            score_breakdown['pan'] = 1.0
            total_score += weights['pan']
        else:
            score_breakdown['pan'] = 0.0

    # 3. Name Similarity
    name_sim = fuzz.token_sort_ratio(rec1['norm_name'], rec2['norm_name']) / 100.0
    score_breakdown['name'] = name_sim
    total_score += name_sim * weights['name']

    # 4. Address Similarity
    addr_sim = fuzz.token_sort_ratio(rec1['norm_address'], rec2['norm_address']) / 100.0
    score_breakdown['address'] = addr_sim
    total_score += addr_sim * weights['address']

    # 5. Phone Match
    if rec1.get('phone') and rec2.get('phone'):
        if rec1['phone'] == rec2['phone']:
            score_breakdown['phone'] = 1.0
            total_score += weights['phone']

    # Normalize total score to 0-1 range
    max_possible = sum(weights.values())
    final_score = min(total_score / 1.0, 1.0) # Cap at 1.0 for simplicity or use max_possible

    return {
        "score": final_score,
        "breakdown": score_breakdown
    }

def get_match_action(score: float):
    if score >= 0.85:
        return "AUTO_LINK"
    elif score >= 0.5:
        return "REVIEW"
    else:
        return "SEPARATE"
