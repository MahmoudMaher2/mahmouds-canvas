import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "ISTQB Foundation Level",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=350&fit=crop",
  },
  {
    id: 2,
    title: "Software Testing Certification",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=350&fit=crop",
  },
  {
    id: 3,
    title: "Agile Testing Practices",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop",
  },
  {
    id: 4,
    title: "Test Automation Certificate",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=350&fit=crop",
  },
  {
    id: 5,
    title: "API Testing Specialization",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=350&fit=crop",
  },
  {
    id: 6,
    title: "Performance Testing",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <Dialog key={certificate.id}>
              <DialogTrigger asChild>
                <Card
                  className={`cursor-pointer card-hover overflow-hidden group ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 w-full">
                        <div className="flex items-center gap-2 text-primary mb-2">
                          <Award className="h-5 w-5" />
                          <span className="text-sm font-medium">Certificate</span>
                        </div>
                        <h3 className="font-semibold text-lg">{certificate.title}</h3>
                      </div>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-auto rounded-lg"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesGallery;
