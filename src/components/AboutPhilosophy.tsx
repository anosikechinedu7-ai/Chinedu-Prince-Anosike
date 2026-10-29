import React from 'react';
import { ArrowUpRight, Award, Compass, Sparkles, Terminal } from 'lucide-react';
import { CLIENT_ROSTER, DISCIPLINE_MATRIX, HONORS_AWARDS } from '../data/portfolioData';

export const AboutPhilosophy: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 border-b border-[#1B2B38] bg-[#050608]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Index Marker */}
        <div className="flex items-center gap-2 text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em] mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#02A9EF]"></span>
          04 / STUDIO ARCHITECTURE &amp; PHILOSOPHY
        </div>

        {/* Editorial Manifesto Headline */}
        <div className="pt-4 pb-12 border-b border-[#1B2B38]">
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] text-[#F4F6F8] leading-[1.05] max-w-[1000px]">
            &ldquo;Motion is not ornamentation. It is temporal architecture carved from illumination and physics.&rdquo;
          </h2>
        </div>

        {/* Bio & Reading Copy (constrained to max 720px as per layout rules) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-14 border-b border-[#1B2B38]">
          <div className="lg:col-span-4">
            <div className="p-6 rounded-[12px] bg-[#091B29] border border-[#1B2B38] space-y-4">
              <div className="text-[11px] font-interface text-[#02A9EF] uppercase tracking-[0.08em]">
                STUDIO BIOGRAPHY //
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#F4F6F8]">
                Prince Anosike
              </h3>
              <p className="font-interface text-[14px] text-[#9AA7B2] leading-relaxed">
                Operating from Lagos, Nigeria with ongoing commissions across London, Berlin, New York, and Geneva.
              </p>
              <div className="pt-4 border-t border-[#1B2B38] space-y-2 text-[12px] font-interface text-[#9AA7B2]">
                <div className="flex justify-between">
                  <span>Specialization:</span>
                  <span className="text-[#F4F6F8]">3D &amp; CGI Motion</span>
                </div>
                <div className="flex justify-between">
                  <span>Color Space:</span>
                  <span className="text-[#02A9EF]">ACEScg Rec.2020</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Zone:</span>
                  <span className="text-[#F4F6F8]">WAT (UTC+1)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 max-w-[720px] space-y-6">
            <p className="font-interface text-[18px] sm:text-[20px] text-[#F4F6F8] leading-relaxed font-light">
              Over the past eight years, my practice has investigated how brutalist typography, procedural physics simulations, and African geometric traditions coalesce into authoritative motion systems.
            </p>
            <p className="font-interface text-[16px] text-[#9AA7B2] leading-relaxed">
              In an industry oversaturated with frictionless software templates and algorithmic trends, I adhere to a doctrine of restrained luxury. Every millimeter of displacement, every frame of ease, and every photon of volumetric light is calibrated against physical laws and editorial typographic discipline.
            </p>
            <p className="font-interface text-[16px] text-[#9AA7B2] leading-relaxed">
              Whether directing an opening title sequence for a cinema release, sculpting hard-surface CGI for Swiss horological maisons, or building generative audiovisual identities for music collectives, the goal remains singular: work that endures beyond the timeline.
            </p>
          </div>
        </div>

        {/* Milestone Stats Grid (stat-display: Outfit 64px, 500, line-height 68px, -0.02em tracking) */}
        <div className="py-14 border-b border-[#1B2B38] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="p-6 rounded-[12px] bg-[#091B29] border border-[#1B2B38]">
            <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
              STUDIO TENURE
            </div>
            <div className="font-interface text-5xl sm:text-[64px] font-medium leading-[68px] tracking-[-0.02em] text-[#F4F6F8]">
              08<span className="text-[#02A9EF] text-3xl font-normal">+</span>
            </div>
            <div className="mt-2 text-[13px] font-interface text-[#9AA7B2]">
              Years of Direction Practice
            </div>
          </div>

          <div className="p-6 rounded-[12px] bg-[#091B29] border border-[#1B2B38]">
            <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
              COMMISSIONED PRODUCTIONS
            </div>
            <div className="font-interface text-5xl sm:text-[64px] font-medium leading-[68px] tracking-[-0.02em] text-[#F4F6F8]">
              46<span className="text-[#02A9EF] text-3xl font-normal">+</span>
            </div>
            <div className="mt-2 text-[13px] font-interface text-[#9AA7B2]">
              Global Brand &amp; Film Releases
            </div>
          </div>

          <div className="p-6 rounded-[12px] bg-[#091B29] border border-[#1B2B38]">
            <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
              INTERNATIONAL HONORS
            </div>
            <div className="font-interface text-5xl sm:text-[64px] font-medium leading-[68px] tracking-[-0.02em] text-[#F4F6F8]">
              14
            </div>
            <div className="mt-2 text-[13px] font-interface text-[#9AA7B2]">
              TDC, ADC, Vimeo Picks &amp; D&amp;AD
            </div>
          </div>

          <div className="p-6 rounded-[12px] bg-[#091B29] border border-[#1B2B38]">
            <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
              PIPELINE FIDELITY
            </div>
            <div className="font-interface text-5xl sm:text-[64px] font-medium leading-[68px] tracking-[-0.02em] text-[#2ED47A]">
              100<span className="text-[#2ED47A] text-3xl font-normal">%</span>
            </div>
            <div className="mt-2 text-[13px] font-interface text-[#9AA7B2]">
              ACEScg Mastered &amp; Native 4K
            </div>
          </div>
        </div>

        {/* Discipline Matrix */}
        <div className="py-14 border-b border-[#1B2B38]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-editorial text-2xl sm:text-4xl font-semibold text-[#F4F6F8]">
              Core Capabilities &amp; Disciplines
            </h3>
            <span className="text-[12px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em]">
              DISCIPLINE MATRIX
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DISCIPLINE_MATRIX.map((item) => (
              <div
                key={item.num}
                className="p-6 sm:p-8 rounded-[12px] bg-[#091B29] border border-[#1B2B38] hover:border-[#02A9EF]/50 transition-editorial flex flex-col justify-between"
              >
                <div>
                  <div className="text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em] mb-2">
                    {item.num} // DISCIPLINE
                  </div>
                  <h4 className="font-editorial text-2xl font-medium text-[#F4F6F8] mb-3">
                    {item.title}
                  </h4>
                  <p className="font-interface text-[15px] text-[#9AA7B2] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1B2B38]">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-[2px] bg-[#050608] border border-[#1B2B38] text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Roster & Honors */}
        <div className="pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Client Roster */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#1B2B38]">
              <h3 className="font-editorial text-2xl font-medium text-[#F4F6F8]">
                Selected Client Roster
              </h3>
              <span className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em]">
                2021 — 2026
              </span>
            </div>

            <div className="divide-y divide-[#1B2B38]">
              {CLIENT_ROSTER.map((c, i) => (
                <div key={i} className="py-3 flex items-center justify-between text-[14px] font-interface group">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-mono text-[#02A9EF]">0{i + 1}</span>
                    <span className="font-medium text-[#F4F6F8] group-hover:text-[#02A9EF] transition-colors">
                      {c.name}
                    </span>
                  </div>
                  <div className="text-right text-[13px] text-[#9AA7B2]">
                    <span className="hidden sm:inline">{c.domain} · </span>
                    <span className="text-[#3E4850] sm:text-[#9AA7B2]">{c.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Accolades */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#1B2B38]">
              <h3 className="font-editorial text-2xl font-medium text-[#F4F6F8]">
                Accolades &amp; Honors
              </h3>
              <span className="text-[11px] font-interface text-[#2ED47A] uppercase tracking-[0.08em]">
                VERIFIED
              </span>
            </div>

            <div className="space-y-4">
              {HONORS_AWARDS.map((award, i) => (
                <div
                  key={i}
                  className="p-4 rounded-[12px] bg-[#091B29] border border-[#1B2B38] flex items-start gap-3"
                >
                  <Award className="w-5 h-5 text-[#02A9EF] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-interface text-[#02A9EF] uppercase tracking-[0.08em]">
                      {award.year} // {award.project}
                    </div>
                    <div className="text-[14px] font-interface font-medium text-[#F4F6F8]">
                      {award.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
