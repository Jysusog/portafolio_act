import './TimelineSection.css';
import { useTranslation } from '../../contexts/I18nContext';

interface TimelineEvent {
  id: string;
  year: string;
  type: 'work' | 'education';
  i18nKey: string;
}

const EVENTS: TimelineEvent[] = [
  { id: 'comagua', year: '2025 — Act.', type: 'work', i18nKey: 'timeline.events.comagua' },
  { id: 'unitec_cd', year: '2025 – 2029', type: 'education', i18nKey: 'timeline.events.unitec_cd' },
  { id: 'imss', year: '2024 – 2025', type: 'work', i18nKey: 'timeline.events.imss' },
  { id: 'imagen_it', year: '2023 – 2024', type: 'work', i18nKey: 'timeline.events.imagen_it' },
  { id: 'oracle_one', year: '2023', type: 'education', i18nKey: 'timeline.events.oracle_one' },
  { id: 'eks_oracle', year: '2022 – 2023', type: 'work', i18nKey: 'timeline.events.eks_oracle' },
  { id: 'cecyt', year: '2019 – 2022', type: 'education', i18nKey: 'timeline.events.cecyt' },
];

const TimelineSection = () => {
  const { t } = useTranslation();

  return (
    <section id="timeline" className="section timeline">
      <div className="container">
        <span className="section-eyebrow">{t('timeline.eyebrow')}</span>
        <h2 className="section-title">{t('timeline.title')}</h2>

        <ol className="timeline-list">
          {EVENTS.map((ev) => (
            <li key={ev.id} className="timeline-item">
              <div className="timeline-marker" aria-hidden="true">
                <span className="marker-year mono">{ev.year}</span>
                <span className="marker-dot" />
              </div>

              <div className="timeline-body">
                <span className="timeline-type mono" data-type={ev.type}>
                  {t(`timeline.type.${ev.type}`)}
                </span>
                <h3 className="timeline-title">{t(`${ev.i18nKey}.title`)}</h3>
                <p className="timeline-org">{t(`${ev.i18nKey}.organization`)}</p>
                <p className="timeline-desc">{t(`${ev.i18nKey}.description`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default TimelineSection;
