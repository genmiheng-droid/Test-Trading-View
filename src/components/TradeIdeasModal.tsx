import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, Play, CheckCircle, TrendingUp, TrendingDown, Clock, Share2 } from 'lucide-react';
import { TRADE_IDEAS } from '../data/marketData';
import { TradeIdea } from '../types';

interface TradeIdeasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const TradeIdeasModal: React.FC<TradeIdeasModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const [selectedIdea, setSelectedIdea] = useState<TradeIdea>(TRADE_IDEAS[0]);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(65);
  const [likedIdeas, setLikedIdeas] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleToggleLike = (id: string) => {
    setLikedIdeas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlayback = () => {
    setIsPlayingBack(true);
    setPlaybackProgress(0);
    const interval = setInterval(() => {
      setPlaybackProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlayingBack(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#2a2e39] bg-[#171b26] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Community Trade Ideas & Playback</h2>
              <p className="text-xs text-neutral-400">
                Peer-reviewed market setups with verifiable time-stamped forecasts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
          {/* Left Column: List of Ideas */}
          <div className="p-3 border-r border-[#2a2e39] overflow-y-auto space-y-2 bg-[#0e1117]/60">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2 py-1">
              Trending Setups
            </div>
            {TRADE_IDEAS.map((idea) => (
              <button
                key={idea.id}
                onClick={() => {
                  setSelectedIdea(idea);
                  setPlaybackProgress(65);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  selectedIdea.id === idea.id
                    ? 'bg-[#1e222d] border-blue-500/50 shadow-md'
                    : 'bg-[#131722] border-transparent hover:border-[#2a2e39]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white text-xs">{idea.symbol}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      idea.direction === 'LONG'
                        ? 'bg-[#089981]/20 text-[#089981]'
                        : 'bg-[#f23645]/20 text-[#f23645]'
                    }`}
                  >
                    {idea.direction}
                  </span>
                </div>
                <h4 className="text-xs text-neutral-200 font-medium line-clamp-2 mb-2">
                  {idea.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span>{idea.author}</span>
                  <span>{idea.timeAgo}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Selected Idea Details & Interactive Playback */}
          <div className="md:col-span-2 p-6 overflow-y-auto space-y-6 bg-[#131722]">
            {/* Top Idea Bar */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xl font-bold text-white">{selectedIdea.symbol}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      selectedIdea.direction === 'LONG'
                        ? 'bg-[#089981]/20 text-[#089981]'
                        : 'bg-[#f23645]/20 text-[#f23645]'
                    }`}
                  >
                    {selectedIdea.direction} Setup
                  </span>
                  <button
                    onClick={() => {
                      onSelectSymbol(selectedIdea.symbol);
                      onClose();
                      const chart = document.getElementById('products');
                      if (chart) chart.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    Open in Chart →
                  </button>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {selectedIdea.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1 text-xs text-neutral-400">
                  <span>By {selectedIdea.author}</span>
                  <span>•</span>
                  <span>{selectedIdea.timeAgo}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleLike(selectedIdea.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    likedIdeas[selectedIdea.id]
                      ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                      : 'border-[#2a2e39] hover:bg-white/5 text-neutral-300'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{selectedIdea.likes + (likedIdeas[selectedIdea.id] ? 1 : 0)}</span>
                </button>
              </div>
            </div>

            {/* Target Levels Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#0e1117] border border-[#2a2e39]">
              <div>
                <div className="text-[11px] text-neutral-400">Entry Level</div>
                <div className="font-mono text-sm font-bold text-white">
                  ${selectedIdea.entryPrice.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-neutral-400">Target Profit</div>
                <div className="font-mono text-sm font-bold text-[#089981]">
                  ${selectedIdea.targetPrice.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-neutral-400">Stop Loss</div>
                <div className="font-mono text-sm font-bold text-[#f23645]">
                  ${selectedIdea.stopLoss.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Interactive Playback Simulator */}
            <div className="p-4 rounded-xl bg-[#171b26] border border-[#2a2e39]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white">Interactive Historical Playback</span>
                </div>
                <button
                  onClick={handlePlayback}
                  disabled={isPlayingBack}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {isPlayingBack ? 'Simulating...' : 'Play Forecast'}
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#0e1117] h-2 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-[#089981] h-full transition-all duration-200"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>Published Setup: 0%</span>
                <span className="text-emerald-400 font-semibold">
                  {playbackProgress >= 90 ? 'Target Hit (+11.5%)' : `In Progress: ${playbackProgress}%`}
                </span>
                <span>Target: 100%</span>
              </div>
            </div>

            {/* In-depth Analysis Text */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Technical Analysis Breakdown
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-[#0e1117]/60 p-4 rounded-xl border border-[#2a2e39]/50">
                {selectedIdea.analysis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
