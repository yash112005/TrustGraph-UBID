import React from 'react';
import { Bell } from 'lucide-react';

const AlertCenter = () => {
  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <div style={styles.badgeContainer}>
          <div style={styles.badge}>
            <Bell size={16} />
            <span style={styles.dot} />
          </div>
          <span style={styles.label}>Alert Center</span>
        </div>
        <div style={styles.ticker}>
          <div style={styles.tickerContent}>
            SYSTEM NOTIFICATION: Integrity scan completed for Belagavi district • 
            4 new high-risk entities flagged in retail sector • 
            API response time within normal parameters (124ms) • 
            Neo4j relationship indexing in progress (84% complete)
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: 'var(--sidebar-width)',
    right: 0,
    height: '60px',
    backgroundColor: '#070b16',
    borderTop: '1px solid var(--border)',
    zIndex: 1000,
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    width: '100%',
  },
  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '160px',
  },
  badge: {
    position: 'relative',
    color: 'var(--danger)',
    display: 'flex',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--danger)',
    borderRadius: '50%',
    border: '2px solid #070b16',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  ticker: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  tickerContent: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    whiteSpace: 'nowrap',
    animation: 'tickerMove 30s linear infinite',
  }
};

// Add keyframes directly in a style tag since it's vanilla CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes tickerMove {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`;
document.head.appendChild(styleSheet);

export default AlertCenter;
