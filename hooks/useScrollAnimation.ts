'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const defaultOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

export function useScrollAnimation(options?: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
      // Unobserve after first intersection for better performance
      if (observerRef.current && ref.current) {
        observerRef.current.unobserve(ref.current);
      }
    }
  }, []);

  useEffect(() => {
    const observerOptions = { ...defaultOptions, ...options };
    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);

    const currentRef = ref.current;
    if (currentRef && observerRef.current) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [handleIntersection, options]);

  return { ref, isVisible };
}

