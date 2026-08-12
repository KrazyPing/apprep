import React, { useEffect, useRef } from 'react';

export default function CanvasGraph({ mode, paramA, paramB }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    const cx = 50;
    const cy = height / 2;
    const scaleX = 45;
    const scaleY = 22;

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 22) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(width, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, height);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px monospace';

    if (mode === 'vt_graph') {
      const tMax = 8;
      
      ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);

      for (let px = cx; px <= cx + tMax * scaleX; px++) {
        const t = (px - cx) / scaleX;
        const v = paramA * t * Math.cos(0.4 * t) - paramB;
        const py = cy - v * scaleY;
        ctx.lineTo(px, py);
      }
      ctx.lineTo(cx + tMax * scaleX, cy);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = cx; px <= cx + tMax * scaleX; px++) {
        const t = (px - cx) / scaleX;
        const v = paramA * t * Math.cos(0.4 * t) - paramB;
        const py = cy - v * scaleY;
        if (px === cx) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      const tTang = 3;
      const vTang = paramA * tTang * Math.cos(0.4 * tTang) - paramB;
      const slopeA = paramA * Math.cos(0.4 * tTang) - paramA * tTang * 0.4 * Math.sin(0.4 * tTang);
      
      const pxTang = cx + tTang * scaleX;
      const pyTang = cy - vTang * scaleY;

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pxTang - 45, pyTang + 45 * slopeA * (scaleY / scaleX));
      ctx.lineTo(pxTang + 45, pyTang - 45 * slopeA * (scaleY / scaleX));
      ctx.stroke();

      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(pxTang, pyTang, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillText('Time t (seconds) →', width - 140, cy - 8);
      ctx.fillText('Velocity v(t) (m/s) ↑', cx + 10, 18);
      ctx.fillStyle = '#06b6d4';
      ctx.fillText('Shaded Area = Displacement Δx = ∫ v(t) dt', cx + 110, height - 12);
      ctx.fillStyle = '#f43f5e';
      ctx.fillText(`Slope = Accel a(3s) = ${slopeA.toFixed(2)} m/s²`, pxTang + 10, pyTang - 10);
    } 
    else if (mode === 'taylor_graph') {
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      for (let px = 0; px < width; px++) {
        const x = (px - (width / 2)) / 30;
        const y = Math.exp(x);
        const py = (height / 2) - y * 30;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();
      for (let px = 0; px < width; px++) {
        const x = (px - (width / 2)) / 30;
        let y = 0;
        let fact = 1;
        for (let i = 0; i <= paramA; i++) {
          if (i > 0) fact *= i;
          y += Math.pow(x, i) / fact;
        }
        const py = (height / 2) - y * 30;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.fillText('Actual Curve: f(x) = e^x', width - 180, 25);
      ctx.fillStyle = '#06b6d4';
      ctx.fillText(`Taylor Poly P_${paramA}(x) Centered at c = 0`, width - 240, 45);
    }
    else if (mode === 'projectile_graph') {
      const angleRad = (paramA * Math.PI) / 180;
      const v0 = paramB;
      const g = 9.8;

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const startX = 40;
      const startY = height - 30;

      for (let t = 0; t < 12; t += 0.05) {
        const x = v0 * Math.cos(angleRad) * t;
        const y = v0 * Math.sin(angleRad) * t - 0.5 * g * t * t;
        const px = startX + x * 3.5;
        const py = startY - y * 3.5;
        if (py > startY) break;
        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.fillStyle = '#6366f1';
      ctx.fillText(`Trajectory: y(t) = v₀ sin(θ)t − ½gt²  [θ=${paramA}°, v₀=${paramB}m/s]`, startX + 10, 20);
    }
  }, [mode, paramA, paramB]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      <canvas ref={canvasRef} width={620} height={300} className="w-full h-auto block" />
      <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 border border-slate-800">
        High-Precision Graphical Analysis Engine
      </div>
    </div>
  );
}