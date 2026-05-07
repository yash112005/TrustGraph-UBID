import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, ShieldCheck, Database } from 'lucide-react';

const TREND_DATA = [
  { month: 'Jan', tech: 82, ag: 70, mf: 65 },
  { month: 'Feb', tech: 85, ag: 72, mf: 64 },
  { month: 'Mar', tech: 88, ag: 68, mf: 66 },
  { month: 'Apr', tech: 84, ag: 75, mf: 68 },
  { month: 'May', tech: 90, ag: 78, mf: 70 },
  { month: 'Jun', tech: 92, ag: 74, mf: 72 },
];

const RISK_DATA = [
  { industry: 'Tech', risk: 2.1 },
  { industry: 'Agri', risk: 4.5 },
  { industry: 'Mfg', risk: 3.8 },
  { industry: 'Food', risk: 5.2 },
  { industry: 'Logis', risk: 6.8 },
  { industry: 'Retail', risk: 4.2 },
  { industry: 'Energy', risk: 1.5 },
  { industry: 'Pharma', risk: 2.4 },
];

const TOP_FLAGGED = [
  { name: "Global Finance Ltd", score: 32, reason: "Multiple address matches" },
  { name: "Oceanic Shipping", score: 45, reason: "Shared director with shell" },
  { name: "Skyline Infra", score: 28, reason: "Invalid GSTIN format" },
  { name: "Redwood Retail", score: 51, reason: "Sudden activity spike" },
];

const IntelligencePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.kpiRow}>
        <div className="glass-card" style={styles.kpiCard}>
          <AlertTriangle color="var(--danger)" />
          <div>
            <p style={styles.kpiValue}>34</p>
            <p style={styles.kpiLabel}>Fraud Alerts</p>
          </div>
        </div>
        <div className="glass-card" style={styles.kpiCard}>
          <TrendingUp color="var(--warning)" />
          <div>
            <p style={styles.kpiValue}>6.2</p>
            <p style={styles.kpiLabel}>Risk Index</p>
          </div>
        </div>
        <div className="glass-card" style={styles.kpiCard}>
          <ShieldCheck color="var(--success)" />
          <div>
            <p style={styles.kpiValue}>18</p>
            <p style={styles.kpiLabel}>Anomalies Detected</p>
          </div>
        </div>
        <div className="glass-card" style={styles.kpiCard}>
          <Database color="var(--accent)" />
          <div>
            <p style={styles.kpiValue}>87%</p>
            <p style={styles.kpiLabel}>Data Completeness</p>
          </div>
        </div>
      </div>

      <div style={styles.chartGrid}>
        <div className="glass-card" style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Trust Score Trends (Sector-wise)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a2035', border: '1px solid rgba(255,255,255,0.1)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="tech" stroke="var(--accent)" strokeWidth={2} />
              <Line type="monotone" dataKey="ag" stroke="var(--success)" strokeWidth={2} />
              <Line type="monotone" dataKey="mf" stroke="var(--warning)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card" style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Industry Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={RISK_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="industry" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a2035', border: '1px solid rgba(255,255,255,0.1)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="risk" radius={[4, 4, 0, 0]}>
                {RISK_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.risk > 5 ? 'var(--danger)' : 'var(--accent)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.bottomGrid}>
        <div className="glass-card" style={styles.tableCard}>
          <h3 style={styles.chartTitle}>Top 10 Flagged Businesses</h3>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Business Name</th>
                <th style={styles.th}>Score</th>
                <th style={styles.th}>Risk Reason</th>
              </tr>
            </thead>
            <tbody>
              {TOP_FLAGGED.map((item, i) => (
                <tr key={i} style={styles.tr}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={{ ...styles.td, color: 'var(--danger)', fontWeight: '700' }}>{item.score}</td>
                  <td style={styles.td}>
                    <span style={styles.reasonTag}>{item.reason}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card" style={styles.alertCard}>
          <h3 style={styles.chartTitle}>Critical Alert Feed</h3>
          <div style={styles.feed}>
            <div style={{ ...styles.alertItem, borderLeftColor: 'var(--danger)' }}>
              <p style={styles.alertText}>High Risk: Potential shell company detected in Mysore cluster.</p>
              <span style={styles.alertTime}>2 mins ago</span>
            </div>
            <div style={{ ...styles.alertItem, borderLeftColor: 'var(--warning)' }}>
              <p style={styles.alertText}>Medium Risk: GSTR-3B mismatch for entity UBID-9921.</p>
              <span style={styles.alertTime}>15 mins ago</span>
            </div>
            <div style={{ ...styles.alertItem, borderLeftColor: 'var(--accent)' }}>
              <p style={styles.alertText}>Info: Relationship scan completed for tech sector.</p>
              <span style={styles.alertTime}>1 hour ago</span>
            </div>
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
  kpiRow: {
    display: 'flex',
    gap: '1.5rem',
  },
  kpiCard: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.5rem',
  },
  kpiValue: {
    fontSize: '1.5rem',
    fontWeight: '800',
  },
  kpiLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  chartCard: {
    padding: '1.5rem',
  },
  chartTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1.5rem',
  },
  tableCard: {
    padding: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thRow: {
    borderBottom: '1px solid var(--border)',
  },
  th: {
    textAlign: 'left',
    padding: '12px 8px',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontWeight: '700',
  },
  tr: {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  td: {
    padding: '16px 8px',
    fontSize: '0.9rem',
  },
  reasonTag: {
    fontSize: '0.75rem',
    padding: '2px 8px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--danger)',
    borderRadius: '4px',
    fontWeight: '600',
  },
  alertCard: {
    padding: '1.5rem',
  },
  feed: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  alertItem: {
    padding: '12px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '0 8px 8px 0',
    borderLeft: '4px solid',
  },
  alertText: {
    fontSize: '0.85rem',
    lineHeight: '1.4',
    marginBottom: '4px',
  },
  alertTime: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  }
};

export default IntelligencePage;
