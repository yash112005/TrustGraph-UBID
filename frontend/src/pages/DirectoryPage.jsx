import React, { useState } from 'react';
import { Search, Download, ChevronDown, ChevronUp, MoreVertical, CheckSquare, Square } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_DATA = [
  { ubid: 'UBID-10029', name: 'Silicon Valley Exports', industry: 'Exports', district: 'Bangalore', score: 84, status: 'Verified', date: '2024-05-01' },
  { ubid: 'UBID-10045', name: 'Karnataka Agri Hub', industry: 'Agriculture', district: 'Mysuru', score: 72, status: 'Pending', date: '2024-04-28' },
  { ubid: 'UBID-10067', name: 'Coastal Logistics', industry: 'Logistics', district: 'Mangaluru', score: 45, status: 'Flagged', date: '2024-05-02' },
  { ubid: 'UBID-10088', name: 'Deccan Tech Solutions', industry: 'Technology', district: 'Hubli', score: 92, status: 'Verified', date: '2024-04-15' },
  { ubid: 'UBID-10112', name: 'Hampi Heritage Textiles', industry: 'Manufacturing', district: 'Hampi', score: 68, status: 'Verified', date: '2024-04-22' },
  { ubid: 'UBID-10145', name: 'Malnad Spice Co.', industry: 'Food & Bev', district: 'Shimoga', score: 55, status: 'Pending', date: '2024-05-05' },
];

const DirectoryPage = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) setSelectedRows([]);
    else setSelectedRows(data.map(d => d.ubid));
  };

  const toggleSelectRow = (ubid) => {
    if (selectedRows.includes(ubid)) setSelectedRows(selectedRows.filter(id => id !== ubid));
    else setSelectedRows([...selectedRows, ubid]);
  };

  const handleExport = () => {
    toast.success('Directory data exported as CSV');
  };

  const handleFlagSelected = () => {
    if (selectedRows.length === 0) {
      toast.error('Select businesses to flag');
      return;
    }
    toast.success(`Flagged ${selectedRows.length} businesses for review`);
    setSelectedRows([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Business Directory</h2>
        <div style={styles.actions}>
          <button style={styles.exportBtn} onClick={handleExport}>
            <Download size={18} /> Export CSV
          </button>
          <button style={styles.flagBtn} onClick={handleFlagSelected}>
            Flag Selected
          </button>
        </div>
      </div>

      <div className="glass-card" style={styles.tableCard}>
        <div style={styles.tableControls}>
          <div style={styles.tabs}>
            {['All', 'Verified', 'Pending', 'Flagged'].map(tab => (
              <button 
                key={tab} 
                style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : {}) }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={styles.searchBox}>
            <Search size={16} color="var(--text-muted)" />
            <input type="text" placeholder="Quick search..." style={styles.searchInput} />
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th} onClick={toggleSelectAll}>
                {selectedRows.length === data.length ? <CheckSquare size={18} color="var(--accent)" /> : <Square size={18} />}
              </th>
              <th style={styles.th}>UBID</th>
              <th style={styles.th}>Business Name</th>
              <th style={styles.th}>Industry</th>
              <th style={styles.th}>District</th>
              <th style={styles.th}>Trust Score</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Last Verified</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={styles.tr}>
                <td style={styles.td} onClick={() => toggleSelectRow(row.ubid)}>
                  {selectedRows.includes(row.ubid) ? <CheckSquare size={18} color="var(--accent)" /> : <Square size={18} />}
                </td>
                <td style={{ ...styles.td, fontWeight: '700', color: 'var(--accent)' }}>{row.ubid}</td>
                <td style={styles.td}>{row.name}</td>
                <td style={styles.td}>{row.industry}</td>
                <td style={styles.td}>{row.district}</td>
                <td style={{ ...styles.td, fontWeight: '700' }}>{row.score}</td>
                <td style={styles.td}>
                  <span style={{ 
                    ...styles.statusTag, 
                    backgroundColor: row.status === 'Verified' ? 'rgba(34, 197, 94, 0.1)' : row.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: row.status === 'Verified' ? 'var(--success)' : row.status === 'Pending' ? 'var(--warning)' : 'var(--danger)'
                  }}>
                    {row.status}
                  </span>
                </td>
                <td style={styles.td}>{row.date}</td>
                <td style={styles.td}>
                  <button style={styles.moreBtn}><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <span style={styles.pageInfo}>Showing 1-10 of 2,847 results</span>
          <div style={styles.pageBtns}>
            <button style={styles.pageArrow}>&lt;</button>
            <button style={{ ...styles.pageNum, ...styles.activePage }}>1</button>
            <button style={styles.pageNum}>2</button>
            <button style={styles.pageNum}>3</button>
            <button style={styles.pageArrow}>&gt;</button>
          </div>
        </div>
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
  actions: {
    display: 'flex',
    gap: '12px',
  },
  exportBtn: {
    padding: '10px 16px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  flagBtn: {
    padding: '10px 16px',
    backgroundColor: 'var(--danger)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '700',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  tableCard: {
    padding: '0',
    overflow: 'hidden',
  },
  tableControls: {
    padding: '1.5rem',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
  },
  tab: {
    padding: '6px 16px',
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s',
  },
  activeTab: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    color: 'var(--accent)',
    fontWeight: '600',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '8px 12px',
    width: '240px',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '0.85rem',
    outline: 'none',
    width: '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thRow: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderBottom: '1px solid var(--border)',
  },
  th: {
    textAlign: 'left',
    padding: '16px',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontWeight: '700',
    cursor: 'pointer',
  },
  tr: {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    transition: 'background 0.2s',
    cursor: 'pointer',
  },
  td: {
    padding: '16px',
    fontSize: '0.85rem',
  },
  statusTag: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  moreBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  pagination: {
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageInfo: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  pageBtns: {
    display: 'flex',
    gap: '8px',
  },
  pageNum: {
    width: '32px',
    height: '32px',
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  activePage: {
    backgroundColor: 'var(--accent)',
    color: '#000',
    border: 'none',
    fontWeight: '700',
  },
  pageArrow: {
    width: '32px',
    height: '32px',
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    fontSize: '1rem',
  }
};

export default DirectoryPage;
