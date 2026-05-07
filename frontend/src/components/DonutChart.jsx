import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Active', value: 75, color: '#22c55e' },
  { name: 'Dormant', value: 20, color: '#f59e0b' },
  { name: 'Inactive', value: 5, color: '#ef4444' },
];

const DonutChart = () => {
  return (
    <div className="glass-card" style={styles.container}>
      <h3 style={styles.title}>Active vs Dormant Businesses</h3>
      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a2035', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={styles.legendContainer}>
        {data.map((item, index) => (
          <div key={index} style={styles.legendItem}>
            <div style={{ ...styles.dot, backgroundColor: item.color }} />
            <span style={styles.legendName}>{item.name}</span>
            <span style={styles.legendValue}>{item.value}%</span>
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
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  chartWrapper: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border)',
  },
  legendItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  legendName: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  legendValue: {
    fontSize: '0.9rem',
    fontWeight: '700',
  }
};

export default DonutChart;
