import React, { useEffect, useRef } from 'react';

const categories = [
  {
    id: 'languages',
    title: 'Languages',
    icon: '{ }',
    accent: '#7c3aed',
    spanClasses: 'bento-col-span-2 bento-row-span-2',
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
    spanClasses: 'bento-col-span-2',
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
    spanClasses: 'bento-col-span-1',
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
    spanClasses: 'bento-col-span-1',
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
    spanClasses: 'bento-col-span-2',
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
    spanClasses: 'bento-col-span-2',
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
    spanClasses: 'bento-col-span-2',
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
    spanClasses: 'bento-col-span-2',
    items: [
      { name: 'Git & GitHub', pct: 90 },
      { name: 'Postman', pct: 85 },
      { name: 'Android Studio', pct: 80 },
      { name: 'VS Code', pct: 75 },
      { name: 'Antigravity', pct: 70 },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting && !e.target.classList.contains('v')) {
          e.target.classList.add('v');
          // Trigger progress bar animations within this card
          const bars = e.target.querySelectorAll('.bento-progress-fill');
          bars.forEach(bar => {
            bar.style.width = bar.dataset.width;
          });
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

  // Hover effect for mouse tracking
  useEffect(() => {
    const handleMouseMove = e => {
      for(const card of document.querySelectorAll('.bento-card')) {
        const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const totalSkills = categories.reduce((sum, c) => sum + c.items.length, 0);
  const avgProficiency = Math.round(
    categories.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.pct, 0), 0) /
    totalSkills
  );

  return (
    <section id="skills" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
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

        {/* Bento Grid */}
        <div className="bento-grid">
          {categories.map((cat, i) => (
            <div key={cat.id} className="bento-card reveal-left">
              
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{
                  width: '36px', height: '36px',
                  borderRadius: '10px',
                  background: `${cat.accent}15`,
                  border: `1px solid ${cat.accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0
                }}>
                  {cat.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#e0e2e6',
                  letterSpacing: '-0.02em',
                }}>
                  {cat.title}
                </h3>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
                {cat.items.map((item, j) => (
                  <div key={item.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#c3c6d3' }}>
                        {item.name}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: cat.accent, fontWeight: 600 }}>
                        {item.pct}%
                      </span>
                    </div>
                    <div className="bento-progress-track">
                      <div 
                        className="bento-progress-fill"
                        data-width={`${item.pct}%`}
                        style={{ 
                          width: '0%', 
                          background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}cc)`,
                          boxShadow: `0 0 10px ${cat.accent}50`,
                          transitionDelay: `${j * 0.1}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Accent Glow Blob */}
              <div style={{
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: `radial-gradient(circle, ${cat.accent}15 0%, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0
              }} />

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
