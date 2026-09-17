import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="p-6 border-b border-[#2a2e39] bg-[#171b26] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-6 fill-current text-white"
              viewBox="0 0 36 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 2H22V26H14V2Z" fill="currentColor" />
              <path d="M0 8H8V26H0V8Z" fill="currentColor" />
              <path d="M28 14H36V26H28V14Z" fill="currentColor" />
              <path d="M8 8H14V14H8V8Z" fill="currentColor" />
              <path d="M22 14H28V20H22V14Z" fill="currentColor" />
            </svg>
            <span className="font-bold text-lg text-white">TradingView</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {isSubmitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Welcome to TradingView!</h3>
              <p className="text-xs text-neutral-400">
                Your account has been prepared with full access to live charting, community ideas, and simulated trading.
              </p>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Look first / Then leap.
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Join 60+ million traders. $0 forever, no credit card required.
                </p>
              </div>

              {/* One-click Social Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] rounded-xl text-xs font-semibold text-white transition cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] rounded-xl text-xs font-semibold text-white transition cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.08 1.73-.95 2.76 1.01.08 2.05-.51 2.68-1.26" />
                  </svg>
                  <span>Continue with Apple</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 my-3">
                <div className="flex-1 h-px bg-[#2a2e39]" />
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider">or email</span>
                <div className="flex-1 h-px bg-[#2a2e39]" />
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0e1117] border border-[#2a2e39] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#2962ff] via-[#4d53ff] to-[#bd00ff] hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Feature Perks */}
              <div className="pt-2 border-t border-[#2a2e39]/60 space-y-1.5 text-[11px] text-neutral-400">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#089981]" />
                  <span>Real-time candlestick charts with 100+ indicators</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#089981]" />
                  <span>100,000+ public Pine Script® quantitative models</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#089981]" />
                  <span>$100k simulated paper trading account included</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
