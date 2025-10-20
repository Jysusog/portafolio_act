import { useState } from 'react';
import './ProjectsCarousel.css';

const ProjectsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'Envio de CFDIS a nivel estatal.',
      description: 'Sistema que se encarga de enviar documentos por correo electronico de forma masiva, esto .',
      technologies: ['Python', 'Numpy', 'Pandas'],
      image: '💬'
    },
    {
      id: 2,
      title: 'Análisis de Datos con IA',
      description: 'Plataforma de análisis inteligente que procesa grandes volúmenes de datos en tiempo real.',
      technologies: ['PyTorch', 'NumPy'],
      image: '📊'
    },
    {
      id: 3,
      title: 'Computer Vision',
      description: 'Aplicación de visión por computadora para detección y clasificación de objetos.',
      technologies: ['OpenCV', 'YOLO', 'CNN'],
      image: '👁️'
    }
    
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="projects" className="projects-carousel-section">
      <div className="carousel-container">
        <h2 className="section-title-neon">Proyectos Destacados</h2>

        <div className="carousel-wrapper">
          <button className="carousel-btn carousel-btn-prev" onClick={prevSlide} aria-label="Previous">
            ‹
          </button>

          <div className="carousel-track">
            <div
              className="carousel-inner"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="carousel-slide">
                  <div className="project-card-cyber">
                    <div className="card-header-cyber">
                      <div className="project-icon-cyber">
                        <span className="project-emoji">{project.image}</span>
                      </div>
                      <div className="card-corner card-corner-tl"></div>
                      <div className="card-corner card-corner-tr"></div>
                    </div>

                    <div className="card-content-cyber">
                      <h3 className="project-title-cyber">{project.title}</h3>
                      <p className="project-description-cyber">{project.description}</p>

                      <div className="project-tech-tags">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag-cyber">{tech}</span>
                        ))}
                      </div>

                      <button className="project-btn-cyber">Ver Detalles</button>
                    </div>

                    <div className="card-footer-cyber">
                      <div className="card-corner card-corner-bl"></div>
                      <div className="card-corner card-corner-br"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn carousel-btn-next" onClick={nextSlide} aria-label="Next">
            ›
          </button>
        </div>

        <div className="carousel-indicators">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
