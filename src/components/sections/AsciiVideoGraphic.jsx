import React, { useRef, useEffect, useState } from 'react';

const TOTAL_FRAMES = 12;
const FRAME_DURATION = 0.082; // ~12.2 fps (fluid ASCII animation)

// Preload and cache all 7 levels into memory to ensure instant 60fps playback with zero network delay
const asciiCache = {};
if (typeof window !== 'undefined') {
  for (let lvl = 1; lvl <= 7; lvl++) {
    asciiCache[lvl] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/ascii/level_${lvl}/frame_${i}.png?v=3`;
      asciiCache[lvl].push(img);
    }
  }
}

/**
 * AsciiVideoGraphic
 * Plays authentic monospace ASCII animation loops for the 7 stages:
 * Level 1: Keyboard (Mechanical typing & prompt terminal)
 * Level 2: Loading (Futuristic cyber circular loading spinner)
 * Level 3: Instagram (Camera glyph, reel interface & floating hearts)
 * Level 4: Group of People (ICP audience crowd & HUD targeting reticles)
 * Level 5: Money (3D rotating dollar coin, cash bills & growth bars)
 * Level 6: Calling (Ringing telephone handset & acoustic soundwaves)
 * Level 7: Hand Shaking (Two arms reaching and clasping in business deal)
 */
export default function AsciiVideoGraphic({ level = 1 }) {
  const canvasRef = useRef(null);
  const lvlNum = Math.min(Math.max(parseInt(level, 10) || 1, 1), 7);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frames = asciiCache[lvlNum] || [];
    let loadedCount = 0;

    frames.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        loadedCount++;
      } else {
        img.onload = () => {
          loadedCount++;
          if (loadedCount >= TOTAL_FRAMES) {
            setIsReady(true);
          }
        };
      }
    });

    if (loadedCount >= TOTAL_FRAMES) {
      setIsReady(true);
    }
  }, [lvlNum]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
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

      // Transparent clearing so open-cell background grid shows through
      ctx.clearRect(0, 0, width, height);

      const cycleDuration = TOTAL_FRAMES * FRAME_DURATION;
      const normalizedTime = (simTime % cycleDuration + cycleDuration) % cycleDuration;
      const frameIdx = Math.floor(normalizedTime / FRAME_DURATION) % TOTAL_FRAMES;

      const frames = asciiCache[lvlNum] || [];
      const currentImg = frames[frameIdx];

      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        ctx.save();
        ctx.imageSmoothingEnabled = false;

        const imgAspect = currentImg.naturalWidth / currentImg.naturalHeight;
        // Scale nicely to fit inside stage graphic bounds
        const targetH = Math.min(height * 0.90, 360);
        const targetW = targetH * imgAspect;
        const dx = (width - targetW) / 2;
        const dy = (height - targetH) / 2;

        ctx.drawImage(currentImg, dx, dy, targetW, targetH);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [lvlNum, isReady]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      />
    </div>
  );
}
