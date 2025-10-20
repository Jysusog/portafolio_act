import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title-neon">Sobre Mí</h2>

        <div className="about-grid">
          <div className="about-panel">
            <div className="panel-header">
              <div className="panel-icon">
                <span className="icon-placeholder">💼</span>
              </div>
              <h3 className="panel-title">Perfil Profesional</h3>
            </div>
            <div className="panel-content">
              <p className="panel-text">
                Me dedico a dar soluciones innovadoras a empresas o grupos de trabajo, me mantengo al tanto de todas las noticias y avances en el campo de la inteligencia artificial y el aprendizaje automático para ofrecer las mejores soluciones posibles.
              </p>
            </div>
          </div>

          <div className="about-panel">
            <div className="panel-header">
              <div className="panel-icon">
                <span className="icon-placeholder">🎓</span>
              </div>
              <h3 className="panel-title">Educación</h3>
            </div>
            <div className="panel-content">
              <p className="panel-text">
                Actualmente me encuentro cursando la carrera de Ingeniería en IA en Hybridge Education, como tambien diversos cursos en plataformas como Udemy, edX y CCE para mantenerme actualizado en las últimas tendencias y tecnologías del campo.
              </p>
            </div>
          </div>

          <div className="about-panel">
            <div className="panel-header">
              <div className="panel-icon">
                <span className="icon-placeholder">⚡</span>
              </div>
              <h3 className="panel-title">Habilidades Técnicas</h3>
            </div>
            <div className="panel-content">
              <div className="skills-list">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Typescript</span>
                <span className="skill-tag">Javascript</span>
                <span className="skill-tag">Microsfot 365</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Power BI</span>
                <span className="skill-tag">VBA</span>
                <span className="skill-tag">Git</span>
              </div>
            </div>
          </div>

          <div className="about-panel">
            <div className="panel-header">
              <div className="panel-icon">
                <span className="icon-placeholder">🎯</span>
              </div>
              <h3 className="panel-title">Especialidades</h3>
            </div>
            <div className="panel-content">
              <ul className="specialties-list">
                <li className="specialty-item">Analisis de datos y visualizacion</li>
                <li className="specialty-item">Procesamiento de información</li>
                <li className="specialty-item">Logica de algoritmos</li>
                <li className="specialty-item">Informatica Avanzada</li>
                <li className="specialty-item">Asesor en IA</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
