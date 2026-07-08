import React, { useEffect, useRef } from 'react';

const Backgrounds = () => {
  const glCanvasRef = useRef(null);
  const starCanvasRef = useRef(null);

  // WebGL Shader for Aurora
  useEffect(() => {
    const canvas = glCanvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    let animFrameId;

    const vShaderSource = `
      attribute vec2 aPos;
      void main(){
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;

    const fShaderSource = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uRes;
      uniform vec2 uMouse;

      float hash(vec2 p){
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        // Optimized: 4 octaves strikes the perfect balance of crisp detail and 60fps performance
        for(int i=0; i<4; i++){
          v += a * noise(p);
          p = rot * p * 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        vec2 m = uMouse / uRes;
        
        // Accelerated time for faster cloud movement
        float t = uTime * 0.8;
        // Increased scale (5.0 instead of 3.0) to make the clouds smaller and more textured
        vec2 p = uv * 5.0;
        p += m * 0.5;
        
        float q = fbm(p - t);
        float r = fbm(p + q + t * 0.5);
        float s = fbm(p + r - t * 0.8);
        
        vec3 color = vec3(0.0);
        color = mix(vec3(0.02, 0.04, 0.08), vec3(0.1, 0.05, 0.2), q);
        color = mix(color, vec3(0.48, 0.22, 0.92), r * 0.5);
        color = mix(color, vec3(0.82, 0.73, 1.0), s * 0.3);
        
        color *= (1.0 - uv.y * 0.5);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(type, source) {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vShaderSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fShaderSource);

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const pos = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    const syncSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener('resize', syncSize);

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = canvas.height - e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = (t) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameId = requestAnimationFrame(render);
    };
    render(0);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', syncSize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Starfield
  useEffect(() => {
    const canvas = starCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animFrameId;
    let stars = [];
    
    const syncSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for(let i=0; i<200; i++){
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          s: Math.random() * 2,
          v: Math.random() * 0.5 + 0.1,
          a: Math.random()
        });
      }
    };
    syncSize();
    window.addEventListener('resize', syncSize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      stars.forEach(st => {
        ctx.globalAlpha = st.a;
        ctx.fillRect(st.x, st.y, st.s, st.s);
        st.y -= st.v;
        if(st.y < 0) {
          st.y = canvas.height;
          st.x = Math.random() * canvas.width;
        }
      });
      animFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', syncSize);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[-2]">
        <canvas ref={glCanvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
      </div>
      <div className="fixed inset-0 z-[-1] bg-grid pointer-events-none"></div>
      <canvas ref={starCanvasRef} className="fixed inset-0 z-[-1] pointer-events-none opacity-25"></canvas>
    </>
  );
};

export default Backgrounds;
