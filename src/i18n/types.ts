import es from './locales/es.json';

export type Locale = 'es' | 'en' | 'zh';

export const LOCALES: Locale[] = ['es', 'en', 'zh'];

export const LOCALE_LABEL: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  zh: '中文',
};

export const LOCALE_HTML_TAG: Record<Locale, string> = {
  es: 'es',
  en: 'en',
  zh: 'zh-CN',
};

export type Translations = typeof es;
