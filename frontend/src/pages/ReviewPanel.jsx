import React, { useState, useEffect } from 'react';
import { Check, X, Info, Layers } from 'lucide-react';
import { DataService } from '../services/dataService';

const ReviewPanel = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMatches = () => {
    setLoading(true);
    const result = DataService.getReviewMatches();
    setMatches(result);
    setLoading(false);
  };

  const handleDecision = (id, decision) => {
    DataService.submitReview(id, decision);
    fetchMatches();
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Human Review Panel</h1>
        <p style={{ color: 'var(--text-muted)' }}>Review records with medium confidence scores (50% - 85%). Your decisions will improve the system's matching accuracy.</p>
      </div>

      {matches.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <Layers size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>No matches pending review</h3>
          <p style={{ color: 'var(--text-muted)' }}>All records have been automatically linked or processed.</p>
        </div>
      ) : (
        <div className="grid">
          {matches.map(m => (
            <div key={m.id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'var(--warning)', color: 'black', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 'bold' }}>
                    {Math.round(m.score * 100)}% Match
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>Record Comparison ID: #{m.id}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={() => handleDecision(m.id, 'REJECT')}>
                    <X size={18} /> Reject
                  </button>
                  <button className="btn btn-primary" style={{ background: 'var(--success)' }} onClick={() => handleDecision(m.id, 'APPROVE')}>
                    <Check size={18} /> Approve Merge
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Record A ({m.record_a.source_system})</h4>
                  <p><strong>Name:</strong> {m.record_a.business_name}</p>
                  <p><strong>Address:</strong> {m.record_a.address}</p>
                  <p><strong>GSTIN:</strong> {m.record_a.gstin || 'N/A'}</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Record B ({m.record_b.source_system})</h4>
                  <p><strong>Name:</strong> {m.record_b.business_name}</p>
                  <p><strong>Address:</strong> {m.record_b.address}</p>
                  <p><strong>GSTIN:</strong> {m.record_b.gstin || 'N/A'}</p>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Info size={16} color="var(--primary)" />
                  <strong>Matching Breakdown</strong>
                </div>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
                  {Object.entries(m.explanation).map(([field, score]) => (
                    <div key={field}>
                      <span style={{ textTransform: 'capitalize' }}>{field}:</span> 
                      <span style={{ marginLeft: '0.5rem', color: score > 0.8 ? 'var(--success)' : 'var(--warning)' }}>
                        {Math.round(score * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewPanel;
