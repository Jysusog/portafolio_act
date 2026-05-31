import './AboutSection.css';
import { useTranslation } from '../../contexts/I18nContext';

interface Credential {
  i18nKey: 'about.cred_unitec' | 'about.cred_oracle' | 'about.cred_cecyt';
  org: string;
  years: string;
}

const CREDENTIALS: Credential[] = [
  { i18nKey: 'about.cred_unitec', org: 'UNITEC', years: '2025 – 2029' },
  { i18nKey: 'about.cred_oracle', org: 'Oracle Next Education', years: '2023' },
  {
    i18nKey: 'about.cred_cecyt',
    org: 'CECyT 14 «Luis Enrique Erro Soler», IPN',
    years: '2019 – 2022',
  },
];

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section about">
      <div className="container">
        <span className="section-eyebrow">{t('about.eyebrow')}</span>
        <h2 className="section-title">{t('about.title')}</h2>

        <div className="about-layout">
          <aside className="about-side">
            <blockquote className="about-quote">
              <p>{t('about.quote')}</p>
              <footer className="mono">— {t('about.quote_attr')}</footer>
            </blockquote>

            <div className="about-now">
              <span className="about-now-label mono">{t('about.currently_label')}</span>
              <ul className="about-now-list">
                <li>
                  <span className="now-pin" data-kind="work" aria-hidden="true" />
                  <div>
                    <span className="now-role">{t('about.currently_role')}</span>
                    <span className="now-org">{t('about.currently_org')}</span>
                  </div>
                </li>
                <li>
                  <span className="now-pin" data-kind="study" aria-hidden="true" />
                  <div>
                    <span className="now-role">{t('about.currently_study')}</span>
                    <span className="now-org">{t('about.currently_study_org')}</span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          <article className="about-main">
            <p className="about-bio-lead">{t('about.bio_lead')}</p>
            <p>{t('about.bio_p1')}</p>
            <p>{t('about.bio_p2')}</p>
            <p className="about-bio-cta">{t('about.bio_p3')}</p>
          </article>
        </div>

        <div className="about-credentials">
          <span className="credentials-label mono">{t('about.credentials_label')}</span>
          <ul className="credentials-list">
            {CREDENTIALS.map((c) => (
              <li key={c.i18nKey} className="credential">
                <span className="credential-role">{t(c.i18nKey)}</span>
                <span className="credential-meta mono">
                  {c.org} <span className="credential-sep">·</span> {c.years}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
