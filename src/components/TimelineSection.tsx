import './TimelineSection.css';

const TimelineSection = () => {
  const timelineEvents = [
    {
      id: 1,
      year: '2024',
      title: 'Senior Data Scientist',
      organization: 'Tech Company',
      description: 'Liderazgo en proyectos de IA y desarrollo de modelos predictivos avanzados.',
      type: 'work'
    },
    {
      id: 2,
      year: '2022',
      title: 'Certificación en Deep Learning',
      organization: 'Universidad / Plataforma',
      description: 'Especialización en redes neuronales profundas y arquitecturas modernas.',
      type: 'education'
    },
    {
      id: 3,
      year: '2021',
      title: 'Data Scientist',
      organization: 'Startup Tech',
      description: 'Desarrollo de soluciones de ML para análisis de datos a gran escala.',
      type: 'work'
    },
    {
      id: 4,
      year: '2019',
      title: 'Maestría en Ciencia de Datos',
      organization: 'Universidad',
      description: 'Investigación en machine learning y procesamiento de lenguaje natural.',
      type: 'education'
    },
    {
      id: 5,
      year: '2017',
      title: 'Licenciatura en Computación',
      organization: 'Universidad',
      description: 'Fundamentos de programación, algoritmos y bases de datos.',
      type: 'education'
    }
  ];

  return (
    <section id="timeline" className="timeline-section">
      <div className="timeline-container">
        <h2 className="section-title-neon">Trayectoria Profesional</h2>

        <div className="timeline-wrapper">
          <div className="timeline-line"></div>

          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
            >
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="card-year">
                    <span className="year-text">{event.year}</span>
                  </div>

                  <div className="card-body">
                    <div className={`card-type-badge ${event.type}`}>
                      {event.type === 'work' ? '💼' : '🎓'}
                    </div>
                    <h3 className="timeline-title">{event.title}</h3>
                    <p className="timeline-organization">{event.organization}</p>
                    <p className="timeline-description">{event.description}</p>
                  </div>

                  <div className="card-glow"></div>
                </div>
              </div>

              <div className="timeline-node">
                <div className="node-inner">
                  <div className="node-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
