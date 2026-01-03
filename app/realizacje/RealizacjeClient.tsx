'use client';

import AnimatedSection from '@/components/AnimatedSection';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';
import type { Realizacja } from '@/utils/realizacje';

interface RealizacjeClientProps {
  realizacje: Realizacja[];
}

export default function RealizacjeClient({ realizacje }: RealizacjeClientProps) {
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 ${colors.bgLight} opacity-20 rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 ${colors.bg} opacity-20 rounded-full blur-3xl`}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Nasze <span className={colors.gradientText}>Realizacje</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
              Zobacz przykłady naszych projektów - chiptuning, usuwanie ADBLUE i konwersje pojazdów USA
            </p>
          </div>
        </div>
      </section>

      {/* Realizations Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters (Services) */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-base font-semibold text-gray-400 mb-3 sm:mb-4 text-center">Filtruj po usłudze:</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                }}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${
                  selectedCategory === null
                    ? `${colors.bgButton} text-white ${colors.bgButtonHover}`
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                Wszystkie
              </button>
              {['Chiptuning', 'Usuwanie ADBLUE', 'Konwersja USA', 'Naprawa elektroniki'].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedBrand(null);
                  }}
                  className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${
                    selectedCategory === category
                      ? `${colors.bgButton} text-white ${colors.bgButtonHover}`
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filters */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-sm sm:text-base font-semibold text-gray-400 mb-3 sm:mb-4 text-center">Filtruj po marce:</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${
                  selectedBrand === null
                    ? `${colors.bgButton} text-white ${colors.bgButtonHover}`
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                Wszystkie
              </button>
              {['BMW', 'Audi', 'Mercedes', 'Porsche', 'Volkswagen'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${
                    selectedBrand === brand
                      ? `${colors.bgButton} text-white ${colors.bgButtonHover}`
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {useMemo(() => {
              return realizacje
                .filter(realizacja => {
                  const categoryMatch = selectedCategory === null || realizacja.category === selectedCategory;
                  const brandMatch = selectedBrand === null || realizacja.brand === selectedBrand;
                  return categoryMatch && brandMatch;
                })
                .map((realizacja, index) => (
              <AnimatedSection key={realizacja.id} delay={index * 100} direction="up">
                <Link
                  href={`/realizacje/${realizacja.id}`}
                  className="group block"
                  prefetch={false}
                >
                  <div className={`relative h-64 overflow-hidden mb-3 sm:mb-4 border-2 ${colors.frameBorderLight} hover:${colors.border} transition-all duration-300`}>
                    <ImageWithFallback
                      src={realizacja.image}
                      alt={realizacja.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 ${colors.badge} backdrop-blur-sm text-white text-xs font-semibold`}>
                          {realizacja.category}
                        </span>
                        <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                          {realizacja.brand}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-base sm:text-lg">{realizacja.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {realizacja.shortDescription}
                  </p>
                  <div className={`mt-3 sm:mt-4 flex items-center ${colors.text} group-hover:${colors.textStats} transition-colors`}>
                    <span className="text-xs sm:text-sm font-semibold mr-2">Zobacz szczegóły</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </AnimatedSection>
                ));
            }, [selectedCategory, selectedBrand, colors, realizacje])}
          </div>
        </div>
      </section>
    </main>
  );
}

