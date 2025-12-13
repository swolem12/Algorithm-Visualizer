import React, { useMemo } from "react";

const LinearRegressionDemo: React.FC = () => {
  const points = useMemo(() => {
    const xs = [0, 0.5, 1, 1.5, 2, 2.5, 3];
    const ys = [1.1, 1.9, 3.0, 3.8, 5.2, 6.1, 7.2];
    return xs.map((x, i) => ({ x, y: ys[i] }));
  }, []);

  const { a, b } = useMemo(() => {
    const n = points.length || 1;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    points.forEach((p) => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumX2 += p.x * p.x;
    });
    const denom = n * sumX2 - sumX * sumX || 1;
    const a = (n * sumXY - sumX * sumY) / denom;
    const b = (sumY - a * sumX) / n;
    return { a, b };
  }, [points]);

  const width = 360;
  const height = 160;
  const margin = 26;
  const xMin = 0, xMax = 3, yMin = 0, yMax = 8;

  const mapX = (x: number) => margin + ((x - xMin) / (xMax - xMin || 1)) * (width - 2 * margin);
  const mapY = (y: number) => height - margin - ((y - yMin) / (yMax - yMin || 1)) * (height - 2 * margin);

  const linePath = useMemo(() => {
    const x1 = xMin, x2 = xMax;
    const y1 = a * x1 + b, y2 = a * x2 + b;
    return `M ${mapX(x1).toFixed(2)} ${mapY(y1).toFixed(2)} L ${mapX(x2).toFixed(2)} ${mapY(y2).toFixed(2)}`;
  }, [a, b]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
      <h3 className="text-slate-50 text-sm font-semibold">Linear Regression Example</h3>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto rounded-xl bg-slate-950/70 border border-slate-800">
        <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <text x={width / 2} y={height - 6} textAnchor="middle" fontSize={10} fill="#94a3b8">feature x</text>
        <text x={margin - 18} y={margin} textAnchor="start" fontSize={10} fill="#94a3b8">target y</text>
        {points.map((p, idx) => (
          <circle key={idx} cx={mapX(p.x)} cy={mapY(p.y)} r={2.2} fill="#38bdf8" opacity={0.9} />
        ))}
        <path d={linePath} fill="none" stroke="#22c55e" strokeWidth={1.5} />
      </svg>
      <p className="text-[11px] text-slate-400">
        Green line learned from blue data points by minimizing error. This is supervised learning: infer patterns from examples.
      </p>
    </div>
  );
};

const TrainingCurve: React.FC = () => {
  const width = 360;
  const height = 140;
  const margin = 22;
  const epochs = 30;

  const losses = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < epochs; i++) {
      const t = epochs > 1 ? i / (epochs - 1) : 0;
      arr.push(Math.exp(-3 * t) + 0.03 * Math.sin(8 * t) + 0.02);
    }
    return arr;
  }, []);

  const minLoss = Math.min(...losses, 0.01);
  const maxLoss = Math.max(...losses, 1.0);

  const path = losses
    .map((v, i) => {
      const t = epochs > 1 ? i / (epochs - 1) : 0;
      const x = margin + t * (width - 2 * margin);
      const y = height - margin - ((v - minLoss) / (maxLoss - minLoss || 1)) * (height - 2 * margin);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
      <h3 className="text-slate-50 text-sm font-semibold">Neural Network Training</h3>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto rounded-xl bg-slate-950/70 border border-slate-800">
        <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#475569" strokeWidth={1} />
        <text x={width / 2} y={height - 6} textAnchor="middle" fontSize={10} fill="#94a3b8">epoch</text>
        <text x={margin - 22} y={margin} textAnchor="start" fontSize={10} fill="#94a3b8">loss</text>
        <path d={path} fill="none" stroke="#f97316" strokeWidth={1.6} strokeLinecap="round" />
      </svg>
      <p className="text-[11px] text-slate-400">
        Gradient descent reduces loss over training epochs. Healthy curves decay smoothly. Divergence indicates learning issues.
      </p>
    </div>
  );
};

const MachineLearningAlgorithms: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800 pb-4">
        <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
          Machine Learning & Neural Algorithms
        </h1>
        <p className="text-slate-300 text-[13px] leading-relaxed">
          Machine learning shifts from hand-crafted rules to patterns learned from data. Instead of programming every
          behavior, we specify an objective and let optimization discover the right parameters. Historical data becomes
          a programmable asset.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-slate-50 text-sm font-semibold">Core Families</h3>
            <ul className="list-decimal ml-4 space-y-2 text-[12px] text-slate-300">
              <li><span className="font-semibold">Supervised Learning:</span> Learn from labeled examples - regression, classification (linear models, trees, neural networks)</li>
              <li><span className="font-semibold">Unsupervised Learning:</span> Discover structure without labels - clustering, dimensionality reduction, autoencoders</li>
              <li><span className="font-semibold">Reinforcement Learning:</span> Learn policies through trial and error, maximize long-term reward</li>
              <li><span className="font-semibold">Hybrid Models:</span> Physics-informed networks combine classical equations with learnable components</li>
            </ul>
          </article>

          <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-slate-50 text-sm font-semibold">Applications</h3>
            <ul className="list-disc ml-4 space-y-2 text-[12px] text-slate-300">
              <li><span className="font-semibold">Aircraft Analytics:</span> Map telemetry to health scores and failure predictions</li>
              <li><span className="font-semibold">Financial Markets:</span> Feature extraction for risk models and trading signals</li>
              <li><span className="font-semibold">Computer Vision:</span> Object detection, tracking, scene understanding</li>
              <li><span className="font-semibold">Natural Language:</span> Translation, summarization, question answering</li>
              <li><span className="font-semibold">Robotics:</span> Learn control policies robust to environmental variation</li>
            </ul>
          </article>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinearRegressionDemo />
          <TrainingCurve />
        </div>

        <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h3 className="text-slate-50 text-sm font-semibold">Relationship to Other Algorithm Families</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px] text-slate-300">
            <div>
              <p className="font-semibold text-sky-300 mb-1">ML + Chaos:</p>
              <p>ML approximates short-horizon dynamics in chaotic systems. Lyapunov analysis estimates forecast trust horizons.</p>
            </div>
            <div>
              <p className="font-semibold text-purple-300 mb-1">ML + Stochastic:</p>
              <p>Ensemble methods and Bayesian networks wrap ML with uncertainty quantification instead of point estimates.</p>
            </div>
            <div>
              <p className="font-semibold text-emerald-300 mb-1">ML + Deterministic:</p>
              <p>Deterministic algorithms provide scaffolding (feature extraction, optimization), ML learns mappings within that structure.</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300 mb-1">ML + Control:</p>
              <p>Reinforcement learning uses simulations (including chaotic regimes) to learn robust control policies.</p>
            </div>
          </div>
        </article>

        <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h3 className="text-slate-50 text-sm font-semibold">Key Insight</h3>
          <p className="text-[12px] text-slate-300">
            ML doesn't replace other algorithm families - it plugs into them. Deterministic methods provide guarantees,
            chaos tools flag fragile regimes, stochastic methods quantify uncertainty, and ML learns powerful mappings
            inside that combined framework.
          </p>
        </article>
      </section>
    </div>
  );
};

export default MachineLearningAlgorithms;
