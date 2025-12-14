import React, { useState, useEffect, useMemo } from "react";
import { GlowCard, CodeBlock, StatBadge } from "../components/FuturisticUI";
// @ts-ignore
const anime = require('animejs').default || require('animejs');

// Traveling Salesman Problem with Genetic Algorithm
const TSPGeneticViz: React.FC = () => {
  const cities = useMemo(() => {
    const count = 10;
    const pts: {x: number, y: number}[] = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: 20 + Math.random() * 160,
        y: 20 + Math.random() * 100
      });
    }
    return pts;
  }, []);
  
  const [bestRoute, setBestRoute] = useState<number[]>([...Array(cities.length).keys()]);
  const [bestDistance, setBestDistance] = useState(Infinity);
  const [generation, setGeneration] = useState(0);
  const [running, setRunning] = useState(false);
  
  const calcDistance = (route: number[]) => {
    let total = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const from = cities[route[i]];
      const to = cities[route[i + 1]];
      total += Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
    }
    // Return to start
    const last = cities[route[route.length - 1]];
    const first = cities[route[0]];
    total += Math.sqrt((first.x - last.x) ** 2 + (first.y - last.y) ** 2);
    return total;
  };
  
  const mutate = (route: number[]) => {
    const newRoute = [...route];
    const i = Math.floor(Math.random() * route.length);
    const j = Math.floor(Math.random() * route.length);
    [newRoute[i], newRoute[j]] = [newRoute[j], newRoute[i]];
    return newRoute;
  };
  
  const evolve = async () => {
    let current = bestRoute;
    let currentDist = bestDistance === Infinity ? calcDistance(current) : bestDistance;
    
    for (let gen = 0; gen < 30; gen++) {
      // Generate variations
      const candidates = [current];
      for (let i = 0; i < 20; i++) {
        candidates.push(mutate(current));
      }
      
      // Find best
      const sorted = candidates.map(r => ({ route: r, dist: calcDistance(r) }))
        .sort((a, b) => a.dist - b.dist);
      
      if (sorted[0].dist < currentDist) {
        current = sorted[0].route;
        currentDist = sorted[0].dist;
        setBestRoute(current);
        setBestDistance(currentDist);
        
        // Animate path improvement
        anime({
          targets: '.tsp-path',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 800,
          delay: 0
        });
      }
      
      setGeneration(gen + 1);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setRunning(false);
  };
  
  const runTSP = () => {
    setRunning(true);
    setGeneration(0);
    evolve();
  };
  
  const reset = () => {
    setBestRoute([...Array(cities.length).keys()]);
    setBestDistance(Infinity);
    setGeneration(0);
  };
  
  // Build path
  const pathData = useMemo(() => {
    const pts = bestRoute.map(i => cities[i]);
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      path += ` L ${pts[i].x} ${pts[i].y}`;
    }
    path += ` L ${pts[0].x} ${pts[0].y}`; // Close loop
    return path;
  }, [bestRoute, cities]);
  
  return (
    <GlowCard className="p-4 space-y-3" glowColor="pink">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">TSP - Genetic Algorithm</h3>
        <div className="flex gap-2">
          <button
            onClick={runTSP}
            disabled={running}
            className="px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 rounded-lg text-pink-300 text-xs transition-all disabled:opacity-50"
          >
            {running ? "Evolving..." : "Evolve"}
          </button>
          <button
            onClick={reset}
            disabled={running}
            className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs transition-all disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <StatBadge label="Generation" value={generation} color="pink" />
        <StatBadge label="Distance" value={bestDistance === Infinity ? "∞" : bestDistance.toFixed(1)} color="sky" />
        <StatBadge label="Cities" value={cities.length} color="purple" />
      </div>
      
      <svg
        width={400}
        height={280}
        viewBox="0 0 200 140"
        className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800"
      >
        {/* Path */}
        <path
          className="tsp-path"
          d={pathData}
          fill="none"
          stroke="#ec4899"
          strokeWidth={1}
          strokeDasharray="4 2"
          opacity={0.6}
        />
        
        {/* Cities */}
        {cities.map((city, i) => (
          <g key={i}>
            <circle
              cx={city.x}
              cy={city.y}
              r={3}
              fill="#ec4899"
              stroke="#fff"
              strokeWidth={0.5}
            />
            <text
              x={city.x}
              y={city.y - 6}
              fontSize={6}
              fill="#f9a8d4"
              textAnchor="middle"
              fontWeight="bold"
            >
              {i}
            </text>
          </g>
        ))}
        
        {/* Start marker */}
        <circle
          cx={cities[bestRoute[0]].x}
          cy={cities[bestRoute[0]].y}
          r={5}
          fill="none"
          stroke="#22c55e"
          strokeWidth={1}
          className="animate-pulse"
        />
      </svg>
      
      <p className="text-[11px] text-slate-400 leading-snug">
        Find shortest tour visiting all cities. Genetic algorithm evolves route permutations via mutation and selection.
        NP-hard problem - optimal solution intractable for large N.
      </p>
    </GlowCard>
  );
};

// Genetic Algorithm Simulation
const GeneticAlgorithmViz: React.FC = () => {
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState<number[][]>([]);
  const [bestFitness, setBestFitness] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const TARGET = "ALGORITHM";
  const POPULATION_SIZE = 20;
  const MUTATION_RATE = 0.1;

  const fitness = (individual: number[]) => {
    return individual.reduce((sum, gene, i) => {
      return sum + (gene === TARGET.charCodeAt(i) ? 1 : 0);
    }, 0);
  };

  const initPopulation = () => {
    const pop = Array.from({ length: POPULATION_SIZE }, () =>
      Array.from({ length: TARGET.length }, () =>
        Math.floor(Math.random() * 26) + 65
      )
    );
    setPopulation(pop);
    setGeneration(0);
    setBestFitness(0);
  };

  useEffect(() => {
    initPopulation();
  }, []);

  useEffect(() => {
    if (!isRunning || bestFitness >= TARGET.length) return;

    const timeout = setTimeout(() => {
      // Selection, crossover, mutation
      const sorted = [...population].sort((a, b) => fitness(b) - fitness(a));
      const newPop: number[][] = [];

      // Elitism: keep top 2
      newPop.push(sorted[0], sorted[1]);

      // Breed new individuals
      while (newPop.length < POPULATION_SIZE) {
        const parent1 = sorted[Math.floor(Math.random() * 10)];
        const parent2 = sorted[Math.floor(Math.random() * 10)];
        const crossPoint = Math.floor(Math.random() * TARGET.length);
        
        const child = [
          ...parent1.slice(0, crossPoint),
          ...parent2.slice(crossPoint),
        ].map((gene) =>
          Math.random() < MUTATION_RATE
            ? Math.floor(Math.random() * 26) + 65
            : gene
        );
        
        newPop.push(child);
      }

      setPopulation(newPop);
      setGeneration((g) => g + 1);
      setBestFitness(fitness(newPop[0]));
    }, 100);

    return () => clearTimeout(timeout);
  }, [isRunning, population, bestFitness]);

  const best = population.length > 0 ? population.sort((a, b) => fitness(b) - fitness(a))[0] : [];

  return (
    <GlowCard className="p-4 space-y-3" glowColor="emerald">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Genetic Algorithm - String Evolution</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs transition-all"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={initPopulation}
            className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <StatBadge label="Generation" value={generation} color="emerald" />
        <StatBadge label="Best Fitness" value={`${bestFitness}/${TARGET.length}`} color="sky" />
        <StatBadge label="Population" value={POPULATION_SIZE} color="purple" />
      </div>

      <div className="space-y-2">
        <div className="text-[11px] text-slate-400">Target:</div>
        <div className="font-mono text-lg text-emerald-300 tracking-wider px-3 py-2 bg-emerald-500/10 rounded border border-emerald-500/30">
          {TARGET}
        </div>
        
        <div className="text-[11px] text-slate-400 mt-3">Best Individual:</div>
        <div className="font-mono text-lg tracking-wider px-3 py-2 bg-sky-500/10 rounded border border-sky-500/30">
          {best.map((gene, i) => (
            <span
              key={i}
              className={gene === TARGET.charCodeAt(i) ? "text-emerald-300" : "text-sky-300"}
            >
              {String.fromCharCode(gene)}
            </span>
          ))}
        </div>
      </div>

      {bestFitness >= TARGET.length && (
        <div className="px-3 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs animate-pulse-glow">
          ✨ Solution found in {generation} generations!
        </div>
      )}

      <p className="text-[11px] text-slate-400 leading-snug">
        Watch evolution in action! The algorithm breeds the fittest individuals, applies crossover and mutation,
        and converges toward the target string. Green characters match the target.
      </p>
    </GlowCard>
  );
};

// Particle Swarm Optimization
const ParticleSwarmViz: React.FC = () => {
  const width = 400;
  const height = 300;
  const [frame, setFrame] = useState(0);

  const particles = useMemo(() => {
    const count = 20;
    return Array.from({ length: count }, (_, i) => ({
      x: 50 + Math.random() * (width - 100),
      y: 50 + Math.random() * (height - 100),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      angle: (i / count) * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => f + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Target (global best)
  const target = { x: width / 2, y: height / 2 };

  return (
    <GlowCard className="p-4 space-y-3" glowColor="purple">
      <h3 className="text-slate-50 text-sm font-semibold">Particle Swarm Optimization</h3>
      
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800"
      >
        {/* Target */}
        <circle
          cx={target.x}
          cy={target.y}
          r={8}
          fill="none"
          stroke="#a78bfa"
          strokeWidth={2}
          className="animate-pulse"
        />
        <circle cx={target.x} cy={target.y} r={3} fill="#a78bfa" opacity={0.8} />

        {/* Particles */}
        {particles.map((p, i) => {
          const dx = target.x - p.x;
          const dy = target.y - p.y;
          const t = frame / 100;
          
          const newX = p.x + Math.cos(p.angle + t) * 30 * Math.cos(t * 0.5) + dx * 0.02;
          const newY = p.y + Math.sin(p.angle + t) * 30 * Math.sin(t * 0.5) + dy * 0.02;

          return (
            <g key={i}>
              <line
                x1={p.x}
                y1={p.y}
                x2={newX}
                y2={newY}
                stroke="#8b5cf6"
                strokeWidth={0.5}
                opacity={0.3}
              />
              <circle
                cx={newX}
                cy={newY}
                r={3}
                fill="#a78bfa"
                opacity={0.8}
              />
            </g>
          );
        })}
      </svg>

      <p className="text-[11px] text-slate-400 leading-snug">
        Particles explore the search space, influenced by their personal best and the global best (purple target).
        The swarm intelligently converges toward optimal solutions through emergent collective behavior.
      </p>
    </GlowCard>
  );
};

const EvolutionaryAlgorithms: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🧬</span>
          <div>
            <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Evolutionary & Swarm Algorithms
              </span>
            </h1>
            <p className="text-slate-400 text-sm">Nature-Inspired Optimization</p>
          </div>
        </div>
        <p className="text-slate-300 text-[13px] leading-relaxed max-w-4xl">
          Evolutionary algorithms mimic biological evolution and swarm intelligence to solve complex optimization problems.
          Through selection, mutation, crossover, and collective behavior, these algorithms discover solutions that would
          be intractable for traditional methods.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TSPGeneticViz />
          <GeneticAlgorithmViz />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ParticleSwarmViz />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlowCard className="p-4 space-y-3" glowColor="emerald">
            <h3 className="text-slate-50 text-sm font-semibold">Core Concepts</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">▸</span>
                <div><strong>Genetic Algorithms:</strong> Encode solutions as chromosomes, evolve through selection and crossover</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400">▸</span>
                <div><strong>Particle Swarm:</strong> Particles explore space influenced by personal and global best positions</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <div><strong>Ant Colony:</strong> Pheromone trails guide collective pathfinding and optimization</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">▸</span>
                <div><strong>Differential Evolution:</strong> Mutation and recombination of population vectors</div>
              </li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-3" glowColor="sky">
            <h3 className="text-slate-50 text-sm font-semibold">Real-World Applications</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400">✦</span>
                <div><strong>Neural Architecture Search:</strong> Evolve optimal neural network structures</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✦</span>
                <div><strong>Route Optimization:</strong> Vehicle routing, delivery scheduling, logistics</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✦</span>
                <div><strong>Parameter Tuning:</strong> Hyperparameter optimization for ML models</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">✦</span>
                <div><strong>Game AI:</strong> Evolve behaviors, strategies, and decision trees</div>
              </li>
            </ul>
          </GlowCard>
        </div>

        <GlowCard className="p-4 space-y-3" glowColor="purple">
          <h3 className="text-slate-50 text-sm font-semibold">Implementation Example - Genetic Algorithm</h3>
          <CodeBlock language="typescript">
{`class GeneticAlgorithm {
  population: Individual[];
  
  evolve() {
    // 1. Selection: Choose fittest individuals
    const selected = this.selection();
    
    // 2. Crossover: Breed new generation
    const offspring = this.crossover(selected);
    
    // 3. Mutation: Introduce random changes
    const mutated = this.mutate(offspring);
    
    // 4. Replacement: Form new population
    this.population = this.replace(mutated);
  }
  
  selection(): Individual[] {
    // Tournament or roulette wheel selection
    return this.population
      .sort((a, b) => b.fitness - a.fitness)
      .slice(0, this.population.length / 2);
  }
}`}</CodeBlock>
        </GlowCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlowCard className="p-4 space-y-2" glowColor="emerald">
            <h3 className="text-emerald-300 text-sm font-semibold">✓ Strengths</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• Handles complex, non-linear problems</li>
              <li>• No gradient information needed</li>
              <li>• Explores global search space</li>
              <li>• Parallelizable by nature</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="amber">
            <h3 className="text-amber-300 text-sm font-semibold">⚠ Trade-offs</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• Computationally expensive</li>
              <li>• No convergence guarantees</li>
              <li>• Many hyperparameters to tune</li>
              <li>• Can get stuck in local optima</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="sky">
            <h3 className="text-sky-300 text-sm font-semibold">⚡ Best For</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• Black-box optimization</li>
              <li>• Multi-objective problems</li>
              <li>• Discrete search spaces</li>
              <li>• When global search needed</li>
            </ul>
          </GlowCard>
        </div>
      </section>
    </div>
  );
};

export default EvolutionaryAlgorithms;
