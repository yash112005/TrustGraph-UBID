import React, { useState } from 'react';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import BusinessCard from '../components/BusinessCard';

const MOCK_RESULTS = [
  { id: 1, name: "Silicon Valley Exports", ubid: "UBID-10029", trustScore: 84, status: "Active", location: "Bangalore", industry: "Exports" },
  { id: 2, name: "Karnataka Agri Hub", ubid: "UBID-10045", trustScore: 72, status: "Dormant", location: "Mysuru", industry: "Agriculture" },
  { id: 3, name: "Coastal Logistics", ubid: "UBID-10067", trustScore: 45, status: "Inactive", location: "Mangaluru", industry: "Logistics" },
  { id: 4, name: "Deccan Tech Solutions", ubid: "UBID-10088", trustScore: 92, status: "Active", location: "Hubli", industry: "Technology" },
  { id: 5, name: "Hampi Heritage Textiles", ubid: "UBID-10112", trustScore: 68, status: "Active", location: "Hampi", industry: "Manufacturing" },
  { id: 6, name: "Malnad Spice Co.", ubid: "UBID-10145", trustScore: 55, status: "Dormant", location: "Shimoga", industry: "Food & Bev" },
];

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(MOCK_RESULTS);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Business Search</h2>
        <p style={styles.count}>{results.length.toLocaleString()} results found</p>
      </div>

      <div style={styles.searchSection}>
        <div style={styles.searchBarWrapper}>
          <SearchIcon style={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="Search by business name, UBID, or location..." 
            style={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button style={styles.searchBtn}>Search</button>
        </div>

        <div style={styles.filterRow}>
          <select style={styles.select}>
            <option>All States</option>
            <option>Karnataka</option>
            <option>Maharashtra</option>
          </select>
          <select style={styles.select}>
            <option>All Industries</option>
            <option>Technology</option>
            <option>Agriculture</option>
            <option>Manufacturing</option>
          </select>
          <div style={styles.rangeWrapper}>
            <span>Trust Score: 0 - 100</span>
          </div>
        </div>
      </div>

      <div style={styles.mainLayout}>
        <aside style={styles.sidebar}>
          <div style={styles.filterGroup}>
            <h4 style={styles.filterTitle}>Status</h4>
            <label style={styles.checkboxLabel}><input type="checkbox" defaultChecked /> Active</label>
            <label style={styles.checkboxLabel}><input type="checkbox" defaultChecked /> Dormant</label>
            <label style={styles.checkboxLabel}><input type="checkbox" defaultChecked /> Inactive</label>
          </div>
          <div style={styles.filterGroup}>
            <h4 style={styles.filterTitle}>Verification</h4>
            <label style={styles.checkboxLabel}><input type="checkbox" defaultChecked /> Verified</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Unverified</label>
          </div>
          <button style={styles.resetBtn}>Reset Filters</button>
        </aside>

        <div style={styles.resultsGrid}>
          {results.length > 0 ? (
            <>
              <div style={styles.grid}>
                {results.map(b => <BusinessCard key={b.id} business={b} />)}
              </div>
              <div style={styles.pagination}>
                <button style={styles.pageBtn}>Previous</button>
                <div style={styles.pageNumbers}>
                  <span style={styles.activePage}>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>...</span>
                  <span>12</span>
                </div>
                <button style={styles.pageBtn}>Next</button>
              </div>
            </>
          ) : (
            <div style={styles.empty}>
              <SearchIcon size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>No results found for your search.</p>
            </div>
          )}
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
  count: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  searchSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  searchBarWrapper: {
    position: 'relative',
    display: 'flex',
    gap: '12px',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
  },
  searchInput: {
    flexGrow: 1,
    padding: '16px 16px 16px 52px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
  },
  searchBtn: {
    padding: '0 24px',
    backgroundColor: 'var(--accent)',
    border: 'none',
    borderRadius: '12px',
    color: '#000',
    fontWeight: '700',
    cursor: 'pointer',
  },
  filterRow: {
    display: 'flex',
    gap: '1rem',
  },
  select: {
    padding: '10px 16px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.85rem',
  },
  rangeWrapper: {
    padding: '10px 16px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gap: '2rem',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  filterTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    marginBottom: '4px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  resetBtn: {
    marginTop: '1rem',
    padding: '10px',
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  resultsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    marginTop: '2rem',
  },
  pageNumbers: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
  },
  activePage: {
    color: 'var(--accent)',
    fontWeight: '700',
  },
  pageBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--accent)',
    fontWeight: '600',
    cursor: 'pointer',
  },
  empty: {
    padding: '4rem',
    textAlign: 'center',
    color: 'var(--text-muted)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
};

export default SearchPage;
