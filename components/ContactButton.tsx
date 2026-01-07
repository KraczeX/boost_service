'use client';

import { useState, useCallback, memo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

function ContactButton() {
  const { themeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const colors = getThemeColors(themeColor);

  const toggleContact = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const phoneNumber = '+48 725 490 466';
  const email = 'pliki.boost-service@wp.pl';

  return (
    <>
      {/* Desktop Version - Left Side */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden sm:block">
        {/* Toggle Button */}
        <button
          onClick={toggleContact}
          className={`${colors.bgButton} text-white p-2 sm:p-3 rounded-r-lg shadow-lg transition-all duration-300 hover:scale-110`}
          aria-label="Kontakt"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>

        {/* Contact Info Panel */}
        <div
          className={`absolute left-0 top-full mt-2 bg-black/95 backdrop-blur-sm border-2 ${colors.borderButton} rounded-r-lg p-4 transition-all duration-300 ${
            isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="space-y-3 min-w-[200px]">
            <div className="text-white text-xs font-semibold mb-3 uppercase tracking-wide">
              Kontakt
            </div>
            
            {/* Phone */}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity group"
            >
              <div className={`w-10 h-10 ${colors.bgLight} border ${colors.borderLight} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Telefon</div>
                <div className="text-sm font-semibold truncate group-hover:underline">{phoneNumber}</div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity group"
            >
              <div className={`w-10 h-10 ${colors.bgLight} border ${colors.borderLight} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Email</div>
                <div className="text-sm font-semibold truncate group-hover:underline">{email}</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Version - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-50 sm:hidden">
        {/* Toggle Button */}
        <button
          onClick={toggleContact}
          className={`${colors.bgButton} text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center`}
          aria-label="Kontakt"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>

        {/* Contact Info Panel - Mobile */}
        <div
          className={`absolute bottom-full left-0 mb-2 bg-black/95 backdrop-blur-sm border-2 ${colors.borderButton} rounded-lg p-4 transition-all duration-300 min-w-[280px] ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <div className="space-y-4">
            <div className="text-white text-xs font-semibold mb-2 uppercase tracking-wide">
              Kontakt
            </div>
            
            {/* Phone */}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-white active:opacity-80 transition-opacity"
              onClick={() => setIsOpen(false)}
            >
              <div className={`w-12 h-12 ${colors.bgLight} border ${colors.borderLight} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Telefon</div>
                <div className="text-base font-semibold">{phoneNumber}</div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-white active:opacity-80 transition-opacity"
              onClick={() => setIsOpen(false)}
            >
              <div className={`w-12 h-12 ${colors.bgLight} border ${colors.borderLight} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Email</div>
                <div className="text-base font-semibold break-all">{email}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ContactButton);

