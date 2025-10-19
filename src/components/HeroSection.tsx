import './HeroSection.css';
import img from'../assets/img_jysus.png'



const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="particles-container" id="particles-js">
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-profile">
          <div className="profile-image-container">
            <div className="profile-image-placeholder">
              
              <img src={img} alt="Foto de perfil de Jesús Martínez" />
            </div>
          </div>

          <div className="hero-text-content">
            <p className="hero-greeting">Hola, soy</p>
            <h1 className="hero-name">Jesus Martinez</h1>
            <h2 className="hero-title">CIENTIFICO DE DATOS & INGENIERO EN IA</h2>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">2+</span>
                <span className="stat-label">Años Experiencia</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">10+</span>
                <span className="stat-label">Proyectos</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">CONFIANZA</span>
              </div>
            </div>

            <div className="hero-cta">
              <a href="#projects" className="cta-btn cta-primary">Ver Proyectos</a>
              <a href="#contact" className="cta-btn cta-secondary">Contactar</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
