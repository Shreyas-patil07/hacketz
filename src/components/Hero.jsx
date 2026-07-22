import React, { useState, useEffect, useRef } from 'react';

const WORDS = [
  'Backend Engineer',
  'API Architect',
  'Product Builder',
  'Hackathon Winner',
];

const useTypewriter = (words, speed = 80, pauseMs = 2000) => {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pauseMs);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pauseMs]);

  return display;
};

const Hero = () => {
  const heroRef = useRef(null);
  const typed = useTypewriter(WORDS);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
      { threshold: 0.1 }
    );
    heroRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', paddingTop: 'clamp(72px, 15vw, 110px)', paddingBottom: 'clamp(32px, 8vw, 64px)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', width: '700px', height: '700px', top: '-200px', right: '-200px', background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '500px', height: '500px', bottom: '-100px', left: '-150px', background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="inner" style={{ width: '100%' }}>
        <div className="responsive-grid-hero">
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Status badge */}
            <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '7px 16px', borderRadius: '8px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', width: 'fit-content', backdropFilter: 'blur(8px)' }}>
              <span className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.7)', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#c3c6d3', letterSpacing: '0.06em' }}>Currently Open to Opportunities</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span className="tg reveal" style={{ fontSize: 'clamp(3.2rem, 7.5vw, 5.8rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em', transitionDelay: '0.05s' }}>
                Hi.
              </span>
              <span className="reveal" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.035em', color: '#e8e8ec', transitionDelay: '0.12s' }}>
                I'm Shreyas.
              </span>
              {/* Typewriter line */}
              <span className="reveal" style={{ fontSize: 'clamp(1rem, 4vw, 1.85rem)', fontWeight: 600, color: '#9CA3AF', lineHeight: 1.3, minHeight: '2em', transitionDelay: '0.18s' }}>
                {typed}<span className="type-cursor" />
              </span>
            </h1>

            <p className="reveal" style={{ fontSize: '1.0625rem', color: '#9CA3AF', maxWidth: '440px', lineHeight: 1.8, transitionDelay: '0.24s' }}>
              I build software that solves real problems — not tutorials. Hackathon winner, freelancer, currently building Dex.
            </p>

            {/* CTA row */}
            <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', transitionDelay: '0.3s' }}>
              <button
                className="btn-primary btn-m"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </button>
              <a
                className="btn-secondary btn-m"
                href="https://github.com/shreyas-patil07"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span style={{ fontSize: '16px' }}>↗</span>
              </a>
              <a 
                className="btn-secondary btn-m"
                href="https://drive.google.com/file/d/1pTpbxpYqqPlJNLFGaJqXu4b1ewNfvtzk/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            </div>

            {/* Social proof row */}
            <div className="reveal" style={{ display: 'flex', gap: '24px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', transitionDelay: '0.36s' }}>
              {[
                { value: '1', label: 'Hackathon Win' },
                { value: '2+', label: 'Products Shipped' },
                { value: '10+', label: 'Technologies' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#d2bbff', letterSpacing: '-0.03em' }}>{stat.value}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating code card */}
          <div className="reveal-right float" style={{ position: 'relative', transitionDelay: '0.2s' }}>
            <div style={{ position: 'absolute', inset: '-60px', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div className="glass-hi" style={{ borderRadius: '18px', padding: '28px', borderLeft: '3px solid rgba(124,58,237,0.6)', position: 'relative' }}>
              {/* Window chrome */}
              <div style={{ display: 'flex', gap: '7px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f87171', opacity: 0.8 }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fbbf24', opacity: 0.8 }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#34d399', opacity: 0.8 }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4b5563', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#7c3aed', opacity: 0.6 }}>●</span> shreyas.config.ts
                </span>
              </div>

              <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(10px, 2.8vw, 13.5px)', lineHeight: 1.9, overflowX: 'auto' }}>
                <code>
                  <span className="sh-p">const</span>{' '}
                  <span style={{ color: '#e0e2e6', fontWeight: 600 }}>shreyas</span>{' '}
                  <span className="sh-p">= {'{'}</span>{'\n'}
                  {'  '}<span className="sh-key">role</span><span className="sh-p">:</span>{'      '}<span className="sh-str">'Backend Engineer'</span><span className="sh-p">,</span>{'\n'}
                  {'  '}<span className="sh-key">currently</span><span className="sh-p">:</span>{' '}<span className="sh-str">'Building Dex'</span><span className="sh-p">,</span>{'\n'}
                  {'  '}<span className="sh-key">status</span><span className="sh-p">:</span>{'    '}<span className="sh-s2">'Open to Opportunities'</span><span className="sh-p">,</span>{'\n'}
                  {'  '}<span className="sh-key">stack</span><span className="sh-p">: [</span><span className="sh-str">'FastAPI'</span><span className="sh-p">,</span><span className="sh-str">'React'</span><span className="sh-p">,</span>{'\n'}
                  {'           '}<span className="sh-str">'Firebase'</span><span className="sh-p">,</span><span className="sh-str">'Gemini AI'</span><span className="sh-p">],</span>{'\n'}
                  {'  '}<span className="sh-key">award</span><span className="sh-p">:</span>{'     '}<span className="sh-s2 tg-gold">'Hackathon Winner 2026'</span><span className="sh-p">,</span>{'\n'}
                  {'  '}<span className="sh-key">location</span><span className="sh-p">:</span>{'  '}<span className="sh-str">'Mumbai, India'</span>{'\n'}
                  <span className="sh-p">{'};'}</span>
                </code>
              </pre>

              {/* Bottom badge */}
              <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4b5563' }}>TypeScript • ESNext</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  compiles successfully
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
