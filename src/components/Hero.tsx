import { Button } from "@/components/ui/button";
import { Download, Mail, FolderOpen, FileText, ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const primaryButtonStyle = `
    relative gap-2 text-white font-medium 
    bg-gradient-to-r 
    from-blue-600 via-blue-500 to-blue-400
    overflow-hidden
    shadow-[0_0_8px_rgba(59,130,246,0.4)] 
    dark:shadow-[0_0_12px_rgba(59,130,246,0.3)] 
    transition-all duration-500 
    hover:scale-[1.02] hover:brightness-105
    before:absolute before:top-0 before:left-[-75%] 
    before:w-[50%] before:h-full 
    before:bg-gradient-to-tr before:from-white/30 before:to-white/10
    before:skew-x-[-20deg]
    before:animate-none
    hover:before:animate-[shine_1.5s_ease-in-out_forwards]
    before:rounded-[inherit]
  `;

  const secondaryButtonStyle = `
    relative gap-2 font-medium 
    bg-background border-2 border-border
    text-foreground
    overflow-hidden
    transition-all duration-500 
    hover:scale-[1.02] hover:bg-blue-600 hover:text-white hover:border-blue-600
    before:absolute before:top-0 before:left-[-75%] 
    before:w-[50%] before:h-full 
    before:bg-gradient-to-tr before:from-white/30 before:to-white/10
    before:skew-x-[-20deg]
    before:animate-none
    hover:before:animate-[shine_1.5s_ease-in-out_forwards]
    before:rounded-[inherit]
  `;

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
                src="/Mahmoud Maher.jpg"
                alt="Mahmoud Maher"
                className="
                  relative w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72
                  rounded-full mx-auto border-4 border-primary/20 shadow-2xl object-cover
                  ring-4 ring-primary/10 animate-float
                  transition-all duration-500
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]
                  hover:ring-[rgba(59,130,246,0.5)]
                "
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
            A Passionate Software Tester who loves ensuring Quality and Sharing Knowledge With Others.
          </p>

          {/* CTA Buttons - 4 في صف واحد */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {/* View My Summaries Button */}
            <Button
              size="lg"
              onClick={() => scrollToSection("summaries")}
              className={primaryButtonStyle}
            >
              <FileText className="h-5 w-5" />
              View Summaries
              <ArrowRight className="h-4 w-4" />
            </Button>

            {/* View My Projects Button */}
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className={primaryButtonStyle}
            >
              <FolderOpen className="h-5 w-5" />
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>

            {/* Reach Me Button */}
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className={secondaryButtonStyle}
            >
              <Mail className="h-5 w-5" />
              Reach Me
              <ArrowRight className="h-4 w-4" />
            </Button>

            {/* Download Resume Button */}
            <Button
              size="lg"
              className={secondaryButtonStyle}
              asChild
            >
              <a href="/Mahmoud Maher's Resume.pdf" download>
                <Download className="h-5 w-5" />
                Download My Resume
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;