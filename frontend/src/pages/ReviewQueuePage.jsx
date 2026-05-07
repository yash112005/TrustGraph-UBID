import React, { useState } from 'react';
import { ShieldCheck, ShieldX, MessageCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_QUEUE = [
  { id: 1, name: "Global Finance Ltd", ubid: "UBID-20034", reason: "Multiple address matches", date: "2024-05-06", analyst: "Sarah J.", priority: "High" },
  { id: 2, name: "Skyline Infra", ubid: "UBID-20056", reason: "Invalid GSTIN format", date: "2024-05-05", analyst: "Mark T.", priority: "High" },
  { id: 3, name: "Oceanic Shipping", ubid: "UBID-20088", reason: "Shared director with shell", date: "2024-05-06", analyst: "Sarah J.", priority: "Medium" },
  { id: 4, name: "Redwood Retail", ubid: "UBID-20112", reason: "Sudden activity spike", date: "2024-05-04", analyst: "Unassigned", priority: "Medium" },
  { id: 5, name: "Himalaya Herbs", ubid: "UBID-20145", reason: "Mismatched industry code", date: "2024-05-03", analyst: "Mark T.", priority: "Low" },
  { id: 6, name: "Punjab Power", ubid: "UBID-20167", reason: "Missing license doc", date: "2024-05-02", analyst: "Sarah J.", priority: "Low" },
  { id: 7, name: "Lotus Logistics", ubid: "UBID-20188", reason: "Dormant for 24 months", date: "2024-05-01", analyst: "Unassigned", priority: "Low" },
  { id: 8, name: "Zenith Tech", ubid: "UBID-20212", reason: "High transaction volume", date: "2024-05-06", analyst: "Unassigned", priority: "High" },
];

const ReviewQueuePage = ({ onAction }) => {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [filter, setFilter] = useState('All');

  const handleAction = (id, type) => {
    setQueue(prev => prev.filter(item => item.id !== id));
    onAction(); // Decrement sidebar badge
    
    if (type === 'Approve') toast.success('Business approved and verified');
    else if (type === 'Reject') toast.error('Business application rejected');
    else toast.success('Information request sent to business');
  };

  const filteredQueue = queue.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'High Priority') return item.priority === 'High';
    if (filter === 'Assigned to Me') return item.analyst === 'Sarah J.';
    return true;
  });

  const PrioritySection = ({ label, items }) => (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h4 style={styles.sectionTitle}>{label} Priority</h4>
        <span style={styles.sectionCount}>{items.length}</span>
      </div>
      <div style={styles.list}>
        {items.map(item => (
          <div key={item.id} className="glass-card animate-fade-in" style={styles.item}>
            <div style={styles.itemMain}>
              <div style={styles.itemHeader}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <span style={styles.itemUbid}>{item.ubid}</span>
              </div>
              <div style={styles.itemMeta}>
                <div style={styles.reasonGroup}>
                  <AlertCircle size={14} color="var(--warning)" />
                  <span style={styles.reasonText}>{item.reason}</span>
                </div>
                <div style={styles.metaInfo}>
                  <span>Submitted: {item.date}</span>
                  <span style={styles.separator}>•</span>
                  <span>Analyst: {item.analyst}</span>
                </div>
              </div>
            </div>
            <div style={styles.actions}>
              <button 
                style={styles.actionBtnApprove} 
                onClick={() => handleAction(item.id, 'Approve')}
                title="Approve"
              >
                <ShieldCheck size={20} />
              </button>
              <button 
                style={styles.actionBtnReject} 
                onClick={() => handleAction(item.id, 'Reject')}
                title="Reject"
              >
                <ShieldX size={20} />
              </button>
              <button 
                style={styles.actionBtnInfo} 
                onClick={() => handleAction(item.id, 'Info')}
                title="Request Info"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={styles.emptyText}>No items in this priority level.</p>}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Review Queue</h2>
        <div style={styles.tabs}>
          {['All', 'High Priority', 'Assigned to Me'].map(tab => (
            <button 
              key={tab} 
              style={{ ...styles.tab, ...(filter === tab ? styles.activeTab : {}) }}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.content}>
        {['High', 'Medium', 'Low'].map(p => (
          <PrioritySection 
            key={p} 
            label={p} 
            items={filteredQueue.filter(i => i.priority === p)} 
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  tabs: {
    display: 'flex',
    gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
  },
  tab: {
    padding: '8px 16px',
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s',
  },
  activeTab: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    color: 'var(--accent)',
    fontWeight: '600',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '8px',
  },
  sectionTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text-muted)',
  },
  sectionCount: {
    fontSize: '0.75rem',
    padding: '2px 8px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
    fontWeight: '700',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 1.5rem',
  },
  itemMain: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
  },
  itemName: {
    fontSize: '1.1rem',
    fontWeight: '700',
  },
  itemUbid: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontFamily: 'monospace',
  },
  itemMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  reasonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  reasonText: {
    fontSize: '0.9rem',
    color: '#ddd',
  },
  metaInfo: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    display: 'flex',
    gap: '8px',
  },
  separator: {
    opacity: 0.5,
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  actionBtnApprove: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: 'var(--success)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  actionBtnReject: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--danger)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  actionBtnInfo: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    color: 'var(--accent)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  emptyText: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
    padding: '1rem',
  }
};

export default ReviewQueuePage;
