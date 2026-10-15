import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import WorkflowSteps from './components/sections/WorkflowSteps';
import Neural3DSection from './components/sections/Neural3DSection';
import StageDeepDiveSection from './components/sections/StageDeepDiveSection';
import ContactSection from './components/sections/ContactSection';

/**
 * possiblestudio.ai - Main Application Landing Page
 * Autonomous Marketing & Advertising AI Agent
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col selection:bg-purple-600/30 selection:text-purple-200">
      {/* Global Header Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section: Cinematic reveal with close-up agent graphic */}
        <HeroSection />

        {/* 2. 7-Stage Continuous Interactive Workflow */}
        <WorkflowSteps />

        {/* 3. Interactive 3D Spline Neural Core with Minimal Text */}
        <Neural3DSection />

        {/* 4. Deep-Dive Stage-by-Stage Scroll Pinned Narrative (Alternating Agent View, No Sub-cards) */}
        <StageDeepDiveSection />

        {/* 5. High-Impact Contact & Pipeline Deployment */}
        <ContactSection />
      </main>

      {/* Global Corporate Footer */}
      <Footer />
    </div>
  );
}
