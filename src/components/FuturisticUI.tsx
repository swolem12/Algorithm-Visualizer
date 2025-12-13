import React, { useRef, useEffect } from 'react';
import { useParticleEffect } from '../utils/particleEffect';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleEffect(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
};

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'sky' 
}) => {
  const colorMap = {
    sky: 'shadow-sky-500/20 hover:shadow-sky-400/40 border-sky-500/30',
    purple: 'shadow-purple-500/20 hover:shadow-purple-400/40 border-purple-500/30',
    emerald: 'shadow-emerald-500/20 hover:shadow-emerald-400/40 border-emerald-500/30',
    amber: 'shadow-amber-500/20 hover:shadow-amber-400/40 border-amber-500/30',
  };

  return (
    <div
      className={`
        bg-slate-900/80 backdrop-blur-sm border rounded-xl
        shadow-lg transition-all duration-300
        hover:scale-[1.01] hover:shadow-2xl
        ${colorMap[glowColor as keyof typeof colorMap] || colorMap.sky}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ children, className = '' }) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={titleRef}
      className={`opacity-0 ${className}`}
    >
      {children}
    </div>
  );
};

export const CodeBlock: React.FC<{ children: React.ReactNode; language?: string }> = ({ 
  children, 
  language = 'typescript' 
}) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative">
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 rounded-t-lg">
          <span className="text-[10px] text-sky-400 font-mono">{language}</span>
          <button className="text-[10px] text-slate-400 hover:text-sky-400 transition-colors">
            copy
          </button>
        </div>
        <pre className="p-3 bg-slate-950/90 rounded-b-lg overflow-x-auto border border-t-0 border-slate-800">
          <code className="text-[11px] font-mono text-slate-200">{children}</code>
        </pre>
      </div>
    </div>
  );
};

export const StatBadge: React.FC<{ label: string; value: string | number; color?: string }> = ({
  label,
  value,
  color = 'sky',
}) => {
  const colorMap = {
    sky: 'from-sky-500/20 to-cyan-500/20 border-sky-500/30 text-sky-300',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300',
    emerald: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-300',
    amber: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300',
  };

  return (
    <div
      className={`
        px-3 py-2 rounded-lg border backdrop-blur-sm
        bg-gradient-to-br transition-all duration-300
        hover:scale-105 hover:shadow-lg
        ${colorMap[color as keyof typeof colorMap] || colorMap.sky}
      `}
    >
      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
};
