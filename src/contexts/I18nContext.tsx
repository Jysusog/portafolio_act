import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import es from '../i18n/locales/es.json';
import en from '../i18n/locales/en.json';
import zh from '../i18n/locales/zh.json';
import {
  LOCALES,
  LOCALE_HTML_TAG,
  type Locale,
  type Translations,
} from '../i18n/types';

const DICTIONARIES: Record<Locale, Translations> = {
  es: es as Translations,
  en: en as Translations,
  zh: zh as Translations,
};

const STORAGE_KEY = 'portfolio.lang';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

const detectInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && LOCALES.includes(stored)) return stored;
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('en')) return 'en';
  if (nav.startsWith('es')) return 'es';
  return 'es';
};

const lookup = (dict: Translations, key: string): unknown => {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_TAG[locale];
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const value = lookup(DICTIONARIES[locale], key);
      if (typeof value === 'string') return value;
      const fallback = lookup(DICTIONARIES.es, key);
      return typeof fallback === 'string' ? fallback : key;
    },
    [locale],
  );

  const tArray = useCallback(
    (key: string): string[] => {
      const value = lookup(DICTIONARIES[locale], key);
      if (Array.isArray(value)) return value as string[];
      const fallback = lookup(DICTIONARIES.es, key);
      return Array.isArray(fallback) ? (fallback as string[]) : [];
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, tArray }),
    [locale, setLocale, t, tArray],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used inside I18nProvider');
  return ctx;
};
