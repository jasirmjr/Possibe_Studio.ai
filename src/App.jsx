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
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-orange-500/25 selection:text-orange-950">
      {/* Global Header Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section: Cinematic reveal with close-up agent graphic */}
        <HeroSection />

        {/* 2. 7-Stage Workflow Steps (With Section 3 sliding in from left over static Stage 07) */}
        <WorkflowSteps />

        {/* 4. Stage-by-Stage Scroll Pinned Narrative (Alternating Agent View) */}
        <StageDeepDiveSection />

        {/* 5. High-Impact Contact & Pipeline Deployment */}
        <ContactSection />
      </main>

      {/* Global Corporate Footer */}
      <Footer />
    </div>
  );
}
