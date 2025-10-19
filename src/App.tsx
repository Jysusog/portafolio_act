import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsCarousel from './components/ProjectsCarousel';
import TimelineSection from './components/TimelineSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="portfolio">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsCarousel />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;

