'use client';

import { useMemo } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AnimatedSection from '@/components/AnimatedSection';
import dynamic from 'next/dynamic';
import ServiceCard from '@/components/ServiceCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

// Lazy load Footer - not critical for initial render
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
});

export default function Home() {
  const { themeColor } = useTheme();
  const colors = useMemo(() => getThemeColors(themeColor), [themeColor]);
  
  // Memoize static data
  const servicesData = useMemo(() => [
    {
      title: "Chiptuning",
      description: "Zwiększ moc i moment obrotowy silnika poprzez optymalizację oprogramowania ECU. Bezpieczne i profesjonalne rozwiązania dla wszystkich marek.",
      href: "/chiptuning",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21h6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18" />
        </svg>
      ),
      gradient: `bg-gradient-to-br ${colors.gradientReverse}`
    },
    {
      title: "Usuwanie ADBLUE",
      description: "Kompleksowe usuwanie systemu AdBlue z zachowaniem pełnej funkcjonalności pojazdu. Profesjonalna diagnostyka i modyfikacja oprogramowania.",
      href: "/adblue",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      gradient: `bg-gradient-to-br ${colors.gradient}`
    },
    {
      title: "Konwersja USA",
      description: "Pełna konwersja pojazdów z rynku amerykańskiego na standardy europejskie. Oświetlenie, prędkościomierze, homologacja i legalizacja.",
      href: "/usa-conversion",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
      ),
      gradient: `bg-gradient-to-br ${colors.gradientAlt}`
    }
  ], [colors]);

  const processSteps = useMemo(() => [
    {
      step: '01',
      title: 'Konsultacja',
      description: 'Omawiamy Twoje potrzeby i możliwości pojazdu',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      step: '02',
      title: 'Diagnostyka',
      description: 'Kompleksowa analiza pojazdu i jego parametrów',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      step: '03',
      title: 'Realizacja',
      description: 'Profesjonalne wykonanie usługi z pełną dokumentacją',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      step: '04',
      title: 'Gotowe',
      description: 'Przekazanie pojazdu z gwarancją i pełnym wsparciem',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ], []);

  const realizacjeData = useMemo(() => [
    {
      id: 'bmw-m240i-chiptuning',
      title: 'BMW M240i G42 3.0T - Chiptuning Stage 1.5',
      shortDescription: 'Zwiększenie mocy z 374 KM do 467 KM i momentu obrotowego z 500 Nm do 623 Nm',
      image: '/realizacje/bmw2/547738055_1456975303102507_1850151271145226443_n.jpg',
      category: 'Chiptuning'
    },
    {
      id: 'bmw-m2-competition-usa',
      title: 'BMW M2 Competition F87 - Konwersja USA',
      shortDescription: 'Kompleksowa konwersja z rynku amerykańskiego na standardy europejskie',
      image: '/realizacje/bmw/592370304_1533717815428255_7148405695979271444_n.jpg',
      category: 'Konwersja USA'
    },
    {
      id: 'audi-q7-chiptuning',
      title: 'Audi Q7 4M FL 45TDI DPXB - Chiptuning',
      shortDescription: 'Zwiększenie mocy z 231 KM do 310 KM i momentu obrotowego z 501 Nm do 619 Nm',
      image: '/realizacje/audi/597400476_1543945244405512_4053870336900835956_n.jpg',
      category: 'Chiptuning'
    }
  ], []);
  
  return (
    <>
      <Header />
      <main>
        <Hero />
        
        {/* Services Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Nasze <span className={colors.gradientText}>Usługi</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Profesjonalne rozwiązania dla Twojego pojazdu
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {servicesData.map((service, index) => (
                <AnimatedSection key={service.href} delay={(index + 1) * 100}>
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    href={service.href}
                    icon={service.icon}
                    gradient={service.gradient}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Jak <span className={colors.gradientText}>Działamy?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Prosty i przejrzysty proces realizacji Twojego projektu
              </p>
            </AnimatedSection>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {processSteps.map((item, index) => (
                  <AnimatedSection key={index} delay={index * 150} direction="up">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:scale-105 transition-all duration-300 h-full flex flex-col items-center text-center group relative overflow-hidden">
                      {/* Background gradient on hover */}
                      <div className={`absolute inset-0 ${colors.bgLight} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      
                      {/* Icon */}
                      <div className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 ${colors.bgLight} border-2 ${colors.borderLight} rounded-xl flex items-center justify-center ${colors.text} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      
                      {/* Step number */}
                      <div className="relative z-10 mb-3">
                        <span className={`text-3xl sm:text-4xl font-black ${colors.bgLight} opacity-80`}>{item.step}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className={`absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 ${colors.bgLight} opacity-10 rounded-full blur-3xl`}></div>
            <div className={`absolute bottom-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 ${colors.bg} opacity-10 rounded-full blur-3xl`}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left side - Image/Visual */}
              <AnimatedSection direction="right" delay={100} className="relative order-2 lg:order-1">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-white/10">
                  <ImageWithFallback
                    src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                    alt="Nasz zespół"
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
                    O Nas
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  <span className="block">Doświadczenie</span>
                  <span className={`block ${colors.textBold}`}>i Pasja</span>
                </h2>
                
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Jesteśmy zespołem pasjonatów motoryzacji z wieloletnim doświadczeniem w branży tuningowej. 
                  Specjalizujemy się w profesjonalnym chiptuningu, usuwaniu systemów AdBlue oraz kompleksowej 
                  konwersji pojazdów z rynku amerykańskiego.
                </p>
                
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Nasza misja to dostarczanie najwyższej jakości usług, które zwiększają wydajność i satysfakcję 
                  z użytkowania pojazdu, przy zachowaniu pełnego bezpieczeństwa i niezawodności.
                </p>

                {/* Key Points */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
                  <div className={`border-l-2 ${colors.border} pl-2 sm:pl-4`}>
                    <div className={`text-2xl sm:text-3xl font-bold ${colors.textStats}`}>10+</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1">Lat doświadczenia</div>
                  </div>
                  <div className={`border-l-2 ${colors.border} pl-2 sm:pl-4`}>
                    <div className={`text-2xl sm:text-3xl font-bold ${colors.textStats}`}>500+</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1">Zrealizowanych projektów</div>
                  </div>
                  <div className={`border-l-2 ${colors.border} pl-2 sm:pl-4`}>
                    <div className={`text-2xl sm:text-3xl font-bold ${colors.textStats}`}>100%</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1">Zadowolonych klientów</div>
                  </div>
                  <div className={`border-l-2 ${colors.border} pl-2 sm:pl-4`}>
                    <div className={`text-2xl sm:text-3xl font-bold ${colors.textStats}`}>24/7</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1">Wsparcie techniczne</div>
                  </div>
                </div>

                {/* Values */}
                <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                  <h3 className={`text-xl sm:text-2xl font-bold text-white ${colors.gradientText}`}>
                    Nasze Wartości
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      'Profesjonalizm i precyzja w każdym projekcie',
                      'Bezpieczeństwo i niezawodność na pierwszym miejscu',
                      'Indywidualne podejście do każdego klienta',
                      'Najnowsze technologie i narzędzia diagnostyczne'
                    ].map((value, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.textStats} flex-shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <AnimatedSection delay={100} className="text-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br ${colors.gradientReverse} rounded-full flex items-center justify-center`}>
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Profesjonalizm</h3>
                <p className="text-sm sm:text-base text-gray-400">Doświadczony zespół z wieloletnim doświadczeniem w branży</p>
              </AnimatedSection>

              <AnimatedSection delay={200} className="text-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center`}>
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Szybka Realizacja</h3>
                <p className="text-sm sm:text-base text-gray-400">Efektywna praca bez zbędnych opóźnień</p>
              </AnimatedSection>

              <AnimatedSection delay={300} className="text-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br ${colors.gradientAlt} rounded-full flex items-center justify-center`}>
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Gwarancja Jakości</h3>
                <p className="text-sm sm:text-base text-gray-400">Pełna gwarancja na wszystkie wykonane usługi</p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
          {/* Accent lines */}
          <div className="absolute inset-0">
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colors.accentLine} opacity-40`}></div>
            <div className={`absolute top-0 right-0 w-1 h-full bg-gradient-to-b ${colors.accentLine} opacity-40`}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
              {/* Left side - Text content */}
              <AnimatedSection direction="right" delay={100} className="space-y-6 sm:space-y-8">
                <div className="inline-block">
                  <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4`}>
                    Dlaczego My?
                  </span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight sm:leading-none">
                  <span className="block">Doświadczenie</span>
                  <span className={`block ${colors.textBold}`}>i Profesjonalizm</span>
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
                  Jesteśmy ekspertami w dziedzinie tuningowania pojazdów. Nasz zespół łączy 
                  wieloletnie doświadczenie z najnowszymi technologiami, zapewniając 
                  najwyższą jakość usług.
                </p>

                {/* Features list with larger icons */}
                <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
                  {[
                    { text: 'Certyfikowani specjaliści z branży motoryzacyjnej' },
                    { text: 'Najnowsze narzędzia diagnostyczne i oprogramowanie' },
                    { text: 'Indywidualne podejście do każdego projektu' },
                    { text: 'Pełna dokumentacja i gwarancja na wszystkie usługi' }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-start gap-3 sm:gap-4 border-l-2 ${colors.borderLight} pl-4 sm:pl-6 hover:border-opacity-60 transition-colors`}>
                      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 ${colors.bgLight} border-2 ${colors.frameBorder} flex items-center justify-center mt-0.5`}>
                        <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-300 pt-0.5 sm:pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Right side - Large statistics */}
              <AnimatedSection direction="left" delay={200} className="relative flex items-start">
                {/* Main stats container */}
                <div className="relative w-full">
                  {/* Outer frame */}
                  <div className={`absolute inset-0 border-4 ${colors.frameBorder} transform rotate-2`}></div>
                  <div className={`absolute inset-4 border-2 ${colors.frameBorderLight} transform -rotate-1`}></div>
                  
                  {/* Content - aligned to top */}
                  <div className={`relative bg-black border-2 ${colors.frameBorderLight} p-6 sm:p-8 md:p-12`}>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      {[
                        { 
                          number: '500+', 
                          label: 'Projektów', 
                          icon: (
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )
                        },
                        { 
                          number: '10+', 
                          label: 'Lat Doświadczenia', 
                          icon: (
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )
                        },
                        { 
                          number: '100%', 
                          label: 'Zadowolonych', 
                          icon: (
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                          )
                        },
                        { 
                          number: '24/7', 
                          label: 'Wsparcie', 
                          icon: (
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          )
                        }
                      ].map((stat, index) => (
                        <div key={index} className={`${colors.bgHover} border-2 ${colors.frameBorderLight} p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center hover:opacity-80 hover:border-opacity-60 transition-all duration-300 group`}>
                          <div className={`${colors.text} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            {stat.icon}
                          </div>
                          <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2">{stat.number}</div>
                          <div className="text-xs sm:text-sm md:text-base text-gray-400 font-semibold uppercase tracking-wide">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Latest Realizations Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12">
              <div>
                <span className={`${colors.textBadge} text-xs sm:text-sm font-semibold uppercase tracking-wider border-l-4 ${colors.borderBadge} pl-3 sm:pl-4 inline-block mb-3 sm:mb-4`}>
                  Nasze Realizacje
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  Ostatnie <span className={colors.textBold}>Projekty</span>
                </h2>
              </div>
              <Link
                href="/realizacje"
                className={`hidden md:flex items-center gap-2 ${colors.text} hover:opacity-80 transition-opacity font-semibold mt-4 sm:mt-0`}
              >
                Zobacz wszystkie
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {realizacjeData.map((realizacja, index) => (
                <AnimatedSection key={realizacja.id} delay={index * 100} direction="up">
                  <Link
                    href={`/realizacje/${realizacja.id}`}
                    className="group block"
                    prefetch={false}
                  >
                  <div className={`relative h-48 sm:h-56 md:h-64 overflow-hidden mb-3 sm:mb-4 border-2 ${colors.frameBorderLight} hover:border-opacity-60 transition-all duration-300`}>
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
                      <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 ${colors.badge} backdrop-blur-sm text-white text-xs font-semibold mb-2`}>
                        {realizacja.category}
                      </span>
                      <h3 className="text-white font-bold text-base sm:text-lg">{realizacja.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {realizacja.shortDescription}
                  </p>
                  <div className={`mt-3 sm:mt-4 flex items-center ${colors.text} group-hover:opacity-80 transition-opacity`}>
                    <span className="text-xs sm:text-sm font-semibold mr-2">Zobacz szczegóły</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/realizacje"
                className={`inline-flex items-center gap-2 ${colors.text} hover:opacity-80 transition-opacity font-semibold`}
                prefetch={true}
              >
                Zobacz wszystkie realizacje
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
        </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="fade" delay={100} className="max-w-4xl mx-auto text-center px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Gotowy na <span className={colors.gradientText}>Zwiększenie Mocy?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Skontaktuj się z nami już dziś i umów bezpłatną konsultację. 
                Nasi specjaliści doradzą najlepsze rozwiązanie dla Twojego pojazdu.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base ${colors.bgButton} text-white font-bold rounded-none border-2 ${colors.borderButton} ${colors.bgButtonHover} ${colors.borderButtonHover} transition-all duration-300 text-center`}
                  prefetch={true}
                >
                  Skontaktuj się
                </Link>
                <Link
                  href="/realizacje"
                  className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-transparent text-white font-bold rounded-none border-2 border-white/30 ${colors.borderHover} ${colors.textHover} transition-all duration-300 text-center`}
                  prefetch={true}
                >
                  Zobacz Realizacje
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
