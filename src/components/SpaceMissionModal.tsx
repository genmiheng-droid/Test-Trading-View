import React from 'react';
import { X, Rocket, Compass, Radio, Globe, Shield, ExternalLink } from 'lucide-react';

interface SpaceMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceMissionModal: React.FC<SpaceMissionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0b0e14] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Space Imagery Canvas */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-br from-indigo-950 via-slate-900 to-black overflow-hidden flex items-end p-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/20 via-purple-900/30 to-transparent pointer-events-none" />
          <div className="aurora-container absolute inset-0 opacity-40 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Astronaut Badge & Title */}
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
              <Rocket className="w-3.5 h-3.5 -rotate-45" />
              <span>Polaris Dawn × TradingView</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Taking Financial Charting to Orbit
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm mt-1">
              With Polaris Dawn Mission Pilot Scott "Kidd" Poteet
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-[#131722] border border-[#2a2e39] flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center font-bold text-black text-lg shrink-0">
              KP
            </div>
            <div>
              <blockquote className="italic text-neutral-200 font-medium">
                "In high-stakes environments—whether commanding fighter jets in the Air Force, launching to orbital altitudes of 1,400 km, or navigating financial markets—clarity of data and split-second precision make all the difference. Look first, then leap."
              </blockquote>
              <div className="mt-2 text-xs text-neutral-400 font-semibold">
                — Scott "Kidd" Poteet, Mission Pilot, Polaris Dawn
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#131722] border border-[#2a2e39]">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white mb-1">1,400 km Apogee</h4>
              <p className="text-xs text-neutral-400">
                Highest Earth orbit reached by humans since the Apollo program missions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#131722] border border-[#2a2e39]">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Radio className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white mb-1">Zero-Lag Telemetry</h4>
              <p className="text-xs text-neutral-400">
                TradingView's WebSocket streaming protocol tested with orbital latency feeds.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#131722] border border-[#2a2e39]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white mb-1">Commercial Spacewalk</h4>
              <p className="text-xs text-neutral-400">
                Testing next-generation Extravehicular Activity (EVA) spacesuits and telemetry.
              </p>
            </div>
          </div>

          <p>
            TradingView partnered with the historic Polaris Dawn orbital human spaceflight mission to celebrate the spirit of preparation, technological precision, and bold execution that defines both space exploration and elite market participants.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#171b26] border-t border-[#2a2e39] flex items-center justify-between">
          <span className="text-xs text-neutral-400">Mission launched from Cape Canaveral, FL</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
