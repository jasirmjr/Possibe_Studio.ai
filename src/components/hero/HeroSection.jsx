import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Bot } from 'lucide-react';
import Button from '../ui/Button';

export default function HeroSection() {
  const [demoActive, setDemoActive] = useState(false);

  // Marquee phrase repeated for seamless continuous looping
  const marqueePhrase = "ONE SENTENCE IN. ENTIRE AD EMPIRE OUT. • ONE SENTENCE IN. ENTIRE AD EMPIRE OUT. • ";

  return (
    <section className="relative min-h-[96vh] lg:h-screen flex flex-col justify-between pt-20 lg:pt-24 pb-0 overflow-hidden bg-[#050505]">
      
      {/* Ambient Lighting Behind Center Agent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[850px] lg:h-[750px] bg-purple-600/20 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/12 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_75%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* ============================================================== */}
      {/* CONTINUOUSLY MOVING MASSIVE TEXT (Infinite Kinetic Marquee)   */}
      {/* ============================================================== */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 overflow-hidden pointer-events-none select-none z-0 opacity-20 lg:opacity-25">
        <div className="flex w-[200%] overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
          >
            <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-heading font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500/70 via-zinc-300/40 to-cyan-400/60 pr-8">
              {marqueePhrase}
            </span>
            <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-heading font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500/70 via-zinc-300/40 to-cyan-400/60 pr-8">
              {marqueePhrase}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BALANCED MINIMAL 3-COLUMN LAYOUT                              */}
      {/* ============================================================== */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex-1 flex flex-col justify-end pb-6 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-end w-full">
          
          {/* ============================================================ */}
          {/* LEFT: ULTRA-MINIMAL TEXT & PRIMARY CTA                       */}
          {/* ============================================================ */}
          <div className="lg:col-span-3 flex flex-col items-start text-left space-y-4 pb-6 lg:pb-12 z-20 max-w-sm">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extralight tracking-[-0.04em] text-white leading-[1.08] overflow-hidden">
              <motion.span
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="block"
              >
                One sentence in.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                className="font-light bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-300 bg-clip-text text-transparent block mt-1"
              >
                Entire ad empire out.
              </motion.span>
            </h1>

            <div className="flex flex-wrap gap-x-1 gap-y-0.5 text-xs sm:text-sm font-light text-zinc-400">
              {['Autonomous', 'ad', 'campaigns', '&', '24/7', 'AI', 'lead', 'closing.'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.1, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4 + i * 0.04,
                    ease: 'easeOut',
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <div className="pt-1">
              <Button
                variant="primary"
                size="md"
                iconRight={ArrowRight}
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </Button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CENTER: MAIN AGENT IMAGE (NO TEXT OVERLAP, ENLARGE ON HOVER) */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center items-end self-end relative z-10 w-full"
          >
            {/* Concentric Glow Halo behind Agent Head */}
            <div className="absolute w-[450px] h-[450px] sm:w-[580px] sm:h-[580px] rounded-full bg-gradient-to-tr from-purple-600/35 to-cyan-500/25 blur-[120px] pointer-events-none -top-10" />

            {/* Agent Image: Centered, Enlarge on Cursor Hover Only (No Rotation) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative flex justify-center items-end cursor-pointer pointer-events-auto"
            >
              <img
                src="/images/new.png"
                alt="possiblestudio.ai autonomous executive agent"
                className="w-auto h-[55vh] sm:h-[68vh] lg:h-[78vh] xl:h-[84vh] max-h-[740px] xl:max-h-[820px] object-contain object-bottom select-none block drop-shadow-[0_20px_80px_rgba(168,85,247,0.45)] hover:drop-shadow-[0_30px_100px_rgba(168,85,247,0.7)] hover:brightness-105 transition-all duration-300"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM VIGNETTE: SEAMLESS CONTINUATION TO NEXT SECTION        */}
      {/* ============================================================== */}
      <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 lg:h-56 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-20" />

      {/* Video Demo Modal */}
      {demoActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-2xl bg-zinc-950 border border-purple-500/50 p-6 shadow-2xl">
            <button
              onClick={() => setDemoActive(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-mono"
            >
              Close [ESC]
            </button>
            <div className="flex items-center gap-3 mb-4">
              <Bot className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Autonomous Agent In Action</h3>
            </div>
            <div className="aspect-video w-full rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500 flex items-center justify-center mb-4">
                <Play className="w-8 h-8 text-purple-400 fill-purple-400 ml-1" />
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
                className="mt-4 px-6 py-2.5 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 shadow-lg shadow-purple-600/30"
              >
                Jump to Live Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
