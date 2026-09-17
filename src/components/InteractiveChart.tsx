import React, { useState, useRef, useMemo } from 'react';
import {
  BarChart2,
  TrendingUp,
  Crosshair,
  PenTool,
  Minus,
  Maximize2,
  Trash2,
  ChevronDown,
  Layers,
  Ruler,
  SlidersHorizontal,
  Sparkles,
  PieChart
} from 'lucide-react';
import { Timeframe, ChartStyle, DrawingToolType, DrawnLine } from '../types';
import { AVAILABLE_SYMBOLS, generateCandles } from '../data/marketData';

interface InteractiveChartProps {
  currentSymbol: string;
  onSymbolChange: (symbol: string) => void;
  onOpenFullChart: () => void;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  currentSymbol,
  onSymbolChange,
  onOpenFullChart,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('candles');
  const [activeTool, setActiveTool] = useState<DrawingToolType>('cursor');
  const [symbolDropdownOpen, setSymbolDropdownOpen] = useState(false);
  const [indicatorsOpen, setIndicatorsOpen] = useState(false);

  // Indicators state
  const [showMA20, setShowMA20] = useState(true);
  const [showMA50, setShowMA50] = useState(true);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showVolume, setShowVolume] = useState(true);

  // Drawing state
  const [drawnLines, setDrawnLines] = useState<DrawnLine[]>([]);
  const [drawingStart, setDrawingStart] = useState<{ x: number; y: number } | null>(null);

  // Hover Crosshair state
  const [hoveredCandleIndex, setHoveredCandleIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Current symbol data
  const currentAsset = useMemo(() => {
    return AVAILABLE_SYMBOLS.find((s) => s.symbol === currentSymbol) || AVAILABLE_SYMBOLS[0];
  }, [currentSymbol]);

  // Generate 14 candles matching the visual sequence in the screenshot
  const candles = useMemo(() => {
    return generateCandles(currentAsset.basePrice, 14, 0.018);
  }, [currentAsset, timeframe]);

  // Price range bounds
  const { minPrice, maxPrice, currentPrice } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    candles.forEach((c) => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    });
    // Add 10% padding
    const padding = (max - min) * 0.12 || 100;
    return {
      minPrice: min - padding,
      maxPrice: max + padding,
      currentPrice: candles[candles.length - 1].close,
    };
  }, [candles]);

  // SVG coordinate transformation
  const svgWidth = 800;
  const svgHeight = 320;

  const priceToY = (price: number) => {
    const range = maxPrice - minPrice || 1;
    return svgHeight - ((price - minPrice) / range) * (svgHeight - 40) - 20;
  };

  const yToPrice = (y: number) => {
    const range = maxPrice - minPrice;
    const normalized = (svgHeight - 20 - y) / (svgHeight - 40);
    return minPrice + normalized * range;
  };

  // Candle X coordinates
  const candleSpacing = svgWidth / (candles.length + 1);
  const candlePositions = useMemo(() => {
    return candles.map((_, i) => (i + 1) * candleSpacing);
  }, [candles, candleSpacing]);

  // SVG paths for MA lines
  const ma20Path = useMemo(() => {
    return candles
      .map((c, i) => {
        const x = candlePositions[i];
        const y = priceToY(c.ma20 || c.close);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [candles, candlePositions, maxPrice, minPrice]);

  const ma50Path = useMemo(() => {
    return candles
      .map((c, i) => {
        const x = candlePositions[i];
        const y = priceToY(c.ma50 || c.close * 0.98);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [candles, candlePositions, maxPrice, minPrice]);

  // SVG paths for Bollinger Bands
  const upperBandPath = useMemo(() => {
    return candles
      .map((c, i) => {
        const x = candlePositions[i];
        const y = priceToY(c.upperBand || c.high);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [candles, candlePositions, maxPrice, minPrice]);

  const lowerBandPath = useMemo(() => {
    return candles
      .map((c, i) => {
        const x = candlePositions[i];
        const y = priceToY(c.lowerBand || c.low);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [candles, candlePositions, maxPrice, minPrice]);

  // Hover interaction
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const svgX = (x / rect.width) * svgWidth;
    const svgY = (y / rect.height) * svgHeight;

    setMousePos({ x: svgX, y: svgY });

    // Find nearest candle
    let closestIndex = 0;
    let minDistance = Infinity;
    candlePositions.forEach((pos, idx) => {
      const dist = Math.abs(pos - svgX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    setHoveredCandleIndex(closestIndex);
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredCandleIndex(null);
  };

  // Click to draw tools
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (activeTool === 'cursor') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (svgWidth / rect.width);
    const y = (e.clientY - rect.top) * (svgHeight / rect.height);

    if (activeTool === 'horizontal') {
      const newLine: DrawnLine = {
        id: `line-${Date.now()}`,
        type: 'horizontal',
        x1: 0,
        y1: y,
        x2: svgWidth,
        y2: y,
        color: '#2962ff',
      };
      setDrawnLines((prev) => [...prev, newLine]);
      return;
    }

    if (activeTool === 'trendline') {
      if (!drawingStart) {
        setDrawingStart({ x, y });
      } else {
        const newLine: DrawnLine = {
          id: `line-${Date.now()}`,
          type: 'trendline',
          x1: drawingStart.x,
          y1: drawingStart.y,
          x2: x,
          y2: y,
          color: '#b829ea',
        };
        setDrawnLines((prev) => [...prev, newLine]);
        setDrawingStart(null);
      }
    }
  };

  const clearDrawings = () => {
    setDrawnLines([]);
    setDrawingStart(null);
  };

  const activeCandle = hoveredCandleIndex !== null ? candles[hoveredCandleIndex] : candles[candles.length - 1];
  const isBullish = activeCandle ? activeCandle.close >= activeCandle.open : true;
  const candlePercent = activeCandle
    ? (((activeCandle.close - activeCandle.open) / activeCandle.open) * 100).toFixed(2)
    : '0.00';

  // Fixed visual price tags on right axis to match screenshot
  const priceTicks = [
    maxPrice * 0.98,
    currentPrice,
    (maxPrice + minPrice) * 0.51,
    (maxPrice + minPrice) * 0.46,
    minPrice * 1.02,
  ];

  return (
    <section className="py-20 bg-[#05070c] relative border-b border-white/5" id="products">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The chart that changed the game
          </h2>
          <p className="mt-3 text-neutral-400 text-base sm:text-lg">
            Fast, flexible, and powerful financial charting loved by 60+ million traders worldwide.
          </p>
        </div>

        {/* Chart Mockup Interface */}
        <div
          ref={containerRef}
          className="bg-[#131722] rounded-xl border border-[#2a2e39] shadow-2xl overflow-hidden"
          data-purpose="chart-container"
        >
          {/* Chart Controls Toolbar Top */}
          <div className="h-12 border-b border-[#2a2e39] bg-[#171b26] px-4 flex items-center justify-between text-xs sm:text-sm relative z-20">
            {/* Left Toolbar Items */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Asset Selector Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSymbolDropdownOpen(!symbolDropdownOpen)}
                  className="flex items-center space-x-2 font-bold text-white pr-2 sm:pr-3 border-r border-[#2a2e39] hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs">
                    {currentAsset.icon}
                  </span>
                  <span>{currentAsset.symbol}</span>
                  <span className="text-neutral-400 font-normal hidden sm:inline">
                    {currentAsset.exchange}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {/* Symbol Dropdown Menu */}
                {symbolDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#1e222d] border border-[#2a2e39] rounded-lg shadow-2xl py-2 z-50">
                    <div className="px-3 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      Popular Markets
                    </div>
                    {AVAILABLE_SYMBOLS.map((asset) => (
                      <button
                        key={asset.symbol}
                        type="button"
                        onClick={() => {
                          onSymbolChange(asset.symbol);
                          setSymbolDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-[#2a2e39] transition-colors ${
                          asset.symbol === currentSymbol ? 'bg-blue-600/20 text-blue-400 font-semibold' : 'text-neutral-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-xs">
                            {asset.icon}
                          </span>
                          <span>{asset.symbol}</span>
                        </div>
                        <span className="text-[11px] text-neutral-400">{asset.exchange}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center space-x-1 sm:space-x-2 text-neutral-300">
                {(['1D', '1H', '4H', '1W', '1M'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-0.5 rounded font-medium text-xs transition-colors cursor-pointer ${
                      timeframe === tf
                        ? 'bg-[#2a2e39] text-white font-bold'
                        : 'hover:text-white text-neutral-400'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Chart type & Indicators buttons */}
              <div className="hidden sm:flex items-center space-x-3 text-neutral-400 pl-2 border-l border-[#2a2e39]">
                <button
                  type="button"
                  onClick={() =>
                    setChartStyle(
                      chartStyle === 'candles' ? 'line' : chartStyle === 'line' ? 'area' : 'candles'
                    )
                  }
                  className="hover:text-white flex items-center space-x-1 cursor-pointer"
                  title="Toggle Candle / Line Style"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span className="text-xs capitalize">{chartStyle}</span>
                </button>

                {/* Indicators Toggle */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIndicatorsOpen(!indicatorsOpen)}
                    className={`hover:text-white flex items-center space-x-1 cursor-pointer ${
                      indicatorsOpen ? 'text-blue-400' : ''
                    }`}
                    title="Indicators"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-xs">Indicators</span>
                  </button>

                  {indicatorsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-[#1e222d] border border-[#2a2e39] rounded-lg shadow-2xl p-3 z-50 space-y-2">
                      <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Active Overlays
                      </div>
                      <label className="flex items-center justify-between text-xs cursor-pointer hover:text-white">
                        <span className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#2962ff]"></span>
                          <span>MA 20 (Blue)</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={showMA20}
                          onChange={(e) => setShowMA20(e.target.checked)}
                          className="rounded bg-[#131722] border-[#2a2e39] text-blue-600 focus:ring-0"
                        />
                      </label>
                      <label className="flex items-center justify-between text-xs cursor-pointer hover:text-white">
                        <span className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#b829ea]"></span>
                          <span>MA 50 (Purple)</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={showMA50}
                          onChange={(e) => setShowMA50(e.target.checked)}
                          className="rounded bg-[#131722] border-[#2a2e39] text-purple-600 focus:ring-0"
                        />
                      </label>
                      <label className="flex items-center justify-between text-xs cursor-pointer hover:text-white">
                        <span className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                          <span>Bollinger Bands</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={showBollinger}
                          onChange={(e) => setShowBollinger(e.target.checked)}
                          className="rounded bg-[#131722] border-[#2a2e39] text-cyan-500 focus:ring-0"
                        />
                      </label>
                      <label className="flex items-center justify-between text-xs cursor-pointer hover:text-white">
                        <span className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#089981]"></span>
                          <span>Volume Histogram</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={showVolume}
                          onChange={(e) => setShowVolume(e.target.checked)}
                          className="rounded bg-[#131722] border-[#2a2e39] text-emerald-600 focus:ring-0"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Toolbar Items */}
            <div className="flex items-center space-x-3">
              <span className="text-[#089981] font-mono font-bold text-sm sm:text-base tracking-tight">
                ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <button
                type="button"
                onClick={onOpenFullChart}
                className="bg-[#2962ff] hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition cursor-pointer flex items-center space-x-1"
              >
                <span>Full Chart</span>
                <Maximize2 className="w-3 h-3 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Chart Body with Left Side Toolbar & SVG Chart Canvas */}
          <div className="relative h-80 sm:h-[420px] bg-[#131722] flex select-none">
            {/* Drawing Tools Sidebar */}
            <div className="w-10 border-r border-[#2a2e39] bg-[#151924] flex flex-col items-center py-3 space-y-4 text-neutral-400 text-xs shrink-0 z-10">
              <button
                type="button"
                onClick={() => setActiveTool('cursor')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  activeTool === 'cursor' ? 'bg-[#2a2e39] text-white' : 'hover:text-white'
                }`}
                title="Crosshair Cursor"
              >
                <Crosshair className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('trendline')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  activeTool === 'trendline' ? 'bg-[#2a2e39] text-blue-400' : 'hover:text-white'
                }`}
                title="Draw Trend Line (Click 2 points)"
              >
                <PenTool className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('horizontal')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  activeTool === 'horizontal' ? 'bg-[#2a2e39] text-blue-400' : 'hover:text-white'
                }`}
                title="Horizontal Level Line"
              >
                <Minus className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('fib')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  activeTool === 'fib' ? 'bg-[#2a2e39] text-blue-400' : 'hover:text-white'
                }`}
                title="Fibonacci Retracement"
              >
                <PieChart className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('ruler')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  activeTool === 'ruler' ? 'bg-[#2a2e39] text-blue-400' : 'hover:text-white'
                }`}
                title="Measure / Ruler"
              >
                <Ruler className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={clearDrawings}
                className="p-1.5 rounded text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                title="Clear All Drawings"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Candlestick Graphic Representation */}
            <div className="flex-1 relative flex flex-col justify-between overflow-hidden">
              {/* Floating Real-time Candle Bar Stats Bar */}
              {activeCandle && (
                <div className="absolute top-2 left-4 z-10 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono bg-[#131722]/80 backdrop-blur px-2.5 py-1 rounded border border-white/5 pointer-events-none">
                  <span className="text-neutral-400">
                    O <span className={isBullish ? 'text-[#089981]' : 'text-[#f23645]'}>{activeCandle.open.toFixed(2)}</span>
                  </span>
                  <span className="text-neutral-400">
                    H <span className={isBullish ? 'text-[#089981]' : 'text-[#f23645]'}>{activeCandle.high.toFixed(2)}</span>
                  </span>
                  <span className="text-neutral-400">
                    L <span className={isBullish ? 'text-[#089981]' : 'text-[#f23645]'}>{activeCandle.low.toFixed(2)}</span>
                  </span>
                  <span className="text-neutral-400">
                    C <span className={isBullish ? 'text-[#089981]' : 'text-[#f23645]'}>{activeCandle.close.toFixed(2)}</span>
                  </span>
                  <span className={isBullish ? 'text-[#089981]' : 'text-[#f23645]'}>
                    {isBullish ? `+${candlePercent}%` : `${candlePercent}%`}
                  </span>
                  <span className="text-neutral-500 hidden md:inline">
                    Vol {activeCandle.volume.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Grid Lines Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-15">
                <div className="border-b border-dashed border-white" />
                <div className="border-b border-dashed border-white" />
                <div className="border-b border-dashed border-white" />
                <div className="border-b border-dashed border-white" />
              </div>

              {/* Interactive SVG Chart Surface */}
              <svg
                className="w-full h-full cursor-crosshair"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleSvgClick}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2962ff" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="bollingerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00bcd4" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#00bcd4" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Bollinger Bands Shading */}
                {showBollinger && (
                  <>
                    <path
                      d={`${upperBandPath} L ${candlePositions[candlePositions.length - 1]} ${priceToY(candles[candles.length - 1].lowerBand || 0)} ${lowerBandPath.replace('M', 'L')} Z`}
                      fill="url(#bollingerGradient)"
                    />
                    <path d={upperBandPath} stroke="#00bcd4" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" fill="none" />
                    <path d={lowerBandPath} stroke="#00bcd4" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" fill="none" />
                  </>
                )}

                {/* Moving Average Lines */}
                {showMA20 && (
                  <path
                    d={ma20Path}
                    stroke="#2962ff"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    opacity="0.85"
                    fill="none"
                  />
                )}

                {showMA50 && (
                  <path
                    d={ma50Path}
                    stroke="#b829ea"
                    strokeWidth="2"
                    opacity="0.75"
                    fill="none"
                  />
                )}

                {/* Chart Style: Area / Line */}
                {chartStyle === 'area' && (
                  <path
                    d={`${candles
                      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${candlePositions[i]} ${priceToY(c.close)}`)
                      .join(' ')} L ${candlePositions[candlePositions.length - 1]} ${svgHeight} L ${candlePositions[0]} ${svgHeight} Z`}
                    fill="url(#areaGradient)"
                  />
                )}

                {chartStyle === 'line' && (
                  <path
                    d={candles
                      .map((c, i) => `${i === 0 ? 'M' : 'L'} ${candlePositions[i]} ${priceToY(c.close)}`)
                      .join(' ')}
                    stroke="#2962ff"
                    strokeWidth="2.5"
                    fill="none"
                  />
                )}

                {/* Candlesticks (when style is candles or bars) */}
                {(chartStyle === 'candles' || chartStyle === 'bars') &&
                  candles.map((candle, i) => {
                    const x = candlePositions[i];
                    const candleBullish = candle.close >= candle.open;
                    const candleColor = candleBullish ? '#089981' : '#f23645';

                    const highY = priceToY(candle.high);
                    const lowY = priceToY(candle.low);
                    const openY = priceToY(candle.open);
                    const closeY = priceToY(candle.close);

                    const bodyTop = Math.min(openY, closeY);
                    const bodyHeight = Math.max(Math.abs(closeY - openY), 3);
                    const bodyWidth = 14;

                    const isHighlighted = hoveredCandleIndex === i;

                    return (
                      <g key={`candle-${candle.timestamp}-${i}`} className="transition-opacity">
                        {/* High/Low Wick */}
                        <line
                          x1={x}
                          x2={x}
                          y1={highY}
                          y2={lowY}
                          stroke={candleColor}
                          strokeWidth={isHighlighted ? '2' : '1.5'}
                        />
                        {/* Candle Body */}
                        <rect
                          x={x - bodyWidth / 2}
                          y={bodyTop}
                          width={bodyWidth}
                          height={bodyHeight}
                          rx={1}
                          fill={candleColor}
                          opacity={hoveredCandleIndex !== null && !isHighlighted ? 0.7 : 1}
                          stroke={isHighlighted ? '#ffffff' : 'none'}
                          strokeWidth={isHighlighted ? 1 : 0}
                        />
                      </g>
                    );
                  })}

                {/* Live breakout candle pointer line into right axis */}
                {candles.length > 0 && (
                  <line
                    x1={candlePositions[candlePositions.length - 1] + 7}
                    x2={svgWidth}
                    y1={priceToY(candles[candles.length - 1].close)}
                    y2={priceToY(candles[candles.length - 1].close)}
                    stroke="#089981"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* User Drawn Lines */}
                {drawnLines.map((line) => (
                  <line
                    key={line.id}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={line.color}
                    strokeWidth="2"
                    strokeDasharray={line.type === 'trendline' ? 'none' : '4 4'}
                  />
                ))}

                {/* Active Drawing preview */}
                {drawingStart && mousePos && (
                  <line
                    x1={drawingStart.x}
                    y1={drawingStart.y}
                    x2={mousePos.x}
                    y2={mousePos.y}
                    stroke="#b829ea"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Interactive Crosshair */}
                {mousePos && (
                  <g pointerEvents="none">
                    <line
                      x1={0}
                      x2={svgWidth}
                      y1={mousePos.y}
                      y2={mousePos.y}
                      stroke="#787b86"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.8"
                    />
                    <line
                      x1={mousePos.x}
                      x2={mousePos.x}
                      y1={0}
                      y2={svgHeight}
                      stroke="#787b86"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.8"
                    />
                  </g>
                )}
              </svg>

              {/* Bottom Volume Histogram */}
              {showVolume && (
                <div className="h-12 w-full flex items-end space-x-1.5 opacity-60 px-4 pb-2 pointer-events-none">
                  {candles.map((c, i) => {
                    const cBullish = c.close >= c.open;
                    const maxVol = Math.max(...candles.map((item) => item.volume));
                    const heightPercent = Math.max(15, (c.volume / maxVol) * 100);

                    return (
                      <div
                        key={`vol-${i}`}
                        className={`flex-1 rounded-xs transition-all ${
                          cBullish ? 'bg-[#089981]' : 'bg-[#f23645]'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Y-axis Price Axis */}
            <div className="w-16 sm:w-20 border-l border-[#2a2e39] bg-[#151924] flex flex-col justify-between py-4 text-[11px] font-mono text-neutral-400 px-2 shrink-0 select-none">
              <span>{Math.round(priceTicks[0]).toLocaleString()}</span>
              {/* Live pinned price tag in green */}
              <div className="relative -ml-2">
                <span className="bg-[#089981] text-white px-1.5 py-0.5 rounded text-[11px] font-bold shadow block text-center">
                  {Math.round(currentPrice).toLocaleString()}
                </span>
              </div>
              <span>{Math.round(priceTicks[2]).toLocaleString()}</span>
              <span>{Math.round(priceTicks[3]).toLocaleString()}</span>
              <span>{Math.round(priceTicks[4]).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
