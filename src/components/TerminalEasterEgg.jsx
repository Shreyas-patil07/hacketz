import React, { useEffect, useState, useRef } from 'react';

const TerminalEasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    'SHREYAS_OS v1.0.0',
    'Type "help" for a list of commands.',
    ''
  ]);
  const inputRef = useRef(null);
  
  useEffect(() => {
    let k = '';
    const konami = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
    
    const handleKeyDown = (e) => {
      k += e.key;
      if (k.length > konami.length) {
        k = k.substring(k.length - konami.length);
      }
      if (k === konami) {
        setIsOpen(true);
        k = '';
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newOutput = [...output, `visitor@shreyas:~$ ${cmd}`];
      
      switch (cmd) {
        case 'help':
          newOutput.push('Available commands:', '  whoami  - display user info', '  sudo    - execute a command as superuser', '  clear   - clear terminal', '  exit    - close terminal');
          break;
        case 'whoami':
          newOutput.push('guest_user_90210');
          break;
        case 'sudo':
          newOutput.push('shreyas is not in the sudoers file. This incident will be reported.');
          break;
        case 'clear':
          setOutput([]);
          setInput('');
          return;
        case 'exit':
          setIsOpen(false);
          setInput('');
          return;
        case '':
          break;
        default:
          newOutput.push(`bash: ${cmd}: command not found`);
      }
      
      newOutput.push('');
      setOutput(newOutput);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(7,11,20,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}>
      <div style={{ background: '#0d1117', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', width: '560px', maxWidth: '90vw', boxShadow: '0 0 60px rgba(124,58,237,0.2)', fontFamily: "'JetBrains Mono', monospace", overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(17,24,39,0.8)' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171' }} onClick={() => setIsOpen(false)}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }}></div>
          <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>guest@shreyas-os:~</span>
        </div>
        <div style={{ padding: '24px', color: '#86efac', fontSize: '13px', lineHeight: 1.8, maxHeight: '400px', overflowY: 'auto' }}>
          {output.map((line, i) => (
            <div key={i} style={{ whiteSpace: 'pre-wrap' }}>{line}</div>
          ))}
          <div style={{ display: 'flex' }}>
            <span style={{ marginRight: '8px' }}>visitor@shreyas:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleCommand}
              style={{ background: 'transparent', border: 'none', color: '#86efac', outline: 'none', width: '100%', fontFamily: 'inherit', fontSize: 'inherit' }}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalEasterEgg;
