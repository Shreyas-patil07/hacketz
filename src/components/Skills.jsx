import React, { useEffect, useRef } from 'react';

const skills = [
  {
    num: '01', title: 'Backend',
    icon: '⚙️',
    items: ['Python', 'FastAPI', 'Node.js', 'REST APIs', 'WebSockets'],
    accent: '#7c3aed',
  },
  {
    num: '02', title: 'Frontend',
    icon: '🎨',
    items: ['React', 'Next.js', 'HTML/CSS', 'Tailwind CSS'],
    accent: '#6366f1',
  },
  {
    num: '03', title: 'Database',
    icon: '🗄️',
    items: ['Firebase', 'PostgreSQL', 'MongoDB', 'SQLite'],
    accent: '#8b5cf6',
  },
  {
    num: '04', title: 'AI / ML',
    icon: '🤖',
    items: ['Gemini AI', 'OpenAI API', 'LangChain', 'Prompt Eng.'],
    accent: '#a855f7',
  },
  {
    num: '05', title: 'Tools & DevOps',
    icon: '🛠️',
    items: ['Git', 'Docker', 'GCP', 'Linux', 'Vite'],
    accent: '#7c3aed',
  },
  {
    num: '06', title: 'Currently Learning',
    icon: '📚',
    items: ['Rust', 'gRPC', 'Kafka', 'Redis'],
    accent: '#6366f1',
  },
];

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left')
      .forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.07}s`;
        observer.observe(el);
      });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="inner">
        <div className="reveal" style={{ marginBottom: '72px' }}>
          <span className="ey">03 — Skills</span>
          <h2 className="sh2">The <span className="tg">Stack.</span></h2>
          <p style={{ color: '#9CA3AF', fontSize: '1.0625rem', marginTop: '12px', lineHeight: 1.7 }}>
            Tools I reach for. Technologies I trust.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {skills.map((s) => (
            <div key={s.num} className="skill-card reveal-left">
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <span style={{ fontSize: '20px', lineHeight: 1 }}>{s.icon}</span>
                <div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'rgba(124,58,237,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block' }}>{s.num}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e0e2e6' }}>{s.title}</h3>
                </div>
              </div>
              {/* Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.items.map(item => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
