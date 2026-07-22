import React, { useState, useEffect, useRef } from 'react';
import mascot from '../assets/Github_01.png';

const Peeker = () => {
  const [peekState, setPeekState] = useState({
    active: false,
    side: Math.random() > 0.5 ? 'left' : 'right',
    top: Math.floor(Math.random() * 55 + 20) + '%'
  });

  const [isHiddenByFooter, setIsHiddenByFooter] = useState(false);
  const isHiddenRef = useRef(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleFooter = (e) => {
      setIsHiddenByFooter(e.detail);
      isHiddenRef.current = e.detail;
      if (e.detail) setPeekState(prev => ({ ...prev, active: false }));
    };
    window.addEventListener('footer-visible', handleFooter);
    return () => window.removeEventListener('footer-visible', handleFooter);
  }, []);

  useEffect(() => {
    let timeoutId;
    let nextDelayId;

    const peek = () => {
      if (isHiddenRef.current) return;
      const side = Math.random() > 0.5 ? 'left' : 'right';
      // Stay in middle 20-75% to avoid bottom nav and top chrome
      const top = Math.floor(Math.random() * 55 + 20) + '%';
      setPeekState({ active: true, side, top });
      timeoutId = setTimeout(() => {
        setPeekState(prev => ({ ...prev, active: false }));
      }, 2500);
    };

    const scheduleNextPeek = () => {
      const delay = Math.random() * 6000 + 6000;
      nextDelayId = setTimeout(() => {
        peek();
        scheduleNextPeek();
      }, delay);
    };

    scheduleNextPeek();
    timeoutId = setTimeout(peek, 3000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(nextDelayId);
    };
  }, []);

  const isVisible = peekState.active && !isHiddenByFooter;

  // Image size — slightly bigger on mobile so it's actually noticeable
  const imgSize = isMobile ? 110 : 160;

  // How much of the image to reveal (as % of its own width).
  // 40% reveal = translateX(-60%) from left edge, translateX(60%) from right edge.
  const revealPct = 40;
  const hidePct   = 115; // push past 100% so it's fully off-screen

  // ─── Key fix: anchor at left:0 / right:0 and use translateX ─────────────
  // overflow-x:hidden on <body> clips negative left/right on fixed elements
  // in Safari. Keeping the container AT the edge and using transforms avoids
  // this clipping entirely.
  // ─────────────────────────────────────────────────────────────────────────
  const buildTransform = (side, visible) => {
    const tx = side === 'left'
      ? `translateX(${visible ? `-${100 - revealPct}%` : `-${hidePct}%`})`
      : `translateX(${visible ? `${100 - revealPct}%` : `${hidePct}%`})`;
    return `translateY(-50%) ${tx}`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: peekState.top,
        left:  peekState.side === 'left'  ? 0     : 'auto',
        right: peekState.side === 'right' ? 0     : 'auto',
        width: `${imgSize}px`,
        transform: buildTransform(peekState.side, isVisible),
        transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <img
        src={mascot}
        alt="Peeking Character"
        style={{
          width: `${imgSize}px`,
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.6))',
          // Flip horizontally for right-side peek; rotate when visible
          transform: `${peekState.side === 'right' ? 'scaleX(-1) ' : ''}${
            isVisible ? 'rotate(35deg) scale(1)' : 'rotate(0deg) scale(0.7)'
          }`,
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformOrigin: 'bottom center',
        }}
      />
    </div>
  );
};

export default Peeker;
