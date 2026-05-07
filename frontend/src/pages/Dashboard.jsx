import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, ChevronDown, ChevronUp, AlertCircle, ExternalLink } from 'lucide-react';
import { DataService } from '../services/dataService';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({});

  const fetchData = () => {
    setLoading(true);
    const result = DataService.getDashboardData();
    setData(result);
    setLoading(false);
  };

  const processLinks = () => {
    setLoading(true);
    DataService.runLinking();
    fetchData();
    setLoading(false);
  };

  const seedData = () => {
    setLoading(true);
    DataService.seed();
    processLinks();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleExpand = (ubid) => {
    setExpanded(prev => ({ ...prev, [ubid]: !prev[ubid] }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>UBID Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={seedData} disabled={loading}>
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Reset & Seed
          </button>
          <button className="btn btn-primary" onClick={processLinks} disabled={loading}>
             Run Linking Engine
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {data.length === 0 ? (
           <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
             <RefreshCw size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
             <p>No clusters found. Click "Run Linking Engine" to process records.</p>
           </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>UBID</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Primary Name</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Linked Records</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(cluster => (
                <React.Fragment key={cluster.ubid}>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--primary)' }}>{cluster.ubid}</td>
                    <td style={{ padding: '1rem' }}>{cluster.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge" style={{ background: 'var(--border)' }}>{cluster.record_count} Sources</span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className={`badge badge-${cluster.status.toLowerCase()}`}>{cluster.status}</span>
                        <AlertCircle size={14} color="var(--text-muted)" title={cluster.status_reason} style={{ cursor: 'help' }} />
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => toggleExpand(cluster.ubid)}>
                        {expanded[cluster.ubid] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </td>
                  </tr>
                  {expanded[cluster.ubid] && (
                    <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <td colSpan="5" style={{ padding: '1.5rem' }}>
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                          {cluster.records.map((rec, idx) => (
                            <div key={idx} className="glass-card" style={{ fontSize: '0.875rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <strong style={{ color: 'var(--primary)' }}>{rec.source_system} Department</strong>
                                <ExternalLink size={14} />
                              </div>
                              <p><strong>Name:</strong> {rec.business_name}</p>
                              <p><strong>GSTIN:</strong> {rec.gstin || 'N/A'}</p>
                              <p><strong>Address:</strong> {rec.address}</p>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '0.5rem', border: '1px dashed var(--primary)' }}>
                          <strong>Activity Explanation:</strong> {cluster.status_reason}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
