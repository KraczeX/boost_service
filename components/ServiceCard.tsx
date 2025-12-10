'use client';

import Link from 'next/link';
import { memo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
}

function ServiceCard({ title, description, href, icon, gradient }: ServiceCardProps) {
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);
  
  return (
    <Link href={href} className="group block">
      <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 transition-all duration-500 ease-out hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-2xl">
        {/* Gradient Overlay on Hover */}
        <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`mb-6 w-16 h-16 ${gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-lg`}>
            <div className="text-white">
              {icon}
            </div>
          </div>

          {/* Content */}
          <h3 className={`text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:${colors.gradientText} transition-all duration-300`}>
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            {description}
          </p>

          {/* Arrow */}
          <div className={`flex items-center ${colors.text} group-hover:${colors.textStats} transition-colors`}>
            <span className="text-sm font-semibold mr-2">Dowiedz się więcej</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ServiceCard);



