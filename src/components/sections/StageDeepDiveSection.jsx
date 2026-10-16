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

  // Robust, native scroll tracking across all 7 stages:
  // 450vh total height (approx 65vh scroll per stage) ensures smooth, natural stepping on desktop & mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Distribute 7 stages evenly across 0..1
    const stageIndex = Math.min(STAGES.length - 1, Math.max(0, Math.floor(latest * STAGES.length)));
    setActiveStage(stageIndex);
  });

  // Parity rule:
  // First level (index 0, Level 1): image on LEFT
  // Alternative levels (index 0, 2, 4, 6): image on LEFT
  // Other levels (index 1, 3, 5): image on RIGHT and FLIPPED horizontally
  const isImageOnLeft = activeStage % 2 === 0;
  const currentStage = STAGES[activeStage] || STAGES[0];

  const handleStageClick = (idx) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    const containerTop = containerRef.current.offsetTop;
    const targetScroll = containerTop + (idx / (STAGES.length - 1)) * totalHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="stages-deep-dive"
      className="relative bg-white text-zinc-900"
      style={{ height: '480vh' }}
    >
      {/* ============================================================== */}
      {/* PINNED VIEWPORT: Stays sticky while user scrolls through 7 levels*/}
      {/* ============================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-end pt-0 pb-0 px-4 sm:px-6 lg:px-12 overflow-hidden bg-white select-none">
        
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[650px] h-[450px] bg-orange-500/10 blur-[150px] pointer-events-none rounded-full will-change-transform" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[450px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full will-change-transform" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

        {/* ============================================================== */}
        {/* MAIN STAGE SHOWCASE: Zero-lag GPU Glide + Side-Screen Heading  */}
        {/* ============================================================== */}
        <div className="relative z-10 max-w-[1680px] mx-auto w-full h-full flex items-end pb-0">
          <div className="w-full h-full relative flex items-end pb-0">
            
            {/* ========================================================== */}
            {/* 1. AGENT IMAGE: GPU COMPOSITOR GLIDE (ZERO LAYOUT LAG)     */}
            {/* Height tuned to 78vh (max 760px) so helmet is never clipped */}
            {/* ========================================================== */}
            <motion.div
              animate={{
                x: isImageOnLeft ? '0%' : '100%',
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-0 left-0 w-full lg:w-1/2 h-full flex items-end justify-center pointer-events-none pb-0 mb-0 z-10 will-change-transform"
            >
              {/* Concentric Neon Halo */}
              <div className="absolute w-[450px] h-[450px] sm:w-[580px] sm:h-[580px] rounded-full bg-gradient-to-tr from-orange-500/20 via-amber-400/15 to-orange-400/20 blur-[100px] pointer-events-none -bottom-10" />

              {/* Agent Figure: Perfectly scaled, full helmet visible, 0 bottom gap */}
              <motion.div
                animate={{
                  scaleX: isImageOnLeft ? 1 : -1,
                }}
                transition={{
                  scaleX: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                }}
                style={{ transformOrigin: 'bottom center' }}
                className="relative flex justify-center items-end self-end select-none pb-0 mb-0 will-change-transform"
              >
                <img
                  src="/images/orenge-1.webp"
                  alt={`Autonomous Agent - Stage ${currentStage.number}`}
                  style={{ height: '78vh', maxHeight: '760px' }}
                  className="w-auto object-contain object-bottom select-none block drop-shadow-[0_20px_50px_rgba(249,115,22,0.3)] pointer-events-none pb-0 mb-0 align-bottom"
                />
              </motion.div>
            </motion.div>

            {/* ========================================================== */}
            {/* 2. DETAILED CONTENT COLUMN: Dynamic Left/Right Alignment   */}
            {/* Heading swoops in from side of screen, description current */}
            {/* ========================================================== */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-end h-full">
              <div
                className={`w-full py-6 lg:py-12 mb-6 sm:mb-10 lg:mb-16 relative z-20 flex flex-col justify-center self-center transition-all duration-300 ${
                  isImageOnLeft
                    ? 'lg:col-start-2 items-end text-right'
                    : 'lg:col-start-1 items-start text-left'
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStage.number}
                    className={`space-y-5 lg:space-y-6 max-w-2xl flex flex-col ${
                      isImageOnLeft ? 'items-end text-right' : 'items-start text-left'
                    }`}
                  >
                    {/* Main Headline: COMING FROM THE SIDE OF THE SCREEN */}
                    <motion.h3
                      initial={{
                        opacity: 0,
                        x: isImageOnLeft ? 320 : -320,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: isImageOnLeft ? 180 : -180,
                      }}
                      transition={{
                        duration: 0.65,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extralight text-zinc-950 tracking-[-0.03em] leading-[1.12] ${
                        isImageOnLeft ? 'text-right' : 'text-left'
                      }`}
                    >
                      {currentStage.title}
                    </motion.h3>

                    {/* Narrative Body: CURRENT SMOOTH FADE-UP ANIMATION */}
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`text-sm sm:text-base lg:text-lg text-zinc-600 font-light leading-relaxed max-w-2xl ${
                        isImageOnLeft ? 'text-right' : 'text-left'
                      }`}
                    >
                      {currentStage.description}
                    </motion.p>

                    {/* Detailed Operational Points: CURRENT SMOOTH STAGGER */}
                    <div
                      className={`space-y-3.5 pt-1 max-w-2xl w-full flex flex-col ${
                        isImageOnLeft ? 'items-end text-right' : 'items-start text-left'
                      }`}
                    >
                      {currentStage.points.map((pt, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.15 + i * 0.07,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`flex items-start gap-2.5 max-w-xl ${
                            isImageOnLeft
                              ? 'flex-row-reverse text-right'
                              : 'flex-row text-left'
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
                          <div className={isImageOnLeft ? 'text-right' : 'text-left'}>
                            <span className="text-xs sm:text-sm font-semibold text-zinc-900 tracking-wide">
                              {pt.label}:{' '}
                            </span>
                            <span className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
                              {pt.detail}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* Minimalist Stage Indicator Dots */}
        <div className="relative z-20 max-w-[1680px] mx-auto w-full flex items-center justify-between pb-4 border-t border-zinc-200 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            {STAGES.map((s, idx) => {
              const isActive = idx === activeStage;
              return (
                <button
                  key={s.number}
                  onClick={() => handleStageClick(idx)}
                  className={`transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                      : 'w-2 h-1.5 rounded-full bg-zinc-200 hover:bg-zinc-400'
                  }`}
                  aria-label={`Jump to Stage ${s.number}`}
                />
              );
            })}
          </div>
          <span className="text-zinc-500 font-mono text-xs">
            LEVEL <span className="text-zinc-950 font-bold">{currentStage.number}</span> / 07
          </span>
        </div>

      </div>
    </section>
  );
}

