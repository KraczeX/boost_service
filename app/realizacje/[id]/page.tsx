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
  brand: string;
  description: string;
  details: string[];
  images: string[];
  date: string;
}> = {
  'audi-q7-chiptuning': {
    title: 'Audi Q7 4M FL 45TDI DPXB - Chiptuning',
    category: 'Chiptuning',
    brand: 'Audi',
    description: 'Najsłabsza odmiana silnika 3.0TDI otrzymała zastrzyk niezbędnej mocy. Domyślnie w tych silnikach można wykonać bezpieczne strojenie w granicach 340-350km / 700nm. Jednak w tym przypadku właściciel prosił nas o celowanie typowo w okolice 300km i 600Nm i tak też zrobiliśmy. Podnieśliśmy ciśnienie oleju w praktycznie całym zakresie pracy silnika, zabezpieczy to jednostkę przed zatarciem. Auto fabrycznie przy 1800obr i temperaturze oleju 95stopni utrzymywało zaledwie 1.2bar ciśnienia. Po moim programie auto w tych obrotach utrzymuje 2.7bara. Pozbyliśmy się układu Start&Stop. Auto stało się bardzo dynamiczne, lepiej reaguje na dodanie gazu. Pozbyliśmy się denerwującego Laga.',
    details: [
      'Zwiększenie mocy z 231 KM (238 KM) do 310 KM',
      'Zwiększenie momentu obrotowego z 501 Nm do 619 Nm',
      'Podniesienie ciśnienia oleju z 1.2bar do 2.7bar przy 1800obr i temperaturze 95°C',
      'Zabezpieczenie jednostki przed zatarciem poprzez optymalizację ciśnienia oleju',
      'Usunięcie układu Start&Stop',
      'Eliminacja denerwującego Laga',
      'Znaczna poprawa dynamiki i reakcji na dodanie gazu',
      'Bezpieczne strojenie dostosowane do wymagań klienta (300km / 600Nm zamiast maksymalnych 340-350km / 700nm)'
    ],
    images: [
      '/realizacje/audi/597400476_1543945244405512_4053870336900835956_n.jpg',
      '/realizacje/audi/598147195_1543945264405510_8907733685289703726_n.jpg',
      '/realizacje/audi/599038796_1543945251072178_5121084792254989465_n.jpg'
    ],
    date: '2024-01-20'
  },
  'bmw-m2-competition-usa': {
    title: 'BMW M2 Competition F87 - Konwersja USA',
    category: 'Konwersja USA',
    brand: 'BMW',
    description: 'Kompleksowa konwersja BMW M2 Competition F87 z rynku amerykańskiego na standardy europejskie. Wykonano pełną konwersję oświetlenia, kodowanie systemów, wymianę tarcz wskaźników oraz aktualizację oprogramowania.',
    details: [
      'Montaż lamp EU zgodnych ze standardami europejskimi',
      'Kodowanie lamp i uruchomienie światła przeciwmgielnego',
      'Zmiana języka jednostki NBT Evo na polski',
      'Instalacja najnowszych map nawigacji',
      'Wymiana tarcz wskaźników na KM/h',
      'Odblokowanie świateł matrycowych Adaptive Led',
      'Wyłączenie przednich side markerów'
    ],
    images: [
      '/realizacje/bmw/592370304_1533717815428255_7148405695979271444_n.jpg',
      '/realizacje/bmw/591831982_1533717782094925_609722780348058647_n.jpg',
      '/realizacje/bmw/591887093_1533717845428252_2178732791081934857_n.jpg',
      '/realizacje/bmw/593113868_1533717895428247_2725825038290188181_n.jpg',
      '/realizacje/bmw/594064758_1533717825428254_3447027299729079124_n.jpg'
    ],
    date: '2024-01-25'
  },
  'bmw-m240i-chiptuning': {
    title: 'BMW M240i G42 3.0T - Chiptuning Stage 1.5',
    category: 'Chiptuning',
    brand: 'BMW',
    description: 'Chiptuning Stage 1.5 BMW M240i G42 3.0T z silnikiem B58 z 2024 roku. Sterownik MG1CS201 został odblokowany w Finlandii przez FEMTO - na tę chwilę jedyna opcja dostępu do tych zablokowanych sterowników. Przy pomocy FemTool jesteśmy w stanie zapisywać nasze modyfikacje. Nasz autorski Stage 1.5 na paliwie 98 daje mega przyrost mocy. Zajęło nam trochę czasu wystrojenie tego samochodu, ale było warto.',
    details: [
      'Zwiększenie mocy z 374 KM do 467 KM',
      'Zwiększenie momentu obrotowego z 500 Nm do 623 Nm',
      'Odblokowanie sterownika MG1CS201 przez FEMTO (Finlandia)',
      'Autorski Stage 1.5 na paliwie 98',
      'Wyłączony filtr GPF',
      'Wyłączona klapa wydechu',
      'Wyłączony Start&Stop',
      'Kalibracja sportowych wskaźników NBT',
      'Komplet logów parametrów po modyfikacji do weryfikacji'
    ],
    images: [
      '/realizacje/bmw2/547738055_1456975303102507_1850151271145226443_n.jpg',
      '/realizacje/bmw2/547985299_1456975349769169_6610657390075273648_n.jpg',
      '/realizacje/bmw2/548362259_1456975363102501_2039597816879874137_n.jpg',
      '/realizacje/bmw2/549469263_1456975296435841_2139845267331345954_n.jpg'
    ],
    date: '2024-01-30'
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
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
                <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4`}>
                  {realizacja.category}
                </span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 border-white/30 pl-3 sm:pl-4 text-white bg-white/10 px-3 sm:px-4 py-1 sm:py-2">
                  {realizacja.brand}
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


