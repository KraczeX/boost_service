'use client';

import { useState, useCallback, memo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

const colorConfig = {
  red: {
    name: 'Czerwony',
    bg: 'bg-red-600',
    border: 'border-red-600',
    shadow: 'shadow-red-500/50',
  },
  blue: {
    name: 'Niebieski',
    bg: 'bg-blue-600',
    border: 'border-blue-600',
    shadow: 'shadow-blue-500/50',
  },
  green: {
    name: 'Zielony',
    bg: 'bg-green-600',
    border: 'border-green-600',
    shadow: 'shadow-green-500/50',
  },
} as const;

function ColorPalette() {
  const { themeColor, setThemeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const colors = getThemeColors(themeColor);

  const togglePalette = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleColorChange = useCallback((color: 'red' | 'blue' | 'green') => {
    setThemeColor(color);
    setIsOpen(false);
  }, [setThemeColor]);

  return (
    <>
      {/* Desktop Version - Right Side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden sm:block">
        {/* Toggle Button */}
        <button
          onClick={togglePalette}
          className={`${colors.bgButton} text-white p-2 sm:p-3 rounded-l-lg shadow-lg transition-all duration-300 hover:scale-110`}
          aria-label="Otwórz paletę kolorów"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </button>

        {/* Color Palette */}
        <div
          className={`absolute right-0 top-full mt-2 bg-black/95 backdrop-blur-sm border-2 ${colors.borderButton} rounded-l-lg p-4 transition-all duration-300 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="space-y-3">
            <div className="text-white text-xs font-semibold mb-3 uppercase tracking-wide">
              Motyw
            </div>
            {(['red', 'blue', 'green'] as const).map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`w-12 h-12 rounded-lg ${colorConfig[color].bg} border-2 transition-all duration-300 hover:scale-110 ${
                  themeColor === color
                    ? `${colorConfig[color].border} border-4 shadow-lg ${colorConfig[color].shadow}`
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                aria-label={`Zmień motyw na ${colorConfig[color].name}`}
                title={colorConfig[color].name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Version - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50 sm:hidden">
        {/* Toggle Button */}
        <button
          onClick={togglePalette}
          className={`${colors.bgButton} text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center`}
          aria-label="Otwórz paletę kolorów"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </button>

        {/* Color Palette - Mobile */}
        <div
          className={`absolute bottom-full right-0 mb-2 bg-black/95 backdrop-blur-sm border-2 ${colors.borderButton} rounded-lg p-3 transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="text-white text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
              Motyw:
            </div>
            {(['red', 'blue', 'green'] as const).map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`w-10 h-10 rounded-lg ${colorConfig[color].bg} border-2 transition-all duration-300 active:scale-95 ${
                  themeColor === color
                    ? `${colorConfig[color].border} border-4 shadow-lg ${colorConfig[color].shadow}`
                    : 'border-transparent opacity-70'
                }`}
                aria-label={`Zmień motyw na ${colorConfig[color].name}`}
                title={colorConfig[color].name}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ColorPalette);

