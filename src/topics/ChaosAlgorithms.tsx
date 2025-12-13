import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  logisticStep,
  iterateLogisticMap,
  lorenzStep,
} from "../utils/chaosMath";
import { GlowCard, StatBadge } from "../components/FuturisticUI";

// Time Series Visualizer
const TimeSeriesPlot: React.FC<{ r: number }> = ({ r }) => {
  const width = 420;
  const height = 220;
  const margin = 30;

  const pathData = useMemo(() => {
    const xs = iterateLogisticMap(r, 0.2, 180);
    const burnIn = 30;
    const visible = xs.slice(burnIn);
    if (!visible.length) return "";

    const cmds: string[] = [];
    visible.forEach((x, i) => {
      const t = i / Math.max(1, visible.length - 1);
      const px = margin + t * (width - 2 * margin);
      const py = height - margin - x * (height - 2 * margin);
      cmds.push(`${i === 0 ? "M" : "L"} ${px.toFixed(2)} ${py.toFixed(2)}`);
    });

    return cmds.join(" ");
  }, [r]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] text-slate-200">
        <span className="font-semibold">Time Series</span>
        <span className="text-slate-500">How xₙ evolves over discrete steps</span>
      </div>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-xl bg-slate-950/70 border border-slate-800"
      >
        <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <text x={width / 2} y={height - 8} textAnchor="middle" fontSize={10} fill="#94a3b8">step n</text>
        <text x={margin - 18} y={margin - 8} textAnchor="start" fontSize={10} fill="#94a3b8">xₙ</text>
        {pathData && (
          <path d={pathData} fill="none" stroke="#22c55e" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
      <p className="text-[11px] text-slate-400 leading-snug">
        Evolution of xₙ over iterations. Stable for small r, periodic then chaotic as r increases.
      </p>
    </div>
  );
};

// Cobweb Diagram
const CobwebDiagram: React.FC<{ r: number }> = ({ r }) => {
  const width = 360;
  const height = 260;
  const margin = 30;

  const diagonalPath = useMemo(() => {
    const x0 = margin;
    const y0 = height - margin;
    const x1 = width - margin;
    const y1 = margin;
    return `M ${x0} ${y0} L ${x1} ${y1}`;
  }, []);

  const { curvePath, cobwebPath, cobwebPoints } = useMemo(() => {
    const stepsCurve = 400;
    const curvePts: string[] = [];
    for (let i = 0; i <= stepsCurve; i++) {
      const x = i / stepsCurve;
      const y = logisticStep(x, r);
      const px = margin + x * (width - 2 * margin);
      const py = height - margin - y * (height - 2 * margin);
      curvePts.push(`${i === 0 ? "M" : "L"} ${px.toFixed(2)} ${py.toFixed(2)}`);
    }

    const stepsCobweb = 40;
    let x = 0.2;
    const cmds: string[] = [];
    const points: { px: number; py: number }[] = [];

    const toPx = (xVal: number, yVal: number) => {
      const px = margin + xVal * (width - 2 * margin);
      const py = height - margin - yVal * (height - 2 * margin);
      return { px, py };
    };

    let { px, py } = toPx(x, 0);
    cmds.push(`M ${px.toFixed(2)} ${py.toFixed(2)}`);
    points.push({ px, py });

    for (let i = 0; i < stepsCobweb; i++) {
      const yOnCurve = logisticStep(x, r);
      ({ px, py } = toPx(x, yOnCurve));
      cmds.push(`L ${px.toFixed(2)} ${py.toFixed(2)}`);
      points.push({ px, py });
      ({ px, py } = toPx(yOnCurve, yOnCurve));
      cmds.push(`L ${px.toFixed(2)} ${py.toFixed(2)}`);
      points.push({ px, py });
      x = yOnCurve;
    }

    return {
      curvePath: curvePts.join(" "),
      cobwebPath: cmds.join(" "),
      cobwebPoints: points,
    };
  }, [r]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (cobwebPoints.length === 0) return;
    setActiveIndex(0);
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cobwebPoints.length);
    }, 160);
    return () => window.clearInterval(id);
  }, [cobwebPoints]);

  const activePoint = cobwebPoints[activeIndex] ?? null;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] text-slate-200">
        <span className="font-semibold">Cobweb Diagram</span>
        <span className="text-slate-500">Geometric iteration of x ↦ r x (1 − x)</span>
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto rounded-xl bg-slate-950/70 border border-slate-800">
        <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <text x={width / 2} y={height - 8} textAnchor="middle" fontSize={10} fill="#94a3b8">x</text>
        <text x={margin - 16} y={margin - 8} textAnchor="start" fontSize={10} fill="#94a3b8">f(x)</text>
        <path d={diagonalPath} fill="none" stroke="#475569" strokeWidth={1} strokeDasharray="4 3" />
        <path d={curvePath} fill="none" stroke="#38bdf8" strokeWidth={1.6} />
        <path d={cobwebPath} fill="none" stroke="#f97316" strokeWidth={1.2} />
        {activePoint && <circle cx={activePoint.px} cy={activePoint.py} r={3} fill="#f97316" stroke="#020617" strokeWidth={1} />}
      </svg>
      <p className="text-[11px] text-slate-400 leading-snug">
        Cobweb shows the feedback process xₙ₊₁ = f(xₙ). Orange point walks the staircase showing convergence, cycles, or chaos.
      </p>
    </div>
  );
};

// Bifurcation Diagram
const BifurcationDiagram: React.FC = () => {
  const width = 760;
  const height = 260;
  const margin = 40;

  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const rMin = 2.5;
    const rMax = 4.0;
    const rSteps = 260;
    const iters = 420;
    const keep = 60;

    for (let i = 0; i <= rSteps; i++) {
      const r = rMin + (i / rSteps) * (rMax - rMin);
      let x = 0.2;
      for (let k = 0; k < iters - keep; k++) {
        x = logisticStep(x, r);
      }
      for (let k = 0; k < keep; k++) {
        x = logisticStep(x, r);
        const px = margin + (i / rSteps) * (width - 2 * margin);
        const py = height - margin - x * (height - 2 * margin);
        pts.push({ x: px, y: py });
      }
    }
    return pts;
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] text-slate-200">
        <span className="font-semibold">Bifurcation Diagram</span>
        <span className="text-slate-500">Long-term behavior of xₙ as r varies</span>
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto rounded-xl bg-slate-950/80 border border-slate-800">
        <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize={10} fill="#94a3b8">parameter r</text>
        <text x={margin - 22} y={margin - 10} textAnchor="start" fontSize={10} fill="#94a3b8">long-term xₙ</text>
        {[2.5, 3, 3.5, 4].map((rv) => {
          const t = (rv - 2.5) / (4 - 2.5);
          const px = margin + t * (width - 2 * margin);
          return (
            <g key={rv}>
              <line x1={px} y1={height - margin} x2={px} y2={height - margin + 4} stroke="#475569" strokeWidth={1} />
              <text x={px} y={height - margin + 14} textAnchor="middle" fontSize={9} fill="#94a3b8">{rv.toFixed(2)}</text>
            </g>
          );
        })}
        {points.map((p, idx) => (
          <circle key={idx} cx={p.x} cy={p.y} r={0.5} fill="#38bdf8" opacity={0.8} />
        ))}
      </svg>
      <p className="text-[11px] text-slate-400 leading-snug">
        Shows period-doubling cascade and transition to chaos as parameter r increases.
      </p>
    </div>
  );
};

// Lorenz Attractor 3D Projection
const LorenzAttractor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [rotationY, setRotationY] = useState(0);
  const pointsRef = useRef<{x: number; y: number; z: number}[]>([]);

  useEffect(() => {
    if (!isRunning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Lorenz system parameters
    const sigma = 10;
    const rho = 28;
    const beta = 8/3;
    const dt = 0.01;

    // Initialize position
    let state = { x: 0.1, y: 0, z: 0 };

    const animate = () => {
      // Update Lorenz system
      const newState = lorenzStep(state.x, state.y, state.z, sigma, rho, beta, dt);
      state = newState;
      
      // Store point
      pointsRef.current.push({...state});
      if (pointsRef.current.length > 1500) {
        pointsRef.current.shift();
      }

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.02)';
      ctx.fillRect(0, 0, width, height);

      // Rotate for 3D effect
      setRotationY(r => r + 0.002);

      // Project and draw points
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 1;
      
      pointsRef.current.forEach((point, i) => {
        if (i === 0) return;
        
        const prev = pointsRef.current[i - 1];
        
        // Simple 3D rotation and projection
        const scale = 5;
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        
        const x1 = prev.x * cosY - prev.z * sinY;
        const z1 = prev.x * sinY + prev.z * cosY;
        const x2 = point.x * cosY - point.z * sinY;
        const z2 = point.x * sinY + point.z * cosY;
        
        const sx1 = width/2 + x1 * scale;
        const sy1 = height/2 - prev.y * scale + z1 * 0.5;
        const sx2 = width/2 + x2 * scale;
        const sy2 = height/2 - point.y * scale + z2 * 0.5;
        
        // Color based on height
        const hue = 200 + (point.y / 50) * 60;
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${i / pointsRef.current.length})`;
        
        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        ctx.lineTo(sx2, sy2);
        ctx.stroke();
      });

      if (isRunning) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isRunning, rotationY]);

  return (
    <GlowCard className="p-4 space-y-3" glowColor="sky">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Lorenz Attractor (Strange Attractor)</h3>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-3 py-1 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/50 rounded-lg text-sky-300 text-xs transition-all"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        width={450}
        height={300}
        className="w-full h-auto rounded-lg bg-slate-950 border border-slate-800"
      />
      
      <div className="flex gap-2">
        <StatBadge label="σ" value={10} color="sky" />
        <StatBadge label="ρ" value={28} color="sky" />
        <StatBadge label="β" value="8/3" color="sky" />
      </div>
      
      <p className="text-[11px] text-slate-400 leading-snug">
        The Lorenz attractor demonstrates sensitive dependence on initial conditions in atmospheric
        convection. Two nearby trajectories diverge exponentially - the "butterfly effect."
      </p>
    </GlowCard>
  );
};

// Mandelbrot Set Zoom
const MandelbrotZoom: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<any>(null);

  const drawMandelbrot = (zoom: number, centerX: number, centerY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);

    const maxIterations = 100;
    const scale = 3 / zoom;

    for (let px = 0; px < width; px++) {
      for (let py = 0; py < height; py++) {
        const x0 = centerX + (px - width / 2) * (scale / width);
        const y0 = centerY + (py - height / 2) * (scale / height);

        let x = 0;
        let y = 0;
        let iteration = 0;

        while (x * x + y * y <= 4 && iteration < maxIterations) {
          const xTemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xTemp;
          iteration++;
        }

        const idx = (py * width + px) * 4;
        if (iteration === maxIterations) {
          imageData.data[idx] = 0;
          imageData.data[idx + 1] = 0;
          imageData.data[idx + 2] = 0;
        } else {
          const hue = (iteration / maxIterations) * 360;
          const lightness = iteration < maxIterations ? 50 : 0;
          const color = hslToRgb(hue, 80, lightness);
          imageData.data[idx] = color[0];
          imageData.data[idx + 1] = color[1];
          imageData.data[idx + 2] = color[2];
        }
        imageData.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
  };

  const handleZoom = async () => {
    setIsAnimating(true);
    
    // Anime.js zoom animation
    if (animationRef.current) {
      animationRef.current.pause();
    }

    const animeModule: any = await import('animejs');
    const anime = animeModule.default || animeModule;

    animationRef.current = (anime as any)({
      targets: { z: zoom },
      z: zoom * 2,
      duration: 2000,
      easing: 'easeInOutQuad',
      update: (anim: any) => {
        const currentZoom = anim.animations[0].currentValue;
        setZoom(currentZoom);
        drawMandelbrot(currentZoom, -0.5, 0);
      },
      complete: () => {
        setIsAnimating(false);
      }
    });
  };

  const handleReset = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
    setZoom(1);
    setIsAnimating(false);
    drawMandelbrot(1, -0.5, 0);
  };

  useEffect(() => {
    drawMandelbrot(zoom, -0.5, 0);
  }, []);

  return (
    <GlowCard className="p-4 space-y-3" glowColor="purple">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Mandelbrot Set (Infinite Complexity)</h3>
        <div className="flex gap-2">
          <button
            onClick={handleZoom}
            disabled={isAnimating}
            className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-purple-300 text-xs transition-all disabled:opacity-50"
          >
            Zoom In
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs transition-all"
          >
            Reset
          </button>
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={450}
        height={300}
        className="w-full h-auto rounded-lg border border-slate-800 cursor-pointer"
      />
      
      <StatBadge label="Zoom Level" value={`${zoom.toFixed(1)}x`} color="purple" />
      
      <p className="text-[11px] text-slate-400 leading-snug">
        The Mandelbrot set exhibits self-similarity at all scales. No matter how far you zoom, new
        intricate patterns emerge - a hallmark of fractal geometry.
      </p>
    </GlowCard>
  );
};

// Main Chaos Algorithms Component
const ChaosAlgorithms: React.FC = () => {
  const [r, setR] = useState(3.7);

  const regimeLabel = useMemo(() => {
    if (r < 3) return "Stable fixed point (deterministic convergence)";
    if (r < 3.45) return "Low-period cycles (regular oscillations)";
    if (r < 3.57) return "Period-doubling cascade (increasing complexity)";
    if (r < 3.83) return "Chaotic dynamics with embedded periodic windows";
    return "Strong chaos (high sensitivity to initial conditions)";
  }, [r]);

  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800 pb-4">
        <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
          Chaos Algorithms and the Logistic Map
        </h1>
        <p className="text-slate-300 text-[13px] leading-relaxed">
          Chaos algorithms arise from simple, deterministic rules applied repeatedly. The logistic map{" "}
          <code className="bg-slate-800/80 px-1 py-0.5 rounded text-[11px] mx-1">xₙ₊₁ = r · xₙ · (1 − xₙ)</code>{" "}
          demonstrates how varying parameter r creates transitions from stability through periodic oscillations into fully chaotic dynamics.
        </p>
      </header>

      {/* Parameter Control */}
      <section className="space-y-3 sticky top-4 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 pb-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6 bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3">
          <div className="text-[12px] text-slate-200 md:w-64 space-y-1">
            <div>
              Parameter r = <span className="font-semibold text-sky-300 ml-1">{r.toFixed(3)}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Controls system response strength. Higher r = more complex dynamics.
            </div>
          </div>
          <input
            type="range"
            min={2.5}
            max={4.0}
            step={0.001}
            value={r}
            onChange={(e) => setR(parseFloat(e.target.value))}
            className="flex-1 accent-sky-400 cursor-pointer"
          />
          <div className="text-[11px] text-slate-400 flex flex-col items-start md:items-end gap-0.5">
            <span>2.5 → stable, predictable</span>
            <span>4.0 → strongly chaotic</span>
          </div>
        </div>
        <div className="inline-flex items-center text-[11px] text-emerald-300 bg-emerald-900/20 border border-emerald-700/40 rounded-lg px-3 py-1.5">
          <span className="font-semibold mr-1">Current regime:</span>
          <span>{regimeLabel}</span>
        </div>
      </section>

      {/* Visualizers */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TimeSeriesPlot r={r} />
          <CobwebDiagram r={r} />
        </div>
        <div className="w-full">
          <BifurcationDiagram />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LorenzAttractor />
          <MandelbrotZoom />
        </div>
      </section>

      {/* Educational Content */}
      <section className="border-t border-slate-800 pt-6 space-y-4 text-[13px] text-slate-200 leading-relaxed">
        <h2 className="text-slate-100 text-sm font-semibold tracking-wide uppercase">Key Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <h3 className="text-slate-50 text-sm font-semibold">What is Chaos?</h3>
            <p className="text-[12px] text-slate-300">
              Chaos is deterministic yet unpredictable. Small differences in starting conditions grow exponentially,
              making long-term forecasting impossible despite following fixed rules. This is "sensitive dependence on
              initial conditions" - the hallmark of chaotic systems.
            </p>
          </article>
          <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <h3 className="text-slate-50 text-sm font-semibold">Real-World Applications</h3>
            <p className="text-[12px] text-slate-300">
              Chaos theory applies to weather prediction, population dynamics, cryptography, robotics path planning,
              and financial markets. Understanding chaotic regimes helps us know when predictions are trustworthy and
              when we need robust strategies for uncertainty.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ChaosAlgorithms;
