import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070c] border-t border-white/10 pt-16 pb-12 text-neutral-400 text-xs sm:text-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-3">Products</h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="hover:text-white transition">
                  Supercharts
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition">
                  Pine Script®
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Stock Screener
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Crypto Screener
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Economic Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  About us
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#signup" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold mb-3">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="#community" className="hover:text-white transition">
                  Refer a friend
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition">
                  Ideas
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition">
                  Scripts
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition">
                  Streams
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  House Rules
                </a>
              </li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h4 className="text-white font-semibold mb-3">For Business</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Widgets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Charting libraries
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition">
                  Brokerage integration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Partner program
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-3 mb-4">
              {/* X / Twitter */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition"
                aria-label="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition"
                aria-label="Telegram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.536-.196 1.006.128.832.941z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-neutral-500">
              Select market data provided by ICE Data Services.
            </p>
          </div>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center space-x-3">
            <svg
              className="w-6 h-5 fill-current text-white/40"
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
            <span>© 2024 TradingView, Inc. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-white transition">
              Terms of use
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy policy
            </a>
            <a href="#" className="hover:text-white transition">
              Cookies policy
            </a>
            <a href="#" className="hover:text-white transition">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
