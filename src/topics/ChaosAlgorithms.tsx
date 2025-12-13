import React, { useMemo, useState, useEffect } from "react";
import {
  logisticStep,
  iterateLogisticMap,
} from "../utils/chaosMath";

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
