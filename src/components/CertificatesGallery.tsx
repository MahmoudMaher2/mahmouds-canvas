import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award, Calendar, Eye } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "ISTQB Foundation Level V4.0",
    image: "/Certificates/ISTQB FL Certificate.jpg",
    institution: "International Software Testing Qualifications Board",
    date: "June 2025",
  },
  {
    id: 2,
    title: "ISTQB MAT Mobile Application Testing V1.0",
    image: "/Certificates/certificate.png",
    institution: "International Software Testing Qualifications Board", 
    date: "Sep 2025",
  },
  {
    id: 3,
    title: "Java Programming Test Automation Bootcamp Level 1",
    image: "/Certificates/Java Programming Test Automation Bootcamp Level 1 nezam.jpg",
    institution: "Nezam Academy",
    date: "Sep 2025",
  },
  {
    id: 4,
    title: "ISTQB Mobile Application Testing Course",
    image: "/Certificates/ISTQB Mobile Application Testing - Become a Mobile Tester.jpg",
    institution: "International Software Testing Qualifications Board",
    date: "2024",
  },
  {
    id: 5,
    title: "Digital Egypt Pioneers Initiative [DEPI] Round One",
    image: "/Certificates/Certificate DEPI R1 Mahmoud Maher Khater Abdel Razek.jpg",
    institution: "Digital Egypt",
    date: "2023",
  },
  {
    id: 6,
    title: "Digital Egypt Pioneers Initiative [DEPI] Business English Track",
    image: "/Certificates/Certificate DEPI R1 MAHMOUD MAHER KHATER .jpg",
    institution: "Digital Egypt",
    date: "2023",
  },
  {
    id: 7,
    title: "ISTQB Foundation Level",
    image: "/Certificates/ISTQB Foundation Level.png",
    institution: "International Software Testing Qualifications Board",
    date: "2024",
  },
  {
    id: 8,
    title: "Introduction to Software Testing Concepts & Techniques",
    image: "/Certificates/Introduction to Software Testing Concepts & Techniques.png",
    institution: "Testing Training Institute",
    date: "2023",
  },
  {
    id: 9,
    title: "Effective Test Case and Bug Report Writing Techniques",
    image: "/Certificates/Effective Test Case and Bug Report Writing Techniques.png",
    institution: "Testing Training Institute",
    date: "2023",
  },
  {
    id: 10,
    title: "C Programming From Basics to Mastery",
    image: "/Certificates/C Programming From Basics to Mastery.png",
    institution: "Programming Academy", 
    date: "2023",
  },
  {
    id: 11,
    title: "Mastering Object-Oriented Programming (OOP) using C++",
    image: "/Certificates/Mastering Object-Oriented Programming (OOP) using C++.png",
    institution: "Programming Academy",
    date: "2023",
  },
  {
    id: 12,
    title: "Database Fundamentals",
    image: "/Certificates/Database Fundamentals.png",
    institution: "Tech Training Center",
    date: "2023",
  },
  {
    id: 13,
    title: "Part One Embedded Systems Diploma",
    image: "/Certificates/Part 1 certification_Page_1.jpg",
    institution: "Embedded Systems Institute",
    date: "2023",
  },
  {
    id: 14,
    title: "Smart Environment Hackathon",
    image: "/Certificates/Smart Environment Hackathon Certificate.jpg",
    institution: "Innovation Hub",
    date: "2023",
  },
];

const CertificatesGallery = () => {
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
          {certificates.map((certificate, index) => (
            <Dialog key={certificate.id}>
              <DialogTrigger asChild>
                <Card
                  className={`cursor-pointer group hover:scale-105 transition-all duration-300 overflow-hidden border-border bg-card h-full flex flex-col ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* صورة مع hover effect */}
                  <div className="relative h-64 overflow-hidden bg-muted/50 flex-shrink-0">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* View Overlay - خلفية شفافة رمادية */}
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

                    {/* التاريخ فقط - بدون location */}
                    <div className="pt-4 border-t border-border mt-auto">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{certificate.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              
              {/* Dialog شفاف ومودرن */}
              <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl">
                <div className="p-8 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {certificate.title}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-base text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span>{certificate.institution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>{certificate.date}</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 max-h-[75vh] overflow-auto flex items-center justify-center bg-gradient-to-br from-muted/20 to-background/50">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-border/30"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesGallery;