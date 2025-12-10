'use client';

import { use } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ImageGallery from '@/components/ImageGallery';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';
import Link from 'next/link';

type Params = Promise<{ id: string }>;

const realizacjeData: Record<string, {
  title: string;
  category: string;
  description: string;
  details: string[];
  images: string[];
  date: string;
}> = {
  'audi-rs6-chiptuning': {
    title: 'Audi RS6 - Chiptuning Stage 2',
    category: 'Chiptuning',
    description: 'Kompleksowy chiptuning Audi RS6 z osiągnięciem mocy 750 KM. Pojazd został poddany profesjonalnej optymalizacji oprogramowania ECU z zachowaniem pełnego bezpieczeństwa i niezawodności.',
    details: [
      'Zwiększenie mocy z 600 KM do 750 KM',
      'Zwiększenie momentu obrotowego o 150 Nm',
      'Optymalizacja map paliwowych i zapłonowych',
      'Pełna weryfikacja na hamowni',
      'Gwarancja na wykonane modyfikacje'
    ],
    images: [
      'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'
    ],
    date: '2024-01-15'
  },
  'bmw-m5-adblue': {
    title: 'BMW M5 - Usunięcie ADBLUE',
    category: 'Usuwanie ADBLUE',
    description: 'Profesjonalne usunięcie systemu AdBlue z BMW M5 z zachowaniem pełnej funkcjonalności pojazdu. Wykonano kompleksową modyfikację oprogramowania ECU z pełną dokumentacją.',
    details: [
      'Usunięcie systemu AdBlue',
      'Eliminacja ograniczeń mocy',
      'Zachowanie pełnej funkcjonalności',
      'Pełna dokumentacja modyfikacji',
      'Możliwość przywrócenia oryginalnego oprogramowania'
    ],
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'
    ],
    date: '2024-01-10'
  },
  'ford-mustang-usa': {
    title: 'Ford Mustang - Konwersja USA',
    category: 'Konwersja USA',
    description: 'Pełna konwersja Ford Mustang z rynku amerykańskiego na standardy europejskie. Wykonano modyfikacje oświetlenia, prędkościomierzy oraz pełną homologację pojazdu.',
    details: [
      'Dostosowanie oświetlenia do standardów europejskich',
      'Konwersja prędkościomierzy z mil na kilometry',
      'Pełna homologacja pojazdu',
      'Kompleksowa dokumentacja i certyfikaty',
      'Gwarancja na wszystkie modyfikacje'
    ],
    images: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'
    ],
    date: '2024-01-05'
  },
  'mercedes-amg-chiptuning': {
    title: 'Mercedes AMG - Chiptuning Stage 1',
    category: 'Chiptuning',
    description: 'Optymalizacja oprogramowania Mercedes AMG z zwiększeniem mocy o 25%. Profesjonalna modyfikacja z pełną weryfikacją na hamowni.',
    details: [
      'Zwiększenie mocy o 25%',
      'Optymalizacja momentu obrotowego',
      'Weryfikacja na hamowni',
      'Pełna dokumentacja',
      'Gwarancja na modyfikacje'
    ],
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'
    ],
    date: '2023-12-20'
  },
  'porsche-911-adblue': {
    title: 'Porsche 911 - Usunięcie ADBLUE',
    category: 'Usuwanie ADBLUE',
    description: 'Usunięcie systemu AdBlue z Porsche 911 z pełną gwarancją. Profesjonalna modyfikacja oprogramowania z zachowaniem pełnego bezpieczeństwa.',
    details: [
      'Usunięcie systemu AdBlue',
      'Eliminacja ograniczeń',
      'Pełna gwarancja',
      'Dokumentacja modyfikacji',
      'Wsparcie techniczne'
    ],
    images: [
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'
    ],
    date: '2023-12-15'
  },
  'dodge-charger-usa': {
    title: 'Dodge Charger - Konwersja USA',
    category: 'Konwersja USA',
    description: 'Kompleksowa konwersja Dodge Charger z pełną homologacją. Wykonano wszystkie wymagane modyfikacje zgodnie z standardami europejskimi.',
    details: [
      'Konwersja oświetlenia',
      'Modyfikacja prędkościomierzy',
      'Pełna homologacja',
      'Certyfikaty i dokumentacja',
      'Gwarancja na modyfikacje'
    ],
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'
    ],
    date: '2023-12-10'
  }
};

export default function RealizacjaDetailPage({ params }: { params: Params }) {
  const { id } = use(params);
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);
  
  const realizacja = realizacjeData[id];

  if (!realizacja) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Nie znaleziono realizacji</h1>
            <Link href="/realizacje" className={`${colors.text} hover:${colors.textStats} transition-colors`}>
              Wróć do listy realizacji
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
              <div className="inline-block mb-4">
                <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4`}>
                  {realizacja.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                {realizacja.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed px-4">
                Data realizacji: {new Date(realizacja.date).toLocaleDateString('pl-PL')}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {/* Left side - Image Gallery */}
              <AnimatedSection direction="right" delay={100}>
                <ImageGallery images={realizacja.images} title={realizacja.title} />
              </AnimatedSection>

              {/* Right side - Description and Details */}
              <AnimatedSection direction="left" delay={200} className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-4 ${colors.gradientText}`}>
                    Opis Projektu
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {realizacja.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    Szczegóły Realizacji
                  </h3>
                  <ul className="space-y-3">
                    {realizacja.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 ${colors.bgLight} border ${colors.borderLight} rounded-full flex items-center justify-center mt-0.5`}>
                          <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-6 border-t border-white/10`}>
                  <Link
                    href="/kontakt"
                    className={`inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base ${colors.bgButton} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg ${colors.bgButtonHover}`}
                  >
                    Skontaktuj się w sprawie podobnego projektu
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" delay={100} className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Zainteresowany <span className={colors.gradientText}>Podobnym Projektem?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
                Skontaktuj się z nami i umów bezpłatną konsultację. Nasi specjaliści doradzą najlepsze rozwiązanie dla Twojego pojazdu.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base ${colors.bgButton} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg ${colors.bgButtonHover}`}
                >
                  Skontaktuj się
                </Link>
                <Link
                  href="/realizacje"
                  className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 ${colors.borderHover} ${colors.textHover} transition-all duration-300`}
                >
                  Zobacz inne realizacje
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

