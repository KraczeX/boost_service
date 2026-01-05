'use client';

import AnimatedSection from '@/components/AnimatedSection';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';
import type { Realizacja } from '@/utils/realizacje';

interface ChiptuningClientProps {
  realizacje: Realizacja[];
}

export default function ChiptuningClient({ realizacje }: ChiptuningClientProps) {
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);
  
  const chiptuningRealizacje = realizacje.filter(r => r.category === 'Chiptuning');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {chiptuningRealizacje.length > 0 ? (
        chiptuningRealizacje.map((realizacja, index) => (
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
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-400 text-base sm:text-lg">
            Wkrótce pojawią się tutaj realizacje związane z chiptuningiem
          </p>
        </div>
      )}
    </div>
  );
}

