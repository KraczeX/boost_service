'use client';

import { useState, memo, useCallback } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

const DEFAULT_FALLBACK = 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';

function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
  loading = 'lazy',
  width,
  height,
  fill,
  sizes,
  priority = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  }, [hasError, imgSrc, fallbackSrc]);

  // Use Next.js Image for better optimization
  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        onError={handleError}
        loading={loading}
        priority={priority}
        sizes={sizes || '100vw'}
        quality={75}
      />
    );
  }

  if (width && height) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        loading={loading}
        priority={priority}
        sizes={sizes}
        quality={75}
      />
    );
  }

  // Fallback to regular img for cases without dimensions
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      decoding="async"
    />
  );
}

export default memo(ImageWithFallback);

