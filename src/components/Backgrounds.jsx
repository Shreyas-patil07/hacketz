import React, { useEffect, useRef } from 'react';

const Backgrounds = () => {
  const glCanvasRef   = useRef(null);
  const starCanvasRef = useRef(null);

  // ── WebGL Aurora ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = glCanvasRef.current;
    const gl = canvas.getContext('webgl', { powerPreference: 'low-power' })
            || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const isMobile     = window.innerWidth <= 900;
    const FBM_OCTAVES  = isMobile ? 2 : 4;      // half the GPU work on mobile
    const TARGET_FPS   = isMobile ? 30 : 60;
    const FRAME_MS     = 1000 / TARGET_FPS;

    let animFrameId;
    let lastFrame  = 0;
    let paused     = false;

    // ── Shaders (octave count injected at runtime) ────────────────────────
    const vSrc = `
      attribute vec2 aPos;
      void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
    `;
    const fSrc = `
      precision mediump float;
      uniform float uTime;
      uniform vec2  uRes;
      uniform vec2  uMouse;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        f=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
                   mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
      }
      float fbm(vec2 p){
        float v=0.0, a=0.5;
        mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
        for(int i=0;i<${FBM_OCTAVES};i++){ v+=a*noise(p); p=rot*p*2.0; a*=0.5; }
        return v;
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/uRes;
        vec2 m=uMouse/uRes;
        float t=uTime*0.8;
        vec2 p=uv*5.0+m*0.5;
        float q=fbm(p-t), r=fbm(p+q+t*0.5), s=fbm(p+r-t*0.8);
        vec3 c=mix(vec3(0.02,0.04,0.08),vec3(0.1,0.05,0.2),q);
        c=mix(c,vec3(0.48,0.22,0.92),r*0.5);
        c=mix(c,vec3(0.82,0.73,1.0),s*0.3);
        c*=(1.0-uv.y*0.5);
        gl_FragColor=vec4(c,1.0);
      }
    `;

    const mkShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, vSrc));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, fSrc));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, 'uTime');
    const uRes   = gl.getUniformLocation(prog, 'uRes');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    // ── Reliable mobile sizing ─────────────────────────────────────────────
    const syncSize = () => {
      const p = canvas.parentElement;
      canvas.width  = p ? p.offsetWidth  : document.documentElement.clientWidth;
      canvas.height = p ? p.offsetHeight : document.documentElement.clientHeight;
    };
    syncSize();
    const ro = new ResizeObserver(syncSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener('resize',            syncSize, { passive: true });
    window.addEventListener('orientationchange', syncSize, { passive: true });
    window.visualViewport?.addEventListener('resize', syncSize, { passive: true });

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = canvas.height - e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Page Visibility — pause when tab hidden ───────────────────────────
    const onVis = () => { paused = document.hidden; if (!paused) lastFrame = 0; };
    document.addEventListener('visibilitychange', onVis);

    // ── FPS-capped render loop ────────────────────────────────────────────
    const render = (t) => {
      animFrameId = requestAnimationFrame(render);
      if (paused || t - lastFrame < FRAME_MS) return;
      lastFrame = t;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uRes,  canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    render(0);

    return () => {
      cancelAnimationFrame(animFrameId);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize',            syncSize);
      window.removeEventListener('orientationchange', syncSize);
      window.visualViewport?.removeEventListener('resize', syncSize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  // ── Starfield ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = starCanvasRef.current;
    const ctx    = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile   = window.innerWidth <= 900;
    const STAR_COUNT = isMobile ? 80 : 200;
    const TARGET_FPS = isMobile ? 30 : 60;
    const FRAME_MS   = 1000 / TARGET_FPS;

    let animFrameId, lastFrame = 0, stars = [], paused = false;

    const syncSize = () => {
      const p = canvas.parentElement;
      const w = p ? p.offsetWidth  : document.documentElement.clientWidth;
      const h = p ? p.offsetHeight : document.documentElement.clientHeight;
      canvas.width = w; canvas.height = h;
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        s: Math.random() * 2, v: Math.random() * 0.5 + 0.1, a: Math.random(),
      }));
    };
    syncSize();
    const ro = new ResizeObserver(syncSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener('resize',            syncSize, { passive: true });
    window.addEventListener('orientationchange', syncSize, { passive: true });
    window.visualViewport?.addEventListener('resize', syncSize, { passive: true });

    const onVis = () => { paused = document.hidden; if (!paused) lastFrame = 0; };
    document.addEventListener('visibilitychange', onVis);

    const draw = (t) => {
      animFrameId = requestAnimationFrame(draw);
      if (paused || t - lastFrame < FRAME_MS) return;
      lastFrame = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      stars.forEach(st => {
        ctx.globalAlpha = st.a;
        ctx.fillRect(st.x, st.y, st.s, st.s);
        st.y -= st.v;
        if (st.y < 0) { st.y = canvas.height; st.x = Math.random() * canvas.width; }
      });
    };
    draw(0);

    return () => {
      cancelAnimationFrame(animFrameId);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize',            syncSize);
      window.removeEventListener('orientationchange', syncSize);
      window.visualViewport?.removeEventListener('resize', syncSize);
    };
  }, []);

  const coverStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' };

  return (
    <>
      <div style={{ ...coverStyle, zIndex: -2 }}>
        <canvas ref={glCanvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>
      <div className="bg-grid" style={{ ...coverStyle, zIndex: -1, pointerEvents: 'none' }} />
      <canvas ref={starCanvasRef} style={{ ...coverStyle, zIndex: -1, pointerEvents: 'none', opacity: 0.25 }} />
    </>
  );
};

export default Backgrounds;
