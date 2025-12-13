import React, { useState } from "react";
import ChaosAlgorithms from "./topics/ChaosAlgorithms";
import DeterministicAlgorithms from "./topics/DeterministicAlgorithms";
import StochasticAlgorithms from "./topics/StochasticAlgorithms";
import MachineLearningAlgorithms from "./topics/MachineLearningAlgorithms";
import EvolutionaryAlgorithms from "./topics/EvolutionaryAlgorithms";
import GraphAlgorithms from "./topics/GraphAlgorithms";
import CryptographicAlgorithms from "./topics/CryptographicAlgorithms";
import SymbolicAlgorithms from "./topics/SymbolicAlgorithms";
import SimulationAlgorithms from "./topics/SimulationAlgorithms";
import { ParticleBackground } from "./components/FuturisticUI";

export type TopicId =
  | "chaos"
  | "deterministic"
  | "stochastic"
  | "ml"
  | "evolutionary"
  | "graph"
  | "crypto"
  | "symbolic"
  | "simulation";

const topics: { id: TopicId; label: string; short: string; description: string }[] = [
  { 
    id: "chaos", 
    label: "Chaos & Nonlinear Dynamics", 
    short: "Chaos",
    description: "Explore deterministic systems with sensitive dependence on initial conditions"
  },
  { 
    id: "deterministic", 
    label: "Deterministic / Classical", 
    short: "Deterministic",
    description: "Fixed, reproducible algorithms for sorting, routing, and optimization"
  },
  { 
    id: "stochastic", 
    label: "Stochastic / Probabilistic", 
    short: "Stochastic",
    description: "Random processes and Monte Carlo methods for modeling uncertainty"
  },
  { 
    id: "ml", 
    label: "Machine Learning & Neural", 
    short: "ML / Neural",
    description: "Data-driven learning algorithms and neural network architectures"
  },
  { 
    id: "evolutionary", 
    label: "Evolutionary & Swarm", 
    short: "Evolutionary",
    description: "Nature-inspired optimization through evolution and collective behavior"
  },
  { 
    id: "graph", 
    label: "Graph & Network", 
    short: "Graph / Network",
    description: "Algorithms for analyzing connections, flows, and network structures"
  },
  { 
    id: "crypto", 
    label: "Cryptographic", 
    short: "Crypto",
    description: "Security algorithms for encryption, hashing, and authentication"
  },
  { 
    id: "symbolic", 
    label: "Symbolic / Knowledge-Based", 
    short: "Symbolic",
    description: "Logic-based reasoning and symbolic manipulation systems"
  },
  { 
    id: "simulation", 
    label: "Simulation & Agent-Based", 
    short: "Simulation",
    description: "Modeling complex systems through agent interactions and simulations"
  },
];

const TopicContent: React.FC<{ active: TopicId }> = ({ active }) => {
  switch (active) {
    case "chaos":
      return <ChaosAlgorithms />;
    case "deterministic":
      return <DeterministicAlgorithms />;
    case "stochastic":
      return <StochasticAlgorithms />;
    case "ml":
      return <MachineLearningAlgorithms />;
    case "evolutionary":
      return <EvolutionaryAlgorithms />;
    case "graph":
      return <GraphAlgorithms />;
    case "crypto":
      return <CryptographicAlgorithms />;
    case "symbolic":
      return <SymbolicAlgorithms />;
    case "simulation":
      return <SimulationAlgorithms />;
    default:
      const topic = topics.find(t => t.id === active);
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-3xl w-full relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse-glow"></div>
            <div className="relative bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-sky-400/50 flex items-center justify-center animate-float">
                  <span className="text-2xl">🚧</span>
                </div>
                <div>
                  <h1 className="text-slate-50 text-xl font-semibold tracking-tight bg-gradient-to-r from-sky-300 to-purple-300 bg-clip-text text-transparent">
                    {topic?.label || "Coming Soon"}
                  </h1>
                  <p className="text-slate-400 text-sm">Under Construction</p>
                </div>
              </div>
              <p className="text-slate-300 text-[13px] leading-relaxed">
                {topic?.description || "This section is being developed."}
              </p>
              <p className="text-slate-400 text-[12px] leading-relaxed">
                Explore the completed topics: <strong className="text-sky-300">Chaos</strong>, <strong className="text-emerald-300">Deterministic</strong>, 
                <strong className="text-purple-300"> Stochastic</strong>, <strong className="text-amber-300">Machine Learning</strong>,
                <strong className="text-pink-300"> Evolutionary</strong>, <strong className="text-cyan-300">Graph</strong>, and 
                <strong className="text-violet-300"> Cryptographic</strong> algorithms with interactive visualizers.
              </p>
            </div>
          </div>
        </div>
      );
  }
};

function App() {
  const [activeTopic, setActiveTopic] = useState<TopicId>("chaos");
  const activeMeta = topics.find(t => t.id === activeTopic);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Gradient overlay effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-6 space-y-4" style={{ zIndex: 2 }}>
        {/* Global header */}
        <header className="space-y-3 border-b border-slate-800/50 pb-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg animate-float">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition"></div>
              <span className="relative">🧠</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-sky-300 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-animated">
                  Algorithm Atlas
                </span>
              </h1>
              <p className="text-slate-400 text-xs tracking-wide">
                <span className="inline-block">⚡</span> Interactive Visual Guide to Computational Methods
              </p>
            </div>
          </div>
          <p className="text-slate-300 text-[12px] md:text-[13px] max-w-3xl leading-relaxed">
            Explore different families of algorithms through <span className="text-sky-400 font-semibold">interactive visualizations</span>. 
            Each category explains core concepts, shows working code, and demonstrates real-world applications.
          </p>
        </header>

        {/* Tab strip */}
        <nav className="flex flex-wrap gap-2 pb-2">
          {topics.map((topic) => {
            const active = topic.id === activeTopic;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                title={topic.description}
                className={[
                  "px-3 py-1.5 rounded-full text-[11px] md:text-[12px] border transition-all duration-200 font-medium",
                  active
                    ? "bg-sky-500/20 border-sky-400/80 text-sky-200 shadow-lg shadow-sky-500/20 scale-105"
                    : "bg-slate-900/70 border-slate-700 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600 hover:scale-105"
                ].join(" ")}
              >
                {topic.short}
              </button>
            );
          })}
        </nav>

        {/* Active topic description */}
        {activeMeta && (
          <div className="text-[11px] text-slate-400 italic px-2">
            {activeMeta.description}
          </div>
        )}

        {/* Active topic content */}
        <main className="pt-2">
          <TopicContent active={activeTopic} />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-4 mt-8 text-center text-[11px] text-slate-500">
          <p>
            Algorithm Atlas · Open Source Educational Project ·{" "}
            <a
              href="https://github.com/swolem12/Algorithm-Visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
