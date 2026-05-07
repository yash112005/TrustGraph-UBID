import React, { useState, useEffect } from 'react';
import { Clock, Plus } from 'lucide-react';

const INITIAL_ITEMS = [
  { id: 1, text: "Business status updated: Silicon Valley Exports (Dormant)", time: "Just now" },
  { id: 2, text: "System check completed.", time: "Just now" },
  { id: 3, text: "New verification request: Bangalore Tech Hub", time: "2 mins ago" },
  { id: 4, text: "Entity resolution scan: 452 matches found", time: "5 mins ago" },
];

const ActivityFeed = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        id: Date.now(),
        text: getRandomEvent(),
        time: "Just now"
      };
      setItems(prev => [newEvent, ...prev.slice(0, 5)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getRandomEvent = () => {
    const events = [
      "New business registration: Green Horizon Ltd.",
      "Trust score recalculated for entity #4829",
      "Bulk data import: Hubli-Dharwad cluster",
      "Manual review completed for Reliance Retail",
      "Database synchronization successful",
      "Alert: Unusual activity detected in Tumakuru",
      "Relationship graph updated for UBID-9921",
    ];
    return events[Math.floor(Math.random() * events.length)];
  };

  return (
    <div className="glass-card" style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleGroup}>
          <Clock size={20} color="var(--accent)" />
          <h3 style={styles.title}>Live Activity Monitoring</h3>
        </div>
      </div>
      <div style={styles.feed}>
        {items.map((item) => (
          <div key={item.id} className="animate-slide-in" style={styles.item}>
            <div style={styles.iconWrapper}>
              <Plus size={14} color="var(--accent)" />
            </div>
            <div style={styles.content}>
              <p style={styles.text}>{item.text}</p>
              <span style={styles.time}>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '1.5rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  feed: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  item: {
    display: 'flex',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  iconWrapper: {
    minWidth: '24px',
    height: '24px',
    borderRadius: '6px',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
  },
  text: {
    fontSize: '0.9rem',
    lineHeight: '1.4',
    marginBottom: '4px',
  },
  time: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  }
};

export default ActivityFeed;
