import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Star, ExternalLink, RefreshCw, Zap } from 'lucide-react';
import { BROKERS } from '../data/marketData';
import { BrokerIntegration } from '../types';

interface BrokersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBroker?: (broker: BrokerIntegration) => void;
}

export const BrokersModal: React.FC<BrokersModalProps> = ({ isOpen, onClose }) => {
  const [brokerList, setBrokerList] = useState<BrokerIntegration[]>(BROKERS);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConnectToggle = (brokerId: string) => {
    setConnectingId(brokerId);
    setTimeout(() => {
      setBrokerList((prev) =>
        prev.map((b) => (b.id === brokerId ? { ...b, connected: !b.connected } : b))
      );
      setConnectingId(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#2a2e39] bg-[#171b26] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Integrated Verified Brokers</h2>
              <p className="text-xs text-neutral-400">
                Execute trades directly from TradingView charts with ultra-low latency API links
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

        {/* Paper Trading Banner */}
        <div className="p-4 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border-b border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">TradingView Simulated Paper Trading</div>
              <div className="text-[11px] text-neutral-300">
                $100,000.00 virtual cash with real-time market order matching
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Active Simulator
          </span>
        </div>

        {/* Brokers List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {brokerList.map((broker) => (
            <div
              key={broker.id}
              className="p-4 rounded-xl bg-[#171b26] border border-[#2a2e39] hover:border-neutral-600 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl ${broker.logoBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {broker.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-white text-sm">{broker.name}</h3>
                    <div className="flex items-center text-amber-400 text-xs">
                      <Star className="w-3 h-3 fill-current mr-0.5" />
                      <span>{broker.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{broker.tagline}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {broker.assets.map((asset) => (
                      <span
                        key={asset}
                        className="text-[10px] bg-[#0e1117] text-neutral-300 px-2 py-0.5 rounded border border-white/5"
                      >
                        {asset}
                      </span>
                    ))}
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">
                      {broker.commission}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleConnectToggle(broker.id)}
                disabled={connectingId === broker.id}
                className={`px-4 py-2 rounded-lg font-semibold text-xs transition-colors shrink-0 cursor-pointer flex items-center justify-center space-x-1.5 ${
                  broker.connected
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                }`}
              >
                {connectingId === broker.id ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : broker.connected ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Connected</span>
                  </>
                ) : (
                  <span>Connect Broker</span>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0e1117] border-t border-[#2a2e39] flex items-center justify-between text-xs text-neutral-500">
          <span>Brokerage connectivity provided via secure OAuth & FIX API protocols</span>
          <button
            onClick={onClose}
            className="text-xs text-neutral-300 hover:text-white px-3 py-1 rounded bg-[#2a2e39]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
