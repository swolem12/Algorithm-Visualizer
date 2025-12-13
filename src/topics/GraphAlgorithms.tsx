import React, { useState, useEffect, useMemo, useRef } from "react";
import { GlowCard, CodeBlock, StatBadge } from "../components/FuturisticUI";

// Dijkstra's Algorithm Visualization
const DijkstraViz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const width = 450;
  const height = 300;

  // Graph nodes
  const nodes = useMemo(() => [
    { id: 'A', x: 50, y: 150 },
    { id: 'B', x: 150, y: 80 },
    { id: 'C', x: 150, y: 220 },
    { id: 'D', x: 300, y: 80 },
    { id: 'E', x: 300, y: 220 },
    { id: 'F', x: 400, y: 150 },
  ], []);

  const edges = useMemo(() => [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'C', to: 'E', weight: 3 },
    { from: 'B', to: 'C', weight: 1 },
    { from: 'D', to: 'F', weight: 3 },
    { from: 'E', to: 'F', weight: 2 },
    { from: 'D', to: 'E', weight: 1 },
  ], []);

  // Dijkstra's algorithm steps
  const visited = useMemo(() => {
    const maxSteps = Math.min(step, nodes.length);
    return new Set(['A', 'C', 'B', 'E', 'D', 'F'].slice(0, maxSteps));
  }, [step, nodes.length]);

  const activeEdges = useMemo(() => {
    const active: string[] = [];
    if (step >= 1) active.push('A-C');
    if (step >= 2) active.push('C-B');
    if (step >= 3) active.push('C-E');
    if (step >= 4) active.push('B-D');
    if (step >= 5) active.push('D-F');
    return active;
  }, [step]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setStep((s) => (s >= nodes.length ? 0 : s + 1));
    }, 800);
    return () => clearInterval(interval);
  }, [isRunning, nodes.length]);

  const getNodeByID = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <GlowCard className="p-4 space-y-3" glowColor="sky">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">Dijkstra's Shortest Path</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3 py-1 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/50 rounded-lg text-sky-300 text-xs transition-all"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => setStep(0)}
            className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <StatBadge label="Step" value={`${step}/${nodes.length}`} color="sky" />
        <StatBadge label="Visited" value={visited.size} color="emerald" />
      </div>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800"
      >
        {/* Draw edges */}
        {edges.map((edge, i) => {
          const from = getNodeByID(edge.from);
          const to = getNodeByID(edge.to);
          const edgeKey = `${edge.from}-${edge.to}`;
          const isActive = activeEdges.includes(edgeKey) || activeEdges.includes(`${edge.to}-${edge.from}`);

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? "#0ea5e9" : "#475569"}
                strokeWidth={isActive ? 3 : 1.5}
                opacity={isActive ? 1 : 0.5}
                className={isActive ? "animate-pulse-glow" : ""}
              />
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2 - 8}
                fontSize={11}
                fill="#94a3b8"
                textAnchor="middle"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node) => {
          const isVisited = visited.has(node.id);
          const isStart = node.id === 'A';
          const isEnd = node.id === 'F';

          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill={
                  isStart ? "#10b981" :
                  isEnd ? "#a78bfa" :
                  isVisited ? "#0ea5e9" : "#1e293b"
                }
                stroke={isVisited ? "#38bdf8" : "#475569"}
                strokeWidth={2}
                className={isVisited ? "animate-pulse" : ""}
              />
              <text
                x={node.x}
                y={node.y + 4}
                fontSize={14}
                fontWeight="bold"
                fill="white"
                textAnchor="middle"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="text-[11px] text-slate-400 leading-snug">
        Dijkstra's algorithm finds the shortest path from node A (green) to F (purple). It greedily selects
        the unvisited node with minimum distance, explores neighbors, and updates distances.
      </p>
    </GlowCard>
  );
};

// Graph Connectivity Visualization
const GraphConnectivityViz: React.FC = () => {
  const width = 400;
  const height = 300;

  const nodes = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 50 + (i % 4) * 100,
      y: 50 + Math.floor(i / 4) * 100,
    })),
    []
  );

  const edges = useMemo(() => [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6],
    [3, 7], [7, 11], [8, 9], [9, 10],
  ], []);

  return (
    <GlowCard className="p-4 space-y-3" glowColor="purple">
      <h3 className="text-slate-50 text-sm font-semibold">Graph Connectivity & Components</h3>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800"
      >
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="#8b5cf6"
            strokeWidth={1.5}
            opacity={0.6}
          />
        ))}

        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={8}
            fill={node.id < 8 ? "#a78bfa" : "#ec4899"}
            opacity={0.8}
          />
        ))}
      </svg>

      <div className="grid grid-cols-2 gap-2">
        <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="text-[10px] text-purple-400">Component 1</div>
          <div className="text-sm font-bold text-purple-300">8 nodes</div>
        </div>
        <div className="px-3 py-2 bg-pink-500/10 border border-pink-500/30 rounded-lg">
          <div className="text-[10px] text-pink-400">Component 2</div>
          <div className="text-sm font-bold text-pink-300">4 nodes (disconnected)</div>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        Graph shows two connected components. DFS or BFS can identify these clusters, useful for
        network analysis, social graphs, and finding isolated subgraphs.
      </p>
    </GlowCard>
  );
};

// A* Pathfinding Visualization
const AStarViz: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 450;
  const height = 300;
  const gridSize = 15;
  const cellSize = width / gridSize;

  // Grid: 0 = empty, 1 = wall, 2 = start, 3 = goal
  const grid = useMemo(() => [
    [2,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,1,0,1,1,1,0,0,1,0,0],
    [0,0,1,0,0,1,0,0,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,0,1,0,0,0,1,0,0],
    [0,0,1,1,1,1,1,0,1,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,0,0,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  ], []);

  const start = { x: 0, y: 0 };
  const goal = { x: 14, y: 9 };

  const heuristic = (a: {x: number, y: number}, b: {x: number, y: number}) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  };

  const [explored, setExplored] = useState<Set<string>>(new Set());
  const [path, setPath] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    if (!isRunning) return;

    let animeLib: any = null;

    // Load anime.js
    import('animejs').then((module: any) => {
      animeLib = module.default || module;
    });

    // A* algorithm
    const openSet = [{...start, g: 0, f: heuristic(start, goal)}];
    const cameFrom = new Map<string, {x: number, y: number}>();
    const gScore = new Map<string, number>();
    gScore.set(`${start.x},${start.y}`, 0);
    const exploredSet = new Set<string>();

    const animateStep = () => {
      if (openSet.length === 0) {
        setIsRunning(false);
        return;
      }

      // Get node with lowest f score
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift()!;
      const currentKey = `${current.x},${current.y}`;

      if (current.x === goal.x && current.y === goal.y) {
        // Reconstruct path
        const finalPath: {x: number, y: number}[] = [];
        let temp = current;
        while (temp) {
          finalPath.unshift({x: temp.x, y: temp.y});
          const prev = cameFrom.get(`${temp.x},${temp.y}`);
          if (!prev) break;
          temp = prev as any;
        }
        setPath(finalPath);
        
        // Animate path with anime.js
        if (animeLib) {
          animeLib({
            targets: '.path-segment',
            strokeDashoffset: [animeLib.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: animeLib.stagger(100)
          });
        }
        
        setIsRunning(false);
        return;
      }

      exploredSet.add(currentKey);
      setExplored(new Set(exploredSet));

      // Animate current cell
      if (animeLib) {
        animeLib({
          targets: `#cell-${current.x}-${current.y}`,
          scale: [1, 1.2, 1],
          duration: 300,
          easing: 'easeOutElastic(1, .5)'
        });
      }

      // Check neighbors
      const neighbors = [
        {x: current.x + 1, y: current.y},
        {x: current.x - 1, y: current.y},
        {x: current.x, y: current.y + 1},
        {x: current.x, y: current.y - 1},
      ];

      for (const neighbor of neighbors) {
        if (neighbor.x < 0 || neighbor.x >= gridSize || 
            neighbor.y < 0 || neighbor.y >= grid.length ||
            grid[neighbor.y][neighbor.x] === 1) {
          continue;
        }

        const neighborKey = `${neighbor.x},${neighbor.y}`;
        const tentativeG = gScore.get(currentKey)! + 1;

        if (!gScore.has(neighborKey) || tentativeG < gScore.get(neighborKey)!) {
          cameFrom.set(neighborKey, {x: current.x, y: current.y});
          gScore.set(neighborKey, tentativeG);
          const f = tentativeG + heuristic(neighbor, goal);
          
          if (!openSet.find(n => n.x === neighbor.x && n.y === neighbor.y)) {
            openSet.push({...neighbor, g: tentativeG, f});
          }
        }
      }

      setTimeout(animateStep, 50);
    };

    animateStep();
  }, [isRunning, grid, goal]);

  const handleReset = () => {
    setIsRunning(false);
    setExplored(new Set());
    setPath([]);
  };

  return (
    <GlowCard className="p-4 space-y-3" glowColor="emerald">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-50 text-sm font-semibold">A* Pathfinding (Heuristic Search)</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning || path.length > 0}
            className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs transition-all disabled:opacity-50"
          >
            Start
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-xs transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <StatBadge label="Explored" value={explored.size} color="emerald" />
        <StatBadge label="Path Length" value={path.length} color="emerald" />
      </div>

      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800"
      >
        {/* Draw grid */}
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const isExplored = explored.has(`${x},${y}`);
            const isPath = path.some(p => p.x === x && p.y === y);
            const isStart = x === start.x && y === start.y;
            const isGoal = x === goal.x && y === goal.y;

            let fill = '#0f172a';
            if (cell === 1) fill = '#1e293b';
            if (isExplored && !isPath) fill = '#0ea5e920';
            if (isPath) fill = '#10b981';
            if (isStart) fill = '#0ea5e9';
            if (isGoal) fill = '#a78bfa';

            return (
              <rect
                key={`${x}-${y}`}
                id={`cell-${x}-${y}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill={fill}
                stroke="#334155"
                strokeWidth={0.5}
              />
            );
          })
        )}

        {/* Draw path */}
        {path.length > 1 && path.map((p, i) => {
          if (i === 0) return null;
          const prev = path[i - 1];
          return (
            <line
              key={`path-${i}`}
              className="path-segment"
              x1={prev.x * cellSize + cellSize / 2}
              y1={prev.y * cellSize + cellSize / 2}
              x2={p.x * cellSize + cellSize / 2}
              y2={p.y * cellSize + cellSize / 2}
              stroke="#fbbf24"
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div className="flex gap-3 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-sky-500 rounded"></div>
          <span className="text-slate-400">Start</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span className="text-slate-400">Goal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
          <span className="text-slate-400">Path</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-slate-800 rounded"></div>
          <span className="text-slate-400">Wall</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        A* uses heuristics (Manhattan distance) to guide search toward the goal. It explores fewer
        nodes than Dijkstra while guaranteeing the optimal path.
      </p>
    </GlowCard>
  );
};

const GraphAlgorithms: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🕸️</span>
          <div>
            <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-sky-300 to-purple-300 bg-clip-text text-transparent">
                Graph & Network Algorithms
              </span>
            </h1>
            <p className="text-slate-400 text-sm">Exploring Connections and Pathways</p>
          </div>
        </div>
        <p className="text-slate-300 text-[13px] leading-relaxed max-w-4xl">
          Graph algorithms analyze relationships, find optimal paths, detect communities, and model networks.
          From social networks to internet routing, graphs represent the connections that structure our world.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DijkstraViz />
          <GraphConnectivityViz />
        </div>

        <AStarViz />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlowCard className="p-4 space-y-3" glowColor="sky">
            <h3 className="text-slate-50 text-sm font-semibold">Core Algorithm Families</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400">▸</span>
                <div><strong>Shortest Path:</strong> Dijkstra, A*, Bellman-Ford, Floyd-Warshall</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <div><strong>Traversal:</strong> DFS (depth-first), BFS (breadth-first)</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">▸</span>
                <div><strong>Spanning Trees:</strong> Kruskal's, Prim's algorithms for MST</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">▸</span>
                <div><strong>Network Flow:</strong> Max-flow min-cut, Ford-Fulkerson</div>
              </li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-3" glowColor="purple">
            <h3 className="text-slate-50 text-sm font-semibold">Applications</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✦</span>
                <div><strong>Navigation:</strong> GPS routing, flight paths, delivery optimization</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400">✦</span>
                <div><strong>Social Networks:</strong> Friend recommendations, influence analysis</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✦</span>
                <div><strong>Network Design:</strong> Infrastructure planning, circuit design</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">✦</span>
                <div><strong>Web Crawling:</strong> PageRank, link analysis, SEO</div>
              </li>
            </ul>
          </GlowCard>
        </div>

        <GlowCard className="p-4 space-y-3" glowColor="sky">
          <h3 className="text-slate-50 text-sm font-semibold">Dijkstra's Algorithm Implementation</h3>
          <CodeBlock language="typescript">
{`function dijkstra(graph: Graph, start: Node): Map<Node, number> {
  const distances = new Map<Node, number>();
  const visited = new Set<Node>();
  const pq = new PriorityQueue<Node>();
  
  distances.set(start, 0);
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (visited.has(current)) continue;
    visited.add(current);
    
    for (const neighbor of graph.neighbors(current)) {
      const newDist = distances.get(current)! + graph.weight(current, neighbor);
      
      if (!distances.has(neighbor) || newDist < distances.get(neighbor)!) {
        distances.set(neighbor, newDist);
        pq.enqueue(neighbor, newDist);
      }
    }
  }
  
  return distances;
}`}</CodeBlock>
        </GlowCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlowCard className="p-4 space-y-2" glowColor="sky">
            <h3 className="text-sky-300 text-sm font-semibold">Graph Representations</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Adjacency Matrix:</strong> O(1) edge lookup, O(V²) space</li>
              <li>• <strong>Adjacency List:</strong> O(V+E) space, efficient for sparse graphs</li>
              <li>• <strong>Edge List:</strong> Simple, good for algorithms like Kruskal's</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="purple">
            <h3 className="text-purple-300 text-sm font-semibold">Complexity Classes</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Dijkstra:</strong> O((V+E) log V) with heap</li>
              <li>• <strong>BFS/DFS:</strong> O(V + E) time</li>
              <li>• <strong>Floyd-Warshall:</strong> O(V³) all-pairs</li>
              <li>• <strong>Bellman-Ford:</strong> O(VE), handles negatives</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="emerald">
            <h3 className="text-emerald-300 text-sm font-semibold">Advanced Topics</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Centrality Measures:</strong> Betweenness, closeness, PageRank</li>
              <li>• <strong>Community Detection:</strong> Modularity, Louvain</li>
              <li>• <strong>Graph Neural Networks:</strong> Learning on graphs</li>
            </ul>
          </GlowCard>
        </div>
      </section>
    </div>
  );
};

export default GraphAlgorithms;
