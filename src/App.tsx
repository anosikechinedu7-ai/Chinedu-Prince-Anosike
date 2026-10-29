/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowreelPlayer } from './components/ShowreelPlayer';
import { ProjectsArchive } from './components/ProjectsArchive';
import { KineticLab } from './components/KineticLab';
import { AboutPhilosophy } from './components/AboutPhilosophy';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types/portfolio';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('work');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenCommission = () => {
    handleNavigate('inquiry');
  };

  return (
    <div className="min-h-screen bg-[#050608] text-[#F4F6F8] selection:bg-[#02A9EF] selection:text-[#050608] flex flex-col">
      {/* Persistent Hairline Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCommission={handleOpenCommission}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Monumental Editorial Hero */}
        <Hero
          onPlayReel={() => handleNavigate('reel')}
          onExploreWork={() => handleNavigate('work')}
          onOpenCommission={handleOpenCommission}
        />

        {/* 01 / Curated Works Archive */}
        <ProjectsArchive onSelectProject={(project) => setSelectedProject(project)} />

        {/* 02 / Cinematic Showreel & Motion Scrubber */}
        <ShowreelPlayer />

        {/* 03 / Kinetic Lab & Physics Engine */}
        <KineticLab />

        {/* 04 / Studio Architecture & Philosophy */}
        <AboutPhilosophy />

        {/* 05 / Commissioning & Dialogue */}
        <InquirySection />
      </main>

      {/* Minimalist Footing */}
      <Footer />

      {/* Deep Case Study Modal / Drawer */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
          allProjects={PROJECTS}
        />
      )}
    </div>
  );
}
