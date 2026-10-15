import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * GlassCard - Luxury frosted glass surface component with neon hover glow
 * and optional dynamic cursor spotlight tracking.
 */
export default function GlassCard({
  children,
  className = '',
  glowColor = 'orange', // 'orange' | 'amber' | 'cyan' | 'purple' | 'emerald' | 'none'
  spotlight = true,
  hoverLift = true,
  onClick,
  ...props
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!spotlight) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowStyles = {
    orange: {
      border: 'hover:border-orange-500/60',
      light: 'rgba(249, 115, 22, 0.16)',
      pill: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    },
    amber: {
      border: 'hover:border-amber-500/60',
      light: 'rgba(245, 158, 11, 0.16)',
      pill: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    },
    purple: {
      border: 'hover:border-orange-500/50',
      light: 'rgba(249, 115, 22, 0.14)',
      pill: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    },
    cyan: {
      border: 'hover:border-cyan-500/50',
      light: 'rgba(6, 182, 212, 0.12)',
      pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    },
    emerald: {
      border: 'hover:border-emerald-500/50',
      light: 'rgba(16, 185, 129, 0.12)',
      pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    },
    none: {
      border: 'hover:border-zinc-700',
      light: 'transparent',
      pill: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    },
  };

  const currentGlow = glowStyles[glowColor] || glowStyles.orange;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={hoverLift ? { y: -4, transition: { duration: 0.25 } } : {}}
      className={`relative rounded-2xl bg-zinc-950/60 backdrop-blur-xl border border-zinc-800/80 p-6 transition-all duration-300 overflow-hidden shadow-xl ${currentGlow.border} ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {spotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${currentGlow.light}, transparent 60%)`,
          }}
        />
      )}

      {/* Ambient Top Edge Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
