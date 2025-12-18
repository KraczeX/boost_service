'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

export default function ChiptuningPage() {
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
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
              alt="Car engine"
              className="w-full h-full object-cover"
              loading="eager"
              priority
              fill
              sizes="100vw"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 sm:mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 ${colors.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                <span className={colors.gradientText}>
                  Chiptuning
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
                Zwiększ moc, moment obrotowy i wydajność silnika poprzez profesjonalną optymalizację oprogramowania ECU. 
                Bezpieczne i sprawdzone rozwiązania dla wszystkich marek pojazdów.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4 inline-block mb-3 sm:mb-4`}>
                Korzyści
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Korzyści z <span className={colors.gradientText}>Chiptuningu</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Odkryj wszystkie zalety profesjonalnego chiptuningu
              </p>
            </AnimatedSection>

            {/* Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <AnimatedSection direction="right" delay={100}>
                <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden border-2 border-white/10">
                  <ImageWithFallback
                    src="/realizacje/bmw2/547738055_1456975303102507_1850151271145226443_n.jpg"
                    alt="Chiptuning benefits"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={200}>
                <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden border-2 border-white/10">
                  <ImageWithFallback
                    src="/realizacje/bmw2/547985299_1456975349769169_6610657390075273648_n.jpg"
                    alt="Chiptuning benefits"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
              </AnimatedSection>
            </div>

            {/* Benefits List */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[
                  {
                    title: 'Zwiększona Moc',
                    description: 'Zwiększenie mocy silnika nawet o 30-40% w zależności od modelu pojazdu',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )
                  },
                  {
                    title: 'Większy Moment',
                    description: 'Znaczne zwiększenie momentu obrotowego, szczególnie w niższych zakresach obrotów',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )
                  },
                  {
                    title: 'Lepsza Wydajność',
                    description: 'Optymalizacja zużycia paliwa przy zachowaniu lub zwiększeniu mocy',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )
                  },
                  {
                    title: 'Bezpieczeństwo',
                    description: 'Wszystkie modyfikacje wykonywane z zachowaniem pełnego bezpieczeństwa pojazdu',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )
                  },
                  {
                    title: 'Gwarancja',
                    description: 'Pełna gwarancja na wszystkie wykonane modyfikacje i wsparcie techniczne',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    title: 'Oryginalne Oprogramowanie',
                    description: 'Możliwość przywrócenia oryginalnego oprogramowania w każdej chwili',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )
                  }
                ].map((benefit, index) => (
                  <AnimatedSection key={index} delay={index * 100} direction="up">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group">
                      <div className="flex items-start gap-4 sm:gap-5">
                        <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 ${colors.bgLight} border ${colors.borderLight} rounded-xl flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform`}>
                          {benefit.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{benefit.title}</h3>
                          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Proces <span className={colors.gradientText}>Realizacji</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Jak wygląda proces chiptuningu Twojego pojazdu
              </p>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              {[
                {
                  step: '01',
                  title: 'Diagnostyka',
                  description: 'Kompleksowa analiza pojazdu, odczyt parametrów ECU i identyfikacja możliwości optymalizacji',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  )
                },
                {
                  step: '02',
                  title: 'Przygotowanie',
                  description: 'Tworzenie kopii zapasowej oryginalnego oprogramowania i przygotowanie zoptymalizowanej wersji',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  )
                },
                {
                  step: '03',
                  title: 'Programowanie',
                  description: 'Wgranie zoptymalizowanego oprogramowania do ECU z pełną weryfikacją poprawności',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
                {
                  step: '04',
                  title: 'Testy',
                  description: 'Kompleksowe testy pojazdu na hamowni i w warunkach drogowych weryfikujące poprawę parametrów',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                },
                {
                  step: '05',
                  title: 'Gotowe',
                  description: 'Przekazanie pojazdu z dokumentacją, gwarancją i pełnym wsparciem technicznym',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )
                }
              ].map((item, index) => (
                <AnimatedSection key={index} delay={index * 100} direction="up">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="flex-shrink-0 flex justify-center sm:justify-start">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 ${colors.bgLight} border-2 ${colors.frameBorder} rounded-xl flex items-center justify-center ${colors.text}`}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 md:p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                        <span className={`text-2xl sm:text-3xl font-black ${colors.textStats} text-center sm:text-left`}>{item.step}</span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center sm:text-right">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-center sm:text-left">{item.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left side - Image */}
              <AnimatedSection direction="right" delay={100} className="relative order-2 lg:order-1">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-white/10">
                  <ImageWithFallback
                    src="/realizacje/bmw2/549469263_1456975296435841_2139845267331345954_n.jpg"
                    alt="Technologia chiptuningu"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </AnimatedSection>

              {/* Right side - Content */}
              <AnimatedSection direction="left" delay={200} className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                <div className="inline-block">
                  <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4`}>
                    Technologia
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                  <span className="block">Zaawansowana</span>
                  <span className={`block ${colors.textBold}`}>Technologia</span>
                </h2>
                
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Używamy najnowszych narzędzi diagnostycznych i oprogramowania do optymalizacji ECU. 
                  Każdy pojazd jest traktowany indywidualnie, a modyfikacje są dostosowane do specyfiki 
                  konkretnej jednostki napędowej.
                </p>

                <div className="space-y-4 pt-4">
                  {[
                    'Oprogramowanie dostosowane do konkretnego pojazdu',
                    'Pełna kopia zapasowa oryginalnego oprogramowania',
                    'Najnowsze narzędzia diagnostyczne',
                    'Weryfikacja na hamowni przed i po modyfikacji'
                  ].map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 ${colors.bgLight} border ${colors.borderLight} rounded-full flex items-center justify-center mt-0.5`}>
                        <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" delay={100} className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Gotowy na <span className={colors.gradientText}>Zwiększenie Mocy?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
                Skontaktuj się z nami i umów wizytę. Nasi specjaliści doradzą najlepsze rozwiązanie dla Twojego pojazdu.
              </p>
              <a
                href="/kontakt"
                className={`inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base ${colors.bgButton} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg ${colors.bgButtonHover}`}
              >
                Skontaktuj się
              </a>  
            </AnimatedSection>
          </div>
        </section>

        {/* Realizations Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Nasze <span className={colors.gradientText}>Realizacje</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Zobacz przykłady naszych projektów chiptuningu
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  id: 'bmw-m240i-chiptuning',
                  title: 'BMW M240i G42 3.0T - Chiptuning Stage 1.5',
                  shortDescription: 'Zwiększenie mocy z 374 KM do 467 KM i momentu obrotowego z 500 Nm do 623 Nm',
                  image: '/realizacje/bmw2/547738055_1456975303102507_1850151271145226443_n.jpg',
                  category: 'Chiptuning',
                  brand: 'BMW',
                  date: '2024-01-30'
                },
                {
                  id: 'audi-q7-chiptuning',
                  title: 'Audi Q7 4M FL 45TDI DPXB - Chiptuning',
                  shortDescription: 'Zwiększenie mocy z 231 KM do 310 KM i momentu obrotowego z 501 Nm do 619 Nm',
                  image: '/realizacje/audi/597400476_1543945244405512_4053870336900835956_n.jpg',
                  category: 'Chiptuning',
                  brand: 'Audi',
                  date: '2024-01-20'
                }
              ].map((realizacja, index) => (
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
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
