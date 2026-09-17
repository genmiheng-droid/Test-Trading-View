import { TickerItem, CandleData, TradeIdea, PineScriptExample, BrokerIntegration } from '../types';

export const INITIAL_TICKERS: TickerItem[] = [
  { id: 'spx', symbol: 'SPX500', name: 'S&P 500', price: 5864.67, change: 23.94, changePercent: 0.41, type: 'index' },
  { id: 'ndx', symbol: 'NDX', name: 'Nasdaq 100', price: 20380.12, change: 127.50, changePercent: 0.63, type: 'index' },
  { id: 'btc', symbol: 'BTCUSD', name: 'Bitcoin', price: 67890.00, change: 1428.00, changePercent: 2.15, type: 'crypto' },
  { id: 'eth', symbol: 'ETHUSD', name: 'Ethereum', price: 2645.20, change: -21.80, changePercent: -0.82, type: 'crypto' },
  { id: 'eur', symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.0862, change: -0.0013, changePercent: -0.12, type: 'forex' },
  { id: 'tsla', symbol: 'TSLA', name: 'Tesla, Inc.', price: 219.50, change: 7.22, changePercent: 3.40, type: 'stock' },
  { id: 'aapl', symbol: 'AAPL', name: 'Apple Inc.', price: 232.15, change: 0.65, changePercent: 0.28, type: 'stock' },
  { id: 'nvda', symbol: 'NVDA', name: 'NVIDIA Corp', price: 138.25, change: 3.74, changePercent: 2.78, type: 'stock' },
];

export const AVAILABLE_SYMBOLS = [
  { symbol: 'BTC/USD', exchange: 'Coinbase', name: 'Bitcoin', basePrice: 67890.00, decimals: 2, icon: '₿', category: 'crypto' },
  { symbol: 'ETH/USD', exchange: 'Coinbase', name: 'Ethereum', basePrice: 2645.20, decimals: 2, icon: 'Ξ', category: 'crypto' },
  { symbol: 'SPX500', exchange: 'S&P', name: 'S&P 500 Index', basePrice: 5864.67, decimals: 2, icon: '📈', category: 'index' },
  { symbol: 'NDX', exchange: 'NASDAQ', name: 'Nasdaq 100', basePrice: 20380.12, decimals: 2, icon: '📊', category: 'index' },
  { symbol: 'NVDA', exchange: 'NASDAQ', name: 'NVIDIA Corporation', basePrice: 138.25, decimals: 2, icon: '⚡', category: 'stock' },
  { symbol: 'TSLA', exchange: 'NASDAQ', name: 'Tesla Inc.', basePrice: 219.50, decimals: 2, icon: '🚗', category: 'stock' },
  { symbol: 'AAPL', exchange: 'NASDAQ', name: 'Apple Inc.', basePrice: 232.15, decimals: 2, icon: '🍎', category: 'stock' },
  { symbol: 'EUR/USD', exchange: 'FXCM', name: 'Euro / US Dollar', basePrice: 1.0862, decimals: 4, icon: '💶', category: 'forex' },
];

// Helper to generate realistic candles for any symbol
export function generateCandles(basePrice: number, count: number = 24, volatility: number = 0.015): CandleData[] {
  const candles: CandleData[] = [];
  let currentPrice = basePrice * 0.94; // start slightly below base to create upward momentum
  const now = Date.now();
  const stepMs = 3600 * 1000 * 4; // 4H intervals

  for (let i = 0; i < count; i++) {
    const timeMs = now - (count - i) * stepMs;
    const dateObj = new Date(timeMs);
    const timeStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${dateObj.getHours().toString().padStart(2, '0')}:00`;

    // Bias toward bullish trend as in screenshot
    const bias = i > 10 ? 0.003 : 0.001;
    const randomDelta = (Math.random() - 0.47 + bias) * volatility * currentPrice;
    const open = currentPrice;
    let close = currentPrice + randomDelta;
    
    // Ensure final candle matches near basePrice
    if (i === count - 1) {
      close = basePrice;
    }

    const high = Math.max(open, close) + Math.random() * (volatility * 0.7) * currentPrice;
    const low = Math.min(open, close) - Math.random() * (volatility * 0.7) * currentPrice;
    const volume = Math.floor(1200 + Math.random() * 4800 + (Math.abs(close - open) / currentPrice) * 50000);

    candles.push({
      time: timeStr,
      timestamp: timeMs,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });

    currentPrice = close;
  }

  // Calculate moving averages and Bollinger Bands
  for (let i = 0; i < candles.length; i++) {
    const lookback20 = Math.min(i + 1, 8);
    let sum20 = 0;
    for (let j = i - lookback20 + 1; j <= i; j++) {
      sum20 += candles[j].close;
    }
    const ma20 = sum20 / lookback20;
    candles[i].ma20 = Number(ma20.toFixed(2));

    const lookback50 = Math.min(i + 1, 14);
    let sum50 = 0;
    for (let j = i - lookback50 + 1; j <= i; j++) {
      sum50 += candles[j].close;
    }
    const ma50 = (sum50 / lookback50) * 0.985;
    candles[i].ma50 = Number(ma50.toFixed(2));

    const stdDev = basePrice * 0.012;
    candles[i].upperBand = Number((ma20 + stdDev * 1.8).toFixed(2));
    candles[i].lowerBand = Number((ma20 - stdDev * 1.8).toFixed(2));
  }

  return candles;
}

export const TRADE_IDEAS: TradeIdea[] = [
  {
    id: 'idea-1',
    author: 'CryptoCapo_Macro',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    symbol: 'BTC/USD',
    title: 'Bitcoin Ascending Channel Breakout Target $74K',
    direction: 'LONG',
    entryPrice: 66500,
    targetPrice: 74200,
    stopLoss: 64800,
    likes: 1420,
    comments: 312,
    timeAgo: '2 hours ago',
    analysis: 'BTC has consolidated firmly above the 200 EMA on the 4H timeframe. Key resistance at $68,200 is being tested with expanding on-chain volume and declining exchange reserves. Re-test of trendline offers high R:R setup.'
  },
  {
    id: 'idea-2',
    author: 'QuantScalperPro',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    symbol: 'NVDA',
    title: 'NVIDIA Bull Flag Pattern & AI Compute Cycle Continuation',
    direction: 'LONG',
    entryPrice: 135.50,
    targetPrice: 155.00,
    stopLoss: 129.00,
    likes: 890,
    comments: 145,
    timeAgo: '5 hours ago',
    analysis: 'Clean bull flag consolidation over the past 3 weeks. RSI cooled down to 54 while institutional block orders remain positive. Next leg up expected toward Fibonacci 1.618 extension level.'
  },
  {
    id: 'idea-3',
    author: 'ForexWizard_London',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    symbol: 'EUR/USD',
    title: 'EURUSD ECB Policy Pivot Liquidity Sweep',
    direction: 'SHORT',
    entryPrice: 1.0890,
    targetPrice: 1.0720,
    stopLoss: 1.0940,
    likes: 624,
    comments: 98,
    timeAgo: '8 hours ago',
    analysis: 'Double top printed at session high with bearish divergence on MACD histogram. Expecting euro weakness into upcoming central bank commentary.'
  }
];

export const PINE_SCRIPTS: PineScriptExample[] = [
  {
    id: 'ps-1',
    title: 'Adaptive Multi-Trend Dynamic Ribbon v5',
    description: 'Combines EMA 20, 50, 100, 200 with Volatility Adaptive Bollinger filters for zero-lag trend identification.',
    author: 'PineMaster_Official',
    stars: 5840,
    code: `//@version=5
indicator("Adaptive Multi-Trend Dynamic Ribbon", overlay=true)

src = input(close, title="Source")
fastLen = input.int(20, minval=1, title="Fast EMA")
slowLen = input.int(50, minval=1, title="Slow EMA")
volMult = input.float(2.0, title="Volatility Multiplier")

fastEMA = ta.ema(src, fastLen)
slowEMA = ta.ema(src, slowLen)
atrVal = ta.atr(14)

plot(fastEMA, color=color.new(#2962ff, 0), linewidth=2, title="Fast EMA")
plot(slowEMA, color=color.new(#b829ea, 0), linewidth=2, title="Slow EMA")
fill(plot(fastEMA), plot(slowEMA), color=fastEMA > slowEMA ? color.new(#089981, 80) : color.new(#f23645, 80))`
  },
  {
    id: 'ps-2',
    title: 'Smart Money Concepts & Order Blocks [Liquidity Matrix]',
    description: 'Auto-detects fair value gaps (FVG), breaker blocks, and market structure shifts in real-time.',
    author: 'LuxQuantAlgo',
    stars: 12450,
    code: `//@version=5
indicator("Smart Money Concepts & Order Blocks", overlay=true, max_boxes_count=50)

bullishOB = close[1] < open[1] and close > open and close > high[1]
bearishOB = close[1] > open[1] and close < open and close < low[1]

if bullishOB
    box.new(left=bar_index[1], top=high[1], right=bar_index + 10, bottom=low[1],
            bgcolor=color.new(#089981, 85), border_color=#089981)

if bearishOB
    box.new(left=bar_index[1], top=high[1], right=bar_index + 10, bottom=low[1],
            bgcolor=color.new(#f23645, 85), border_color=#f23645)`
  }
];

export const BROKERS: BrokerIntegration[] = [
  {
    id: 'paper',
    name: 'TradingView Paper Trading',
    tagline: 'Simulated trading with real-time live data & zero financial risk',
    type: 'Simulated / Practice',
    rating: 4.9,
    commission: '$0 / Trade',
    assets: ['Stocks', 'Crypto', 'Futures', 'Forex'],
    logoBg: 'bg-blue-600',
    connected: true
  },
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    tagline: 'Direct market access with institutional execution in 150+ global markets',
    type: 'Multi-Asset Broker',
    rating: 4.8,
    commission: 'Ultra Low Tiered',
    assets: ['Global Equities', 'Options', 'Futures', 'Currencies'],
    logoBg: 'bg-red-700'
  },
  {
    id: 'tradestation',
    name: 'TradeStation',
    tagline: 'Award-winning execution platform for active algorithmic traders',
    type: 'Equities & Futures',
    rating: 4.7,
    commission: '$0 Equities',
    assets: ['US Stocks', 'ETFs', 'Micro Futures', 'Crypto'],
    logoBg: 'bg-sky-600'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Advanced',
    tagline: 'Deep cryptocurrency order book depth with direct spot & perp execution',
    type: 'Digital Assets',
    rating: 4.8,
    commission: 'Competitive Maker/Taker',
    assets: ['Bitcoin', 'Ethereum', 'Altcoins', 'USDC Pairs'],
    logoBg: 'bg-blue-500'
  }
];
