import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect when an element enters the viewport
 * Used for scroll-triggered animations
 */
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  const { threshold = 0.1, root = null, rootMargin = '0px' } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once visible, stop observing (animate only once)
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, root, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, root, rootMargin]);

  return [ref, isInView];
}

/**
 * Hook to manage document title
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    const isAm = document.documentElement.lang === 'am';
    const defaultSuffix = isAm
      ? 'የቅድስት ማርያም ቤተ ክርስቲያን'
      : 'St. Mary Ethiopian Orthodox Tewahedo Church';
    document.title = title
      ? `${title} | ${defaultSuffix}`
      : `${defaultSuffix} | Ketabero`;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}

/**
 * Hook to copy text to clipboard
 */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return true;
    } catch {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return true;
      } catch {
        return false;
      }
    }
  };

  return { copied, copy };
}
