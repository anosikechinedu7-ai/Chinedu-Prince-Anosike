import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronRight,
  Layers,
  Sparkles,
  Sliders,
  Check,
} from 'lucide-react';
import { REEL_CHAPTERS } from '../data/portfolioData';
import { ReelChapter } from '../types/portfolio';

const TOTAL_DURATION_SECONDS = 220; // 03:40

export const ShowreelPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(24.5);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<ReelChapter>(REEL_CHAPTERS[0]);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [renderMode, setRenderMode] = useState<'beauty' | 'clay' | 'wireframe' | 'flow'>('beauty');
  const containerRef = useRef<HTMLDivElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1 * playbackSpeed;
          if (next >= TOTAL_DURATION_SECONDS) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Sync active chapter with time
  useEffect(() => {
    const chapter = [...REEL_CHAPTERS]
      .reverse()
      .find((ch) => currentTime >= ch.seconds) || REEL_CHAPTERS[0];
    setActiveChapter(chapter);
  }, [currentTime]);

  const formatTimecode = (secondsTotal: number) => {
    const mins = Math.floor(secondsTotal / 60);
    const secs = Math.floor(secondsTotal % 60);
    const frames = Math.floor((secondsTotal % 1) * 24);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `00:${pad(mins)}:${pad(secs)}:${pad(frames)}`;
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(percentage * TOTAL_DURATION_SECONDS);
  };

  const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    setHoverPosition(percentage);
  };

  const handleStepFrame = (frames: number) => {
    const deltaSeconds = frames / 24;
    setCurrentTime((prev) => Math.max(0, Math.min(TOTAL_DURATION_SECONDS, prev + deltaSeconds)));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const progressPercentage = (currentTime / TOTAL_DURATION_SECONDS) * 100;

  // Visual filter for render modes to simulate genuine 3D passes
  const getRenderFilter = () => {
    switch (renderMode) {
      case 'clay':
        return 'grayscale(100%) contrast(140%) brightness(85%)';
      case 'wireframe':
        return 'invert(100%) hue-rotate(180deg) contrast(200%)';
      case 'flow':
        return 'hue-rotate(190deg) saturate(300%) contrast(120%)';
      case 'beauty':
      default:
        return 'none';
    }
  };

  return (
    <section id="reel" className="py-20 sm:py-28 border-b border-[#1B2B38] bg-[#050608]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#1B2B38]">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-interface text-[#02A9EF] uppercase tracking-[0.08em] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02A9EF]"></span>
              02 / MOTION CINEMATOGRAPHY
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#F4F6F8] tracking-[-0.02em]">
              Selected Showreel 2026
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[12px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em]">
              RENDER PASS:
            </span>
            <div className="inline-flex rounded-[2px] border border-[#1B2B38] bg-[#091B29] p-0.5">
              {(
                [
                  { id: 'beauty', label: 'ACEScg Beauty' },
                  { id: 'clay', label: 'Clay AO' },
                  { id: 'wireframe', label: 'Wireframe' },
                  { id: 'flow', label: 'Optical Flow' },
                ] as const
              ).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setRenderMode(mode.id)}
                  className={`px-3 py-1 text-[11px] font-interface uppercase tracking-[0.08em] rounded-[2px] transition-colors cursor-pointer ${
                    renderMode === mode.id
                      ? 'bg-[#02A9EF] text-[#050608] font-medium'
                      : 'text-[#9AA7B2] hover:text-[#F4F6F8]'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cinematic Player Container */}
        <div
          ref={containerRef}
          className="mt-8 rounded-[12px] bg-[#091B29] border border-[#1B2B38] p-3 sm:p-5 relative overflow-hidden transition-editorial"
        >
          {/* Main Media Port (2px radius as specified) */}
          <div className="relative aspect-video w-full rounded-[2px] overflow-hidden bg-[#050608] group select-none">
            {/* Background Simulated Motion Frame */}
            <img
              src={activeChapter.thumbnail}
              alt={activeChapter.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
              style={{ filter: getRenderFilter() }}
            />

            {/* Subtle Viewport Grid Telemetry Overlay */}
            <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
              {/* Top corners */}
              <div className="flex items-center justify-between text-[11px] font-interface text-[#F4F6F8]/80 font-mono tracking-widest uppercase">
                <div className="flex items-center gap-2 bg-[#050608]/80 px-2 py-1 rounded-[2px] border border-[#1B2B38]">
                  <span className="w-2 h-2 rounded-full bg-[#FF5C5C] animate-pulse"></span>
                  <span>REC [4K PRORES 4444 XQ]</span>
                </div>

                <div className="bg-[#050608]/80 px-2 py-1 rounded-[2px] border border-[#1B2B38] text-[#9AA7B2]">
                  {formatTimecode(currentTime)}
                </div>
              </div>

              {/* Center Crosshairs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                <div className="w-8 h-8 border-t border-l border-[#F4F6F8]"></div>
                <div className="w-8 h-8 border-b border-r border-[#F4F6F8] absolute right-0 bottom-0"></div>
              </div>

              {/* Center Large Play Toggle if paused */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#02A9EF] hover:bg-[#0287BF] text-[#050608] flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer"
                  aria-label="Play showreel"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              )}

              {/* Bottom chapter title badge */}
              <div className="flex items-center justify-between">
                <div className="bg-[#050608]/85 px-3 py-1.5 rounded-[2px] border border-[#1B2B38]">
                  <div className="text-[10px] font-interface text-[#02A9EF] uppercase tracking-[0.08em]">
                    CHAPTER {REEL_CHAPTERS.indexOf(activeChapter) + 1} OF {REEL_CHAPTERS.length}
                  </div>
                  <div className="text-[13px] font-interface font-medium text-[#F4F6F8]">
                    {activeChapter.title} — {activeChapter.client}
                  </div>
                </div>

                <div className="hidden sm:block text-[11px] font-interface text-[#9AA7B2] uppercase tracking-[0.08em] bg-[#050608]/80 px-2.5 py-1 rounded-[2px] border border-[#1B2B38]">
                  MODE: {renderMode.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Custom Motion Player Scrubber (as specified in design document) */}
          {/* Track: 2px height, #1B2B38 base color */}
          {/* Fill / Playhead: #02A9EF progress line with a minimal 8px pill head */}
          <div className="mt-4 pt-2">
            <div
              ref={scrubberRef}
              onClick={handleScrubberClick}
              onMouseMove={handleScrubberMouseMove}
              onMouseLeave={() => setHoverPosition(null)}
              className="relative h-6 flex items-center cursor-pointer group"
            >
              {/* Background Track */}
              <div className="w-full h-[2px] bg-[#1B2B38] relative rounded-full">
                {/* Chapter Notch Markers */}
                {REEL_CHAPTERS.map((ch) => {
                  const pos = (ch.seconds / TOTAL_DURATION_SECONDS) * 100;
                  return (
                    <div
                      key={ch.id}
                      style={{ left: `${pos}%` }}
                      className="absolute top-1/2 -translate-y-1/2 w-[2px] h-2 bg-[#3E4850] hover:bg-[#02A9EF] transition-colors"
                      title={`${ch.title} (${ch.timestamp})`}
                    />
                  );
                })}

                {/* Active Progress Line */}
                <div
                  style={{ width: `${progressPercentage}%` }}
                  className="h-full bg-[#02A9EF] relative"
                >
                  {/* Minimal 8px Pill Head */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 rounded-full bg-[#02A9EF] shadow-sm transform translate-x-1" />
                </div>

                {/* Hover Indicator */}
                {hoverPosition !== null && (
                  <div
                    style={{ left: `${hoverPosition * 100}%` }}
                    className="absolute -top-7 -translate-x-1/2 bg-[#091B29] border border-[#1B2B38] px-2 py-0.5 rounded-[2px] text-[11px] font-interface text-[#02A9EF] uppercase tracking-[0.08em] pointer-events-none whitespace-nowrap"
                  >
                    {formatTimecode(hoverPosition * TOTAL_DURATION_SECONDS)}
                  </div>
                )}
              </div>
            </div>

            {/* Player Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-2 border-t border-[#1B2B38]">
              {/* Left playback buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-[#02A9EF] hover:bg-[#0287BF] text-[#050608] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => {
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className="p-2 rounded-[2px] text-[#9AA7B2] hover:text-[#F4F6F8] hover:bg-[#0F2A3F] transition-colors cursor-pointer"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Frame stepping */}
                <div className="hidden sm:flex items-center gap-1 border-l border-[#1B2B38] pl-3">
                  <button
                    onClick={() => handleStepFrame(-1)}
                    className="px-2 py-1 rounded-[2px] text-[11px] font-interface uppercase text-[#9AA7B2] hover:text-[#02A9EF] hover:bg-[#0F2A3F]"
                    title="Previous frame"
                  >
                    -1F
                  </button>
                  <button
                    onClick={() => handleStepFrame(1)}
                    className="px-2 py-1 rounded-[2px] text-[11px] font-interface uppercase text-[#9AA7B2] hover:text-[#02A9EF] hover:bg-[#0F2A3F]"
                    title="Next frame"
                  >
                    +1F
                  </button>
                </div>

                {/* Timecode Telemetry */}
                <div className="font-mono text-[12px] text-[#9AA7B2] tracking-wider ml-1 sm:ml-2">
                  <span className="text-[#F4F6F8] font-medium">{formatTimecode(currentTime)}</span>
                  <span className="text-[#3E4850] mx-1">/</span>
                  <span>{formatTimecode(TOTAL_DURATION_SECONDS)}</span>
                </div>
              </div>

              {/* Right secondary controls */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Speed Selector */}
                <div className="flex items-center gap-1 text-[11px] font-interface">
                  {[0.5, 1.0, 1.5, 2.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setPlaybackSpeed(rate)}
                      className={`px-1.5 py-0.5 rounded-[2px] uppercase ${
                        playbackSpeed === rate
                          ? 'bg-[#02A9EF] text-[#050608] font-medium'
                          : 'text-[#9AA7B2] hover:text-[#F4F6F8]'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* Volume */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-[#9AA7B2] hover:text-[#F4F6F8] transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#FF5C5C]" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 text-[#9AA7B2] hover:text-[#02A9EF] transition-colors cursor-pointer"
                  title="Toggle fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Grid Below Reel */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {REEL_CHAPTERS.map((chapter, idx) => {
            const isCurrent = activeChapter.id === chapter.id;
            return (
              <button
                key={chapter.id}
                onClick={() => {
                  setCurrentTime(chapter.seconds);
                  setIsPlaying(true);
                }}
                className={`text-left p-3 rounded-[12px] border transition-editorial cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0F2A3F] border-[#02A9EF]'
                    : 'bg-[#091B29] border-[#1B2B38] hover:border-[#3E4850]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-interface uppercase tracking-[0.08em] mb-1">
                  <span className={isCurrent ? 'text-[#02A9EF] font-semibold' : 'text-[#9AA7B2]'}>
                    CH.0{idx + 1}
                  </span>
                  <span className="text-[#9AA7B2]">{chapter.timestamp}</span>
                </div>
                <div className="text-[13px] font-interface font-medium text-[#F4F6F8] truncate">
                  {chapter.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
