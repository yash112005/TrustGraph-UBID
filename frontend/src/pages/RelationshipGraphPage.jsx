import React, { useState, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { ZoomIn, ZoomOut, Maximize, Search, X, Info } from 'lucide-react';

const MOCK_DATA = {
  nodes: [
    { id: '1', name: 'Silicon Valley Exports', score: 84, type: 'Business' },
    { id: '2', name: 'Karnataka Agri Hub', score: 72, type: 'Business' },
    { id: '3', name: 'Coastal Logistics', score: 45, type: 'Business' },
    { id: '4', name: 'Deccan Tech Solutions', score: 92, type: 'Business' },
    { id: '5', name: 'John Doe (Director)', score: 60, type: 'Person' },
    { id: '6', name: 'Shared Office B1', score: 50, type: 'Address' },
    { id: '7', name: 'ICICI Bank Acct ...882', score: 80, type: 'Bank' },
  ],
  links: [
    { source: '1', target: '5', type: 'Director' },
    { source: '4', target: '5', type: 'Director' },
    { source: '1', target: '6', type: 'Address' },
    { source: '2', target: '6', type: 'Address' },
    { source: '3', target: '7', type: 'Transaction' },
    { source: '4', target: '7', type: 'Transaction' },
  ]
};

const RelationshipGraphPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const fgRef = useRef();

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    // Center view on node
    fgRef.current.centerAt(node.x, node.y, 1000);
    fgRef.current.zoom(2, 1000);
  };

  return (
    <div style={styles.container}>
      <div className="glass-card" style={styles.graphWrapper}>
        <div style={styles.controls}>
          <div style={styles.searchBox}>
            <Search size={16} />
            <input type="text" placeholder="Search node..." style={styles.searchInput} />
          </div>
          <div style={styles.zoomControls}>
            <button style={styles.iconBtn} onClick={() => fgRef.current.zoom(fgRef.current.zoom() * 1.2)}><ZoomIn size={18} /></button>
            <button style={styles.iconBtn} onClick={() => fgRef.current.zoom(fgRef.current.zoom() * 0.8)}><ZoomOut size={18} /></button>
            <button style={styles.iconBtn} onClick={() => fgRef.current.centerAt(0, 0, 1000)}><Maximize size={18} /></button>
          </div>
        </div>

        <ForceGraph2D
          ref={fgRef}
          graphData={MOCK_DATA}
          nodeLabel="name"
          nodeColor={node => {
            if (node.score >= 80) return '#22c55e';
            if (node.score >= 60) return '#f59e0b';
            return '#ef4444';
          }}
          nodeRelSize={6}
          linkColor={() => 'rgba(255,255,255,0.2)'}
          linkWidth={1.5}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          onNodeClick={handleNodeClick}
          backgroundColor="transparent"
        />

        <div style={styles.legend}>
          <div style={styles.legendItem}><span style={{ ...styles.dot, backgroundColor: '#22c55e' }} /> High Trust</div>
          <div style={styles.legendItem}><span style={{ ...styles.dot, backgroundColor: '#f59e0b' }} /> Medium Risk</div>
          <div style={styles.legendItem}><span style={{ ...styles.dot, backgroundColor: '#ef4444' }} /> High Risk</div>
        </div>
      </div>

      {selectedNode && (
        <div className="glass-card animate-slide-in" style={styles.sidePanel}>
          <div style={styles.panelHeader}>
            <h3>Node Details</h3>
            <button style={styles.closeBtn} onClick={() => setSelectedNode(null)}><X size={20} /></button>
          </div>
          <div style={styles.panelContent}>
            <div style={styles.nodeIcon}>
              <Info size={32} color="var(--accent)" />
            </div>
            <h2 style={styles.nodeName}>{selectedNode.name}</h2>
            <p style={styles.nodeType}>{selectedNode.type}</p>
            
            <div style={styles.panelStat}>
              <span style={styles.statLabel}>Trust Score</span>
              <span style={{ ...styles.statValue, color: selectedNode.score >= 80 ? 'var(--success)' : selectedNode.score >= 60 ? 'var(--warning)' : 'var(--danger)' }}>
                {selectedNode.score}
              </span>
            </div>

            <div style={styles.connectionsSection}>
              <h4 style={styles.sectionTitle}>Direct Connections</h4>
              <ul style={styles.connList}>
                <li style={styles.connItem}>Shared Director with <b>Deccan Tech</b></li>
                <li style={styles.connItem}>Common Address with <b>Agri Hub</b></li>
                <li style={styles.connItem}>Primary Bank: ICICI Hubli</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    height: 'calc(100vh - 200px)',
    width: '100%',
  },
  graphWrapper: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    padding: 0,
  },
  controls: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#1a2035',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '8px 12px',
    width: '200px',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '0.85rem',
    width: '100%',
    outline: 'none',
  },
  zoomControls: {
    display: 'flex',
    gap: '8px',
  },
  iconBtn: {
    width: '40px',
    height: '40px',
    backgroundColor: '#1a2035',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  legend: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    backgroundColor: 'rgba(26, 32, 53, 0.8)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.75rem',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  sidePanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '320px',
    height: '100%',
    zIndex: 20,
    borderRadius: '0 12px 12px 0',
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    backgroundColor: '#1a2035',
    borderLeft: '1px solid var(--border)',
  },
  panelHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  panelContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  nodeIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  nodeName: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '4px',
  },
  nodeType: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
  },
  panelStat: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderTop: '1px solid var(--border)',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
  },
  statValue: {
    fontSize: '1rem',
    fontWeight: '800',
  },
  connectionsSection: {
    width: '100%',
    marginTop: '1.5rem',
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    marginBottom: '12px',
  },
  connList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  connItem: {
    fontSize: '0.85rem',
    color: '#ddd',
    paddingLeft: '12px',
    borderLeft: '2px solid var(--accent)',
  }
};

export default RelationshipGraphPage;
