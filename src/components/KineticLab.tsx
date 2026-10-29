import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Play, RotateCw, Activity, Copy, Check } from 'lucide-react';

export const KineticLab: React.FC = () => {
  // Kinetic Typography state
  const [inputText, setInputText] = useState('TEMPORAL ARCHITECTURE');
  const [fontWeight, setFontWeight] = useState(600);
  const [tracking, setTracking] = useState(-0.02);
  const [shear, setShear] = useState(0);
  const [waveSpeed, setWaveSpeed] = useState(1);
  const [isAnimatingText, setIsAnimatingText] = useState(true);

  // Easing curve state
  const [testTrigger, setTestTrigger] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  // Frame rate simulator state
  const [targetFps, setTargetFps] = useState<12 | 24 | 60>(24);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Rotate simulator based on targetFps
  useEffect(() => {
    const frameInterval = 1000 / targetFps;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + (360 / (targetFps * 3))) % 360);
    }, frameInterval);
    return () => clearInterval(interval);
  }, [targetFps]);

  const copyBezierSnippet = () => {
    navigator.clipboard.writeText(
      'transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);'
    );
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="lab" className="py-20 sm:py-28 border-b border-[#1B2B38] bg-[#050608]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#1B2B38]">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02A9EF]"></span>
              03 / EXPERIMENTAL SANDBOX
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#F4F6F8] tracking-[-0.02em]">
              Kinetic Lab &amp; Physics Engine
            </h2>
          </div>

          <div className="text-[13px] font-interface text-[#9AA7B2] max-w-[420px]">
            A live calibration workbench demonstrating the mathematical curves, temporal spacing, and typographic velocities behind Prince Anosike&apos;s motion system.
          </div>
        </div>

        {/* Experiment 01: Kinetic Variable Typography */}
        <div className="mt-12 rounded-[12px] bg-[#091B29] border border-[#1B2B38] p-6 sm:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-[#1B2B38]">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em]">
                EXP 01 //
              </span>
              <h3 className="font-editorial text-xl font-medium text-[#F4F6F8]">
                Procedural Typographic Velocity
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAnimatingText(!isAnimatingText)}
                className={`px-3 py-1 rounded-full text-[11px] font-interface uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                  isAnimatingText
                    ? 'bg-[#02A9EF] text-[#050608] font-medium'
                    : 'bg-[#050608] text-[#9AA7B2] border border-[#1B2B38]'
                }`}
              >
                {isAnimatingText ? 'ANIMATING OSCILLATION' : 'PAUSED'}
              </button>
            </div>
          </div>

          {/* Interactive Canvas Output */}
          <div className="py-12 sm:py-16 flex items-center justify-center overflow-hidden border-b border-[#1B2B38] bg-[#050608]/50 rounded-[2px] my-6">
            <div
              className="text-center font-editorial select-none transition-all duration-100 ease-out"
              style={{
                fontWeight,
                letterSpacing: `${tracking}em`,
                transform: `skewX(${shear}deg)`,
                color: '#F4F6F8',
              }}
            >
              <div className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-none">
                {inputText.split('').map((char, index) => {
                  const delay = index * 0.08;
                  return (
                    <span
                      key={index}
                      className="inline-block transition-transform duration-300"
                      style={{
                        transform: isAnimatingText
                          ? `translateY(${Math.sin((Date.now() / 300) * waveSpeed + index) * 6}px)`
                          : 'none',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
            <div>
              <label className="block text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
                Input Letterforms
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value.toUpperCase())}
                maxLength={28}
                className="w-full bg-[#050608] border border-[#1B2B38] rounded-[6px] px-3 py-2 text-[13px] font-interface text-[#F4F6F8] focus:border-[#02A9EF] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
                <span>Weight Axis</span>
                <span className="text-[#02A9EF]">{fontWeight}</span>
              </div>
              <input
                type="range"
                min="400"
                max="700"
                step="50"
                value={fontWeight}
                onChange={(e) => setFontWeight(Number(e.target.value))}
                className="w-full accent-[#02A9EF] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
                <span>Letter Tracking</span>
                <span className="text-[#02A9EF]">{tracking.toFixed(2)}em</span>
              </div>
              <input
                type="range"
                min="-0.03"
                max="0.25"
                step="0.01"
                value={tracking}
                onChange={(e) => setTracking(Number(e.target.value))}
                className="w-full accent-[#02A9EF] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-2">
                <span>Shear Angle</span>
                <span className="text-[#02A9EF]">{shear}°</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                step="1"
                value={shear}
                onChange={(e) => setShear(Number(e.target.value))}
                className="w-full accent-[#02A9EF] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Experiment 02 & 03: Easing Curve Visualizer & Frame-Rate Standard */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Easing Curve Visualizer */}
          <div className="rounded-[12px] bg-[#091B29] border border-[#1B2B38] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1B2B38]">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em]">
                    EXP 02 //
                  </span>
                  <h3 className="font-editorial text-xl font-medium text-[#F4F6F8]">
                    Strict 200ms Cubic Bezier
                  </h3>
                </div>

                <button
                  onClick={copyBezierSnippet}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1B2B38] text-[11px] font-interface text-[#9AA7B2] hover:text-[#02A9EF] hover:border-[#02A9EF] transition-colors"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-[#2ED47A]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'COPIED CSS' : 'COPY CSS'}</span>
                </button>
              </div>

              <p className="font-interface text-[14px] text-[#9AA7B2] my-4">
                Design system specification curve: <code className="text-[#02A9EF] font-mono">cubic-bezier(0.16, 1, 0.3, 1)</code>. Yields instant acceleration with a gentle, authoritative deceleration without bounce or wobble.
              </p>

              {/* Physical Easing Test Track */}
              <div className="my-6 p-4 rounded-[2px] bg-[#050608] border border-[#1B2B38]">
                <div className="text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] mb-4 flex justify-between">
                  <span>DISPLACEMENT BENCHMARK</span>
                  <span className="text-[#02A9EF]">MAX Δ 4PX DISPLACEMENT</span>
                </div>

                {/* Track 1: Custom Studio Curve */}
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] font-mono text-[#9AA7B2] mb-1">
                    <span>STUDIO: (0.16, 1, 0.3, 1)</span>
                    <span className="text-[#2ED47A]">OPTIMAL</span>
                  </div>
                  <div className="relative h-6 bg-[#091B29] border border-[#1B2B38] rounded-full overflow-hidden">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#02A9EF]"
                      style={{
                        left: testTrigger % 2 === 1 ? 'calc(100% - 20px)' : '4px',
                        transition: 'left 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>

                {/* Track 2: Standard Linear */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-[#9AA7B2] mb-1">
                    <span>GENERIC: LINEAR</span>
                    <span className="text-[#FF5C5C]">RIGID</span>
                  </div>
                  <div className="relative h-6 bg-[#091B29] border border-[#1B2B38] rounded-full overflow-hidden">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#3E4850]"
                      style={{
                        left: testTrigger % 2 === 1 ? 'calc(100% - 20px)' : '4px',
                        transition: 'left 200ms linear',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTestTrigger((prev) => prev + 1)}
              className="w-full py-3 rounded-full bg-[#02A9EF] hover:bg-[#0287BF] text-[#050608] font-interface font-medium text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>TEST VELOCITY IMPULSE</span>
            </button>
          </div>

          {/* Frame Rate Telemetry */}
          <div className="rounded-[12px] bg-[#091B29] border border-[#1B2B38] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1B2B38]">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em]">
                    EXP 03 //
                  </span>
                  <h3 className="font-editorial text-xl font-medium text-[#F4F6F8]">
                    Optical Shutter &amp; Cadence
                  </h3>
                </div>

                <div className="text-[11px] font-interface text-[#2ED47A] uppercase tracking-[0.08em]">
                  CALIBRATED
                </div>
              </div>

              <p className="font-interface text-[14px] text-[#9AA7B2] my-4">
                Film motion cadence simulation. 24.00 FPS delivers the organic cinematic cadence of photochemical cinema reels, contrasted against experimental 12 FPS and high-frequency 60 FPS interfaces.
              </p>

              {/* Orbiting Gyroscope Widget */}
              <div className="my-6 p-6 rounded-[2px] bg-[#050608] border border-[#1B2B38] flex items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Outer circle */}
                  <div className="absolute inset-0 rounded-full border border-[#1B2B38]" />
                  {/* Rotating orbital disc */}
                  <div
                    className="absolute inset-2 rounded-full border-t-2 border-r-2 border-[#02A9EF]"
                    style={{ transform: `rotate(${rotationAngle}deg)` }}
                  />
                  {/* Counter-rotating core */}
                  <div
                    className="w-12 h-12 rounded-full border border-[#9AA7B2] flex items-center justify-center text-[10px] font-mono text-[#02A9EF]"
                    style={{ transform: `rotate(-${rotationAngle * 1.5}deg)` }}
                  >
                    {targetFps}F
                  </div>
                </div>
              </div>
            </div>

            {/* FPS Selectors */}
            <div className="grid grid-cols-3 gap-2">
              {([12, 24, 60] as const).map((fps) => (
                <button
                  key={fps}
                  onClick={() => setTargetFps(fps)}
                  className={`py-2.5 rounded-[2px] font-interface text-[13px] uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                    targetFps === fps
                      ? 'bg-[#02A9EF] text-[#050608] font-medium'
                      : 'bg-[#050608] border border-[#1B2B38] text-[#9AA7B2] hover:text-[#F4F6F8]'
                  }`}
                >
                  {fps} FPS {fps === 24 && '★'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
