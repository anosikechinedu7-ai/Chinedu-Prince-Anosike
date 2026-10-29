import React, { useState } from 'react';
import { ArrowUpRight, Filter, Eye, Grid, Columns } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types/portfolio';

interface ProjectsArchiveProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsArchive: React.FC<ProjectsArchiveProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [viewLayout, setViewLayout] = useState<'staggered' | 'uniform'>('staggered');

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: 'all', label: 'ALL WORKS', count: PROJECTS.length },
    { id: 'motion', label: '3D & MOTION DIRECTION', count: PROJECTS.filter((p) => p.category === 'motion').length },
    { id: 'brand', label: 'BRAND SYSTEMS', count: PROJECTS.filter((p) => p.category === 'brand').length },
    { id: 'titles', label: 'FILM TITLES & CGI', count: PROJECTS.filter((p) => p.category === 'titles').length },
    { id: 'kinetic', label: 'KINETIC LAB', count: PROJECTS.filter((p) => p.category === 'kinetic').length },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-20 sm:py-28 border-b border-[#1B2B38] bg-[#050608]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#1B2B38]">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02A9EF]"></span>
              01 / CURATED REPOSITORY
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#F4F6F8] tracking-[-0.02em]">
              Selected Architectural &amp; Motion Works
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-interface uppercase tracking-[0.08em] transition-editorial cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#02A9EF] text-[#050608] font-medium'
                    : 'bg-[#091B29] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8] hover:border-[#3E4850]'
                }`}
              >
                {cat.label} [{cat.count}]
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            // Staggered column spanning to give editorial museum cadence
            const isWide = viewLayout === 'staggered' && (index % 3 === 0 || index === 4);
            const colSpan = isWide ? 'lg:col-span-8' : 'lg:col-span-4';
            const mediaRatio = project.aspectRatio === '4:5' && !isWide ? 'aspect-[4/5]' : 'aspect-video';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`${colSpan} group cursor-pointer transition-editorial duration-200 hover:-translate-y-1`}
              >
                {/* Container (12px radius, #091B29 bg, 1px #1B2B38 hairline, hover border #0F2A3F / #02A9EF) */}
                <div className="rounded-[12px] bg-[#091B29] border border-[#1B2B38] group-hover:border-[#02A9EF]/50 p-4 sm:p-5 flex flex-col justify-between h-full">
                  {/* Media Port (2px radius) */}
                  <div className={`relative ${mediaRatio} w-full rounded-[2px] overflow-hidden bg-[#050608] mb-5`}>
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Subtle Corner Badge */}
                    <div className="absolute top-3 left-3 bg-[#050608]/85 border border-[#1B2B38] px-2 py-0.5 rounded-[2px] text-[10px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em]">
                      {project.year}
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-[#050608]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="rounded-full bg-[#02A9EF] text-[#050608] px-4 py-2 font-interface font-medium text-[13px] flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span>INSPECT STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Meta & Title */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-interface uppercase tracking-[0.08em] text-[#9AA7B2]">
                      <span className="text-[#02A9EF] font-medium">{project.client}</span>
                      <span>{project.categoryLabel}</span>
                    </div>

                    <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#F4F6F8] tracking-[-0.015em] group-hover:text-[#02A9EF] transition-colors">
                      {project.title}
                    </h3>

                    <p className="font-interface text-[14px] text-[#9AA7B2] line-clamp-2 leading-relaxed">
                      {project.headline}
                    </p>

                    {/* Tags row (2px radius) */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#1B2B38]/60">
                      {project.tools.slice(0, 3).map((tool, i) => (
                        <span
                          key={i}
                          className="rounded-[2px] bg-[#050608] border border-[#1B2B38] text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] px-2 py-0.5"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.duration && (
                        <span className="rounded-[2px] bg-[#050608] border border-[#1B2B38] text-[11px] font-interface text-[#02A9EF] uppercase tracking-[0.08em] px-2 py-0.5">
                          {project.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
