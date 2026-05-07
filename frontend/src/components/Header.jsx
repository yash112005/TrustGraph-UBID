import React from 'react';
import { Calendar } from 'lucide-react';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const firstName = user.full_name ? user.full_name.split(' ')[0] : 'Admin';

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>Welcome back, {firstName}</h2>
          <div style={styles.liveBadge}>
            <span className="pulse" style={styles.pulseDot} />
            LIVE
          </div>
        </div>
        <p style={styles.subtitle}>
          Real-time monitoring of <span style={styles.locationHighlight}>Karnataka's Business Ecosystem</span>
        </p>
      </div>
      <div style={styles.right}>
        <div style={styles.userSection}>
           <div style={styles.avatar}>
             {firstName[0]}
           </div>
           <div style={styles.timeCard}>
             <Calendar size={14} color="var(--accent)" />
             <span style={styles.lastUpdated}>Updated: just now</span>
           </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '6px',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-0.04em',
  },
  liveBadge: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    color: 'var(--danger)',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid rgba(244, 63, 94, 0.2)',
    letterSpacing: '0.05em',
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    backgroundColor: 'var(--danger)',
    borderRadius: '50%',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1rem',
    fontWeight: '500',
  },
  locationHighlight: {
    color: 'var(--accent)',
    fontWeight: '700',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: 'var(--primary)',
    color: '#fff',
    borderRadius: '10px',
    display: 'grid',
    placeItems: 'center',
    fontSize: '1.2rem',
    fontWeight: '800',
    boxShadow: '0 4px 10px rgba(56, 189, 248, 0.3)',
  },
  timeCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: '8px 16px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  lastUpdated: {
    fontSize: '0.85rem',
    color: 'var(--text-main)',
    fontWeight: '600',
  }
};

export default Header;
