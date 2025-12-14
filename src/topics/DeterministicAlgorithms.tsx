import React, { useState } from "react";
import { GlowCard, StatBadge } from "../components/FuturisticUI";
// @ts-ignore
const anime = require('animejs').default || require('animejs');

// Bubble Sort Visualization
const BubbleSortViz: React.FC = () => {
  const [array, setArray] = useState([7, 3, 9, 1, 5, 2, 8, 4, 6]);
  const [sorting, setSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);

  const bubbleSort = async () => {
    setSorting(true);
    setComparisons(0);
    setSwaps(0);
    const arr = [...array];
    
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setCurrentIndices([j, j + 1]);
        setComparisons(c => c + 1);
        
        // Highlight comparison with anime.js
        await anime({
          targets: [`.bar-${j}`, `.bar-${j + 1}`],
          scale: [1, 1.1, 1],
          duration: 300,
          easing: 'easeInOutQuad'
        }).finished;
        
        if (arr[j] > arr[j + 1]) {
          // Swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSwaps(s => s + 1);
          setArray([...arr]);
          
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    setCurrentIndices([]);
    setSorting(false);
    
    // Victory animation
    anime({
      targets: '.bar',
      scale: [1, 1.2, 1],
      delay: anime.stagger(100),
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    });
  };

  const reset = () => {
    setArray([7, 3, 9, 1, 5, 2, 8, 4, 6]);
    setComparisons(0);
    setSwaps(0);
    setCurrentIndices([]);
  };

  const maxVal = Math.max(...array);

  return (
    <GlowCard className="p-4 space-y-3" glowColor="sky">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Bubble Sort (Animated)</h3>
        <div className="flex gap-2">
          <button
            onClick={bubbleSort}
            disabled={sorting}
            className="px-3 py-1 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/50 rounded-lg text-sky-300 text-xs transition-all disabled:opacity-50"
          >
            {sorting ? "Sorting..." : "Start"}
          </button>
          <button
            onClick={reset}
            disabled={sorting}
            className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs transition-all disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <StatBadge label="Comparisons" value={comparisons} color="sky" />
        <StatBadge label="Swaps" value={swaps} color="purple" />
      </div>

      <div className="flex items-end justify-center gap-1 h-32 bg-slate-950/70 rounded-lg p-4 border border-slate-800">
        {array.map((val, idx) => (
          <div
            key={idx}
            className={`bar bar-${idx} flex-1 bg-sky-500 rounded-t transition-all`}
            style={{
              height: `${(val / maxVal) * 100}%`,
              backgroundColor: currentIndices.includes(idx) ? '#22c55e' : '#0ea5e9',
              opacity: 0.8
            }}
          />
        ))}
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        Bubble sort repeatedly compares adjacent elements and swaps them if out of order. 
        Time complexity: O(n²). Inefficient but simple and deterministic.
      </p>
    </GlowCard>
  );
};

// Binary Search Visualization
const BinarySearchViz: React.FC = () => {
  const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
  const [target, setTarget] = useState(13);
  const [searching, setSearching] = useState(false);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(-1);
  const [steps, setSteps] = useState(0);

  const binarySearch = async () => {
    setSearching(true);
    setFound(-1);
    setSteps(0);
    
    let l = 0;
    let r = sortedArray.length - 1;
    let stepCount = 0;
    
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      setLeft(l);
      setRight(r);
      setMid(m);
      setSteps(++stepCount);
      
      // Animate search bounds
      anime({
        targets: `.search-cell-${m}`,
        scale: [1, 1.3, 1],
        backgroundColor: ['#0ea5e9', '#22c55e', '#0ea5e9'],
        duration: 600,
        easing: 'easeInOutQuad'
      });
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (sortedArray[m] === target) {
        setFound(m);
        // Victory animation
        anime({
          targets: `.search-cell-${m}`,
          scale: [1, 1.5, 1.2],
          backgroundColor: '#22c55e',
          duration: 800,
          easing: 'easeOutElastic(1, .5)'
        });
        break;
      } else if (sortedArray[m] < target) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
    
    setSearching(false);
    setLeft(-1);
    setRight(-1);
    setMid(-1);
  };

  return (
    <GlowCard className="p-4 space-y-3" glowColor="purple">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Binary Search (Animated)</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            disabled={searching}
            className="w-16 px-2 py-1 bg-slate-900 border border-purple-500/30 rounded text-purple-300 text-xs text-center"
          />
          <button
            onClick={binarySearch}
            disabled={searching}
            className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-purple-300 text-xs transition-all disabled:opacity-50"
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <StatBadge label="Target" value={target} color="purple" />
        <StatBadge label="Steps" value={steps} color="sky" />
        {found >= 0 && <StatBadge label="Found at" value={found} color="emerald" />}
      </div>

      <div className="flex gap-1 justify-center bg-slate-950/70 rounded-lg p-3 border border-slate-800">
        {sortedArray.map((val, idx) => {
          let bgColor = '#1e293b';
          if (idx === found) bgColor = '#22c55e';
          else if (idx === mid) bgColor = '#0ea5e9';
          else if (idx >= left && idx <= right && left >= 0) bgColor = '#475569';
          
          return (
            <div
              key={idx}
              className={`search-cell-${idx} px-2 py-1.5 rounded text-xs font-semibold text-center transition-all`}
              style={{ backgroundColor: bgColor, color: '#fff', minWidth: '28px' }}
            >
              {val}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        Binary search divides sorted array in half each step. Time complexity: O(log n). 
        Much faster than linear search for large datasets.
      </p>
    </GlowCard>
  );
};

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BubbleSortViz />
          <BinarySearchViz />
        </div>

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
