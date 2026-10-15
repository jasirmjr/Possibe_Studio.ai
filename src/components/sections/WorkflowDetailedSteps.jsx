import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles,
  Palette,
  Share2,
  Target,
  Sliders,
  Users,
  Bot,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  RotateCw
} from 'lucide-react';

const GLOBAL_HEADLINE = 'Autonomous Execution Pipeline';

export default function WorkflowDetailedSteps() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.18, once: false });
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [rowMetrics, setRowMetrics] = useState({ width: 0, offsets: [], fontSize: 0 });
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (isInView) {
      setAnimKey((k) => k + 1);
    }
  }, [isInView]);

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
          // Target width spans across the 7 cards leaving minimal 16px edge buffer
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
    const timer = setTimeout(updateMetrics, 100);

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

  // 7 Deeply Elaborated Workflow Stages
  // Word: "EXECUTE" (7 letters across 7 cards: E • X • E • C • U • T • E)
  // Perfectly matches section heading: "Autonomous execution. Stage by stage, in depth."
  // Exactly 1 letter per card = ZERO awkward gaps between letters!
  const steps = [
    {
      id: '01',
      number: '01',
      letter: 'E',
      title: 'Single Idea Input',
      category: 'CONCEPT INGESTION',
      tagline: 'Zero-shot prompt extraction in < 1.2s.',
      icon: Sparkles,
      color: 'orange',
      badgeClass: 'text-orange-300 bg-orange-500/10 border-orange-500/30',
      glowColor: 'rgba(249, 115, 22, 0.45)',
      description:
        'Founders and teams provide a single concept, rough note, or URL. The autonomous neural parser decomposes brand DNA, unique value propositions, tone of voice, and audience psychographics without any prompt engineering required.',
      specs: [
        { label: 'Latency', value: '< 1.2s' },
        { label: 'Prompt Eng', value: '0% Needed' },
        { label: 'DNA Extract', value: 'Automated' },
      ],
      previewType: 'terminal',
      terminalData: {
        input: 'Zero-sugar adaptogenic water',
        tokens: ['USP: Clean Focus', 'Geo: Metro'],
        status: 'DNA DECOMPOSED • READY',
      },
    },
    {
      id: '02',
      number: '02',
      letter: 'X',
      title: 'Creative Studio',
      category: 'GENERATIVE PRODUCTION',
      tagline: 'Multi-modal 4K visuals, copy & formats.',
      icon: Palette,
      color: 'amber',
      badgeClass: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      description:
        'Orchestrates specialized diffusion, audio, and language models to synthesize 4K multi-ratio ad creatives in parallel. Generates high-converting 9:16 vertical reels, square feeds, and magnetic copy variations benchmarked against top historic performers.',
      specs: [
        { label: 'Resolution', value: '4K Ultra-Res' },
        { label: 'Velocity', value: '12 Formats/m' },
        { label: 'Ratios', value: '9:16 • 1:1' },
      ],
      previewType: 'studio',
      studioData: {
        formats: ['9:16 Reel', '1:1 Feed'],
        hook: 'Reclaim your 2 AM flow state.',
        badge: 'Score: 98/100',
      },
    },
    {
      id: '03',
      number: '03',
      letter: 'E',
      title: 'Social Dispatch',
      category: 'OMNICHANNEL DEPLOY',
      tagline: 'Direct API handshake across platforms.',
      icon: Share2,
      color: 'orange',
      badgeClass: 'text-orange-300 bg-orange-500/10 border-orange-500/30',
      glowColor: 'rgba(249, 115, 22, 0.45)',
      description:
        'Direct machine-to-machine API publishing across Meta, TikTok, Instagram, and LinkedIn. Schedules campaigns within peak-engagement windows, automatically syncs trending audio stems, and attaches algorithmic high-intent hashtags.',
      specs: [
        { label: 'Channels', value: 'Meta • TikTok • LI' },
        { label: 'Sync Speed', value: 'Sub-second' },
        { label: 'Audio', value: 'Trending Stems' },
      ],
      previewType: 'dispatch',
      dispatchData: {
        platforms: [
          { name: 'Instagram Ads', status: 'LIVE' },
          { name: 'TikTok Spark', status: 'FLIGHT' },
          { name: 'LinkedIn B2B', status: 'ACTIVE' },
        ],
      },
    },
    {
      id: '04',
      number: '04',
      letter: 'C',
      title: 'Smart Ad Engine',
      category: 'PRECISION TARGETING',
      tagline: '500m precision geo-fencing & lookalikes.',
      icon: Target,
      color: 'amber',
      badgeClass: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      description:
        'Constructs multidimensional audience vectors by blending buyer intent signals with real-time geo-coordinates and Lookalike models. Continuously prunes low-converting cohorts to ensure pinpoint 500m precision targeting efficiency.',
      specs: [
        { label: 'Geo-Radius', value: '500m Pinpoint' },
        { label: 'Avg CPC', value: '$0.42 Optimized' },
        { label: 'Pruning', value: 'Real-time Neg' },
      ],
      previewType: 'targeting',
      targetingData: {
        radius: '500m Tech Hub Coordinates',
        lookalike: 'Top 1% High LTV',
        efficiency: 'CPM Reduced 41%',
      },
    },
    {
      id: '05',
      number: '05',
      letter: 'U',
      title: 'Budget Optimizer',
      category: 'CAPITAL EFFICIENCY',
      tagline: 'Feedback loop cuts losers within 3h.',
      icon: Sliders,
      color: 'orange',
      badgeClass: 'text-orange-300 bg-orange-500/10 border-orange-500/30',
      glowColor: 'rgba(249, 115, 22, 0.45)',
      description:
        'Autonomous capital reallocation powered by 3-hour closed feedback loops. The agent tracks click velocity and CPA in real time, automatically killing zero-traction ads and scaling liquid budget behind winning creatives to maximize ROAS.',
      specs: [
        { label: 'Kill Switch', value: '180 Minutes' },
        { label: 'ROAS Lift', value: '+340% Avg' },
        { label: 'Shift Logic', value: '100% Automated' },
      ],
      previewType: 'budget',
      budgetData: {
        currentRoas: '4.8x ROAS',
        reallocated: '+$1,420 to Winner #3',
        status: 'Unprofitable Creatives: Killed',
      },
    },
    {
      id: '06',
      number: '06',
      letter: 'T',
      title: 'Unified Pipeline',
      category: 'INTENT CLASSIFICATION',
      tagline: 'Aggregated AI-scored live inbound stream.',
      icon: Users,
      color: 'amber',
      badgeClass: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      description:
        'Aggregates inbound messages, comments, form submissions, and inquiries across all networks into a single priority stream. Evaluates buyer intent signals in seconds, scoring and routing high-value prospects for immediate conversion.',
      specs: [
        { label: 'Ingest Speed', value: '< 5s Multi-chan' },
        { label: 'Accuracy', value: '98.4% Match' },
        { label: 'Routing', value: 'Tier 1 Priority' },
      ],
      previewType: 'pipeline',
      pipelineData: {
        topLead: 'Enterprise Brand VP (Score: 98)',
        intent: 'Budget Verified > $75k',
        status: 'Queued to AI Closer',
      },
    },
    {
      id: '07',
      number: '07',
      letter: 'E',
      title: '24/7 AI Closer',
      category: 'AUTONOMOUS CONVERSION',
      tagline: 'Sub-30s WhatsApp & DM conversational closing.',
      icon: Bot,
      color: 'orange',
      badgeClass: 'text-orange-300 bg-orange-500/10 border-orange-500/30',
      glowColor: 'rgba(249, 115, 22, 0.45)',
      description:
        'Autonomous conversational closer engages prospects on WhatsApp and DMs in under 30 seconds. Answers technical inquiries, resolves pricing objections, negotiates custom terms, and locks qualified demo calls directly onto calendars.',
      specs: [
        { label: 'Response', value: '< 30s 24/7/365' },
        { label: 'Booking Rate', value: '+68% Lift' },
        { label: 'Calendar', value: 'Google & Outlook' },
      ],
      previewType: 'closer',
      closerData: {
        leadMsg: 'Can you handle enterprise accounts?',
        agentMsg: 'Yes, full multi-brand workspaces. Slotting 15-min walkthrough?',
        status: 'MEETING BOOKED • CALENDAR LOCKED',
      },
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="detailed-steps"
      className="relative min-h-[85vh] lg:h-screen lg:max-h-[850px] flex flex-col justify-center py-6 sm:py-8 lg:py-10 bg-[#050505] overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[650px] h-[500px] bg-orange-600/10 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[450px] bg-amber-600/10 blur-[170px] pointer-events-none rounded-full" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_75%,transparent_100%)] opacity-15 pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 relative z-10 w-full flex flex-col justify-center items-center gap-6 sm:gap-7 lg:gap-8">
        
        {/* ============================================================== */}
        {/* SECTION HEADER: SPEED HEADING + READING EFFECT SUBTEXT        */}
        {/* ============================================================== */}
        <div className="text-center max-w-4xl mx-auto m-0 overflow-hidden">
         

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-[-0.04em] leading-[1.06] mb-2 overflow-hidden">
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
                initial={{ opacity: 0.1, y: 3 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.1, y: 3 }
                }
                transition={{
                  duration: 0.3,
                  delay: 0.32 + i * 0.02,
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
        {/* 7 HORIZONTAL CARDS: "EXECUTE" SPANNING ALL 7 CARDS            */}
        {/* One letter per card (E • X • E • C • U • T • E)                */}
        {/* Zero gap between letters! Fits single screen with 3D flip      */}
        {/* ============================================================== */}
        <div className="w-full relative">
          <div
            ref={rowRef}
            className="flex flex-nowrap lg:grid lg:grid-cols-7 gap-1 sm:gap-1.5 lg:gap-2 w-full overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory lg:overflow-visible"
          >
            {steps.map((step, idx) => {
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
                  <motion.div
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                      width: isFlipped ? '155%' : '100%',
                      x: isFlipped
                        ? idx === 0
                          ? '0%'
                          : idx === steps.length - 1
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
                    {/* 1. FRONT FACE (Continuous Sliced Edge-to-Edge Word)  */}
                    {/* ==================================================== */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      className="absolute inset-0 w-full h-full rounded-2xl border border-white/40 bg-zinc-950/90 p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden shadow-xl hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.06)] hover:shadow-[0_0_25px_rgba(255,255,255,0.18)] transition-all duration-500 group"
                    >
                      {/* Ambient background glow */}
                      <div
                        className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[60px] pointer-events-none opacity-25 group-hover:opacity-80 transition-opacity duration-500"
                        style={{ background: step.glowColor }}
                      />

                      {/* ================================================== */}
                      {/* FRONT MIDDLE: CONTINUOUS SLICED HEADLINE           */}
                      {/* Spans across all 7 cards with zero unnatural gaps  */}
                      {/* Gaps between cards break the text cleanly          */}
                      {/* ================================================== */}
                      <div
                        className="absolute inset-y-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
                        style={{
                          width: rowMetrics.width ? `${rowMetrics.width}px` : '700%',
                          left: rowMetrics.offsets[idx] !== undefined ? `-${rowMetrics.offsets[idx]}px` : `${-idx * 100}%`,
                        }}
                      >
                        <span
                          className="font-extralight tracking-tight text-white/95 group-hover:text-orange-200 group-hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.45)] transition-all duration-500 leading-none select-none whitespace-nowrap"
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
                        
                        <h3 className="text-xs sm:text-sm font-light text-white tracking-tight mt-1 line-clamp-1 group-hover:text-orange-300 transition-colors duration-300">
                          {step.title}
                        </h3>
                       
                      </div>

                    </div>

                    {/* ==================================================== */}
                    {/* 2. BACK FACE (Flipped 3D View: Deep Details & Specs) */}
                    {/* Compact single-screen layout with interactive widget*/}
                    {/* ==================================================== */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                      className="absolute inset-0 w-full h-full rounded-2xl border border-white/60 bg-[#09090b] p-5 sm:p-6 flex flex-col justify-center overflow-hidden shadow-2xl shadow-orange-950/70 select-none"
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

                      {/* BACK CONTENT: Animated Title & Elaborated Narrative */}
                      <div className="relative z-10 flex flex-col gap-2.5 my-auto w-full">
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
                          className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-light tracking-normal"
                        >
                          {step.description}
                        </motion.p>
                      </div>

                    </div>

                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
