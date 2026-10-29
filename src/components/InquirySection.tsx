import React, { useState } from 'react';
import { Mail, Clock, MapPin, Send, CheckCircle2, Copy, Check, ArrowUpRight } from 'lucide-react';

export const InquirySection: React.FC = () => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([
    '3D Motion & CGI',
  ]);
  const [budgetTier, setBudgetTier] = useState('$25,000 — $50,000');
  const [timeline, setTimeline] = useState('Q4 2026');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const STUDIO_EMAIL = 'anosikechinedu7@gmail.com';

  const toggleDiscipline = (disc: string) => {
    if (selectedDisciplines.includes(disc)) {
      if (selectedDisciplines.length > 1) {
        setSelectedDisciplines(selectedDisciplines.filter((d) => d !== disc));
      }
    } else {
      setSelectedDisciplines([...selectedDisciplines, disc]);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const mailtoHref = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
    `Project Commission Inquiry: ${company || name || 'New Project'}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nDisciplines: ${selectedDisciplines.join(
      ', '
    )}\nBudget: ${budgetTier}\nTarget Timeline: ${timeline}\n\nProject Brief:\n${message}`
  )}`;

  return (
    <section id="inquiry" className="py-20 sm:py-28 border-b border-[#1B2B38] bg-[#050608]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#1B2B38]">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02A9EF]"></span>
              05 / COMMISSIONING &amp; DIALOGUE
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#F4F6F8] tracking-[-0.02em]">
              Initiate a Commission
            </h2>
          </div>

          <div className="text-[13px] font-interface text-[#9AA7B2] max-w-[420px]">
            Accepting select commercial commissions, title sequences, and cultural identity directions for Q4 2026 and Q1 2027.
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Studio Contact & Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-[12px] bg-[#091B29] border border-[#1B2B38] space-y-6">
              <div>
                <div className="text-[11px] font-interface text-[#02A9EF] uppercase tracking-[0.08em] mb-1">
                  DIRECT TRANSMISSION //
                </div>
                <h3 className="font-editorial text-2xl font-medium text-[#F4F6F8] mb-2">
                  Studio Headquarters
                </h3>
                <p className="font-interface text-[14px] text-[#9AA7B2] leading-relaxed">
                  For formal RFPs, representation inquiries, or private screening requests, reach out directly.
                </p>
              </div>

              {/* Email Card with one-click copy */}
              <div className="p-4 rounded-[2px] bg-[#050608] border border-[#1B2B38] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-0.5">
                    Studio Email Address
                  </div>
                  <a
                    href={`mailto:${STUDIO_EMAIL}`}
                    className="font-interface text-[15px] font-medium text-[#F4F6F8] hover:text-[#02A9EF] transition-colors"
                  >
                    {STUDIO_EMAIL}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-[2px] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#02A9EF] hover:border-[#02A9EF] transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#2ED47A]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Studio Telemetry Metadata */}
              <div className="space-y-3 pt-2 text-[13px] font-interface text-[#9AA7B2]">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#02A9EF] flex-shrink-0" />
                  <span>Victoria Island, Lagos, Nigeria [06°27&apos;N 03°23&apos;E]</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#02A9EF] flex-shrink-0" />
                  <span>Response Horizon: &lt; 24 Hours on Business Days</span>
                </div>

                <div className="flex items-center gap-3 text-[#2ED47A]">
                  <span className="w-2 h-2 rounded-full bg-[#2ED47A] animate-pulse"></span>
                  <span>Currently booking Q4 2026 / Q1 2027</span>
                </div>
              </div>

              {/* Social Index Links */}
              <div className="pt-6 border-t border-[#1B2B38]">
                <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-3">
                  STUDIO ARCHIVES &amp; CHANNELS
                </div>
                <div className="grid grid-cols-2 gap-2 text-[13px] font-interface text-[#F4F6F8]">
                  <a
                    href="https://vimeo.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-[2px] bg-[#050608] border border-[#1B2B38] hover:border-[#02A9EF] transition-colors"
                  >
                    <span>Vimeo Pro</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#02A9EF]" />
                  </a>
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-[2px] bg-[#050608] border border-[#1B2B38] hover:border-[#02A9EF] transition-colors"
                  >
                    <span>Behance</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#02A9EF]" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-[2px] bg-[#050608] border border-[#1B2B38] hover:border-[#02A9EF] transition-colors"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#02A9EF]" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-[2px] bg-[#050608] border border-[#1B2B38] hover:border-[#02A9EF] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#02A9EF]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Scoping & Commission Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-[12px] bg-[#091B29] border border-[#1B2B38]">
              {submitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#02A9EF]/10 border border-[#02A9EF] text-[#02A9EF] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-3xl font-semibold text-[#F4F6F8] mb-2">
                      Transmission Received
                    </h3>
                    <p className="font-interface text-[15px] text-[#9AA7B2] max-w-[480px] mx-auto leading-relaxed">
                      Thank you, {name || 'esteemed collaborator'}. Your brief has been formatted and queued in Prince Anosike&apos;s studio pipeline. You can also send the direct email dispatch below:
                    </p>
                  </div>

                  <div className="p-4 rounded-[2px] bg-[#050608] border border-[#1B2B38] max-w-[500px] mx-auto text-left text-[13px] font-mono text-[#9AA7B2] space-y-1">
                    <div><span className="text-[#02A9EF]">CLIENT:</span> {name} ({company || 'Independent'})</div>
                    <div><span className="text-[#02A9EF]">DISCIPLINES:</span> {selectedDisciplines.join(', ')}</div>
                    <div><span className="text-[#02A9EF]">BUDGET TIER:</span> {budgetTier}</div>
                    <div><span className="text-[#02A9EF]">TIMELINE:</span> {timeline}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <a
                      href={mailtoHref}
                      className="rounded-full bg-[#02A9EF] hover:bg-[#0287BF] text-[#050608] font-interface font-medium text-[15px] px-7 py-3.5 transition-editorial flex items-center gap-2"
                    >
                      <span>OPEN PRE-FILLED MAIL CLIENT</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="rounded-full border border-[#1B2B38] hover:border-[#02A9EF] text-[#F4F6F8] font-interface font-medium text-[15px] px-6 py-3.5 transition-colors"
                    >
                      MODIFY BRIEF
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Discipline Multi-Select */}
                  <div>
                    <label className="block text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2.5">
                      01 / Required Disciplines (Select Multiple)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        '3D Motion & CGI',
                        'Brand Identity System',
                        'Cinema Title Sequence',
                        'Live Stage / Visuals',
                        'Algorithmic / Code Motion',
                      ].map((disc) => {
                        const isSelected = selectedDisciplines.includes(disc);
                        return (
                          <button
                            type="button"
                            key={disc}
                            onClick={() => toggleDiscipline(disc)}
                            className={`px-3.5 py-2 rounded-[2px] text-[12px] font-interface uppercase tracking-[0.08em] transition-editorial cursor-pointer ${
                              isSelected
                                ? 'bg-[#02A9EF] text-[#050608] font-medium'
                                : 'bg-[#050608] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8] hover:border-[#3E4850]'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {disc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2.5">
                      02 / Estimated Budget Bracket (USD)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        '$10,000 — $25,000',
                        '$25,000 — $50,000',
                        '$50,000 — $100,000',
                        '$100,000+',
                      ].map((tier) => (
                        <button
                          type="button"
                          key={tier}
                          onClick={() => setBudgetTier(tier)}
                          className={`p-2.5 text-center rounded-[2px] text-[12px] font-interface transition-editorial cursor-pointer ${
                            budgetTier === tier
                              ? 'bg-[#0F2A3F] border border-[#02A9EF] text-[#02A9EF] font-medium'
                              : 'bg-[#050608] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8]'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Timeline */}
                  <div>
                    <label className="block text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2.5">
                      03 / Desired Delivery Horizon
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Q4 2026', 'Q1 2027', 'Q2 2027 & Beyond'].map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTimeline(t)}
                          className={`p-2.5 text-center rounded-[2px] text-[12px] font-interface transition-editorial cursor-pointer ${
                            timeline === t
                              ? 'bg-[#0F2A3F] border border-[#02A9EF] text-[#02A9EF] font-medium'
                              : 'bg-[#050608] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full rounded-[12px] bg-[#050608] border border-[#1B2B38] text-[#F4F6F8] placeholder-[#9AA7B2]/60 p-[16px_20px] text-[14px] font-interface focus:border-[#02A9EF] focus:outline-none transition-editorial"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@company.com"
                        className="w-full rounded-[12px] bg-[#050608] border border-[#1B2B38] text-[#F4F6F8] placeholder-[#9AA7B2]/60 p-[16px_20px] text-[14px] font-interface focus:border-[#02A9EF] focus:outline-none transition-editorial"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1.5">
                      Organization / Project Title
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. A24 Films / Independent Production"
                      className="w-full rounded-[12px] bg-[#050608] border border-[#1B2B38] text-[#F4F6F8] placeholder-[#9AA7B2]/60 p-[16px_20px] text-[14px] font-interface focus:border-[#02A9EF] focus:outline-none transition-editorial"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-1.5">
                      Brief Narrative &amp; Scope Objectives *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Detail the creative context, deliverables, aesthetic references, and critical delivery dates..."
                      className="w-full rounded-[12px] bg-[#050608] border border-[#1B2B38] text-[#F4F6F8] placeholder-[#9AA7B2]/60 p-[16px_20px] text-[14px] font-interface focus:border-[#02A9EF] focus:outline-none transition-editorial resize-none"
                    />
                  </div>

                  {/* Submit Button (Primary Pill: 999px, bg #02A9EF, 14px 28px padding) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#02A9EF] hover:bg-[#0287BF] text-[#050608] font-interface font-medium text-[15px] p-[14px_28px] hover:-translate-y-0.5 transition-editorial flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      <span>DISPATCH COMMISSION PROPOSAL</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
