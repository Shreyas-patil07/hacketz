import React, { useEffect, useRef } from 'react';
import ufLogo from '../assets/UF.png';
import cafeLogo from '../assets/logo00.png';

const projects = [
  {
    id: 'unifind',
    varName: 'unifind',
    logo: ufLogo,
    logoAlt: 'UNIFIND Logo',
    badge: { text: 'HACKATHON WINNER', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.25)' },
    title: 'UNIFIND',
    url: 'https://teamgambit.tech/home',
    github: 'https://github.com/Shreyas-patil07/UNIFIND',
    tags: ['AI Marketplace', 'FastAPI', 'React', 'Firebase'],
    description: 'A centralized marketplace for university students to trade, connect, and build community. Engineered for scale with real-time interactions and an AI-powered matching engine.',
    architecture: 'Microservices / Event-Driven',
    code: [
      { key: 'type',   val: "'AI Marketplace'" },
      { key: 'impact', val: "'Hackathon Winner'" },
      { key: 'status', val: "'Production'" },
    ],
  },
  {
    id: 'cafe',
    varName: 'cafeManager',
    logo: cafeLogo,
    logoAlt: 'Gaming Cafe Logo',
    badge: null,
    title: 'GAMING CAFE',
    url: null,
    github: 'https://github.com/Shreyas-patil07/gaming_cafe_manager',
    tags: ['Commercial', 'React', 'Offline-First', 'Node.js'],
    description: 'A robust management system for gaming centers. Handles billing, session tracking, and inventory with zero-latency local synchronization — works fully offline.',
    architecture: 'Local-First / SQLite Sync',
    code: [
      { key: 'mode',   val: "'Offline-First'" },
      { key: 'target', val: "'Commercial'" },
      { key: 'sync',   val: "'Real-time'" },
    ],
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '900px', height: '900px', top: '-350px', right: '-400px', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="inner">
        <div className="reveal" style={{ marginBottom: '72px' }}>
          <span className="ey">02 — Work</span>
          <h2 className="sh2">Selected <span className="tg">Projects.</span></h2>
          <p style={{ color: '#9CA3AF', fontSize: '1.0625rem', marginTop: '12px', maxWidth: '480px', lineHeight: 1.7 }}>
            Products built with purpose. Every line has a reason.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`project-card ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Code pane */}
              <div className="project-code-pane">
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '18px' }}>
                    {['#f87171','#fbbf24','#34d399'].map((c, j) => (
                      <div key={j} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.7 }} />
                    ))}
                  </div>
                  <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(11px, 3vw, 14px)', lineHeight: 2, overflowX: 'auto' }}>
                    <code>
                      <span className="sh-p">const</span>{' '}
                      <span style={{ color: '#e0e2e6', fontWeight: 600 }}>{project.varName}</span>{' '}
                      <span className="sh-p">= {'{'}</span>{'\n'}
                      {project.code.map(line => (
                        <span key={line.key}>
                          {'  '}<span className="sh-key">{line.key}</span>
                          <span className="sh-p">:</span>{' '}
                          <span className="sh-s2">{line.val}</span>
                          <span className="sh-p">,</span>{'\n'}
                        </span>
                      ))}
                      <span className="sh-p">{'};'}</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Info pane */}
              <div className="project-info-pane">
                {/* Header Row: Title/Badge (Left) & Logo (Right) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#fff' }}>
                      {project.title}
                    </h3>
                    
                    {project.badge && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 14px', borderRadius: '8px', background: project.badge.bg, border: `1px solid ${project.badge.border}`, alignSelf: 'flex-start' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.badge.color, display: 'inline-block' }} />
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: project.badge.color, fontWeight: 700, letterSpacing: '0.08em' }}>{project.badge.text}</span>
                      </div>
                    )}
                  </div>

                  <img
                    src={project.logo}
                    alt={project.logoAlt}
                    style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '16px',
                      objectFit: 'cover',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: '#0d1117',
                      flexShrink: 0
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map(tag => <span key={tag} className="chip">{tag}</span>)}
                </div>

                <p style={{ fontSize: '1.05rem', color: '#9CA3AF', lineHeight: 1.75 }}>
                  {project.description}
                </p>

                {/* Links */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <a href={project.github} target="_blank" rel="noreferrer"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#d2bbff', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'color 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.color = '#fff'}
                    onMouseOut={e => e.currentTarget.style.color = '#d2bbff'}
                  >
                    GitHub ↗
                  </a>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noreferrer"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#d2bbff', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'color 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.color = '#fff'}
                      onMouseOut={e => e.currentTarget.style.color = '#d2bbff'}
                    >
                      Live Site ↗
                    </a>
                  )}
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Architecture: {project.architecture}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
