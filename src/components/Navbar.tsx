import React, { useState } from 'react';
import { Search, Globe, User, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenGetStarted }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: 'Products', href: '#products', badge: 'Supercharts' },
    { name: 'Community', href: '#community', badge: '60M+' },
    { name: 'Markets', href: '#products', badge: 'Live' },
    { name: 'Brokers', href: '#community', badge: 'Integrated' },
    { name: 'More', href: '#community' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Logo & Search & Core Links */}
        <div className="flex items-center space-x-6">
          {/* TradingView Authentic TV Vector Logo */}
          <a
            href="#"
            className="flex items-center text-white focus:outline-none hover:opacity-90 transition-opacity"
            aria-label="TradingView Home"
          >
            <svg
              className="w-9 h-7 fill-current"
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
          </a>

          {/* Search Bar Pill */}
          <div className="relative hidden sm:block w-48 md:w-56 lg:w-64">
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between bg-[#1e222d]/80 hover:bg-[#2a2e39] text-[#787b86] hover:text-white px-3.5 py-1.5 rounded-full text-sm font-medium border border-white/5 transition-colors group cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                <span className="text-xs tracking-wide">Search (Ctrl+K)</span>
              </div>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 bg-black/40 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-[15px] font-medium text-neutral-200">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  className="flex items-center space-x-1 hover:text-white transition-colors py-2"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] text-blue-400 font-semibold px-1 py-0.2 bg-blue-500/10 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </a>
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Language, Profile, Get Started CTA */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 text-neutral-300 hover:text-white rounded hover:bg-white/5"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Selector */}
          <button
            type="button"
            className="flex items-center space-x-1.5 text-neutral-300 hover:text-white text-xs sm:text-sm font-medium p-1.5 rounded hover:bg-white/5 transition-colors"
            title="Change Language"
          >
            <Globe className="w-4 h-4 text-neutral-400" />
            <span className="font-semibold text-xs tracking-wider">EN</span>
          </button>

          {/* User Profile Avatar Icon */}
          <button
            type="button"
            onClick={onOpenGetStarted}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Account Menu"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Get started button with vibrant electric blue to purple gradient */}
          <button
            type="button"
            onClick={onOpenGetStarted}
            className="px-5 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-[#2962ff] via-[#4d53ff] to-[#bd00ff] hover:opacity-95 shadow-[0_0_20px_rgba(41,98,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center inline-block whitespace-nowrap cursor-pointer"
          >
            Get started
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white rounded hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1117] border-b border-white/10 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-neutral-200 hover:text-white py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Join 60M+ Global Traders</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="text-xs font-semibold text-blue-400"
            >
              Sign in →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
