import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  BrainCircuit, 
  Share2, 
  BookOpen, 
  ClipboardCheck, 
  Upload, 
  TrendingDown,
  Home as HomeIcon,
  LogOut,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

const Sidebar = ({ reviewCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ubid_session');
    localStorage.removeItem('user');
    sessionStorage.clear();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <HomeIcon size={20} />, label: 'Overview', path: '/intelligence-overview' },
    { icon: <Search size={20} />, label: 'Search', path: '/search' },
    { icon: <BrainCircuit size={20} />, label: 'Intelligence', path: '/intelligence' },
    { icon: <Share2 size={20} />, label: 'Relationship Graph', path: '/relationship-graph' },
    { icon: <BookOpen size={20} />, label: 'Directory', path: '/directory' },
    { icon: <ClipboardCheck size={20} />, label: 'Review Queue', badge: reviewCount, path: '/review-queue' },
    { icon: <Upload size={20} />, label: 'Upload Data', path: '/upload-data' },
  ];

  return (
    <aside style={styles.sidebar}>
      <div 
        style={{ ...styles.logoContainer, cursor: 'pointer' }} 
        onClick={() => navigate('/dashboard')}
      >
        <div style={styles.logoWrapper}>
          <Zap size={22} fill="currentColor" />
        </div>
        <div style={styles.logoTextWrapper}>
          <h1 style={styles.logoText}>TrustGraph</h1>
          <span style={styles.logoSubtext}>UBID Intelligence</span>
        </div>
      </div>

      <nav style={styles.nav}>
        {navItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path}
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {})
            })}
          >
            {({ isActive }) => (
              <>
                <span style={isActive ? styles.navIconActive : styles.navIcon}>
                  {item.icon}
                </span>
                <span style={styles.navLabel}>{item.label}</span>
                {item.badge > 0 && <span style={styles.badge}>{item.badge}</span>}
                {isActive && <div style={styles.activeIndicator} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={styles.bottomSection}>
        <div style={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={20} />
          <span style={styles.logoutLabel}>Logout</span>
        </div>

        <div style={styles.tickerContainer}>
          <div style={styles.tickerHeader}>
            <div style={styles.liveDot} />
            Market Pulse
          </div>
          <div style={styles.tickerValue}>
            <span style={styles.currency}>INR/USD</span>
            <span style={styles.change}>
              <TrendingDown size={14} />
              -0.21%
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: 'var(--sidebar-width)',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: '#0a0f1e',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 0',
    zIndex: 1000,
    boxShadow: '10px 0 30px rgba(0,0,0,0.3)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '0 1.5rem',
    marginBottom: '3rem',
  },
  logoWrapper: {
    width: '42px',
    height: '42px',
    background: 'linear-gradient(135deg, var(--accent), #1d4ed8)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)',
  },
  logoTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '800',
    lineHeight: '1',
    letterSpacing: '-0.02em',
  },
  logoSubtext: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '2px',
  },
  nav: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '0 0.75rem',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '12px 14px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    color: 'var(--text-muted)',
    position: 'relative',
    overflow: 'hidden',
  },
  navItemActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    color: '#fff',
  },
  navIcon: {
    transition: 'all 0.3s ease',
    opacity: 0.7,
  },
  navIconActive: {
    color: 'var(--accent)',
    filter: 'drop-shadow(0 0 5px rgba(56, 189, 248, 0.5))',
    opacity: 1,
  },
  navLabel: {
    fontSize: '0.95rem',
    fontWeight: '500',
    fontFamily: 'var(--font-main)',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: '20%',
    bottom: '20%',
    width: '3px',
    backgroundColor: 'var(--accent)',
    borderRadius: '0 4px 4px 0',
    boxShadow: '0 0 10px var(--accent)',
  },
  badge: {
    marginLeft: 'auto',
    backgroundColor: 'var(--danger)',
    color: '#fff',
    fontSize: '0.65rem',
    padding: '2px 8px',
    borderRadius: '20px',
    fontWeight: '800',
    fontFamily: 'var(--font-inter)',
    boxShadow: '0 2px 10px rgba(244, 63, 94, 0.4)',
  },
  bottomSection: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '0 0.75rem 1rem',
    padding: '12px 14px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: 'rgba(244, 63, 94, 0.7)',
    fontWeight: '600',
  },
  logoutBtnHover: {
    backgroundColor: 'rgba(244, 63, 94, 0.05)',
    color: 'var(--danger)',
  },
  logoutLabel: {
    fontSize: '0.95rem',
  },
  tickerContainer: {
    padding: '1.5rem',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderTop: '1px solid var(--border)',
  },
  tickerHeader: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '700',
  },
  liveDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    boxShadow: '0 0 8px #10b981',
  },
  tickerValue: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currency: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#fff',
  },
  change: {
    fontSize: '0.85rem',
    color: 'var(--danger)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '600',
  }
};

export default Sidebar;
