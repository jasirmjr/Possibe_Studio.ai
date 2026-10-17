import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const TOTAL_FRAMES = 15;
// Base frame duration in seconds (~12.2 fps => ~1.23s per full 15-frame two-step walk cycle)
const BASE_FRAME_DURATION = 0.082;

/**
 * HumanoidMatrixSection
 * Section 3: High-Fidelity 15-Frame ASCII Walking Humanoid Engine
 * Single-screen fit (100vh), full black heading typography with scroll-reach kinetic animation,
 * project-related minimal texts on positions 2 & 4 directly in background (no cards),
 * zero orange line, zero bottom oval circle.
 */
export default function HumanoidMatrixSection({ isEmbedded = false, isActive = false }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // When embedded, active state is driven by WorkflowSteps scrollProgress;
  // when standalone, it uses useInView with amount: 0.25 (triggers each time).
  const inView = useInView(sectionRef, { amount: 0.25 });
  const effectiveActive = isEmbedded ? isActive : inView;

  // Live telemetry state for continuous subtle motion
  const [telemetry, setTelemetry] = useState({
    stride: 0,
    velocity: '1.24',
    cadence: '12.2',
    frame: '00',
  });

  // Scroll continuation from top section (Section 2 -> Section 3)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Smooth spring physics for natural scroll continuation feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Cinematic scroll transforms for heading continuation
  const headingY = useTransform(smoothProgress, [0, 1], [-70, 0]);
  const headingOpacity = useTransform(smoothProgress, [0, 0.45], [0, 1]);
  const headingScale = useTransform(smoothProgress, [0, 1], [0.92, 1]);

  // Preload all 15 transparent clean walk frames with cache-busting query
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/walk/walk_${i}.png?v=3`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.warn(`Frame ${i} failed to load from /images/walk/walk_${i}.png`);
      };
      imgs.push(img);
    }
  }, []);

  // Main 60fps Canvas Animation Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let lastTime = performance.now();
    let simTime = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      simTime += dt;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Pure Plane White Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Current frame calculation
      const cycleDuration = TOTAL_FRAMES * BASE_FRAME_DURATION;
      const normalizedTime = (simTime % cycleDuration + cycleDuration) % cycleDuration;
      const frameIdx = Math.floor(normalizedTime / BASE_FRAME_DURATION) % TOTAL_FRAMES;
      const cycleProg = normalizedTime / cycleDuration;

      // Update telemetry for continuous micro-motion
      if (Math.floor(currentTime / 80) !== Math.floor((currentTime - dt * 1000) / 80)) {
        setTelemetry({
          stride: Math.round(cycleProg * 100),
          velocity: (1.23 + Math.sin(simTime * 2.8) * 0.04).toFixed(2),
          cadence: (12.2 + Math.cos(simTime * 1.5) * 0.15).toFixed(1),
          frame: frameIdx.toString().padStart(2, '0'),
        });
      }

      const cx = width / 2;
      const cy = height / 2;

      // Perfectly scaled to fit inside single screen height without overflow
      const targetH = Math.min(height * 0.90, 470);
      const targetW = (240 / 360) * targetH;

      // Render Active Walk Frame with crisp monospace nearest-neighbor
      const currentImg = imagesRef.current[frameIdx];
      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        ctx.save();
        ctx.imageSmoothingEnabled = false;

        const drawX = cx - targetW / 2;
        // Subtle vertical bob (1.5px) matching natural walking momentum
        const bob = Math.sin(cycleProg * Math.PI * 4) * 1.5;
        const drawY = cy - targetH / 2 + bob;

        ctx.drawImage(currentImg, drawX, drawY, targetW, targetH);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded]);

  const ContainerTag = isEmbedded ? 'div' : 'section';
  const containerProps = isEmbedded
    ? {
        className:
          'relative w-full h-full pt-20 sm:pt-24 pb-4 bg-white text-zinc-900 overflow-hidden select-none flex flex-col justify-between items-center',
      }
    : {
        ref: sectionRef,
        id: 'capabilities',
        className:
          'relative h-screen min-h-[640px] max-h-screen pt-20 sm:pt-24 pb-4 bg-white text-zinc-900 overflow-hidden select-none flex flex-col justify-between items-center',
      };

  return (
    <ContainerTag {...containerProps}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-between items-center">
        
        {/* ============================================================== */}
        {/* TOP: SCROLL-CONTINUATION ANIMATED HEADING (FULL BLACK)         */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* TOP: SCROLL-REACH ANIMATED HEADING (FULL BLACK)                */}
        {/* ============================================================== */}
        <motion.div
          initial="hidden"
          animate={effectiveActive ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: -36, scale: 0.95, filter: 'blur(8px)' },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="text-center max-w-2xl mx-auto pt-1 flex-shrink-0"
        >
          {/* Heading with continuous scroll-reach reveal - 100% FULL BLACK */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-light text-zinc-950 tracking-[-0.04em] leading-[1.1] overflow-hidden">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="inline-block mr-2.5 sm:mr-3.5"
            >
              Humanoid Form.
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="inline-block font-normal text-zinc-950"
            >
              Algorithmic Precision.
            </motion.span>
          </h2>

          {/* Subtitle with kinetic fade-up */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="text-xs sm:text-sm font-light text-zinc-500 mt-2 max-w-lg mx-auto leading-relaxed"
          >
            Translating high-dimensional market intent into discrete biomechanical execution.
            Continuous real-time ASCII locomotion engine.
          </motion.p>
        </motion.div>

        {/* ============================================================== */}
        {/* CENTER: 3-COLUMN LAYOUT                                        */}
        {/* 2 DETAILS (LEFT) | CENTER CANVAS | 2 DETAILS (RIGHT)           */}
        {/* NO CARDS, PLACED DIRECTLY IN THE BACKGROUND                    */}
        {/* ============================================================== */}
        <div className="relative w-full flex-1 min-h-0 flex items-center justify-between gap-6 my-auto max-w-6xl">
          
          {/* ------------------------------------------------------------ */}
          {/* LEFT SIDE: 2 DETAILS (DIRECTLY ON BACKGROUND WITH ANIMATION) */}
          {/* ------------------------------------------------------------ */}
          <div className="w-64 hidden lg:flex flex-col justify-center gap-10 select-none">
            {/* Left Detail 1 */}
            <motion.div
              initial="hidden"
              animate={effectiveActive ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, x: -55, filter: 'blur(6px)' },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="space-y-1.5 text-left"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
                <span className="text-zinc-950 font-semibold tracking-wider">AUTONOMOUS MARKETING</span>
              </div>
              <motion.p
                animate={{ opacity: effectiveActive ? [0.75, 1, 0.75] : 0 }}
                transition={{
                  opacity: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
                }}
                className="text-xs text-zinc-600 font-light leading-relaxed"
              >
                Continuous market sensing and creative synthesis. Real-time neural agents deploying multi-channel campaigns with zero manual friction.
              </motion.p>
            </motion.div>

            {/* Left Detail 2 */}
            <motion.div
              initial="hidden"
              animate={effectiveActive ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, x: -55, filter: 'blur(6px)' },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.75, delay: 0.40, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="space-y-1.5 text-left"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
                <span className="text-zinc-950 font-semibold tracking-wider">AUDIENCE INTELLIGENCE</span>
              </div>
              <motion.p
                animate={{ opacity: effectiveActive ? [0.75, 1, 0.75] : 0 }}
                transition={{
                  opacity: { repeat: Infinity, duration: 5.0, ease: 'easeInOut', delay: 0.5 },
                }}
                className="text-xs text-zinc-600 font-light leading-relaxed"
              >
                Predictive demographic clustering and algorithmic intent detection capturing verified high-value conversion signals.
              </motion.p>
            </motion.div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* CENTER: CLEAN ASCII WALKING CYBORG CANVAS                    */}
          {/* ------------------------------------------------------------ */}
          <motion.div
            initial="hidden"
            animate={effectiveActive ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, scale: 0.94 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="relative flex-1 h-full max-w-xl min-h-0 flex items-center justify-center"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full block select-none bg-white"
              title="Biomechanical ASCII Locomotion Engine"
            />
          </motion.div>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT SIDE: 2 DETAILS (DIRECTLY ON BACKGROUND WITH ANIMATION)*/}
          {/* ------------------------------------------------------------ */}
          <div className="w-64 hidden lg:flex flex-col justify-center gap-10 select-none">
            {/* Right Detail 1 */}
            <motion.div
              initial="hidden"
              animate={effectiveActive ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, x: 55, filter: 'blur(6px)' },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.75, delay: 0.30, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="space-y-1.5 text-left"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
                <span className="text-zinc-950 font-semibold tracking-wider">7-STAGE PIPELINE</span>
              </div>
              <motion.p
                animate={{ opacity: effectiveActive ? [0.75, 1, 0.75] : 0 }}
                transition={{
                  opacity: { repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.3 },
                }}
                className="text-xs text-zinc-600 font-light leading-relaxed"
              >
                Full lifecycle automation from audience intelligence and copy synthesis to conversational qualification and client conversion.
              </motion.p>
            </motion.div>

            {/* Right Detail 2 */}
            <motion.div
              initial="hidden"
              animate={effectiveActive ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, x: 55, filter: 'blur(6px)' },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="space-y-1.5 text-left"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
                <span className="text-zinc-950 font-semibold tracking-wider">REAL-TIME OPTIMIZATION</span>
              </div>
              <motion.p
                animate={{ opacity: effectiveActive ? [0.75, 1, 0.75] : 0 }}
                transition={{
                  opacity: { repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.8 },
                }}
                className="text-xs text-zinc-600 font-light leading-relaxed"
              >
                Self-balancing capital allocation and multi-variant creative refinement delivering peak operational ROI across channels.
              </motion.p>
            </motion.div>
          </div>

        </div>

       

      </div>
    </ContainerTag>
  );
}
