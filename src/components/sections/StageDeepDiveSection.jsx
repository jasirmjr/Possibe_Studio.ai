import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Layers,
  ChevronDown
} from 'lucide-react';

const STAGES = [
  {
    number: '01',
    category: 'Market Reconnaissance',
    title: 'Zero-Prompt Audience & Competitor Inception',
    eyebrow: 'Autonomous Reconnaissance',
    description:
      'The agent continuously crawls live ad libraries across Meta, TikTok, and Google, reverse-engineering top-converting hooks, pricing models, and competitor fatigue points without human input.',
    points: [
      {
        label: 'Competitor Intelligence',
        detail: 'Synthesizes over 100,000 active creatives to extract winning copy hooks, visual angles, and audience sentiment shifts in real time.'
      },
      {
        label: 'Audience Persona Inception',
        detail: 'Builds comprehensive multi-dimensional psychological buyer profiles tailored specifically to your product category and pricing structure.'
      },
      {
        label: 'Instant Brief Synthesis',
        detail: 'Translates brand positioning and target objectives into actionable creative briefs ready for immediate generative asset synthesis.'
      }
    ],
    telemetry: {
      latency: '240ms',
      engine: 'GPT-4o + Gemini 1.5 Pro',
      autonomy: '100% Autonomous'
    }
  },
  {
    number: '02',
    category: 'Asset Generation',
    title: 'Multi-Modal Generative Creative Studio',
    eyebrow: 'Algorithmic Production',
    description:
      'Scales high-impact creative production instantly. Generates dynamic video storyboards, high-resolution lifestyle imagery, and conversion-optimized ad copy tailored for native feed formats.',
    points: [
      {
        label: 'Dynamic Motion & Video',
        detail: 'Renders 9:16 vertical and 16:9 widescreen video assets with synchronized synthetic voiceovers, captions, and kinetic typography.'
      },
      {
        label: 'Combinatorial Copy Matrix',
        detail: 'Produces 50+ headline variations, emotional hooks, and calls-to-action per segment to maximize early CTR and click elasticity.'
      },
      {
        label: 'Format Adaptation',
        detail: 'Automatically reformats and reframes every creative asset for Instagram Reels, TikTok Feeds, Google Performance Max, and LinkedIn.'
      }
    ],
    telemetry: {
      latency: '< 45s Render',
      engine: 'Midjourney API + ElevenLabs',
      autonomy: 'Zero Human Edits'
    }
  },
  {
    number: '03',
    category: 'Network Dispatch',
    title: 'Omni-Channel Programmatic API Dispatch',
    eyebrow: 'Unified Ingestion',
    description:
      'Direct integration through enterprise API tokens into Meta Ads Manager, TikTok Business Center, Google Ads, and LinkedIn Campaign Manager—dispatching fully constructed campaigns in seconds.',
    points: [
      {
        label: 'Direct API Injection',
        detail: 'Bypasses slow manual dashboard setups, programmatically building campaigns, ad sets, budget structures, and pixel events.'
      },
      {
        label: 'Server-Side CAPI Sync',
        detail: 'Ensures robust first-party tracking via Conversions API (CAPI) and encrypted token exchanges to bypass third-party cookie loss.'
      },
      {
        label: 'Cross-Network Orchestration',
        detail: 'Coordinates spend velocity across networks simultaneously to prevent cannibalization and maximize unified frequency.'
      }
    ],
    telemetry: {
      latency: '0.8s Dispatch',
      engine: 'OAuth 2.0 Enterprise CAPI',
      autonomy: 'Direct Injection'
    }
  },
  {
    number: '04',
    category: 'Budget Optimization',
    title: 'Real-Time Algorithmic Bidding & Arbitrage',
    eyebrow: 'Sub-Second Allocation',
    description:
      'Monitors impression velocity, cost-per-click, and acquisition costs 24 hours a day. Automatically reallocates live spend from decaying ads to peak performers in sub-second intervals.',
    points: [
      {
        label: 'Micro-Budget Reallocation',
        detail: 'Continuously shifts capital toward the top 5% highest-performing ad sets every 180 seconds across active ad accounts.'
      },
      {
        label: 'Instant Kill-Switch',
        detail: 'Automatically terminates underperforming variants when cost-per-lead exceeds predefined algorithmic safety guardrails.'
      },
      {
        label: 'Dynamic Bid Hedging',
        detail: 'Modifies target ROAS and bid caps to seize low-competition auction timeframes and reduce blended customer acquisition cost.'
      }
    ],
    telemetry: {
      latency: '180s Cycle',
      engine: 'Bayesian Dynamic Pricing',
      autonomy: 'Continuous Safeguard'
    }
  },
  {
    number: '05',
    category: 'Targeting Precision',
    title: 'Predictive Audience Clustering & GeoFencing',
    eyebrow: 'Behavioral Sharding',
    description:
      'Partitions incoming traffic signals into precise behavioral clusters. Automatically tightens lookalikes, applies high-intent geographic bid modifiers, and excludes exhausted audiences.',
    points: [
      {
        label: 'Vectorized Lookalike Modeling',
        detail: 'Identifies high-propensity buyers through continuous mathematical clustering of purchase timing and engagement depth.'
      },
      {
        label: 'Hyper-Local GeoFencing',
        detail: 'Dynamically amplifies ad spend in regions and zip codes showing real-time conversion spikes while starving non-converting territories.'
      },
      {
        label: 'Audience Fatigue Defense',
        detail: 'Suppresses frequency saturation automatically by cycling lookalike tiers before ad burnout and CPM penalties occur.'
      }
    ],
    telemetry: {
      latency: 'Real-Time Sync',
      engine: 'Vector Embedding DB',
      autonomy: 'Predictive Targeting'
    }
  },
  {
    number: '06',
    category: 'Pipeline Closing',
    title: 'Autonomous 24/7 AI Lead Closer & Qualification',
    eyebrow: 'Zero-Latency Engagement',
    description:
      'Engages incoming leads within 30 seconds of form submission. The conversational AI closer conducts natural voice and text interactions across WhatsApp, SMS, and email to qualify and book sales calls.',
    points: [
      {
        label: 'Sub-30s Response Velocity',
        detail: 'Contacts high-intent prospects while your brand is top-of-mind, boosting contact rates by up to 390% compared to human teams.'
      },
      {
        label: 'Deep Objection Handling',
        detail: 'Answers technical inquiries, evaluates budget criteria, and addresses customer hesitations with calibrated conversational fluency.'
      },
      {
        label: 'Native CRM Synchronization',
        detail: 'Directly syncs call notes, verified qualification metrics, and booked appointments into Salesforce, HubSpot, and Slack.'
      }
    ],
    telemetry: {
      latency: '< 30s Contact',
      engine: 'Realtime Voice + NLP Closer',
      autonomy: 'Fully Autonomous'
    }
  },
  {
    number: '07',
    category: 'Self-Evolution',
    title: 'Closed-Loop Bayesian Synthesis & Scaled Learning',
    eyebrow: 'Recursive Growth',
    description:
      'Every click, conversion, and closed deal feeds back into the agent’s neural core. What works today directly guides tomorrow’s campaign creation, building an exponentially smarter marketing machine.',
    points: [
      {
        label: 'Multi-Touch Attribution',
        detail: 'Reconciles real CRM revenue back to the original creative and platform impression, eliminating attribution ambiguity.'
      },
      {
        label: 'Evolutionary Creative Refinement',
        detail: 'Identifies winning visual syntax and semantic patterns, automatically generating successor variants with higher predicted ROAS.'
      },
      {
        label: 'Exponential Scale Advantage',
        detail: 'The platform compounds efficiency over time, continuously reducing customer acquisition cost as campaign volume expands.'
      }
    ],
    telemetry: {
      latency: 'Hourly Feedback',
      engine: 'Reinforcement Learning RLHF',
      autonomy: 'Self-Compounding'
    }
  }
];

export default function StageDeepDiveSection() {
  const containerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  // Scroll mapping: 700vh tall container maps to 7 stages
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Distribute 7 stages evenly across 0..1
    const stageIndex = Math.min(6, Math.max(0, Math.floor(latest * 7)));
    setActiveStage(stageIndex);
  });

  const currentStage = STAGES[activeStage];
  
  // Parity rule:
  // First level (index 0, Level 1): image on LEFT
  // Alternative levels (index 0, 2, 4, 6): image on LEFT
  // Other levels (index 1, 3, 5): image on RIGHT and FLIPPED horizontally
  const isImageOnLeft = activeStage % 2 === 0;

  const handleStepJump = (idx) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    const containerTop = containerRef.current.offsetTop;
    const targetScroll = containerTop + (idx / 6) * totalHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="detailed-steps"
      className="relative bg-[#050505] text-zinc-100"
      style={{ height: '700vh' }}
    >
      {/* ============================================================== */}
      {/* PINNED VIEWPORT: Stays sticky while user scrolls through 700vh */}
      {/* ============================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 sm:py-16 px-4 sm:px-8 lg:px-14 overflow-hidden bg-[#050505] select-none">
        
        {/* Background ambient lighting */}
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[650px] h-[450px] bg-purple-600/10 blur-[170px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[450px] bg-cyan-600/10 blur-[170px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_70%,transparent_100%)] opacity-15 pointer-events-none" />

        {/* ============================================================== */}
        {/* TOP BAR: Header Eyebrow & Live Stage Progress Scrubber          */}
        {/* ============================================================== */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-purple-400">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              STAGE EXECUTION BLUEPRINT
            </span>
            <span className="text-xs font-mono text-zinc-400 hidden md:inline-block">
              Continuous Protocol
            </span>
          </div>

          {/* Interactive Stage Steps Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {STAGES.map((s, idx) => {
              const isActive = idx === activeStage;
              const isPast = idx < activeStage;
              return (
                <button
                  key={s.number}
                  onClick={() => handleStepJump(idx)}
                  className={`group flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : isPast
                      ? 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800'
                      : 'bg-zinc-950 text-zinc-600 hover:text-zinc-400 border border-zinc-900'
                  }`}
                  aria-label={`Jump to Stage ${s.number}`}
                >
                  <span>{s.number}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse hidden sm:inline-block" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* MAIN STAGE SHOWCASE: Alternating Image & Detailed Content      */}
        {/* Level 1: Image Left, Text Right                                */}
        {/* Level 2: Image Right (Flipped), Text Left                      */}
        {/* NO SUB-CARDS USED - PURE CLEAN EDITORIAL TYPOGRAPHY            */}
        {/* ============================================================== */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex items-center my-auto py-4">
          <div
            className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center transition-all duration-700`}
          >
            {/* ========================================================== */}
            {/* AGENT IMAGE COLUMN (Moves smoothly, flips horizontally)    */}
            {/* ========================================================== */}
            <motion.div
              layout
              transition={{
                layout: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
              }}
              className={`lg:col-span-5 flex items-center justify-center relative ${
                isImageOnLeft ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              {/* Concentric Neon Halo behind Agent */}
              <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-purple-600/25 via-indigo-600/15 to-cyan-500/20 blur-[100px] pointer-events-none" />

              {/* Agent Figure with continuous subtle floating and horizontal flip */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scaleX: isImageOnLeft ? 1 : -1,
                }}
                transition={{
                  y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  scaleX: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="relative flex items-center justify-center cursor-pointer select-none"
              >
                <img
                  src="/images/Cropped.png"
                  alt={`Autonomous Agent - Stage ${currentStage.number}`}
                  className="w-auto h-[48vh] sm:h-[56vh] lg:h-[62vh] max-h-[600px] object-contain drop-shadow-[0_20px_60px_rgba(168,85,247,0.4)] select-none pointer-events-none"
                />
              </motion.div>
            </motion.div>

            {/* ========================================================== */}
            {/* DETAILED CONTENT COLUMN: Pure typography, NO sub-cards     */}
            {/* ========================================================== */}
            <div
              className={`lg:col-span-7 flex flex-col justify-center ${
                isImageOnLeft ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.number}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5 lg:space-y-6"
                >
                  {/* Category Pill & Protocol Header */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-purple-400 bg-purple-950/40 border border-purple-500/30 px-3 py-1 rounded-full">
                      Stage {currentStage.number} • {currentStage.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Level {activeStage + 1} of 07
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extralight text-white tracking-[-0.03em] leading-[1.12]">
                    {currentStage.title}
                  </h3>

                  {/* Narrative Body */}
                  <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl">
                    {currentStage.description}
                  </p>

                  {/* Detailed Operational Points (Clean list, NO nested sub-cards) */}
                  <div className="space-y-3.5 pt-1 max-w-2xl">
                    {currentStage.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        <div className="flex-1">
                          <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
                            {pt.label}:{' '}
                          </span>
                          <span className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                            {pt.detail}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Telemetry Status Line (Minimal inline stats, NO sub-cards) */}
                  <div className="pt-4 border-t border-zinc-800/70 flex flex-wrap items-center gap-y-2 gap-x-6 sm:gap-x-8 text-xs font-mono">
                    <div>
                      <span className="text-zinc-500">LATENCY:</span>{' '}
                      <span className="text-purple-300 font-medium">{currentStage.telemetry.latency}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">ENGINE:</span>{' '}
                      <span className="text-cyan-300 font-medium">{currentStage.telemetry.engine}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">AUTONOMY:</span>{' '}
                      <span className="text-emerald-400 font-medium">{currentStage.telemetry.autonomy}</span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM BAR: Scroll Navigation Prompt & Level Counter           */}
        {/* ============================================================== */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-zinc-800/60 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span className="text-zinc-400">Scroll down to load next stage</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 animate-bounce ml-0.5" />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-400">
              LEVEL <span className="text-white font-semibold">{currentStage.number}</span> / 07
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
