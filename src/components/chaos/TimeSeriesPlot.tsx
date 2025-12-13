import React, { useMemo } from "react";
import { iterateLogisticMap } from "../../utils/chaosMath";

interface TimeSeriesProps {
  r: number;
}

const TimeSeriesPlot: React.FC<TimeSeriesProps> = ({ r }) => {
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
        {/* Axes */}
        <line
          x1={margin}
          y1={height - margin}
          x2={width - margin}
          y2={height - margin}
          stroke="#475569"
          strokeWidth={1}
        />
        <line
          x1={margin}
          y1={margin}
          x2={margin}
          y2={height - margin}
          stroke="#475569"
          strokeWidth={1}
        />

        {/* Labels */}
        <text
          x={width / 2}
          y={height - 8}
          textAnchor="middle"
          fontSize={10}
          fill="#94a3b8"
        >
          step n
        </text>
        <text
          x={margin - 18}
          y={margin - 8}
          textAnchor="start"
          fontSize={10}
          fill="#94a3b8"
        >
          xₙ
        </text>

        {/* Trajectory */}
        {pathData && (
          <path
            d={pathData}
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <p className="text-[11px] text-slate-400 leading-snug">
        This plot shows the numerical evolution of xₙ as the map is iterated. For smaller values of
        r the trajectory collapses to a single horizontal level (a stable equilibrium). As r
        increases, the orbit begins to alternate between several levels (periodic behavior) and
        eventually becomes irregular and aperiodic in the chaotic regime.
      </p>
    </div>
  );
};

export default TimeSeriesPlot;
