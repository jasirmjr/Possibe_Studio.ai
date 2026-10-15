import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles,
  Palette,
  Share2,
  Target,
  Sliders,
  Users,
  Bot,
  RotateCw,
  Cpu,
} from 'lucide-react';

const GLOBAL_HEADLINE = 'Autonomous Execution Pipeline';

// ============================================================================
// 7 DEEP WORKFLOW PIPELINE STAGES (CYBER ORANGE THEME)
// ============================================================================
const PIPELINE_STEPS = [
  {
    id: '01',
    number: '01',
    title: 'Single Idea Input',
    category: 'CONCEPT INGESTION',
    tagline: 'Zero-shot prompt extraction in < 1.2s.',
    icon: Sparkles,
    glowColor: 'rgba(255, 107, 0, 0.45)',
    description:
      'Input a single raw brief or URL. The autonomous parser decomposes brand DNA and tone of voice without prompt engineering.',
    specs: [
      { label: 'Latency', value: '< 1.2s' },
      { label: 'Prompt', value: '0% Need' },
      { label: 'DNA', value: 'Auto' },
    ],
  },
  {
    id: '02',
    number: '02',
    title: 'Creative Studio',
    category: 'GENERATIVE PRODUCTION',
    tagline: 'Multi-modal 4K visuals, copy & formats.',
    icon: Palette,
    glowColor: 'rgba(245, 158, 11, 0.45)',
    description:
      'Synthesizes 4K multi-ratio ad creatives in parallel. Renders vertical 9:16 reels, square feeds, and magnetic copy.',
    specs: [
      { label: 'Quality', value: '4K Ultra' },
      { label: 'Velocity', value: '12/min' },
      { label: 'Ratios', value: '9:16 • 1:1' },
    ],
  },
  {
    id: '03',
    number: '03',
    title: 'Social Dispatch',
    category: 'OMNICHANNEL DEPLOY',
    tagline: 'Direct API handshake across platforms.',
    icon: Share2,
    glowColor: 'rgba(255, 107, 0, 0.45)',
    description:
      'Direct machine API publishing across Meta, TikTok, Instagram, and LinkedIn within peak-engagement windows.',
    specs: [
      { label: 'Channels', value: 'Meta • TT' },
      { label: 'Sync', value: '< 1s' },
      { label: 'Audio', value: 'Trending' },
    ],
  },
  {
    id: '04',
    number: '04',
    title: 'Smart Ad Engine',
    category: 'PRECISION TARGETING',
    tagline: '500m precision geo-fencing & lookalikes.',
    icon: Target,
    glowColor: 'rgba(245, 158, 11, 0.45)',
    description:
      'Constructs audience vectors by blending intent signals with real-time geo-coordinates and Lookalike models.',
    specs: [
      { label: 'Radius', value: '500m Hub' },
      { label: 'CPC', value: '$0.42 Avg' },
      { label: 'Pruning', value: 'Real-time' },
    ],
  },
  {
    id: '05',
    number: '05',
    title: 'Budget Optimizer',
    category: 'CAPITAL EFFICIENCY',
    tagline: 'Feedback loop cuts losers within 3h.',
    icon: Sliders,
    glowColor: 'rgba(255, 107, 0, 0.45)',
    description:
      'Autonomous capital reallocation powered by 3-hour closed loops. Cuts low-traction ads and scales winners to maximize ROAS.',
    specs: [
      { label: 'Cut Time', value: '180m' },
      { label: 'ROAS', value: '+340% Lift' },
      { label: 'Realloc', value: '100% Auto' },
    ],
  },
  {
    id: '06',
    number: '06',
    title: 'Unified Pipeline',
    category: 'INTENT CLASSIFICATION',
    tagline: 'Aggregated AI-scored live inbound stream.',
    icon: Users,
    glowColor: 'rgba(245, 158, 11, 0.45)',
    description:
      'Aggregates inbound messages and inquiries into a priority stream. Evaluates buyer intent signals in sub-30s intervals.',
    specs: [
      { label: 'Speed', value: '< 5s' },
      { label: 'Match', value: '98.4%' },
      { label: 'Routing', value: 'Tier 1' },
    ],
  },
  {
    id: '07',
    number: '07',
    title: '24/7 AI Closer',
    category: 'AUTONOMOUS CONVERSION',
    tagline: 'Sub-30s WhatsApp & DM conversational closing.',
    icon: Bot,
    glowColor: 'rgba(255, 107, 0, 0.45)',
    description:
      'Conversational closer engages prospects on WhatsApp and DMs in under 30 seconds, answering questions and booking demo calls.',
    specs: [
      { label: 'Response', value: '< 30s' },
      { label: 'Booking', value: '+68% Lift' },
      { label: 'Calendar', value: 'Google/Out' },
    ],
  },
];

export default function CapabilitiesWorkflowSection() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: false });

  const [flippedIndex, setFlippedIndex] = useState(null);
  const [rowMetrics, setRowMetrics] = useState({ width: 0, offsets: [], fontSize: 0 });
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (isInView) {
      setAnimKey((k) => k + 1);
    }
  }, [isInView]);

  // Compute sliced edge-to-edge typography metrics spanning across all 7 cards
  useEffect(() => {
    const updateMetrics = () => {
      if (!rowRef.current) return;
      const cards = Array.from(rowRef.current.children);
      const width = rowRef.current.scrollWidth || rowRef.current.clientWidth;
      const offsets = cards.map((c) => c.offsetLeft);

      let fontSize = 80;
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.font = '200 100px Inter, system-ui, sans-serif';
          const textWidthAt100 = ctx.measureText(GLOBAL_HEADLINE).width || 1480;
          const targetWidth = Math.max(width - 24, 600);
          fontSize = Math.min(Math.round((targetWidth / textWidthAt100) * 100), 130);
        }
      } catch (e) {
        fontSize = Math.round(width / 15);
      }

      setRowMetrics({ width, offsets, fontSize });
    };

    updateMetrics();

    let ro;
    if (window.ResizeObserver && rowRef.current) {
      ro = new ResizeObserver(() => {
        updateMetrics();
      });
      ro.observe(rowRef.current);
    }

    window.addEventListener('resize', updateMetrics);
    const timer = setTimeout(updateMetrics, 120);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateMetrics);
      clearTimeout(timer);
    };
  }, []);

  const descriptionWords = useMemo(
    () =>
      'Hover over any stage to flip the card and explore deep autonomous telemetry and execution models.'.split(
        ' '
      ),
    []
  );

  // Background ambient canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const PARTICLE_COUNT = 45;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 107, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative z-20 min-h-screen lg:h-screen lg:max-h-[920px] flex flex-col justify-between py-10 sm:py-12 lg:py-14 bg-[#050505] text-zinc-100 select-none -mt-[100vh] shadow-[0_-35px_100px_rgba(0,0,0,0.98)] border-t border-orange-500/30 overflow-hidden"
    >
      {/* High-Tech Glowing Orange Laser Leading Edge */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_22px_#ff6b00] z-50 pointer-events-none" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-y-1/2 w-[700px] h-[550px] bg-orange-600/10 blur-[190px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 w-[550px] h-[450px] bg-amber-600/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Subtle Aerospace Particles Canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_75%,transparent_100%)] opacity-15 pointer-events-none" />

      {/* ============================================================== */}
      {/* 1. TOP HEADER: SPEED HEADING + READING EFFECT SUBTEXT           */}
      {/* ============================================================== */}
      <div className="relative z-40 pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extralight text-white tracking-[-0.04em] leading-[1.08] mb-3 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, x: -140 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -140 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.08,
            }}
            className="block"
          >
            Autonomous execution.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 140 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 140 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="font-light bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent block mt-1"
          >
            Stage by stage, in depth.
          </motion.span>
        </h2>

        {/* Description: Word-by-Word Reading Reveal Effect */}
        <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed max-w-xl mx-auto tracking-tight flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
          {descriptionWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.15, y: 3 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.15, y: 3 }
              }
              transition={{
                duration: 0.3,
                delay: 0.28 + i * 0.02,
                ease: 'easeOut',
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>

      {/* ============================================================== */}
      {/* 2. 7 HORIZONTAL CARDS: PARALLEL LEFT ENTRANCE + CONTINUOUS SLICE*/}
      {/* "Autonomous Execution Pipeline" edge-to-edge across all 7 cards */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-[1780px] mx-auto px-3 sm:px-5 lg:px-6 pb-2 sm:pb-4 flex items-center justify-center">
        <div
          ref={rowRef}
          className="flex flex-nowrap lg:grid lg:grid-cols-7 gap-1.5 sm:gap-2 lg:gap-2.5 w-full overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory lg:overflow-visible"
        >
          {PIPELINE_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isFlipped = flippedIndex === idx;

            return (
              <motion.div
                key={`${step.id}-${animKey}`}
                initial={{
                  opacity: 0,
                  x: '-110vw',
                  skewX: -12,
                  scaleX: 1.06,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        x: 0,
                        skewX: 0,
                        scaleX: 1,
                      }
                    : {
                        opacity: 0,
                        x: '-110vw',
                        skewX: -12,
                        scaleX: 1.06,
                      }
                }
                transition={{
                  duration: isInView ? 0.72 : 0,
                  delay: isInView ? 0.05 + idx * 0.05 : 0,
                  ease: [0.08, 0.85, 0.18, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
                }}
                style={{ zIndex: isFlipped ? 50 : 1 }}
                className="min-w-[240px] sm:min-w-[260px] lg:min-w-0 flex-1 snap-center [perspective:1200px] h-[320px] sm:h-[340px] lg:h-[360px] xl:h-[375px]"
                onMouseEnter={() => setFlippedIndex(idx)}
                onMouseLeave={() => setFlippedIndex(null)}
                onClick={() => setFlippedIndex(isFlipped ? null : idx)}
              >
                {/* 3D FLIP CONTAINER */}
                <motion.div
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                    width: isFlipped ? '155%' : '100%',
                    x: isFlipped
                      ? idx === 0
                        ? '0%'
                        : idx === PIPELINE_STEPS.length - 1
                        ? '-55%'
                        : '-27.5%'
                      : '0%',
                    scale: isFlipped ? 1.06 : 1,
                    y: isFlipped ? -10 : 0,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full rounded-2xl cursor-pointer"
                >
                  {/* ==================================================== */}
                  {/* FRONT FACE (Continuous Sliced Edge-to-Edge Word)     */}
                  {/* ==================================================== */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    className="absolute inset-0 w-full h-full rounded-2xl border border-white/20 bg-zinc-950/90 backdrop-blur-md p-3 sm:p-4 flex flex-col justify-between overflow-hidden shadow-xl hover:border-orange-500/80 shadow-[0_0_15px_rgba(255,107,0,0.06)] hover:shadow-[0_0_25px_rgba(255,107,0,0.25)] transition-all duration-500 group"
                  >
                    {/* Ambient background glow */}
                    <div
                      className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[60px] pointer-events-none opacity-25 group-hover:opacity-80 transition-opacity duration-500"
                      style={{ background: step.glowColor }}
                    />

                    {/* FRONT TOP: Number badge & Icon */}
                    <div className="flex items-center justify-between relative z-10 m-0 p-0">
                      <span className="font-mono text-[11px] text-orange-400 font-bold px-2 py-0.5 rounded bg-orange-950/60 border border-orange-500/30">
                        {step.number}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 group-hover:border-orange-500/50 transition-colors">
                        <StepIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* ================================================== */}
                    {/* FRONT MIDDLE: CONTINUOUS SLICED HEADLINE           */}
                    {/* Spans across all 7 cards with zero unnatural gaps  */}
                    {/* Gaps between cards break the text cleanly          */}
                    {/* ================================================== */}
                    <div
                      className="absolute inset-y-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
                      style={{
                        width: rowMetrics.width ? `${rowMetrics.width}px` : '700%',
                        left:
                          rowMetrics.offsets[idx] !== undefined
                            ? `-${rowMetrics.offsets[idx]}px`
                            : `${-idx * 100}%`,
                      }}
                    >
                      <span
                        className="font-extralight tracking-tight text-white/95 group-hover:text-orange-200 group-hover:drop-shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-500 leading-none select-none whitespace-nowrap"
                        style={{
                          fontSize: rowMetrics.fontSize
                            ? `${rowMetrics.fontSize}px`
                            : 'clamp(52px, 6.4vw, 120px)',
                        }}
                      >
                        {GLOBAL_HEADLINE}
                      </span>
                    </div>

                    {/* FRONT BOTTOM: Category & Title */}
                    <div className="relative z-10 pt-2 border-t border-white/10 flex flex-col gap-0.5 m-0 p-0">
                      <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase block">
                        {step.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-light text-white tracking-tight mt-0.5 line-clamp-1 group-hover:text-orange-300 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 pt-1">
                        <span className="group-hover:text-orange-400 transition-colors">TELEMETRY</span>
                        <RotateCw className="w-2.5 h-2.5 group-hover:rotate-180 transition-transform duration-500 text-orange-400" />
                      </div>
                    </div>
                  </div>

                  {/* ==================================================== */}
                  {/* BACK FACE (Flipped 3D View: Deep Details & Specs)    */}
                  {/* ==================================================== */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                    className="absolute inset-0 w-full h-full rounded-2xl border border-orange-500/70 bg-[#09090b] p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl shadow-orange-950/70 select-none text-left"
                  >
                    {/* Localized Back Glow */}
                    <motion.div
                      animate={{
                        opacity: isFlipped ? 0.35 : 0,
                        scale: isFlipped ? 1.1 : 0.8,
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[70px] pointer-events-none"
                      style={{ background: step.glowColor }}
                    />
                    <motion.div
                      animate={{
                        opacity: isFlipped ? 0.2 : 0,
                        scale: isFlipped ? 1.1 : 0.8,
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[70px] pointer-events-none"
                      style={{ background: step.glowColor }}
                    />

                    {/* Back Top: Specs label */}
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-[10px] font-mono text-orange-300 font-bold uppercase tracking-wider">
                          SPECS // {step.number}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400">ACTIVE</span>
                    </div>

                    {/* BACK CONTENT: Animated Title & Elaborated Narrative */}
                    <div className="relative z-10 flex flex-col gap-2 my-auto w-full">
                      <motion.h4
                        initial={{ opacity: 0, y: 15 }}
                        animate={
                          isFlipped
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 15 }
                        }
                        transition={{
                          duration: 0.45,
                          delay: 0.22,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="text-sm sm:text-base lg:text-lg font-light text-white tracking-tight leading-snug"
                      >
                        {step.title}
                      </motion.h4>

                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={
                          isFlipped
                            ? { opacity: 1, scaleX: 1 }
                            : { opacity: 0, scaleX: 0 }
                        }
                        transition={{
                          duration: 0.4,
                          delay: 0.28,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-10 h-[2px] bg-gradient-to-r from-orange-400 to-amber-400 rounded-full origin-left"
                      />

                      <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={
                          isFlipped
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 18 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.34,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-light tracking-normal line-clamp-3"
                      >
                        {step.description}
                      </motion.p>

                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {step.specs.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="py-1 px-1.5 rounded bg-zinc-900 border border-zinc-800 text-center"
                          >
                            <span className="text-[8px] text-zinc-500 block font-mono">
                              {spec.label}
                            </span>
                            <span className="text-[9px] text-white font-bold font-mono">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Back Bottom: Status */}
                    <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] font-mono text-zinc-400 relative z-10">
                      <span className="text-orange-400 font-semibold">100% AUTOMATED</span>
                      <span className="text-zinc-500">FLIP BACK</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
