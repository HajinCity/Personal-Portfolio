import { useEffect, useRef } from "react";

// ── Seeded RNG ────────────────────────────────────────────────────────────────
function mkRng(seed: number) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 0x100000000; };
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Tower {
  x: number; w: number; h: number; sideW: number;
  depth: 0 | 1 | 2 | 3;
  floors: number; cols: number;
  lit: Uint8Array; phase: Float32Array;
  hasBracing: boolean;
  hasCantilever: boolean;
  setbackAt: number; setbackRatio: number;
  hasSpire: boolean; spireH: number;
}
interface Sailboat {
  x: number; docked: boolean; scale: number;
  dir: 1 | -1; speed: number; bob: number; lean: number;
}
interface Car {
  x: number; lane: number; speed: number; dir: 1 | -1; len: number;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function CityBackground() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const vis = useRef(false);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const io = new IntersectionObserver(([e]) => { vis.current = e.isIntersecting; });
    io.observe(canvas);

    let W = 0, H = 0, t = 0;
    let towers: Tower[] = [];
    let sailboats: Sailboat[] = [];
    let cars: Car[] = [];

    // ── Layout fractions ──────────────────────────────────────────────────────
    const HORIZON = 0.34;
    const TREE_T  = 0.50;
    const TREE_B  = 0.67;
    const WATER_T = 0.64;
    const WATER_B = 0.79;
    const ROAD_T  = 0.78;
    const ROAD_B  = 0.92;

    const groundY = (d: number) => H * ([0.67, 0.61, 0.56, 0.50] as const)[d];
    const dark = () => document.documentElement.classList.contains("dark");

    // ── 30 fps cap ────────────────────────────────────────────────────────────
    const TARGET_MS = 1000 / 30;
    let lastTs = 0;

    // ── Scene generation ──────────────────────────────────────────────────────
    function gen() {
      W = Math.max(canvas.offsetWidth, 200);
      H = Math.max(canvas.offsetHeight, 200);
      canvas.width  = Math.round(W * devicePixelRatio);
      canvas.height = Math.round(H * devicePixelRatio);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);

      towers = [];
      ([3, 2, 1, 0] as const).forEach(depth => {
        const r = mkRng(depth * 97 + 53);
        const [wMin, wMax, hMin, hMax] = ([
          [10, 26, 0.04, 0.14],
          [20, 46, 0.10, 0.28],
          [30, 72, 0.18, 0.48],
          [44, 105, 0.25, 0.65],
        ] as const)[depth];
        let bx = -50;
        while (bx < W + 80) {
          const bw = wMin + r() * (wMax - wMin);
          const bh = H * (hMin + r() * (hMax - hMin));
          const floors = Math.max(3, Math.floor(bh / (depth < 2 ? 11 : 8)));
          const cols   = Math.max(2, Math.floor(bw / (depth < 2 ? 10 : 7)));
          const n = floors * cols;
          const lit = new Uint8Array(n); const phase = new Float32Array(n);
          for (let i = 0; i < n; i++) { lit[i] = r() > 0.40 ? 1 : 0; phase[i] = r() * 120; }
          towers.push({
            x: bx, w: bw, h: bh,
            sideW: ([14, 10, 6, 2] as const)[depth],
            depth, floors, cols, lit, phase,
            hasBracing:    depth <= 1 && r() > 0.35,
            hasCantilever: depth === 0 && r() > 0.65,
            setbackAt:     r() > 0.5 ? 0.35 + r() * 0.28 : 0,
            setbackRatio:  0.10 + r() * 0.14,
            hasSpire:      depth <= 1 && r() > 0.55,
            spireH:        20 + r() * 44,
          });
          bx += bw + 2 + r() * (depth === 0 ? 12 : 4);
        }
      });

      const rs = mkRng(88);
      sailboats = [];
      for (let i = 0; i < 10; i++) {
        sailboats.push({ x: (i + 0.5) / 10, docked: true, scale: 0.55 + rs() * 0.45,
          dir: rs() > 0.5 ? 1 : -1, speed: 0, bob: rs() * Math.PI * 2, lean: (rs() - 0.5) * 0.10 });
      }
      for (let i = 0; i < 3; i++) {
        sailboats.push({ x: rs() * W, docked: false, scale: 0.75 + rs() * 0.85,
          dir: (i % 2 === 0 ? 1 : -1) as 1 | -1, speed: 0.20 + rs() * 0.45,
          bob: rs() * Math.PI * 2, lean: (rs() - 0.5) * 0.20 });
      }

      const rc = mkRng(44);
      cars = Array.from({ length: 10 }, (_, i) => ({
        x: rc() * W, lane: i % 3, speed: 1.2 + rc() * 2.5,
        dir: (i < 6 ? 1 : -1) as 1 | -1,
        len: i % 4 === 0 ? 44 + rc() * 12 : 26 + rc() * 16,
      }));
    }

    // ── Sky ───────────────────────────────────────────────────────────────────
    function drawSky(d: boolean) {
      const g = ctx.createLinearGradient(0, 0, 0, H * HORIZON);
      if (d) {
        g.addColorStop(0, "#010408"); g.addColorStop(0.35, "#040c18");
        g.addColorStop(0.75, "#081828"); g.addColorStop(1, "#0d2038");
      } else {
        g.addColorStop(0, "#7aa8c4"); g.addColorStop(0.28, "#90b8cc");
        g.addColorStop(0.65, "#b2cede"); g.addColorStop(1, "#c8dceb");
      }
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * HORIZON + 4);

      if (d) {
        // Fewer stars — 80 instead of 130
        for (let i = 0; i < 80; i++) {
          const sx = (i * 169.3) % W, sy = (i * 83.7) % (H * 0.28);
          const a = 0.12 + 0.48 * Math.abs(Math.sin(t * 0.009 + i * 2.1));
          ctx.fillStyle = `rgba(${175 + i % 65},${200 + i % 40},255,${a.toFixed(2)})`;
          ctx.fillRect(sx, sy, i % 3 === 0 ? 1.2 : 0.8, i % 3 === 0 ? 1.2 : 0.8);
        }
        const mx = W * 0.80, my = H * 0.08;
        const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 48);
        mg.addColorStop(0, "rgba(90,145,210,0.14)"); mg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mx, my, 48, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(200,220,248,0.90)"; ctx.beginPath(); ctx.arc(mx, my, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#040c18"; ctx.beginPath(); ctx.arc(mx + 7, my - 3, 10, 0, Math.PI * 2); ctx.fill();
      } else {
        const sg = ctx.createRadialGradient(W * 0.82, 0, 0, W * 0.82, 0, H * 0.38);
        sg.addColorStop(0, "rgba(255,248,225,0.30)"); sg.addColorStop(0.5, "rgba(225,235,250,0.10)"); sg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H * HORIZON);
      }

      const mY = H * (HORIZON - 0.02);
      ctx.fillStyle = d ? "rgba(18,32,55,0.60)" : "rgba(148,170,192,0.68)";
      ctx.beginPath();
      ctx.moveTo(W * 0.50, mY); ctx.lineTo(W * 0.58, mY - H * 0.055);
      ctx.lineTo(W * 0.65, mY - H * 0.095); ctx.lineTo(W * 0.73, mY - H * 0.068);
      ctx.lineTo(W * 0.80, mY - H * 0.048); ctx.lineTo(W * 0.88, mY - H * 0.075);
      ctx.lineTo(W * 0.97, mY - H * 0.042); ctx.lineTo(W, mY);
      ctx.closePath(); ctx.fill();
    }

    // ── Bridge ────────────────────────────────────────────────────────────────
    function drawBridge(d: boolean) {
      const bx = W * 0.70, bw = W * 0.26, by = H * (HORIZON + 0.04);
      ctx.strokeStyle = d ? "rgba(18,42,85,0.55)" : "rgba(138,162,185,0.68)";
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by - H * 0.015); ctx.stroke();
      ctx.lineWidth = 1.5;
      [0.18, 0.36, 0.55, 0.72, 0.88].forEach(pos => {
        const px = bx + bw * pos;
        ctx.beginPath(); ctx.moveTo(px, by - H * 0.01 * pos); ctx.lineTo(px, by + H * 0.05); ctx.stroke();
      });
    }

    // ── Tower face ────────────────────────────────────────────────────────────
    function drawTowerFace(
      bx: number, by: number, bw: number, bh: number,
      floors: number, cols: number,
      lit: Uint8Array, phase: Float32Array,
      d: boolean, depth: number, hasBracing: boolean, rowOff: number
    ) {
      const b = d ? ([6, 9, 12, 16] as const)[depth] : ([28, 46, 65, 85] as const)[depth];
      const fg = ctx.createLinearGradient(bx, by, bx + bw * 0.8, by + bh);
      if (d) {
        fg.addColorStop(0, `rgb(${b+6},${b+8},${b+10})`);
        fg.addColorStop(0.5, `rgb(${b+3},${b+5},${b+8})`);
        fg.addColorStop(1, `rgb(${b},${b+2},${b+4})`);
      } else {
        fg.addColorStop(0, `rgba(${b+16},${b+20},${b+24},0.96)`);
        fg.addColorStop(0.5, `rgba(${b+8},${b+12},${b+16},0.93)`);
        fg.addColorStop(1, `rgba(${b},${b+4},${b+8},0.97)`);
      }
      ctx.fillStyle = fg; ctx.fillRect(bx, by, bw, bh);

      // Glass reflection — only for near/mid buildings
      if (depth <= 2) {
        const rf = ctx.createLinearGradient(0, by, 0, by + bh * 0.42);
        rf.addColorStop(0, d ? "rgba(22,52,105,0.24)" : "rgba(148,180,215,0.30)");
        rf.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rf; ctx.fillRect(bx, by, bw, bh * 0.42);
      }

      // Structural grid
      const fh = bh / floors, cw = bw / cols;
      ctx.strokeStyle = d ? "rgba(28,58,98,0.22)" : "rgba(45,65,85,0.18)";
      ctx.lineWidth = depth <= 1 ? 0.5 : 0.35;
      for (let f = 1; f < floors; f++) {
        const y = by + f * fh; ctx.beginPath(); ctx.moveTo(bx, y); ctx.lineTo(bx + bw, y); ctx.stroke();
      }
      for (let c = 1; c < cols; c++) {
        const x = bx + c * cw; ctx.beginPath(); ctx.moveTo(x, by); ctx.lineTo(x, by + bh); ctx.stroke();
      }

      // X cross-bracing
      if (hasBracing && depth <= 1) {
        ctx.strokeStyle = d ? "rgba(38,78,125,0.38)" : "rgba(55,78,100,0.30)";
        ctx.lineWidth = depth === 0 ? 1.6 : 1.0;
        const braceFh = fh * 4;
        const numBraces = Math.floor(floors / 4);
        for (let bc = 0; bc < cols - 1; bc++) {
          const bx0 = bx + bc * cw, bx1 = bx + (bc + 2) * cw;
          for (let bf = 0; bf < numBraces; bf++) {
            const by0 = by + bf * braceFh, by1 = by0 + braceFh;
            ctx.beginPath(); ctx.moveTo(bx0, by0); ctx.lineTo(bx1, by1); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(bx1, by0); ctx.lineTo(bx0, by1); ctx.stroke();
          }
        }
      }

      // Windows — no per-window radial glow on depth 1-3 (big perf win)
      const wpw = cw * 0.65, wph = fh * 0.60;
      const wpx0 = cw * 0.17, wpy0 = fh * 0.22;
      for (let row = 0; row < floors; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = (row + rowOff) * cols + col;
          const wx = bx + col * cw + wpx0, wy = by + row * fh + wpy0;
          if (d) {
            const on = (Math.sin(t * 0.013 + (phase[idx] ?? 0)) > 0.93) ? !lit[idx] : lit[idx];
            if (on) {
              const warm = idx % 17 === 0;
              const a = (0.55 + 0.22 * Math.sin(t * 0.008 + idx * 0.7)).toFixed(2);
              ctx.fillStyle = warm ? `rgba(210,185,115,${a})` : `rgba(160,205,245,${a})`;
              ctx.fillRect(wx, wy, wpw, wph);
              // Glow only for depth 0 (nearest buildings)
              if (depth === 0) {
                const bg = ctx.createRadialGradient(wx + wpw/2, wy + wph/2, 0, wx + wpw/2, wy + wph/2, wpw * 2);
                bg.addColorStop(0, warm ? "rgba(195,160,85,0.09)" : "rgba(85,165,240,0.09)");
                bg.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = bg; ctx.fillRect(wx - wpw, wy - wph, wpw * 3, wph * 3);
              }
            }
          } else {
            if ((row + col) % 5 !== 0) {
              const a = (0.08 + 0.06 * Math.sin(t * 0.003 + row * 0.5 + col * 0.6)).toFixed(2);
              ctx.fillStyle = `rgba(148,188,225,${a})`; ctx.fillRect(wx, wy, wpw, wph);
            }
          }
        }
      }
    }

    function drawTowerSide(bx: number, by: number, bw: number, bh: number, sideW: number, d: boolean, depth: number) {
      if (sideW <= 0) return;
      const b = d ? ([4, 6, 8, 12] as const)[depth] : ([18, 32, 48, 62] as const)[depth];
      const sg = ctx.createLinearGradient(bx + bw, by, bx + bw + sideW, by);
      if (d) {
        sg.addColorStop(0, `rgba(${b+2},${b+3},${b+4},0.97)`); sg.addColorStop(1, `rgba(${b},${b},${b+2},1)`);
      } else {
        sg.addColorStop(0, `rgba(${b+12},${b+14},${b+18},0.93)`); sg.addColorStop(1, `rgba(${b},${b+3},${b+6},0.96)`);
      }
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.moveTo(bx+bw, by); ctx.lineTo(bx+bw+sideW, by-sideW*0.30);
      ctx.lineTo(bx+bw+sideW, by+bh-sideW*0.30); ctx.lineTo(bx+bw, by+bh);
      ctx.closePath(); ctx.fill();
    }

    function drawTowers(d: boolean) {
      ([3, 2, 1, 0] as const).forEach(depth => {
        towers.filter(b => b.depth === depth).forEach(bld => {
          const gy = groundY(depth);
          const baseTop = gy - bld.h;
          if (bld.setbackAt > 0) {
            const s2h = bld.h * bld.setbackAt, s1h = bld.h * (1 - bld.setbackAt);
            const shrink = bld.w * bld.setbackRatio;
            const x2 = bld.x + shrink / 2, w2 = bld.w - shrink;
            const rows2 = Math.round(bld.floors * bld.setbackAt);
            const midY = baseTop + s2h;
            drawTowerFace(bld.x, baseTop, bld.w, s2h, rows2, bld.cols, bld.lit, bld.phase, d, depth, bld.hasBracing, 0);
            drawTowerSide(bld.x, baseTop, bld.w, s2h, bld.sideW, d, depth);
            drawTowerFace(x2, midY, w2, s1h, bld.floors-rows2, bld.cols, bld.lit, bld.phase, d, depth, false, rows2);
            drawTowerSide(x2, midY, w2, s1h, bld.sideW, d, depth);
            ctx.fillStyle = d ? "rgba(4,10,22,0.96)" : "rgba(18,26,36,0.88)";
            ctx.fillRect(x2-1, midY-2, w2+2, 3);
          } else {
            drawTowerFace(bld.x, baseTop, bld.w, bld.h, bld.floors, bld.cols, bld.lit, bld.phase, d, depth, bld.hasBracing, 0);
            drawTowerSide(bld.x, baseTop, bld.w, bld.h, bld.sideW, d, depth);
          }
          ctx.fillStyle = d ? "rgba(4,12,26,0.97)" : "rgba(18,26,38,0.88)";
          ctx.fillRect(bld.x-1, baseTop-2.5, bld.w+2, 3);

          if (bld.hasSpire) {
            const cx = bld.x + bld.w / 2;
            ctx.beginPath();
            ctx.moveTo(cx-2.2, baseTop); ctx.lineTo(cx, baseTop-bld.spireH); ctx.lineTo(cx+2.2, baseTop);
            ctx.fillStyle = d ? "rgba(55,118,188,0.65)" : "rgba(38,52,70,0.75)"; ctx.fill();
            if (d && Math.sin(t * 0.054 + bld.x * 0.01) > 0.40) {
              const bg = ctx.createRadialGradient(cx, baseTop-bld.spireH, 0, cx, baseTop-bld.spireH, 6);
              bg.addColorStop(0, "rgba(255,62,62,0.85)"); bg.addColorStop(1, "rgba(255,62,62,0)");
              ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, baseTop-bld.spireH, 6, 0, Math.PI*2); ctx.fill();
            }
          }
          if (d && depth <= 1) {
            const pulse = 0.45 + 0.38 * Math.sin(t * 0.020 + bld.x * 0.008);
            ctx.fillStyle = `rgba(50,125,200,${(pulse * 0.48).toFixed(2)})`;
            ctx.fillRect(bld.x, baseTop, bld.w, 1.5);
          }
        });
      });
    }

    // ── Haze ──────────────────────────────────────────────────────────────────
    function drawHaze(d: boolean) {
      const rgb = d ? "0,8,22" : "172,200,220";
      [{ y: 0.46, a: d ? 0.84 : 0.78 }, { y: 0.50, a: d ? 0.52 : 0.48 }, { y: 0.54, a: d ? 0.26 : 0.24 }]
        .forEach(({ y, a }) => {
          const hg = ctx.createLinearGradient(0, H*(y-0.05), 0, H*(y+0.07));
          hg.addColorStop(0, `rgba(${rgb},${a})`);
          hg.addColorStop(0.55, `rgba(${rgb},${(a*0.44).toFixed(2)})`);
          hg.addColorStop(1, `rgba(${rgb},0)`);
          ctx.fillStyle = hg; ctx.fillRect(0, H*(y-0.05), W, H*0.12);
        });
    }

    // ── Trees — optimized: simple solid ellipses, no radial gradients ─────────
    function drawTrees(d: boolean) {
      const treeBaseY = H * TREE_B;
      const treeZoneH = treeBaseY - H * TREE_T;

      // Ground fill — light mode: muted sage, not dark green
      const pg = ctx.createLinearGradient(0, H * TREE_T, 0, treeBaseY);
      if (d) {
        pg.addColorStop(0, "#0c1a0e"); pg.addColorStop(1, "#0a1810");
      } else {
        pg.addColorStop(0, "#c2d4ae"); pg.addColorStop(1, "#b8cc9e");
      }
      ctx.fillStyle = pg; ctx.fillRect(0, H * TREE_T, W, treeZoneH);

      // Walkway strip
      ctx.fillStyle = d ? "#0e1c14" : "#c8d8b0";
      ctx.fillRect(0, treeBaseY - 24, W, 26);

      // ── Back row ───────────────────────────────────────────────────────────
      const rBack = mkRng(111);
      for (let tx = -8; tx < W + 15; tx += 18 + rBack() * 10) {
        const th = treeZoneH * (0.50 + rBack() * 0.22);
        const tr = 14 + rBack() * 9;
        const ty = H * TREE_T + treeZoneH * 0.04;
        const sw = Math.sin(t * 0.010 + tx * 0.03) * 0.7;

        // Trunk
        ctx.fillStyle = d ? "#0a1a08" : "#8a7a62";
        ctx.fillRect(tx - 1.5, ty + th * 0.65, 3, th * 0.38);

        // Canopy — 2 solid ellipses instead of 3 radial gradients
        ctx.fillStyle = d ? "rgba(10,24,8,0.88)" : "rgba(110,148,70,0.82)";
        ctx.beginPath(); ctx.ellipse(tx + sw, ty, tr, tr * 0.82, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = d ? "rgba(14,30,10,0.55)" : "rgba(138,178,90,0.50)";
        ctx.beginPath(); ctx.ellipse(tx + sw - tr*0.15, ty - tr*0.12, tr*0.62, tr*0.62, 0, 0, Math.PI * 2); ctx.fill();
      }

      // ── Front row ──────────────────────────────────────────────────────────
      const rFront = mkRng(222);
      for (let tx = 5; tx < W + 12; tx += 26 + rFront() * 16) {
        const th = treeZoneH * (0.68 + rFront() * 0.24);
        const tr = 20 + rFront() * 14;
        const ty = H * TREE_T + treeZoneH * 0.10;
        const sw = Math.sin(t * 0.014 + tx * 0.04 + 1.2) * 1.2;

        // Trunk
        ctx.fillStyle = d ? "#0c1c0a" : "#8a7a62";
        ctx.fillRect(tx - 2.5, ty + th * 0.52, 5, th * 0.52);

        // Canopy — 2 solid ellipses instead of 4 radial gradients
        ctx.fillStyle = d ? "rgba(16,38,12,0.92)" : "rgba(90,134,52,0.90)";
        ctx.beginPath(); ctx.ellipse(tx + sw, ty, tr, tr * 0.85, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = d ? "rgba(22,48,16,0.60)" : "rgba(118,164,72,0.58)";
        ctx.beginPath(); ctx.ellipse(tx + sw - tr*0.18, ty - tr*0.14, tr*0.68, tr*0.68, 0, 0, Math.PI * 2); ctx.fill();
      }
    }

    // ── Quay ──────────────────────────────────────────────────────────────────
    function drawQuay(d: boolean) {
      const qy = H * WATER_T;
      ctx.fillStyle = d ? "#0e1820" : "#8aa4b0";
      ctx.fillRect(0, H * TREE_B - 20, W, qy - H * TREE_B + 22);
      ctx.fillStyle = d ? "#182434" : "#7a9aaa";
      ctx.fillRect(0, qy - 11, W, 12);

      const pierH = H * (WATER_B - WATER_T) * 0.55;
      for (let dx = 50; dx < W; dx += 72) {
        ctx.fillStyle = d ? "rgba(8,18,32,0.88)" : "rgba(90,115,130,0.72)";
        ctx.fillRect(dx - 4, qy, 8, pierH);
        ctx.fillStyle = d ? "#182c40" : "#7a9aaa";
        ctx.fillRect(dx - 14, qy, 28, 4);
      }
    }

    // ── Water ─────────────────────────────────────────────────────────────────
    function drawWater(d: boolean) {
      const wt = H * WATER_T, wb = H * WATER_B, wh = wb - wt;

      // Skyline reflection
      ctx.save();
      ctx.beginPath(); ctx.rect(0, wt, W, wh * 0.60); ctx.clip();
      ctx.translate(0, wt * 2); ctx.scale(1, -0.20);
      ctx.globalAlpha = d ? 0.18 : 0.12;
      towers.filter(b => b.depth <= 2).forEach(b => {
        ctx.fillStyle = d ? "#142030" : "#4a6880";
        ctx.fillRect(b.x, groundY(b.depth) - b.h, b.w, b.h);
      });
      ctx.globalAlpha = 1; ctx.restore();

      const wg = ctx.createLinearGradient(0, wt, 0, wb);
      if (d) {
        wg.addColorStop(0, "#0c2238"); wg.addColorStop(1, "#0c2440");
      } else {
        wg.addColorStop(0, "#45a0c0"); wg.addColorStop(0.4, "#58b0cc"); wg.addColorStop(1, "#4490b8");
      }
      ctx.globalAlpha = 0.90; ctx.fillStyle = wg; ctx.fillRect(0, wt, W, wh); ctx.globalAlpha = 1;

      const shg = ctx.createLinearGradient(0, wt, 0, wt + 26);
      shg.addColorStop(0, d ? "rgba(28,78,148,0.42)" : "rgba(148,210,245,0.60)");
      shg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = shg; ctx.fillRect(0, wt, W, 26);

      // 6 waves instead of 10
      for (let i = 0; i < 6; i++) {
        const wy = wt + 4 + i * (wh / 7);
        const amp = Math.max(0, 2.5 - i * 0.3);
        const al  = Math.max(0, d ? 0.11 - i*0.012 : 0.20 - i*0.022);
        ctx.beginPath(); ctx.moveTo(0, wy);
        for (let wx = 0; wx <= W; wx += 4) ctx.lineTo(wx, wy + Math.sin(wx*0.016 + t*0.028 + i*1.1) * amp);
        ctx.strokeStyle = d ? `rgba(48,118,205,${al.toFixed(2)})` : `rgba(182,232,252,${(al+0.08).toFixed(2)})`;
        ctx.lineWidth = 0.72; ctx.stroke();
      }

      // 10 sparkles instead of 18
      for (let i = 0; i < 10; i++) {
        const sx = (i * 211.5 + t * 0.54) % W;
        const sy = wt + 3 + (i * 69.3) % (wh * 0.55);
        const sa = 0.18 + 0.52 * Math.abs(Math.sin(t * 0.10 + i * 1.8));
        ctx.fillStyle = d ? `rgba(78,162,255,${sa.toFixed(2)})` : `rgba(255,255,255,${(sa*0.68).toFixed(2)})`;
        ctx.fillRect(sx, sy, 1.5, 0.85);
      }
    }

    // ── Sailboat ──────────────────────────────────────────────────────────────
    function drawSailboat(boat: Sailboat, d: boolean) {
      const wt = H * WATER_T, wh = H * (WATER_B - WATER_T);
      const bx = boat.docked ? boat.x * W : boat.x;
      const by = boat.docked
        ? wt + wh * 0.18 + 1.2 * Math.sin(t * 0.016 + boat.bob)
        : wt + wh * 0.38 + 2.8 * Math.sin(t * 0.024 + boat.bob);

      const s = boat.scale;
      ctx.save(); ctx.translate(bx, by);
      if (!boat.docked) ctx.scale(boat.dir, 1);
      ctx.rotate(boat.lean);

      if (boat.docked) {
        ctx.beginPath();
        ctx.moveTo(-11*s, 0); ctx.bezierCurveTo(-9*s, 6*s, 9*s, 6*s, 11*s, 0);
        ctx.bezierCurveTo(9*s, -3*s, -9*s, -3*s, -11*s, 0);
        ctx.fillStyle = d ? "#0a1828" : "#eaeff4"; ctx.fill();
        ctx.strokeStyle = d ? "rgba(38,95,168,0.44)" : "rgba(18,66,118,0.22)"; ctx.lineWidth = 0.8; ctx.stroke();
        ctx.fillStyle = d ? "#0c1c30" : "#d8e2ee"; ctx.fillRect(-8*s, -3*s, 16*s, 3*s);
        ctx.fillStyle = d ? "#0a1626" : "#ccd8e8"; ctx.fillRect(-4*s, -6*s, 8*s, 3*s);
        const mh = 38 * s;
        ctx.beginPath(); ctx.moveTo(0, -3*s); ctx.lineTo(0, -3*s - mh);
        ctx.strokeStyle = d ? "rgba(80,148,218,0.70)" : "rgba(38,78,128,0.60)"; ctx.lineWidth = 1.1; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -3*s - mh*0.18); ctx.lineTo(9*s, -3*s); ctx.lineWidth = 0.8; ctx.stroke();
        ctx.fillStyle = d ? "rgba(78,118,178,0.28)" : "rgba(225,232,245,0.55)";
        ctx.beginPath(); ctx.ellipse(3*s, -3*s - mh*0.32, 2.2*s, mh*0.26, 0, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = d ? "rgba(50,95,165,0.30)" : "rgba(80,115,165,0.28)"; ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(0, -3*s-mh); ctx.lineTo(-8*s, -3*s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, -3*s-mh); ctx.lineTo(8*s, -3*s); ctx.stroke();
      } else {
        const wg2 = ctx.createLinearGradient(-34*s, 0, 0, 0);
        wg2.addColorStop(0, "rgba(180,228,255,0)"); wg2.addColorStop(1, "rgba(180,228,255,0.18)");
        ctx.beginPath();
        ctx.moveTo(2*s,4*s); ctx.lineTo(-34*s,12*s); ctx.lineTo(-34*s,-2*s); ctx.lineTo(2*s,-1*s);
        ctx.closePath(); ctx.fillStyle = wg2; ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-20*s,0); ctx.bezierCurveTo(-16*s,8*s,16*s,8*s,20*s,0);
        ctx.bezierCurveTo(16*s,-5*s,-16*s,-5*s,-20*s,0);
        ctx.fillStyle = d ? "#09192c" : "#edf1f6"; ctx.fill();
        ctx.strokeStyle = d ? "rgba(38,98,172,0.46)" : "rgba(18,66,128,0.24)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = d ? "#0c1c2e" : "#dce5f0"; ctx.fillRect(-14*s,-5*s,24*s,5*s);
        const mh = 44 * s;
        ctx.beginPath(); ctx.moveTo(1*s,-5*s); ctx.lineTo(1*s,-5*s-mh);
        ctx.strokeStyle = d ? "rgba(78,148,220,0.72)" : "rgba(40,82,135,0.62)"; ctx.lineWidth = 1.3; ctx.stroke();
        const lean = 0.05 * Math.sin(t * 0.018 + boat.bob);
        ctx.beginPath();
        ctx.moveTo(1*s,-5*s-mh+1*s);
        ctx.quadraticCurveTo((16+lean*22)*s,-5*s-mh*0.40,1*s,-5*s);
        ctx.fillStyle = d ? "rgba(205,218,242,0.62)" : "rgba(242,246,252,0.94)"; ctx.fill();
        ctx.beginPath();
        ctx.moveTo(1*s,-5*s-mh+2*s);
        ctx.quadraticCurveTo((-13+lean*8)*s,-5*s-mh*0.35,1*s,-12*s);
        ctx.fillStyle = d ? "rgba(185,202,235,0.50)" : "rgba(232,240,252,0.82)"; ctx.fill();
        ctx.strokeStyle = d ? "rgba(48,92,162,0.28)" : "rgba(75,112,162,0.26)"; ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(1*s,-5*s-mh); ctx.lineTo(-16*s,-5*s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(1*s,-5*s-mh); ctx.lineTo(14*s,-5*s); ctx.stroke();
      }
      ctx.restore();
    }

    // ── Road ──────────────────────────────────────────────────────────────────
    function drawRoad(d: boolean) {
      const rt = H*ROAD_T, rb = H*ROAD_B, rh = rb-rt, lh = rh/3;
      const rg = ctx.createLinearGradient(0, rt, 0, rb);
      if (d) { rg.addColorStop(0, "#060a12"); rg.addColorStop(1, "#040710"); }
      else    { rg.addColorStop(0, "#3c4856"); rg.addColorStop(1, "#303848"); }
      ctx.fillStyle = rg; ctx.fillRect(0, rt, W, rh);

      ctx.strokeStyle = d ? "rgba(46,98,175,0.40)" : "rgba(185,205,225,0.62)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, rt+2); ctx.lineTo(W, rt+2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, rb-2); ctx.lineTo(W, rb-2); ctx.stroke();

      [1,2].forEach(ln => {
        ctx.setLineDash([24,13]); ctx.lineDashOffset = -(t*(ln===1?1.02:0.78));
        ctx.strokeStyle = d ? "rgba(40,95,170,0.24)" : "rgba(188,205,222,0.40)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, rt+lh*ln); ctx.lineTo(W, rt+lh*ln); ctx.stroke();
      });
      ctx.setLineDash([]); ctx.lineDashOffset = 0;

      for (let px = 98; px < W; px += 218) {
        ctx.fillStyle = d ? "#060a12" : "#3e4e5c"; ctx.fillRect(px-7, rt-2, 14, rh+2);
      }
      for (let lx = 44; lx < W; lx += 100) {
        ctx.strokeStyle = d ? "#0c1a28" : "#4a5e70"; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(lx, rt); ctx.lineTo(lx, rt-35); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(lx, rt-33); ctx.lineTo(lx+13, rt-40); ctx.stroke();
        if (d) {
          const g = ctx.createRadialGradient(lx+13, rt-40, 0, lx+13, rt-40, 22);
          g.addColorStop(0, "rgba(142,198,255,0.48)"); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(lx+13, rt-40, 22, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = "rgba(196,226,255,0.92)"; ctx.beginPath(); ctx.arc(lx+13, rt-40, 2.5, 0, Math.PI*2); ctx.fill();
        }
      }
    }

    // ── Car ───────────────────────────────────────────────────────────────────
    function drawCar(c: Car, d: boolean) {
      const rt = H*ROAD_T, rh = H*(ROAD_B-ROAD_T);
      const cy = rt + (rh/3) * (c.lane + 0.52);
      const isTruck = c.len > 38, bh = isTruck ? 14 : 10;
      ctx.save(); ctx.translate(c.x, cy); ctx.scale(c.dir, 1);
      const bc = d
        ? (["#0c1c34","#162840","#0a1830","#14203c","#0e1a2e"] as const)[c.lane%5]
        : (["#486282","#5a7898","#364e6e","#4a6880","#385674"] as const)[c.lane%5];
      ctx.fillStyle = bc; ctx.fillRect(-c.len/2, -(bh+2), c.len, bh+2);
      if (!isTruck) {
        ctx.fillStyle = d ? "rgba(4,12,28,0.90)" : "rgba(48,85,124,0.58)";
        ctx.fillRect(-c.len*0.27, -(bh+11), c.len*0.54, 10);
      }
      [-c.len*0.28, c.len*0.28].forEach(wx => {
        ctx.beginPath(); ctx.arc(wx, 1, isTruck?6:5, 0, Math.PI*2); ctx.fillStyle="#090c12"; ctx.fill();
      });
      if (d) {
        ctx.fillStyle = "rgba(210,235,255,0.90)"; ctx.beginPath(); ctx.arc(c.len/2-2, -(bh/2), 2.2, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = "rgba(255,40,22,0.78)";   ctx.beginPath(); ctx.arc(-c.len/2+3, -(bh/2), 2,   0, Math.PI*2); ctx.fill();
      }
      ctx.restore();
    }

    // ── Main render loop ──────────────────────────────────────────────────────
    function draw(ts: number) {
      raf.current = requestAnimationFrame(draw);
      if (!vis.current) return;

      // 30fps cap
      if (ts - lastTs < TARGET_MS) return;
      lastTs = ts;

      t++;
      ctx.clearRect(0, 0, W, H);
      const d = dark();

      ctx.fillStyle = d ? "#010408" : "#a8c8dc"; ctx.fillRect(0, 0, W, H);
      drawSky(d);
      drawTowers(d);
      drawHaze(d);
      drawBridge(d);
      drawTrees(d);
      drawQuay(d);
      drawWater(d);

      sailboats.filter(b => b.docked).forEach(b => drawSailboat(b, d));
      sailboats.filter(b => !b.docked).forEach(b => {
        b.x += b.speed * b.dir;
        if (b.x > W + 80) b.x = -80;
        if (b.x < -80)    b.x = W + 80;
        drawSailboat(b, d);
      });

      drawRoad(d);
      cars.forEach(c => {
        c.x += c.speed * c.dir;
        if (c.x > W + 60) c.x = -60;
        if (c.x < -60)    c.x = W + 60;
        drawCar(c, d);
      });

      ctx.fillStyle = d ? "#030608" : "#283040"; ctx.fillRect(0, H*ROAD_B, W, H*(1-ROAD_B));

      const vg = ctx.createRadialGradient(W/2, H/2, H*0.20, W/2, H/2, H*0.90);
      vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, d ? "rgba(1,4,12,0.40)" : "rgba(10,22,40,0.16)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);

      const bf = ctx.createLinearGradient(0, H*0.88, 0, H);
      bf.addColorStop(0, "rgba(0,0,0,0)"); bf.addColorStop(1, d ? "rgba(2,5,10,0.65)" : "rgba(26,40,55,0.55)");
      ctx.fillStyle = bf; ctx.fillRect(0, H*0.88, W, H*0.12);
    }

    gen();
    requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => { ctx.setTransform(1,0,0,1,0,0); gen(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf.current);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
