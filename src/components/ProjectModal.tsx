import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, ExternalLink, Sliders, CheckCircle2 } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  allProjects: Project[];
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'passes' | 'stills'>('overview');
  const [sliderPosition, setSliderPosition] = useState(50); // for before/after comparison
  const [isDragging, setIsDragging] = useState(false);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPosition(pos);
  };

  const hasRenderPasses = project.renderPasses && project.renderPasses.length >= 2;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050608]/90 flex items-start justify-center p-2 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-[1100px] bg-[#091B29] border border-[#1B2B38] rounded-[12px] overflow-hidden my-4 sm:my-8 text-[#F4F6F8]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B2B38] bg-[#050608]">
          <div className="flex items-center gap-3">
            <span className="font-interface text-[12px] uppercase tracking-[0.08em] text-[#02A9EF]">
              ARCHIVE REF // {project.year}
            </span>
            <span className="text-[#3E4850]">|</span>
            <span className="font-interface text-[12px] uppercase tracking-[0.08em] text-[#9AA7B2]">
              {project.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectProject(prevProject)}
              className="p-1.5 rounded-[2px] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8] hover:border-[#02A9EF] transition-colors"
              title="Previous project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectProject(nextProject)}
              className="p-1.5 rounded-[2px] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8] hover:border-[#02A9EF] transition-colors"
              title="Next project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="ml-2 p-1.5 rounded-[2px] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#FF5C5C] hover:border-[#FF5C5C] transition-colors"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Banner with Title */}
        <div className="p-6 sm:p-10 border-b border-[#1B2B38]">
          <div className="max-w-[760px]">
            <p className="font-interface text-[13px] uppercase tracking-[0.08em] text-[#9AA7B2] mb-2">
              CLIENT: {project.client.toUpperCase()}
            </p>
            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-[#F4F6F8] mb-4">
              {project.title}
            </h1>
            <p className="font-interface text-[18px] sm:text-[20px] text-[#9AA7B2] leading-relaxed">
              {project.headline}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#1B2B38]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-full font-interface text-[13px] uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#02A9EF] text-[#050608] font-medium'
                  : 'bg-[#050608] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8]'
              }`}
            >
              DIRECTOR&apos;S BRIEF &amp; SPECS
            </button>

            {hasRenderPasses && (
              <button
                onClick={() => setActiveTab('passes')}
                className={`px-4 py-2 rounded-full font-interface text-[13px] uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                  activeTab === 'passes'
                    ? 'bg-[#02A9EF] text-[#050608] font-medium'
                    : 'bg-[#050608] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8]'
                }`}
              >
                RENDER PASS COMPARISON
              </button>
            )}

            <button
              onClick={() => setActiveTab('stills')}
              className={`px-4 py-2 rounded-full font-interface text-[13px] uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                activeTab === 'stills'
                  ? 'bg-[#02A9EF] text-[#050608] font-medium'
                  : 'bg-[#050608] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8]'
              }`}
            >
              FRAME STILLS [{project.gallery.length}]
            </button>
          </div>
        </div>

        {/* Main Tab Content */}
        <div className="p-6 sm:p-10">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Synopsis & Media */}
              <div className="lg:col-span-8 space-y-8">
                {/* Main Hero Media Port (2px radius) */}
                <div className="relative aspect-video rounded-[2px] overflow-hidden border border-[#1B2B38]">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-editorial text-2xl font-medium text-[#F4F6F8] mb-3">
                    Project Narrative &amp; Direction
                  </h3>
                  <p className="font-interface text-[16px] text-[#9AA7B2] leading-relaxed">
                    {project.synopsis}
                  </p>
                </div>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1B2B38]">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="p-4 rounded-[2px] bg-[#050608] border border-[#1B2B38]">
                        <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1">
                          {m.label}
                        </div>
                        <div className="font-editorial text-2xl sm:text-3xl text-[#02A9EF] font-semibold">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Technical Metadata Spec */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-5 rounded-[12px] bg-[#050608] border border-[#1B2B38] space-y-5">
                  <div>
                    <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1.5">
                      Client
                    </div>
                    <div className="font-interface text-[15px] font-medium text-[#F4F6F8]">
                      {project.client}
                    </div>
                  </div>

                  <div className="border-t border-[#1B2B38] pt-4">
                    <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1.5">
                      Production Year
                    </div>
                    <div className="font-interface text-[15px] font-medium text-[#F4F6F8]">
                      {project.year}
                    </div>
                  </div>

                  <div className="border-t border-[#1B2B38] pt-4">
                    <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
                      Disciplines Executed
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.role.map((r, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-[2px] bg-[#091B29] border border-[#1B2B38] text-[12px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#1B2B38] pt-4">
                    <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
                      Software &amp; Hardware Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-[2px] bg-[#091B29] border border-[#1B2B38] text-[12px] font-interface text-[#F4F6F8]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.awards && (
                    <div className="border-t border-[#1B2B38] pt-4">
                      <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
                        Recognition &amp; Honors
                      </div>
                      <div className="space-y-1.5">
                        {project.awards.map((award, i) => (
                          <div key={i} className="flex items-center gap-2 text-[12px] text-[#2ED47A]">
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Interactive Render Pass Comparison Slider */}
          {activeTab === 'passes' && hasRenderPasses && project.renderPasses && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-2xl font-medium text-[#F4F6F8]">
                    Sub-Surface Topology vs. Beauty Composite
                  </h3>
                  <p className="font-interface text-[14px] text-[#9AA7B2]">
                    Drag the dividing slider to compare the raw 3D mesh against final lighting and color grade.
                  </p>
                </div>
                <div className="text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em]">
                  SPLIT: {sliderPosition.toFixed(0)}%
                </div>
              </div>

              {/* Slider Viewport */}
              <div
                className="relative aspect-video w-full rounded-[2px] overflow-hidden border border-[#1B2B38] select-none cursor-ew-resize bg-[#050608]"
                onMouseMove={(e) => isDragging && handleSliderMove(e)}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchMove={handleSliderMove}
              >
                {/* Base Layer: Clay or Wireframe */}
                <img
                  src={project.renderPasses[1].image}
                  alt={project.renderPasses[1].label}
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-150"
                />
                <div className="absolute top-4 left-4 bg-[#050608]/85 border border-[#1B2B38] px-3 py-1 rounded-[2px] text-[11px] font-interface uppercase text-[#9AA7B2] tracking-[0.08em]">
                  {project.renderPasses[1].label}
                </div>

                {/* Overlaid Layer: Beauty Pass (clipped by slider) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                >
                  <img
                    src={project.renderPasses[0].image}
                    alt={project.renderPasses[0].label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#050608]/85 border border-[#1B2B38] px-3 py-1 rounded-[2px] text-[11px] font-interface uppercase text-[#02A9EF] tracking-[0.08em]">
                    {project.renderPasses[0].label}
                  </div>
                </div>

                {/* Vertical Divider Line with handle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-[#02A9EF] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050608] border border-[#02A9EF] text-[#02A9EF] flex items-center justify-center shadow-lg">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stills Gallery */}
          {activeTab === 'stills' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-[2px] overflow-hidden border border-[#1B2B38] group bg-[#050608]"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} frame ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#050608]/80 px-2.5 py-1 rounded-[2px] border border-[#1B2B38] text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em]">
                      FRAME 0{i + 1} // 4K RAW
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Drawer Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1B2B38] bg-[#050608]">
          <button
            onClick={() => onSelectProject(nextProject)}
            className="flex items-center gap-2 text-[13px] font-interface text-[#9AA7B2] hover:text-[#02A9EF] transition-colors"
          >
            <span>NEXT PROJECT: {nextProject.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="rounded-full bg-[#02A9EF] hover:bg-[#0287BF] text-[#050608] font-interface font-medium text-[13px] px-5 py-2 transition-editorial cursor-pointer"
          >
            RETURN TO ARCHIVE
          </button>
        </div>
      </div>
    </div>
  );
};
