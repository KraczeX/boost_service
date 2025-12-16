'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

export default function KalibracjeRadarowPage() {
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
              src="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
              alt="Radar calibration"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                <span className={colors.gradientText}>
                  Kalibracje Radarów
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
                Profesjonalna kalibracja systemów radarowych ADAS. Przywrócenie pełnej funkcjonalności 
                systemów bezpieczeństwa po naprawach, wymianach lub modyfikacjach pojazdu.
              </p>
            </div>
          </div>
        </section>

        {/* Systems Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4 inline-block mb-3 sm:mb-4`}>
                Systemy
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Obsługiwane <span className={colors.gradientText}>Systemy ADAS</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Kalibrujemy wszystkie główne systemy bezpieczeństwa w Twoim pojeździe
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'ACC - Adaptacyjny Tempomat',
                  description: 'Kalibracja radarów adaptacyjnego tempomatu dla bezpiecznej jazdy',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                },
                {
                  title: 'AEB - Awaryjne Hamowanie',
                  description: 'Kalibracja systemów automatycznego hamowania awaryjnego',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )
                },
                {
                  title: 'LKA - Asystent Pasa',
                  description: 'Kalibracja kamer i czujników systemu utrzymania pasa ruchu',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  )
                },
                {
                  title: 'BSM - Monitorowanie Martwego Pola',
                  description: 'Kalibracja radarów monitorujących martwe pole pojazdu',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )
                },
                {
                  title: 'Park Assist',
                  description: 'Kalibracja systemów wspomagania parkowania',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  )
                },
                {
                  title: 'Kamera CoFusion',
                  description: 'Kalibracja kamer przednich i tylnych systemów bezpieczeństwa',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )
                }
              ].map((system, index) => (
                <AnimatedSection key={index} delay={index * 80} direction="up">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 ${colors.bgLight} border ${colors.borderLight} rounded-lg flex items-center justify-center ${colors.text}`}>
                        {system.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{system.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{system.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Często Zadawane <span className={colors.gradientText}>Pytania</span>
              </h2>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: 'Kiedy potrzebna jest kalibracja radarów?',
                  answer: 'Kalibracja jest wymagana po naprawach zderzaka, wymianie przedniej szyby, kolizjach, lub modyfikacjach pojazdu wpływających na pozycję radarów lub kamer.'
                },
                {
                  question: 'Jak długo trwa kalibracja?',
                  answer: 'Czas kalibracji zależy od systemu, ale zazwyczaj zajmuje od 1 do 3 godzin. Niektóre systemy wymagają dodatkowych testów drogowych.'
                },
                {
                  question: 'Czy kalibracja jest bezpieczna?',
                  answer: 'Tak, wszystkie kalibracje wykonywane są zgodnie z normami producenta i przy użyciu certyfikowanego sprzętu diagnostycznego.'
                },
                {
                  question: 'Czy kalibracja jest gwarantowana?',
                  answer: 'Tak, oferujemy pełną gwarancję na wszystkie wykonane kalibracje oraz wsparcie techniczne w przypadku problemów.'
                }
              ].map((faq, index) => (
                <AnimatedSection key={index} delay={index * 100} direction="up">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
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
                Potrzebujesz <span className={colors.gradientText}>Kalibracji Radarów?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
                Skontaktuj się z nami i umów wizytę. Nasi specjaliści zapewnią profesjonalną kalibrację Twojego pojazdu.
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
