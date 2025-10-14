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
              A brief introduction about me and my journey in the world of software testing.
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
                        <Users className="h-9 w-9 text-primary" />
                        About & Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-bold text-xl mb-4 text-foreground">Mahmoud Maher</h3>
                        <p className="text-semibold-foreground leading-relaxed">
                          A Software Test Engineer passionate about quality, teamwork, and continuous learning.
                          I’ve always been passionate about helping others grow — from creating study guides and mock exams for my classmates in college to now sharing knowledge and supporting others who are learning and growing in the testing field.
                        </p>
                      </div>

                      {/* Education */}
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <span className="font-bold text-lg">Education</span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <p className="text-foreground font-semibold">Bachelor's Degree in Electronics & Communication</p>
                                <p className="text-muted-foreground">Faculty of Engineering — Mansoura University</p>
                              </div>
                              <Badge 
                                variant="secondary" 
                                className="bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 hover:bg-blue-500/25 hover:scale-105 transition-all duration-300 text-sm px-2 py-1 font-medium cursor-pointer whitespace-nowrap flex-shrink-0"
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
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Award className="h-9 w-9 text-primary" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {certifications.map((cert) => (
                        <div
                          key={cert.name}
                          className="group relative p-4 rounded-lg border border-border/60 bg-card/50 hover:bg-card/70 transition-all duration-300 hover:shadow-md hover:border-primary/30"
                        >
                          {/* المحتوى الرئيسي */}
                          <div className="flex items-start justify-between gap-4">
                            {/* الجزء الأيسر: الأيقونة واسم الشهادة */}
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Award className="h-5 w-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-foreground font-bold text-md leading-tight break-words">
                                  {cert.name}
                                </h4>
                              </div>
                            </div>
                            
                            {/* الجزء الأيمن: التاريخ في مربع */}
                            <div className="flex-shrink-0">
                              <div className="px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                                <span className="text-xs font-medium text-blue-700 dark:text-blue-200 whitespace-nowrap">
                                  {cert.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* خط فاصل */}
                          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                        </div>
                      ))}
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
    </section>
  );
};

export default AboutSection;