import React from 'react';
import { motion } from 'framer-motion';
import {
  Wand2,
  Layers,
  Rocket,
  MapPin,
  Bot,
  BarChart3,
  Shield,
  Sparkles,
  Zap,
  Globe2,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function FeatureGrid() {
  return (
    <section id="capabilities" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-400 mb-4">
            <Zap className="w-3.5 h-3.5" />
            AUTONOMOUS CAPABILITY MATRIX
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered for companies that refuse to{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              babysit marketing
            </span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Possiblestudio.ai eliminates prompt fatigue, fragmented SaaS stacks, and slow human turnarounds by operating as an end-to-end autonomous ad workforce.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Zero Prompt Engineering (Wide 2-col on lg) */}
          <GlassCard
            glowColor="purple"
            className="lg:col-span-2 relative min-h-[380px] flex flex-col justify-between overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Wand2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                  Intent Architecture
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Zero Prompt Engineering Required
              </h3>
              <p className="text-sm text-zinc-400 max-w-lg leading-relaxed mb-6">
                Never write another 500-word prompt with camera focal lengths and hex codes. The agent interprets simple human intent and maps it directly against proven high-conversion advertising frameworks.
              </p>
            </div>

            {/* Interactive Visual Graphic inside Card */}
            <div className="relative z-10 rounded-xl bg-zinc-900/90 border border-zinc-800 p-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span className="text-purple-400 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" /> Neural Semantic Extractor
                </span>
                <span className="text-emerald-400">Zero Prompt Loss: 0.00%</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-850">
                  <span className="text-[10px] text-zinc-500 block">Raw Input</span>
                  <span className="text-zinc-200 font-mono font-medium">"Smart ring for deep sleep"</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-purple-500/30">
                  <span className="text-[10px] text-purple-400 block">Synthesized Hook</span>
                  <span className="text-purple-200 font-mono font-medium">Circadian rhythm recovery</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-cyan-500/30">
                  <span className="text-[10px] text-cyan-400 block">Target Cluster</span>
                  <span className="text-cyan-200 font-mono font-medium">Biohackers & Execs 28-45</span>
                </div>
              </div>
            </div>

            {/* Subtle glow highlight on corner */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-purple-500/15 blur-3xl pointer-events-none" />
          </GlassCard>

          {/* Bento Card 2: Autonomous Creative Generation (1 col on lg) */}
          <GlassCard
            glowColor="cyan"
            className="relative min-h-[380px] flex flex-col justify-between overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  Visual Generation
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Brand-Governed Creative Studio
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Generates vector logos, crisp typography, and photorealistic high-fashion or tech posters strictly adhering to corporate brand manuals.
              </p>
            </div>

            {/* Agent Desk Cutout Graphic preview */}
            <div className="relative z-10 mt-4 rounded-xl bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800 p-3 overflow-hidden flex items-center justify-center">
              <img
                src="/images/agent-desk.png"
                alt="Agent workstation"
                className="w-44 h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 inset-x-2 py-1 px-2 rounded bg-zinc-950/90 border border-zinc-800/80 text-center">
                <span className="text-[10px] font-mono text-zinc-400">Resolution: 4096 x 4096 • CMYK & RGB</span>
              </div>
            </div>
          </GlassCard>

          {/* Bento Card 3: Automated Social Publishing (1 col on lg) */}
          <GlassCard
            glowColor="cyan"
            className="relative min-h-[380px] flex flex-col justify-between overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  API Dispatch
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Multi-Channel Auto-Publish
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Zero manual exporting. Directly interfaces with Meta Graph, TikTok Commercial API, and LinkedIn Marketing for instantaneous publishing.
              </p>
            </div>

            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs">
                <span className="text-zinc-300 font-medium">Meta & Instagram</span>
                <span className="text-emerald-400 font-mono text-[11px]">Synced [Auto-Captioned]</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs">
                <span className="text-zinc-300 font-medium">TikTok & Reels</span>
                <span className="text-cyan-400 font-mono text-[11px]">Synced [Audio Matched]</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs">
                <span className="text-zinc-300 font-medium">LinkedIn Pulse</span>
                <span className="text-purple-400 font-mono text-[11px]">Synced [Executive Copy]</span>
              </div>
            </div>
          </GlassCard>

          {/* Bento Card 4: Smart Ad Deployment & Geo Targeting (Wide 2-col on lg) */}
          <GlassCard
            glowColor="emerald"
            className="lg:col-span-2 relative min-h-[380px] flex flex-col justify-between overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Smart Ad Engine
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Autonomous Geo-Fencing & Predictive Lookalikes
              </h3>
              <p className="text-sm text-zinc-400 max-w-lg leading-relaxed mb-6">
                Set budget and duration. The agent calculates postal-level purchasing parity, historical intent clusters, and runs programmatic bid adjustments to protect your margin.
              </p>
            </div>

            {/* Live Interactive Telemetry Box */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-[11px] text-zinc-500 font-mono block">Dynamic Geo Radius</span>
                <span className="text-base font-bold text-white font-mono mt-0.5 block">5km - 50km Fencing</span>
                <span className="text-[10px] text-emerald-400 mt-1 block">✓ Auto-bidding excluded dead zones</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-[11px] text-zinc-500 font-mono block">Cost Per Acquisition</span>
                <span className="text-base font-bold text-emerald-400 font-mono mt-0.5 block">-42.8% Average</span>
                <span className="text-[10px] text-zinc-400 mt-1 block">Across 180+ verified campaigns</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-[11px] text-zinc-500 font-mono block">Human Intervention</span>
                <span className="text-base font-bold text-purple-400 font-mono mt-0.5 block">0 Hours / Week</span>
                <span className="text-[10px] text-zinc-400 mt-1 block">Full autonomy end-to-end</span>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-500/10 blur-3xl pointer-events-none" />
          </GlassCard>

          {/* Bento Card 5: Conversational 24/7 AI Closer (Full width on lg) */}
          <GlassCard
            glowColor="purple"
            className="lg:col-span-3 relative min-h-[300px] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden group"
          >
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  24/7 Conversational AI Lead Engine
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Never lose another lead to a slow sales rep
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                The moment a user comments on your ad or submits a form, our multi-lingual agent engages via WhatsApp, SMS, or DM in under 30 seconds. It answers technical questions, overcomes objections, and locks calendar meetings directly.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> &lt; 30s First Contact
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <CheckCircle className="w-4 h-4" /> 48+ Languages
                </span>
                <span className="flex items-center gap-1.5 text-purple-400">
                  <CheckCircle className="w-4 h-4" /> Google Calendar & HubSpot Synced
                </span>
              </div>
            </div>

            {/* Quick Action visual */}
            <div className="relative z-10 shrink-0 w-full md:w-80 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-xs font-mono">
                <span className="text-zinc-400">Live Lead Status</span>
                <span className="text-emerald-400 animate-pulse">Engaging Now</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
                  <span className="text-[10px] text-zinc-500">Channel:</span> WhatsApp Business API
                </div>
                <div className="p-2 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
                  <span className="text-[10px] text-zinc-500">Qualification:</span> Enterprise ($50k+ Tier)
                </div>
                <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-center">
                  Demo Booked in 42 seconds
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none" />
          </GlassCard>

        </div>
      </div>
    </section>
  );
}
