import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedBackground from "@/components/AnimatedBackground";
import LinkedInButton from "@/components/LinkedInButton";
import Hero from "@/components/Hero";
import SummariesSection from "@/components/SummariesSection";
import AboutSection from "@/components/AboutSection";
import WorkExperienceSection from "@/components/WorkExperienceSection.tsx";
import SkillsMarquee from "@/components/SkillsMarquee";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesGallery from "@/components/CertificatesGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { useSplashScreen } from "@/hooks/useSplashScreen";

const Index = () => {
  const { showSplash, handleComplete } = useSplashScreen();

  return (
    <div className="min-h-screen relative">
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <LinkedInButton />
      
      <main>
        <section id="home" className="section">
          <Hero />
        </section>
        
        <section id="summaries" className="section">
          <SummariesSection />
        </section>
        
        <section id="about" className="section">
          <AboutSection />
          <WorkExperienceSection/>
        </section>
        
        <section id="skills" className="section">
          <SkillsMarquee />
        </section>
        
        <section id="projects" className="section">
          <ProjectsSection />
        </section>
        
        <section id="certificates" className="section">
          <CertificatesGallery />
        </section>
        
        <section id="contact" className="section">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;