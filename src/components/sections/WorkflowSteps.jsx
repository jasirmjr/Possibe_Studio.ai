import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles,
  Palette,
  Share2,
  Target,
  Sliders,
  Users,
  Bot
} from 'lucide-react';

export default function WorkflowSteps() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.25, once: false });
  const [animationKey, setAnimationKey] = useState(0);

  // Force fresh left-to-right animation restart each time the section is reached
  useEffect(() => {
    if (isInView) {
      setAnimationKey((k) => k + 1);
    }
  }, [isInView]);

  // 7 Continuous Stages with synchronized sequential reveals
  const steps = [
    {
      id: '01',
      stepNum: 1,
      title: 'Single Idea Input',
      desc: 'Type one raw product idea. Zero prompt engineering required.',
      icon: Sparkles,
      position: 'bottom',
      dotLeft: '7.1%',
      dotTop: '61%',
      textColor: 'text-purple-400',
      glowColor: 'rgba(168, 85, 247, 0.9)',
      badgeClass: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    },
    {
      id: '02',
      stepNum: 2,
      title: 'Creative Studio',
      desc: 'Synthesizes high-res on-brand posters, formats, and copy.',
      icon: Palette,
      position: 'top',
      dotLeft: '21.4%',
      dotTop: '39%',
      textColor: 'text-cyan-400',
      glowColor: 'rgba(6, 182, 212, 0.9)',
      badgeClass: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: '03',
      stepNum: 3,
      title: 'Social Dispatch',
      desc: 'Auto-publishes to Meta, TikTok & LinkedIn with hashtags.',
      icon: Share2,
      position: 'bottom',
      dotLeft: '35.7%',
      dotTop: '61%',
      textColor: 'text-purple-400',
      glowColor: 'rgba(168, 85, 247, 0.9)',
      badgeClass: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    },
    {
      id: '04',
      stepNum: 4,
      title: 'Smart Ad Engine',
      desc: 'Autonomous micro-geo fencing and predictive lookalikes.',
      icon: Target,
      position: 'top',
      dotLeft: '50.0%',
      dotTop: '39%',
      textColor: 'text-cyan-400',
      glowColor: 'rgba(6, 182, 212, 0.9)',
      badgeClass: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: '05',
      stepNum: 5,
      title: 'Budget Optimizer',
      desc: '2-click control. Agent dynamically shifts spend to top ROAS.',
      icon: Sliders,
      position: 'bottom',
      dotLeft: '64.3%',
      dotTop: '61%',
      textColor: 'text-emerald-400',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      badgeClass: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      id: '06',
      stepNum: 6,
      title: 'Unified Pipeline',
      desc: 'Consolidates all incoming inquiries into a scored stream.',
      icon: Users,
      position: 'top',
      dotLeft: '78.6%',
      dotTop: '39%',
      textColor: 'text-purple-400',
      glowColor: 'rgba(168, 85, 247, 0.9)',
      badgeClass: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    },
    {
      id: '07',
      stepNum: 7,
      title: '24/7 AI Closer',
      desc: 'Sub-30s conversational WhatsApp & DM follow-up to lock meetings.',
      icon: Bot,
      position: 'bottom',
      dotLeft: '92.8%',
      dotTop: '61%',
      textColor: 'text-emerald-400',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      badgeClass: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="relative min-h-[80vh] lg:min-h-[660px] flex flex-col justify-center items-center pt-8 pb-4 lg:pt-10 lg:pb-4 bg-[#050505] overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-purple-600/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-cyan-600/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_75%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-center items-center">
        
        {/* ============================================================== */}
        {/* VERTICALLY & HORIZONTALLY CENTERED HEADER WITH SPEED ANIMATION */}
        {/* ============================================================== */}
        <div className="w-full flex justify-center items-center text-center mb-6 lg:mb-8">
          <div className="text-center max-w-4xl mx-auto overflow-hidden">
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extralight text-white tracking-[-0.04em] leading-[1.06] overflow-hidden">
              <motion.span
                key={`wf-h1-${animationKey}`}
                initial={{ opacity: 0, x: -140 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -140 }}
                transition={{
                  duration: isInView ? 0.75 : 0,
                  ease: [0.16, 1, 0.3, 1],
                  delay: isInView ? 0.08 : 0,
                }}
                className="block"
              >
                From single idea to
              </motion.span>
              <motion.span
                key={`wf-h2-${animationKey}`}
                initial={{ opacity: 0, x: 140 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 140 }}
                transition={{
                  duration: isInView ? 0.75 : 0,
                  ease: [0.16, 1, 0.3, 1],
                  delay: isInView ? 0.2 : 0,
                }}
                className="font-light bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-300 bg-clip-text text-transparent block mt-1"
              >
                closed customer.
              </motion.span>
            </h2>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP 7-STAGE CURVED SERPENTINE CANVAS                      */}
        {/* ============================================================== */}
        <div className="hidden lg:block relative w-full h-[400px] xl:h-[420px] -mt-2 lg:-mt-4">
          
          {/* Animated Glowing Curved SVG Wave Path: Always starts from the far left (x=0) */}
          <svg
            key={`wave-svg-${animationKey}`}
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            viewBox="0 0 1400 360"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="neon7WaveGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="30%" stopColor="#8b5cf6" />
                <stop offset="65%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Glowing Backdrop Stroke (Hardware-accelerated CSS blur) */}
            <motion.path
              d="M 30,220 C 60,220 80,220 100,220 C 180,220 220,140 300,140 C 380,140 420,220 500,220 C 580,220 620,140 700,140 C 780,140 820,220 900,220 C 980,220 1020,140 1100,140 C 1180,140 1220,220 1300,220 C 1340,220 1370,220 1400,220"
              stroke="url(#neon7WaveGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
              className="blur-[5px]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{ duration: isInView ? 1.8 : 0, ease: "linear" }}
            />

            {/* Sharp Foreground Neon Stroke */}
            <motion.path
              d="M 30,220 C 60,220 80,220 100,220 C 180,220 220,140 300,140 C 380,140 420,220 500,220 C 580,220 620,140 700,140 C 780,140 820,220 900,220 C 980,220 1020,140 1100,140 C 1180,140 1220,220 1300,220 C 1340,220 1370,220 1400,220"
              stroke="url(#neon7WaveGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{ duration: isInView ? 1.8 : 0, ease: "linear" }}
            />
          </svg>

          {/* Render 7 Alternating Milestones in BLENDED format */}
          {steps.map((step, idx) => {
            const isTop = step.position === 'top';
            // Synchronize milestone reveal with the SVG path arrival at each point
            const milestoneDelay = 0.12 + idx * 0.25;

            return (
              <div
                key={step.id}
                style={{ left: step.dotLeft, top: step.dotTop }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 pointer-events-auto"
              >
                {/* Glowing Node Dot directly blended on the curved line */}
                <motion.div
                  key={`dot-${step.id}-${animationKey}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    duration: isInView ? 0.45 : 0,
                    delay: isInView ? milestoneDelay : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex items-center justify-center cursor-pointer group-hover:scale-125 transition-transform"
                >
                  {/* Outer Glowing Halo */}
                  <span
                    className="absolute w-5 h-5 rounded-full pointer-events-none opacity-40 animate-pulse"
                    style={{ backgroundColor: step.glowColor }}
                  />
                  {/* Inner Core Dot */}
                  <span
                    className="relative z-10 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#fff]"
                    style={{ boxShadow: `0 0 14px ${step.glowColor}` }}
                  />
                </motion.div>

                {/* Content Block: BLENDED FORMAT (NO BACKGROUND BOX, NO BORDERS) */}
                <motion.div
                  key={`content-${step.id}-${animationKey}`}
                  initial={{ opacity: 0, y: isTop ? 10 : -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isTop ? 10 : -10 }}
                  transition={{
                    duration: isInView ? 0.55 : 0,
                    delay: isInView ? milestoneDelay + 0.06 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`absolute left-1/2 -translate-x-1/2 w-48 xl:w-52 text-left bg-transparent p-0 pointer-events-auto transition-transform duration-300 ${
                    isTop
                      ? 'bottom-full mb-3 group-hover:-translate-y-1'
                      : 'top-full mt-3 group-hover:translate-y-1'
                  }`}
                >
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}

        </div>

        {/* ============================================================== */}
        {/* MOBILE / TABLET RESPONSIVE FLOW (Blended vertical format)     */}
        {/* ============================================================== */}
        <div className="lg:hidden relative mt-4 space-y-4 pl-6 border-l-2 border-purple-500/30 ml-2">
          {steps.map((step, idx) => {
            const delaySec = 0.08 + idx * 0.1;

            return (
              <motion.div
                key={`mob-${step.id}-${animationKey}`}
                initial={{ opacity: 0, x: -14 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                transition={{
                  duration: isInView ? 0.55 : 0,
                  delay: isInView ? delaySec : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group"
              >
                {/* Node Indicator */}
                <div
                  className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-white transition-all duration-300"
                  style={{ boxShadow: `0 0 10px ${step.glowColor}` }}
                />

                {/* Step Detail: Blended without card background */}
                <div className="bg-transparent p-0 relative">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`px-1.5 py-0.2 rounded border text-[10px] font-mono font-bold ${step.badgeClass}`}>
                      {step.id}
                    </span>
                    <step.icon className={`w-3.5 h-3.5 ${step.textColor}`} />
                    <h3 className="text-xs sm:text-sm font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
