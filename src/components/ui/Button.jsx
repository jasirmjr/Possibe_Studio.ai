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

  // Variant styling matching the luxury dark aesthetic
  const variantClasses = {
    // Electric orange to warm amber gradient with ambient back-glow
    primary:
      'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:from-orange-500 hover:to-amber-500 border border-orange-400/40',
    
    // Subtle frosted glass with thin zinc boundary
    secondary:
      'bg-zinc-900/70 hover:bg-zinc-800/80 text-zinc-200 hover:text-white border border-zinc-700/60 hover:border-orange-500/40 backdrop-blur-md shadow-md',
    
    // Electric cyan neon glowing pill
    glow:
      'bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-400/50 hover:brightness-110 border border-orange-300/50',
    
    // High-conversion emerald accent
    emerald:
      'bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50 border border-emerald-300/40',
    
    // Minimal transparent button with glowing hover
    ghost:
      'bg-transparent hover:bg-zinc-800/50 text-zinc-400 hover:text-white border border-transparent hover:border-zinc-700/40',

    // Sharp outline
    outline:
      'bg-transparent border border-zinc-800 hover:border-orange-500/80 text-zinc-300 hover:text-white hover:bg-orange-950/20',
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
