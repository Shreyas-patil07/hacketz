import React, { useEffect, useRef, useState } from 'react';
import shreyasO from '../assets/Shreyas_o.png';
import shreyasFlip from '../assets/Shreyas.png';

const About = () => {
  const sectionRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.animated) {
          e.target.dataset.animated = 'true';
          const target = parseInt(e.target.dataset.target);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 30));
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            e.target.innerText = current;
            if (current >= target) clearInterval(timer);
          }, 30);
        }
      }),
      { threshold: 0.4 }
    );
    sectionRef.current?.querySelectorAll('.counter').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 1,   label: 'Hackathon Win',   sub: '2026 UNIFIND'   },
    { value: 2,   label: 'Production Apps', sub: 'Real clients'    },
    { value: 10,  label: 'Technologies',    sub: 'Always growing'  },
    { value: '∞', label: 'Curiosity',       sub: 'Never stops', noCounter: true },
  ];

  return (
    <section id="about" ref={sectionRef}>
      <div className="inner">
        <div className="reveal" style={{ marginBottom: '72px' }}>
          <span className="ey">01 — About</span>
          <h2 className="sh2">Engineer who builds <span className="tg">products.</span></h2>
        </div>

        {/* TOP ROW: 2-col text and photo */}
        <div className="responsive-grid-about">

          {/* LEFT — text & code */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {[
              "I'm Shreyas — a second-year computer engineering student who started freelancing before finishing my first year. I don't build tutorials. I build things people actually use.",
              "My focus is backend systems: APIs that scale, databases that don't break, services that talk to each other elegantly. I care about architecture as much as the code.",
              "In 2026, my team won a hackathon with UNIFIND. Currently building Dex — a Steam-inspired platform for movie and anime watchers.",
            ].map((text, i) => (
              <p key={i} className="reveal" style={{ fontSize: '1.1rem', color: '#9CA3AF', lineHeight: 1.8, transitionDelay: `${i * 0.1}s` }}>
                {text.includes('Dex') ? (
                  <>{text.split('Dex')[0]}<span style={{ color: '#d2bbff', fontWeight: 500 }}>Dex</span>{text.split('Dex')[1]}</>
                ) : text}
              </p>
            ))}

            {/* Premium JSON card */}
            <div className="reveal glass-card" style={{ padding: '24px', borderRadius: '16px', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
                {['#f87171','#fbbf24','#34d399'].map((c, j) => (
                  <div key={j} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.7 }} />
                ))}
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4b5563', marginLeft: 'auto' }}>profile.json</span>
              </div>
              <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: 2, overflowX: 'auto' }}>
                <code>
                  <span className="sh-p">{'{'}</span>{'\n'}
                  {'  '}<span className="sh-str">"role"</span><span className="sh-p">:</span>{'     '}<span className="sh-s2">"Backend Engineer"</span><span className="sh-p">,</span>{'\n'}
                  {'  '}<span className="sh-str">"year"</span><span className="sh-p">:</span>{'     '}<span className="sh-s2">"CS Engineering, Year 2"</span><span className="sh-p">,</span>{'\n'}
                  {'  '}<span className="sh-str">"status"</span><span className="sh-p">:</span>{'   '}<span className="sh-s2">"Open to Opportunities"</span><span className="sh-p">,</span>{'\n'}
                  {'  '}<span className="sh-str">"building"</span><span className="sh-p">:</span>{' '}<span className="sh-s2">"Dex"</span>{'\n'}
                  <span className="sh-p">{'}'}</span>
                </code>
              </pre>
            </div>
          </div>

          {/* RIGHT — Large floating photo */}
          <div className="reveal" style={{ position: 'relative', padding: '20px' }}>
            {/* Ambient glow behind photo */}
            <div style={{ position: 'absolute', inset: '0', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
            
            <div style={{ perspective: '1200px', zIndex: 1, position: 'relative' }}>
              <style>{`
                .photo-wrapper {
                  width: 100%;
                  max-width: 360px;
                  margin: 0 auto;
                  aspect-ratio: 1 / 1;
                  position: relative;
                  transform-style: preserve-3d;
                  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                  cursor: pointer;
                  border-radius: 32px;
                }
                .photo-wrapper.is-flipped {
                  transform: rotateY(180deg);
                }
                .photo-wrapper:not(.is-flipped):hover {
                  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                @keyframes shake {
                  10%, 90% { transform: rotateZ(-1deg); }
                  20%, 80% { transform: rotateZ(1.5deg); }
                  30%, 50%, 70% { transform: rotateZ(-2deg); }
                  40%, 60% { transform: rotateZ(2deg); }
                  100% { transform: rotateZ(0deg); }
                }
                .photo-face {
                  position: absolute;
                  inset: 0;
                  backface-visibility: hidden;
                  -webkit-backface-visibility: hidden;
                  border-radius: 32px;
                  overflow: hidden;
                  border: 1px solid rgba(255,255,255,0.08);
                  box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.15);
                  background: #0d1117;
                }
                .photo-face img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  display: block;
                  opacity: 0.95;
                  transition: opacity 0.3s;
                }
                .photo-wrapper:hover .photo-face img {
                  opacity: 1;
                }
                .photo-face-back {
                  transform: rotateY(180deg);
                  border-color: rgba(210,187,255,0.3);
                }
                .photo-hint {
                  text-align: center;
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 11px;
                  color: #6b7280;
                  letter-spacing: 0.08em;
                  margin-top: 16px;
                }
              `}</style>

              <div
                className={`photo-wrapper ${flipped ? 'is-flipped' : ''}`}
                onClick={() => setFlipped(f => !f)}
                title={flipped ? 'Click to flip back' : 'Click to reveal'}
              >
                {/* Front face */}
                <div className="photo-face">
                  <img src={shreyasO} alt="Shreyas Patil" />
                </div>
                {/* Back face */}
                <div className="photo-face photo-face-back">
                  <img src={shreyasFlip} alt="Shreyas Patil (alternate)" />
                </div>
              </div>
              <p className="photo-hint">{flipped ? '← click to flip back' : 'hover to shake · click to flip →'}</p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Full width stats strip */}
        <div className="reveal stats-grid">
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', transitionDelay: `${i * 0.1}s` }}>
              <div
                className={stat.noCounter ? '' : 'counter'}
                data-target={stat.value}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '4rem',
                  fontWeight: 800,
                  color: '#e0e2e6',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  marginBottom: '12px',
                  textShadow: '0 0 40px rgba(124,58,237,0.3)'
                }}
              >
                {stat.noCounter ? stat.value : 0}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#d2bbff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', fontWeight: 600 }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#6b7280' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
