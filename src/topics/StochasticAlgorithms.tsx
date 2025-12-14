import React, { useMemo, useEffect, useState } from "react";

const RandomWalkVisualizer: React.FC = () => {
  const steps = 40;
  const walk = useMemo(() => {
    const history: number[] = [];
    let pos = 0;
    for (let i = 0; i < steps; i++) {
      pos += Math.random() < 0.5 ? -1 : 1;
      history.push(pos);
    }
    return history;
  }, []);

  const width = 360;
  const height = 140;
  const margin = 22;
  const maxAbs = Math.max(...walk.map((v) => Math.abs(v)), 1);

  const path = walk
    .map((v, i) => {
      const t = steps > 1 ? i / (steps - 1) : 0;
      const x = margin + t * (width - 2 * margin);
      const y = height - margin - ((v + maxAbs) / (2 * maxAbs || 1)) * (height - 2 * margin);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
      <h3 className="text-slate-50 text-sm font-semibold">Random Walk Visualization</h3>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800">
        <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <text x={width / 2} y={height - 5} textAnchor="middle" fontSize={10} fill="#94a3b8">step n</text>
        <text x={margin - 16} y={margin} textAnchor="start" fontSize={10} fill="#94a3b8">position</text>
        <path d={path} fill="none" stroke="#38bdf8" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <pre className="text-[10px] bg-slate-950/80 border border-slate-800 rounded p-2 overflow-x-auto">
        <code>{`function randomWalk(steps) {
  let pos = 0;
  for (let i = 0; i < steps; i++) {
    pos += Math.random() < 0.5 ? -1 : 1;
  }
  return pos;
}`}</code>
      </pre>
      <p className="text-[11px] text-slate-400">
        Each step randomly moves left or right. Single runs are noisy, but ensemble statistics are predictable.
      </p>
    </div>
  );
};

const MonteCarloPi: React.FC = () => {
  const [samples, setSamples] = useState<{ x: number; y: number; inside: boolean }[]>([]);

  useEffect(() => {
    const maxSamples = 1000;
    const batchSize = 30;
    const interval = setInterval(() => {
      setSamples((prev) => {
        const next = [...prev];
        for (let i = 0; i < batchSize; i++) {
          const x = Math.random();
          const y = Math.random();
          next.push({ x, y, inside: x * x + y * y <= 1 });
        }
        return next.slice(-maxSamples);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const insideCount = samples.filter((s) => s.inside).length;
  const piEstimate = samples.length ? 4 * (insideCount / samples.length) : 0;

  const width = 200;
  const height = 200;
  const margin = 18;
  const boxSize = width - 2 * margin;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
      <h3 className="text-slate-50 text-sm font-semibold">Monte Carlo π Estimation</h3>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto rounded-xl bg-slate-950/80 border border-slate-800">
        {/* Unit square */}
        <rect x={margin} y={margin} width={boxSize} height={boxSize} fill="#020617" stroke="#1e293b" strokeWidth={1} />
        
        {/* Quarter circle (radius = boxSize, centered at bottom-left, arc from top-left to bottom-right) */}
        <path 
          d={`M ${margin} ${margin} A ${boxSize} ${boxSize} 0 0 1 ${margin + boxSize} ${margin + boxSize}`} 
          fill="rgba(34, 197, 94, 0.05)" 
          stroke="#22c55e" 
          strokeWidth={1.5}
          strokeDasharray="4,4"
        />
        
        {/* Sample points */}
        {samples.map((s, idx) => (
          <circle
            key={idx}
            cx={margin + s.x * boxSize}
            cy={margin + (1 - s.y) * boxSize}
            r={1.2}
            fill={s.inside ? "#22c55e" : "#ef4444"}
            opacity={0.8}
          />
        ))}
      </svg>
      <div className="flex justify-between text-[11px] text-slate-300">
        <span>Samples: {samples.length}</span>
        <span>π ≈ <span className="text-emerald-300 font-semibold">{piEstimate.toFixed(4)}</span></span>
      </div>
      <p className="text-[11px] text-slate-400">
        Random sampling in unit square. Green points fall inside quarter-circle (x²+y²≤1). 
        As samples grow: π ≈ 4 × (inside/total)
      </p>
    </div>
  );
};

const StochasticAlgorithms: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800 pb-4">
        <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
          Stochastic / Probabilistic Algorithms
        </h1>
        <p className="text-slate-300 text-[13px] leading-relaxed">
          Stochastic algorithms build uncertainty into the model itself. Rather than a single trajectory, they
          describe distributions over possible futures. These methods embrace randomness to model, sample, and manage
          uncertainty in complex systems.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-slate-50 text-sm font-semibold">Core Families</h3>
            <ul className="list-decimal ml-4 space-y-2 text-[12px] text-slate-300">
              <li><span className="font-semibold">Random Processes:</span> Random walks, Brownian motion - models for noise and diffusion</li>
              <li><span className="font-semibold">Markov Chains & HMMs:</span> State transitions with probabilities, inference from noisy observations</li>
              <li><span className="font-semibold">Monte Carlo Methods:</span> Estimate integrals and probabilities through repeated random sampling</li>
              <li><span className="font-semibold">Bayesian Inference:</span> Update beliefs using likelihood, explicitly track uncertainty</li>
              <li><span className="font-semibold">Particle Filters:</span> Maintain hypothesis clouds for state estimation</li>
            </ul>
          </article>

          <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-slate-50 text-sm font-semibold">Applications</h3>
            <ul className="list-disc ml-4 space-y-2 text-[12px] text-slate-300">
              <li><span className="font-semibold">Aircraft Reliability:</span> Random walks model health drift; Monte Carlo generates failure time distributions</li>
              <li><span className="font-semibold">Sensor Fusion:</span> Particle filters merge noisy radar, optical, and inertial measurements</li>
              <li><span className="font-semibold">Financial Markets:</span> Stochastic models generate price scenarios for risk analysis</li>
              <li><span className="font-semibold">Robotics:</span> Account for wheel slip, turbulence, actuator noise in localization</li>
            </ul>
          </article>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RandomWalkVisualizer />
          <MonteCarloPi />
        </div>

        <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h3 className="text-slate-50 text-sm font-semibold">Chaos vs Stochastic vs Deterministic</h3>
          <div className="text-[12px] text-slate-300 space-y-2">
            <p>
              <span className="font-semibold text-sky-300">Deterministic:</span> Fixed rules, same input → same output. Predictable and repeatable.
            </p>
            <p>
              <span className="font-semibold text-purple-300">Chaos:</span> Fixed rules but extreme sensitivity. Small changes → huge divergence. Deterministic yet unpredictable.
            </p>
            <p>
              <span className="font-semibold text-emerald-300">Stochastic:</span> Explicit randomness. Single runs differ, but ensemble statistics are stable and quantifiable.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default StochasticAlgorithms;
