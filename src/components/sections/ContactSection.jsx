import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Clock,
  ShieldCheck,
  Globe2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15, once: false });

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$10k - $50k',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'

  const budgetOptions = ['< $10k', '$10k - $50k', '$50k - $150k', '$150k+'];

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@possiblestudio.ai');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          budget: '$10k - $50k',
          message: '',
        });
        setStatus('idle');
      }, 3500);
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-16 sm:py-20 lg:py-24 bg-white overflow-hidden select-none flex flex-col justify-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-orange-500/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-amber-500/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_75%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-zinc-950 tracking-[-0.04em] leading-[1.08] mb-3">
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Ready to automate your pipeline?
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="font-normal bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent block mt-1"
            >
              Let's build together.
            </motion.span>
          </h2>

        </div>

        {/* ============================================================== */}
        {/* CENTERED CONTACT FORM CONTAINER                                */}
        {/* ============================================================== */}
        <div className="flex justify-center items-center w-full">
          {/* Falling from top animation: fast initial drop with smooth deceleration */}
          <motion.div
            initial={{ opacity: 0, y: -130 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -130 }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white/95 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-orange-500/5"
          >
            {/* Ambient card glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-orange-500/10 blur-[70px] pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider block">
                    Your Name <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-light"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider block">
                    Work Email <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-light"
                  />
                </div>
              </div>

              {/* Company / Brand URL */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider block">
                  Company / Brand Website
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-light"
                />
              </div>

              {/* Project Brief / Goals */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider block">
                  Project Brief & Campaign Goals
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-light resize-none"
                />
              </div>

              {/* Submit Button & Status Feedback */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full py-3 px-6 rounded-xl font-medium text-xs sm:text-sm tracking-wide text-white bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 border border-orange-400/30 disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {status === 'sending' && (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  )}

                  {status === 'success' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span className="text-emerald-100">Inquiry Transmitted • AI Closer Assigned</span>
                    </>
                  )}

                  {status === 'idle' && (
                    <>
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
