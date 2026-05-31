import './ContactSection.css';
import { useTranslation } from '../../contexts/I18nContext';

const WHATSAPP = '525576141489';
const EMAIL = 'jesusavg2317@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/jesus-ml';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

const ContactSection = () => {
  const { t } = useTranslation();

  const channels = [
    {
      key: 'whatsapp',
      href: `https://wa.me/${WHATSAPP}`,
      external: true,
      title: t('contact.whatsapp_title'),
      subtitle: t('contact.whatsapp_subtitle'),
      handle: `+${WHATSAPP.slice(0, 2)} ${WHATSAPP.slice(2, 4)} ${WHATSAPP.slice(4, 8)} ${WHATSAPP.slice(8)}`,
    },
    {
      key: 'email',
      href: `mailto:${EMAIL}`,
      external: false,
      title: t('contact.email_title'),
      subtitle: t('contact.email_subtitle'),
      handle: EMAIL,
    },
    {
      key: 'linkedin',
      href: LINKEDIN,
      external: true,
      title: t('contact.linkedin_title'),
      subtitle: t('contact.linkedin_subtitle'),
      handle: 'in/jesus-ml',
    },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <span className="section-eyebrow">{t('contact.eyebrow')}</span>
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-lead">{t('contact.lead')}</p>

        <ul className="contact-list">
          {channels.map((c) => (
            <li key={c.key}>
              <a
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="contact-row"
                aria-label={`${c.title}: ${c.handle}`}
              >
                <div className="contact-row-main">
                  <span className="contact-row-title">{c.title}</span>
                  <span className="contact-row-sub mono">{c.handle}</span>
                </div>
                <span className="contact-row-side">
                  <span className="contact-row-tag">{c.subtitle}</span>
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="contact-note">{t('contact.footer_note')}</p>
      </div>
    </section>
  );
};

export default ContactSection;
