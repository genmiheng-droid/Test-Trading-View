import React from 'react';
import { Lightbulb, Code2, ShieldCheck, ArrowRight } from 'lucide-react';

interface CommunityFeaturesProps {
  onOpenTradeIdeas: () => void;
  onOpenPineScript: () => void;
  onOpenBrokers: () => void;
}

export const CommunityFeatures: React.FC<CommunityFeaturesProps> = ({
  onOpenTradeIdeas,
  onOpenPineScript,
  onOpenBrokers,
}) => {
  return (
    <section className="py-20 bg-black text-white relative" id="community">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Where the world charts, chats and trades.
          </h2>
          <p className="mt-4 text-neutral-400 text-lg">
            Join the most active social network for traders and investors. Discuss setups, publish ideas, and spot opportunities first.
          </p>
        </div>

        {/* Feature Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Trade Ideas */}
          <div
            onClick={onOpenTradeIdeas}
            className="group bg-[#131722] p-8 rounded-2xl border border-[#2a2e39] hover:border-neutral-500 transition duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                Trade Ideas
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Millions of published trade analysis and setups from top-tier analysts, complete with interactive playback to review trade performance over time.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-blue-400 space-x-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Top Ideas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Pine Script */}
          <div
            onClick={onOpenPineScript}
            className="group bg-[#131722] p-8 rounded-2xl border border-[#2a2e39] hover:border-neutral-500 transition duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                Pine Script®
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Create your own indicators and strategies using TradingView's proprietary, lightning-fast programming language trusted by quant developers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-purple-400 space-x-1 group-hover:translate-x-1 transition-transform">
              <span>Open Pine Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Integrated Brokers */}
          <div
            onClick={onOpenBrokers}
            className="group bg-[#131722] p-8 rounded-2xl border border-[#2a2e39] hover:border-neutral-500 transition duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">
                Integrated Brokers
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Connect your broker account directly and trade without switching tabs. Verified reviews and direct order execution right on the chart.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-emerald-400 space-x-1 group-hover:translate-x-1 transition-transform">
              <span>View 50+ Verified Brokers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
