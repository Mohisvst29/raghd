"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/locales/en';
import { ar } from '@/locales/ar';

type Language = 'ar' | 'en';
type Dictionary = typeof ar;

interface LanguageContextType {
  lang: Language;
  t: Dictionary;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      if (lang === 'en') {
        document.body.classList.add('font-sans');
      } else {
        document.body.classList.remove('font-sans');
      }
    }
  }, [lang, mounted]);

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('language', newLang);
  };

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ lang, t: lang === 'ar' ? ar : en, toggleLanguage }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={lang === 'en' ? 'font-sans' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
