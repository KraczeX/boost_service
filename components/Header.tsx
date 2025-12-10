'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);

  const navItems = [
    { href: '/', label: 'Strona główna' },
    { href: '/chiptuning', label: 'Chiptuning' },
    { href: '/adblue', label: 'Usuwanie ADBLUE' },
    { href: '/usa-conversion', label: 'Konwersja USA' },
    { href: '/realizacje', label: 'Realizacje' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-32 h-20 md:w-40 md:h-24 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="BOOST Service Logo"
                width={160}
                height={96}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `${colors.bgActive} ${colors.text} border ${colors.borderLight}`
                      : `text-gray-300 ${colors.textHover} ${colors.bgHover}`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Contact & Social */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/kontakt"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === '/kontakt'
                  ? `${colors.bgActive} ${colors.text} border ${colors.borderLight}`
                  : `text-gray-300 ${colors.textHover} ${colors.bgHover}`
              }`}
            >
              Kontakt
            </Link>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-gray-300 ${colors.textHover} ${colors.bgHover} transition-all duration-200`}
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? `${colors.bgActive} ${colors.text} border ${colors.borderLight}`
                      : `text-gray-300 ${colors.textHover} ${colors.bgHover}`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/kontakt'
                  ? `${colors.bgActive} ${colors.text} border ${colors.borderLight}`
                  : `text-gray-300 ${colors.textHover} ${colors.bgHover}`
              }`}
            >
              Kontakt
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

