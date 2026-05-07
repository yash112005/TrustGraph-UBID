import React from 'react';
import { GitBranch, Fingerprint, Search, Repeat } from 'lucide-react';

const About = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Our Technical Approach</h1>
      
      <section className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <GitBranch size={40} color="var(--primary)" />
          <div>
            <h3>Graph-Based Entity Resolution</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Traditional record linking often relies on exact ID matches. Our system uses Neo4j to build a relationship graph where nodes are business records and edges are probabilistic matches. By finding connected components in this graph, we can assign a single <strong>UBID</strong> to multiple fragmented identities.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Search size={40} color="var(--success)" />
          <div>
            <h3>Multi-Signal Fuzzy Matching</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              We normalize and compare data fields using weighted importance:
            </p>
            <ul style={{ marginTop: '1rem', color: 'var(--text-muted)', marginLeft: '1.5rem' }}>
              <li><strong>GSTIN/PAN:</strong> High weight (Strong Identifier)</li>
              <li><strong>Business Name:</strong> Medium weight (RapidFuzz Similarity)</li>
              <li><strong>Address:</strong> Medium weight (Locality & Pin Code analysis)</li>
              <li><strong>Phone/Owner:</strong> Low weight (Supporting signals)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Repeat size={40} color="var(--warning)" />
          <div>
            <h3>Reversibility & Human Review</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Every automated decision is reversible. Matches with confidence scores between 50% and 85% are flagged for manual review. Government officers can approve, reject, or manually merge clusters, ensuring the system improves with expert feedback.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card">
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Fingerprint size={40} color="var(--danger)" />
          <div>
            <h3>Trust Scoring & Status</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              By aggregating "activity signals" (Electricity bills, GST filings, Municipal inspections), we determine if a business is truly operational. This "Trust Score" helps government departments prioritize inspections and support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
