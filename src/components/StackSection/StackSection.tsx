import './StackSection.css';
import { useTranslation } from '../../contexts/I18nContext';
import { STACK, type StackItem } from '../../data/projects';

const CATEGORIES: StackItem['category'][] = ['lang', 'data', 'bi', 'tools'];

const StackSection = () => {
  const { t } = useTranslation();

  return (
    <section id="stack" className="section stack">
      <div className="container">
        <span className="section-eyebrow">{t('stack.eyebrow')}</span>
        <h2 className="section-title">{t('stack.title')}</h2>
        <p className="section-lead">{t('stack.lead')}</p>

        <div className="stack-legend mono">
          <span className="legend-item">
            <span className="level-bar" data-level="learning" />
            {t('stack.level.learning')}
          </span>
          <span className="legend-item">
            <span className="level-bar" data-level="intermediate" />
            {t('stack.level.intermediate')}
          </span>
          <span className="legend-item">
            <span className="level-bar" data-level="solid" />
            {t('stack.level.solid')}
          </span>
        </div>

        <div className="stack-grid">
          {CATEGORIES.map((cat) => {
            const items = STACK.filter((s) => s.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} className="stack-group">
                <h3 className="stack-group-title">{t(`stack.category.${cat}`)}</h3>
                <ul className="stack-list">
                  {items.map((item) => (
                    <li key={item.name} className="stack-row">
                      <span className="stack-name mono">{item.name}</span>
                      <span
                        className="stack-level"
                        data-level={item.level}
                        aria-label={t(`stack.level.${item.level}`)}
                      >
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
