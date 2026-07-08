import React, { useEffect, useRef, useState } from 'react';

const categories = [
  {
    id: 'languages',
    title: 'Languages',
    icon: '{ }',
    accent: '#7c3aed',
    items: [
      { name: 'Python', pct: 90 },
      { name: 'Dart', pct: 80 },
      { name: 'SQL', pct: 75 },
      { name: 'HTML', pct: 70 },
      { name: 'C++', pct: 65 },
      { name: 'CSS', pct: 60 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '◆',
    accent: '#6366f1',
    items: [
      { name: 'React', pct: 90 },
      { name: 'Vite', pct: 85 },
      { name: 'Flutter', pct: 80 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '⚙',
    accent: '#8b5cf6',
    items: [
      { name: 'FastAPI', pct: 90 },
      { name: 'Flask', pct: 85 },
      { name: 'REST API', pct: 80 },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    icon: '◎',
    accent: '#a855f7',
    items: [
      { name: 'Firebase Firestore', pct: 90 },
      { name: 'Supabase', pct: 85 },
      { name: 'SQLite', pct: 80 },
      { name: 'PostgreSQL', pct: 75 },
      { name: 'MongoDB', pct: 70 },
    ],
  },
  {
    id: 'auth',
    title: 'Auth & Security',
    icon: '🔐',
    accent: '#ec4899',
    items: [
      { name: 'Firebase Auth', pct: 90 },
      { name: 'JWT', pct: 85 },
      { name: 'Argon2', pct: 80 },
    ],
  },
  {
    id: 'ai',
    title: 'AI Technology',
    icon: '✦',
    accent: '#14b8a6',
    items: [
      { name: 'Gemini API', pct: 90 },
      { name: 'Prompt Engineering', pct: 85 },
      { name: 'LLM Integration', pct: 80 },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Deploy',
    icon: '☁',
    accent: '#3b82f6',
    items: [
      { name: 'Vercel', pct: 90 },
      { name: 'Render', pct: 85 },
      { name: 'Cloudinary', pct: 80 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: '⚒',
    accent: '#f59e0b',
    items: [
      { name: 'Git & GitHub', pct: 90 },
      { name: 'Postman', pct: 85 },
      { name: 'Android Studio', pct: 80 },
      { name: 'VS Code', pct: 75 },
      { name: 'Antigravity', pct: 70 },
    ],
  },
];

const ProgressBar = ({ name, pct, accent, delay, isVisible }) => {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12.5px',
          color: '#c3c6d3',
          letterSpacing: '0.02em',
        }}>
          {name}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: accent,
          fontWeight: 600,
          opacity: 0.9,
        }}>
          {pct}%
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '6px',
        borderRadius: '100px',
        background: 'rgba(255,255,255,0.04)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          width: isVisible ? `${pct}%` : '0%',
          height: '100%',
          borderRadius: '100px',
          background: `linear-gradient(90deg, ${accent}, ${accent}cc)`,
          boxShadow: isVisible ? `0 0 12px ${accent}40` : 'none',
          transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }} />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('languages');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('v');
          setIsVisible(true);
        }
      }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left')
      .forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.07}s`;
        observer.observe(el);
      });
    return () => observer.disconnect();
  }, []);

  // Reset animation on tab change
  useEffect(() => {
    setIsVisible(false);
    const t = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(t);
  }, [activeTab]);

  const activeCat = categories.find(c => c.id === activeTab);
  const totalSkills = categories.reduce((sum, c) => sum + c.items.length, 0);
  const avgProficiency = Math.round(
    categories.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.pct, 0), 0) /
    totalSkills
  );

  return (
    <section id="skills" ref={sectionRef}>
      <div className="inner">
        {/* Header */}
        <div className="reveal" style={{ marginBottom: '56px' }}>
          <span className="ey">03 — Skills</span>
          <h2 className="sh2">The <span className="tg">Stack.</span></h2>
          <p style={{ color: '#9CA3AF', fontSize: '1.0625rem', marginTop: '12px', lineHeight: 1.7, maxWidth: '520px' }}>
            Tools I reach for. Technologies I trust. Here's what powers my projects.
          </p>
        </div>

        {/* Stats strip */}
        <div className="reveal" style={{
          display: 'flex',
          gap: '40px',
          marginBottom: '48px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          flexWrap: 'wrap',
        }}>
          {[
            { value: totalSkills + '+', label: 'Technologies' },
            { value: categories.length, label: 'Categories' },
            { value: avgProficiency + '%', label: 'Avg Proficiency' },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2rem',
                fontWeight: 800,
                color: '#d2bbff',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>{s.value}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginTop: '6px',
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="reveal-left" style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '0',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(13,17,23,0.5)',
          minHeight: '480px',
        }}>
          {/* Left sidebar — Tabs */}
          <div style={{
            borderRight: '1px solid rgba(255,255,255,0.05)',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            background: 'rgba(13,17,23,0.4)',
          }}>
            {categories.map(cat => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isActive
                      ? `linear-gradient(135deg, ${cat.accent}18, ${cat.accent}08)`
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      bottom: '20%',
                      width: '3px',
                      borderRadius: '0 4px 4px 0',
                      background: cat.accent,
                      boxShadow: `0 0 10px ${cat.accent}60`,
                    }} />
                  )}
                  <span style={{
                    fontSize: '14px',
                    lineHeight: 1,
                    width: '24px',
                    textAlign: 'center',
                    filter: isActive ? 'none' : 'grayscale(60%)',
                    opacity: isActive ? 1 : 0.5,
                    transition: 'all 0.25s',
                  }}>
                    {cat.icon}
                  </span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#e0e2e6' : '#6b7280',
                      transition: 'color 0.25s',
                      letterSpacing: '-0.01em',
                    }}>
                      {cat.title}
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: isActive ? cat.accent : '#4b5563',
                      transition: 'color 0.25s',
                      marginTop: '2px',
                    }}>
                      {cat.items.length} {cat.items.length === 1 ? 'skill' : 'skills'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right panel — Skills */}
          <div style={{ padding: '36px 40px', position: 'relative' }}>
            {/* Category heading */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '32px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: `${activeCat.accent}15`,
                border: `1px solid ${activeCat.accent}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}>
                {activeCat.icon}
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#e0e2e6',
                  letterSpacing: '-0.02em',
                }}>
                  {activeCat.title}
                </h3>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#6b7280',
                }}>
                  {activeCat.items.length} technologies
                </span>
              </div>
            </div>

            {/* Progress bars */}
            <div>
              {activeCat.items.map((item, i) => (
                <ProgressBar
                  key={`${activeCat.id}-${item.name}`}
                  name={item.name}
                  pct={item.pct}
                  accent={activeCat.accent}
                  delay={i * 0.08}
                  isVisible={isVisible}
                />
              ))}
            </div>

            {/* Ambient glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '-100px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${activeCat.accent}08 0%, transparent 70%)`,
              pointerEvents: 'none',
              transform: 'translateY(-50%)',
              transition: 'background 0.5s ease',
            }} />
          </div>
        </div>

        {/* Mobile-only: full list fallback */}
        <style>{`
          @media (max-width: 768px) {
            .skills-desktop { display: none !important; }
          }
          @media (min-width: 769px) {
            .skills-mobile { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Skills;
