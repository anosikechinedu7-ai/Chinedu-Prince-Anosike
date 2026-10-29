import React from 'react';
import { Play, ArrowDown, Sparkles, Layers, Sliders, Globe } from 'lucide-react';

interface HeroProps {
  onPlayReel: () => void;
  onExploreWork: () => void;
  onOpenCommission: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPlayReel,
  onExploreWork,
  onOpenCommission,
}) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 border-b border-[#1B2B38] overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="max-w-[1280px] h-full mx-auto px-4 sm:px-8 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 divide-x divide-[#1B2B38]/30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Top Editorial Index Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#1B2B38]">
          <div className="flex items-center gap-3">
            <span className="font-interface text-[12px] uppercase tracking-[0.08em] text-[#9AA7B2]">
              FOLIO REF: PA-2026-V8
            </span>
            <span className="text-[#3E4850]">/</span>
            <span className="font-interface text-[12px] uppercase tracking-[0.08em] text-[#02A9EF]">
              MOTION ARCHITECTURE & 3D
            </span>
          </div>

          <div className="flex items-center gap-6 text-[12px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em]">
            <span className="hidden sm:inline">WEST AFRICA · GLOBAL REMOTE</span>
            <span className="text-[#3E4850] hidden sm:inline">/</span>
            <span className="text-[#F4F6F8]">STUDIO DIRECTORY</span>
          </div>
        </div>

        {/* Monumental Display Name */}
        <div className="pt-10 sm:pt-16 pb-6">
          <p className="font-interface text-[13px] sm:text-[14px] uppercase tracking-[0.08em] text-[#9AA7B2] mb-3">
            DIRECTOR & DESIGNER
          </p>
          <h1 className="font-editorial text-[68px] sm:text-[110px] md:text-[160px] lg:text-[200px] xl:text-[220px] font-semibold leading-[0.88] tracking-[-0.03em] text-[#F4F6F8]">
            PRINCE
            <span className="block italic font-normal text-[#e3e2e5]">ANOSIKE</span>
          </h1>
        </div>

        {/* Juxtaposed Technical Sans Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#1B2B38] items-end">
          <div className="lg:col-span-7">
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-medium text-[#F4F6F8] leading-tight tracking-[-0.015em] mb-4">
              Form, velocity, and the architecture of time.
            </h2>
            <p className="font-interface text-[16px] sm:text-[18px] text-[#9AA7B2] leading-relaxed max-w-[620px]">
              Lagos-based Graphics &amp; Motion Designer directing high-concept 3D brand identities, cinema title sequences, procedural physics simulations, and audiovisual architectures for cultural institutions and global clients.
            </p>
          </div>

          {/* Action Triggers */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3 sm:gap-4">
            <button
              onClick={onPlayReel}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#02A9EF] hover:bg-[#0287BF] text-[#050608] font-interface font-medium text-[15px] px-7 py-3.5 hover:-translate-y-0.5 transition-editorial cursor-pointer group"
            >
              <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
              <span>PLAY 2026 REEL [03:40]</span>
            </button>

            <button
              onClick={onExploreWork}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1B2B38] hover:border-[#02A9EF] text-[#F4F6F8] hover:text-[#02A9EF] hover:bg-[#02A9EF]/5 font-interface font-medium text-[15px] px-7 py-3.5 transition-editorial cursor-pointer"
            >
              <span>EXPLORE WORKS</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Technical Telemetry Dashboard Bar */}
        <div className="mt-14 pt-6 border-t border-[#1B2B38] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-[#091B29]/60 p-4 sm:p-6 rounded-[12px] border">
          <div>
            <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1">
              Primary Disciplines
            </div>
            <div className="text-[14px] font-interface font-medium text-[#F4F6F8]">
              3D CGI · Titles · Brand Identity
            </div>
          </div>

          <div>
            <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1">
              Active Production
            </div>
            <div className="text-[14px] font-interface font-medium text-[#F4F6F8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02A9EF]"></span>
              Atlas Horizon &amp; Obelisk
            </div>
          </div>

          <div>
            <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1">
              Color Pipeline
            </div>
            <div className="text-[14px] font-interface font-medium text-[#F4F6F8]">
              ACEScg · 32-bit Float
            </div>
          </div>

          <div>
            <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1">
              Studio Coordinates
            </div>
            <div className="text-[14px] font-interface font-medium text-[#02A9EF]">
              06°27&apos;11&quot; N 03°23&apos;45&quot; E
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
