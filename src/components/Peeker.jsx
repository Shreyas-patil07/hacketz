import React, { useState, useEffect, useRef } from 'react';
import mascot from '../assets/Github_01.png';

const Peeker = () => {
  const [peekState, setPeekState] = useState({
    active: false,
    side: Math.random() > 0.5 ? 'left' : 'right',
    top: Math.floor(Math.random() * 80 + 10) + '%'
  });
  
  const [isHiddenByFooter, setIsHiddenByFooter] = useState(false);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    const handleFooter = (e) => {
      setIsHiddenByFooter(e.detail);
      isHiddenRef.current = e.detail;
      if (e.detail) {
        // Hide immediately if footer is visible
        setPeekState(prev => ({ ...prev, active: false }));
      }
    };
    window.addEventListener('footer-visible', handleFooter);
    return () => window.removeEventListener('footer-visible', handleFooter);
  }, []);

  useEffect(() => {
    let timeoutId;
    let nextDelayId;

    const peek = () => {
      // If footer is visible, don't peek from sides.
      // The timeout loop in scheduleNextPeek will continue checking.
      if (isHiddenRef.current) {
        return;
      }
      
      const isLeft = Math.random() > 0.5;
      const side = isLeft ? 'left' : 'right';
      const top = Math.floor(Math.random() * 80 + 10) + '%';
      
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

  return (
    <div 
      style={{
        position: 'fixed',
        top: peekState.top,
        left: peekState.side === 'left' ? (peekState.active && !isHiddenByFooter ? '-40px' : '-260px') : 'auto',
        right: peekState.side === 'right' ? (peekState.active && !isHiddenByFooter ? '-40px' : '-260px') : 'auto',
        transform: `translateY(-50%) ${peekState.side === 'right' ? 'scaleX(-1)' : 'scaleX(1)'}`,
        transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 99999,
        pointerEvents: 'none'
      }}
    >
      <img 
        src={mascot} 
        alt="Peeking Character"
        style={{ 
          width: '160px', 
          height: 'auto', 
          display: 'block', 
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.6))',
          transform: peekState.active && !isHiddenByFooter ? 'rotate(35deg) scale(1)' : 'rotate(0deg) scale(0.6)',
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      />
    </div>
  );
};

export default Peeker;
