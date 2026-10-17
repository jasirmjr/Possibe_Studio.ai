import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const TOTAL_FRAMES = 15;
const BASE_FRAME_DURATION = 0.082;

/**
 * HumanoidMatrixSection
 * Section 3: High-Fidelity 15-Frame ASCII Walking Humanoid Engine
 * With dynamic scroll exit physics:
 * - 25° clockwise tilt to the right
 * - All text letters and ASCII human dots break apart, slide and fall with gravity
 * - Dumped and piled up into a dense physical heap in the bottom-right corner
 */
export default function HumanoidMatrixSection({
  isEmbedded = false,
  isActive = false,
  destroyProgress = 0,
}) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const destroyCanvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const inView = useInView(sectionRef, { amount: 0.25 });
  const effectiveActive = isEmbedded ? isActive : inView;

  const activeDestroy = destroyProgress || 0;
  const activeDestroyRef = useRef(activeDestroy);
  activeDestroyRef.current = activeDestroy;

  // Preload all 15 transparent walk frames
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
      imgs.push(img);
    }
  }, []);

  // 1. Center Walking Cyborg Canvas Loop
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

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      const cycleDuration = TOTAL_FRAMES * BASE_FRAME_DURATION;
      const normalizedTime = (simTime % cycleDuration + cycleDuration) % cycleDuration;
      const frameIdx = Math.floor(normalizedTime / BASE_FRAME_DURATION) % TOTAL_FRAMES;
      const cycleProg = normalizedTime / cycleDuration;

      const cx = width / 2;
      const cy = height / 2;

      const targetH = Math.min(height * 0.90, 470);
      const targetW = (240 / 360) * targetH;

      const currentImg = imagesRef.current[frameIdx];
      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        ctx.save();
        ctx.imageSmoothingEnabled = false;

        const drawX = cx - targetW / 2;
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

  // 2. Full-Bleed Destruction & Dumped Corner Canvas Loop
  useEffect(() => {
    const canvas = destroyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let particles = [];
    let lastW = 0;
    let lastH = 0;

    // Deterministic particle generator matching all texts and the ASCII human
    function buildParticles(W, H) {
      const list = [];
      let seed = 1337;
      function rnd() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      }

      // Corner dump target region (bottom-right)
      const pileBaseX = W - Math.min(W * 0.28, 320);
      const pileBaseY = H - Math.min(H * 0.26, 220);

      function add(char, x0, y0, font, color, baseDelay, targetXOff, targetYOff) {
        // Minimal delay (0.00 to 0.05) for sudden, simultaneous drop
        const pStart = Math.min(0.05, baseDelay * 0.15 + rnd() * 0.02);
        const x1 = pileBaseX + targetXOff + (rnd() - 0.5) * 36;
        const y1 = pileBaseY + targetYOff + (rnd() - 0.5) * 28;
        const targetRot = (rnd() - 0.5) * 2.2;
        const spinSpeed = (rnd() - 0.5) * 4.5;
        const lateralSway = (rnd() - 0.5) * 22;

        list.push({
          char,
          x0,
          y0,
          x1,
          y1,
          font,
          color,
          pStart,
          targetRot,
          spinSpeed,
          lateralSway,
        });
      }

      // 1. Heading Line 1: "Humanoid Form."
      const head1 = "Humanoid Form.";
      const head1StartX = W * 0.5 - 230;
      const head1Y = H * 0.15;
      const headFont = `bold ${Math.round(Math.min(W * 0.03, 38))}px Inter, sans-serif`;
      for (let i = 0; i < head1.length; i++) {
        if (head1[i] === ' ') continue;
        add(head1[i], head1StartX + i * 22, head1Y, headFont, '#09090b', 0.03 + i * 0.008, 15 + (i % 5) * 45, 60 + Math.floor(i / 5) * 32);
      }

      // 2. Heading Line 2: "Algorithmic Precision."
      const head2 = "Algorithmic Precision.";
      const head2StartX = W * 0.5 + 40;
      const head2Font = `${Math.round(Math.min(W * 0.03, 38))}px Inter, sans-serif`;
      for (let i = 0; i < head2.length; i++) {
        if (head2[i] === ' ') continue;
        add(head2[i], head2StartX + i * 18, head1Y, head2Font, '#09090b', 0.06 + i * 0.008, 120 + (i % 6) * 28, 40 + Math.floor(i / 6) * 30);
      }

      // 3. Subtitle words
      const subWords = ["Translating", "market", "intent", "discrete", "biomechanical", "execution.", "Continuous", "real-time", "ASCII", "engine."];
      subWords.forEach((word, idx) => {
        const wx = W * 0.5 + (idx - 5) * 58;
        const wy = H * 0.22;
        add(word, wx, wy, '12px Inter, sans-serif', '#71717a', 0.10 + idx * 0.012, 50 + (idx % 4) * 50, 115 + Math.floor(idx / 4) * 24);
      });

      // 4. Left Detail 1: "AUTONOMOUS MARKETING"
      const left1Tokens = ["AUTONOMOUS", "MARKETING", "Continuous", "market", "sensing", "creative", "synthesis", "neural", "agents", "zero", "friction."];
      left1Tokens.forEach((token, idx) => {
        const tx = W * 0.16 + (idx % 2) * 55;
        const ty = H * 0.40 + Math.floor(idx / 2) * 24;
        add(token, tx, ty, idx < 2 ? 'bold 11px monospace' : '11px Inter, sans-serif', idx < 2 ? '#09090b' : '#52525b', 0.02 + idx * 0.015, 25 + (idx % 5) * 44, 145 + Math.floor(idx / 5) * 22);
      });

      // 5. Left Detail 2: "AUDIENCE INTELLIGENCE"
      const left2Tokens = ["AUDIENCE", "INTELLIGENCE", "Predictive", "demographic", "clustering", "intent", "detection", "verified", "conversion."];
      left2Tokens.forEach((token, idx) => {
        const tx = W * 0.16 + (idx % 2) * 55;
        const ty = H * 0.60 + Math.floor(idx / 2) * 24;
        add(token, tx, ty, idx < 2 ? 'bold 11px monospace' : '11px Inter, sans-serif', idx < 2 ? '#09090b' : '#52525b', 0.05 + idx * 0.015, 45 + (idx % 4) * 45, 170 + Math.floor(idx / 4) * 20);
      });

      // 6. Right Detail 1: "7-STAGE PIPELINE"
      const right1Tokens = ["7-STAGE", "PIPELINE", "Full", "lifecycle", "automation", "audience", "copy", "conversational", "conversion."];
      right1Tokens.forEach((token, idx) => {
        const tx = W * 0.82 + (idx % 2) * 48;
        const ty = H * 0.40 + Math.floor(idx / 2) * 24;
        add(token, tx, ty, idx < 2 ? 'bold 11px monospace' : '11px Inter, sans-serif', idx < 2 ? '#09090b' : '#52525b', 0.12 + idx * 0.012, 90 + (idx % 4) * 45, 80 + Math.floor(idx / 4) * 25);
      });

      // 7. Right Detail 2: "REAL-TIME OPTIMIZATION"
      const right2Tokens = ["REAL-TIME", "OPTIMIZATION", "Self-balancing", "capital", "allocation", "multi-variant", "refinement", "peak", "ROI."];
      right2Tokens.forEach((token, idx) => {
        const tx = W * 0.82 + (idx % 2) * 48;
        const ty = H * 0.60 + Math.floor(idx / 2) * 24;
        add(token, tx, ty, idx < 2 ? 'bold 11px monospace' : '11px Inter, sans-serif', idx < 2 ? '#09090b' : '#52525b', 0.15 + idx * 0.012, 110 + (idx % 4) * 42, 120 + Math.floor(idx / 4) * 25);
      });

      // 8. Humanoid ASCII Glyphs and Dots (~180 particles)
      const asciiGlyphs = ['@', '#', '$', '%', '&', '8', '0', 'B', 'c', 'r', 'N', 'R', 'X', 'A', 'Z', 'U', 'u', 'l', '1', '0', '+', '*', '•', '.', ':', '/', '\\'];
      const humanCX = W * 0.50;
      const humanCY = H * 0.55;
      const humanH = Math.min(H * 0.65, 420);
      const humanW = (240 / 360) * humanH;

      for (let i = 0; i < 180; i++) {
        const relY = rnd();
        let widthSpread = 0.35;
        if (relY < 0.15) widthSpread = 0.20;
        else if (relY < 0.35) widthSpread = 0.45;
        else if (relY < 0.55) widthSpread = 0.30;
        else widthSpread = 0.50;

        const relX = (rnd() - 0.5) * widthSpread;
        const hx = humanCX + relX * humanW;
        const hy = humanCY - humanH * 0.5 + relY * humanH;
        const glyph = asciiGlyphs[Math.floor(rnd() * asciiGlyphs.length)];

        const pStart = 0.03 + relY * 0.22 + rnd() * 0.08;
        add(glyph, hx, hy, 'bold 13px monospace', '#09090b', pStart, (i % 12) * 22, 50 + Math.floor(i / 12) * 14);
      }

      return list;
    }

    const renderDestroy = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      // Handle resize & DPR
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== W * dpr || canvas.height !== H * dpr || W !== lastW || H !== lastH) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.scale(dpr, dpr);
        particles = buildParticles(W, H);
        lastW = W;
        lastH = H;
      }

      const p = Math.max(0, Math.min(1, activeDestroyRef.current));

      // When not destroying, keep canvas completely clean
      if (p <= 0.001) {
        ctx.clearRect(0, 0, W, H);
        animId = requestAnimationFrame(renderDestroy);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // Render dumped corner pile shadow / outline accent
      if (p > 0.35) {
        const pileAlpha = Math.min(0.65, (p - 0.35) * 1.5);
        ctx.save();
        ctx.fillStyle = `rgba(0, 0, 0, ${0.04 * pileAlpha})`;
        ctx.beginPath();
        ctx.ellipse(W - 140, H - 45, 160, 45, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw all falling and dumped particles
      for (let i = 0; i < particles.length; i++) {
        const part = particles[i];
        let x = part.x0;
        let y = part.y0;
        let rot = 0;

        if (p <= part.pStart) {
          // Subtle initial tension jitter before detaching
          x += Math.sin(p * 140 + i * 2) * 1.0;
          y += Math.cos(p * 140 + i * 2) * 1.0;
        } else {
          // SUDDEN FALL: completes and dumps into corner rapidly by p = 0.44!
          const t = Math.min(1, Math.max(0, (p - part.pStart) / (0.44 - part.pStart)));
          // Sharp cubic gravity acceleration: sudden fast drop down!
          const tg = t * t * t;
          const bounce = Math.sin(t * Math.PI) * Math.max(0, 1 - t * 1.2) * 12;

          x = part.x0 + (part.x1 - part.x0) * tg + Math.sin(t * Math.PI) * part.lateralSway;
          y = part.y0 + (part.y1 - part.y0) * tg + bounce;
          rot = part.targetRot * t + Math.sin(t * Math.PI) * part.spinSpeed;
        }

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.font = part.font;
        ctx.fillStyle = part.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(part.char, 0, 0);
        ctx.restore();
      }

      animId = requestAnimationFrame(renderDestroy);
    };

    animId = requestAnimationFrame(renderDestroy);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

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
        style: {
          transform: `rotate(${activeDestroy > 0.48 ? ((activeDestroy - 0.48) / 0.52) * 4.8 : 0}deg) scale(${activeDestroy > 0.48 ? 1 + ((activeDestroy - 0.48) / 0.52) * 0.03 : 1})`,
          transformOrigin: 'bottom right',
        },
      };

  // Instant handoff: content elements hide immediately once destruction starts
  const contentFadeOpacity = activeDestroy <= 0.015 ? 1 : 0;
  const humanoidCanvasFade = activeDestroy <= 0.015 ? 1 : 0;

  return (
    <ContainerTag {...containerProps}>
      {/* FULL-BLEED DESTRUCTION & DUMPED PARTICLES CANVAS OVERLAY */}
      <canvas
        ref={destroyCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30 block"
      />

      <div
        style={{ opacity: contentFadeOpacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-between items-center transition-opacity duration-150"
      >
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
        {/* ============================================================== */}
        <div className="relative w-full flex-1 min-h-0 flex items-center justify-between gap-6 my-auto max-w-6xl">
          {/* LEFT SIDE DETAILS */}
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

          {/* CENTER: CLEAN ASCII WALKING CYBORG CANVAS */}
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
              style={{ opacity: humanoidCanvasFade }}
              className="w-full h-full block select-none bg-white transition-opacity duration-150"
              title="Biomechanical ASCII Locomotion Engine"
            />
          </motion.div>

          {/* RIGHT SIDE DETAILS */}
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
