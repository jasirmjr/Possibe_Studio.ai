import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Bot, Zap } from 'lucide-react';
import Button from '../ui/Button';

// Cyberpunk glyph characters for decryption scramble
const GLYPH_CHARS = '01#$*+<>~=/XYZ!∆§Ω¥¢%@0101';

// 6 Horizontal Slices for Physical Breaking Apart & Joining Back of Robot Image (Orange Theme)
const IMAGE_SLICES = [
  { id: 1, top: 0, bottom: 18, glitchX: -55, glitchY: -4, rotate: -2, border: 'border-b border-orange-400/50' },
  { id: 2, top: 18, bottom: 35, glitchX: 65, glitchY: 5, rotate: 2.5, border: 'border-b border-amber-500/50' },
  { id: 3, top: 35, bottom: 52, glitchX: -75, glitchY: 3, rotate: -3, border: 'border-b border-orange-500/60' },
  { id: 4, top: 52, bottom: 68, glitchX: 58, glitchY: -6, rotate: 2, border: 'border-b border-amber-400/50' },
  { id: 5, top: 68, bottom: 84, glitchX: -48, glitchY: 5, rotate: -1.5, border: 'border-b border-orange-400/40' },
  { id: 6, top: 84, bottom: 100, glitchX: 42, glitchY: -3, rotate: 1, border: '' },
];

// Helper hook for text scramble during glitch
function useScrambleText(targetText, isGlitching) {
  const [displayText, setDisplayText] = useState(targetText);

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(targetText);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n' || char === '/') return char;
            if (index < iteration) {
              return targetText[index];
            }
            return GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
          })
          .join('')
      );

      iteration += 1 / 1.8;
      if (iteration >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isGlitching, targetText]);

  return displayText;
}

// Letter-by-letter reveal component with fast cyber streaming reveal (Thin font)
function LetterRevealHeading({ text, isGlitching, className = '', textShadow = '' }) {
  const letters = useMemo(() => text.split(''), [text]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.018, // Fast, snappy one-by-one streaming reveal
        delayChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 14,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.16,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={isGlitching ? 'glitching' : 'normal'}
      className={`inline-flex flex-wrap items-center justify-center ${className}`}
      style={{ textShadow }}
    >
      {letters.map((char, idx) => (
        <motion.span
          key={`${char}-${idx}`}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
      {/* Fast blinking cyber cursor */}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.55, ease: 'linear' }}
        className="inline-block text-orange-400 font-bold ml-1 text-[0.8em]"
      >
        _
      </motion.span>
    </motion.div>
  );
}

export default function HeroSection() {
  const [demoActive, setDemoActive] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Periodic automatic glitch pulse: break image apart, then re-join
  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, 420); // 420ms shatter and re-join
    };

    const interval = setInterval(() => {
      triggerGlitch();
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  // Manual trigger glitch on user interaction
  const triggerManualGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 480);
  };

  const title1 = useScrambleText('AUTONOMOUS', isGlitching);
  const title2 = useScrambleText('MARKETING AGENT', isGlitching);

  // Use ultra-optimized WebP (205KB) for lightning-fast load time, with PNG fallback
  const heroImageSrc = '/images/orenge-1.webp';

  return (
    <section className="relative min-h-[96vh] lg:h-screen flex flex-col justify-between pt-16 lg:pt-20 pb-0 overflow-hidden bg-white select-none">
      
      {/* ============================================================== */}
      {/* 1. CRT SCANLINE OVERLAY (ORANGE & WHITE THEME)                 */}
      {/* ============================================================== */}
      <div className="absolute inset-0 crt-overlay pointer-events-none z-30 opacity-40" />
      
      {/* Continuous horizontal scanline drift bar with subtle neutral tint */}
      <motion.div
        className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-zinc-400/[0.015] to-transparent pointer-events-none z-30"
        animate={{ y: ['-100%', '1100%'] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
      />

      {/* ============================================================== */}
      {/* 2. 3D CYBER WIREFRAME MESH PERSPECTIVE FLOOR                   */}
      {/* ============================================================== */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] pointer-events-none z-0 overflow-hidden opacity-40">
        <div
          className="cyber-grid-plane absolute -inset-x-[50%] bottom-0 h-[200%] origin-bottom"
          style={{
            transform: 'perspective(450px) rotateX(68deg)',
          }}
        />
        {/* Floor fade gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
      </div>

      {/* ============================================================== */}
      {/* 3. LEFT SECTION: ONLY OUTER TWO-LAYER CONCENTRIC CIRCLES       */}
      {/* ============================================================== */}
      <div className="absolute left-6 lg:left-14 top-1/3 pointer-events-none z-15 hidden md:block">
        <div className="relative w-44 h-44 flex items-center justify-center">
          
          {/* Layer 1: Outer thin dashed circle continuously rotating clockwise (Orange) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-orange-500/35"
          />

          {/* Layer 2: Second concentric ring continuously rotating counter-clockwise & gently breathing (Amber) */}
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.08, 1],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 15, ease: 'linear' },
              scale: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
            }}
            className="absolute inset-4 rounded-full border border-amber-500/35 border-t-orange-500"
          />

        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. TOP CYBERPUNK HUD BAR (ORANGE THEME)                        */}
      {/* ============================================================== */}
      <div className="absolute inset-4 sm:inset-6 lg:inset-8 pointer-events-none z-25 flex flex-col justify-between">
        
        {/* Top bar with quick glitch trigger and rotating pipeline compass */}
        <div className="flex items-start justify-between w-full pt-12 sm:pt-14 lg:pt-8 text-[10px] sm:text-xs font-mono text-zinc-600 tracking-wider">
          
          {/* Top Left: Sleek Contact & Glitch Trigger Pill */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-lg bg-white/90 hover:bg-orange-50 border border-zinc-200 hover:border-orange-400 text-zinc-800 hover:text-orange-600 text-xs font-mono flex items-center space-x-1.5 transition-all backdrop-blur-md cursor-pointer shadow-sm"
            >
              <span>Contact</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
            </button>

            <button
              onClick={triggerManualGlitch}
              className="p-1.5 rounded-lg bg-white/90 hover:bg-orange-50 border border-zinc-200 hover:border-orange-400 text-orange-500 transition-all backdrop-blur-md cursor-pointer shadow-sm"
              title="Trigger glitch fracture"
            >
              <Zap className="w-4 h-4" />
            </button>
          </div>

          {/* Top Right: Rotating compass widget with navigation */}
          <div className="flex items-center space-x-3 pointer-events-auto">
            <div className="hidden sm:flex flex-col text-right text-[9px] sm:text-[10px] text-zinc-500 space-y-0.5">
              <span className="text-orange-600 font-semibold">NEURAL LINK: 99.8%</span>
              <span className="text-amber-600">STATUS: OPTIMAL</span>
            </div>

            {/* Circular Rotating Radar Widget (Orange Theme) */}
            <motion.div
              onClick={() => {
                const el = document.getElementById('workflow');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer group"
              title="Click to jump to Workflow Pipeline"
            >
              {/* Outer spinning dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-orange-500/50 group-hover:border-orange-500"
              />
              {/* Inner counter-rotating ring with scale pulsation */}
              <motion.div
                animate={{
                  rotate: -360,
                  scale: [0.95, 1.08, 0.95],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 10, ease: 'linear' },
                  scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                }}
                className="absolute inset-1.5 rounded-full border border-amber-500/50 border-t-orange-500 group-hover:border-amber-500"
              />
              {/* Center badge */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-zinc-200 flex flex-col items-center justify-center text-center backdrop-blur-md group-hover:bg-orange-50 transition-colors shadow-sm">
                <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-tighter text-zinc-700 font-bold leading-none">
                  PIPELINE
                </span>
                <span className="text-[10px] sm:text-xs text-orange-500 mt-0.5 font-bold">↗</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Viewfinder brackets & crosshairs (Orange / Amber accents) */}
        <div className="relative w-full h-full pointer-events-none">
          <div className="absolute top-2 left-0 w-7 h-7 border-t-2 border-l-2 border-orange-500/40" />
          <div className="absolute top-2 right-0 w-7 h-7 border-t-2 border-r-2 border-orange-500/40" />
          <div className="absolute bottom-6 left-0 w-7 h-7 border-b-2 border-l-2 border-orange-500/40" />
          <div className="absolute bottom-6 right-0 w-7 h-7 border-b-2 border-r-2 border-orange-500/40" />

          {/* Crosshairs (+) */}
          <span className="absolute top-1/4 left-1/4 text-zinc-300 font-mono text-sm select-none">+</span>
          <span className="absolute top-1/4 right-1/4 text-zinc-300 font-mono text-sm select-none">+</span>
          <span className="absolute bottom-1/3 left-1/3 text-zinc-300 font-mono text-sm select-none">+</span>
          <span className="absolute bottom-1/3 right-1/3 text-zinc-300 font-mono text-sm select-none">+</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. ROBOT AGENT: FAST LOADING ORENGE-1 IMAGE + GLITCH BREAK     */}
      {/* ============================================================== */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 overflow-hidden">
        <div
          onClick={triggerManualGlitch}
          className="relative flex justify-center items-end h-[68vh] sm:h-[76vh] md:h-[84vh] lg:h-[90vh] xl:h-[94vh] max-h-[960px] cursor-pointer pointer-events-auto group"
        >
          {/* Base Sharp Robot Image: In-flow to guarantee dimensions & instant load */}
          <img
            src={heroImageSrc}
            onError={(e) => {
              // Fallback to PNG if needed
              e.currentTarget.src = '/images/orenge-1.png';
            }}
            alt="Possiblestudio.ai autonomous executive robot - orange edition"
            className={`w-auto h-full object-contain object-bottom select-none block drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)] group-hover:drop-shadow-[0_25px_60px_rgba(0,0,0,0.1)] transition-all duration-200 ${
              isGlitching ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* CHROMATIC GHOST LAYERS (Orange & Amber trails during glitch) */}
          {isGlitching && (
            <>
              {/* Orange ghost slice layer */}
              <div
                className="absolute inset-0 flex justify-center items-end pointer-events-none select-none glitch-active-1"
                style={{
                  filter: 'drop-shadow(-14px 0px 0px rgba(255, 107, 0, 0.95)) brightness(1.3)',
                  mixBlendMode: 'screen',
                }}
              >
                <img
                  src={heroImageSrc}
                  alt="Glitch Orange"
                  className="w-auto h-full object-contain object-bottom"
                />
              </div>

              {/* Amber / Gold ghost slice layer */}
              <div
                className="absolute inset-0 flex justify-center items-end pointer-events-none select-none glitch-active-2"
                style={{
                  filter: 'drop-shadow(14px 0px 0px rgba(251, 191, 36, 0.95)) brightness(1.3)',
                  mixBlendMode: 'screen',
                }}
              >
                <img
                  src={heroImageSrc}
                  alt="Glitch Amber"
                  className="w-auto h-full object-contain object-bottom"
                />
              </div>

              {/* FRACTURED PHYSICAL IMAGE BANDS: BREAK APART & RE-JOIN */}
              {IMAGE_SLICES.map((slice) => (
                <motion.div
                  key={slice.id}
                  className={`absolute inset-0 flex justify-center items-end overflow-hidden ${slice.border}`}
                  style={{
                    clipPath: `polygon(0% ${slice.top}%, 100% ${slice.top}%, 100% ${slice.bottom}%, 0% ${slice.bottom}%)`,
                  }}
                  initial={{ x: 0, y: 0, rotate: 0 }}
                  animate={{
                    // Fractures apart horizontally and tilts, then joins back cleanly!
                    x: [0, slice.glitchX, -slice.glitchX * 0.7, slice.glitchX * 1.1, 0],
                    y: [0, slice.glitchY, -slice.glitchY * 0.8, 0],
                    rotate: [0, slice.rotate, -slice.rotate * 0.5, 0],
                    filter: [
                      'brightness(1) contrast(1)',
                      'brightness(1.4) contrast(1.25) hue-rotate(25deg)',
                      'brightness(0.9) contrast(1.1) hue-rotate(-25deg)',
                      'brightness(1) contrast(1)',
                    ],
                  }}
                  transition={{
                    duration: 0.42,
                    ease: 'easeInOut',
                  }}
                >
                  <img
                    src={heroImageSrc}
                    alt={`Robot Slice ${slice.id}`}
                    className="w-auto h-full object-contain object-bottom"
                  />
                </motion.div>
              ))}

              {/* Horizontal flash tear line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ scaleX: 1, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-0 top-1/2 h-1 bg-white shadow-[0_0_20px_#ff6b00] pointer-events-none"
              />
            </>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 6. CENTERED THIN LETTER-REVEALING ORANGE CYBER HEADING         */}
      {/* ============================================================== */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex-1 flex flex-col justify-end items-center text-center pb-6 sm:pb-8 lg:pb-12 pointer-events-none">
        
        <div className="flex flex-col items-center justify-center text-center w-full pb-2 z-20 pointer-events-auto">
          
          {/* Letter Revealing Heading Line 1 (Dark high-contrast on white) */}
          <div className="overflow-hidden leading-[0.85] w-full flex justify-center">
            <LetterRevealHeading
              text={title1}
              isGlitching={isGlitching}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black tracking-tighter uppercase text-zinc-950"
              textShadow={
                isGlitching
                  ? '-4px 0px 0px #ff6b00, 4px 0px 0px #f59e0b'
                  : 'none'
              }
            />
          </div>

          {/* Letter Revealing Heading Line 2 (Vibrant orange/amber gradient) */}
          <div className="overflow-hidden leading-[0.85] mt-1 sm:mt-2 w-full flex justify-center">
            <LetterRevealHeading
              text={title2}
              isGlitching={isGlitching}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black tracking-tighter uppercase bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent"
              textShadow={
                isGlitching
                  ? '-3px 0px 0px #ff6b00, 3px 0px 0px #f59e0b'
                  : 'none'
              }
            />
          </div>

          {/* Clean Sub-telemetry line (No background box) */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-3.5 text-[10px] sm:text-xs font-mono text-zinc-500 tracking-wider">
            <span className="text-orange-600 font-medium">SIGNAL: FRACTURED & JOINED</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-600 font-light">ENCRYPTION: QUANTUM 512</span>
            <span className="text-zinc-300">•</span>
            <span className="text-amber-600 font-medium">VERSION 4.8.2</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 7. BOTTOM GRADIENT VIGNETTE (SEAMLESS WHITE BLEND)             */}
      {/* ============================================================== */}
      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 lg:h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />

      {/* Video Demo Modal */}
      <AnimatePresence>
        {demoActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl rounded-2xl bg-white border border-orange-400/50 p-6 shadow-2xl text-zinc-900"
            >
              <button
                onClick={() => setDemoActive(false)}
                className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-900 px-3 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-sm font-mono cursor-pointer"
              >
                Close [ESC]
              </button>
              <div className="flex items-center gap-3 mb-4">
                <Bot className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-zinc-950">Autonomous Agent In Action</h3>
              </div>
              <div className="aspect-video w-full rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-600/20 border border-orange-500 flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 text-orange-400 fill-orange-400 ml-1" />
                </div>
                <p className="text-zinc-200 font-medium">Interactive Demo Simulation Ready</p>
                <p className="text-xs text-zinc-400 mt-1 max-w-md">
                  Experience full autonomy below in the 7-Stage Workflow and Live Ad & Lead Simulator!
                </p>
                <button
                  onClick={() => {
                    setDemoActive(false);
                    const el = document.getElementById('simulator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-orange-600 text-white text-xs font-semibold hover:bg-orange-500 shadow-lg shadow-orange-600/30 cursor-pointer"
                >
                  Jump to Live Simulator
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
