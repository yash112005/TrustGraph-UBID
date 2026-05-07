import React from 'react';

const StatCard = ({ icon, title, value, subtitle, subtitleColor }) => {
  return (
    <div className="glass-card" style={styles.card}>
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            {icon}
          </div>
          <span style={styles.title}>{title}</span>
        </div>
        <div style={styles.body}>
          <h2 style={styles.value}>{value}</h2>
          <div style={{ ...styles.subtitle, color: subtitleColor }}>
            <span style={styles.trendIcon}>↑</span>
            {subtitle}
          </div>
        </div>
      </div>
      <div style={{ ...styles.glow, background: `radial-gradient(circle at top right, ${subtitleColor}22, transparent)` }} />
    </div>
  );
};

const styles = {
  card: {
    padding: '1.5rem',
    flex: 1,
    minWidth: '240px',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '1.25rem',
  },
  iconContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent)',
    border: '1px solid var(--border)',
  },
  title: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  value: {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  trendIcon: {
    fontSize: '1rem',
  },
  glow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  }
};

export default StatCard;
