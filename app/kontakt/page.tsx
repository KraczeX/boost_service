'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

export default function KontaktPage() {
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
                <span className={colors.gradientText}>Kontakt</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
                Skontaktuj się z nami i umów bezpłatną konsultację
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">
              {/* Contact Info */}
              <AnimatedSection direction="right" delay={100} className="h-full flex flex-col">
                <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full flex flex-col`}>
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      Informacje <span className={colors.gradientText}>Kontaktowe</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
                      Jesteśmy dostępni od poniedziałku do piątku w godzinach 8:00 - 16:00. 
                      Zapraszamy do kontaktu telefonicznego, mailowego lub osobistego wizyty w naszym warsztacie.
                    </p>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6 flex-1">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 ${colors.bgLight} border-2 ${colors.borderLight} rounded-xl flex items-center justify-center`}>
                        <svg className={`w-7 h-7 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Adres</h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          Stawowa 7<br />
                          63-600 Hanulin
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 ${colors.bgLight} border-2 ${colors.borderLight} rounded-xl flex items-center justify-center`}>
                        <svg className={`w-7 h-7 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Telefon</h3>
                        <a href="tel:+48725490466" className={`${colors.text} hover:${colors.textStats} transition-colors text-sm sm:text-base font-medium`}>
                          +48 725 490 466
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 ${colors.bgLight} border-2 ${colors.borderLight} rounded-xl flex items-center justify-center`}>
                        <svg className={`w-7 h-7 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Email</h3>
                        <a href="mailto:pliki.boost-service@wp.pl" className={`${colors.text} hover:${colors.textStats} transition-colors text-sm sm:text-base font-medium break-all`}>
                          pliki.boost-service@wp.pl
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 ${colors.bgLight} border-2 ${colors.borderLight} rounded-xl flex items-center justify-center`}>
                        <svg className={`w-7 h-7 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Godziny Otwarcia</h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          Poniedziałek - Piątek: 8:00 - 16:00<br />
                          Sobota: Zamknięte<br />
                          Niedziela: Zamknięte
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Google Map */}
              <AnimatedSection direction="left" delay={200} className="h-full flex flex-col">
                <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full flex flex-col`}>
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      Lokalizacja <span className={colors.gradientText}>Warsztatu</span>
                    </h2>
                  </div>
                  <div className="relative w-full flex-1 min-h-[400px] sm:min-h-[500px]">
                    <iframe
                      src="https://www.google.com/maps?q=Stawowa+7,+63-600+Hanulin,+Poland&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full absolute inset-0"
                      title="Lokalizacja warsztatu - Stawowa 7, 63-600 Hanulin"
                    ></iframe>
                  </div>
                  <div className="p-6 sm:p-8 pt-4">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Stawowa+7,+63-600+Hanulin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 ${colors.text} hover:${colors.textStats} transition-colors text-sm sm:text-base`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Otwórz w Google Maps
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

