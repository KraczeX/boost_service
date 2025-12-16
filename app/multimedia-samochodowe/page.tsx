'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

export default function MultimediaSamochodowePage() {
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
              alt="Car multimedia"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                <span className={colors.gradientText}>
                  Multimedia Samochodowe
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
                Nowoczesne systemy multimedialne do Twojego pojazdu. Montaż, konfiguracja i integracja 
                systemów audio, nawigacji i rozrywki w każdym pojeździe.
              </p>
            </div>
          </div>
        </section>

        {/* What is Car Multimedia Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <AnimatedSection direction="right" delay={100} className="relative order-2 lg:order-1">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-white/10">
                  <ImageWithFallback
                    src="https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                    alt="Car multimedia system"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={200} className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                <div className="inline-block">
                  <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4`}>
                    Czym są multimedia samochodowe?
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                  <span className="block">Systemy</span>
                  <span className={`block ${colors.textBold}`}>Multimedialne</span>
                </h2>
                
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Nowoczesne systemy multimedialne to centrum rozrywki i informacji w Twoim pojeździe. 
                  Oferujemy kompleksową instalację, konfigurację i integrację systemów audio, nawigacji, 
                  Apple CarPlay, Android Auto i wielu innych rozwiązań.
                </p>

                <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                  {[
                    'Montaż systemów audio i video',
                    'Integracja Apple CarPlay i Android Auto',
                    'Instalacja systemów nawigacji',
                    'Konfiguracja i programowanie'
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

        {/* Products Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4 inline-block mb-3 sm:mb-4`}>
                Produkty
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Nasze <span className={colors.gradientText}>Rozwiązania</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Nowoczesne systemy multimedialne dla Twojego pojazdu
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'Apple CarPlay',
                  description: 'Pełna integracja z urządzeniami Apple',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                },
                {
                  title: 'Android Auto',
                  description: 'Kompatybilność z systemem Android',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                },
                {
                  title: 'Nawigacja',
                  description: 'Zaawansowane systemy nawigacji satelitarnej',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                },
                {
                  title: 'Audio Premium',
                  description: 'Wysokiej jakości systemy audio',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                },
                {
                  title: 'Integracja',
                  description: 'Bezproblemowa integracja z istniejącymi systemami',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                },
                {
                  title: 'Wsparcie',
                  description: 'Pełne wsparcie techniczne i serwis',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
                }
              ].map((product, index) => (
                <AnimatedSection key={index} delay={index * 100} direction="up">
                  <div className="relative group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className={`absolute top-4 right-4 w-12 h-12 ${colors.bgLight} border ${colors.borderLight} rounded-lg flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform`}>
                        {product.icon}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Dodatkowe <span className={colors.gradientText}>Funkcje</span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {[
                'Bluetooth',
                'USB/AUX',
                'DAB+ Radio',
                'WiFi',
                'GPS',
                'Kamera CoFusion',
                'Voice Control',
                'Touchscreen'
              ].map((feature, index) => (
                <AnimatedSection key={index} delay={index * 50} direction="up">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="text-sm sm:text-base font-semibold text-white">{feature}</div>
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
                Chcesz <span className={colors.gradientText}>Multimedia w Autach?</span>
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

