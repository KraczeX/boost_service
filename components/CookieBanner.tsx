'use client';

import { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

function CookieBanner() {
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sprawdź czy użytkownik już zaakceptował cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Pokaż banner po krótkim opóźnieniu dla lepszego UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] bg-black/95 backdrop-blur-sm border-t-2 ${colors.borderButton} shadow-2xl transition-all duration-500 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <svg className={`w-6 h-6 ${colors.text} flex-shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-1">
                  Pliki Cookie
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Ta strona używa plików cookie, aby zapewnić najlepsze doświadczenie użytkownika. 
                  Kontynuując przeglądanie, zgadzasz się na użycie plików cookie zgodnie z naszą{' '}
                  <Link 
                    href="/polityka-prywatnosci" 
                    className={`${colors.text} hover:underline font-semibold`}
                  >
                    Polityką Prywatności
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm sm:text-base text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-all duration-300 whitespace-nowrap"
            >
              Odrzuć
            </button>
            <button
              onClick={acceptCookies}
              className={`px-6 py-2 text-sm sm:text-base text-white ${colors.bgButton} hover:opacity-90 rounded-lg transition-all duration-300 font-semibold whitespace-nowrap shadow-lg`}
            >
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CookieBanner);







