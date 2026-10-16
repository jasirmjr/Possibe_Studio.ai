import React from 'react';
import { motion, useTransform, useMotionValueEvent } from 'framer-motion';
import {
  Sparkles,
  Target,
  Bot,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import Button from '../ui/Button';

// ============================================================================
// CORE CAPABILITY METRICS (REPLACES 7 CARDS ON THE RIGHT SIDE)
// ============================================================================
const CORE_METRICS = [
  {
    value: '+340%',
    label: 'ROAS Performance Lift',
    detail: 'Autonomous 3-hour closed feedback loops kill low-traction ads and scale winners.',
    icon: TrendingUp,
    badge: 'CAPITAL EFFICIENCY',
  },
  {
    value: '< 1.2s',
    label: 'Zero-Shot Extraction',
    detail: 'Decomposes brand DNA and value propositions directly from a single URL or brief.',
    icon: Sparkles,
    badge: 'CONCEPT INGESTION',
  },
  {
    value: '500m',
    label: 'Precision Geo-Radius',
    detail: 'Constructs multi-dimensional buyer intent vectors with pinpoint geo-targeting.',
    icon: Target,
    badge: 'SMART AD ENGINE',
  },
  {
    value: '< 30s',
    label: 'Conversational Lead Close',
    detail: '24/7 autonomous closing on WhatsApp and DMs locks qualified meetings to calendar.',
    icon: Bot,
    badge: 'AI CLOSER 24/7',
  },
];

// ============================================================================
// VERTICAL STATIC SCANLINE & GLITCH OVERLAY (EXACT LEFT 50% CENTER SPLIT)
// ============================================================================
function VerticalCenterGlitch() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Traveling vertical scanline */}
      <motion.div
        animate={{ x: ['0%', '100%'] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-orange-500/50 to-transparent blur-[1px]"
      />

      {/* Subtle digital slit scan ripples on the left 50% of the image */}
      <div className="absolute inset-y-0 left-0 w-[50%] flex justify-between opacity-30">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.15, 0.55, 0.15],
              scaleY: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 1.3 + (i % 4) * 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.07,
            }}
            className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-orange-950/40 to-transparent"
          />
        ))}
      </div>

    
    </div>
  );
}

// ============================================================================
// SECTION 3 COMPONENT
// Left white section comes from the LEFT side.
// Right dark section comes from TOP to BOTTOM.
// Both sections completely reach their final position at the EXACT SAME TIME!
// ============================================================================
export default function CapabilitiesWorkflowSection({ scrollYProgress }) {
  // Left half: slides in from LEFT (-100% to 0%) between 0.50 and 0.68
  const leftX = useTransform(scrollYProgress, [0.50, 0.68], ['-100%', '0%'], { clamp: true });

  // Right half: slides in from TOP to BOTTOM (-100% to 0%) between 0.50 and 0.68
  const rightY = useTransform(scrollYProgress, [0.50, 0.68], ['-100%', '0%'], { clamp: true });

  // Left side animated text entrance: FALLING FROM THE TOP (staggered cascade)
  const line1Y = useTransform(scrollYProgress, [0.51, 0.66], [-120, 0], { clamp: true });
  const line1Opacity = useTransform(scrollYProgress, [0.51, 0.64], [0, 1], { clamp: true });

  const line2Y = useTransform(scrollYProgress, [0.53, 0.68], [-140, 0], { clamp: true });
  const line2Opacity = useTransform(scrollYProgress, [0.53, 0.66], [0, 1], { clamp: true });

  const descY = useTransform(scrollYProgress, [0.55, 0.68], [-100, 0], { clamp: true });
  const descOpacity = useTransform(scrollYProgress, [0.55, 0.68], [0, 1], { clamp: true });

  const robotScale = useTransform(scrollYProgress, [0.52, 0.68], [0.94, 1], { clamp: true });
  const robotOpacity = useTransform(scrollYProgress, [0.52, 0.67], [0, 1], { clamp: true });

  // Pointer events: only intercept mouse when section 3 has started entering (> 0.50)
  const [isInteractive, setIsInteractive] = React.useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const active = v >= 0.50;
    setIsInteractive((prev) => (prev !== active ? active : prev));
  });

  return (
    <div
      className="absolute inset-0 z-30 w-full h-full flex flex-col lg:flex-row overflow-hidden pointer-events-none"
    >
      {/* ============================================================== */}
      {/* LEFT PART: PURE PLAIN WHITE BACKGROUND                         */}
      {/* SLIDES IN FROM THE LEFT SIDE                                   */}
      {/* With texts falling from the top & robot image anchored flush   */}
      {/* ============================================================== */}
      <motion.div
        style={{
          x: leftX,
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
        className="relative z-30 w-full lg:w-1/2 h-full bg-white text-zinc-900 flex flex-col justify-between pt-6 sm:pt-8 lg:pt-10 px-6 sm:px-10 lg:px-14 pb-0 border-r border-orange-500/20 overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.3)]"
      >
        {/* Subtle Ambient Laser Edge on Right Side of White Section */}
        <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-orange-500 to-transparent shadow-[2px_0_15px_#ff6b00]" />

        {/* TOP: ANIMATED THIN-FONT HEADING (FALLING FROM TOP) - LAYERED UNDER ROBOT (z-10) */}
        <div className="relative z-10 max-w-lg pt-12 sm:pt-14 lg:pt-14">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.65rem] font-light text-zinc-900 tracking-[-0.03em] leading-[1.12]">
            {/* Line 1: Falling from top */}
            <motion.span
              style={{
                y: line1Y,
                opacity: line1Opacity,
                display: 'block',
              }}
              className="font-thin text-zinc-500"
            >
              Eyes On Tomorrow,
            </motion.span>

            {/* Line 2: Falling from top slightly delayed */}
            <motion.span
              style={{
                y: line2Y,
                opacity: line2Opacity,
                display: 'block',
              }}
              className="font-light text-zinc-950 mt-1"
            >
              We Engineer <strong className="font-semibold text-black">Brands That Grow</strong>
            </motion.span>
          </h2>

          {/* Description: Falling from top */}
          <motion.div
            style={{
              y: descY,
              opacity: descOpacity,
            }}
          >
            <p className="text-xs sm:text-sm font-light text-zinc-500 mt-3 leading-relaxed max-w-sm">
              Zero prompt engineering. Autonomous neural agents synthesize high-converting campaigns and close inbound deals on autopilot.
            </p>
          </motion.div>
        </div>

        {/* CENTER/BOTTOM: Robot Image ANCHORED FLUSH TO BOTTOM EDGE & OVER THE TEXT (z-20) */}
        <div className="absolute bottom-0 inset-x-0 z-20 flex items-end justify-center pointer-events-none">
          <motion.div
            style={{
              scale: robotScale,
              opacity: robotOpacity,
            }}
            className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[510px] aspect-[1241/1214] max-h-[64vh] flex items-end justify-center"
          >
            {/* The robot image with mosaic effect split at the exact vertical center */}
            <img
              src="/images/robot-glitch-centered.png"
              alt="PossibleStudio Autonomous AI Robot"
              className="w-full h-full object-contain object-bottom select-none block"
            />

            {/* Live Center Glitch Scanline Overlay */}
            <VerticalCenterGlitch />
          </motion.div>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* RIGHT PART: SOLID OPAQUE DARK BACKGROUND (#050505)             */}
      {/* SLIDES IN FROM TOP TO BOTTOM                                   */}
      {/* PRESENT FROM THE FIRST SCROLL ONWARDS! NO 7 CARDS!             */}
      {/* High-Impact Performance Metrics & Live Agent Telemetry Console */}
      {/* ============================================================== */}
      <motion.div
        style={{
          y: rightY,
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
        className="relative z-20 w-full lg:w-1/2 h-full bg-[#050505] text-zinc-100 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
      >
        {/* Subtle Ambient Cosmic Lighting */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[450px] bg-orange-600/10 blur-[180px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[350px] bg-amber-600/10 blur-[160px] pointer-events-none rounded-full" />

        {/* Aerospace Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_75%,transparent_100%)] opacity-15 pointer-events-none" />

        {/* TOP HEADER: High-Tech Telemetry Badge & Title */}
        <div className="relative z-10 max-w-lg pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-[10px] font-mono text-orange-400 mb-3 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            AUTONOMOUS PERFORMANCE ENGINE
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-tight leading-[1.12]">
            Precision Intelligence. <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent font-light">
              Closed Deals at Machine Speed.
            </span>
          </h3>

          <p className="text-xs sm:text-sm font-light text-zinc-400 mt-2 leading-relaxed">
            Eliminate prompt friction and manual ad ops. Deploy specialized neural models executing closed-loop marketing arbitrage across all major networks simultaneously.
          </p>
        </div>

        {/* CENTER: 2x2 HIGH-IMPACT METRICS GRID */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-auto py-4">
          {CORE_METRICS.map((metric, idx) => {
            const MetricIcon = metric.icon;

            return (
              <div
                key={idx}
                className="group p-4 sm:p-5 rounded-xl border border-white/10 bg-zinc-950/80 hover:border-orange-500/50 hover:bg-zinc-900/60 transition-all duration-300 relative overflow-hidden shadow-lg shadow-black/40"
              >
                {/* Micro corner ambient glow on hover */}
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] font-mono tracking-wider text-orange-400/90 font-bold uppercase">
                    {metric.badge}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                    <MetricIcon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-none mb-1 group-hover:text-orange-200 transition-colors">
                  {metric.value}
                </div>

                <div className="text-xs font-medium text-zinc-300 tracking-tight mb-1">
                  {metric.label}
                </div>

                <p className="text-[10px] text-zinc-500 font-light leading-snug line-clamp-2">
                  {metric.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM: TELEMETRY STATUS CHIP & ACTION CTA */}
        <div className="relative z-10 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-medium">CORE STATUS:</span>
            <span className="text-orange-400">100% AUTOMATED</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            iconRight={ArrowRight}
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Deploy Agent
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
