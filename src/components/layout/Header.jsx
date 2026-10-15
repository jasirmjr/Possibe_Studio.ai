import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, Menu, X, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Workflow', href: '#workflow' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Stages', href: '#stages-deep-dive' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/90 shadow-2xl shadow-orange-950/20 py-2.5 px-4 sm:px-6'
            : 'bg-zinc-950/40 backdrop-blur-md border border-zinc-800/40 py-3.5 px-5 sm:px-7'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
           
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                possible<span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">studio.ai</span>
               
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800/40 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & Live Agent Pill */}
          <div className="hidden sm:flex items-center gap-3">
            

            <Button
              variant="primary"
              size="sm"
              iconRight={ArrowRight}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden mt-2 mx-auto max-w-7xl rounded-2xl bg-zinc-950/95 border border-zinc-800 backdrop-blur-2xl p-5 shadow-2xl shadow-purple-950/40"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                <span className="text-xs font-mono text-zinc-400">Autonomous Core</span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Agent Online
                </span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  iconRight={ArrowRight}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
