import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { AVAILABLE_SYMBOLS, INITIAL_TICKERS } from '../data/marketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'stocks' | 'crypto' | 'forex' | 'indices'>('all');

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'indices', label: 'Indices' },
  ];

  const filteredSymbols = AVAILABLE_SYMBOLS.filter((item) => {
    const matchesSearch =
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exchange.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'stocks' && item.category === 'stock') ||
      (activeCategory === 'crypto' && item.category === 'crypto') ||
      (activeCategory === 'forex' && item.category === 'forex') ||
      (activeCategory === 'indices' && item.category === 'index');

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#2a2e39] flex items-center space-x-3 bg-[#171b26]">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="Search symbol, ticker, company, crypto, or forex pair..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-white text-base focus:outline-none placeholder-neutral-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-[#2a2e39] hover:bg-[#363a45] text-neutral-300 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center space-x-2 px-4 py-2.5 bg-[#0e1117] border-b border-[#2a2e39] overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Symbol Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-[#2a2e39]/40">
          {filteredSymbols.length > 0 ? (
            filteredSymbols.map((item) => {
              const tickerMatch = INITIAL_TICKERS.find((t) => t.symbol === item.symbol.replace('/', ''));
              const isPositive = (tickerMatch?.changePercent ?? 0.5) >= 0;

              return (
                <button
                  key={item.symbol}
                  onClick={() => {
                    onSelectSymbol(item.symbol);
                    onClose();
                    const chart = document.getElementById('products');
                    if (chart) chart.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#1e222d] transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm">
                      {item.icon}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                          {item.symbol}
                        </span>
                        <span className="text-[11px] font-medium text-neutral-400 px-1.5 py-0.2 bg-[#2a2e39] rounded">
                          {item.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-sm font-semibold text-white">
                      ${item.basePrice.toLocaleString(undefined, { minimumFractionDigits: item.decimals })}
                    </div>
                    <div className={`text-xs font-mono font-medium ${isPositive ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isPositive ? '+' : ''}
                      {(tickerMatch?.changePercent ?? 1.25).toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center text-neutral-400 text-sm">
              No symbols found matching "{searchQuery}".
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="p-3 bg-[#0e1117] border-t border-[#2a2e39] flex items-center justify-between text-xs text-neutral-500">
          <span>Tip: Select any symbol to immediately load interactive charts</span>
          <span className="flex items-center space-x-1 text-blue-400 font-medium">
            <span>TradingView Global Feed</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
