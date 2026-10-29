import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Clock, Disc } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCommission: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenCommission,
}) => {
  const [lagosTime, setLagosTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      // Lagos is West Africa Time (WAT) = UTC+1
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setLagosTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'work', label: 'SELECTED WORKS', index: '01' },
    { id: 'reel', label: 'SHOWREEL', index: '02' },
    { id: 'lab', label: 'KINETIC LAB', index: '03' },
    { id: 'about', label: 'ARCHITECTURE', index: '04' },
    { id: 'inquiry', label: 'INQUIRE', index: '05' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#050608]/95 backdrop-none border-[#1B2B38]'
          : 'bg-[#050608] border-[#1B2B38]'
      }`}
    >
      {/* Top Telemetry Strip */}
      <div className="w-full border-b border-[#1B2B38] bg-[#091B29] text-[#9AA7B2] text-[11px] font-['Outfit'] uppercase tracking-[0.08em] px-4 sm:px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#F4F6F8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ED47A] animate-pulse"></span>
            AVAILABLE FOR SELECT COMMISSIONS
          </span>
          <span className="hidden md:inline text-[#3E4850]">/</span>
          <span className="hidden md:inline text-[#9AA7B2]">Q4 2026 — Q1 2027</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#02A9EF]" />
            <span>LAGOS, NG {lagosTime ? `${lagosTime} WAT` : '00:00:00 WAT'}</span>
          </div>
          <span className="hidden lg:inline text-[#3E4850]">|</span>
          <span className="hidden lg:inline">24.00 FPS / ACEScg</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-left group flex items-baseline gap-2 cursor-pointer focus:outline-none"
        >
          <span className="font-editorial text-2xl sm:text-[28px] font-semibold text-[#F4F6F8] tracking-[-0.02em] group-hover:text-[#02A9EF] transition-colors">
            PRINCE ANOSIKE
          </span>
          <span className="hidden sm:inline font-interface text-[12px] uppercase tracking-[0.08em] text-[#9AA7B2]">
            / MOTION & 3D
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`group flex items-center gap-1.5 text-[13px] font-interface uppercase tracking-[0.08em] cursor-pointer focus:outline-none transition-editorial ${
                  isActive ? 'text-[#02A9EF]' : 'text-[#9AA7B2] hover:text-[#F4F6F8]'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-[#02A9EF]' : 'text-[#3E4850] group-hover:text-[#9AA7B2]'}`}>
                  {item.index}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCommission}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#1B2B38] hover:border-[#02A9EF] text-[#F4F6F8] hover:text-[#02A9EF] hover:bg-[#02A9EF]/5 px-5 py-2 text-[13px] font-interface font-medium tracking-[0.02em] transition-editorial cursor-pointer"
          >
            <span>START A COMMISSION</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#02A9EF]" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-[2px] border border-[#1B2B38] text-[#F4F6F8] hover:border-[#02A9EF] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#02A9EF]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#091B29] border-b border-[#1B2B38] px-6 py-6 transition-editorial">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="flex items-center justify-between text-left py-2 border-b border-[#1B2B38] text-[#F4F6F8] font-interface text-[14px] uppercase tracking-[0.08em]"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[11px] text-[#02A9EF]">{item.index}</span>
                  <span>{item.label}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#9AA7B2]" />
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommission();
              }}
              className="mt-2 w-full py-3 rounded-full bg-[#02A9EF] hover:bg-[#0287BF] text-[#050608] font-interface font-medium text-[14px] tracking-[0.02em] flex items-center justify-center gap-2"
            >
              <span>START A COMMISSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
