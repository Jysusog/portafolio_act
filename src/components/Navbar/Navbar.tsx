import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../../contexts/I18nContext';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setIsOpen(false);

  const anchor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const links = [
    { href: anchor('home'), label: t('nav.home') },
    { href: anchor('about'), label: t('nav.about') },
    { href: anchor('stack'), label: t('nav.stack') },
    { href: anchor('future'), label: t('nav.future') },
    { href: anchor('timeline'), label: t('nav.timeline') },
    { href: anchor('contact'), label: t('nav.contact') },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">JM</span>
          <span className="brand-text">Jesús&nbsp;Martínez</span>
        </Link>

        <ul className={`nav-links ${isOpen ? 'is-open' : ''}`} id="primary-nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link to={link.href} onClick={close}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className={`hamburger ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? t('nav.menu_close') : t('nav.menu_open')}
            aria-expanded={isOpen}
            aria-controls="primary-nav-links"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
