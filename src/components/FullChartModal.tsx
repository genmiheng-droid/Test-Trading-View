import React, { useState, useMemo } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  TrendingUp,
  BarChart2,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AVAILABLE_SYMBOLS, generateCandles } from '../data/marketData';
import { Timeframe } from '../types';

interface FullChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSymbol: string;
  onSymbolChange: (symbol: string) => void;
}

interface Position {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
}

export const FullChartModal: React.FC<FullChartModalProps> = ({
  isOpen,
  onClose,
  currentSymbol,
  onSymbolChange,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [orderQuantity, setOrderQuantity] = useState(0.5);
  const [paperBalance, setPaperBalance] = useState(100000.0);
  const [positions, setPositions] = useState<Position[]>([]);
  const [orderToast, setOrderToast] = useState<string | null>(null);

  const currentAsset = useMemo(() => {
    return AVAILABLE_SYMBOLS.find((s) => s.symbol === currentSymbol) || AVAILABLE_SYMBOLS[0];
  }, [currentSymbol]);

  const candles = useMemo(() => {
    return generateCandles(currentAsset.basePrice, 20, 0.015);
  }, [currentAsset, timeframe]);

  const latestPrice = candles[candles.length - 1].close;

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    const cost = orderQuantity * latestPrice;
    if (orderType === 'BUY' && cost > paperBalance) {
      setOrderToast('Insufficient virtual funds in paper account');
      setTimeout(() => setOrderToast(null), 3000);
      return;
    }

    const newPos: Position = {
      id: `pos-${Date.now()}`,
      symbol: currentSymbol,
      type: orderType,
      amount: orderQuantity,
      entryPrice: latestPrice,
      currentPrice: latestPrice,
      pnl: 0,
    };

    setPositions((prev) => [newPos, ...prev]);
    if (orderType === 'BUY') {
      setPaperBalance((prev) => prev - cost);
    } else {
      setPaperBalance((prev) => prev + cost);
    }

    setOrderToast(`Order Executed: ${orderType} ${orderQuantity} ${currentSymbol} @ $${latestPrice.toLocaleString()}`);
    setTimeout(() => setOrderToast(null), 3500);
  };

  const handleClosePosition = (id: string) => {
    const pos = positions.find((p) => p.id === id);
    if (!pos) return;
    const returnVal = pos.amount * pos.currentPrice;
    setPaperBalance((prev) => prev + returnVal);
    setPositions((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0e14] flex flex-col text-white animate-in fade-in duration-150">
      {/* Top Navbar */}
      <div className="h-14 bg-[#131722] border-b border-[#2a2e39] px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 font-bold text-sm">
            <span className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
              {currentAsset.icon}
            </span>
            <span className="text-base text-white">{currentAsset.symbol}</span>
            <span className="text-xs text-neutral-400">{currentAsset.exchange}</span>
          </div>

          <div className="h-4 w-px bg-[#2a2e39]" />

          {/* Timeframe selector */}
          <div className="flex items-center space-x-1">
            {(['1D', '1H', '4H', '1W', '1M'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  timeframe === tf ? 'bg-[#2a2e39] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Right Station Info & Close */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-xs">
            <span className="text-neutral-400">Paper Balance:</span>
            <span className="font-mono font-bold text-emerald-400">
              ${paperBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="font-mono text-sm sm:text-base font-bold text-[#089981]">
            ${latestPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#1e222d] hover:bg-[#2a2e39] text-neutral-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Large Chart Canvas Area */}
        <div className="flex-1 flex flex-col bg-[#131722] p-4 relative overflow-hidden">
          {/* Toast Notification */}
          {orderToast && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-emerald-600/90 backdrop-blur text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-2xl flex items-center space-x-2 border border-emerald-400/40 animate-in fade-in slide-in-from-top">
              <CheckCircle className="w-4 h-4" />
              <span>{orderToast}</span>
            </div>
          )}

          {/* SVG Candlestick Chart */}
          <div className="flex-1 relative border border-[#2a2e39] rounded-xl overflow-hidden bg-[#0e1117] p-4">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-15">
              <div className="border-b border-dashed border-white" />
              <div className="border-b border-dashed border-white" />
              <div className="border-b border-dashed border-white" />
              <div className="border-b border-dashed border-white" />
            </div>

            <svg className="w-full h-full" viewBox="0 0 900 400" preserveAspectRatio="none">
              {/* Moving Average curves */}
              <path
                d={candles
                  .map((c, i) => {
                    const x = (i + 1) * (900 / (candles.length + 1));
                    const y = 350 - ((c.ma20 || c.close) / (latestPrice * 1.05)) * 260;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  })
                  .join(' ')}
                stroke="#2962ff"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
              />

              {/* Candlesticks */}
              {candles.map((c, i) => {
                const x = (i + 1) * (900 / (candles.length + 1));
                const minVal = Math.min(...candles.map((k) => k.low)) * 0.99;
                const maxVal = Math.max(...candles.map((k) => k.high)) * 1.01;
                const range = maxVal - minVal;

                const highY = 380 - ((c.high - minVal) / range) * 340;
                const lowY = 380 - ((c.low - minVal) / range) * 340;
                const openY = 380 - ((c.open - minVal) / range) * 340;
                const closeY = 380 - ((c.close - minVal) / range) * 340;

                const isUp = c.close >= c.open;
                const color = isUp ? '#089981' : '#f23645';

                return (
                  <g key={`fc-${i}`}>
                    <line x1={x} x2={x} y1={highY} y2={lowY} stroke={color} strokeWidth="1.5" />
                    <rect
                      x={x - 8}
                      y={Math.min(openY, closeY)}
                      width={16}
                      height={Math.max(3, Math.abs(closeY - openY))}
                      rx={1}
                      fill={color}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Open Positions Table */}
          <div className="h-44 mt-3 bg-[#171b26] border border-[#2a2e39] rounded-xl p-3 flex flex-col">
            <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Simulated Positions ({positions.length})</span>
              <span className="text-[11px] text-neutral-500 font-normal">TradingView Paper Execution Engine</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-[#2a2e39]/50 text-xs font-mono">
              {positions.length > 0 ? (
                positions.map((pos) => (
                  <div key={pos.id} className="py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          pos.type === 'BUY' ? 'bg-[#089981]/20 text-[#089981]' : 'bg-[#f23645]/20 text-[#f23645]'
                        }`}
                      >
                        {pos.type}
                      </span>
                      <span className="font-bold text-white">{pos.symbol}</span>
                      <span className="text-neutral-400">Qty: {pos.amount}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-neutral-300">Entry: ${pos.entryPrice.toLocaleString()}</span>
                      <span className="text-emerald-400 font-bold">+$124.50</span>
                      <button
                        onClick={() => handleClosePosition(pos.id)}
                        className="text-[10px] bg-[#2a2e39] hover:bg-red-900/40 text-neutral-300 hover:text-red-300 px-2 py-0.5 rounded transition"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-neutral-500 text-xs">
                  No open positions. Place a simulated order in the right panel.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Order Ticket Execution Panel */}
        <div className="w-full md:w-80 bg-[#171b26] border-l border-[#2a2e39] p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Order Execution Ticket</h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Paper Account
              </span>
            </div>

            {/* Buy / Sell Toggle Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('BUY')}
                className={`py-3 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center space-x-1 ${
                  orderType === 'BUY'
                    ? 'bg-[#089981] text-white shadow-[0_0_15px_rgba(8,153,129,0.4)]'
                    : 'bg-[#131722] text-neutral-400 hover:text-white'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>BUY / LONG</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('SELL')}
                className={`py-3 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center space-x-1 ${
                  orderType === 'SELL'
                    ? 'bg-[#f23645] text-white shadow-[0_0_15px_rgba(242,54,69,0.4)]'
                    : 'bg-[#131722] text-neutral-400 hover:text-white'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                <span>SELL / SHORT</span>
              </button>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Contract / Position Units</label>
              <div className="flex items-center bg-[#0e1117] border border-[#2a2e39] rounded-xl px-3 py-2">
                <input
                  type="number"
                  step="0.1"
                  min="0.01"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(Math.max(0.01, parseFloat(e.target.value) || 0.1))}
                  className="w-full bg-transparent border-none text-white font-mono text-sm focus:outline-none"
                />
                <span className="text-xs text-neutral-400">UNITS</span>
              </div>
            </div>

            {/* Execution summary */}
            <div className="p-3 bg-[#0e1117] rounded-xl border border-[#2a2e39] space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Est. Value:</span>
                <span className="font-mono text-white">
                  ${(orderQuantity * latestPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Commission:</span>
                <span className="text-emerald-400 font-mono">$0.00 (Zero Fee)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Slippage:</span>
                <span className="font-mono text-white">0.01%</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              className={`w-full py-3.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                orderType === 'BUY'
                  ? 'bg-[#089981] hover:bg-[#07856f] text-white'
                  : 'bg-[#f23645] hover:bg-[#d82a39] text-white'
              }`}
            >
              Place Simulated {orderType} Order
            </button>
          </div>

          <div className="text-center text-[10px] text-neutral-500 pt-4 border-t border-[#2a2e39]">
            TradingView High-Speed FIX Connectivity
          </div>
        </div>
      </div>
    </div>
  );
};
