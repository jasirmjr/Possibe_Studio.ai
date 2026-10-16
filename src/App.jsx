import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import WorkflowSteps from './components/sections/WorkflowSteps';
import StageDeepDiveSection from './components/sections/StageDeepDiveSection';
import ContactSection from './components/sections/ContactSection';

/**
 * possiblestudio.ai - Main Application Landing Page
 * Autonomous Marketing & Advertising AI Agent
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col selection:bg-orange-500/30 selection:text-orange-200">
      {/* Global Header Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section: Cinematic reveal with close-up agent graphic */}
        <HeroSection />

        {/* 2 & 3. 7-Stage Workflow transitioning into Section 3 Split Left-Slide Overlay */}
        <WorkflowSteps />

        {/* 5. Stage-by-Stage Scroll Pinned Narrative (Alternating Agent View) */}
        <StageDeepDiveSection />

        {/* 6. High-Impact Contact & Pipeline Deployment */}
        <ContactSection />
      </main>

      {/* Global Corporate Footer */}
      <Footer />
    </div>
  );
}
