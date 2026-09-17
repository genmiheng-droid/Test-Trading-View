import React, { useEffect, useState } from 'react';
import { TickerItem } from '../types';
import { INITIAL_TICKERS } from '../data/marketData';

interface LiveTickerTapeProps {
  onSelectSymbol: (symbol: string) => void;
}

export const LiveTickerTape: React.FC<LiveTickerTapeProps> = ({ onSelectSymbol }) => {
  const [tickers, setTickers] = useState<TickerItem[]>(INITIAL_TICKERS);
  const [updatedId, setUpdatedId] = useState<string | null>(null);

  // Micro-fluctuations to simulate live ticking market data
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const item = prev[randomIndex];
        const delta = (Math.random() - 0.48) * (item.price * 0.001);
        const newPrice = Math.max(0.0001, item.price + delta);
        const newChange = item.change + delta;
        const newChangePercent = (newChange / (newPrice - newChange)) * 100;

        setUpdatedId(item.id);
        setTimeout(() => setUpdatedId(null), 800);

        return prev.map((t, idx) =>
          idx === randomIndex
            ? {
                ...t,
                price: Number(newPrice.toFixed(t.type === 'forex' ? 4 : 2)),
                change: Number(newChange.toFixed(t.type === 'forex' ? 4 : 2)),
                changePercent: Number(newChangePercent.toFixed(2)),
              }
            : t
        );
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (ticker: TickerItem) => {
    if (ticker.type === 'forex') return ticker.price.toFixed(4);
    return ticker.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleTickerClick = (ticker: TickerItem) => {
    let target = ticker.symbol;
    if (target === 'BTCUSD') target = 'BTC/USD';
    else if (target === 'ETHUSD') target = 'ETH/USD';
    else if (target === 'EURUSD') target = 'EUR/USD';
    onSelectSymbol(target);

    // Smooth scroll to chart section
    const chartEl = document.getElementById('products');
    if (chartEl) {
      chartEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="border-y border-white/10 bg-[#0e1117]/90 backdrop-blur-md overflow-hidden py-2.5 select-none"
      data-purpose="market-ticker-tape"
    >
      <div className="animate-ticker text-xs font-mono font-medium">
        {/* Set 1 */}
        <div className="flex items-center space-x-8 shrink-0 pr-8">
          {tickers.map((ticker) => {
            const isPositive = ticker.changePercent >= 0;
            const isFlashing = updatedId === ticker.id;

            return (
              <button
                key={`s1-${ticker.id}`}
                type="button"
                onClick={() => handleTickerClick(ticker)}
                className={`flex items-center space-x-2 text-left cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded transition-colors ${
                  isFlashing ? (isPositive ? 'bg-emerald-500/20' : 'bg-red-500/20') : ''
                }`}
              >
                <span className="font-bold text-white tracking-wider">{ticker.symbol}</span>
                <span className="text-neutral-300">{formatPrice(ticker)}</span>
                <span
                  className={`font-semibold flex items-center ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  <span className="mr-0.5 text-[10px]">{isPositive ? '▲' : '▼'}</span>
                  {isPositive ? `+${ticker.changePercent.toFixed(2)}%` : `${ticker.changePercent.toFixed(2)}%`}
                </span>
                <span className="text-neutral-700 ml-6">|</span>
              </button>
            );
          })}
        </div>

        {/* Set 2 for seamless infinite loop */}
        <div className="flex items-center space-x-8 shrink-0 pr-8" aria-hidden="true">
          {tickers.map((ticker) => {
            const isPositive = ticker.changePercent >= 0;
            const isFlashing = updatedId === ticker.id;

            return (
              <button
                key={`s2-${ticker.id}`}
                type="button"
                onClick={() => handleTickerClick(ticker)}
                className={`flex items-center space-x-2 text-left cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded transition-colors ${
                  isFlashing ? (isPositive ? 'bg-emerald-500/20' : 'bg-red-500/20') : ''
                }`}
              >
                <span className="font-bold text-white tracking-wider">{ticker.symbol}</span>
                <span className="text-neutral-300">{formatPrice(ticker)}</span>
                <span
                  className={`font-semibold flex items-center ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  <span className="mr-0.5 text-[10px]">{isPositive ? '▲' : '▼'}</span>
                  {isPositive ? `+${ticker.changePercent.toFixed(2)}%` : `${ticker.changePercent.toFixed(2)}%`}
                </span>
                <span className="text-neutral-700 ml-6">|</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
