import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../contexts/I18nContext';
import { LOCALES, LOCALE_LABEL, type Locale } from '../../i18n/types';

const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const choose = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        type="button"
        className="icon-btn lang-btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
        </svg>
        <span className="lang-current">{LOCALE_LABEL[locale]}</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label={t('nav.language')}>
          {LOCALES.map((l) => (
            <li key={l}>
              <button
                type="button"
                className={`lang-option ${l === locale ? 'is-active' : ''}`}
                onClick={() => choose(l)}
                role="option"
                aria-selected={l === locale}
              >
                {LOCALE_LABEL[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
