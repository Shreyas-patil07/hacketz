import React, { useEffect, useRef } from 'react';
import githubLogo from '../assets/Github.png';
import linkedinLogo from '../assets/Linkedin.png';
import mailLogo from '../assets/Mail.png';
import whatsappLogo from '../assets/Whatsapp.png';

const PHONE = '918591460867';
const EMAIL = '3shreyas2007@gmail.com';

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const links = [
    { name: 'Email', icon: mailLogo, href: `mailto:${EMAIL}`, delay: '0.1s' },
    { name: 'LinkedIn', icon: linkedinLogo, href: 'https://www.linkedin.com/in/shreyasrp07/', delay: '0.15s' },
    { name: 'WhatsApp', icon: whatsappLogo, href: `https://wa.me/${PHONE}?text=Hi%20Shreyas%2C%20I%20found%20you%20through%20your%20portfolio!`, delay: '0.2s' },
    { name: 'GitHub', icon: githubLogo, href: 'https://github.com/Shreyas-patil07', delay: '0.25s' }
  ];

  return (
    <section id="contact" ref={sectionRef} style={{ padding: '160px 0 60px 0', position: 'relative' }}>
      <div className="inner" style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* The Ultimate Premium Contact Card */}
        <div
          className="reveal contact-card-mobile"
          style={{
            position: 'relative',
            borderRadius: '32px',
            background: 'rgba(13,17,23,0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 30px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
            overflow: 'hidden',
            padding: '100px 40px 60px 40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Internal Ambient Glows */}
          <div style={{ position: 'absolute', width: '600px', height: '600px', top: '-300px', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 60%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', opacity: 0.03, pointerEvents: 'none', mixBlendMode: 'overlay' }} />

          {/* Eyebrow */}
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: '#d2bbff',
            textTransform: 'uppercase',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 1
          }}>
            05 — What's Next?
          </span>

          {/* Massive Headline */}
          <h2 className="contact-headline" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 1
          }}>
            Let's build <br />
            <span className="tg" style={{ background: 'linear-gradient(125deg, #ffffff 0%, #d2bbff 40%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              something great.
            </span>
          </h2>

          {/* Primary CTA */}
          <a
            href={`mailto:${EMAIL}`}
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              fontSize: '17px',
              fontWeight: 600,
              color: '#fff',
              background: '#7c3aed',
              padding: '18px 48px',
              borderRadius: '9999px',
              boxShadow: '0 8px 30px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s, background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.background = '#6d28d9';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,58,237,0.6), inset 0 1px 0 rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = '#7c3aed';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.2)';
            }}
          >
            Say Hello <span style={{ fontSize: '22px' }}>👋</span>
          </a>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)', margin: '80px 0 40px 0', position: 'relative', zIndex: 1 }} />

          {/* The Horizontal Logo Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                title={link.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(124,58,237,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                }}
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s'
                  }}
                />
              </a>
            ))}
          </div>

          <div style={{ marginTop: '32px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#6b7280', position: 'relative', zIndex: 1 }}>
            © {new Date().getFullYear()} Shreyas Patil. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
