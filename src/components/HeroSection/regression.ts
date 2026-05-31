export type Pt = { x: number; y: number };

export const hashString = (s: string): number => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const solve = (m: number[][], b: number[]): number[] => {
  const n = b.length;
  const a = m.map((row, i) => [...row, b[i]]);
  for (let i = 0; i < n; i++) {
    let pivot = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(a[k][i]) > Math.abs(a[pivot][i])) pivot = k;
    }
    [a[i], a[pivot]] = [a[pivot], a[i]];
    const div = a[i][i] || 1e-12;
    for (let j = i; j <= n; j++) a[i][j] /= div;
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const factor = a[k][i];
      for (let j = i; j <= n; j++) a[k][j] -= factor * a[i][j];
    }
  }
  return a.map((row) => row[n]);
};

export const polyfit = (pts: Pt[], degree: number): number[] => {
  const m = degree + 1;
  const A: number[][] = Array.from({ length: m }, () => Array(m).fill(0));
  const B: number[] = Array(m).fill(0);
  for (const { x, y } of pts) {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) A[i][j] += Math.pow(x, i + j);
      B[i] += y * Math.pow(x, i);
    }
  }
  return solve(A, B);
};

export const polyEval = (coefs: number[], x: number): number => {
  let r = 0;
  for (let i = coefs.length - 1; i >= 0; i--) r = r * x + coefs[i];
  return r;
};

export const loess = (pts: Pt[], xTargets: number[], bandwidth = 0.35): number[] => {
  const n = pts.length;
  const out: number[] = [];
  const xs = pts.map((p) => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const span = maxX - minX || 1;
  const h = bandwidth * span;
  for (const x of xTargets) {
    let sw = 0;
    let swx = 0;
    let swy = 0;
    let swxx = 0;
    let swxy = 0;
    for (let i = 0; i < n; i++) {
      const dx = pts[i].x - x;
      const u = Math.min(1, Math.abs(dx) / h);
      const w = Math.pow(1 - u * u * u, 3);
      if (w <= 0) continue;
      sw += w;
      swx += w * pts[i].x;
      swy += w * pts[i].y;
      swxx += w * pts[i].x * pts[i].x;
      swxy += w * pts[i].x * pts[i].y;
    }
    const meanX = swx / sw;
    const meanY = swy / sw;
    const denom = swxx / sw - meanX * meanX;
    const slope = denom > 1e-9 ? (swxy / sw - meanX * meanY) / denom : 0;
    const intercept = meanY - slope * meanX;
    out.push(intercept + slope * x);
  }
  return out;
};

export const movingSmooth = (pts: Pt[], xTargets: number[], window = 0.18): number[] => {
  const xs = pts.map((p) => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const span = maxX - minX || 1;
  const w = window * span;
  return xTargets.map((x) => {
    let sw = 0;
    let sy = 0;
    for (const p of pts) {
      const d = Math.abs(p.x - x);
      if (d > w) continue;
      const weight = 1 - d / w;
      sw += weight;
      sy += weight * p.y;
    }
    return sw > 0 ? sy / sw : 0;
  });
};
