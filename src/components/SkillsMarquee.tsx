import { useEffect, useRef, useState } from "react";
import {
  FileCode,
  Database,
  Layers,
  Terminal,
  GitBranch,
  FileText,
  Image,
  FileSpreadsheet,
  Presentation,
  Code2,
} from "lucide-react";

const skills = [
  { name: "Java", icon: Code2 },
  { name: "C/C++", icon: FileCode },
  { name: "SQL", icon: Database },
  { name: "IntelliJ IDEA", icon: Terminal },
  { name: "Visual Studio", icon: Terminal },
  { name: "GitHub", icon: GitBranch },
  { name: "Photoshop", icon: Image },
  { name: "Illustrator", icon: Layers },
  { name: "Word", icon: FileText },
  { name: "Excel", icon: FileSpreadsheet },
  { name: "PowerPoint", icon: Presentation },
];

const SkillsMarquee = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-4 overflow-hidden bg-muted/30">
      <div className="container mx-auto mb-12">
        <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proficient in a wide range of tools and technologies
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          {/* First set of skills */}
          <div className="flex animate-marquee gap-8 px-4">
            {skills.map((skill, index) => (
              <div
                key={`${skill.name}-1-${index}`}
                className="flex flex-col items-center justify-center min-w-[150px] h-32 bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <skill.icon className="h-10 w-10 text-primary mb-2" />
                <span className="text-sm font-medium text-center">{skill.name}</span>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex animate-marquee gap-8 px-4" aria-hidden="true">
            {skills.map((skill, index) => (
              <div
                key={`${skill.name}-2-${index}`}
                className="flex flex-col items-center justify-center min-w-[150px] h-32 bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <skill.icon className="h-10 w-10 text-primary mb-2" />
                <span className="text-sm font-medium text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default SkillsMarquee;
