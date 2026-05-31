import './HeroSection.css';
import ScatterRegressionCanvas from './ScatterRegressionCanvas';
import { useTranslation } from '../../contexts/I18nContext';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="hero">
      <div className="hero-canvas-wrap" aria-hidden="true">
        <ScatterRegressionCanvas />
        <div className="hero-canvas-fade" />
      </div>

      <div className="container hero-inner">
        <div className="hero-text">
          <span className="hero-eyebrow mono">{t('hero.eyebrow')}</span>
          <p className="hero-greeting">{t('hero.greeting')}</p>
          <h1 className="hero-name">{t('hero.name')}</h1>
          <p className="hero-title">{t('hero.title')}</p>
          <p className="hero-lead">{t('hero.lead')}</p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value mono">{t('hero.stats.experience_value')}</span>
              <span className="stat-label">{t('hero.stats.experience_label')}</span>
            </div>
            <div className="stat">
              <span className="stat-value mono">{t('hero.stats.projects_value')}</span>
              <span className="stat-label">{t('hero.stats.projects_label')}</span>
            </div>
            <div className="stat">
              <span className="stat-value mono">{t('hero.stats.focus_value')}</span>
              <span className="stat-label">{t('hero.stats.focus_label')}</span>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#future" className="btn btn-primary">
              {t('hero.cta_primary')}
            </a>
            <a href="#contact" className="btn btn-ghost">
              {t('hero.cta_secondary')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
