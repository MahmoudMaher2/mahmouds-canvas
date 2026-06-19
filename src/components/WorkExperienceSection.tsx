"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experience = [
  {
    companies: [
      {
        name: "Neop",
        website: "https://www.linkedin.com/company/neopksa"
      }
    ],
    // logo: "/company/neop.png",
    logo: "/company/neop-video.mp4",
    position: "Software Test Engineer",
    period: "Nov 2025 - Present",
    location: "Egypt",
    type: "Full-time",
    description:
      "Software QC Engineer | Web, Mobile, API & Performance Testing | Agile & Jira Practitioner",
  },
  {
    companies: [
      {
        name: "Pixbyte",
        website: "https://www.linkedin.com/company/pixbyteco/"
      }
    ],
    logo: "/company/pixbyte.jpg",
    position: "Software Test Engineer",
    period: "May 2025 - Oct 2025",
    location: "Egypt",
    type: "Full-time",
    description:
      "Manual testing for multiple web applications including Talent Kid, Penguin LMS, Dorra Print, and More English. Focused on functional testing, UI/UX testing, and payment system validation.",
  },
  {
    companies: [
      {
        name: "Algoriza",
        website: "https://www.linkedin.com/company/algoriza"
      },
      {
        name: "AZM Squad",
        website: "https://www.linkedin.com/company/azmsquad"
      }
    ],
    logo: "/company/AZM1.jpg",
    position: "Manual and Automation Software Testing internship",
    period: "July 2025 - Sep 2025",
    location: "Remote",
    type: "Internship",
    description:
      "Intensive software testing bootcamp covering manual testing, test case design, bug reporting, and automation fundamentals with Selenium and Java.",
  },
  {
    companies: [
      {
        name: "DEPI",
        website: "https://www.depi-eg.com"
      }
    ],
    logo: "/company/DEPI.jpg",
    position: "Software Testing Intern",
    period: "Apr 2024 - Oct 2024",
    location: "Hybrid",
    type: "Internship",
    description:
      "Comprehensive internship program covering software testing fundamentals, automation with Selenium, and agile methodologies.",
  },
];

const calculateDuration = (period: string) => {
  const [start, end] = period.split(" - ");

  try {
    // تحويل الشهور من نص لرقم
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'January': 0,
      'Feb': 1, 'February': 1,
      'Mar': 2, 'March': 2,
      'Apr': 3, 'April': 3,
      'May': 4,
      'Jun': 5, 'June': 5,
      'Jul': 6, 'July': 6,
      'Aug': 7, 'August': 7,
      'Sep': 8, 'September': 8,
      'Oct': 9, 'October': 9,
      'Nov': 10, 'November': 10,
      'Dec': 11, 'December': 11
    };

    const parseDate = (dateStr: string): Date => {
      // إذا كان "Present" نرجع التاريخ الحالي
      if (dateStr === 'Present') return new Date();

      const parts = dateStr.split(' ');
      const monthName = parts[0];
      const year = parseInt(parts[1]);

      if (monthMap[monthName] !== undefined && !isNaN(year)) {
        return new Date(year, monthMap[monthName], 1);
      }

      // إذا فشل التحويل، نجرب الطريقة العادية
      return new Date(dateStr);
    };

    const startDate = parseDate(start);
    const endDate = parseDate(end);

    // التحقق من صحة التواريخ
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return "Invalid date";
    }

    // إذا كانت التواريخ في المستقبل، استخدم التاريخ الحالي
    const effectiveEndDate = endDate > new Date() ? new Date() : endDate;

    // حساب الفرق بالشهور
    let months = (effectiveEndDate.getFullYear() - startDate.getFullYear()) * 12;
    months += effectiveEndDate.getMonth() - startDate.getMonth();

    // إذا كان الشهر الحالي أكبر من أو يساوي شهر البداية، نضيف شهر
    if (effectiveEndDate.getDate() >= startDate.getDate()) {
      months += 1;
    }

    // التأكد من أن عدد الشهور موجب
    if (months <= 0) {
      return "Less than 1 month";
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else {
      return `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
    }
  } catch (error) {
    return "Invalid period";
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const sectionBgCommon = {
  style: { backgroundSize: "200% 200%", mixBlendMode: "normal" } as React.CSSProperties,
  animate: { backgroundPosition: ["0% 50%", "100% 50%"] },
  transition: { duration: 12, repeat: Infinity, ease: "linear" as const },
};

// دالة مساعدة لتحديد نوع الميديا
const getMediaType = (logoPath: string): 'image' | 'video' | 'gif' => {
  if (!logoPath) return 'image';

  const extension = logoPath.split('.').pop()?.toLowerCase();

  if (extension === 'mp4' || extension === 'webm' || extension === 'mov') {
    return 'video';
  } else if (extension === 'gif') {
    return 'gif';
  } else {
    return 'image';
  }
};

const WorkExperienceSection: React.FC = () => {
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

  // Helper to get a fallback image path from a video path
  const getVideoFallbackImage = (videoPath: string): string | null => {
    // Try to find a matching image by replacing the extension and removing extra words
    const basePath = videoPath.substring(0, videoPath.lastIndexOf('/') + 1);
    const fileName = videoPath.substring(videoPath.lastIndexOf('/') + 1);
    // Extract the first word of the filename as the base name
    const baseName = fileName.split(/[\s.-]/)[0];
    // Try common image extensions
    return `${basePath}${baseName}.png`;
  };

  // مكون لعرض لوجو الشركة
  const CompanyLogo = ({ logo, alt }: { logo: string; alt: string }) => {
    const mediaType = getMediaType(logo);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoFailed, setVideoFailed] = useState(false);

    useEffect(() => {
      if (mediaType === 'video' && videoRef.current) {
        // Set attributes for better mobile support
        videoRef.current.setAttribute('webkit-playsinline', '');
        videoRef.current.setAttribute('x5-playsinline', '');
        videoRef.current.setAttribute('playsinline', '');

        // Attempt to play the video programmatically
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented or failed
            console.warn("Video autoplay prevented");
            // We don't necessarily fail here, as the poster might show, or user interaction might start it.
            // But for a background logo, we might want to fallback if it never plays.
            // For now, let's keep the video element but rely on poster.
          });
        }
      }
    }, [mediaType]);

    if (mediaType === 'video') {
      const fallbackImage = getVideoFallbackImage(logo);

      // If video failed (onError), show fallback image tag directly
      if (videoFailed && fallbackImage) {
        return (
          <img
            src={fallbackImage}
            alt={alt}
            className="w-full h-full object-cover rounded"
          />
        );
      }

      return (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={fallbackImage || undefined}
            onError={(e) => {
              console.error("Video error:", e);
              setVideoFailed(true);
            }}
          >
            <source src={logo} type="video/mp4" />
            {/* Fallback content for older browsers */}
            {fallbackImage && (
              <img
                src={fallbackImage}
                alt={alt}
                className="w-full h-full object-cover rounded"
              />
            )}
          </video>
        </div>
      );
    } else if (mediaType === 'gif') {
      return (
        <img
          src={logo}
          alt={alt}
          className="w-full h-full object-cover rounded"
        />
      );
    } else {
      return (
        <img
          src={logo}
          alt={alt}
          className="w-10 h-10 object-contain rounded"
        />
      );
    }
  };

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden py-8 px-6 sm:px-12">
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
            <h3 className="text-5xl font-bold mb-2 flex items-center justify-center gap-3">
              <Briefcase className="h-10 w-10 text-primary" />
              <span className="gradient-text bg-gradient-to-r from-violet-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">My professional journey in software testing.</p>
          </motion.div>

          {/* Timeline container */}
          <div className="relative max-w-5xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-violet-400 to-pink-400 opacity-60 block -z-10" />

            <div className="space-y-12">
              {experience.map((exp, idx) => (
                <div
                  key={exp.companies.map(c => c.name).join('-') + idx}
                  ref={(el) => (experienceRefs.current[idx] = el)}
                  className={`relative flex flex-col lg:flex-row items-center ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* dot - Hidden on mobile if you want it BEHIND the card, but visible if part of design. Keeping it centered. */}
                  <div className="flex absolute left-1/2 transform -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-pink-500 border-4 border-background z-0 shadow" />

                  {/* card */}
                  <div className={`flex-1 w-full max-w-xl ${idx % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                    <Card className={`bg-background/70 backdrop-blur-md border border-border/40 shadow-md transition-transform duration-500 ${animatedCards[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                      <CardContent className="p-6 space-y-3">
                        {/* logo + title/company */}
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-bold/50 flex items-center justify-center border border-border overflow-hidden flex-shrink-0">
                            {exp.logo ? (
                              <CompanyLogo logo={exp.logo} alt={exp.companies[0].name} />
                            ) : (
                              <Briefcase className="h-6 w-6 text-bold-foreground" />
                            )}
                          </div>

                          <div className="min-w-0">
                            {/* Position and Companies on the same line separated by | */}
                            <h4 className="text-lg font-bold text-foreground leading-tight">
                              {exp.position} | {" "}
                              {exp.companies.map((company, companyIdx) => (
                                <span key={company.name}>
                                  <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    {company.name}
                                  </a>
                                  {companyIdx < exp.companies.length - 1 && " & "}
                                </span>
                              ))}
                            </h4>
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
  );
};

export default WorkExperienceSection;