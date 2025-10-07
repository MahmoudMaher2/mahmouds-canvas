import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { Award, Briefcase, Code, Users } from "lucide-react";

const technicalSkills = [
  "Selenium WebDriver",
  "Cucumber BDD",
  "Java",
  "TestNG",
  "JUnit",
  "Postman",
  "REST API Testing",
  "Jira",
  "Git/GitHub",
  "Manual Testing",
];

const certifications = [
  "ISTQB Foundation Level",
  "Software Testing Certification",
  "Agile Testing Practices",
];

const softSkills = [
  "Communication",
  "Teamwork",
  "Problem-Solving",
  "Attention to Detail",
  "Critical Thinking",
  "Time Management",
];

const AboutSection = () => {
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
    <section ref={sectionRef} id="about" className="py-24 px-4">
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated to quality assurance and continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bio Card */}
          <Card
            className={`card-hover ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Biography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Mahmoud Maher</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A passionate Software Test Engineer with a strong commitment to ensuring
                  software quality and reliability. I specialize in both manual and automated
                  testing, with expertise in creating comprehensive test strategies and
                  frameworks.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Education</h4>
                <p className="text-muted-foreground">
                  Bachelor's Degree in Computer Science
                </p>
                <p className="text-sm text-muted-foreground">
                  Faculty of Computers and Artificial Intelligence
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="space-y-4">
            {/* Technical Skills */}
            <Card
              className={`card-hover ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card
              className={`card-hover ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card
              className={`card-hover ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  3+ years of experience in software testing and quality assurance,
                  working on various projects across different domains.
                </p>
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card
              className={`card-hover ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
              style={{ animationDelay: "0.4s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Soft Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
