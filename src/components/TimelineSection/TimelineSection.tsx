import { useMemo } from 'react';
import './TimelineSection.css';
import { useTranslation } from '../../contexts/I18nContext';

interface ChartEvent {
  id: string;
  start: number;
  end: number;
  ongoing?: boolean;
  future?: boolean;
  i18nKey: string;
}

const WORK_EVENTS: ChartEvent[] = [
  { id: 'comagua', start: 2025, end: 2026, ongoing: true, i18nKey: 'timeline.events.comagua' },
  { id: 'imss', start: 2024, end: 2025, i18nKey: 'timeline.events.imss' },
  { id: 'imagen_it', start: 2023, end: 2024, i18nKey: 'timeline.events.imagen_it' },
  { id: 'eks_oracle', start: 2022, end: 2023, i18nKey: 'timeline.events.eks_oracle' },
];

const EDU_EVENTS: ChartEvent[] = [
  { id: 'unitec_cd', start: 2025, end: 2029, future: true, i18nKey: 'timeline.events.unitec_cd' },
  { id: 'oracle_one', start: 2023, end: 2023, i18nKey: 'timeline.events.oracle_one' },
  { id: 'cecyt', start: 2019, end: 2022, i18nKey: 'timeline.events.cecyt' },
];

const computeRange = (events: ChartEvent[]) => {
  const min = Math.min(...events.map((e) => e.start));
  const max = Math.max(...events.map((e) => e.end));
  return { min, max, span: Math.max(max - min, 1) };
};

const generateTicks = (min: number, max: number, span: number): number[] => {
  // Target 3-4 evenly spaced "nice" ticks regardless of span.
  const step = span <= 2 ? 1 : span <= 5 ? 2 : span <= 12 ? 5 : 10;
  const ticks: number[] = [];
  for (let y = min; y <= max; y += step) ticks.push(y);
  if (ticks[ticks.length - 1] !== max) ticks.push(max);
  return ticks;
};

interface ChartPanelProps {
  events: ChartEvent[];
  variant: 'work' | 'education';
  titleKey: string;
}

const ChartPanel = ({ events, variant, titleKey }: ChartPanelProps) => {
  const { t } = useTranslation();
  const { min, max, span } = useMemo(() => computeRange(events), [events]);
  const ticks = useMemo(() => generateTicks(min, max, span), [min, max, span]);
  const ongoingLabel = t('timeline.ongoing');

  return (
    <article className="chart-panel" data-variant={variant}>
      <header className="chart-panel-head">
        <span className="chart-panel-eyebrow mono">{t(`timeline.type.${variant}`)}</span>
        <div className="chart-panel-title-row">
          <h3 className="chart-panel-title">{t(titleKey)}</h3>
          <span className="chart-panel-count mono">n = {events.length}</span>
        </div>
      </header>

      <div className="chart-body">
        <div className="chart-rows">
          {events.map((e) => {
            const left = ((e.start - min) / span) * 100;
            const rawDur = Math.max(e.end - e.start, 0.5);
            const width = (rawDur / span) * 100;
            const periodText =
              e.start === e.end
                ? `${e.start}`
                : `${e.start} – ${e.ongoing ? ongoingLabel : e.end}`;
            const ariaLabel = `${t(`${e.i18nKey}.title`)} · ${t(`${e.i18nKey}.organization`)} · ${periodText}`;
            return (
              <div key={e.id} className="chart-row" title={t(`${e.i18nKey}.description`)}>
                <div className="chart-label">
                  <span className="chart-label-org">{t(`${e.i18nKey}.organization`)}</span>
                  <span className="chart-label-title">{t(`${e.i18nKey}.title`)}</span>
                </div>
                <div className="chart-track" role="img" aria-label={ariaLabel}>
                  <div
                    className="chart-bar"
                    style={{ left: `${left}%`, width: `${width}%` }}
                    data-ongoing={e.ongoing || undefined}
                    data-future={e.future || undefined}
                  />
                </div>
                <span className="chart-period mono">{periodText}</span>
              </div>
            );
          })}
        </div>

        <div className="chart-axis-row" aria-hidden="true">
          <span className="chart-axis-label mono">{t('timeline.axis_label')}</span>
          <div className="chart-axis">
            <div className="chart-axis-line" />
            {ticks.map((y, i) => {
              const align =
                i === 0 ? 'start' : i === ticks.length - 1 ? 'end' : 'center';
              return (
                <span
                  key={y}
                  className="chart-tick mono"
                  data-align={align}
                  style={{ left: `${((y - min) / span) * 100}%` }}
                >
                  {y}
                </span>
              );
            })}
          </div>
          <span className="chart-axis-spacer" />
        </div>
      </div>
    </article>
  );
};

const TimelineSection = () => {
  const { t } = useTranslation();
  return (
    <section id="timeline" className="section timeline">
      <div className="container">
        <span className="section-eyebrow">{t('timeline.eyebrow')}</span>
        <h2 className="section-title">{t('timeline.title')}</h2>
        <p className="section-lead">{t('timeline.lead')}</p>

        <div className="chart-grid">
          <ChartPanel events={WORK_EVENTS} variant="work" titleKey="timeline.work_title" />
          <ChartPanel
            events={EDU_EVENTS}
            variant="education"
            titleKey="timeline.education_title"
          />
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
