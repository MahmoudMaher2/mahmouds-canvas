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

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class - معدل علشان يبقى زي الموقع تماماً
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
      sizePulse: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 80 + 40; // دوائر كبيرة من 40 إلى 120 بكسل
        this.speedX = Math.random() * 0.1 - 0.05; // حركة بطيئة جداً
        this.speedY = Math.random() * 0.1 - 0.05;
        
        // ألوان فاتحة من درجات الأزرق - تناسب Dark & Light mode
        const colors = [
          'rgba(59, 130, 246, 0.1)',   // Blue-500 very light
          'rgba(96, 165, 250, 0.08)',  // Blue-400 very light  
          'rgba(147, 197, 253, 0.06)', // Blue-300 very light
          'rgba(191, 219, 254, 0.04)', // Blue-200 very light
          'rgba(219, 234, 254, 0.03)', // Blue-100 very light
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.opacity = Math.random() * 0.15 + 0.05; // شفافية منخفضة
        this.originalX = this.x;
        this.originalY = this.y;
        this.angle = Math.random() * Math.PI * 2;
        this.amplitude = Math.random() * 100 + 50; // مدى حركة واسع
        this.frequency = Math.random() * 0.002 + 0.001; // تردد بطيء
        this.sizePulse = 0;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        // حركة موجة بطيئة وسلسة
        this.angle += this.frequency;
        this.x = this.originalX + Math.cos(this.angle) * this.amplitude;
        this.y = this.originalY + Math.sin(this.angle * 0.7) * this.amplitude;

        // حركة خطية بطيئة جداً
        this.x += this.speedX;
        this.y += this.speedY;

        // تأثير نبض للحجم
        this.sizePulse += this.pulseSpeed;
        const pulseSize = Math.sin(this.sizePulse) * 5; // تغيير بسيط في الحجم

        // إعادة الظهور من الجهة المقابلة
        if (this.x < -200) this.x = canvas.width + 200;
        if (this.x > canvas.width + 200) this.x = -200;
        if (this.y < -200) this.y = canvas.height + 200;
        if (this.y > canvas.height + 200) this.y = -200;
      }

      draw() {
        if (!ctx) return;
        
        // تأثير تدرج ناعم للدوائر
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        gradient.addColorStop(0, this.color.replace('0.1', '0.15').replace('0.08', '0.12').replace('0.06', '0.09').replace('0.04', '0.06').replace('0.03', '0.05'));
        gradient.addColorStop(0.7, this.color);
        gradient.addColorStop(1, this.color.replace('0.1', '0.0').replace('0.08', '0.0').replace('0.06', '0.0').replace('0.04', '0.0').replace('0.03', '0.0'));
        
        ctx.fillStyle = gradient;
        
        // تأثير glow خفيف جداً
        ctx.shadowColor = this.color.includes('59, 130, 246') ? 'rgba(59, 130, 246, 0.3)' : 
                         this.color.includes('96, 165, 250') ? 'rgba(96, 165, 250, 0.2)' :
                         'rgba(147, 197, 253, 0.1)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles - 12 دائرة كبيرة
    const particles: Particle[] = [];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

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
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 relative overflow-hidden"
    >
      {/* الدوائر المتحركة المعدلة */}
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
              <a href="/Mahmoud Maher's Resume.pdf" download>
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