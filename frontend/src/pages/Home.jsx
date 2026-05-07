import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Database, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Target, 
  Lock, 
  Globe,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('ubid_session');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>Next-Gen UBID System</div>
          <h1 style={styles.heroTitle}>
            Unifying Business Identity for <span className="text-gradient">Smart Governance</span>
          </h1>
          <p style={styles.heroSubtitle}>
            A graph-based entity resolution system that links fragmented government records, 
            assigns Unique Business Identifiers (UBID), and monitors real-world business activity.
          </p>
          <div style={styles.heroActions}>
            <button 
              className="btn btn-primary" 
              style={styles.heroBtn}
              onClick={() => navigate('/intelligence-overview')}
            >
              Launch Dashboard <ArrowRight size={20} />
            </button>
            <a href="#about" style={styles.secondaryBtn}>Explore Features</a>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="problem" style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.splitGrid}>
            <div className="glass-card" style={{ ...styles.splitCard, borderLeft: '4px solid var(--danger)' }}>
              <div style={styles.iconCircle}>
                <AlertTriangle size={32} color="var(--danger)" />
              </div>
              <h3 style={styles.cardTitle}>The Problem</h3>
              <p style={styles.cardText}>
                Government business data is scattered across GST, MCA, and Municipal departments. 
                This fragmentation leads to tax evasion, ghost entities, and inefficient monitoring 
                of Karnataka's business ecosystem.
              </p>
            </div>
            <div className="glass-card" style={{ ...styles.splitCard, borderLeft: '4px solid var(--success)' }}>
              <div style={styles.iconCircle}>
                <CheckCircle2 size={32} color="var(--success)" />
              </div>
              <h3 style={styles.cardTitle}>The Solution</h3>
              <p style={styles.cardText}>
                TrustGraph creates a unified "Single Version of Truth" by linking records using 
                fuzzy-logic and graph theory. It provides a unique UBID to every legitimate business 
                for seamless governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ ...styles.section, backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div style={styles.sectionContainer}>
          <div style={styles.textCenter}>
            <h2 style={styles.sectionTitle}>What is TrustGraph?</h2>
            <p style={styles.sectionSubtitle}>
              TrustGraph is a sophisticated intelligence platform designed to bridge the gap 
              between siloed government databases and real-time business monitoring.
            </p>
          </div>
          <div style={styles.featuresGrid}>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><Database size={24} /></div>
              <h4>Data Harmonization</h4>
              <p>Merge records from multiple departments into a single entity profile.</p>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><Target size={24} /></div>
              <h4>Entity Resolution</h4>
              <p>Advanced fuzzy matching to identify duplicates and shell companies.</p>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><Activity size={24} /></div>
              <h4>Activity Detection</h4>
              <p>Monitor real-world signals to detect dormant or fraudulent entities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.textCenter}>
            <h2 style={styles.sectionTitle}>Key Features</h2>
          </div>
          <div style={styles.grid3}>
            <div className="glass-card" style={styles.gridCard}>
              <Zap size={32} color="var(--accent)" />
              <h3>Real-time Alerts</h3>
              <p>Get instant notifications on unusual activity spikes or compliance failures.</p>
            </div>
            <div className="glass-card" style={styles.gridCard}>
              <Lock size={32} color="var(--accent)" />
              <h3>Secure UBID</h3>
              <p>Tamper-proof identity for businesses across all government interactions.</p>
            </div>
            <div className="glass-card" style={styles.gridCard}>
              <Globe size={32} color="var(--accent)" />
              <h3>Entity Graph</h3>
              <p>Visualize complex relationships between directors, addresses, and companies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo (Call to Action) Section */}
      <section id="demo" style={styles.demo}>
        <div className="glass-card" style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>Ready to see it in action?</h2>
          <p style={styles.ctaSubtitle}>Explore the real-time business ecosystem with our interactive demo.</p>
          <button 
            className="btn btn-primary" 
            style={styles.ctaBtn}
            onClick={() => navigate('/intelligence-overview')}
          >
            Launch Interactive Demo <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© 2024 TrustGraph UBID System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'var(--bg-main)',
    width: '100%',
  },
  hero: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 2rem',
    background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)',
  },
  heroContent: {
    maxWidth: '900px',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    color: 'var(--accent)',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    border: '1px solid rgba(56, 189, 248, 0.2)',
  },
  heroTitle: {
    fontSize: '4.5rem',
    lineHeight: '1.1',
    marginBottom: '1.5rem',
    fontWeight: '800',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'var(--text-muted)',
    marginBottom: '3rem',
    lineHeight: '1.6',
  },
  heroActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    alignItems: 'center',
  },
  heroBtn: {
    padding: '1.25rem 2.5rem',
    fontSize: '1.1rem',
  },
  secondaryBtn: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    borderBottom: '2px solid var(--accent)',
    paddingBottom: '4px',
  },
  section: {
    padding: '100px 2rem',
  },
  sectionContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    maxWidth: '700px',
    margin: '0 auto',
  },
  splitGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },
  splitCard: {
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  iconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.5rem',
  },
  cardText: {
    lineHeight: '1.7',
    color: 'var(--text-muted)',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '3rem',
  },
  featureItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  featureIcon: {
    color: 'var(--accent)',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  gridCard: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    textAlign: 'center',
    alignItems: 'center',
  },
  demo: {
    padding: '100px 2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  ctaCard: {
    maxWidth: '800px',
    width: '100%',
    padding: '4rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(26, 32, 53, 0.8), rgba(6, 9, 19, 0.8))',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  ctaSubtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    marginBottom: '2.5rem',
  },
  ctaBtn: {
    padding: '1rem 2rem',
  },
  footer: {
    padding: '3rem',
    textAlign: 'center',
    borderTop: '1px solid var(--border)',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  }
};

export default Home;
