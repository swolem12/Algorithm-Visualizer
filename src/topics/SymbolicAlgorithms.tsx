import React, { useState, useEffect } from "react";
import { GlowCard, CodeBlock, StatBadge } from "../components/FuturisticUI";

// Expert System Rules Visualization
const ExpertSystemViz: React.FC = () => {
  const [symptoms, setSymptoms] = useState<Set<string>>(new Set());
  
  const availableSymptoms = [
    "Fever", "Cough", "Fatigue", "Headache", "Sore Throat", "Runny Nose"
  ];

  const rules = [
    { 
      id: 1, 
      conditions: ["Fever", "Cough", "Fatigue"], 
      conclusion: "Possible Flu",
      confidence: 0.85 
    },
    { 
      id: 2, 
      conditions: ["Runny Nose", "Sore Throat", "Cough"], 
      conclusion: "Possible Cold",
      confidence: 0.75 
    },
    { 
      id: 3, 
      conditions: ["Headache", "Fatigue"], 
      conclusion: "Possible Stress",
      confidence: 0.60 
    },
  ];

  const activeRules = rules.filter(rule => 
    rule.conditions.every(cond => symptoms.has(cond))
  );

  const toggleSymptom = (symptom: string) => {
    const newSymptoms = new Set(symptoms);
    if (newSymptoms.has(symptom)) {
      newSymptoms.delete(symptom);
    } else {
      newSymptoms.add(symptom);
    }
    setSymptoms(newSymptoms);
  };

  return (
    <GlowCard className="p-4 space-y-3" glowColor="purple">
      <h3 className="text-slate-50 text-sm font-semibold">Expert System (Rule-Based Reasoning)</h3>

      <div className="space-y-2">
        <label className="text-[11px] text-slate-400">Select Symptoms (Knowledge Base)</label>
        <div className="grid grid-cols-2 gap-2">
          {availableSymptoms.map(symptom => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`px-3 py-2 rounded-lg text-[11px] font-medium transition-all ${
                symptoms.has(symptom)
                  ? "bg-purple-500/30 border-2 border-purple-500 text-purple-200"
                  : "bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-600"
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <StatBadge label="Symptoms" value={symptoms.size} color="purple" />
        <StatBadge label="Rules Fired" value={activeRules.length} color="purple" />
      </div>

      {activeRules.length > 0 ? (
        <div className="space-y-2">
          <div className="text-[11px] text-purple-400 font-semibold">Inferences:</div>
          {activeRules.map(rule => (
            <div 
              key={rule.id}
              className="p-3 bg-purple-500/10 border border-purple-500/40 rounded-lg animate-fade-in-up"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-purple-200">
                  {rule.conclusion}
                </span>
                <span className="text-[10px] text-purple-400">
                  Confidence: {(rule.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                IF {rule.conditions.join(" AND ")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg text-[11px] text-slate-400 text-center">
          No rules triggered. Select symptoms to activate inference rules.
        </div>
      )}

      <p className="text-[11px] text-slate-400 leading-snug">
        Expert systems encode domain knowledge as IF-THEN rules. The inference engine
        matches facts to rules and derives conclusions, mimicking human expert reasoning.
      </p>
    </GlowCard>
  );
};

// Propositional Logic Visualization
const PropositionalLogicViz: React.FC = () => {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);

  const operators = [
    { name: "P ∧ Q (AND)", result: p && q, color: "sky" },
    { name: "P ∨ Q (OR)", result: p || q, color: "emerald" },
    { name: "P → Q (IMPLIES)", result: !p || q, color: "amber" },
    { name: "¬P (NOT)", result: !p, color: "purple" },
    { name: "P ⊕ Q (XOR)", result: p !== q, color: "pink" },
  ];

  return (
    <GlowCard className="p-4 space-y-3" glowColor="sky">
      <h3 className="text-slate-50 text-sm font-semibold">Propositional Logic Operators</h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-[11px] text-slate-400">Proposition P</label>
          <button
            onClick={() => setP(!p)}
            className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${
              p
                ? "bg-emerald-500/30 border-2 border-emerald-500 text-emerald-200"
                : "bg-slate-800/50 border border-slate-700 text-slate-400"
            }`}
          >
            {p ? "TRUE" : "FALSE"}
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] text-slate-400">Proposition Q</label>
          <button
            onClick={() => setQ(!q)}
            className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${
              q
                ? "bg-emerald-500/30 border-2 border-emerald-500 text-emerald-200"
                : "bg-slate-800/50 border border-slate-700 text-slate-400"
            }`}
          >
            {q ? "TRUE" : "FALSE"}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        {operators.map((op, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-3 py-2 rounded-lg border ${
              op.result
                ? `bg-${op.color}-500/10 border-${op.color}-500/40`
                : "bg-slate-800/30 border-slate-700/50"
            }`}
          >
            <span className={`text-[11px] font-mono ${
              op.result ? `text-${op.color}-300` : "text-slate-500"
            }`}>
              {op.name}
            </span>
            <span className={`text-xs font-bold ${
              op.result ? `text-${op.color}-200` : "text-slate-600"
            }`}>
              {op.result ? "TRUE" : "FALSE"}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        Propositional logic manipulates truth values using logical operators. Foundation of
        theorem provers, SAT solvers, and automated reasoning systems.
      </p>
    </GlowCard>
  );
};

// Knowledge Graph Visualization
const KnowledgeGraphViz: React.FC = () => {
  const width = 450;
  const height = 300;

  const nodes = [
    { id: "Albert", x: 100, y: 150, type: "Person" },
    { id: "Physics", x: 250, y: 80, type: "Field" },
    { id: "Relativity", x: 400, y: 80, type: "Theory" },
    { id: "Nobel", x: 250, y: 220, type: "Award" },
    { id: "1921", x: 400, y: 220, type: "Year" },
  ];

  const edges = [
    { from: "Albert", to: "Physics", label: "studies" },
    { from: "Albert", to: "Relativity", label: "developed" },
    { from: "Albert", to: "Nobel", label: "received" },
    { from: "Relativity", to: "Physics", label: "part_of" },
    { from: "Nobel", to: "1921", label: "in_year" },
  ];

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <GlowCard className="p-4 space-y-3" glowColor="emerald">
      <h3 className="text-slate-50 text-sm font-semibold">Knowledge Graph (Semantic Network)</h3>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto rounded-lg bg-slate-950/70 border border-slate-800"
      >
        {/* Draw edges */}
        {edges.map((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#10b981"
                strokeWidth={1.5}
                opacity={0.6}
                markerEnd="url(#arrowhead)"
              />
              <text
                x={midX}
                y={midY - 5}
                fontSize={9}
                fill="#6ee7b7"
                textAnchor="middle"
              >
                {edge.label}
              </text>
            </g>
          );
        })}

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#10b981" opacity={0.6} />
          </marker>
        </defs>

        {/* Draw nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={25}
              fill="#065f46"
              stroke="#10b981"
              strokeWidth={2}
            />
            <text
              x={node.x}
              y={node.y - 5}
              fontSize={11}
              fontWeight="bold"
              fill="#d1fae5"
              textAnchor="middle"
            >
              {node.id}
            </text>
            <text
              x={node.x}
              y={node.y + 8}
              fontSize={8}
              fill="#6ee7b7"
              textAnchor="middle"
            >
              {node.type}
            </text>
          </g>
        ))}
      </svg>

      <p className="text-[11px] text-slate-400 leading-snug">
        Knowledge graphs represent entities and relationships as nodes and edges. Used by Google,
        semantic web (RDF), and AI for structured knowledge representation and reasoning.
      </p>
    </GlowCard>
  );
};

// Automated Theorem Prover
const TheoremProverViz: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: "Goal", content: "Prove: (P → Q) ∧ P ⊢ Q" },
    { title: "Modus Ponens", content: "From P → Q and P, derive Q" },
    { title: "Assumption 1", content: "Given: P → Q (if P then Q)" },
    { title: "Assumption 2", content: "Given: P is true" },
    { title: "Conclusion", content: "Therefore: Q is true ✓" },
  ];

  return (
    <GlowCard className="p-4 space-y-3" glowColor="amber">
      <h3 className="text-slate-50 text-sm font-semibold">Automated Theorem Proving</h3>

      <div className="space-y-2">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg border transition-all ${
              step === i
                ? "bg-amber-500/10 border-amber-500/50 scale-105"
                : step > i
                ? "bg-emerald-500/5 border-emerald-500/30"
                : "bg-slate-800/30 border-slate-700/50"
            }`}
          >
            <div className={`text-[10px] font-semibold mb-1 ${
              step === i ? "text-amber-300" : step > i ? "text-emerald-400" : "text-slate-500"
            }`}>
              {s.title}
            </div>
            <div className={`text-[11px] font-mono ${
              step === i ? "text-amber-100" : step > i ? "text-emerald-200" : "text-slate-600"
            }`}>
              {s.content}
            </div>
          </div>
        ))}
      </div>

      <StatBadge label="Proof Step" value={`${step + 1}/5`} color="amber" />

      <p className="text-[11px] text-slate-400 leading-snug">
        Theorem provers use logical inference rules to mechanically verify mathematical proofs.
        Used in software verification (Coq, Isabelle) and hardware validation.
      </p>
    </GlowCard>
  );
};

const SymbolicAlgorithms: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🧠</span>
          <div>
            <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-purple-300 to-sky-300 bg-clip-text text-transparent">
                Symbolic & Knowledge-Based Algorithms
              </span>
            </h1>
            <p className="text-slate-400 text-sm">Logic, Reasoning, and Symbolic Manipulation</p>
          </div>
        </div>
        <p className="text-slate-300 text-[13px] leading-relaxed max-w-4xl">
          Symbolic AI uses explicit knowledge representation and logical reasoning to solve problems.
          Unlike neural networks, these systems manipulate symbols, apply rules, and perform deductive
          inference, offering transparency and explainability in decision-making.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ExpertSystemViz />
          <PropositionalLogicViz />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <KnowledgeGraphViz />
          <TheoremProverViz />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlowCard className="p-4 space-y-3" glowColor="purple">
            <h3 className="text-slate-50 text-sm font-semibold">Symbolic Reasoning Methods</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <div><strong>Rule-Based Systems:</strong> IF-THEN production rules, forward/backward chaining</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400">▸</span>
                <div><strong>Logic Programming:</strong> Prolog, constraint satisfaction, unification</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">▸</span>
                <div><strong>Ontologies:</strong> OWL, RDF, semantic web technologies</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">▸</span>
                <div><strong>Planning:</strong> STRIPS, PDDL, goal-driven problem solving</div>
              </li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-3" glowColor="sky">
            <h3 className="text-slate-50 text-sm font-semibold">Applications</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400">✦</span>
                <div><strong>Medical Diagnosis:</strong> MYCIN, expert systems for healthcare</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✦</span>
                <div><strong>Formal Verification:</strong> Software and hardware correctness proofs</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✦</span>
                <div><strong>Natural Language:</strong> Semantic parsing, question answering</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">✦</span>
                <div><strong>Robotics Planning:</strong> Task planning, motion planning</div>
              </li>
            </ul>
          </GlowCard>
        </div>

        <GlowCard className="p-4 space-y-3" glowColor="emerald">
          <h3 className="text-slate-50 text-sm font-semibold">Prolog Logic Programming</h3>
          <CodeBlock language="prolog">
{`% Facts: parent relationships
parent(tom, bob).
parent(tom, liz).
parent(bob, ann).
parent(bob, pat).
parent(pat, jim).

% Rule: grandparent relationship
grandparent(X, Y) :- parent(X, Z), parent(Z, Y).

% Rule: sibling relationship
sibling(X, Y) :- parent(Z, X), parent(Z, Y), X \\= Y.

% Query: Who are Tom's grandchildren?
?- grandparent(tom, X).
% Results: X = ann, X = pat

% Query: Are Bob and Liz siblings?
?- sibling(bob, liz).
% Result: true`}</CodeBlock>
        </GlowCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlowCard className="p-4 space-y-2" glowColor="purple">
            <h3 className="text-purple-300 text-sm font-semibold">Strengths</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Explainable:</strong> Transparent reasoning chains</li>
              <li>• <strong>Guaranteed:</strong> Logical soundness and completeness</li>
              <li>• <strong>Precise:</strong> Exact symbolic manipulation</li>
              <li>• <strong>Composable:</strong> Modular rules and knowledge bases</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="amber">
            <h3 className="text-amber-300 text-sm font-semibold">Limitations</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Brittleness:</strong> Struggles with uncertainty and noise</li>
              <li>• <strong>Knowledge Bottleneck:</strong> Requires manual encoding</li>
              <li>• <strong>Scalability:</strong> Large knowledge bases can be slow</li>
              <li>• <strong>Common Sense:</strong> Difficult to encode implicit knowledge</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="sky">
            <h3 className="text-sky-300 text-sm font-semibold">Hybrid Approaches</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Neuro-Symbolic:</strong> Combine neural nets with logic</li>
              <li>• <strong>Probabilistic Logic:</strong> Markov logic networks</li>
              <li>• <strong>Inductive Logic:</strong> Learn rules from data</li>
              <li>• <strong>Neural Theorem Provers:</strong> ML for formal math</li>
            </ul>
          </GlowCard>
        </div>
      </section>
    </div>
  );
};

export default SymbolicAlgorithms;
