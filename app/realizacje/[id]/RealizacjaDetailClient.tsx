'use client';

import AnimatedSection from '@/components/AnimatedSection';
import ImageGallery from '@/components/ImageGallery';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';
import Link from 'next/link';
import type { Realizacja } from '@/utils/realizacje';

interface RealizacjaDetailClientProps {
  realizacja: Realizacja;
}

export default function RealizacjaDetailClient({ realizacja }: RealizacjaDetailClientProps) {
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);

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
  );
}

