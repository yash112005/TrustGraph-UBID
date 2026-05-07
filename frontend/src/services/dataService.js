import { partial_ratio, token_sort_ratio } from 'fuzzball';

const STORAGE_KEYS = {
  RECORDS: 'ubid_records',
  CLUSTERS: 'ubid_clusters',
  EVENTS: 'ubid_events',
  SCORES: 'ubid_scores',
  USERS: 'ubid_users',
  SESSION: 'ubid_session'
};

// --- Normalization ---
const normalize = (text) => {
  if (!text) return "";
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
};

// --- Data Management ---
export const DataService = {
  // Initialize with mock data if empty
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.RECORDS)) {
      DataService.seed();
    }
  },

  seed: () => {
    const baseBusinesses = [
      { id: 1, name: "Reliance Industries Limited", address: "Maker Chambers IV, Nariman Point, Mumbai, Maharashtra 400021", gstin: "27AAACR4849L1ZJ", pan: "AAACR4849L" },
      { id: 2, name: "Tata Consultancy Services", address: "TCS House, Raveline Street, Fort, Mumbai 400001", gstin: "27AAACT2727C1Z1", pan: "AAACT2727C" },
      { id: 3, name: "Infosys Limited", address: "Electronics City, Hosur Road, Bengaluru 560100", gstin: "29AAACI4040P1Z2", pan: "AAACI4040P" }
    ];

    let records = [];
    baseBusinesses.forEach((base, i) => {
      // GST Dept (Exact)
      records.push({
        id: `R${records.length + 1}`,
        source_system: 'GST',
        business_name: base.name,
        address: base.address,
        gstin: base.gstin,
        pan: base.pan,
        ubid: null
      });
      // MCA Dept (Slight var)
      records.push({
        id: `R${records.length + 1}`,
        source_system: 'MCA',
        business_name: base.name.replace("Limited", "Ltd"),
        address: base.address.toLowerCase(),
        gstin: null,
        pan: base.pan,
        ubid: null
      });
      // Municipal (Fuzzy)
      records.push({
        id: `R${records.length + 1}`,
        source_system: 'Municipal',
        business_name: base.name.split(" ")[0] + " " + (base.name.split(" ")[1] || ""),
        address: base.address.split(",")[0] + ", Mumbai",
        gstin: null,
        pan: null,
        ubid: null
      });
    });

    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
    localStorage.removeItem(STORAGE_KEYS.CLUSTERS);
    localStorage.removeItem(STORAGE_KEYS.SCORES);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
  },

  // --- Matching Engine ---
  calculateConfidence: (rec1, rec2) => {
    const weights = { gstin: 0.6, pan: 0.5, name: 0.3, address: 0.2 };
    let score = 0;
    let breakdown = {};

    if (rec1.gstin && rec2.gstin) {
      breakdown.gstin = rec1.gstin === rec2.gstin ? 1 : 0;
      score += breakdown.gstin * weights.gstin;
    }

    if (rec1.pan && rec2.pan) {
      breakdown.pan = rec1.pan === rec2.pan ? 1 : 0;
      score += breakdown.pan * weights.pan;
    }

    const nameSim = token_sort_ratio(normalize(rec1.business_name), normalize(rec2.business_name)) / 100;
    breakdown.name = nameSim;
    score += nameSim * weights.name;

    const addrSim = partial_ratio(normalize(rec1.address), normalize(rec2.address)) / 100;
    breakdown.address = addrSim;
    score += addrSim * weights.address;

    return { score: Math.min(score, 1), breakdown };
  },

  // --- Graph Clustering (Connected Components) ---
  runLinking: () => {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECORDS));
    const edges = [];
    const scores = [];

    for (let i = 0; i < records.length; i++) {
      for (let j = i + 1; j < records.length; j++) {
        const result = DataService.calculateConfidence(records[i], records[j]);
        if (result.score >= 0.85) {
          edges.push([records[i].id, records[j].id]);
        }
        if (result.score >= 0.5) {
          scores.push({
            id: `S${scores.length + 1}`,
            record_a: records[i],
            record_b: records[j],
            score: result.score,
            explanation: result.breakdown
          });
        }
      }
    }

    // Find connected components
    const adj = {};
    records.forEach(r => adj[r.id] = []);
    edges.forEach(([u, v]) => {
      adj[u].push(v);
      adj[v].push(u);
    });

    const visited = new Set();
    const clusters = [];
    records.forEach(r => {
      if (!visited.has(r.id)) {
        const component = [];
        const queue = [r.id];
        visited.add(r.id);
        while (queue.length > 0) {
          const u = queue.shift();
          component.push(u);
          adj[u].forEach(v => {
            if (!visited.has(v)) {
              visited.add(v);
              queue.push(v);
            }
          });
        }
        const ubid = `UBID-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        clusters.push({
          ubid,
          name: records.find(rec => rec.id === component[0]).business_name,
          record_ids: component,
          status: Math.random() > 0.3 ? 'Active' : 'Dormant'
        });
      }
    });

    // Update records with UBIDs
    const updatedRecords = records.map(r => {
      const cluster = clusters.find(c => c.record_ids.includes(r.id));
      return { ...r, ubid: cluster.ubid };
    });

    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(updatedRecords));
    localStorage.setItem(STORAGE_KEYS.CLUSTERS, JSON.stringify(clusters));
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
    
    // Generate events for each cluster
    const events = [];
    clusters.forEach(c => {
      const numEvents = c.status === 'Active' ? 5 : 1;
      for (let k = 0; k < numEvents; k++) {
        events.push({
          ubid: c.ubid,
          type: ['Inspection', 'Tax Filing', 'Renewal'][Math.floor(Math.random() * 3)],
          date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
          desc: "Auto-generated activity log."
        });
      }
    });
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));

    return clusters;
  },

  getDashboardData: () => {
    const clusters = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLUSTERS) || '[]');
    const records = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECORDS) || '[]');
    const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');

    return clusters.map(c => ({
      ...c,
      record_count: c.record_ids.length,
      records: records.filter(r => r.ubid === c.ubid),
      events: events.filter(e => e.ubid === c.ubid),
      status_reason: c.status === 'Active' ? 'Recent activity detected in multiple departments.' : 'No activity reported in the last 12 months.'
    }));
  },

  getReviewMatches: () => {
    const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCORES) || '[]');
    // Only return those where records don't already have the same UBID
    const records = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECORDS) || '[]');
    return scores.filter(s => {
      const recA = records.find(r => r.id === s.record_a.id);
      const recB = records.find(r => r.id === s.record_b.id);
      return recA.ubid !== recB.ubid && s.score < 0.85;
    });
  },

  submitReview: (id, decision) => {
    const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCORES) || '[]');
    const records = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECORDS) || '[]');
    const match = scores.find(s => s.id === id);

    if (decision === 'APPROVE') {
      const recA = records.find(r => r.id === match.record_a.id);
      const recB = records.find(r => r.id === match.record_b.id);
      // Merge: Update all records with recB's UBID to recA's UBID
      const oldUbid = recB.ubid;
      const newUbid = recA.ubid;
      
      const updatedRecords = records.map(r => r.ubid === oldUbid ? { ...r, ubid: newUbid } : r);
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(updatedRecords));
      
      // Update clusters
      const clusters = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLUSTERS) || '[]');
      const clusterA = clusters.find(c => c.ubid === newUbid);
      const clusterB = clusters.find(c => c.ubid === oldUbid);
      if (clusterA && clusterB) {
        clusterA.record_ids = [...clusterA.record_ids, ...clusterB.record_ids];
        const updatedClusters = clusters.filter(c => c.ubid !== oldUbid);
        localStorage.setItem(STORAGE_KEYS.CLUSTERS, JSON.stringify(updatedClusters));
      }
    }
    
    const remainingScores = scores.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(remainingScores));
  }
};
