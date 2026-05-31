import { useState } from 'react';
import { useTranslation } from '../../contexts/I18nContext';
import type { PlannedProject } from '../../data/projects';
import ProjectThumbnail from '../common/ProjectThumbnail';
import ProjectModal from '../common/ProjectModal';

interface Props {
  project: PlannedProject;
}

const ProjectCard = ({ project }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const base = project.i18nKey;
  const label = t('future.open_details');

  return (
    <>
      <button
        type="button"
        className="project-card"
        onClick={() => setOpen(true)}
        aria-label={`${t(`${base}.title`)} — ${label}`}
      >
        <ProjectThumbnail seed={project.id} variant={project.thumbnailVariant} height={140} />

        <header className="project-card-head">
          <span className="status-badge" data-status={project.status}>
            <span className="status-dot" />
            {t(`future.status.${project.status}`)}
          </span>
          <span className="category-tag mono">{t(`future.filter.${project.category}`)}</span>
        </header>

        <h3 className="project-card-title">{t(`${base}.title`)}</h3>
        <p className="project-card-desc">{t(`${base}.description`)}</p>

        <div className="project-card-meta">
          <div className="meta-row">
            <span className="meta-label mono">{t('future.goal_label')}</span>
            <span className="meta-value mono">{t(`${base}.goal`)}</span>
          </div>
          <div className="meta-row">
            <span className="meta-label mono">{t('future.stack_label')}</span>
            <div className="stack-tags">
              {project.stack.slice(0, 3).map((s) => (
                <span key={s} className="stack-tag mono">
                  {s}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="stack-tag mono">+{project.stack.length - 3}</span>
              )}
            </div>
          </div>
        </div>

        <span className="card-hint mono">{label} →</span>
      </button>

      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
};

export default ProjectCard;
