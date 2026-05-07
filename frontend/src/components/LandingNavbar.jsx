import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          <div style={styles.logoIcon}>
            <Zap size={20} fill="currentColor" />
          </div>
          <span style={styles.logoText}>TrustGraph</span>
        </div>

        <div style={styles.links}>
          <a href="#home" style={styles.link}>Home</a>
          <a href="#about" style={styles.link}>About</a>
          <Link to="/login" style={styles.link}>Login</Link>
        </div>

        <button 
          className="btn btn-primary" 
          style={styles.cta}
          onClick={() => navigate('/signup')}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    height: '80px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(6, 9, 19, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    background: 'linear-gradient(135deg, var(--accent), #1d4ed8)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
  },
  links: {
    display: 'flex',
    gap: '2.5rem',
  },
  link: {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'color 0.2s',
  },
  cta: {
    padding: '0.6rem 1.5rem',
    fontSize: '0.9rem',
  }
};

export default LandingNavbar;
