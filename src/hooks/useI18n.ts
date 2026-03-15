import { useState, useEffect } from 'react';
import { en } from '../locales/en';
import { zh } from '../locales/zh';

const STORAGE_KEY = 'gittrend_language';

export type Language = 'en' | 'zh';

export function useI18n() {
  const [locale, setLocale] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
    return navigator.language.startsWith('zh') ? 'zh' : 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = locale === 'zh' ? zh : en;

  return { locale, setLocale, t };
}
