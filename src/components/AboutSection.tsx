"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, Code, Users, Calendar, MapPin, GraduationCap } from "lucide-react";

const experience = [
  {
    company: "Pixbyte",
    logo: "/company/pixbyte.jpg",
    position: "Software Test Engineer",
    period: "July 2025 - Oct 2025",
    location: "Mansoura, Egypt",
    type: "Full-time",
    description:
      "Manual testing for multiple web applications including Talent Kid, Penguin LMS, Dorra Print, and More English. Focused on functional testing, UI/UX testing, and payment system validation.",
  },
  {
    company: "Algoriza",
    logo: "/company/algoriza.jpg",
    position: "Manual and Automation Software Testing internship",
    period: "July 2025 - Oct 2025",
    location: "Remote",
    type: "Internship",
    description:
      "Intensive software testing bootcamp covering manual testing, test case design, bug reporting, and automation fundamentals with Selenium and Java.",
  },
  {
    company: "DEPI",
    logo: "/company/DEPI.jpg",
    position: "Software Testing Intern",
    period: "Apr 2024 - Oct 2024",
    location: "Mansoura, Egypt",
    type: "Internship",
    description:
      "Comprehensive internship program covering software testing fundamentals, automation with Selenium, and agile methodologies.",
  },
];

const technicalSkills = [
  "Manual Testing",
  "Test Case Design",
  "Bug Reporting",
  "Agile Methodology",
  "API Testing",
  "Selenium WebDriver",
  "Java programming",
  "C programming",
  "TestNG",
  "Cucumber BDD",
  "Git/GitHub",
];

const certifications = [
  { name: "ISTQB Foundation Level V4.0", date: "Jun 2025" },
  { name: "ISTQB Mobile Application Testing V1.0", date: "Sep 2025" },
];

const softSkills = [
  "Communication",
  "Teamwork",
  "Problem-Solving",
  "Attention to Detail",
  "Critical Thinking",
  "Time Management",
  "Adaptability",
  "Continuous Learning",
];

const calculateDuration = (period: string) => {
  const [start, end] = period.split(" - ");
  const startDate = new Date(start);
  const endDate = end === "Present" ? new Date() : new Date(end);

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mos`;
  else if (remainingMonths === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  else return `${years} yr${years > 1 ? "s" : ""} ${remainingMonths} mos`;
};

// small helper motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const sectionBgCommon = {
  style: { backgroundSize: "200% 200%", mixBlendMode: "normal" } as React.CSSProperties,
  animate: { backgroundPosition: ["0% 50%", "100% 50%"] },
  transition: { duration: 12, repeat: Infinity, ease: "linear" },
};

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animatedCards, setAnimatedCards] = useState<boolean[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.08 });

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const observers = experienceRefs.current.map((el, idx) => {
      if (!el) return null;
      const o = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedCards(prev => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        }
      }, { threshold: 0.25, rootMargin: "-40px" });
      o.observe(el);
      return o;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="about" className="relative z-0">
      {/* =======================
          1) Combined Section: About & Education + Technical Skills + Soft Skills + Certifications
         ======================= */}
      <section className="relative overflow-hidden py-20 px-6 sm:px-12">
        {/* animated gradient background (Violet -> Blue -> Pink) */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(120deg,#7C3AED 0%,#3B82F6 50%,#EC4899 100%)", ...sectionBgCommon.style }}
          {...sectionBgCommon}
        />
        {/* soft floating blobs */}
        <motion.div
          className="absolute -left-40 -top-28 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 -z-10"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(236,72,153,0.25), transparent 30%)" }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-120px] top-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-25 -z-10"
          style={{ background: "radial-gradient(circle at 70% 70%, rgba(59,130,246,0.22), transparent 30%)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-500 to-pink-500">
              About Me
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-12">
              Passionate Software Test Engineer dedicated to quality and continuous improvement.
            </motion.p>

            {/* Grid Layout for Combined Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: About & Education + Certifications */}
              <div className="space-y-8">
                {/* About & Education Card */}
                <motion.div variants={fadeUp}>
                  <Card className="bg-background/70 backdrop-blur-md border border-border/40 shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Users className="h-6 w-6 text-primary" />
                        About & Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-bold text-xl mb-4 text-foreground">Mahmoud Maher</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          A passionate Software Test Engineer with strong expertise in both manual and automated testing.
                          Committed to ensuring software quality through comprehensive testing strategies and continuous learning.
                        </p>
                      </div>

                      {/* Education */}
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">Education</span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-foreground font-medium">Bachelor's Degree in Electronics & Communication</p>
                            <p className="text-muted-foreground">Faculty of Engineering — Mansoura University</p>
                            <p className="text-sm text-muted-foreground mt-1">Graduated: 2024</p>
                          </div>
                          <div>
                            <p className="text-foreground font-medium">Digital Egypt Youth (DEY) — Software Testing</p>
                            <p className="text-muted-foreground">Specialized training in manual & automation testing</p>
                            <p className="text-sm text-muted-foreground mt-1">Completed: 2024</p>
                          </div>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">Certifications</span>
                        </div>
                        <div className="space-y-3">
                          {certifications.map((cert) => (
                            <div
                              key={cert.name}
                              className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group/item"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <Award className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-foreground font-medium break-words">{cert.name}</span>
                              </div>
                              <div className="flex justify-end">
                                <Badge variant="secondary" className="text-xs">
                                  {cert.date}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Right Column: Technical Skills + Soft Skills */}
              <div className="space-y-8">
                {/* Technical Skills Card */}
                <motion.div variants={fadeUp}>
                  <Card className="bg-background/70 backdrop-blur-md border border-border/40 shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Code className="h-6 w-6 text-primary" />
                        Technical Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {technicalSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30
                            hover:bg-blue-500/25 hover:scale-105 transition-all duration-300 text-sm px-4 py-2 font-medium cursor-pointer"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Soft Skills Card */}
                <motion.div variants={fadeUp}>
                  <Card className="bg-background/70 backdrop-blur-md border border-border/40 shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        Soft Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {softSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20
                            hover:bg-green-500/20 hover:scale-105 transition-all duration-300 text-sm px-4 py-2 cursor-pointer"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =======================
          2) Work Experience (Timeline) - Remains Separate
         ======================= */}
      <section className="relative overflow-hidden py-20 px-6 sm:px-12">
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(100deg,#6D28D9 0%, #2563EB 50%, #EC4899 100%)", ...sectionBgCommon.style }}
          {...sectionBgCommon}
        />
        <motion.div
          className="absolute -left-36 bottom-10 w-[500px] h-[500px] rounded-full blur-3xl opacity-24 -z-10"
          style={{ background: "radial-gradient(circle at 40% 40%, rgba(124,58,237,0.2), transparent 30%)" }}
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
                <Briefcase className="h-7 w-7 text-primary" />
                Work Experience
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">My professional journey in software testing and QA.</p>
            </motion.div>

            {/* Timeline container */}
            <div className="relative max-w-5xl mx-auto">
              {/* vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-violet-400 to-pink-400 opacity-60 hidden lg:block" />

              <div className="space-y-12">
                {experience.map((exp, idx) => (
                  <div
                    key={exp.company + idx}
                    ref={(el) => (experienceRefs.current[idx] = el)}
                    className={`relative flex flex-col lg:flex-row items-start ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {/* dot */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-pink-500 border-4 border-background z-10 shadow" />

                    {/* card */}
                    <div className={`flex-1 w-full max-w-xl ${idx % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                      <Card className={`bg-background/70 backdrop-blur-md border border-border/40 shadow-md transition-transform duration-500 ${animatedCards[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        <CardContent className="p-6 space-y-3">
                          {/* logo + title/company */}
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center border border-border overflow-hidden flex-shrink-0">
                              {exp.logo ? (
                                <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-contain rounded" />
                              ) : (
                                <Briefcase className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>

                            <div className="min-w-0">
                              {/* Position on its own line */}
                              <h4 className="text-lg font-bold text-foreground leading-tight">
                                {exp.position}
                              </h4>
                              {/* Company on its own line (linkable) */}
                              <a href={`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(exp.company)}`} target="_blank" rel="noopener noreferrer" className="block text-sm font-semibold text-primary mt-1 hover:underline">
                                {exp.company}
                              </a>
                              {/* Date / duration on a separate row */}
                              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                  <Calendar className="h-3 w-3" />
                                  <span className="font-medium">{exp.period}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-700 dark:text-blue-300">
                                  {calculateDuration(exp.period)}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* location/type */}
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                              <MapPin className="h-3 w-3" />
                              <span>{exp.location}</span>
                            </div>
                            <Badge variant="outline" className="text-xs capitalize">{exp.type}</Badge>
                          </div>

                          {/* description */}
                          <p className="text-muted-foreground leading-relaxed text-sm mt-2">{exp.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default AboutSection;