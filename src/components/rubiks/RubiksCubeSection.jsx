import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import RubiksCubeCanvas from './RubiksCubeCanvas';

/**
 * RubiksCubeSection
 * Interactive scroll-driven 3D Rubik's Cube in WebGL.
 * Matches specifications from image_43.png, image_44.png, image_45.png, and image_46.png:
 * - Flat Pale Sage background (#DCE3A5)
 * - 3x3x3 Rubik's cube with rounded chamfer edges and glossy cobalt blue plastic
 * - Distinct 8-bit pixel art patterns on Yellow, Royal Blue, White, and Black tiles
 * - Physically grounded elastic easing, inertia overshoot, and micro-misalignments
 * - Multi-axial scroll triggers (Triggers 1 to 4)
 * - Interactive scrub timeline & draggable WebGL orbit
 */

const PHASES = [
  {
    id: '01',
    title: 'Top Slice Spin',
    desc: 'Horizontal slice rotates 90° clockwise with mechanical spring tension.',
    range: '0% — 25%',
    targetProgress: 0.18,
  },
  {
    id: '02',
    title: 'Body Tilt Axis',
    desc: 'Full 3D shell tumble & right tier twist catching specular glints.',
    range: '25% — 50%',
    targetProgress: 0.38,
  },
  {
    id: '03',
    title: 'Column Scramble',
    desc: 'Sequential column and base row twists scramble pixel artwork.',
    range: '50% — 75%',
    targetProgress: 0.63,
  },
  {
    id: '04',
    title: 'Flush Align Lock',
    desc: 'Front tier lock snaps flush into a pristine aligned 3×3 matrix.',
    range: '75% — 100%',
    targetProgress: 0.90,
  },
];

export default function RubiksCubeSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);

  // Track scroll through the 350vh pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring physics for fluid scrub responsiveness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    setScrollProgress(latest);
    let pIdx = 0;
    if (latest < 0.25) pIdx = 0;
    else if (latest < 0.5) pIdx = 1;
    else if (latest < 0.75) pIdx = 2;
    else pIdx = 3;
    setActivePhaseIdx(pIdx);
  });

  // Click to quick-jump/scrub to a specific phase
  const handlePhaseClick = (targetProg) => {
    if (!containerRef.current) return;
    const totalScroll = containerRef.current.scrollHeight - window.innerHeight;
    const top = containerRef.current.offsetTop;
    window.scrollTo({
      top: top + totalScroll * targetProg,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={containerRef}
      id="rubiks"
      className="relative z-20 text-zinc-900 select-none"
      style={{ height: '350vh', backgroundColor: '#DCE3A5' }}
    >
      {/* ============================================================== */}
      {/* PINNED VIEWPORT: Sticky across the 4 scroll triggers           */}
      {/* ============================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#DCE3A5]">
        
        {/* Subtle Halftone Dot Overlay (Background Props) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(11, 11, 11, 0.45) 1.5px, transparent 1.5px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(circle at center, transparent 30%, black 85%)',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent 30%, black 85%)',
          }}
        />

        {/* Floating Geometric UI Markers (image_43.png & image_44.png) */}
        <div className="absolute inset-0 pointer-events-none z-10 flex justify-between p-8 sm:p-12 font-mono text-xs text-zinc-800/70">
          <div className="flex flex-col gap-2">
            <span>[ + ] 3D_PHYSICAL_MATRIX</span>
            <span>AXIS: MULTI-TIER ROTATION</span>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <span>BG: #DCE3A5 // PALE_SAGE</span>
            <span>SPECULAR_GLINT: ENABLED</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TOP: TITLE & NARRATIVE HEADER                                  */}
        {/* ============================================================== */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-16 sm:pt-20 text-center flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950/10 text-zinc-950 font-mono text-xs tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
            <span>INTERACTIVE SCROLL WEBGL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-zinc-950 tracking-tight leading-[1.05]">
            Rubik’s Cube.
          </h2>
          <p className="text-xs sm:text-sm font-light text-zinc-800 max-w-md mx-auto mt-1 leading-relaxed">
            Multi-axial layer rotations governed by mechanical inertia, elastic tension, and micro-aligned pixel glyphs.
          </p>
        </div>

        {/* ============================================================== */}
        {/* CENTER: 3D WEBGL RUBIK'S CUBE CANVAS                           */}
        {/* ============================================================== */}
        <div className="relative flex-1 w-full min-h-0 flex items-center justify-center">
          <RubiksCubeCanvas
            scrollProgress={scrollProgress}
            onPhaseChange={setActivePhaseIdx}
            interactive={true}
          />
        </div>

        {/* ============================================================== */}
        {/* BOTTOM: INTERACTIVE SCRUB TIMELINE (4 PHASES)                  */}
        {/* ============================================================== */}
        <div className="relative z-20 max-w-5xl mx-auto w-full px-4 sm:px-6 pb-6 flex-shrink-0 flex flex-col items-center">
          {/* Interactive Drag Hint Pill */}
          <div className="mb-2.5 pointer-events-none flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950/10 backdrop-blur-sm text-[11px] font-mono text-zinc-800 shadow-sm">
            <svg className="w-3.5 h-3.5 animate-pulse text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>SCROLL TO SCRUB &bull; DRAG TO ORBIT</span>
          </div>

          {/* Progress Scrub Line */}
          <div className="w-full h-1 bg-zinc-950/15 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-blue-600 transition-all duration-100 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
          </div>

          {/* 4 Interactive Phase Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
            {PHASES.map((phase, idx) => {
              const isActive = activePhaseIdx === idx;
              return (
                <button
                  key={phase.id}
                  onClick={() => handlePhaseClick(phase.targetProgress)}
                  className={`text-left p-2.5 sm:p-3 rounded-xl transition-all duration-300 border ${
                    isActive
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-lg scale-[1.02]'
                      : 'bg-white/60 hover:bg-white/90 text-zinc-800 border-zinc-950/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={isActive ? 'text-blue-400 font-bold' : 'text-zinc-600'}>
                      {phase.id} // {phase.range}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-medium tracking-tight">
                    {phase.title}
                  </div>
                  <div
                    className={`text-[10px] leading-tight line-clamp-1 mt-0.5 ${
                      isActive ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {phase.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
