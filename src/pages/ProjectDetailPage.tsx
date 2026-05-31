import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProjectDetailPage.css';
import { findProjectBySlug, PLANNED_PROJECTS } from '../data/projects';
import { useTranslation } from '../contexts/I18nContext';
import ProjectThumbnail from '../components/common/ProjectThumbnail';

const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const ProjectDetailPage = () => {
  const { slug = '' } = useParams();
  const project = findProjectBySlug(slug);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!project) {
    return (
      <section className="section project-detail">
        <div className="container">
          <h1 className="section-title">{t('project_page.not_found_title')}</h1>
          <p className="section-lead">{t('project_page.not_found_body')}</p>
          <Link to="/" className="btn btn-primary">
            <BackIcon /> {t('project_page.not_found_cta')}
          </Link>
        </div>
      </section>
    );
  }

  const base = project.i18nKey;
  const related = PLANNED_PROJECTS.filter(
    (p) => p.category === project.category && p.id !== project.id,
  ).slice(0, 3);

  const sections: Array<'problem' | 'data' | 'approach' | 'results' | 'next'> = [
    'problem',
    'data',
    'approach',
    'results',
    'next',
  ];

  return (
    <article className="project-detail">
      <div className="container">
        <Link to="/#future" className="back-link mono">
          <BackIcon /> {t('project_page.back')}
        </Link>

        <header className="project-detail-head">
          <div className="project-detail-meta">
            <span className="status-badge" data-status={project.status}>
              <span className="status-dot" />
              {t(`future.status.${project.status}`)}
            </span>
            <span className="category-tag mono">{t(`future.filter.${project.category}`)}</span>
          </div>
          <h1 className="project-detail-title">{t(`${base}.title`)}</h1>
          <p className="project-detail-long">{t(`${base}.long`)}</p>
        </header>

        <div className="project-detail-hero">
          <ProjectThumbnail seed={project.id} variant={project.thumbnailVariant} height={360} />
        </div>

        <aside className="project-detail-grid">
          <div className="meta-card">
            <span className="meta-card-label mono">{t('project_page.meta.status')}</span>
            <span className="meta-card-value">{t(`future.status.${project.status}`)}</span>
          </div>
          <div className="meta-card">
            <span className="meta-card-label mono">{t('project_page.meta.category')}</span>
            <span className="meta-card-value">{t(`future.filter.${project.category}`)}</span>
          </div>
          <div className="meta-card">
            <span className="meta-card-label mono">{t('project_page.meta.goal')}</span>
            <span className="meta-card-value mono">{t(`${base}.goal`)}</span>
          </div>
          <div className="meta-card meta-card-stack">
            <span className="meta-card-label mono">{t('project_page.meta.stack')}</span>
            <div className="stack-tags">
              {project.stack.map((s) => (
                <span key={s} className="stack-tag mono">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div className="project-detail-sections">
          {sections.map((sec) => (
            <section key={sec} className="detail-section">
              <h2 className="detail-section-title">{t(`project_page.section.${sec}`)}</h2>
              <p className="detail-section-body">{t(`${base}.detail.${sec}`)}</p>
            </section>
          ))}
        </div>

        <footer className="project-detail-foot">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <GithubIcon /> {t('project_page.repo_cta')}
            </a>
          ) : (
            <span className="btn btn-ghost is-disabled" aria-disabled="true">
              <GithubIcon /> {t('project_page.no_repo')}
            </span>
          )}
          <p className="wip-note">{t('project_page.wip_note')}</p>
        </footer>

        {related.length > 0 && (
          <section className="related">
            <h2 className="related-title">{t('project_page.related')}</h2>
            <ul className="related-list">
              {related.map((r) => (
                <li key={r.id}>
                  <Link to={`/proyectos/${r.slug}`} className="related-link">
                    <span className="related-link-title">{t(`${r.i18nKey}.title`)}</span>
                    <span className="related-link-cat mono">
                      {t(`future.filter.${r.category}`)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
};

export default ProjectDetailPage;
