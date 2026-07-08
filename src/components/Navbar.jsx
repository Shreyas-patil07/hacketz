import React, { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero',    label: 'Home'    },
  { id: 'about',   label: 'About'   },
  { id: 'work',    label: 'Work'    },
  { id: 'skills',  label: 'Skills'  },
  { id: 'dex',     label: 'Dex'     },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('hero');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      for (const { id } of [...navItems].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 250) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav-container" style={{
      position: 'fixed',
      right: '32px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px',
      background: 'none',
      border: 'none',
    }}>
      {navItems.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 0',
            }}
          >
            {/* Label — always visible when active, slides in on hover */}
            <span className="nav-label" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isActive ? '#d2bbff' : isHovered ? '#e0e2e6' : '#9ca3af',
              opacity: isActive || isHovered ? 1 : 0,
              transform: isActive || isHovered ? 'translateX(0)' : 'translateX(12px)',
              transition: 'opacity 0.25s ease, transform 0.25s ease, color 0.2s',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              textShadow: isActive
                ? '0 0 20px rgba(210,187,255,0.6)'
                : 'none',
            }}>
              {label}
            </span>

            {/* Dot / bar */}
            <span className={`nav-dot ${isActive ? 'nav-dot-active' : ''}`} style={{
              display: 'block',
              width: '4px',
              height: isActive ? '40px' : isHovered ? '20px' : '8px',
              borderRadius: '9999px',
              background: isActive
                ? 'linear-gradient(to bottom, #d2bbff, #7c3aed)'
                : isHovered
                  ? 'rgba(210,187,255,0.6)'
                  : 'rgba(255,255,255,0.3)',
              transition: 'height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.25s',
              boxShadow: isActive ? '0 0 16px rgba(124,58,237,0.8)' : 'none',
              flexShrink: 0,
            }} />
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
