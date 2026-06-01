import { useEffect, useRef } from 'react';
import {
  hashString,
  loess,
  movingSmooth,
  mulberry32,
  polyEval,
  polyfit,
  type Pt,
} from './regression';

const POINTS = 320;
const CURVE_SAMPLES = 140;
const FRAME_MS = 1000 / 30;

interface Shape {
  seed: string;
  fn: (rand: () => number) => (x: number) => number;
  noise: number;
}

const SHAPES: Shape[] = [
  {
    seed: 'decay',
    noise: 0.13,
    fn: (rand) => {
      const a = 0.7 + rand() * 0.3;
      const b = 4 + rand() * 2;
      const bump = 0.08 + rand() * 0.07;
      return (x) => a * Math.exp(-b * x) + bump * Math.sin(x * 9) + 0.12;
    },
  },
  {
    seed: 'sigmoid',
    noise: 0.11,
    fn: (rand) => {
      const k = 8 + rand() * 4;
      const x0 = 0.4 + rand() * 0.2;
      return (x) => 0.18 + 0.7 / (1 + Math.exp(-k * (x - x0)));
    },
  },
  {
    seed: 'bump',
    noise: 0.12,
    fn: (rand) => {
      const mu = 0.45 + rand() * 0.15;
      const sig = 0.18 + rand() * 0.05;
      return (x) => 0.2 + 0.65 * Math.exp(-((x - mu) ** 2) / (2 * sig * sig));
    },
  },
];

const ScatterRegressionCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    const cssVar = (n: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(n).trim() || '#888';

    let cycle = 0;
    let pts: Pt[] = [];
    let poly: number[] = [];
    let loessYs: number[] = [];
    let smoothYs: number[] = [];
    let xSamples: number[] = [];

    const sampleData = () => {
      cycle++;
      const shape = SHAPES[cycle % SHAPES.length];
      const rand = mulberry32(hashString(shape.seed + cycle));
      const f = shape.fn(rand);
      pts = [];
      for (let i = 0; i < POINTS; i++) {
        const x = rand();
        const noise = (rand() - 0.5) * 2 * shape.noise;
        const y = Math.max(0.02, Math.min(0.98, f(x) + noise));
        pts.push({ x, y });
      }
      xSamples = Array.from({ length: CURVE_SAMPLES }, (_, i) => i / (CURVE_SAMPLES - 1));
      poly = polyfit(pts, 2);
      loessYs = loess(pts, xSamples, 0.4);
      smoothYs = movingSmooth(pts, xSamples, 0.22);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const padL = 48;
    const padR = 28;
    const padT = 32;
    const padB = 44;

    const px = (x: number) => padL + x * Math.max(20, width - padL - padR);
    const py = (y: number) => padT + (1 - y) * Math.max(20, height - padT - padB);

    const drawAxes = () => {
      const cols = 8;
      const rows = 5;
      const plotW = Math.max(20, width - padL - padR);
      const plotH = Math.max(20, height - padT - padB);

      // Below 900px viewport: ambient grid only, no axes, ticks or labels
      if (width < 900) {
        const faint = cssVar('--text-faint');
        ctx.strokeStyle = faint;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        for (let i = 1; i < cols; i++) {
          const x = padL + (plotW / cols) * i;
          ctx.moveTo(x, padT);
          ctx.lineTo(x, height - padB);
        }
        for (let j = 1; j < rows; j++) {
          const y = padT + (plotH / rows) * j;
          ctx.moveTo(padL, y);
          ctx.lineTo(width - padR, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
        return;
      }

      const text = cssVar('--text');
      const textMut = cssVar('--text-mut');
      const textFaint = cssVar('--text-faint');

      // Inner grid lines
      ctx.strokeStyle = textFaint;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      for (let i = 1; i < cols; i++) {
        const x = padL + (plotW / cols) * i;
        ctx.moveTo(x, padT);
        ctx.lineTo(x, height - padB);
      }
      for (let j = 1; j < rows; j++) {
        const y = padT + (plotH / rows) * j;
        ctx.moveTo(padL, y);
        ctx.lineTo(width - padR, y);
      }
      ctx.stroke();

      // X and Y axes
      ctx.strokeStyle = text;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, height - padB);
      ctx.moveTo(padL, height - padB);
      ctx.lineTo(width - padR, height - padB);
      ctx.stroke();

      // Tick marks
      ctx.strokeStyle = textMut;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      for (let j = 0; j <= rows; j++) {
        const y = padT + (plotH / rows) * j;
        ctx.moveTo(padL - 7, y);
        ctx.lineTo(padL, y);
      }
      for (let i = 0; i <= cols; i++) {
        const x = padL + (plotW / cols) * i;
        ctx.moveTo(x, height - padB);
        ctx.lineTo(x, height - padB + 7);
      }
      ctx.stroke();

      // Tick labels
      ctx.fillStyle = textMut;
      ctx.font = `11px var(--font-mono, monospace)`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let j = 0; j <= rows; j++) {
        const v = (1 - j / rows).toFixed(1);
        const y = padT + (plotH / rows) * j;
        ctx.fillText(v, padL - 11, y);
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      for (let i = 0; i <= cols; i++) {
        const v = (i / cols).toFixed(1);
        const x = padL + (plotW / cols) * i;
        ctx.fillText(v, x, height - padB + 11);
      }
    };

    const drawPoints = (alpha: number, revealCount: number) => {
      const color = cssVar('--text-faint');
      ctx.fillStyle = color;
      const n = Math.min(pts.length, revealCount);
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        ctx.globalAlpha = alpha * 0.55;
        ctx.beginPath();
        ctx.arc(px(p.x), py(p.y), 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawCurve = (
      ys: number[],
      colorVar: string,
      progress: number,
      cycleAlpha: number,
      lineWidth = 2.2,
    ) => {
      const color = cssVar(colorVar);
      const last = Math.max(2, Math.floor(xSamples.length * progress));
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.92 * cycleAlpha;
      ctx.beginPath();
      for (let i = 0; i < last; i++) {
        const x = px(xSamples[i]);
        const y = py(ys[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const polyYs = () => xSamples.map((x) => Math.max(0, Math.min(1, polyEval(poly, x))));

    const renderFrame = (
      pointsAlpha: number,
      pointsReveal: number,
      polyProg: number,
      loessProg: number,
      smoothProg: number,
      cycleAlpha: number,
    ) => {
      ctx.clearRect(0, 0, width, height);
      drawAxes();
      drawPoints(pointsAlpha * cycleAlpha, pointsReveal);
      const pYs = polyYs();
      drawCurve(pYs, '--accent', polyProg, cycleAlpha, 2);
      drawCurve(loessYs, '--accent-2', loessProg, cycleAlpha, 2.2);
      drawCurve(smoothYs, '--success', smoothProg, cycleAlpha, 2);
    };

    const CYCLE_MS = 10800;
    const POINTS_IN = 2250;
    const CURVE_DELAY = 2550;
    const CURVE_DUR = 2550;
    const CURVE_STAGGER = 540;
    const FADE_IN = 700;
    const FADE_OUT = 900;

    const FIRST_CYCLE_MS = 4200;
    const FIRST_POINTS_IN = 600;
    const FIRST_CURVE_DELAY = 700;
    const FIRST_CURVE_DUR = 1100;
    const FIRST_CURVE_STAGGER = 220;
    const FIRST_FADE_IN = 250;

    sampleData();

    if (reduceMotion) {
      renderFrame(1, POINTS, 1, 1, 1, 1);
      return () => {
        ro.disconnect();
      };
    }

    const easeInOut = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);

    let cycleStart = performance.now();
    let rafId = 0;
    let running = true;
    let last = performance.now();

    const loop = (now: number) => {
      if (!running) return;
      if (now - last < FRAME_MS) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      last = now;

      const isFirst = cycle === 1;
      const cycleMs = isFirst ? FIRST_CYCLE_MS : CYCLE_MS;
      const pointsIn = isFirst ? FIRST_POINTS_IN : POINTS_IN;
      const curveDelay = isFirst ? FIRST_CURVE_DELAY : CURVE_DELAY;
      const curveDur = isFirst ? FIRST_CURVE_DUR : CURVE_DUR;
      const curveStagger = isFirst ? FIRST_CURVE_STAGGER : CURVE_STAGGER;
      const fadeIn = isFirst ? FIRST_FADE_IN : FADE_IN;

      let t = now - cycleStart;
      if (t > cycleMs) {
        cycleStart = now;
        sampleData();
        t = 0;
      }

      const pointsReveal =
        t < pointsIn ? Math.floor((t / pointsIn) * POINTS) : POINTS;
      const pointsAlpha = t < pointsIn ? Math.min(1, t / pointsIn) : 1;

      const curveT = Math.max(0, t - curveDelay);
      const polyProg = Math.min(1, curveT / curveDur);
      const loessProg = Math.min(1, Math.max(0, curveT - curveStagger) / curveDur);
      const smoothProg = Math.min(1, Math.max(0, curveT - curveStagger * 2) / curveDur);

      let cycleAlpha = 1;
      if (t < fadeIn) {
        cycleAlpha = easeInOut(t / fadeIn);
      } else if (t > cycleMs - FADE_OUT) {
        cycleAlpha = easeInOut(Math.max(0, (cycleMs - t) / FADE_OUT));
      }

      renderFrame(pointsAlpha, pointsReveal, polyProg, loessProg, smoothProg, cycleAlpha);

      rafId = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !running) {
            running = true;
            last = performance.now();
            rafId = requestAnimationFrame(loop);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(rafId);
          }
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    rafId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="ts-canvas" aria-hidden="true" />;
};

export default ScatterRegressionCanvas;
