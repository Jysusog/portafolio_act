import { useMemo, useState } from 'react';
import './FutureProjectsSection.css';
import ProjectCard from './ProjectCard';
import { PLANNED_PROJECTS, type ProjectCategory } from '../../data/projects';
import { useTranslation } from '../../contexts/I18nContext';

type Filter = 'all' | ProjectCategory;

const FILTERS: Filter[] = ['all', 'ml', 'nlp', 'dataviz', 'dashboard', 'automation'];

const FutureProjectsSection = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(() => {
    if (filter === 'all') return PLANNED_PROJECTS;
    return PLANNED_PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="future" className="section future">
      <div className="container">
        <span className="section-eyebrow">{t('future.eyebrow')}</span>
        <h2 className="section-title">{t('future.title')}</h2>
        <p className="section-lead">{t('future.lead')}</p>

        <div className="filter-bar" role="tablist" aria-label={t('future.title')}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-chip ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
              role="tab"
              aria-selected={filter === f}
            >
              {f === 'all' ? t('future.filter_all') : t(`future.filter.${f}`)}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureProjectsSection;
