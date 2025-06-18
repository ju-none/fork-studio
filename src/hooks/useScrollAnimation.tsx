import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
  options: UseScrollAnimationOptions = {}
): { ref: RefObject<T>; isVisible: boolean } => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    delay = 0
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          
          if (once) {
            observer.disconnect();
          }
        } else {
          if (!once) {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, once, delay]);

  return { ref: elementRef, isVisible };
};