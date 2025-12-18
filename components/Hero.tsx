'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

// Zdjęcia z folderu okładki
const supercarImages = [
  '/okładki/PHOTO-2025-12-18-20-07-38.jpg',
  '/okładki/PHOTO-2025-12-18-20-08-20.jpg',
  '/okładki/PHOTO-2025-12-18-20-08-41.jpg',
  '/okładki/PHOTO-2025-12-18-20-09-01.jpg',
  '/okładki/PHOTO-2025-12-18-20-09-17.jpg',
] as const;

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);

  // Preload next image
  const nextImageIndex = useMemo(() => (currentImageIndex + 1) % supercarImages.length, [currentImageIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % supercarImages.length);
    }, 5000); // Zmiana co 5 sekund

    return () => clearInterval(interval);
  }, []);

  // Render only current and next image for better performance
  const visibleImages = useMemo(() => {
    return [currentImageIndex, nextImageIndex].filter((idx, pos, arr) => arr.indexOf(idx) === pos);
  }, [currentImageIndex, nextImageIndex]);

  return (
    <section className="relative min-h-[75vh] sm:min-h-screen flex items-center overflow-hidden bg-black">
      {/* Rotating Background Images - Only render visible images */}
      <div className="absolute inset-0">
        {visibleImages.map((index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 will-change-opacity ${
              index === currentImageIndex ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <Image
              src={supercarImages[index]}
              alt={`Supercar ${index + 1}`}
              fill
              className="object-cover scale-110"
              priority={index === 0}
              quality={75}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
      
      {/* Animated accent lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colors.accentLine} opacity-60`}></div>
        <div className={`absolute top-0 right-0 w-1 h-full bg-gradient-to-b ${colors.accentLine} opacity-60`}></div>
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.accentLine} opacity-60`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start sm:items-center">
          {/* Left side - Text content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="inline-block">
              <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4`}>
                Profesjonalne Usługi
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-tight sm:leading-none">
              <span className="block">Maksymalna</span>
              <span className={`block ${colors.textBold}`}>Wydajność</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-7xl mt-1 sm:mt-2">Twojego Pojazdu</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
              Zwiększ moc, popraw osiągi i dostosuj auto do swoich potrzeb. 
              Profesjonalny chiptuning, usuwanie ADBLUE oraz konwersja pojazdów USA.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4">
              <div className={`border-l-2 ${colors.border} pl-2 sm:pl-4`}>
                <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.textStats}`}>5000+</div>
                <div className="text-xs sm:text-sm text-gray-400 leading-tight">Zrealizowanych projektów</div>
              </div>
              <div className={`border-l-2 ${colors.border} pl-2 sm:pl-4`}>
                <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.textStats}`}>10+</div>
                <div className="text-xs sm:text-sm text-gray-400 leading-tight">Lat doświadczenia</div>
              </div>
              <div className={`border-l-2 ${colors.border} pl-2 sm:pl-4`}>
                <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${colors.textStats}`}>100%</div>
                <div className="text-xs sm:text-sm text-gray-400 leading-tight">Zadowolonych klientów</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                href="/chiptuning"
                className={`group relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base ${colors.bgButton} text-white font-bold rounded-none border-2 ${colors.borderButton} overflow-hidden transition-all duration-300 ${colors.bgButtonHover} ${colors.borderButtonHover} text-center`}
              >
                <span className="relative z-10">Chiptuning</span>
                <div className={`absolute inset-0 ${colors.bgButtonHoverInner} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}></div>
              </Link>
              
              <Link
                href="/adblue"
                className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-transparent text-white font-bold rounded-none border-2 border-white/30 ${colors.borderHover} ${colors.textHover} transition-all duration-300 text-center`}
              >
                Usuwanie ADBLUE
              </Link>
              
              <Link
                href="/usa-conversion"
                className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-transparent text-white font-bold rounded-none border-2 border-white/30 ${colors.borderHover} ${colors.textHover} transition-all duration-300 text-center`}
              >
                Konwersja USA
              </Link>
            </div>
          </div>

          {/* Right side - Visual element */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Rotating image frame */}
              <div className={`absolute inset-0 border-4 ${colors.frameBorder} transform rotate-3 animate-pulse will-change-opacity`}></div>
              <div className={`absolute inset-4 border-2 ${colors.frameBorderLight} transform -rotate-3`}></div>
              
              {/* Image inside frame - Only render visible images */}
              <div className="absolute inset-8 overflow-hidden bg-black">
                {visibleImages.map((index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 will-change-opacity ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={supercarImages[index]}
                      alt={`Supercar ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      quality={75}
                      sizes="(max-width: 1024px) 0vw, 50vw"
                    />
                  </div>
                ))}
              </div>
          </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce will-change-transform hidden sm:block">
          <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.scrollIndicator}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

