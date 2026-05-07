import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';

const BusinessCard = ({ business }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return { background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' };
      case 'Dormant': return { background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' };
      default: return { background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
    }
  };

  return (
    <div className="glass-card" style={styles.card}>
      <div style={styles.header}>
        <h4 style={styles.name}>{business.name}</h4>
        <div style={{ ...styles.badge, ...getStatusStyle(business.status) }}>
          {business.status}
        </div>
      </div>
      
      <p style={styles.ubid}>UBID: {business.ubid}</p>
      
      <div style={styles.scoreRow}>
        <span style={styles.label}>Trust Score</span>
        <div style={{ ...styles.scoreBadge, color: getScoreColor(business.trustScore), borderColor: getScoreColor(business.trustScore) }}>
          {business.trustScore}
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.meta}>
          <MapPin size={14} />
          <span>{business.location}</span>
        </div>
        <div style={styles.meta}>
          <Briefcase size={14} />
          <span>{business.industry}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#fff',
  },
  badge: {
    fontSize: '0.7rem',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  ubid: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontFamily: 'monospace',
  },
  scoreRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
  },
  label: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  scoreBadge: {
    fontSize: '1rem',
    fontWeight: '800',
    padding: '2px 8px',
    border: '1px solid',
    borderRadius: '4px',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  }
};

export default BusinessCard;
