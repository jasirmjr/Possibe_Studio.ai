import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import Button from '../ui/Button';

export default function Neural3DSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });

  const descriptionLines = [
    {
      id: 'desc-line-1',
      words: ['Zero', 'prompt', 'engineering.', 'The', 'agent', 'synthesizes', 'high-converting'],
      direction: -40,
      startDelay: 0.35,
    },
    {
      id: 'desc-line-2',
      words: ['creatives,', 'targets', 'programmatic', 'ads,', 'and', 'converts', 'inquiries', 'in'],
      direction: 40,
      startDelay: 0.68,
    },
    {
      id: 'desc-line-3',
      words: ['real-time.'],
      direction: 0,
      startDelay: 1.05,
    },
  ];

  // ====================================================================
  // REALISTIC FALLING NEURAL EFFECT FROM TOP SECTION
  // Slow, serene downward velocity with synaptic constellation filaments
  // ====================================================================
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

    // Particle Count & Parameters
    const PARTICLE_COUNT = 160;
    const particles = [];

    // Brand Neon Colors (Electric Purple, Cyan, Indigo, Violet)
    const colorPalette = [
      { r: 168, g: 85, b: 247 }, // Purple
      { r: 6, g: 182, b: 212 },  // Cyan
      { r: 139, g: 92, b: 246 }, // Violet
      { r: 99, g: 102, b: 241 },  // Indigo
      { r: 216, g: 180, b: 254 }, // Light Purple Highlight
    ];

    class FallingNeuralNode {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.x = Math.random() * width;
        // Start from above the top edge to realistically cascade from the top section
        this.y = isInitial ? Math.random() * height : -15 - Math.random() * 40;
        this.z = Math.random() * 300 - 100; // 3D depth

        // Reduced, slow, serene falling speed for a realistic fluid feel
        this.baseSpeed = 0.35 + Math.random() * 0.55;
        this.vy = this.baseSpeed;
        this.vx = (Math.random() - 0.5) * 0.2; // Gentle horizontal drift

        this.baseSize = 1.2 + Math.random() * 2.2;
        this.baseAlpha = 0.25 + Math.random() * 0.65;
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        this.seed = Math.random() * 1000;
        this.pulseSpeed = 0.015 + Math.random() * 0.02;
      }

      update(time, mouseX, mouseY) {
        // Slow natural vertical fall + subtle horizontal turbulence
        this.y += this.vy;
        this.x += this.vx + Math.sin(time * 0.4 + this.seed) * 0.25;

        // Subtle fluid mouse reaction (realistic gentle push)
        if (mouseX !== null && mouseY !== null) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160 && dist > 0) {
            const force = (1 - dist / 160) * 0.65;
            this.x += (dx / dist) * force * 1.2;
            this.y += (dy / dist) * force * 0.5;
          }
        }

        // Loop seamlessly back to the top section boundary
        if (this.y > height + 20) {
          this.reset(false);
        }
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
      }

      draw(ctx, time) {
        // Soft fade-out only at the bottom boundary (top remains fully vibrant to connect with Section 2)
        let edgeAlpha = 1;
        if (this.y > height - 60) {
          edgeAlpha = Math.max(0, (height - this.y) / 60);
        }

        const pulse = Math.sin(time * 2 + this.seed) * 0.15;
        const currentAlpha = Math.max(0, Math.min(1, (this.baseAlpha + pulse) * edgeAlpha));

        // 3D perspective scale
        const fov = 400;
        const scale = fov / (fov + this.z);
        const radius = Math.max(0.8, this.baseSize * scale);

        // Outer soft glow halo
        const haloRadius = radius * 3.2;
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, haloRadius);
        grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentAlpha * 0.85})`);
        grad.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentAlpha * 0.25})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner glowing core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles (spread throughout canvas on initial load)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new FallingNeuralNode(true));
    }

    let mouseX = null;
    let mouseY = null;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX || (e.touches && e.touches[0].clientX) || 0) - rect.left;
      mouseY = (e.clientY || (e.touches && e.touches[0].clientY) || 0) - rect.top;
    };

    const onPointerLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.01; // Reduced time step for calm, serene pace
      ctx.clearRect(0, 0, width, height);

      // Update positions
      particles.forEach((p) => p.update(time, mouseX, mouseY));

      // Draw Neural Synaptic Connections between falling nodes
      const maxConnectDist = 72;
      ctx.lineWidth = 0.75;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            // Factor in bottom edge fade only
            const edgeFade1 = particles[i].y > height - 60 ? (height - particles[i].y) / 60 : 1;
            const edgeFade2 = particles[j].y > height - 60 ? (height - particles[j].y) / 60 : 1;
            const edgeFade = Math.max(0, Math.min(edgeFade1, edgeFade2));

            const lineAlpha = (1 - dist / maxConnectDist) * 0.22 * edgeFade;

            // Gradient line matching both connected nodes
            const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            grad.addColorStop(0, `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${lineAlpha})`);
            grad.addColorStop(1, `rgba(${particles[j].color.r}, ${particles[j].color.g}, ${particles[j].color.b}, ${lineAlpha})`);

            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw all falling particles
      particles.forEach((p) => p.draw(ctx, time));

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative min-h-[65vh] lg:min-h-[520px] flex flex-col justify-center items-center pt-4 pb-4 lg:pt-6 lg:pb-6 bg-[#050505] overflow-hidden select-none"
    >
      {/* ================================================================ */}
      {/* 1. REALISTIC FALLING NEURAL PARTICLES & SYNAPSES CANVAS         */}
      {/* ================================================================ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 -translate-y-1/2 w-[700px] h-[550px] bg-purple-600/10 blur-[190px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 w-[550px] h-[450px] bg-cyan-600/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_75%,transparent_100%)] opacity-15 pointer-events-none z-0" />

      {/* Bottom soft transition vignette only (Top vignette REMOVED) */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />

      {/* ================================================================ */}
      {/* 2. FOREGROUND: SPEED HEADING ANIMATION + READING EFFECT SUBTEXT */}
      {/* ================================================================ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full text-center pointer-events-none">
        
       

        {/* Dynamic Speed Heading: Line 1 from LEFT, Line 2 from RIGHT */}
        <h2 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-extralight text-white tracking-[-0.04em] leading-[1.06] mb-8 overflow-hidden">
          {/* First line coming from the LEFT with speed */}
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
            Autonomous ad campaigns.
          </motion.span>

          {/* Second line coming from the RIGHT with speed */}
          <motion.span
            initial={{ opacity: 0, x: 140 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 140 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="font-light bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-300 bg-clip-text text-transparent block mt-2"
          >
            Closed deals on autopilot.
          </motion.span>
        </h2>

        {/* Description: 3-Line Structured Animation (Line Entrance + Word Illumination) */}
        <div className="font-light text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10 tracking-tight flex flex-col items-center justify-center space-y-1.5 overflow-hidden">
          {descriptionLines.map((line, lIdx) => (
            <motion.div
              key={line.id}
              initial={{
                opacity: 0,
                x: line.direction,
                y: line.direction === 0 ? 14 : 6,
              }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, y: 0 }
                  : {
                      opacity: 0,
                      x: line.direction,
                      y: line.direction === 0 ? 14 : 6,
                    }
              }
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.25 + lIdx * 0.2,
              }}
              className="flex flex-wrap items-center justify-center gap-x-1.5"
            >
              {line.words.map((word, wIdx) => (
                <motion.span
                  key={wIdx}
                  initial={{ opacity: 0.2, color: '#71717a' }}
                  animate={
                    isInView
                      ? { opacity: 1, color: '#f4f4f5' }
                      : { opacity: 0.2, color: '#71717a' }
                  }
                  transition={{
                    duration: 0.32,
                    delay: line.startDelay + wIdx * 0.045,
                    ease: 'easeOut',
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Minimal Action Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
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

        </motion.div>

      </div>
    </section>
  );
}
