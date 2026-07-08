import React, { useEffect, useState } from 'react';
import Backgrounds from './components/Backgrounds';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import DexTeaser from './components/DexTeaser';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalEasterEgg from './components/TerminalEasterEgg';
import Peeker from './components/Peeker';
import bgMusic from './assets/bg_music_trimmed.mp3';
import mascot from './assets/Github_01.png';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    const sb = document.getElementById('sb');

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
        // Browser blocked it (mousemove/scroll aren't valid gestures). 
        // Reset flag to try again on the next event (like a click).
        isAttempting = false;
      });
    };

    // Use capture phase so it triggers even if child elements stop propagation
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
          willChange: 'transform'
        }}
      />

      {/* Entrance Mascot */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: '50%', 
          zIndex: 100001,
          transform: `translate3d(-50%, ${hasEntered ? '100%' : '25%'}, 0)`, 
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          willChange: 'transform',
          cursor: hasEntered ? 'default' : 'pointer',
          pointerEvents: hasEntered ? 'none' : 'auto'
        }}
      >
        <img 
          src={mascot} 
          alt="Click to enter" 
          style={{ 
            height: '35vh', 
            maxHeight: '350px',
            minHeight: '200px',
            filter: 'drop-shadow(0 -10px 25px rgba(124,58,237,0.5))',
            transformOrigin: 'bottom center',
            transition: 'transform 0.3s ease',
            willChange: 'transform'
          }} 
          onMouseOver={(e) => { if(!hasEntered) e.currentTarget.style.transform = 'scale(1.08)'; }}
          onMouseOut={(e) => { if(!hasEntered) e.currentTarget.style.transform = 'scale(1)'; }}
        />
      </div>

      <div id="cursor" />
      <div id="cursor-ring" />
      <div id="sb" />

      <Backgrounds />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <DexTeaser />
      <Contact />
      <Footer />
      <TerminalEasterEgg />
      <Peeker />
    </>
  );
}

export default App;
