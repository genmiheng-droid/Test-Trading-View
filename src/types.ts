export interface TickerItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'crypto' | 'stock' | 'index' | 'forex';
}

export interface CandleData {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma20?: number;
  ma50?: number;
  upperBand?: number;
  lowerBand?: number;
}

export type Timeframe = '1D' | '1H' | '4H' | '1W' | '1M';
export type ChartStyle = 'candles' | 'line' | 'area' | 'bars';
export type DrawingToolType = 'cursor' | 'trendline' | 'horizontal' | 'fib' | 'ruler' | 'trash';

export interface DrawnLine {
  id: string;
  type: 'trendline' | 'horizontal';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}

export interface TradeIdea {
  id: string;
  author: string;
  authorAvatar: string;
  symbol: string;
  title: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  likes: number;
  comments: number;
  timeAgo: string;
  analysis: string;
}

export interface PineScriptExample {
  id: string;
  title: string;
  description: string;
  code: string;
  author: string;
  stars: number;
}

export interface BrokerIntegration {
  id: string;
  name: string;
  tagline: string;
  type: string;
  rating: number;
  commission: string;
  assets: string[];
  logoBg: string;
  connected?: boolean;
}
