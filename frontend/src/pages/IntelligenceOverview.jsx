import React from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import DonutChart from '../components/DonutChart';
import ActivityFeed from '../components/ActivityFeed';
import { Users, Shield, TriangleAlert, Activity } from 'lucide-react';

const IntelligenceOverview = () => {
  return (
    <>
      <Header />
      
      {/* Stat Cards Row */}
      <div style={styles.statRow}>
        <StatCard 
          icon={<Users size={24} />} 
          title="Total Businesses" 
          value="11,410" 
          subtitle="+5.2% this month" 
          subtitleColor="var(--success)" 
        />
        <StatCard 
          icon={<Shield size={24} />} 
          title="Avg Trust Score" 
          value="72.4" 
          subtitle="+2.1% this month" 
          subtitleColor="var(--success)" 
        />
        <StatCard 
          icon={<TriangleAlert size={24} />} 
          title="Flagged Records" 
          value="142" 
          subtitle="+12.4% this month" 
          subtitleColor="var(--danger)" 
        />
        <StatCard 
          icon={<Activity size={24} />} 
          title="Verification Rate" 
          value="94.2%" 
          subtitle="Target: 95.0%" 
          subtitleColor="var(--success)" 
        />
      </div>

      {/* Main Content Area */}
      <div style={styles.contentGrid}>
        <div style={styles.chartCol}>
          <DonutChart />
        </div>
        <div style={styles.feedCol}>
          <ActivityFeed />
        </div>
      </div>
    </>
  );
};

const styles = {
  statRow: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    alignItems: 'stretch',
  },
  chartCol: {
    minHeight: '450px',
  },
  feedCol: {
    minHeight: '450px',
  }
};

export default IntelligenceOverview;
