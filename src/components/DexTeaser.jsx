import React, { useEffect, useRef } from 'react';

const DexTeaser = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: '🎮', title: 'Steam-Style Profiles', desc: 'Showcase your watch history like a Steam library — games replaced by movies & anime.' },
    { icon: '🏆', title: 'Achievement System', desc: 'Earn badges for watching milestones, completing series, and exploring genres.' },
    { icon: '👥', title: 'Social Layer', desc: 'Follow friends, see what they\'re watching, compare lists and scores.' },
    { icon: '🤖', title: 'AI Recommendations', desc: 'Powered by Gemini AI to surface titles you\'ll actually love, not just popular picks.' },
  ];

  return (
    <section id="dex" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', width: '1200px', height: '1200px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 55%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="inner" style={{ position: 'relative' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span className="ey" style={{ justifyContent: 'center' }}>04 — Featured Build</span>
          <h2 className="sh2" style={{ marginBottom: '20px' }}>
            Introducing <span className="tg">Dex.</span>
          </h2>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '8px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', marginBottom: '20px' }}>
            <span className="pulse-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4ade80', letterSpacing: '0.07em', fontWeight: 600 }}>IN ACTIVE DEVELOPMENT</span>
          </div>

          <p style={{ color: '#9CA3AF', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
            Your watch history. Your identity. A gamified platform for movie and anime enthusiasts — built like Steam for the streaming era.
          </p>
        </div>

        {/* Feature grid */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {features.map((f) => (
            <div key={f.title} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '28px', lineHeight: 1 }}>{f.icon}</span>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e0e2e6' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Code preview */}
        <div className="reveal glass-hi" style={{ borderRadius: '20px', padding: '40px', maxWidth: '860px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Mac chrome */}
          <div style={{ display: 'flex', gap: '7px', marginBottom: '24px', alignItems: 'center' }}>
            {['#f87171', '#fbbf24', '#34d399'].map((c, i) => (
              <div key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, opacity: 0.7 }} />
            ))}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4b5563', marginLeft: 'auto' }}>dex/core/user.ts</span>
          </div>
          <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: 2, overflowX: 'auto' }}>
            <code>
              <span className="sh-c">// Core feature — Dex profile engine</span>{'\n'}
              <span className="sh-p">class</span>{' '}
              <span style={{ color: '#e0e2e6', fontWeight: 600 }}>DexUser</span>{' '}
              <span className="sh-p">{'{'}</span>{'\n'}
              {'  '}<span className="sh-key">level</span><span className="sh-p">:</span>{' '}<span className="sh-str">number</span>{' = '}<span className="sh-s2">0</span><span className="sh-p">;</span>
              {'  '}<span className="sh-c">// computed from watchTime</span>{'\n'}
              {'  '}<span className="sh-key">showcase</span><span className="sh-p">:</span>{' '}<span className="sh-str">Media[]</span><span className="sh-p">;</span>
              {'  '}<span className="sh-c">// Steam-style showcase</span>{'\n'}
              {'  '}<span className="sh-key">badges</span><span className="sh-p">:</span>{' '}<span className="sh-str">Achievement[]</span><span className="sh-p">;</span>
              {'  '}<span className="sh-c">// earned milestones</span>{'\n'}
              {'\n'}
              {'  '}<span className="sh-s2">constructor</span><span className="sh-p">(</span><span className="sh-key">profile</span><span className="sh-p">: </span><span className="sh-str">UserProfile</span><span className="sh-p">) {'{'}</span>{'\n'}
              {'    '}<span className="sh-key">this</span><span className="sh-p">.</span><span className="sh-key">level</span>{' = '}<span className="sh-s2">calculateLevel</span><span className="sh-p">(profile.watchTime);</span>{'\n'}
              {'    '}<span className="sh-key">this</span><span className="sh-p">.</span><span className="sh-key">showcase</span>{' = '}<span className="sh-s2">selectShowcase</span><span className="sh-p">(profile.favorites);</span>{'\n'}
              {'    '}<span className="sh-key">this</span><span className="sh-p">.</span><span className="sh-key">badges</span>{' = '}<span className="sh-s2">unlockBadges</span><span className="sh-p">(profile.history);</span>{'\n'}
              {'  '}<span className="sh-p">{'}'}</span>{'\n'}
              <span className="sh-p">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default DexTeaser;
