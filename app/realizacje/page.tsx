'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

const realizacje = [
  {
    id: 'audi-rs6-chiptuning',
    title: 'Audi RS6 - Chiptuning Stage 2',
    shortDescription: 'Kompleksowy chiptuning Audi RS6 z osiągnięciem mocy 750 KM',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Chiptuning',
    date: '2024-01-15'
  },
  {
    id: 'bmw-m5-adblue',
    title: 'BMW M5 - Usunięcie ADBLUE',
    shortDescription: 'Profesjonalne usunięcie systemu AdBlue z zachowaniem pełnej funkcjonalności',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Usuwanie ADBLUE',
    date: '2024-01-10'
  },
  {
    id: 'ford-mustang-usa',
    title: 'Ford Mustang - Konwersja USA',
    shortDescription: 'Pełna konwersja Mustanga z rynku amerykańskiego na standardy europejskie',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Konwersja USA',
    date: '2024-01-05'
  },
  {
    id: 'mercedes-amg-chiptuning',
    title: 'Mercedes AMG - Chiptuning Stage 1',
    shortDescription: 'Optymalizacja oprogramowania Mercedes AMG z zwiększeniem mocy o 25%',
    image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Chiptuning',
    date: '2023-12-20'
  },
  {
    id: 'porsche-911-adblue',
    title: 'Porsche 911 - Usunięcie ADBLUE',
    shortDescription: 'Usunięcie systemu AdBlue z Porsche 911 z pełną gwarancją',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Usuwanie ADBLUE',
    date: '2023-12-15'
  },
  {
    id: 'dodge-charger-usa',
    title: 'Dodge Charger - Konwersja USA',
    shortDescription: 'Kompleksowa konwersja Dodge Charger z pełną homologacją',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Konwersja USA',
    date: '2023-12-10'
  }
];

export default function RealizacjePage() {
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);

  return (
    <>
      <Header />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {realizacje.map((realizacja, index) => (
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
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                        <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 ${colors.badge} backdrop-blur-sm text-white text-xs font-semibold mb-2`}>
                          {realizacja.category}
                        </span>
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
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

