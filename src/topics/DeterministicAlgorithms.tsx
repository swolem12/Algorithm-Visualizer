import React from "react";

const DeterministicAlgorithms: React.FC = () => {
  const unsorted = [7, 3, 9, 1, 5, 2];
  const sorted = [...unsorted].sort((a, b) => a - b);

  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800 pb-4">
        <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
          Deterministic / Classical Algorithms
        </h1>
        <p className="text-slate-300 text-[13px] leading-relaxed">
          Deterministic algorithms are the "clockwork" of computing. Given the same input, they always produce the
          same output, step for step. No randomness - any uncertainty comes from incomplete knowledge of inputs, not
          from the algorithm itself.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-slate-50 text-sm font-semibold">Core Families</h3>
            <ul className="list-decimal ml-4 space-y-2 text-[12px] text-slate-300">
              <li><span className="font-semibold">Sorting & Searching:</span> QuickSort, MergeSort, Binary Search - impose order and answer queries efficiently</li>
              <li><span className="font-semibold">Graph Algorithms:</span> Dijkstra, A*, Bellman-Ford - compute shortest paths and network flows</li>
              <li><span className="font-semibold">Optimization:</span> Linear programming, greedy algorithms - allocate limited resources optimally</li>
              <li><span className="font-semibold">Numerical Methods:</span> Newton's method, Runge-Kutta - stable approximations of continuous systems</li>
            </ul>
          </article>

          <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-slate-50 text-sm font-semibold">Sorting Example</h3>
            <pre className="text-[10px] bg-slate-950/80 border border-slate-800 rounded p-2 overflow-x-auto">
              <code>{`const data = [7, 3, 9, 1, 5, 2];
const sorted = data.sort((a, b) => a - b);
// Always: [1, 2, 3, 5, 7, 9]`}</code>
            </pre>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Input:</span>
                <div className="flex gap-1">
                  {unsorted.map((v, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 rounded">{v}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">Output:</span>
                <div className="flex gap-1">
                  {sorted.map((v, i) => (
                    <span key={i} className="px-2 py-1 bg-emerald-900/50 border border-emerald-600 rounded">{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        <article className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h3 className="text-slate-50 text-sm font-semibold">When to Use Deterministic Algorithms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px] text-slate-300">
            <div>
              <p className="font-semibold text-sky-300 mb-1">✓ Best for:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Predictable, repeatable results required</li>
                <li>Debugging and verification critical</li>
                <li>Baseline implementations before optimization</li>
                <li>Mission-critical systems (routing, scheduling)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-amber-300 mb-1">⚠ Consider alternatives when:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Uncertainty is inherent in the problem</li>
                <li>Adversarial scenarios need unpredictability</li>
                <li>System dynamics are nonlinear or chaotic</li>
                <li>Probabilistic guarantees are sufficient</li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default DeterministicAlgorithms;
