/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'church_site_language';
const SUPPORTED_LANGUAGES = ['en', 'am', 'om'];
const DEFAULT_LANGUAGE = 'en';

export const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'om', name: 'Afaan Oromo', nativeName: 'Afaan Oromoo' }
];

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY);
      if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        return savedLang;
      }
    } catch {
      // LocalStorage access might fail in private/restricted environments
    }
    return DEFAULT_LANGUAGE;
  });

  const setLanguage = useCallback((lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setCurrentLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // LocalStorage access error ignored
      }
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = currentLanguage;
    } catch {
      // Document modification ignored if running in non-DOM environment
    }
  }, [currentLanguage]);

  /**
   * Helper function to translate dot-notation keys (e.g., 'nav.home', 'hero.heading').
   * Gracefully falls back to English, and if still not found, returns the key itself.
   */
  const t = useCallback(
    (key) => {
      if (!key || typeof key !== 'string') {
        return key || '';
      }

      const keys = key.split('.');

      const getNestedValue = (obj) => {
        let current = obj;
        for (const k of keys) {
          if (current && typeof current === 'object' && k in current) {
            current = current[k];
          } else {
            return undefined;
          }
        }
        return current;
      };

      // 1. Try current language
      const currentTranslation = translations[currentLanguage];
      const result = currentTranslation ? getNestedValue(currentTranslation) : undefined;
      if (typeof result === 'string') {
        return result;
      }

      // 2. Fallback to English
      if (currentLanguage !== DEFAULT_LANGUAGE) {
        const fallbackTranslation = translations[DEFAULT_LANGUAGE];
        const fallbackResult = fallbackTranslation ? getNestedValue(fallbackTranslation) : undefined;
        if (typeof fallbackResult === 'string') {
          return fallbackResult;
        }
      }

      // 3. Graceful fallback: return the key itself
      return key;
    },
    [currentLanguage]
  );

  const contextValue = useMemo(
    () => ({
      currentLanguage,
      language: currentLanguage, // convenience alias
      setLanguage,
      t,
      languages: LANGUAGE_OPTIONS,
      translations
    }),
    [currentLanguage, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
