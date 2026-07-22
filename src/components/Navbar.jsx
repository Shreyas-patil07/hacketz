import React, { useState, useEffect } from 'react';

const MOBILE_BP = 900; // px — covers large phones, small tablets

const navItems = [
  { id: 'hero',    label: 'Home'    },
  { id: 'about',   label: 'About'   },
  { id: 'work',    label: 'Work'    },
  { id: 'skills',  label: 'Skills'  },
  { id: 'dex',     label: 'Dex'     },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [active, setActive]   = useState('hero');
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BP);

  /* ── detect viewport width ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BP);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── active section on scroll ── */
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

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  /* ── SVG icons for mobile bar ── */
  const icons = {
    hero:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    about:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    work:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
    skills:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    dex:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    contact: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  };

  /* ─────────────────────────────────────────────────────────────────────────
     MOBILE — bottom nav bar
  ───────────────────────────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: 'rgba(7,11,20,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '10px 8px',
        paddingBottom: 'calc(10px + env(safe-area-inset-bottom))',
      }}>
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              background: active === id ? 'rgba(124,58,237,0.14)' : 'none',
              border: 'none',
              borderRadius: '10px',
              padding: '6px 10px',
              cursor: 'pointer',
              color: active === id ? '#d2bbff' : '#6b7280',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              minWidth: '44px',
              transition: 'color 0.2s, background 0.2s',
            }}
          >
            {icons[id]}
            <span>{label}</span>
          </button>
        ))}
      </nav>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────────
     DESKTOP — right-side dot nav
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <nav style={{
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
        const isActive  = active === id;
        const isHovered = hovered === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}
          >
            <span style={{
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
              textShadow: isActive ? '0 0 20px rgba(210,187,255,0.6)' : 'none',
            }}>
              {label}
            </span>
            <span style={{
              display: 'block',
              width: '4px',
              height: isActive ? '40px' : isHovered ? '20px' : '8px',
              borderRadius: '9999px',
              background: isActive
                ? 'linear-gradient(to bottom, #d2bbff, #7c3aed)'
                : isHovered ? 'rgba(210,187,255,0.6)' : 'rgba(255,255,255,0.3)',
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
