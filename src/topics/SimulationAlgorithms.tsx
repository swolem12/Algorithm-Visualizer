import React, { useState, useEffect, useMemo, useRef } from "react";
import { GlowCard, CodeBlock, StatBadge } from "../components/FuturisticUI";
// @ts-ignore
const anime = require('animejs').default || require('animejs');

// Fire Particle System
const FireParticlesViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const particlesRef = useRef<{x: number, y: number, vx: number, vy: number, life: number, maxLife: number}[]>([]);
  const frameRef = useRef<number>();
  
  useEffect(() => {
    if (!running) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
      ctx.fillRect(0, 0, width, height);
      
      // Spawn new particles
      if (Math.random() < 0.3) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push({
            x: width / 2 + (Math.random() - 0.5) * 60,
            y: height - 10,
            vx: (Math.random() - 0.5) * 2,
            vy: -2 - Math.random() * 3,
            life: 60,
            maxLife: 60
          });
        }
      }
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // Gravity
        p.life--;
        
        if (p.life <= 0) return false;
        
        const alpha = p.life / p.maxLife;
        const size = 3 + (1 - alpha) * 4;
        
        // Color gradient: yellow -> orange -> red
        const hue = 60 * alpha; // 60 = yellow, 0 = red
        ctx.fillStyle = `hsla(${hue}, 100%, ${50 + alpha * 30}%, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        return true;
      });
      
      setParticleCount(particlesRef.current.length);
      frameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [running]);
  
  const toggle = () => {
    if (!running) {
      particlesRef.current = [];
    }
    setRunning(!running);
  };
  
  return (
    <GlowCard className="p-4 space-y-3" glowColor="orange">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Fire Particle System</h3>
        <div className="flex gap-2">
          <button
            onClick={toggle}
            className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-lg text-orange-300 text-xs transition-all"
          >
            {running ? "Stop" : "Start"}
          </button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <StatBadge label="Particles" value={particleCount} color="orange" />
        <StatBadge label="Status" value={running ? "Active" : "Idle"} color={running ? "emerald" : "slate"} />
      </div>
      
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="rounded-lg border border-slate-800 bg-slate-950"
        />
      </div>
      
      <p className="text-[11px] text-slate-400 leading-snug">
        Real-time particle system simulates fire using spawning, physics (velocity, gravity), and lifecycle management.
        Each particle fades from yellow to red as it ages.
      </p>
    </GlowCard>
  );
};

// Wave Interference Simulation
const WaveInterferenceViz: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const [running, setRunning] = useState(false);
  
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setFrame(f => f + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [running]);
  
  const width = 400;
  const height = 300;
  const source1 = { x: 120, y: 150 };
  const source2 = { x: 280, y: 150 };
  
  // Sample grid for interference pattern
  const gridSize = 40;
  const cells = useMemo(() => {
    const result: {x: number, y: number, intensity: number}[] = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i / gridSize) * width;
        const y = (j / gridSize) * height;
        
        const d1 = Math.sqrt((x - source1.x) ** 2 + (y - source1.y) ** 2);
        const d2 = Math.sqrt((x - source2.x) ** 2 + (y - source2.y) ** 2);
        
        const wavelength = 30;
        const wave1 = Math.sin((d1 / wavelength) * 2 * Math.PI - frame * 0.2);
        const wave2 = Math.sin((d2 / wavelength) * 2 * Math.PI - frame * 0.2);
        
        const intensity = (wave1 + wave2) / 2;
        result.push({ x, y, intensity });
      }
    }
    return result;
  }, [frame]);
  
  return (
    <GlowCard className="p-4 space-y-3" glowColor="cyan">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Wave Interference Simulation</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setRunning(!running)}
            className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg text-cyan-300 text-xs transition-all"
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => setFrame(0)}
            className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs transition-all"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <StatBadge label="Frame" value={frame} color="cyan" />
        <StatBadge label="Sources" value={2} color="purple" />
      </div>
      
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800"
      >
        {/* Interference pattern */}
        {cells.map((cell, i) => {
          const color = cell.intensity > 0 
            ? `rgba(34, 211, 238, ${cell.intensity * 0.4})`
            : `rgba(147, 51, 234, ${-cell.intensity * 0.4})`;
          return (
            <rect
              key={i}
              x={cell.x}
              y={cell.y}
              width={width / gridSize}
              height={height / gridSize}
              fill={color}
            />
          );
        })}
        
        {/* Wave sources */}
        <circle cx={source1.x} cy={source1.y} r={8} fill="#22d3ee" opacity={0.8} className="animate-pulse" />
        <circle cx={source2.x} cy={source2.y} r={8} fill="#22d3ee" opacity={0.8} className="animate-pulse" />
      </svg>
      
      <p className="text-[11px] text-slate-400 leading-snug">
        Two wave sources create interference patterns - constructive (cyan) where waves align, destructive (purple) where they cancel.
        Demonstrates superposition principle from wave physics.
      </p>
    </GlowCard>
  );
};

// Conway's Game of Life
const GameOfLifeViz: React.FC = () => {
  const gridSize = 30;
  const cellSize = 12;
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [grid, setGrid] = useState<boolean[][]>(() =>
    Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => Math.random() < 0.25)
    )
  );

  const countNeighbors = (grid: boolean[][], row: number, col: number): number => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = (row + i + gridSize) % gridSize;
        const newCol = (col + j + gridSize) % gridSize;
        if (grid[newRow][newCol]) count++;
      }
    }
    return count;
  };

  const computeNextGeneration = (currentGrid: boolean[][]): boolean[][] => {
    return currentGrid.map((row, i) =>
      row.map((cell, j) => {
        const neighbors = countNeighbors(currentGrid, i, j);
        if (cell) {
          return neighbors === 2 || neighbors === 3;
        } else {
          return neighbors === 3;
        }
      })
    );
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setGrid((g) => computeNextGeneration(g));
      setGeneration((gen) => gen + 1);
    }, 150);
    return () => clearInterval(interval);
  }, [isRunning]);

  const liveCells = useMemo(
    () => grid.flat().filter((cell) => cell).length,
    [grid]
  );

  const resetGrid = () => {
    setGrid(
      Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => Math.random() < 0.25)
      )
    );
    setGeneration(0);
  };

  return (
    <GlowCard className="p-4 space-y-3" glowColor="emerald">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Conway's Game of Life</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs transition-all"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetGrid}
            className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <StatBadge label="Generation" value={generation} color="emerald" />
        <StatBadge label="Live Cells" value={liveCells} color="emerald" />
      </div>

      <div className="flex justify-center p-2 bg-slate-950/70 rounded-lg border border-slate-800">
        <svg
          width={gridSize * cellSize}
          height={gridSize * cellSize}
          className="rounded"
        >
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <rect
                key={`${i}-${j}`}
                x={j * cellSize}
                y={i * cellSize}
                width={cellSize}
                height={cellSize}
                fill={cell ? "#10b981" : "#0f172a"}
                stroke="#1e293b"
                strokeWidth={0.5}
                className={cell ? "animate-pulse-glow" : ""}
              />
            ))
          )}
        </svg>
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        Cellular automaton where cells live or die based on neighbors. Simple rules produce
        complex emergent patterns: gliders, oscillators, and stable structures.
      </p>
    </GlowCard>
  );
};

// Flocking / Boids Simulation
const FlockingViz: React.FC = () => {
  const width = 450;
  const height = 300;
  const numBoids = 30;

  interface Boid {
    x: number;
    y: number;
    vx: number;
    vy: number;
  }

  const [boids, setBoids] = useState<Boid[]>(() =>
    Array.from({ length: numBoids }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }))
  );

  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setBoids((currentBoids) => {
        return currentBoids.map((boid, i) => {
          let avgVx = 0,
            avgVy = 0,
            avgX = 0,
            avgY = 0,
            separationX = 0,
            separationY = 0;
          let neighbors = 0;

          // Calculate flocking forces
          currentBoids.forEach((other, j) => {
            if (i === j) return;
            const dx = other.x - boid.x;
            const dy = other.y - boid.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 50) {
              // Alignment
              avgVx += other.vx;
              avgVy += other.vy;

              // Cohesion
              avgX += other.x;
              avgY += other.y;

              // Separation
              if (dist < 20) {
                separationX -= dx / dist;
                separationY -= dy / dist;
              }

              neighbors++;
            }
          });

          let newVx = boid.vx;
          let newVy = boid.vy;

          if (neighbors > 0) {
            avgVx /= neighbors;
            avgVy /= neighbors;
            avgX /= neighbors;
            avgY /= neighbors;

            // Apply forces (weighted)
            newVx += (avgVx - boid.vx) * 0.02; // Alignment
            newVy += (avgVy - boid.vy) * 0.02;
            newVx += (avgX - boid.x) * 0.0005; // Cohesion
            newVy += (avgY - boid.y) * 0.0005;
            newVx += separationX * 0.05; // Separation
            newVy += separationY * 0.05;
          }

          // Limit speed
          const speed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (speed > 2) {
            newVx = (newVx / speed) * 2;
            newVy = (newVy / speed) * 2;
          }

          // Update position with wrapping
          let newX = boid.x + newVx;
          let newY = boid.y + newVy;

          if (newX < 0) newX = width;
          if (newX > width) newX = 0;
          if (newY < 0) newY = height;
          if (newY > height) newY = 0;

          return { x: newX, y: newY, vx: newVx, vy: newVy };
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning, width, height]);

  return (
    <GlowCard className="p-4 space-y-3" glowColor="sky">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Flocking Simulation (Boids)</h3>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-3 py-1 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/50 rounded-lg text-sky-300 text-xs transition-all"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
      </div>

      <StatBadge label="Agents" value={numBoids} color="sky" />

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800"
      >
        {boids.map((boid, i) => {
          const angle = Math.atan2(boid.vy, boid.vx);
          const triangleSize = 6;
          const x1 = boid.x + Math.cos(angle) * triangleSize;
          const y1 = boid.y + Math.sin(angle) * triangleSize;
          const x2 =
            boid.x + Math.cos(angle + (2.5 * Math.PI) / 3) * triangleSize;
          const y2 =
            boid.y + Math.sin(angle + (2.5 * Math.PI) / 3) * triangleSize;
          const x3 =
            boid.x + Math.cos(angle - (2.5 * Math.PI) / 3) * triangleSize;
          const y3 =
            boid.y + Math.sin(angle - (2.5 * Math.PI) / 3) * triangleSize;

          return (
            <polygon
              key={i}
              points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
              fill="#0ea5e9"
              opacity={0.8}
            />
          );
        })}
      </svg>

      <div className="grid grid-cols-3 gap-2 text-[10px]">
        <div className="px-2 py-1.5 bg-sky-500/10 border border-sky-500/30 rounded">
          <div className="text-sky-400">Separation</div>
          <div className="text-slate-400">Avoid crowding</div>
        </div>
        <div className="px-2 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded">
          <div className="text-emerald-400">Alignment</div>
          <div className="text-slate-400">Match velocity</div>
        </div>
        <div className="px-2 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded">
          <div className="text-purple-400">Cohesion</div>
          <div className="text-slate-400">Move to center</div>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        Boids demonstrate emergent flocking behavior from three simple rules: separation, alignment,
        and cohesion. Used in animation, robotics swarms, and crowd simulation.
      </p>
    </GlowCard>
  );
};

// Predator-Prey Simulation
const PredatorPreyViz: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const width = 400;
  const height = 200;

  // Lotka-Volterra equations
  const alpha = 0.1; // prey birth rate
  const beta = 0.02; // predation rate
  const delta = 0.01; // predator efficiency
  const gamma = 0.1; // predator death rate

  const [prey, setPrey] = useState(40);
  const [predators, setPredators] = useState(9);
  const [history, setHistory] = useState<{ t: number; prey: number; pred: number }[]>([
    { t: 0, prey: 40, pred: 9 },
  ]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setPrey((x) => {
        setPredators((y) => {
          const dt = 0.1;
          const dx = x * (alpha - beta * y) * dt;
          const dy = y * (-gamma + delta * x) * dt;

          const newX = Math.max(1, x + dx);
          const newY = Math.max(1, y + dy);

          setTime((t) => t + 1);
          setHistory((h) => {
            const newHistory = [...h, { t: h.length, prey: newX, pred: newY }];
            return newHistory.slice(-100); // Keep last 100 points
          });

          return newY;
        });
        return Math.max(1, prey + prey * (alpha - beta * predators) * 0.1);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, prey, predators, alpha, beta, delta, gamma]);

  const maxPrey = Math.max(...history.map((h) => h.prey), 100);
  const maxPred = Math.max(...history.map((h) => h.pred), 50);

  return (
    <GlowCard className="p-4 space-y-3" glowColor="amber">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Predator-Prey Dynamics</h3>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 rounded-lg text-amber-300 text-xs transition-all"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
      </div>

      <div className="flex gap-2">
        <StatBadge label="Prey" value={Math.round(prey)} color="emerald" />
        <StatBadge label="Predators" value={Math.round(predators)} color="amber" />
        <StatBadge label="Time" value={time} color="sky" />
      </div>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800"
      >
        {/* Grid */}
        <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="#1e293b" strokeWidth={1} />
        <line x1={width / 2} y1={0} x2={width / 2} y2={height} stroke="#1e293b" strokeWidth={1} />

        {/* Prey line */}
        <polyline
          points={history
            .map((h) => {
              const x = (h.t / 100) * width;
              const y = height - (h.prey / maxPrey) * height;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#10b981"
          strokeWidth={2}
        />

        {/* Predator line */}
        <polyline
          points={history
            .map((h) => {
              const x = (h.t / 100) * width;
              const y = height - (h.pred / maxPred) * height;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={2}
        />
      </svg>

      <div className="flex gap-2 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1 bg-emerald-500 rounded"></div>
          <span className="text-slate-400">Prey Population</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1 bg-amber-500 rounded"></div>
          <span className="text-slate-400">Predator Population</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        Lotka-Volterra model shows oscillating populations. As prey increases, predators thrive and
        grow, then overconsumption crashes prey, leading to predator decline and the cycle repeats.
      </p>
    </GlowCard>
  );
};

const SimulationAlgorithms: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🌊</span>
          <div>
            <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
                Simulation & Agent-Based Algorithms
              </span>
            </h1>
            <p className="text-slate-400 text-sm">Modeling Complex Systems and Emergent Behavior</p>
          </div>
        </div>
        <p className="text-slate-300 text-[13px] leading-relaxed max-w-4xl">
          Agent-based models (ABMs) simulate autonomous agents following simple rules to study emergent
          phenomena. From cellular automata to multi-agent systems, these algorithms reveal how local
          interactions produce complex global patterns in nature, society, and computation.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FireParticlesViz />
          <WaveInterferenceViz />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GameOfLifeViz />
          <FlockingViz />
        </div>

        <PredatorPreyViz />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlowCard className="p-4 space-y-3" glowColor="emerald">
            <h3 className="text-slate-50 text-sm font-semibold">Simulation Types</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">▸</span>
                <div><strong>Cellular Automata:</strong> Grid-based, local rules (Game of Life, traffic)</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400">▸</span>
                <div><strong>Multi-Agent:</strong> Autonomous agents with goals, communication</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <div><strong>Particle Systems:</strong> Physics-based (fluids, fire, explosions)</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">▸</span>
                <div><strong>Network Models:</strong> Epidemic spread, information diffusion</div>
              </li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-3" glowColor="sky">
            <h3 className="text-slate-50 text-sm font-semibold">Applications</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400">✦</span>
                <div><strong>Ecology:</strong> Population dynamics, ecosystem modeling</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✦</span>
                <div><strong>Economics:</strong> Market behavior, agent-based trading</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✦</span>
                <div><strong>Urban Planning:</strong> Traffic flow, pedestrian dynamics</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">✦</span>
                <div><strong>Epidemiology:</strong> Disease spread (SIR, SEIR models)</div>
              </li>
            </ul>
          </GlowCard>
        </div>

        <GlowCard className="p-4 space-y-3" glowColor="purple">
          <h3 className="text-slate-50 text-sm font-semibold">Agent-Based Model Implementation</h3>
          <CodeBlock language="typescript">
{`class Agent {
  position: Vector2D;
  velocity: Vector2D;
  
  constructor(x: number, y: number) {
    this.position = { x, y };
    this.velocity = { x: Math.random() - 0.5, y: Math.random() - 0.5 };
  }
  
  // Observe environment and neighbors
  perceive(neighbors: Agent[]): void {
    const nearby = neighbors.filter(n => 
      this.distanceTo(n) < this.perceptionRadius
    );
    
    this.applyFlockingRules(nearby);
    this.avoidObstacles();
  }
  
  // Update state based on rules
  update(dt: number): void {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.wrapBoundaries();
  }
  
  // Act in environment
  interact(environment: Environment): void {
    environment.recordTrace(this.position);
  }
}`}</CodeBlock>
        </GlowCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlowCard className="p-4 space-y-2" glowColor="emerald">
            <h3 className="text-emerald-300 text-sm font-semibold">Emergence</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Bottom-Up:</strong> Global patterns from local rules</li>
              <li>• <strong>Self-Organization:</strong> Order without central control</li>
              <li>• <strong>Phase Transitions:</strong> Critical points, tipping points</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="sky">
            <h3 className="text-sky-300 text-sm font-semibold">Design Patterns</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Sense-Decide-Act:</strong> Agent decision cycle</li>
              <li>• <strong>Stigmergy:</strong> Indirect communication via environment</li>
              <li>• <strong>Heterogeneity:</strong> Diverse agent types and strategies</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="amber">
            <h3 className="text-amber-300 text-sm font-semibold">Tools & Frameworks</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>NetLogo:</strong> Educational ABM platform</li>
              <li>• <strong>Mesa:</strong> Python agent-based modeling</li>
              <li>• <strong>MASON:</strong> Java multi-agent simulation</li>
            </ul>
          </GlowCard>
        </div>
      </section>
    </div>
  );
};

export default SimulationAlgorithms;
