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
                [Inserta aquí tu descripción profesional, experiencia y especialización en Data Science e IA]
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
                [Inserta aquí tu formación académica, certificaciones y cursos relevantes]
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
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">Scikit-learn</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS</span>
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
                <li className="specialty-item">Machine Learning</li>
                <li className="specialty-item">Deep Learning</li>
                <li className="specialty-item">Natural Language Processing</li>
                <li className="specialty-item">Computer Vision</li>
                <li className="specialty-item">Data Analysis & Visualization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
