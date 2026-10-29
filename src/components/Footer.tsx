import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-[#1B2B38] text-[#9AA7B2] font-interface text-[12px] uppercase tracking-[0.08em]">
      {/* Top Footer Banner */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#1B2B38]">
        <div>
          <span className="font-editorial text-2xl font-semibold text-[#F4F6F8] tracking-[-0.02em] block mb-1">
            PRINCE ANOSIKE
          </span>
          <p className="text-[12px] text-[#9AA7B2] normal-case tracking-normal">
            Independent Graphics &amp; Motion Direction Practice · Lagos / Remote
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-[#02A9EF]">STUDIO COLORSPACE</div>
            <div className="text-[#F4F6F8]">ACEScg / REC.2020 MASTER</div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#1B2B38] text-[#F4F6F8] hover:border-[#02A9EF] hover:text-[#02A9EF] transition-editorial cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9AA7B2]">
        <div>
          © {new Date().getFullYear()} PRINCE ANOSIKE. ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          <span>LAT 06°27&apos;N · LON 03°23&apos;E</span>
          <span className="text-[#3E4850]">/</span>
          <span>DISCIPLINE OVER TREND</span>
        </div>
      </div>
    </footer>
  );
};
