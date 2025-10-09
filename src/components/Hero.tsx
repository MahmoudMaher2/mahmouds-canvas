import { Button } from "@/components/ui/button";
import { Download, Mail, FolderOpen, FileText } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />
      
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Image */}
          <div className="inline-block animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl opacity-40 animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse-glow" />
              <img
                src="https://avatars.githubusercontent.com/u/152396604?v=4"
                alt="Mahmoud Maher"
                className="relative w-56 h-56 rounded-full mx-auto border-4 border-primary/20 shadow-2xl object-cover ring-4 ring-primary/10"
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="gradient-text">Mahmoud Maher</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
              Software Test Engineer
            </p>
          </div>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            A passionate software tester who loves ensuring quality and sharing knowledge with others.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("summaries")}
              className="gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <FileText className="h-5 w-5" />
              View My Summaries
            </Button>
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <FolderOpen className="h-5 w-5" />
              View My Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="gap-2"
            >
              <Mail className="h-5 w-5" />
              Reach Me
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              asChild
            >
              <a href="#" download>
                <Download className="h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
