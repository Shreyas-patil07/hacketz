import React, { useEffect, useState, lazy, Suspense } from 'react';
import Backgrounds from './components/Backgrounds';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Peeker from './components/Peeker';
import bgMusic from './assets/bg_music_trimmed.mp3';
import mascot from './assets/Github_01.png';

// Lazy-load everything below the fold — defers JS parse until needed
const About          = lazy(() => import('./components/About'));
const Projects       = lazy(() => import('./components/Projects'));
const Skills         = lazy(() => import('./components/Skills'));
const DexTeaser      = lazy(() => import('./components/DexTeaser'));
const Contact        = lazy(() => import('./components/Contact'));
const Footer         = lazy(() => import('./components/Footer'));
const TerminalEasterEgg = lazy(() => import('./components/TerminalEasterEgg'));

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    const sb = document.getElementById('sb');

    // Skip cursor entirely on touch / mobile — no mouse cursor present
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let ringX = mouseX, ringY = mouseY;
    let isClicking = false;
    let currentScale = 1;
    let scrollProgress = 0;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      // Read DOM inside passive event listener to prevent layout thrashing during RAF
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      scrollProgress = height > 0 ? winScroll / height : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize scroll progress on mount
    handleScroll();

    const animateLoop = () => {
      // Ultra-smooth lerping for both dot and ring
      dotX += (mouseX - dotX) * 0.8; // High lerp factor for highly responsive dot
      dotY += (mouseY - dotY) * 0.8;
      ringX += (mouseX - ringX) * 0.2; // Slightly faster lerp for trailing ring to feel less laggy
      ringY += (mouseY - ringY) * 0.2;
      
      // Smooth scale lerp in JS to prevent CSS transition conflicts
      const targetScale = isClicking ? 0.6 : 1;
      currentScale += (targetScale - currentScale) * 0.3;

      if (cursor) {
        cursor.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      }
      if (sb) {
        sb.style.transform = `scaleX(${scrollProgress})`;
      }
      
      rafId = requestAnimationFrame(animateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateLoop);

    // Click feedback
    const handleMouseDown = () => { isClicking = true; };
    const handleMouseUp = () => { isClicking = false; };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hover state on interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], .chip, .glass-card');
    const addHover = () => { cursor?.classList.add('hovering'); ring?.classList.add('hovering'); };
    const removeHover = () => { cursor?.classList.remove('hovering'); ring?.classList.remove('hovering'); };
    interactives.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover); });

    // Magnetic buttons
    const magneticBtns = document.querySelectorAll('.btn-m');
    const handleMagneticMove = (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    };
    const handleMagneticLeave = (e) => { e.currentTarget.style.transform = 'translate(0,0)'; };
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', handleMagneticMove);
      btn.addEventListener('mouseleave', handleMagneticLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      interactives.forEach(el => { el.removeEventListener('mouseenter', addHover); el.removeEventListener('mouseleave', removeHover); });
      magneticBtns.forEach(btn => {
        btn.removeEventListener('mousemove', handleMagneticMove);
        btn.removeEventListener('mouseleave', handleMagneticLeave);
      });
    };
  }, []);

  // Background Music Logic
  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.volume = 0.3;
    audio.loop = true;
    audioRef.current = audio;

    let isAttempting = false;
    const startAudio = () => {
      if (isAttempting) return;
      isAttempting = true;

      // Start playback from 130 seconds
      if (audio.currentTime === 0) {
        audio.currentTime = 130;
      }
      
      audio.play().then(() => {
        // Successfully started playing, remove all listeners and hide overlay
        setHasEntered(true);
        document.removeEventListener('click', startAudio, { capture: true });
        document.removeEventListener('touchstart', startAudio, { capture: true });
        document.removeEventListener('keydown', startAudio, { capture: true });
        document.removeEventListener('mousemove', startAudio, { capture: true });
        document.removeEventListener('scroll', startAudio, { capture: true });
      }).catch(e => {
        isAttempting = false;
      });
    };

    document.addEventListener('click', startAudio, { capture: true });
    document.addEventListener('touchstart', startAudio, { capture: true });
    document.addEventListener('keydown', startAudio, { capture: true });
    document.addEventListener('mousemove', startAudio, { capture: true });
    document.addEventListener('scroll', startAudio, { capture: true });

    return () => {
      document.removeEventListener('click', startAudio, { capture: true });
      document.removeEventListener('touchstart', startAudio, { capture: true });
      document.removeEventListener('keydown', startAudio, { capture: true });
      document.removeEventListener('mousemove', startAudio, { capture: true });
      document.removeEventListener('scroll', startAudio, { capture: true });
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Sync mute state to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);


  // Cursor Visibility Logic
  useEffect(() => {
    if (hasEntered) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }
    
    // Cleanup on unmount just in case
    return () => document.body.classList.remove('custom-cursor');
  }, [hasEntered]);

  return (
    <>
      {/* Entrance Overlay Shutter */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 100000,
          pointerEvents: hasEntered ? 'none' : 'auto',
          transform: `translate3d(0, ${hasEntered ? '-100%' : '0'}, 0)`,
          transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
          background: 'radial-gradient(circle at center, rgba(124,58,237,0.15) 0%, rgba(7,11,20,0.98) 100%)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          willChange: 'transform',
          overflow: 'hidden'
        }}
      >
        {/* High-Speed Chasing Particles (Untouchable Activity) */}
        {!hasEntered && (
          <div className="particle-container">
            {/* Pair 1: Blue → Orange */}
            <div className="particle target-1" />
            <div className="particle chaser-1" />
            {/* Pair 2: Purple → Green */}
            <div className="particle target-2" />
            <div className="particle chaser-2" />
            {/* Pair 3: Pink → Yellow */}
            <div className="particle target-3" />
            <div className="particle chaser-3" />
          </div>
        )}
      </div>

      {/* Entrance Mascot */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: '50%', 
          zIndex: 100001,
          transform: hasEntered
            ? 'translate(-50%, 110%)'
            : 'translate(-50%, 0)',
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          willChange: 'transform',
          cursor: hasEntered ? 'default' : 'pointer',
          pointerEvents: hasEntered ? 'none' : 'auto'
        }}
      >
        <div className={hasEntered ? '' : 'impatient-peeker'}>
          <img 
            src={mascot} 
            alt="Click to enter" 
            style={{ 
              height: 'clamp(180px, 32vh, 380px)',
              display: 'block',
              filter: 'drop-shadow(0 -10px 25px rgba(124,58,237,0.5))',
              transformOrigin: 'bottom center',
              transition: 'transform 0.3s ease',
              willChange: 'transform'
            }} 
            onMouseOver={(e) => { if(!hasEntered) e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseOut={(e) => { if(!hasEntered) e.currentTarget.style.transform = 'scale(1)'; }}
          />
        </div>
      </div>

      <div id="cursor" style={{ opacity: hasEntered ? 1 : 0, transition: 'opacity 0.3s ease' }} />
      <div id="cursor-ring" style={{ opacity: hasEntered ? 1 : 0, transition: 'opacity 0.3s ease' }} />
      <div id="sb" />

      <Backgrounds />
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Projects />
        <Skills />
        <DexTeaser />
        <Contact />
        <Footer />
        <TerminalEasterEgg />
      </Suspense>
      <Peeker />

      {/* Mute / Unmute Button */}
      {hasEntered && (
        <button
          className="mobile-mute-btn"
          onClick={() => setIsMuted(m => !m)}
          title={isMuted ? 'Unmute music' : 'Mute music'}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 99990,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(13,17,23,0.4)',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(124,58,237,0.25)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isMuted ? (
            // Muted icon (speaker with X)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            // Unmuted icon (speaker with waves)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d2bbff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}

export default App;
