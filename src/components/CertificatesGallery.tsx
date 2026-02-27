import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award, Calendar, Eye, ExternalLink, ChevronLeft, ChevronRight, Hash, Image as ImageIcon, Layers } from "lucide-react";
import { Player } from '@lottiefiles/react-lottie-player';

const certificates = [
  {
    id: 1,
    title: "ISTQB Foundation Level V4.0",
    image: "/Certificates/ISTQB FL Certificate.jpg",
    institution: "International Software Testing Qualifications Board",
    date: "June 2025",
    link: "https://scr.istqb.org/",
    credentialId: "250528036",
    featured: true
  },
  {
    id: 2,
    title: "ISTQB MAT Mobile Application Testing V1.0",
    image: "/Certificates/ISTQB MAT Certificate.png",
    institution: "International Software Testing Qualifications Board",
    date: "Sep 2025",
    link: "https://scr.istqb.org/",
    credentialId: "250806035",
    featured: true
  },
  {
    id: 3,
    title: "Manual and Automation Software Testing internship",
    image: "/Certificates/Azm Squad 337488.png",
    institution: "Algoriza & AZM Squad",
    date: "Oct 2025",
    link: "https://interns.azmsquad.com/",
    credentialId: "337488"
  },
  {
    id: 4,
    title: "Manual Testing Basics - Testing Bootcamp Level 1",
    image: "/Certificates/Manual Testing Basics - Testing Bootcamp Level 1.jpg",
    institution: "Nezam Academy",
    date: "Nov 2025"
  },
  {
    id: 5,
    title: "Agile Testing - Testing Bootcamp Level 2",
    image: "/Certificates/Agile Testing - Testing Bootcamp Level 2.jpg",
    institution: "Nezam Academy",
    date: "Sep 2025"
  },
  {
    id: 6,
    title: "Mobile Application Testing - Testing Bootcamp Level 3",
    image: "/Certificates/Mobile Application Testing - Testing Bootcamp Level 3.jpg",
    institution: "Nezam Academy",
    date: "Sep 2025"
  },
  {
    id: 7,
    title: "Java Programming Test Automation Bootcamp Level 1",
    image: "/Certificates/Java Programming Test Automation Bootcamp Level 1 nezam.jpg",
    institution: "Nezam Academy",
    date: "Sep 2025"
  },
  {
    id: 8,
    title: "ISTQB Mobile Application Testing Course",
    image: "/Certificates/ISTQB Mobile Application Testing - Become a Mobile Tester.jpg",
    institution: "Udemy - Tarek Roshdy",
    date: "Aug 2025",
    link: "https://www.udemy.com/certificate/UC-3943a2b4-8649-496b-a70b-0b523a69e990/",
    credentialId: "UC-3943a2b4-8649-496b-a70b-0b523a69e990"
  },
  {
    id: 9,
    title: "Introduction to Software Testing Concepts & Techniques",
    image: "/Certificates/Introduction to Software Testing Concepts & Techniques.png",
    institution: "MaharaTech - ITI",
    date: "May 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=355&downloadown=1",
    credentialId: "9SQbyBz3MU"
  },
  {
    id: 10,
    title: "ISTQB Foundation Level",
    image: "/Certificates/ISTQB Foundation Level.png",
    institution: "MaharaTech - ITI",
    date: "July 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=967&downloadown=1",
    credentialId: "RBIkxEvMEt"
  },
  {
    id: 11,
    title: "Effective Test Case and Bug Report Writing Techniques",
    image: "/Certificates/Effective Test Case and Bug Report Writing Techniques.png",
    institution: "MaharaTech - ITI",
    date: "July 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=970&downloadown=1",
    credentialId: "tQVBfSXdL3"
  },
  {
    id: 12,
    title: "C Programming From Basics to Mastery",
    image: "/Certificates/C Programming From Basics to Mastery.png",
    institution: "MaharaTech - ITI",
    date: "Sep 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=16004&downloadown=1",
    credentialId: "rkFYlKshGs"
  },
  {
    id: 13,
    title: "Mastering Object-Oriented Programming (OOP) using C++",
    image: "/Certificates/Mastering Object-Oriented Programming.png",
    institution: "MaharaTech - ITI",
    date: "Sep 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=14866&downloadown=1",
    credentialId: "HqHnd1TbOm"
  },
  {
    id: 14,
    title: "Database Fundamentals",
    image: "/Certificates/Database Fundamentals.png",
    institution: "MaharaTech - ITI",
    date: "Sep 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=7655&downloadown=1",
    credentialId: "auadg30yKg"
  },
  {
    id: 15,
    title: "Software Testing Internship - DEPI [R1]",
    image: "/Certificates/Certificate DEPI R1 Mahmoud Maher Khater Abdel Razek.jpg",
    institution: "Digital Egypt Pioneers Initiative [DEPI]",
    date: "Oct 2024"
  },
  {
    id: 16,
    title: "Business English - DEPI [R1]",
    image: "/Certificates/Certificate DEPI R1 MAHMOUD MAHER KHATER .jpg",
    institution: "Digital Egypt Pioneers Initiative [DEPI]",
    date: "Oct 2024"
  },
  {
    id: 17,
    title: "Smart Environment Hackathon",
    image: "/Certificates/Smart Environment Hackathon Certificate.jpg",
    institution: "Mansoura university",
    date: "May 2024"
  },
  {
    id: 18,
    title: "Part One Embedded Systems Diploma",
    image: "/Certificates/Part 1 certification_Page_1.jpg",
    institution: "Eng/ Ahmed Abd ElGhafar",
    date: "July 2023"
  }
];

const groupedCertificates = (() => {
  const groups = new Map<string, typeof certificates>();
  certificates.forEach(cert => {
    const isUngrouped = cert.institution === "International Software Testing Qualifications Board";
    const groupKey = isUngrouped ? `${cert.institution}-${cert.id}` : cert.institution;

    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(cert);
  });
  return Array.from(groups.entries()).map(([key, certs], index) => ({
    id: `group-${index}`,
    institution: certs[0].institution,
    certificates: certs,
    frontCert: certs[0],
  }));
})();

const CertificatesGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const buttonStyle = `
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

  // Canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDarkMode = () => {
      return document.documentElement.classList.contains('dark');
    };

    const setCanvasSize = () => {
      const section = sectionRef.current;
      if (section) {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      originalX: number;
      originalY: number;
      angle: number;
      amplitude: number;
      frequency: number;
      shapeType: number;

      constructor(darkMode: boolean) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 30;
        this.speedX = Math.random() * 0.08 - 0.04;
        this.speedY = Math.random() * 0.08 - 0.04;

        const darkModeColors = [
          'rgba(59, 130, 246, 0.25)',
          'rgba(139, 92, 246, 0.25)',
          'rgba(14, 165, 233, 0.25)',
          'rgba(99, 102, 241, 0.25)',
        ];

        const lightModeColors = [
          'rgba(37, 99, 235, 0.2)',
          'rgba(124, 58, 237, 0.2)',
          'rgba(2, 132, 199, 0.2)',
          'rgba(79, 70, 229, 0.2)',
        ];

        const colors = darkMode ? darkModeColors : lightModeColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.3 + 0.1;
        this.originalX = this.x;
        this.originalY = this.y;
        this.angle = Math.random() * Math.PI * 2;
        this.amplitude = Math.random() * 60 + 30;
        this.frequency = Math.random() * 0.002 + 0.001;
        this.shapeType = Math.floor(Math.random() * 3);
      }

      update() {
        this.angle += this.frequency;
        this.x = this.originalX + Math.cos(this.angle) * this.amplitude;
        this.y = this.originalY + Math.sin(this.angle * 0.7) * this.amplitude;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.beginPath();

        switch (this.shapeType) {
          case 0:
            ctx.moveTo(this.x, this.y - this.size / 2);
            ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
            ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
            ctx.closePath();
            break;
          case 1:
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            break;
        }
        ctx.fill();
      }

      updateColor(darkMode: boolean) {
        const darkModeColors = [
          'rgba(59, 130, 246, 0.25)',
          'rgba(139, 92, 246, 0.25)',
          'rgba(14, 165, 233, 0.25)',
          'rgba(99, 102, 241, 0.25)',
        ];
        const lightModeColors = [
          'rgba(37, 99, 235, 0.2)',
          'rgba(124, 58, 237, 0.2)',
          'rgba(2, 132, 199, 0.2)',
          'rgba(79, 70, 229, 0.2)',
        ];
        const colors = darkMode ? darkModeColors : lightModeColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
    }

    const particles: Particle[] = [];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(isDarkMode()));
    }

    const updateColors = () => {
      const darkMode = isDarkMode();
      particles.forEach(particle => {
        particle.updateColor(darkMode);
      });
    };

    const observer = new MutationObserver(() => {
      updateColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      observer.disconnect();
    };
  }, []);

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

  // التحقق من وجود الصور
  const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // تحميل الصور
  const loadImage = async (certificate: typeof certificates[0]) => {
    try {
      const exists = await checkImageExists(certificate.image);
      if (exists) {
        setLoadedImages(prev => ({ ...prev, [certificate.id]: true }));
      } else {
        setImageErrors(prev => ({ ...prev, [certificate.id]: true }));
      }
    } catch (error) {
      setImageErrors(prev => ({ ...prev, [certificate.id]: true }));
    }
  };

  // تحميل الصور عند تغيير العرض
  useEffect(() => {
    const groupsToLoad = showAll ? groupedCertificates : groupedCertificates.slice(0, 6);
    const certificatesToLoad = groupsToLoad.flatMap(g => g.certificates);

    certificatesToLoad.forEach(certificate => {
      if (!loadedImages[certificate.id] && !imageErrors[certificate.id]) {
        loadImage(certificate);
      }
    });
  }, [showAll]);

  const openDialog = (groupId: string) => {
    setActiveGroupId(groupId);
    setCurrentCertIndex(0);
  };

  const navigateCertificate = useCallback((direction: 'prev' | 'next') => {
    if (!activeGroupId) return;
    const group = groupedCertificates.find(g => g.id === activeGroupId);
    if (!group) return;

    if (direction === 'prev') {
      setCurrentCertIndex(prev =>
        prev === 0 ? group.certificates.length - 1 : prev - 1
      );
    } else {
      setCurrentCertIndex(prev =>
        prev === group.certificates.length - 1 ? 0 : prev + 1
      );
    }
  }, [activeGroupId]);

  // معالجة أخطاء الصور
  const handleImageError = (certificateId: number) => {
    setImageErrors(prev => ({ ...prev, [certificateId]: true }));
  };

  // إضافة event listener للأسهم
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeGroupId) return;
      if (document.querySelector('[role="dialog"]')) {
        if (e.key === 'ArrowLeft') {
          navigateCertificate('prev');
        } else if (e.key === 'ArrowRight') {
          navigateCertificate('next');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeGroupId, navigateCertificate]);

  const activeGroup = groupedCertificates.find(g => g.id === activeGroupId) || groupedCertificates[0];
  const currentCertificate = activeGroup.certificates[currentCertIndex] || activeGroup.frontCert;
  const displayedGroups = showAll ? groupedCertificates : groupedCertificates.slice(0, 6);

  return (
    <section ref={sectionRef} id="certificates" className="py-8 px-4 bg-muted/30 relative overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: 'transparent' }}
      />

      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certificates Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGroups.map((group, index) => {
            const isStack = group.certificates.length > 1;
            const certificate = group.frontCert;
            return (
              <Dialog key={group.id} onOpenChange={(isOpen) => {
                if (!isOpen) setActiveGroupId(null);
              }}>
                <DialogTrigger asChild>
                  <div
                    className={`cursor-pointer group relative ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.1}s`, perspective: '1000px' }}
                    onClick={() => openDialog(group.id)}
                  >
                    {/* Background Stack Cards - realistic paper stack */}
                    {isStack && group.certificates.length >= 3 && (
                      <div
                        className="absolute inset-0 rounded-xl overflow-hidden z-0 transition-all duration-500 ease-out group-hover:opacity-90"
                        style={{
                          transform: 'rotate(-4.5deg) translateY(-18px) translateX(6px) scale(0.94)',
                          transformOrigin: 'center bottom',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1)',
                          opacity: 0.7,
                        }}
                      >
                        <img
                          src={group.certificates[2]?.image || group.certificates[0].image}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-background/40 dark:bg-background/50 backdrop-blur-[2px] rounded-xl border-2 border-border/40" />
                      </div>
                    )}
                    {isStack && (
                      <div
                        className="absolute inset-0 rounded-xl overflow-hidden z-[1] transition-all duration-500 ease-out group-hover:opacity-95"
                        style={{
                          transform: 'rotate(3deg) translateY(-10px) translateX(-4px) scale(0.97)',
                          transformOrigin: 'center bottom',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1)',
                          opacity: 0.8,
                        }}
                      >
                        <img
                          src={group.certificates[1]?.image || group.certificates[0].image}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-background/30 dark:bg-background/40 backdrop-blur-[1px] rounded-xl border-2 border-border/50" />
                      </div>
                    )}

                    <Card
                      className="group-hover:translate-y-[-6px] group-hover:shadow-2xl transition-all duration-500 ease-out overflow-visible border-border bg-card h-full flex flex-col relative z-10"
                      style={{ boxShadow: isStack ? '0 10px 30px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.08)' : undefined }}
                    >
                      {isStack && (
                        <div className="absolute -top-3.5 -right-3.5 z-30 flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1.5 rounded-full shadow-[0_4px_14px_hsl(210_100%_55%/0.5)] border-[2.5px] border-background transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_20px_hsl(210_100%_55%/0.65)] justify-center">
                          <Layers className="h-3.5 w-3.5" />
                          <span>{group.certificates.length}</span>
                        </div>
                      )}
                      {/* Lottie Animation Badge */}
                      {certificate.featured && (
                        <div className="absolute -top-6 -left-6 z-20">
                          <Player
                            src="/icons/Verified Badge.json"
                            className="w-16 h-16"
                            loop
                            autoplay
                            speed={0.8}
                          />
                        </div>
                      )}

                      {/* صورة مع fallback */}
                      <div className="relative h-64 overflow-hidden bg-muted/50 flex-shrink-0">
                        {!imageErrors[certificate.id] && loadedImages[certificate.id] ? (
                          <img
                            src={certificate.image}
                            alt={certificate.title}
                            className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                            loading="lazy"
                            onError={() => handleImageError(certificate.id)}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30 text-muted-foreground">
                            <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                            <span className="text-sm">جاري تحميل الصورة...</span>
                          </div>
                        )}

                        {/* View Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-gray-900/40 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-700/50">
                            <Eye className="h-4 w-4 text-white" />
                            <span className="text-sm font-medium text-white">View</span>
                          </div>
                        </div>
                      </div>

                      {/* محتوى الكارد */}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-start gap-3 mb-4 flex-1">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 leading-tight">
                              {certificate.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {certificate.institution}
                            </p>
                          </div>
                        </div>

                        {/* التاريخ والـ Credential ID والزر */}
                        <div className="pt-4 border-t border-border mt-auto space-y-2">
                          {/* التاريخ والزر في نفس الصف */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span>{certificate.date}</span>
                            </div>

                            {/* زر View Certificate */}
                            {certificate.link && (
                              <Button
                                size="sm"
                                className={`h-7 px-3 gap-1 text-xs ${buttonStyle}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(certificate.link, '_blank');
                                }}
                              >
                                <ExternalLink className="h-3 w-3" />
                                View
                              </Button>
                            )}
                          </div>

                          {/* الـ Credential ID تحت التاريخ */}
                          {certificate.credentialId && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Hash className="h-3 w-3 flex-shrink-0" />
                              <span>ID: {certificate.credentialId}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </DialogTrigger>

                {/* Dialog مع navigation */}
                <DialogContent
                  className="max-w-5xl max-h-[95vh] md:max-h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl flex flex-col touch-auto [&>button]:top-3 [&>button]:right-3 md:[&>button]:top-6 md:[&>button]:right-6 [&>button]:bg-background/80 [&>button]:backdrop-blur-md [&>button]:p-2 [&>button]:rounded-full [&>button]:border [&>button]:border-border [&>button]:shadow-md [&>button]:w-10 [&>button]:h-10 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:z-50"
                  style={{ touchAction: 'auto' }}
                >
                  {/* Header - compact on mobile */}
                  <div className="p-4 pt-14 md:p-8 md:pt-8 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5 flex-shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 md:mb-3 line-clamp-2">
                          {currentCertificate.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 md:gap-6 text-sm md:text-base text-muted-foreground">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <Award className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                            <span className="truncate">{currentCertificate.institution}</span>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                            <span>{currentCertificate.date}</span>
                          </div>
                          {currentCertificate.credentialId && (
                            <div className="flex items-center gap-1.5 md:gap-2">
                              <Hash className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                              <span className="truncate">ID: {currentCertificate.credentialId}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* زر View Certificate */}
                      {currentCertificate.link && (
                        <Button
                          className={`${buttonStyle} flex-shrink-0`}
                          size="sm"
                          onClick={() => window.open(currentCertificate.link, '_blank')}
                        >
                          View Certificate
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* الصورة مع أزرار التنقل والصور المصغرة */}
                  <div className="relative flex flex-col md:flex-row flex-1 min-h-0 bg-gradient-to-br from-muted/20 to-background/50 overflow-hidden">

                    {/* منطقة الصورة الرئيسية */}
                    <div
                      className="flex-1 relative flex items-center justify-center p-4 md:p-8 min-h-0 overflow-auto touch-auto"
                      style={{ touchAction: 'auto' }}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                    >
                      {/* زر السابق */}
                      {activeGroup.certificates.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground"
                          onClick={() => navigateCertificate('prev')}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                      )}

                      {/* الصورة مع fallback */}
                      {!imageErrors[currentCertificate.id] ? (
                        <img
                          src={currentCertificate.image}
                          alt={currentCertificate.title}
                          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-border/30"
                          onError={() => handleImageError(currentCertificate.id)}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                          <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
                          <p className="text-lg text-muted-foreground mb-2">تعذر تحميل الصورة</p>
                          <p className="text-sm text-muted-foreground">الرجاء التحقق من اتصال الإنترنت</p>
                        </div>
                      )}

                      {/* زر التالي */}
                      {activeGroup.certificates.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground"
                          onClick={() => navigateCertificate('next')}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                      )}

                      {/* مؤشر الصفحة */}
                      {activeGroup.certificates.length > 1 && (
                        <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 border border-border text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                          {currentCertIndex + 1} / {activeGroup.certificates.length}
                        </div>
                      )}
                    </div>

                    {/* الصور المصغرة (Thumbnails) */}
                    {activeGroup.certificates.length > 1 && (
                      <div
                        className="flex-shrink-0 w-full md:w-36 lg:w-48 border-t md:border-t-0 md:border-l border-border/50 bg-background/30 backdrop-blur-md p-2 md:p-4 overflow-x-auto md:overflow-y-auto flex flex-row md:flex-col gap-2 md:gap-4 z-10"
                        style={{ scrollbarWidth: 'thin' }}
                      >
                        {activeGroup.certificates.map((cert, idx) => (
                          <div
                            key={cert.id}
                            onClick={() => setCurrentCertIndex(idx)}
                            className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden h-16 w-24 md:w-full md:h-24 lg:h-32 transition-all duration-300 border-2 ${idx === currentCertIndex
                              ? 'border-primary shadow-[0_0_12px_rgba(59,130,246,0.6)] scale-100 ring-2 ring-primary/20'
                              : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105 hover:border-border'
                              }`}
                          >
                            {!imageErrors[cert.id] ? (
                              <img
                                src={cert.image}
                                alt={cert.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted">
                                <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                              </div>
                            )}

                            {/* رقم الشهادة في الكارد المصغر */}
                            <div className="absolute bottom-1 right-1 bg-background/80 backdrop-blur-sm rounded text-[10px] font-medium px-1.5 py-0.5 text-foreground">
                              {idx + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>

        {/* HackerRank Badges Section */}
        <div className={`mt-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <img
                src="/Certificates/hackerrank/logo-new-dark-green-a5cb16e0ae.svg"
                alt="HackerRank"
                className="h-8 md:h-10 dark:hidden object-contain"
              />
              <img
                src="/Certificates/hackerrank/logo-new-white-green-a5cb16e0ae.svg"
                alt="HackerRank"
                className="h-8 md:h-10 hidden dark:block object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground">Skill verification from HackerRank</p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            <a
              href="https://www.hackerrank.com/profile/MaherQC"
              target="_blank"
              rel="noopener noreferrer"
              className="group/badge relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-400 hover:scale-110 hover:bg-[#2EC866]/10 hover:border-[#2EC866]/40 hover:shadow-[0_0_30px_rgba(46,200,102,0.15)] cursor-pointer"
              title="View HackerRank Profile"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2EC866]/0 to-[#2EC866]/0 group-hover/badge:from-[#2EC866]/5 group-hover/badge:to-[#2EC866]/10 transition-all duration-400" />

              <div className="relative">
                <img
                  src="/Certificates/hackerrank/C Badge.png"
                  alt="HackerRank C Language Badge"
                  className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-lg group-hover/badge:drop-shadow-[0_0_16px_rgba(46,200,102,0.5)] transition-all duration-400"
                />
              </div>
              <div className="relative text-center">
                <span className="font-semibold text-sm text-foreground group-hover/badge:text-[#2EC866] transition-colors duration-300">C Language</span>
                <div className="flex items-center gap-1 justify-center mt-1 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="h-3 w-3 text-[#2EC866]" />
                  <span className="text-xs text-[#2EC866]">View Profile</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* زر Show More / Show Less */}
        {groupedCertificates.length > 6 && (
          <div className="text-center mt-12">
            <Button
              className={`${buttonStyle} px-8 py-3 text-lg`}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'Show More'} Certificates
            </Button>
          </div>
        )}
      </div>

      {/* إضافة أنميشن الـ shine في الـ CSS */}
      <style jsx>{`
        @keyframes shine {
          0% {
            left: -75%;
          }
          100% {
            left: 125%;
          }
        }
      `}</style>
    </section>
  );
};

export default CertificatesGallery;