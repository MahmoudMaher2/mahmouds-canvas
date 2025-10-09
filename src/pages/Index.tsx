import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedBackground from "@/components/AnimatedBackground";
import LinkedInButton from "@/components/LinkedInButton";
import Hero from "@/components/Hero";
import SummariesSection from "@/components/SummariesSection";
import AboutSection from "@/components/AboutSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesGallery from "@/components/CertificatesGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <LinkedInButton />
      
      <main>
        <Hero />
        <SummariesSection />
        <AboutSection />
        <SkillsMarquee />
        <ProjectsSection />
        <CertificatesGallery />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
