import React, { useState, useEffect, useRef } from 'react';
import mascot from '../assets/Github_01.png';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      // Dispatch custom event to notify Peeker.jsx to stop/start random peeking
      window.dispatchEvent(new CustomEvent('footer-visible', { detail: entry.isIntersecting }));
    }, { threshold: 0.1 });

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} style={{ padding: '40px 0', position: 'relative', background: 'rgba(7,11,20,0.6)', overflow: 'hidden' }}>
      <div className="inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Side Container */}
        <div style={{ display: 'flex', alignItems: 'center', height: '40px', position: 'relative' }}>
          
          {/* Default SP Text */}
          <span style={{ 
            fontFamily: "'Space Grotesk', sans-serif", 
            fontWeight: 700, 
            fontSize: '18px', 
            color: '#7c3aed', 
            letterSpacing: '-0.02em',
            position: 'absolute',
            transition: 'opacity 0.4s, transform 0.4s',
            opacity: isVisible ? 0 : 1,
            transform: isVisible ? 'translateY(20px)' : 'translateY(0)'
          }}>
            SP
          </span>

          {/* Footer Mascot & Name */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            transition: 'opacity 0.4s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            pointerEvents: isVisible ? 'auto' : 'none'
          }}>
            <img 
              src={mascot} 
              alt="Mascot" 
              style={{ 
                width: '44px', 
                height: '44px', 
                objectFit: 'contain',
                // Tilt the mascot to make it look like it's peeking up from the bottom edge
                transform: 'rotate(15deg) translateY(4px)' 
              }} 
            />
            <span style={{ 
              fontFamily: "'Space Grotesk', sans-serif", 
              fontWeight: 800, 
              fontSize: '18px', 
              color: '#d2bbff',
              letterSpacing: '-0.02em'
            }}>
              Hacketz
            </span>
          </div>
        </div>

        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#6b7280' }}>
          &copy; {new Date().getFullYear()} Built by Shreyas Patil.
        </span>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="https://github.com/shreyas-patil07" target="_blank" rel="noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#d2bbff'} onMouseOut={e => e.target.style.color = '#9CA3AF'}>GitHub</a>
          <a href="https://www.linkedin.com/in/shreyasrp07/" target="_blank" rel="noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#d2bbff'} onMouseOut={e => e.target.style.color = '#9CA3AF'}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
