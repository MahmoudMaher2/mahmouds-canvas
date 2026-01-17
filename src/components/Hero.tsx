import { Button } from "@/components/ui/button";
import { Download, Mail, FolderOpen, FileText, ArrowRight } from "lucide-react";
import { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const primaryButtonStyle = `
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

  const secondaryButtonStyle = `
    relative gap-2 font-medium 
    bg-background border-2 border-border
    text-foreground
    overflow-hidden
    transition-all duration-500 
    hover:scale-[1.02] hover:bg-blue-600 hover:text-white hover:border-blue-600
    before:absolute before:top-0 before:left-[-75%] 
    before:w-[50%] before:h-full 
    before:bg-gradient-to-tr before:from-white/30 before:to-white/10
    before:skew-x-[-20deg]
    before:animate-none
    hover:before:animate-[shine_1.5s_ease-in-out_forwards]
    before:rounded-[inherit]
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // دالة لكشف الوضع الحالي
    const isDarkMode = () => {
      return document.documentElement.classList.contains('dark');
    };

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class - حواف حادة وألوان مختلفة للوضعين
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
        this.size = Math.random() * 60 + 40;

        // حركة بطيئة
        this.speedX = Math.random() * 0.1 - 0.05;
        this.speedY = Math.random() * 0.1 - 0.05;

        // ألوان مختلفة لـ Dark و Light mode
        const darkModeColors = [
          'rgba(59, 130, 246, 0.4)',   // أزرق غامق
          'rgba(139, 92, 246, 0.4)',   // بنفسجي
          'rgba(14, 165, 233, 0.4)',   // سايان
          'rgba(99, 102, 241, 0.4)',   // إنديجو
        ];

        const lightModeColors = [
          'rgba(37, 99, 235, 0.3)',    // أزرق فاتح
          'rgba(124, 58, 237, 0.3)',   // بنفسجي فاتح
          'rgba(2, 132, 199, 0.3)',    // سايان فاتح
          'rgba(79, 70, 229, 0.3)',    // إنديجو فاتح
        ];

        const colors = darkMode ? darkModeColors : lightModeColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.opacity = Math.random() * 0.3 + 0.2;
        this.originalX = this.x;
        this.originalY = this.y;
        this.angle = Math.random() * Math.PI * 2;
        this.amplitude = Math.random() * 80 + 40;
        this.frequency = Math.random() * 0.002 + 0.001;
        this.shapeType = Math.floor(Math.random() * 3); // 0: مستطيل, 1: مثلث, 2: دائرة
      }

      update() {
        // حركة موجة
        this.angle += this.frequency;
        this.x = this.originalX + Math.cos(this.angle) * this.amplitude;
        this.y = this.originalY + Math.sin(this.angle * 0.7) * this.amplitude;

        // حركة خطية
        this.x += this.speedX;
        this.y += this.speedY;

        // إعادة الظهور
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
      }

      draw() {
        if (!ctx) return;

        // حواف حادة - بدون تدرج
        ctx.fillStyle = this.color;

        // بدون shadow أو glow - حواف حادة
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // رسم أشكال هندسية مختلفة
        ctx.beginPath();

        switch (this.shapeType) {
          case 0:
            // مثلث
            ctx.moveTo(this.x, this.y - this.size / 2);
            ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
            ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
            ctx.closePath();
            break;
          case 1:
            // دائرة (بحواف حادة)
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            break;
        }

        ctx.fill();
      }

      // دالة لتحديث اللون عند تغيير الوضع
      updateColor(darkMode: boolean) {
        const darkModeColors = [
          'rgba(59, 130, 246, 0.4)',
          'rgba(139, 92, 246, 0.4)',
          'rgba(14, 165, 233, 0.4)',
          'rgba(99, 102, 241, 0.4)',
        ];

        const lightModeColors = [
          'rgba(37, 99, 235, 0.3)',
          'rgba(124, 58, 237, 0.3)',
          'rgba(2, 132, 199, 0.3)',
          'rgba(79, 70, 229, 0.3)',
        ];

        const colors = darkMode ? darkModeColors : lightModeColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 9;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(isDarkMode()));
    }

    // دالة لتحديث ألوان الparticles عند تغيير الوضع
    const updateColors = () => {
      const darkMode = isDarkMode();
      particles.forEach(particle => {
        particle.updateColor(darkMode);
      });
    };

    // استمع لتغيير الوضع
    const observer = new MutationObserver(() => {
      updateColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // مسح الشاشة بخلفية شفافة
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

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 relative overflow-hidden"
    >
      {/* الخلفية بالأشكال ذات الحواف الحادة */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'transparent',
        }}
      />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-20" />

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Image */}
          <div className="inline-block animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl opacity-40 animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse-glow" />
              <img
                src="/Mahmoud Maher.jpg"
                alt="Mahmoud Maher"
                className="
                  relative w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72
                  rounded-full mx-auto border-4 border-primary/20 shadow-2xl object-cover
                  ring-4 ring-primary/10 animate-float
                  transition-all duration-500
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]
                  hover:ring-[rgba(59,130,246,0.5)]
                "
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="gradient-text">Mahmoud Maher</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
              Software Test Engineer
            </p>
          </div>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            A Passionate Software Tester who loves ensuring Quality and Sharing Knowledge With Others.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("summaries")}
              className={primaryButtonStyle}
            >
              <FileText className="h-5 w-5" />
              View Summaries
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className={primaryButtonStyle}
            >
              <FolderOpen className="h-5 w-5" />
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className={secondaryButtonStyle}
            >
              <Mail className="h-5 w-5" />
              Reach Me
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              className={secondaryButtonStyle}
              asChild
            >
              <a href="https://drive.google.com/file/d/1oBGsPkvEQ9EYh2duBztZzVcyobKDwANi/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                <Download className="h-5 w-5" />
                Download My Resume
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;