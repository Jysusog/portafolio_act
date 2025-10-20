import './TimelineSection.css';

const TimelineSection = () => {
  const timelineEvents = [
    {
      id: 1,
      year: '2025',
      title: 'Analista Informatico',
      organization: 'Empresa Gubernamental',
      description: 'Realizo automatizaciones para el area de nomina como tambien me encargo del proceso de timbrado de nomina.',
      type: 'work'
    },
    {
      id: 2,
      year: '2025',
      title: 'Ingenieria en Inteligencia Artificial',
      organization: 'Universidad Hybridge Education',
      description: 'Especialización en redes neuronales profundas y arquitecturas modernas.',
      type: 'education'
    },
    {
      id: 3,
      year: '2024',
      title: 'Analista de Reintegros presupuestarios',
      organization: 'Empresa Gubernamental',
      description: 'Realice el análisis individual de cada trabajador para detectar posibles cobros indebidos, con el fin de calcular y gestionar su devolución correspondiente.',
      type: 'work'
    },
    {
      id: 4,
      year: '2024',
      title: 'Ciencia de Datos',
      organization: 'Universidad ONMEX',
      description: 'Investigación en machine learning y procesamiento de lenguaje natural.',
      type: 'education'
    },
    {
      id: 5,
      year: '2019',
      title: 'Tecnico en Informatica',
      organization: 'Cecyt 14 "Luis enrique Erro" IPN',
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
