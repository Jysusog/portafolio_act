import { useEffect, useRef } from 'react';
import { hashString, mulberry32 } from '../HeroSection/regression';
import type { ThumbnailVariant } from '../../data/projects';
import './ProjectThumbnail.css';

interface Props {
  seed: string;
  variant: ThumbnailVariant;
  height?: number;
}

const ProjectThumbnail = ({ seed, variant, height = 140 }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    const cssVar = (n: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(n).trim() || '#888';

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const accent = cssVar('--accent');
      const accent2 = cssVar('--accent-2');
      const success = cssVar('--success');
      const faint = cssVar('--text-faint');
      const border = cssVar('--border');

      const padX = 12;
      const padY = 14;
      const innerW = w - padX * 2;
      const innerH = h - padY * 2;

      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      for (let i = 1; i < 4; i++) {
        const y = padY + (innerH / 4) * i;
        ctx.moveTo(padX, y);
        ctx.lineTo(w - padX, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      const rand = mulberry32(hashString(seed));

      if (variant === 'scatter') {
        const n = 60;
        ctx.fillStyle = faint;
        for (let i = 0; i < n; i++) {
          const x = rand();
          const noise = (rand() - 0.5) * 0.3;
          const yv = Math.max(0.05, Math.min(0.95, 0.85 - x * 0.7 + noise));
          ctx.globalAlpha = 0.55;
          ctx.beginPath();
          ctx.arc(padX + x * innerW, padY + (1 - yv) * innerH, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const x = i / 40;
          const yv = 0.85 - x * 0.7;
          const px = padX + x * innerW;
          const py = padY + (1 - yv) * innerH;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      } else if (variant === 'line') {
        const series = [
          { color: accent, bias: 0 },
          { color: accent2, bias: 0.15 },
        ];
        for (const s of series) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 2;
          ctx.lineJoin = 'round';
          ctx.beginPath();
          let v = 0.4 + s.bias;
          for (let i = 0; i <= 40; i++) {
            v += (rand() - 0.5) * 0.15;
            v = Math.max(0.1, Math.min(0.9, v));
            const px = padX + (i / 40) * innerW;
            const py = padY + (1 - v) * innerH;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      } else if (variant === 'bars') {
        const n = 14;
        const barW = innerW / n - 4;
        for (let i = 0; i < n; i++) {
          const v = 0.2 + rand() * 0.75;
          const bx = padX + i * (innerW / n) + 2;
          const bh = v * innerH;
          const by = padY + innerH - bh;
          ctx.fillStyle = i % 3 === 0 ? accent : i % 3 === 1 ? accent2 : success;
          ctx.globalAlpha = 0.85;
          ctx.fillRect(bx, by, barW, bh);
        }
        ctx.globalAlpha = 1;
      } else if (variant === 'heatmap') {
        const cols = 12;
        const rows = 6;
        const cw = innerW / cols;
        const ch = innerH / rows;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const v = rand();
            ctx.fillStyle = accent;
            ctx.globalAlpha = 0.08 + v * 0.6;
            ctx.fillRect(padX + c * cw + 1, padY + r * ch + 1, cw - 2, ch - 2);
          }
        }
        ctx.globalAlpha = 1;
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    const obs = new MutationObserver(draw);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      ro.disconnect();
      obs.disconnect();
    };
  }, [seed, variant]);

  return (
    <div className="project-thumb" style={{ height }}>
      <canvas ref={ref} className="project-thumb-canvas" aria-hidden="true" />
    </div>
  );
};

export default ProjectThumbnail;
