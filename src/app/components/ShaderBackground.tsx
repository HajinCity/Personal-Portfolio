import { useEffect, useRef, useCallback } from "react";

// ─── Vertex shader (shared by all effects) ────────────────────────────────────
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// ─── Shared header injected into every fragment shader ────────────────────────
const HEADER = `
precision highp float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform vec2  u_click;
uniform float u_clickAge;

vec3 pal(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.012, 0.016, 0.369);
  vec3 c1 = vec3(0.000, 0.467, 0.714);
  vec3 c2 = vec3(0.000, 0.706, 0.847);
  vec3 c3 = vec3(0.282, 0.792, 0.894);
  vec3 c4 = vec3(0.792, 0.941, 0.973);
  if (t < 0.25) return mix(c0, c1, t * 4.0);
  if (t < 0.50) return mix(c1, c2, (t - 0.25) * 4.0);
  if (t < 0.75) return mix(c2, c3, (t - 0.50) * 4.0);
  return mix(c3, c4, (t - 0.75) * 4.0);
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1,0));
  float c = hash(i + vec2(0,1)), d = hash(i + vec2(1,1));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * (vnoise(p) * 2.0 - 1.0);
    p = p * 2.1 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}
`;


// ─── 2. NEBULA ────────────────────────────────────────────────────────────────
// Fractal Brownian Motion creates swirling cloud nebulae.
// Mouse pushes the fluid; clicks inject a turbulent burst.
const NEBULA = HEADER + `
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 m  = u_mouse / u_res;
  vec2 ck = u_click  / u_res;

  // Mouse distortion field
  vec2 dm = (uv - m);
  float distMag = exp(-length(dm) * 3.5) * 0.35;
  vec2 distort = normalize(dm + 0.001) * distMag;

  // Click shockwave distortion
  vec2 dc = (uv - ck);
  float shockMag = exp(-length(dc) * 2.0 - u_clickAge * 2.0) * 0.5;
  vec2 shock = normalize(dc + 0.001) * shockMag;

  vec2 q = uv * 2.5 + distort + shock;
  vec2 r = vec2(
    fbm(q + vec2(0.0,  0.0) + u_time * 0.08),
    fbm(q + vec2(5.2,  1.3) + u_time * 0.06)
  );

  float f = fbm(q + 1.76 * r + u_time * 0.04);
  f = f * 0.5 + 0.5;

  // Click glow
  float glow = exp(-length(uv - ck) * 5.0 - u_clickAge * 2.5) * 0.6;
  float t = f + glow;

  gl_FragColor = vec4(pal(clamp(t, 0.0, 1.0)), 1.0);
}
`;


// ─── WebGL helpers ────────────────────────────────────────────────────────────
function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
  }
  return s;
}

function link(gl: WebGLRenderingContext, vert: string, frag: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  return p;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Default mouse to center; updated on first move
  const mouseRef  = useRef({ x: -1, y: -1 });
  const clickRef  = useRef({ x: 0, y: 0, t: -999 });
  const rafRef    = useRef<number>(0);

  // Mouse — canvas-local coords, Y flipped for WebGL
  const onMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - r.left) * (c.width  / r.width),
      y: c.height - (e.clientY - r.top) * (c.height / r.height),
    };
  }, []);

  const onClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    clickRef.current = {
      x: (e.clientX - r.left) * (c.width  / r.width),
      y: c.height - (e.clientY - r.top) * (c.height / r.height),
      t: performance.now() / 1000,
    };
  }, []);

  // WebGL render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.round(r.width  * dpr);
      const h = Math.round(r.height * dpr);
      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
        canvas.width  = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        // Seed mouse to centre so the shader looks good before any movement
        if (mouseRef.current.x < 0) {
          mouseRef.current = { x: w / 2, y: h / 2 };
          clickRef.current = { x: w / 2, y: h / 2, t: -999 };
        }
      }
    };

    // Delay first resize one frame so the DOM has finished laying out
    let raf0 = requestAnimationFrame(() => { resize(); });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const prog = link(gl, VERT, NEBULA);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posAttr = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uRes      = gl.getUniformLocation(prog, "u_res");
    const uMouse    = gl.getUniformLocation(prog, "u_mouse");
    const uTime     = gl.getUniformLocation(prog, "u_time");
    const uClick    = gl.getUniformLocation(prog, "u_click");
    const uClickAge = gl.getUniformLocation(prog, "u_clickAge");

    const start = performance.now() / 1000;

    const render = () => {
      const t   = performance.now() / 1000 - start;
      const age = t - clickRef.current.t;
      const mx  = mouseRef.current.x < 0 ? canvas.width  / 2 : mouseRef.current.x;
      const my  = mouseRef.current.y < 0 ? canvas.height / 2 : mouseRef.current.y;

      gl.uniform2f(uRes,      canvas.width, canvas.height);
      gl.uniform2f(uMouse,    mx, my);
      gl.uniform1f(uTime,     t);
      gl.uniform2f(uClick,    clickRef.current.x, clickRef.current.y);
      gl.uniform1f(uClickAge, age);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf0);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    // Use inline style for position so there's no Tailwind class conflict
    <div style={{ position: "absolute", inset: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }}
        onMouseMove={onMove}
        onClick={onClick}
      />

    </div>
  );
}
