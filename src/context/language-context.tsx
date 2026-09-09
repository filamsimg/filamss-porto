'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries, Language, DictionaryKey } from '@/lib/dictionaries';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: DictionaryKey) => string;
  getRawDictionary: () => (typeof dictionaries)[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('id');
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate language preference from localStorage, default is Indonesian ('id')
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('portfolio_lang') as Language;
      if (savedLang === 'id' || savedLang === 'en') {
        setLangState(savedLang);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = savedLang;
        }
      } else {
        setLangState('id');
        localStorage.setItem('portfolio_lang', 'id');
        if (typeof document !== 'undefined') {
          document.documentElement.lang = 'id';
        }
      }
    } catch {
      // Ignore storage access error
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('portfolio_lang', newLang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }
    } catch {
      // Ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'id' : 'en');
  };

  const t = (key: DictionaryKey): string => {
    const dict = dictionaries[lang] || dictionaries.en;
    const value = dict[key];
    if (typeof value === 'string') return value;
    // Fallback to English
    const fallbackValue = dictionaries.en[key];
    return typeof fallbackValue === 'string' ? fallbackValue : String(key);
  };

  const getRawDictionary = () => {
    return dictionaries[lang] || dictionaries.en;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, getRawDictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
