import React from 'react';
import { motion } from 'framer-motion';

/**
 * High-end customizable button component with luxury dark theme neon aesthetics
 * Supports smooth framer-motion scaling, subtle light sweep highlights, and icon adornments.
 */
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'glow' | 'emerald' | 'ghost' | 'outline'
  size = 'md',         // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconRight: IconRight,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  // Size classes
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-full gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold tracking-wide rounded-full gap-2',
    lg: 'px-7 py-3.5 text-base font-semibold tracking-wider rounded-full gap-2.5',
  };

  // Variant styling matching the luxury orange & white aesthetic
  const variantClasses = {
    // Electric orange to warm amber gradient with ambient back-glow
    primary:
      'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:from-orange-600 hover:to-amber-600 border border-orange-400/40',
    
    // Subtle frosted white glass with thin boundary
    secondary:
      'bg-white hover:bg-zinc-50 text-zinc-800 hover:text-orange-600 border border-zinc-200/90 hover:border-orange-500/40 shadow-sm backdrop-blur-md',
    
    // Electric orange glowing pill
    glow:
      'bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:brightness-105 border border-orange-300/50',
    
    // High-conversion emerald accent
    emerald:
      'bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50 border border-emerald-300/40',
    
    // Minimal transparent button with glowing hover
    ghost:
      'bg-transparent hover:bg-orange-50/60 text-zinc-600 hover:text-orange-600 border border-transparent hover:border-orange-200',

    // Sharp outline
    outline:
      'bg-transparent border border-zinc-300 hover:border-orange-500 text-zinc-700 hover:text-orange-600 hover:bg-orange-50/40',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.025 }}
      whileTap={{ scale: disabled ? 1 : 0.975 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Subtle sheen highlight sweep */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-shimmer pointer-events-none" />

      {Icon && <Icon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
      {IconRight && <IconRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />}
    </motion.button>
  );
}
