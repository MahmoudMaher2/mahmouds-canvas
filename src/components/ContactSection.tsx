import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const ContactSection = () => {
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

  const contactLinks = [
    {
      label: "LinkedIn",
      data: "mahmoud-maher74",
      href: "https://www.linkedin.com/in/mahmoud-maher74/",
      icon: "/linkedin.gif",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      buttonColor: "bg-cyan-600 hover:bg-cyan-700"
    },
    {
      label: "GitHub", 
      data: "MahmoudMaher2",
      href: "https://github.com/MahmoudMaher2",
      icon: "/Github.gif",
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      buttonColor: "bg-gray-700 hover:bg-gray-800"
    },
    {
      label: "WhatsApp",
      data: "+201140121877",
      href: "https://wa.me/201140121877",
      icon: "/whatsapp loop.gif",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      label: "Email",
      data: "mahmoudmaher2033@gmail.com",
      href: "mailto:mahmoudmaher2033@gmail.com",
      icon: "/Email successfully sent.gif",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reach out to me through any of these platforms
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {contactLinks.map((link, index) => (
            <Card 
              key={link.label}
              className={`card-hover border-2 ${link.borderColor} transition-all duration-300 hover:shadow-lg bg-background/70 backdrop-blur-sm h-full flex flex-col`}
            >
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex flex-col items-center text-center gap-4 flex-1">
                  {/* أيقونة كبيرة */}
                  <div className={`p-6 rounded-2xl ${link.bgColor} transition-transform duration-300 hover:scale-110`}>
                    <img 
                      src={link.icon} 
                      alt={link.label}
                      className="h-16 w-16 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {/* المحتوى */}
                  <div className="flex-1 w-full flex flex-col justify-center">
                    <h3 className="font-semibold text-lg text-foreground mb-3">
                      {link.label}
                    </h3>
                    <p className="text-muted-foreground text-sm px-3 py-2 rounded-lg break-words bg-muted/30">
                      {link.data}
                    </p>
                  </div>

                  {/* زر الإجراء مع تأثير الرفليكشن */}
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="w-full mt-auto"
                  >
                    <Button 
                      size="sm" 
                      className={`w-full gap-3 transition-all duration-300 text-white ${link.buttonColor} 
                        relative overflow-hidden group
                        shadow-lg hover:shadow-xl hover:scale-105
                        border-0
                      `}
                    >
                      {/* تأثير الرفليكشن */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      {/* أيقونة الزر */}
                      <img 
                        src={link.label} 
                        alt=""
                        className="h-5 w-5 object-contain filter brightness-0 invert"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      {/* نص الزر */}
                      <span className="relative z-10">
                        {link.label === "Email" ? "Send Email" : 
                         link.label === "WhatsApp" ? "Chat Now" : 
                         `Visit ${link.label}`}
                      </span>
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;