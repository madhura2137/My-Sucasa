
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import mr from '@/locales/mr.json';
import te from '@/locales/te.json';

type Language = 'en' | 'hi' | 'mr' | 'te';

const translations = { en, hi, mr, te };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'hi', 'mr', 'te'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    
    const findTranslation = (lang: Language): string | null => {
      let result: any = translations[lang];
      for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
          return null; // Not found in this language
        }
      }
      // If the final result is an object, it's not a valid translation string.
      if (typeof result === 'object' && result !== null) {
        return null;
      }
      return result;
    }

    // 1. Try the current language
    let translation = findTranslation(language);
    if (translation !== null) {
      return translation;
    }

    // 2. Fallback to English
    if (language !== 'en') {
      translation = findTranslation('en');
      if (translation !== null) {
        return translation;
      }
    }
    
    // 3. If still not found or invalid, return the original key
    return key;
  }, [language]);
  

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
