import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import WorkflowSteps from './components/sections/WorkflowSteps';
import CapabilitiesWorkflowSection from './components/sections/CapabilitiesWorkflowSection';
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

        {/* 2. 7-Stage Continuous Interactive Workflow */}
        <WorkflowSteps />

        {/* 3 & 4. Merged Neural Aerospace & Converging 7-Card Workflow Pipeline */}
        <CapabilitiesWorkflowSection />

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
