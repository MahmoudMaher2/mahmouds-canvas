import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award, Calendar, Eye, ExternalLink, ChevronLeft, ChevronRight, Hash, Image as ImageIcon } from "lucide-react";
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
    image: "/Certificates/certificate.png",
    institution: "International Software Testing Qualifications Board", 
    date: "Sep 2025",
    link: "https://scr.istqb.org/",
    credentialId: "250806035",
    featured: true
  },
  {
    id: 3,
    title: "Java Programming Test Automation Bootcamp Level 1",
    image: "/Certificates/Java Programming Test Automation Bootcamp Level 1 nezam.jpg",
    institution: "Nezam Academy",
    date: "Sep 2025",
    link: null,
    credentialId: null,
    featured: false
  },
  {
    id: 4,
    title: "ISTQB Mobile Application Testing Course",
    image: "/Certificates/ISTQB Mobile Application Testing - Become a Mobile Tester.jpg",
    institution: "Udemy - Tarek Roshdy",
    date: "Aug 2025",
    link: "https://www.udemy.com/certificate/UC-3943a2b4-8649-496b-a70b-0b523a69e990/",
    credentialId: "UC-3943a2b4-8649-496b-a70b-0b523a69e990",
    featured: false
  },
  {
    id: 5,
    title: "Software Testing Internship - DEPI [R1]",
    image: "/Certificates/Certificate DEPI R1 Mahmoud Maher Khater Abdel Razek.jpg",
    institution: "Digital Egypt Pioneers Initiative [DEPI]",
    date: "Oct 2024",
    link: null,
    credentialId: null,
    featured: false
  },
  {
    id: 6,
    title: "Business English - DEPI [R1]",
    image: "/Certificates/Certificate DEPI R1 MAHMOUD MAHER KHATER .jpg",
    institution: "Digital Egypt Pioneers Initiative [DEPI]",
    date: "Oct 2024",
    link: null,
    credentialId: null,
    featured: false
  },
  {
    id: 7,
    title: "Introduction to Software Testing Concepts & Techniques",
    image: "/Certificates/Introduction to Software Testing Concepts & Techniques.png",
    institution: "MaharaTech - ITI",
    date: "May 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=355&downloadown=1",
    credentialId: "9SQbyBz3MU",
    featured: false
  },
  {
    id: 8,
    title: "ISTQB Foundation Level",
    image: "/Certificates/ISTQB Foundation Level.png",
    institution: "MaharaTech - ITI",
    date: "July 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=967&downloadown=1",
    credentialId: "RBIkxEvMEt",
    featured: false
  },
  {
    id: 9,
    title: "Effective Test Case and Bug Report Writing Techniques",
    image: "/Certificates/Effective Test Case and Bug Report Writing Techniques.png",
    institution: "MaharaTech - ITI",
    date: "July 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=970&downloadown=1",
    credentialId: "tQVBfSXdL3",
    featured: false
  },
  {
    id: 10,
    title: "C Programming From Basics to Mastery",
    image: "/Certificates/C Programming From Basics to Mastery.png",
    institution: "MaharaTech - ITI", 
    date: "Sep 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=16004&downloadown=1",
    credentialId: "rkFYlKshGs",
    featured: false
  },
  {
    id: 11,
    title: "Mastering Object-Oriented Programming (OOP) using C++",
    image: "/Certificates/Mastering Object-Oriented Programming.png",
    institution: "MaharaTech - ITI",
    date: "Sep 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=14866&downloadown=1",
    credentialId: "HqHnd1TbOm",
    featured: false
  },
  {
    id: 12,
    title: "Database Fundamentals",
    image: "/Certificates/Database Fundamentals.png",
    institution: "MaharaTech - ITI",
    date: "Sep 2024",
    link: "https://maharatech.gov.eg/mod/customcert/view.php?id=7655&downloadown=1",
    credentialId: "auadg30yKg",
    featured: false
  },
  {
    id: 13,
    title: "Smart Environment Hackathon",
    image: "/Certificates/Smart Environment Hackathon Certificate.jpg",
    institution: "Mansoura university",
    date: "May 2024",
    link: null,
    credentialId: null,
    featured: false
  },
  {
    id: 14,
    title: "Part One Embedded Systems Diploma",
    image: "/Certificates/Part 1 certification_Page_1.jpg",
    institution: "Eng/ Ahmed Abd ElGhafar",
    date: "July 2023",
    link: null,
    credentialId: null,
    featured: false
  },
];

const CertificatesGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [loadedImages, setLoadedImages] = useState<{[key: number]: boolean}>({});
  const sectionRef = useRef<HTMLElement>(null);

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
    const certificatesToLoad = showAll ? certificates : certificates.slice(0, 6);
    
    certificatesToLoad.forEach(certificate => {
      if (!loadedImages[certificate.id] && !imageErrors[certificate.id]) {
        loadImage(certificate);
      }
    });
  }, [showAll]);

  const openDialog = (index: number) => {
    setCurrentCertificateIndex(index);
  };

  const navigateCertificate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentCertificateIndex(prev => 
        prev === 0 ? certificates.length - 1 : prev - 1
      );
    } else {
      setCurrentCertificateIndex(prev => 
        prev === certificates.length - 1 ? 0 : prev + 1
      );
    }
  };

  // معالجة أخطاء الصور
  const handleImageError = (certificateId: number) => {
    setImageErrors(prev => ({ ...prev, [certificateId]: true }));
  };

  // إضافة event listener للأسهم
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateCertificate('prev');
      } else if (e.key === 'ArrowRight') {
        navigateCertificate('next');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentCertificate = certificates[currentCertificateIndex];
  const displayedCertificates = showAll ? certificates : certificates.slice(0, 6);

  return (
    <section ref={sectionRef} id="certificates" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certificates Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCertificates.map((certificate, index) => (
            <Dialog key={certificate.id}>
              <DialogTrigger asChild>
                <Card
                  className={`cursor-pointer group hover:scale-105 transition-all duration-300 overflow-visible border-border bg-card h-full flex flex-col relative ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => openDialog(index)}
                >
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
              </DialogTrigger>
              
              {/* Dialog مع navigation */}
              <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl">
                <div className="p-8 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {currentCertificate.title}
                      </h3>
                      <div className="flex flex-wrap gap-6 text-base text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          <span>{currentCertificate.institution}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span>{currentCertificate.date}</span>
                        </div>
                        {currentCertificate.credentialId && (
                          <div className="flex items-center gap-2">
                            <Hash className="h-5 w-5 text-primary" />
                            <span>ID: {currentCertificate.credentialId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* زر View Certificate */}
                    {currentCertificate.link && (
                      <Button
                        className={buttonStyle}
                        onClick={() => window.open(currentCertificate.link, '_blank')}
                      >
                        View Certificate
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* الصورة مع أزرار التنقل */}
                <div className="relative p-8 max-h-[75vh] overflow-auto flex items-center justify-center bg-gradient-to-br from-muted/20 to-background/50">
                  {/* زر السابق */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground"
                    onClick={() => navigateCertificate('prev')}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground"
                    onClick={() => navigateCertificate('next')}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {/* مؤشر الصفحة */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border text-sm text-muted-foreground">
                    {currentCertificateIndex + 1} / {certificates.length}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* زر Show More / Show Less */}
        {certificates.length > 6 && (
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