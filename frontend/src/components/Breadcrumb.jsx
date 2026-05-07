import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav style={styles.nav}>
      <div style={styles.item}>
        <Home size={14} style={{ marginRight: 8 }} />
        <Link to="/" style={styles.link}>Main</Link>
      </div>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

        return (
          <div key={to} style={styles.item}>
            <ChevronRight size={14} style={styles.separator} />
            {isLast ? (
              <span style={styles.active}>{label}</span>
            ) : (
              <Link to={to} style={styles.link}>{label}</Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '2rem',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  active: {
    color: 'var(--accent)',
    fontWeight: '600',
  },
  separator: {
    margin: '0 8px',
    opacity: 0.5,
  },
};

export default Breadcrumb;
