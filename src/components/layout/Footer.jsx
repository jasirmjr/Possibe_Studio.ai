import React from 'react';
import { Bot, Github, Twitter, Linkedin, ArrowUpRight, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] border-t border-zinc-900 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-orange-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-850 border-zinc-900">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              
              <span className="text-lg font-bold text-white tracking-tight">
                possible<span className="text-orange-400">studio</span>.ai
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              The autonomous artificial intelligence agent engineered to conceive, design, deploy, and close high-converting marketing campaigns with zero prompt friction.
            </p>

          
          </div>

          {/* Column 1: Core Agent */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Agent Core</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#workflow" className="hover:text-orange-400 transition-colors">Zero-Prompt Engine</a></li>
              <li><a href="#workflow" className="hover:text-orange-400 transition-colors">Creative Studio v2</a></li>
              <li><a href="#workflow" className="hover:text-orange-400 transition-colors">Multi-Platform Dispatch</a></li>
              <li><a href="#workflow" className="hover:text-orange-400 transition-colors">Auto-Audience GeoFencer</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition-colors">24/7 Lead AI Closer</a></li>
            </ul>
          </div>

          {/* Column 2: Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Integrations</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex items-center gap-1">Meta Ads API <ArrowUpRight className="w-3 h-3 text-zinc-600" /></span></li>
              <li><span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex items-center gap-1">TikTok Marketing <ArrowUpRight className="w-3 h-3 text-zinc-600" /></span></li>
              <li><span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex items-center gap-1">LinkedIn Campaign <ArrowUpRight className="w-3 h-3 text-zinc-600" /></span></li>
              <li><span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex items-center gap-1">Google Adwords AI <ArrowUpRight className="w-3 h-3 text-zinc-600" /></span></li>
              <li><span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex items-center gap-1">WhatsApp & HubSpot <ArrowUpRight className="w-3 h-3 text-zinc-600" /></span></li>
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Organization</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#showcase" className="hover:text-orange-400 transition-colors">Enterprise Studio</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Security & SOC2</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Protocol</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Developer Docs</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Brand Assets</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-4">
            <span>© {currentYear} possiblestudio.ai, Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span className="hidden sm:inline">Engineered for Autonomous Marketing Scale.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
