"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Code, Users, GraduationCap } from "lucide-react";

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
  { name: "ISTQB Foundation Level (FL) V4.0", date: "Jun 2025" },
  { name: "ISTQB Mobile Application Testing (MAT)", date: "Sep 2025" },
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
  return (
    <section id="about" className="relative z-0">
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* animated gradient background (Violet -> Blue -> Pink) */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(120deg,#7C3AED 0%,#3B82F6 50%,#EC4899 100%)", ...sectionBgCommon.style }}
          {...sectionBgCommon}
        />
        {/* soft floating blobs */}
        <motion.div
          className="absolute -left-40 -top-28 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 -z-10"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(132, 72, 236, 0.25), transparent 30%)" }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-120px] top-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-25 -z-10"
          style={{ background: "radial-gradient(circle at 70% 70%, rgba(59,130,246,0.22), transparent 30%)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 
              variants={fadeUp} 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center"
            >
              <span className="gradient-text bg-gradient-to-r from-violet-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-10 md:mb-12">
              A brief introduction about me and my journey in the world of software testing.
            </motion.p>

            {/* Grid Layout for Combined Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column: About & Education + Certifications */}
              <div className="space-y-6 md:space-y-8">
                {/* About & Education Card */}
                <motion.div variants={fadeUp}>
                  <Card className="bg-background/70 backdrop-blur-md border border-border/40 shadow-lg">
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Users className="h-7 w-7 md:h-9 md:w-9 text-primary" />
                        About & Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6">
                      <div>
                        <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-foreground">Mahmoud Maher</h3>
                        <p className="text-semibold-foreground leading-relaxed text-sm md:text-base">
                          A Software Test Engineer passionate about quality, teamwork, and continuous learning.
                          I've always been passionate about helping others grow — from creating study guides and mock exams for my classmates in college to now sharing knowledge and supporting others who are learning and growing in the testing field.
                        </p>
                      </div>

                      {/* Education */}
                      <div className="pt-3 md:pt-4 border-t border-border">
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                          <span className="font-bold text-base md:text-lg">Education</span>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                              <div className="flex-1">
                                <p className="text-foreground font-semibold text-sm md:text-base">Bachelor's Degree in Electronics & Communication</p>
                                <p className="text-muted-foreground text-xs md:text-sm">Faculty of Engineering — Mansoura University</p>
                              </div>
                              <Badge 
                                variant="secondary" 
                                className="bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 hover:bg-blue-500/25 hover:scale-105 transition-all duration-300 text-xs md:text-sm px-2 py-1 font-medium cursor-pointer whitespace-nowrap flex-shrink-0 self-start mt-1 sm:mt-0"
                              >
                                Graduated: 2024
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Certifications Card - كارت منفصل */}
                <motion.div variants={fadeUp}>
                  <Card className="bg-background/70 backdrop-blur-md border border-border/40 shadow-lg">
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Award className="h-7 w-7 md:h-9 md:w-9 text-primary" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 md:space-y-4">
                      {certifications.map((cert) => (
                        <div
                          key={cert.name}
                          className="group relative p-3 md:p-4 rounded-lg border border-border/60 bg-card/50 hover:bg-card/70 transition-all duration-300 hover:shadow-md hover:border-primary/30"
                        >
                          {/* المحتوى الرئيسي */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3">
                            {/* الجزء الأيسر: الأيقونة واسم الشهادة */}
                            <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Award className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-foreground font-bold text-sm md:text-base leading-tight break-words">
                                  {cert.name}
                                </h4>
                              </div>
                            </div>
                            
                            {/* الجزء الأيمن: التاريخ في مربع */}
                            <div className="flex-shrink-0 self-start sm:self-center">
                              <div className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                                <span className="text-xs font-medium text-blue-700 dark:text-blue-200 whitespace-nowrap">
                                  {cert.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* خط فاصل */}
                          <div className="absolute bottom-0 left-3 right-3 md:left-4 md:right-4 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Right Column: Technical Skills + Soft Skills */}
              <div className="space-y-6 md:space-y-8">
                {/* Technical Skills Card */}
                <motion.div variants={fadeUp}>
                  <Card className="bg-background/70 backdrop-blur-md border border-border/40 shadow-lg">
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Code className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        Technical Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {technicalSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30
                            hover:bg-blue-500/25 hover:scale-105 transition-all duration-300 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 font-medium cursor-pointer"
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
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        Soft Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {softSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20
                            hover:bg-green-500/20 hover:scale-105 transition-all duration-300 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 cursor-pointer"
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
    </section>
  );
};

export default AboutSection;