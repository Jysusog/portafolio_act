import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts/I18nContext';
import type { PlannedProject } from '../../data/projects';
import ProjectThumbnail from './ProjectThumbnail';
import './ProjectModal.css';

interface Props {
  project: PlannedProject;
  onClose: () => void;
}

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const ProjectModal = ({ project, onClose }: Props) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLAnchorElement>(null);
  const triggerEl = useRef<HTMLElement | null>(
    typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null,
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    previewRef.current?.focus();

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      triggerEl.current?.focus?.();
    };
  }, [onClose]);

  const base = project.i18nKey;
  const hasRepo = !!project.github;

  const onBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onBackdrop}>
      <div
        ref={dialogRef}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className="modal-close icon-btn"
          onClick={onClose}
          aria-label={t('future.modal.close')}
        >
          <CloseIcon />
        </button>

        <div className="modal-hero">
          <ProjectThumbnail seed={project.id} variant={project.thumbnailVariant} height={220} />
        </div>

        <div className="modal-body">
          <div className="modal-meta">
            <span className="status-badge" data-status={project.status}>
              <span className="status-dot" />
              {t(`future.status.${project.status}`)}
            </span>
            <span className="category-tag mono">{t(`future.filter.${project.category}`)}</span>
          </div>

          <h2 id="modal-title" className="modal-title">
            {t(`${base}.title`)}
          </h2>
          <p className="modal-long">{t(`${base}.long`)}</p>

          <div className="modal-grid">
            <div className="modal-grid-row">
              <span className="mono modal-grid-label">{t('future.goal_label')}</span>
              <span className="mono modal-grid-value">{t(`${base}.goal`)}</span>
            </div>
            <div className="modal-grid-row">
              <span className="mono modal-grid-label">{t('future.stack_label')}</span>
              <div className="stack-tags">
                {project.stack.map((s) => (
                  <span key={s} className="stack-tag mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-cta">
            <Link
              ref={previewRef}
              to={`/proyectos/${project.slug}`}
              className="btn btn-primary"
              onClick={onClose}
            >
              {t('future.modal.preview')} <ArrowIcon />
            </Link>
            {hasRepo ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <GithubIcon /> {t('future.modal.repo')}
              </a>
            ) : (
              <span className="btn btn-ghost is-disabled" aria-disabled="true">
                <GithubIcon /> {t('future.modal.no_repo')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProjectModal;
