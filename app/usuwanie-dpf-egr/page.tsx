'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

export default function UsuwanieDpfEgrPage() {
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
              src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
              alt="DPF EGR removal"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 sm:mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 ${colors.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                <span className={colors.gradientText}>
                  Usuwanie DPF EGR
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
                Profesjonalne usuwanie filtrów DPF i zaworów EGR. Eliminacja problemów z regeneracją, 
                zwiększenie wydajności silnika i redukcja kosztów eksploatacji.
              </p>
            </div>
          </div>
        </section>

        {/* What is DPF EGR Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <AnimatedSection direction="right" delay={100} className="relative order-2 lg:order-1">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-white/10">
                  <ImageWithFallback
                    src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                    alt="DPF EGR system"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={200} className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                <div className="inline-block">
                  <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4`}>
                    Czym są DPF i EGR?
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                  <span className="block">Systemy</span>
                  <span className={`block ${colors.textBold}`}>DPF i EGR</span>
                </h2>
                
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  DPF (Filtr Cząstek Stałych) i EGR (Zawór Recyrkulacji Spalin) to systemy montowane w 
                  nowoczesnych silnikach diesla w celu redukcji emisji. Mogą jednak powodować problemy 
                  eksploatacyjne, wysokie koszty napraw i ograniczenia wydajności.
                </p>

                <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                  {[
                    'Eliminacja problemów z regeneracją DPF',
                    'Usunięcie ograniczeń wydajności silnika',
                    'Redukcja kosztów eksploatacji',
                    'Zwiększenie żywotności silnika'
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

        {/* Process Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Proces <span className={colors.gradientText}>Usuwania</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Jak wygląda profesjonalne usunięcie systemów DPF i EGR
              </p>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              {[
                {
                  step: '01',
                  title: 'Diagnostyka',
                  description: 'Kompleksowa analiza pojazdu i identyfikacja systemów DPF/EGR wymagających usunięcia',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )
                },
                {
                  step: '02',
                  title: 'Modyfikacja Oprogramowania',
                  description: 'Profesjonalna modyfikacja oprogramowania ECU z wyłączeniem systemów DPF i EGR',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )
                },
                {
                  step: '03',
                  title: 'Fizyczne Usunięcie',
                  description: 'Bezpieczne usunięcie lub modyfikacja fizycznych elementów systemu',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )
                },
                {
                  step: '04',
                  title: 'Weryfikacja',
                  description: 'Testy pojazdu i weryfikacja poprawnego działania wszystkich systemów',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              ].map((item, index) => (
                <AnimatedSection key={index} delay={index * 100} direction="up">
                  <div className="relative flex items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 ${colors.bgLight} border-2 ${colors.borderLight} rounded-xl flex items-center justify-center ${colors.text}`}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-2xl sm:text-3xl font-black ${colors.textStats}`}>{item.step}</span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
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
                Korzyści z <span className={colors.gradientText}>Usunięcia DPF/EGR</span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: 'Brak Regeneracji',
                  description: 'Eliminacja kosztownych i uciążliwych procesów regeneracji DPF',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                },
                {
                  title: 'Większa Moc',
                  description: 'Zwiększenie mocy i momentu obrotowego poprzez usunięcie ograniczeń',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                },
                {
                  title: 'Niższe Koszty',
                  description: 'Znaczne obniżenie kosztów eksploatacji i serwisu',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                },
                {
                  title: 'Lepsza Wydajność',
                  description: 'Poprawa spalania i wydajności silnika',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                },
                {
                  title: 'Bezpieczeństwo',
                  description: 'Profesjonalna modyfikacja z zachowaniem bezpieczeństwa pojazdu',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                }
              ].map((benefit, index) => (
                <AnimatedSection key={index} delay={index * 100} direction="up">
                  <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                    <div className={`flex-shrink-0 w-12 h-12 ${colors.bgLight} border ${colors.borderLight} rounded-lg flex items-center justify-center ${colors.text}`}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" delay={100} className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Gotowy na <span className={colors.gradientText}>Usunięcie DPF/EGR?</span>
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
      </main>
      <Footer />
    </>
  );
}

