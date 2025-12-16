'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageWithFallback from './ImageWithFallback';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft' && selectedIndex !== null && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === 'ArrowRight' && selectedIndex !== null && selectedIndex < images.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedIndex, images.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main featured image - always full width at top */}
        <div
          className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gray-900 border-2 border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl hover:shadow-3xl"
          onClick={() => openLightbox(0)}
        >
          <div className="relative h-[250px] sm:h-[350px] md:h-[500px] lg:h-[550px]">
            <ImageWithFallback
              src={images[0]}
              alt={`${title} - zdjęcie główne`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90 transition-all duration-300">
                <div className="bg-white/90 backdrop-blur-md rounded-full p-3 sm:p-5 shadow-xl">
                  <svg className="w-6 h-6 sm:w-10 sm:h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Image counter badge - always visible */}
            {images.length > 1 && (
              <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-black/80 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 shadow-lg">
                1 / {images.length}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail grid - always in a consistent grid layout below */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.slice(1).map((image, index) => (
              <div
                key={index + 1}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-900 border-2 border-white/10 hover:border-white/40 transition-all duration-300 aspect-square shadow-lg hover:shadow-2xl hover:-translate-y-1"
                onClick={() => openLightbox(index + 1)}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${title} - zdjęcie ${index + 2}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading="lazy"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-md rounded-full p-2 sm:p-3 shadow-lg">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Image number badge */}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                  {index + 2}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Zamknij"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              {selectedIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-4 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Poprzednie zdjęcie"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {selectedIndex < images.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-4 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Następne zdjęcie"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </>
          )}

          {/* Image container */}
          <div
            className="relative max-w-7xl max-h-[85vh] sm:max-h-[90vh] w-full h-full flex items-center justify-center px-2 sm:px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[selectedIndex]}
                alt={`${title} - zdjęcie ${selectedIndex + 1}`}
                fill
                className="object-contain"
                quality={95}
                priority
                sizes="100vw"
              />
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

