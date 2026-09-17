/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveTickerTape } from './components/LiveTickerTape';
import { InteractiveChart } from './components/InteractiveChart';
import { CommunityFeatures } from './components/CommunityFeatures';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SpaceMissionModal } from './components/SpaceMissionModal';
import { TradeIdeasModal } from './components/TradeIdeasModal';
import { PineScriptModal } from './components/PineScriptModal';
import { BrokersModal } from './components/BrokersModal';
import { GetStartedModal } from './components/GetStartedModal';
import { FullChartModal } from './components/FullChartModal';

export default function App() {
  const [currentSymbol, setCurrentSymbol] = useState<string>('BTC/USD');

  // Modals state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [spaceMissionModalOpen, setSpaceMissionModalOpen] = useState(false);
  const [tradeIdeasModalOpen, setTradeIdeasModalOpen] = useState(false);
  const [pineScriptModalOpen, setPineScriptModalOpen] = useState(false);
  const [brokersModalOpen, setBrokersModalOpen] = useState(false);
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);
  const [fullChartModalOpen, setFullChartModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Fixed Top Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenGetStarted={() => setGetStartedModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* Orbital Hero Section */}
        <HeroSection
          onOpenGetStarted={() => setGetStartedModalOpen(true)}
          onOpenSpaceMission={() => setSpaceMissionModalOpen(true)}
        />

        {/* Live Market Ticker Tape */}
        <LiveTickerTape onSelectSymbol={(sym) => setCurrentSymbol(sym)} />

        {/* Interactive TradingView Candlestick Chart */}
        <InteractiveChart
          currentSymbol={currentSymbol}
          onSymbolChange={(sym) => setCurrentSymbol(sym)}
          onOpenFullChart={() => setFullChartModalOpen(true)}
        />

        {/* Community, Pine Script, and Broker Integrations */}
        <CommunityFeatures
          onOpenTradeIdeas={() => setTradeIdeasModalOpen(true)}
          onOpenPineScript={() => setPineScriptModalOpen(true)}
          onOpenBrokers={() => setBrokersModalOpen(true)}
        />
      </main>

      {/* Comprehensive TradingView Footer */}
      <Footer />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSymbol={(sym) => setCurrentSymbol(sym)}
      />

      <SpaceMissionModal
        isOpen={spaceMissionModalOpen}
        onClose={() => setSpaceMissionModalOpen(false)}
      />

      <TradeIdeasModal
        isOpen={tradeIdeasModalOpen}
        onClose={() => setTradeIdeasModalOpen(false)}
        onSelectSymbol={(sym) => setCurrentSymbol(sym)}
      />

      <PineScriptModal
        isOpen={pineScriptModalOpen}
        onClose={() => setPineScriptModalOpen(false)}
      />

      <BrokersModal
        isOpen={brokersModalOpen}
        onClose={() => setBrokersModalOpen(false)}
      />

      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={() => setGetStartedModalOpen(false)}
      />

      <FullChartModal
        isOpen={fullChartModalOpen}
        onClose={() => setFullChartModalOpen(false)}
        currentSymbol={currentSymbol}
        onSymbolChange={(sym) => setCurrentSymbol(sym)}
      />
    </div>
  );
}
