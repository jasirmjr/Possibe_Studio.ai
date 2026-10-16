import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

// ============================================================================
// 7 HIGH-DEFINITION VECTOR ILLUSTRATIONS (CLEAR & RECOGNIZABLE)
// Specifically matching each level requested:
//   Level 1: Typing on the keyboard
//   Level 2: Generating like an image (loading / processing)
//   Level 3: Post on social media like Instagram
//   Level 4: Set ad audience (group of people)
//   Level 5: Set ad amount (cash setting / dollar stack)
//   Level 6: Follow up lead through chats (messaging dialogue)
//   Level 7: Convert to client (handshake / handover)
// ============================================================================

// 1. Typing on the keyboard (Hands typing on modern glowing keyboard inside Radar HUD)
function VectorKeyboard() {
  return (
    <svg viewBox="0 0 340 340" className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] select-none pointer-events-none drop-shadow-[0_12px_45px_rgba(255,107,0,0.35)]">
      <defs>
        <linearGradient id="kbGradKey" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8800" />
          <stop offset="100%" stopColor="#cc4400" />
        </linearGradient>
        <linearGradient id="kbBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1e28" />
          <stop offset="100%" stopColor="#0d0d14" />
        </linearGradient>
        <filter id="kbGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Radar Target Scope Circles */}
      <circle cx="170" cy="160" r="130" fill="none" stroke="#272733" strokeWidth="1.5" />
      <circle cx="170" cy="160" r="100" fill="none" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
      <circle cx="170" cy="160" r="60" fill="none" stroke="#ffaa44" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      
      {/* Crosshairs */}
      <line x1="170" y1="20" x2="170" y2="50" stroke="#ff6b00" strokeWidth="2" />
      <line x1="170" y1="270" x2="170" y2="300" stroke="#ff6b00" strokeWidth="2" />
      <line x1="25" y1="160" x2="55" y2="160" stroke="#ff6b00" strokeWidth="2" />
      <line x1="285" y1="160" x2="315" y2="160" stroke="#ff6b00" strokeWidth="2" />

      {/* CENTER SUBJECT: Holographic Floating Keyboard */}
      <g filter="drop-shadow(0 8px 25px rgba(255,107,0,0.4))">
        {/* Keyboard Frame */}
        <rect x="75" y="115" width="190" height="90" rx="10" fill="url(#kbBodyGrad)" stroke="#ff6b00" strokeWidth="1.5" />
        
        {/* Terminal Line at top of keyboard */}
        <rect x="83" y="121" width="174" height="15" rx="3" fill="#09090d" />
        <text x="90" y="132" fill="#ffaa33" fontSize="8" fontFamily="monospace" fontWeight="bold">
          &gt; PROMPT: "AUTONOMOUS GROWTH"
        </text>
        <rect x="238" y="124" width="4" height="9" fill="#ff6b00">
          <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
        </rect>

        {/* Row 1 Keys */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`k1-${i}`} x={83 + i * 29} y={141} width="24" height="15" rx="3" fill="#16161f" stroke="#2e2e3e" strokeWidth="1" />
        ))}
        {/* Active glowing key */}
        <rect x={83 + 2 * 29} y={141} width="24" height="15" rx="3" fill="url(#kbGradKey)" stroke="#ffaa44" strokeWidth="1" />
        <text x={83 + 2 * 29 + 12} y={152} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace">Q</text>

        {/* Row 2 Keys */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`k2-${i}`} x={83 + i * 29} y={160} width="24" height="15" rx="3" fill="#16161f" stroke="#2e2e3e" strokeWidth="1" />
        ))}
        <rect x={83 + 4 * 29} y={160} width="24" height="15" rx="3" fill="url(#kbGradKey)" stroke="#ffaa44" strokeWidth="1" />
        <text x={83 + 4 * 29 + 12} y={171} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace">K</text>

        {/* Spacebar */}
        <rect x="112" y="180" width="116" height="16" rx="3" fill="#1c1c28" stroke="#ff6b00" strokeWidth="1.2" />
        <line x1="145" y1="188" x2="195" y2="188" stroke="#ffaa44" strokeWidth="2" strokeLinecap="round" />

        {/* Keystroke Sparks & Fingertips */}
        <circle cx="141" cy="148" r="4" fill="#ffffff" filter="url(#kbGlow)" />
        <circle cx="199" cy="167" r="4" fill="#ffffff" filter="url(#kbGlow)" />

        {/* Keystroke ripple circles */}
        <circle cx="141" cy="148" r="10" fill="none" stroke="#ff6b00" strokeWidth="1" opacity="0.7">
          <animate attributeName="r" values="4;18" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="199" cy="167" r="10" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.7">
          <animate attributeName="r" values="4;18" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Floating HUD Telemetry Tags */}
      <g>
        {/* Top Tag */}
        <rect x="75" y="25" width="190" height="26" rx="13" fill="#14141c" stroke="#ff6b00" strokeWidth="1.5" />
        <text x="170" y="42" textAnchor="middle" fill="#ffaa33" fontSize="10" fontWeight="bold" fontFamily="monospace">
          ⚡ PROMPT: "SCALE ADS"
        </text>

        {/* Left Tag */}
        <rect x="25" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#f59e0b" strokeWidth="1" />
        <text x="77" y="231" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace">
          ZERO-PROMPT
        </text>

        {/* Right Tag */}
        <rect x="210" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#22c55e" strokeWidth="1" />
        <text x="262" y="231" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold" fontFamily="monospace">
          SPEED: 140 WPM
        </text>

        {/* Bottom Tag */}
        <rect x="70" y="275" width="200" height="26" rx="13" fill="#09090e" stroke="#272733" strokeWidth="1" />
        <text x="170" y="292" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          BRAND DNA DECODED 100%
        </text>
      </g>
    </svg>
  );
}

// 2. Generating like an image (Generative studio canvas with laser scan inside Radar HUD)
function VectorImageGen() {
  return (
    <svg viewBox="0 0 340 340" className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] select-none pointer-events-none drop-shadow-[0_12px_45px_rgba(255,107,0,0.35)]">
      <defs>
        <linearGradient id="genSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#431407" />
          <stop offset="60%" stopColor="#c2410c" />
          <stop offset="100%" stopColor="#ff8800" />
        </linearGradient>
        <filter id="genGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Radar Target Scope Circles */}
      <circle cx="170" cy="160" r="130" fill="none" stroke="#272733" strokeWidth="1.5" />
      <circle cx="170" cy="160" r="100" fill="none" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
      <circle cx="170" cy="160" r="60" fill="none" stroke="#ffaa44" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      
      {/* Crosshairs */}
      <line x1="170" y1="20" x2="170" y2="50" stroke="#ff6b00" strokeWidth="2" />
      <line x1="170" y1="270" x2="170" y2="300" stroke="#ff6b00" strokeWidth="2" />
      <line x1="25" y1="160" x2="55" y2="160" stroke="#ff6b00" strokeWidth="2" />
      <line x1="285" y1="160" x2="315" y2="160" stroke="#ff6b00" strokeWidth="2" />

      {/* Rotating processing arc ring */}
      <circle cx="170" cy="155" r="56" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="30 20">
        <animateTransform attributeName="transform" type="rotate" from="0 170 155" to="360 170 155" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* CENTER SUBJECT: Generative Circular Picture Aperture */}
      <g filter="drop-shadow(0 8px 25px rgba(255,107,0,0.5))">
        {/* Circular Canvas with emerging art */}
        <clipPath id="genCircleClip">
          <circle cx="170" cy="155" r="46" />
        </clipPath>
        
        <g clipPath="url(#genCircleClip)">
          {/* Cyber Sunset Sky */}
          <rect x="120" y="105" width="100" height="100" fill="url(#genSkyGrad)" />
          {/* Cyber Sun */}
          <circle cx="170" cy="138" r="16" fill="#fef08a" />
          {/* Mountain Peaks */}
          <polygon points="135,185 165,145 195,185" fill="#181822" stroke="#ff7700" strokeWidth="1.5" />
          <polygon points="160,185 185,138 210,185" fill="#0d0d14" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Terrain grid lines */}
          <line x1="120" y1="175" x2="220" y2="175" stroke="#ff6b00" strokeWidth="1" opacity="0.6" />
          <line x1="120" y1="185" x2="220" y2="185" stroke="#ff6b00" strokeWidth="1" opacity="0.9" />

          {/* Active horizontal laser scanning beam */}
          <line x1="120" y1="150" x2="220" y2="150" stroke="#ffffff" strokeWidth="2.5" filter="url(#genGlow)">
            <animate attributeName="y1" values="120;185;120" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="120;185;120" dur="2s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Aperture border ring */}
        <circle cx="170" cy="155" r="46" fill="none" stroke="#ff6b00" strokeWidth="2.5" />

        {/* AI Sparkle Stars floating around */}
        <path d="M 115,115 Q 115,123 123,123 Q 115,123 115,131 Q 115,123 107,123 Q 115,123 115,115 Z" fill="#ffffff" />
        <path d="M 225,115 Q 225,121 231,121 Q 225,121 225,127 Q 225,121 219,121 Q 225,121 225,115 Z" fill="#f59e0b" />
      </g>

      {/* Floating HUD Telemetry Tags */}
      <g>
        {/* Top Tag */}
        <rect x="70" y="25" width="200" height="26" rx="13" fill="#14141c" stroke="#ff6b00" strokeWidth="1.5" />
        <text x="170" y="42" textAnchor="middle" fill="#ffaa33" fontSize="10" fontWeight="bold" fontFamily="monospace">
          🎨 SYNTHESIS: 4K MULTI-FORMAT
        </text>

        {/* Left Tag */}
        <rect x="25" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#f59e0b" strokeWidth="1" />
        <text x="77" y="231" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace">
          STEP 38 / 40
        </text>

        {/* Right Tag */}
        <rect x="210" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#22c55e" strokeWidth="1" />
        <text x="262" y="231" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold" fontFamily="monospace">
          RENDERING 96%
        </text>

        {/* Bottom Tag */}
        <rect x="65" y="275" width="210" height="26" rx="13" fill="#09090e" stroke="#272733" strokeWidth="1" />
        <text x="170" y="292" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          DIFFUSION LATENT SPACE: ACTIVE
        </text>
      </g>
    </svg>
  );
}

// 3. Post on social media like Instagram (Instagram camera frame inside Radar HUD)
function VectorInstagram() {
  return (
    <svg viewBox="0 0 340 340" className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] select-none pointer-events-none drop-shadow-[0_12px_45px_rgba(255,107,0,0.35)]">
      <defs>
        <linearGradient id="instaRadarBorder" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <radialGradient id="instaLensShine" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffaa44" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ff6b00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#14141e" />
        </radialGradient>
        <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Radar Target Scope Circles */}
      <circle cx="170" cy="160" r="130" fill="none" stroke="#272733" strokeWidth="1.5" />
      <circle cx="170" cy="160" r="100" fill="none" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
      <circle cx="170" cy="160" r="60" fill="none" stroke="#ffaa44" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      
      {/* Crosshairs */}
      <line x1="170" y1="20" x2="170" y2="50" stroke="#ff6b00" strokeWidth="2" />
      <line x1="170" y1="270" x2="170" y2="300" stroke="#ff6b00" strokeWidth="2" />
      <line x1="25" y1="160" x2="55" y2="160" stroke="#ff6b00" strokeWidth="2" />
      <line x1="285" y1="160" x2="315" y2="160" stroke="#ff6b00" strokeWidth="2" />

      {/* CENTER SUBJECT: Instagram Camera Lens & Heart Reaction */}
      <g filter="drop-shadow(0 8px 25px rgba(255,107,0,0.5))">
        {/* Camera Rounded Frame */}
        <rect x="120" y="110" width="100" height="90" rx="22" fill="#0d0d14" stroke="url(#instaRadarBorder)" strokeWidth="3" />
        
        {/* Outer Lens Ring */}
        <circle cx="170" cy="155" r="28" fill="none" stroke="url(#instaRadarBorder)" strokeWidth="3" />
        {/* Inner Glass */}
        <circle cx="170" cy="155" r="18" fill="url(#instaLensShine)" />
        {/* Core highlight reflection */}
        <circle cx="164" cy="149" r="5" fill="#ffffff" opacity="0.8" />
        {/* Top Right Flash Dot */}
        <circle cx="204" cy="125" r="4" fill="#f59e0b" />

        {/* Floating Neon Heart Reaction Badge */}
        <g filter="url(#heartGlow)">
          <circle cx="225" cy="105" r="16" fill="#ef4444" />
          <path d="M 225,111 C 225,111 217,105 217,101 C 217,98 219,96 222,96 C 223.5,96 224.5,97 225,98 C 225.5,97 226.5,96 228,96 C 231,96 233,98 233,101 C 233,105 225,111 225,111 Z" fill="#ffffff" />
        </g>

        {/* Floating Paper Plane Share Icon */}
        <g transform="translate(100, 175) scale(0.9)">
          <path d="M 0,0 L 16,8 L 0,16 L 4,8 Z" fill="#ffaa33" />
        </g>
      </g>

      {/* Floating HUD Telemetry Tags */}
      <g>
        {/* Top Tag */}
        <rect x="70" y="25" width="200" height="26" rx="13" fill="#14141c" stroke="#ff6b00" strokeWidth="1.5" />
        <text x="170" y="42" textAnchor="middle" fill="#ffaa33" fontSize="10" fontWeight="bold" fontFamily="monospace">
          🚀 DISPATCH: INSTAGRAM &amp; META
        </text>

        {/* Left Tag */}
        <rect x="25" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#f59e0b" strokeWidth="1" />
        <text x="77" y="231" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace">
          48.2K LIKES
        </text>

        {/* Right Tag */}
        <rect x="210" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#22c55e" strokeWidth="1" />
        <text x="262" y="231" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold" fontFamily="monospace">
          VIRAL: 9.8 🔥
        </text>

        {/* Bottom Tag */}
        <rect x="65" y="275" width="210" height="26" rx="13" fill="#09090e" stroke="#272733" strokeWidth="1" />
        <text x="170" y="292" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          PEAK ENGAGEMENT: 100% AUTO
        </text>
      </g>
    </svg>
  );
}

// 4. Set ad audience (Group of people silhouettes with targeting reticle - User Reference Design)
function VectorAudience() {
  return (
    <svg viewBox="0 0 340 340" className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] select-none pointer-events-none drop-shadow-[0_12px_45px_rgba(255,107,0,0.35)]">
      <defs>
        <linearGradient id="audGradCenter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8800" />
          <stop offset="100%" stopColor="#cc4400" />
        </linearGradient>
        <linearGradient id="audGradSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>

      {/* Radar Target Scope Circles */}
      <circle cx="170" cy="160" r="130" fill="none" stroke="#272733" strokeWidth="1.5" />
      <circle cx="170" cy="160" r="100" fill="none" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
      <circle cx="170" cy="160" r="60" fill="none" stroke="#ffaa44" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      
      {/* Crosshairs */}
      <line x1="170" y1="20" x2="170" y2="50" stroke="#ff6b00" strokeWidth="2" />
      <line x1="170" y1="270" x2="170" y2="300" stroke="#ff6b00" strokeWidth="2" />
      <line x1="25" y1="160" x2="55" y2="160" stroke="#ff6b00" strokeWidth="2" />
      <line x1="285" y1="160" x2="315" y2="160" stroke="#ff6b00" strokeWidth="2" />

      {/* Connection Links between Audience avatars */}
      <line x1="105" y1="170" x2="170" y2="155" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
      <line x1="235" y1="170" x2="170" y2="155" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />

      {/* LEFT PERSON (Flanking Avatar) */}
      <g>
        <circle cx="105" cy="135" r="20" fill="url(#audGradSide)" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 75,195 C 75,165 135,165 135,195 Z" fill="url(#audGradSide)" />
        <path d="M 80,120 L 70,120 L 70,135" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M 130,120 L 140,120 L 140,135" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      </g>

      {/* RIGHT PERSON (Flanking Avatar) */}
      <g>
        <circle cx="235" cy="135" r="20" fill="url(#audGradSide)" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 205,195 C 205,165 265,165 265,195 Z" fill="url(#audGradSide)" />
        <path d="M 210,120 L 200,120 L 200,135" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M 260,120 L 270,120 L 270,135" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      </g>

      {/* CENTER PERSON (Prominent Leader / High Intent Lead) */}
      <g filter="drop-shadow(0 8px 25px rgba(255,107,0,0.5))">
        <circle cx="170" cy="118" r="26" fill="url(#audGradCenter)" stroke="#ffffff" strokeWidth="2.5" />
        <path d="M 158,118 Q 170,124 182,118" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M 130,195 C 130,152 210,152 210,195 Z" fill="url(#audGradCenter)" stroke="#ffaa44" strokeWidth="1.5" />
        <circle cx="170" cy="165" r="4" fill="#ffffff" />
      </g>

      {/* Floating Audience Data Tags */}
      <g>
        <rect x="95" y="25" width="150" height="26" rx="13" fill="#14141c" stroke="#ff6b00" strokeWidth="1.5" />
        <text x="170" y="42" textAnchor="middle" fill="#ffaa33" fontSize="10" fontWeight="bold" fontFamily="monospace">
          🎯 AUDIENCE: 2.4M ACTIVE
        </text>

        <rect x="25" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#f59e0b" strokeWidth="1" />
        <text x="77" y="231" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace">
          AGE 24–45
        </text>

        <rect x="210" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#22c55e" strokeWidth="1" />
        <text x="262" y="231" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold" fontFamily="monospace">
          INTENT: 98% 🔥
        </text>

        <rect x="80" y="275" width="180" height="26" rx="13" fill="#09090e" stroke="#272733" strokeWidth="1" />
        <text x="170" y="292" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          LOOKALIKE 1% • HIGH LTV
        </text>
      </g>
    </svg>
  );
}

// 5. Set ad amount (Cash setting: Currency coin medallion inside Radar HUD)
function VectorCash() {
  return (
    <svg viewBox="0 0 340 340" className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] select-none pointer-events-none drop-shadow-[0_12px_45px_rgba(255,107,0,0.35)]">
      <defs>
        <linearGradient id="cashMedallionGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a1f" />
          <stop offset="100%" stopColor="#0a1a0c" />
        </linearGradient>
        <linearGradient id="goldCoinGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      {/* Radar Target Scope Circles */}
      <circle cx="170" cy="160" r="130" fill="none" stroke="#272733" strokeWidth="1.5" />
      <circle cx="170" cy="160" r="100" fill="none" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
      <circle cx="170" cy="160" r="60" fill="none" stroke="#ffaa44" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      
      {/* Crosshairs */}
      <line x1="170" y1="20" x2="170" y2="50" stroke="#ff6b00" strokeWidth="2" />
      <line x1="170" y1="270" x2="170" y2="300" stroke="#ff6b00" strokeWidth="2" />
      <line x1="25" y1="160" x2="55" y2="160" stroke="#ff6b00" strokeWidth="2" />
      <line x1="285" y1="160" x2="315" y2="160" stroke="#ff6b00" strokeWidth="2" />

      {/* Flanking Stack of Gold Coins (Left) */}
      <g filter="drop-shadow(0 4px 12px rgba(245,158,11,0.5))">
        <ellipse cx="112" cy="180" rx="18" ry="7" fill="#78350f" />
        <ellipse cx="112" cy="176" rx="18" ry="7" fill="url(#goldCoinGrad)" stroke="#fde047" strokeWidth="1" />
        <ellipse cx="112" cy="168" rx="18" ry="7" fill="#78350f" />
        <ellipse cx="112" cy="164" rx="18" ry="7" fill="url(#goldCoinGrad)" stroke="#fde047" strokeWidth="1" />
        <text x="112" y="167" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">$</text>
      </g>

      {/* Flanking Stack of Gold Coins (Right) */}
      <g filter="drop-shadow(0 4px 12px rgba(245,158,11,0.5))">
        <ellipse cx="228" cy="180" rx="18" ry="7" fill="#78350f" />
        <ellipse cx="228" cy="176" rx="18" ry="7" fill="url(#goldCoinGrad)" stroke="#fde047" strokeWidth="1" />
        <ellipse cx="228" cy="168" rx="18" ry="7" fill="#78350f" />
        <ellipse cx="228" cy="164" rx="18" ry="7" fill="url(#goldCoinGrad)" stroke="#fde047" strokeWidth="1" />
        <text x="228" y="167" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">$</text>
      </g>

      {/* CENTER SUBJECT: Central Cash Medallion & Dial */}
      <g filter="drop-shadow(0 8px 25px rgba(34,197,94,0.5))">
        {/* Outer Currency Medallion */}
        <circle cx="170" cy="150" r="40" fill="url(#cashMedallionGrad)" stroke="#22c55e" strokeWidth="2.5" />
        <circle cx="170" cy="150" r="32" fill="none" stroke="#4ade80" strokeWidth="1.2" strokeDasharray="3 3" />
        
        {/* Bold Center Dollar Symbol */}
        <text x="170" y="164" textAnchor="middle" fill="#4ade80" fontSize="38" fontWeight="black" fontFamily="sans-serif">
          $
        </text>

        {/* Dynamic spend dial indicator needle */}
        <line x1="170" y1="150" x2="198" y2="128" stroke="#ffaa33" strokeWidth="3" strokeLinecap="round" />
        <circle cx="170" cy="150" r="5" fill="#ffffff" />
      </g>

      {/* Floating HUD Telemetry Tags */}
      <g>
        {/* Top Tag */}
        <rect x="75" y="25" width="190" height="26" rx="13" fill="#14141c" stroke="#ff6b00" strokeWidth="1.5" />
        <text x="170" y="42" textAnchor="middle" fill="#ffaa33" fontSize="10" fontWeight="bold" fontFamily="monospace">
          💰 DAILY BUDGET: $3,500/DAY
        </text>

        {/* Left Tag */}
        <rect x="25" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#f59e0b" strokeWidth="1" />
        <text x="77" y="231" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace">
          ROAS: 4.8X
        </text>

        {/* Right Tag */}
        <rect x="210" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#22c55e" strokeWidth="1" />
        <text x="262" y="231" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold" fontFamily="monospace">
          SCALE: MAX ⚡
        </text>

        {/* Bottom Tag */}
        <rect x="65" y="275" width="210" height="26" rx="13" fill="#09090e" stroke="#272733" strokeWidth="1" />
        <text x="170" y="292" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          DYNAMIC CAPITAL ARBITRAGE
        </text>
      </g>
    </svg>
  );
}

// 6. Follow up lead through chats (Messaging speech dialogue inside Radar HUD)
function VectorChats() {
  return (
    <svg viewBox="0 0 340 340" className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] select-none pointer-events-none drop-shadow-[0_12px_45px_rgba(255,107,0,0.35)]">
      <defs>
        <linearGradient id="aiBubbleGradRadar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8800" />
          <stop offset="100%" stopColor="#d9480f" />
        </linearGradient>
      </defs>

      {/* Radar Target Scope Circles */}
      <circle cx="170" cy="160" r="130" fill="none" stroke="#272733" strokeWidth="1.5" />
      <circle cx="170" cy="160" r="100" fill="none" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
      <circle cx="170" cy="160" r="60" fill="none" stroke="#ffaa44" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      
      {/* Crosshairs */}
      <line x1="170" y1="20" x2="170" y2="50" stroke="#ff6b00" strokeWidth="2" />
      <line x1="170" y1="270" x2="170" y2="300" stroke="#ff6b00" strokeWidth="2" />
      <line x1="25" y1="160" x2="55" y2="160" stroke="#ff6b00" strokeWidth="2" />
      <line x1="285" y1="160" x2="315" y2="160" stroke="#ff6b00" strokeWidth="2" />

      {/* CENTER SUBJECT: Dialogue Speech Bubbles */}
      <g filter="drop-shadow(0 8px 25px rgba(255,107,0,0.4))">
        {/* Inbound Lead Chat Bubble (Upper Left) */}
        <rect x="85" y="105" width="130" height="38" rx="10" fill="#181824" stroke="#f59e0b" strokeWidth="1.2" />
        <polygon points="90,143 82,149 95,143" fill="#181824" />
        <circle cx="102" cy="124" r="9" fill="#2d2d3d" />
        <text x="102" y="127" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">JD</text>
        <text x="117" y="128" fill="#e4e4e7" fontSize="9" fontWeight="500" fontFamily="sans-serif">
          Scale our store?
        </text>

        {/* Outbound AI Chat Bubble (Center Right) */}
        <rect x="125" y="146" width="140" height="42" rx="10" fill="url(#aiBubbleGradRadar)" stroke="#ffaa44" strokeWidth="1.2" />
        <polygon points="260,188 268,194 255,188" fill="#d9480f" />
        <text x="137" y="163" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
          Launched! ROAS: 4.5x 🚀
        </text>
        <text x="252" y="179" fill="#ffffff" fontSize="9" fontWeight="bold">✓✓</text>
        <text x="235" y="179" textAnchor="end" fill="#ffddbb" fontSize="7" fontFamily="monospace">NOW</text>

        {/* 3-Dot Typing Bubble (Lower Left) */}
        <rect x="95" y="175" width="55" height="22" rx="8" fill="#14141c" stroke="#ff6b00" strokeWidth="1" />
        <circle cx="112" cy="186" r="3" fill="#ff8800">
          <animate attributeName="cy" values="186;183;186" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="122" cy="186" r="3" fill="#ffaa33">
          <animate attributeName="cy" values="186;183;186" dur="0.8s" begin="0.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="132" cy="186" r="3" fill="#ffffff">
          <animate attributeName="cy" values="186;183;186" dur="0.8s" begin="0.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Floating HUD Telemetry Tags */}
      <g>
        {/* Top Tag */}
        <rect x="75" y="25" width="190" height="26" rx="13" fill="#14141c" stroke="#ff6b00" strokeWidth="1.5" />
        <text x="170" y="42" textAnchor="middle" fill="#ffaa33" fontSize="10" fontWeight="bold" fontFamily="monospace">
          💬 LIVE CHAT: ACTIVE 24/7
        </text>

        {/* Left Tag */}
        <rect x="25" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#f59e0b" strokeWidth="1" />
        <text x="77" y="231" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace">
          RESP: &lt; 15s
        </text>

        {/* Right Tag */}
        <rect x="210" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#22c55e" strokeWidth="1" />
        <text x="262" y="231" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold" fontFamily="monospace">
          QUALIFIED 94%
        </text>

        {/* Bottom Tag */}
        <rect x="60" y="275" width="220" height="26" rx="13" fill="#09090e" stroke="#272733" strokeWidth="1" />
        <text x="170" y="292" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          LEAD TO APPOINTMENT IN 42s
        </text>
      </g>
    </svg>
  );
}

// 7. Convert to client (Handshake deal closing inside Radar HUD)
function VectorHandshake() {
  return (
    <svg viewBox="0 0 340 340" className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] select-none pointer-events-none drop-shadow-[0_12px_45px_rgba(255,107,0,0.35)]">
      <defs>
        <linearGradient id="handLeftGradRadar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8800" />
          <stop offset="100%" stopColor="#cc4400" />
        </linearGradient>
        <linearGradient id="handRightGradRadar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <filter id="handGlowRadar" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Radar Target Scope Circles */}
      <circle cx="170" cy="160" r="130" fill="none" stroke="#272733" strokeWidth="1.5" />
      <circle cx="170" cy="160" r="100" fill="none" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
      <circle cx="170" cy="160" r="60" fill="none" stroke="#ffaa44" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      
      {/* Crosshairs */}
      <line x1="170" y1="20" x2="170" y2="50" stroke="#ff6b00" strokeWidth="2" />
      <line x1="170" y1="270" x2="170" y2="300" stroke="#ff6b00" strokeWidth="2" />
      <line x1="25" y1="160" x2="55" y2="160" stroke="#ff6b00" strokeWidth="2" />
      <line x1="285" y1="160" x2="315" y2="160" stroke="#ff6b00" strokeWidth="2" />

      {/* CENTER SUBJECT: Partnership Handshake Clasp */}
      <g filter="drop-shadow(0 8px 25px rgba(255,107,0,0.5))">
        {/* Left Arm & Orange Cuff */}
        <path d="M 65,148 L 105,148 L 115,152 L 115,178 L 105,182 L 65,182 Z" fill="#181822" stroke="#ff6b00" strokeWidth="1.5" />
        <rect x="110" y="152" width="8" height="28" rx="2" fill="#ff6b00" />

        {/* Right Arm & Amber Cuff */}
        <path d="M 275,148 L 235,148 L 225,152 L 225,178 L 235,182 L 275,182 Z" fill="#181822" stroke="#f59e0b" strokeWidth="1.5" />
        <rect x="222" y="152" width="8" height="28" rx="2" fill="#f59e0b" />

        {/* Handshake Clasp Hands */}
        <path d="M 118,154 Q 145,150 170,154 Q 185,158 190,166 Q 175,180 150,178 Q 128,178 118,178 Z" fill="url(#handLeftGradRadar)" stroke="#ffaa44" strokeWidth="1.5" />
        <path d="M 222,154 Q 195,150 170,154 Q 155,158 150,166 Q 165,180 190,178 Q 212,178 222,178 Z" fill="url(#handRightGradRadar)" stroke="#fef08a" strokeWidth="1.5" />

        {/* Clasping finger segments */}
        <path d="M 154,157 C 160,154 178,154 186,157" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M 152,165 C 160,162 180,162 188,165" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

        {/* Glowing Palm Energy Spark */}
        <circle cx="170" cy="165" r="12" fill="#ffffff" filter="url(#handGlowRadar)" opacity="0.95">
          <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="170" cy="165" r="5" fill="#ff6b00" />

        {/* Floating Verified Shield Badge at Top of Clasp */}
        <g>
          <circle cx="170" cy="112" r="14" fill="#0d1f11" stroke="#22c55e" strokeWidth="1.8" />
          <text x="170" y="117" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">✓</text>
        </g>
      </g>

      {/* Floating HUD Telemetry Tags */}
      <g>
        {/* Top Tag */}
        <rect x="75" y="25" width="190" height="26" rx="13" fill="#14141c" stroke="#ff6b00" strokeWidth="1.5" />
        <text x="170" y="42" textAnchor="middle" fill="#ffaa33" fontSize="10" fontWeight="bold" fontFamily="monospace">
          🤝 DEAL CLOSED: SIGNED
        </text>

        {/* Left Tag */}
        <rect x="25" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#f59e0b" strokeWidth="1" />
        <text x="77" y="231" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace">
          CRM SYNCED
        </text>

        {/* Right Tag */}
        <rect x="210" y="215" width="105" height="24" rx="6" fill="#14141c" stroke="#22c55e" strokeWidth="1" />
        <text x="262" y="231" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold" fontFamily="monospace">
          LTV: $24,000
        </text>

        {/* Bottom Tag */}
        <rect x="55" y="275" width="230" height="26" rx="13" fill="#09090e" stroke="#272733" strokeWidth="1" />
        <text x="170" y="292" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          CLIENT ONBOARDED: 100% COMPLETE
        </text>
      </g>
    </svg>
  );
}

// Dynamic illustration selector
function StageGraphic({ stageNumber }) {
  switch (stageNumber) {
    case '01':
      return <VectorKeyboard />;
    case '02':
      return <VectorImageGen />;
    case '03':
      return <VectorInstagram />;
    case '04':
      return <VectorAudience />;
    case '05':
      return <VectorCash />;
    case '06':
      return <VectorChats />;
    case '07':
      return <VectorHandshake />;
    default:
      return <VectorKeyboard />;
  }
}

// 7 Stages updated with user's specific workflow actions
const STAGES = [
  {
    number: '01',
    category: 'RAW PROMPT INGESTION',
    title: 'Typing on the Keyboard / Idea Inception',
    desc: 'Type one raw product idea or campaign brief on your keyboard. The autonomous system instantly decomposes brand DNA and tone of voice with zero prompt engineering required.',
  },
  {
    number: '02',
    category: 'ALGORITHMIC PRODUCTION',
    title: 'Generating Image / Generative Studio',
    desc: 'Processing and synthesizing visual assets in real time. Orchestrates specialized diffusion models to render 4K multi-ratio ad formats, motion reels, and magnetic copy variations.',
  },
  {
    number: '03',
    category: 'OMNICHANNEL DEPLOY',
    title: 'Post on Social Media / Live Dispatch',
    desc: 'Direct programmatic API publishing across Instagram, Meta, TikTok, and LinkedIn. Auto-schedules campaigns within peak-engagement windows with algorithmic high-intent hashtags.',
  },
  {
    number: '04',
    category: 'PRECISION TARGETING',
    title: 'Set Ad Audience / Group Targeting',
    desc: 'Constructs targeted buyer cohorts and micro-geo segments. Connects with high-intent audience groups, Lookalikes, and geo-fenced prospect communities.',
  },
  {
    number: '05',
    category: 'CAPITAL ARBITRAGE',
    title: 'Set Ad Amount / Budget Optimization',
    desc: 'Dynamic cash allocation and live ROAS arbitrage. The agent monitors spend velocity, continuously scaling liquid budget behind winning ads while pruning low-performing creatives.',
  },
  {
    number: '06',
    category: 'CONVERSATIONAL CLOSER',
    title: 'Follow Up Leads / Live Chat Messaging',
    desc: 'Continuous real-time messaging follow-up across WhatsApp, DMs, and live inquiries. Evaluates intent and answers technical inquiries in sub-30s intervals.',
  },
  {
    number: '07',
    category: 'CLIENT HANDOVER',
    title: 'Convert to Client / Deal Handshake',
    desc: 'Locks qualified inbound prospects into high-value deals and booked calendar appointments. Seamless client handover synced directly with your enterprise CRM.',
  },
];

export default function WorkflowSteps() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll tracking: 420vh total height ensures 6 deliberate scroll intervals
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  // Allocate 95% of the scroll track to the 6 level wipe transitions, holding on Stage 07.
  const TRANSITION_FRACTION = 0.95;
  const transitionProgress = Math.min(1, scrollProgress / TRANSITION_FRACTION);
  const isFinalStatic = transitionProgress >= 1;

  const totalStages = STAGES.length; // 7
  const numSegments = totalStages - 1; // 6
  const rawProgress = transitionProgress * numSegments;
  const currentIdx = isFinalStatic
    ? totalStages - 1
    : Math.min(totalStages - 2, Math.floor(rawProgress));
  const nextIdx = isFinalStatic
    ? totalStages - 1
    : Math.min(totalStages - 1, currentIdx + 1);
  const segmentT = isFinalStatic ? 1 : Math.max(0, Math.min(1, rawProgress - currentIdx));

  // The cross line travels from bottom (100%) to top (0%)
  const lineY = isFinalStatic ? 0 : (1 - segmentT) * 100;

  const currentStage = STAGES[currentIdx] || STAGES[0];
  const nextStage = STAGES[nextIdx] || STAGES[totalStages - 1];

  const handleStageClick = (idx) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    const containerTop = containerRef.current.offsetTop;
    const targetScroll = containerTop + (idx / numSegments) * (totalHeight * TRANSITION_FRACTION);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="workflow"
      className="relative z-10 bg-white text-zinc-900 select-none"
      style={{ height: '380vh' }}
    >
      {/* ============================================================== */}
      {/* PINNED VIEWPORT: Stays sticky across the 6 transition intervals */}
      {/* ============================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-white">
        
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[750px] bg-orange-500/8 blur-[190px] pointer-events-none rounded-full" />
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-amber-500/6 blur-[160px] pointer-events-none rounded-full" />

        {/* ============================================================== */}
        {/* DUAL-LAYER SCANNER WIPE ENGINE:                                */}
        {/* Layer 1 (Current stage) clipped from lineY down to 100%        */}
        {/* Layer 2 (Next stage) clipped from 0% down to lineY             */}
        {/* Open cells grid: No closed border, soft radial blend!          */}
        {/* ============================================================== */}
        <div className="relative w-full h-full flex-1">
          
          {/* ------------------------------------------------------------ */}
          {/* LAYER 1: CURRENT STAGE (Visible above the moving cross line) */}
          {/* ------------------------------------------------------------ */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16"
            style={{
              clipPath: `inset(0% 0% ${100 - lineY}% 0%)`,
            }}
          >
            {/* Top-Left: Headings */}
            <div className="max-w-xl z-10 text-left pt-6 sm:pt-4">
              <span className="font-mono text-xs sm:text-sm text-orange-600 font-bold tracking-widest block mb-2 uppercase">
                {currentStage.number}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-zinc-950 tracking-tight leading-[1.08]">
                {currentStage.title}
              </h2>
            </div>

            {/* Center: Open-cell grid with soft blended edges (NO closed rectangle border) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="relative w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] lg:w-[520px] lg:h-[520px] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(249, 115, 22, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(249, 115, 22, 0.12) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                  maskImage: 'radial-gradient(circle at center, black 45%, transparent 95%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 95%)',
                }}
              >
                <StageGraphic stageNumber={currentStage.number} />
              </div>
            </div>

            {/* Bottom-Right: Narrative Description */}
            <div className="flex justify-end w-full z-10 pb-8 sm:pb-6">
              <p className="text-sm sm:text-base text-zinc-600 font-light max-w-sm sm:max-w-md leading-relaxed text-right">
                {currentStage.desc}
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* LAYER 2: NEXT STAGE (Revealed below the moving cross line)    */}
          {/* ------------------------------------------------------------ */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16"
            style={{
              clipPath: `inset(${lineY}% 0% 0% 0%)`,
            }}
          >
            {/* Top-Left: Next Headings */}
            <div className="max-w-xl z-10 text-left pt-6 sm:pt-4">
              <span className="font-mono text-xs sm:text-sm text-orange-600 font-bold tracking-widest block mb-2 uppercase">
                {nextStage.number}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-zinc-950 tracking-tight leading-[1.08]">
                {nextStage.title}
              </h2>
            </div>

            {/* Center: Next Vector Illustration in Same Open-cell Grid Location */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="relative w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] lg:w-[520px] lg:h-[520px] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(249, 115, 22, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(249, 115, 22, 0.12) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                  maskImage: 'radial-gradient(circle at center, black 45%, transparent 95%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 95%)',
                }}
              >
                <StageGraphic stageNumber={nextStage.number} />
              </div>
            </div>

            {/* Bottom-Right: Next Description */}
            <div className="flex justify-end w-full z-10 pb-8 sm:pb-6">
              <p className="text-sm sm:text-base text-zinc-600 font-light max-w-sm sm:max-w-md leading-relaxed text-right">
                {nextStage.desc}
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* THE TRAVELING CROSS LINE: MOVES SMOOTHLY FROM BOTTOM TO TOP   */}
          {/* Separates the old stage above & new stage below               */}
          {/* ============================================================ */}
          <div
            className="absolute inset-x-0 z-30 pointer-events-none flex items-center transition-opacity duration-300"
            style={{
              top: `${lineY}%`,
              opacity: isFinalStatic ? 0 : 1,
            }}
          >
            {/* The horizontal cross line with orange neon glow */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_12px_#ff6b00]" />
          </div>
        </div>
      </div>
    </section>
  );
}
