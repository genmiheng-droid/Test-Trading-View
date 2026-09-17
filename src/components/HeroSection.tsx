import React from 'react';
import { Rocket } from 'lucide-react';

interface HeroSectionProps {
  onOpenGetStarted: () => void;
  onOpenSpaceMission: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenGetStarted,
  onOpenSpaceMission
}) => {
  return (
    <section
      className="relative min-h-[780px] lg:min-h-[850px] w-full flex flex-col justify-between pt-24 overflow-hidden"
      data-purpose="hero-presentation"
    >
      {/* Background: Space, Aurora, Earth & City lights */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* Deep dark celestial canvas */}
        <div className="absolute inset-0 bg-[#000104]" />

        {/* Aurora Streaks / Spectral Bar Pulses in upper sky */}
        <div className="absolute top-0 left-0 right-0 h-[480px] aurora-container opacity-85 pointer-events-none" />

        {/* Secondary soft glow behind hero text */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-pink-600/20 via-purple-600/25 to-blue-600/20 blur-[110px] rounded-full pointer-events-none" />

        {/* Curvature of Earth from Orbit */}
        <div className="earth-horizon" />
        <div className="earth-rim-glow" />

        {/* Vivid city clusters night lighting */}
        <div className="city-lights-overlay" />

        {/* Extra luminous city center glow patches */}
        <div className="absolute bottom-16 left-[18%] w-48 h-32 bg-amber-500/30 blur-[45px] rounded-full" />
        <div className="absolute bottom-24 left-[32%] w-56 h-36 bg-orange-500/25 blur-[50px] rounded-full" />
        <div className="absolute bottom-14 right-[25%] w-60 h-28 bg-amber-400/25 blur-[45px] rounded-full" />
        <div className="absolute bottom-20 right-[42%] w-40 h-24 bg-yellow-500/20 blur-[40px] rounded-full" />
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 sm:pt-32 text-center flex flex-col items-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-[68px] font-extrabold tracking-tight text-white leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Look first / Then leap.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-6 text-lg sm:text-2xl text-neutral-200/95 font-normal tracking-normal max-w-2xl drop-shadow-md">
          The best trades require research, then commitment.
        </p>

        {/* Primary CTA: Crisp White Pill Button */}
        <div className="mt-8 sm:mt-9">
          <button
            type="button"
            onClick={onOpenGetStarted}
            className="inline-flex items-center justify-center bg-white text-black hover:bg-neutral-100 px-8 py-3.5 rounded-full font-semibold text-base shadow-[0_6px_25px_rgba(255,255,255,0.25)] transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            Get started for free
          </button>
        </div>

        {/* Sub-caption footnote */}
        <p className="mt-3.5 text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
          $0 forever, no credit card needed
        </p>
      </div>

      {/* Bottom Space Mission Teaser Float */}
      <div className="relative z-10 max-w-[1720px] w-full mx-auto px-6 pb-8 sm:pb-12 flex justify-end">
        <div className="text-right" data-purpose="space-teaser">
          <h3 className="text-white text-sm sm:text-base font-semibold tracking-tight">
            See our space story
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm mb-2.5">
            With astronaut Scott "Kidd" Poteet
          </p>
          <button
            type="button"
            onClick={onOpenSpaceMission}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-pill text-xs sm:text-sm font-medium text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer group"
          >
            <Rocket className="w-3.5 h-3.5 -rotate-45 text-neutral-300 group-hover:text-amber-400 transition-colors" />
            <span>Space mission</span>
          </button>
        </div>
      </div>
    </section>
  );
};
