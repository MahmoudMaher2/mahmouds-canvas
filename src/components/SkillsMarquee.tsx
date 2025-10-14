import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "Java", image: "/Skills/java.png" },
  { name: "C", image: "/Skills/C_Programming.png" },
  { name: "SQL", image: "/Skills/sql.png" },
  { name: "IntelliJ IDEA", image: "/Skills/intellij.png" },
  { name: "Postman", image: "/Skills/postman.png" },
  { name: "Hoppscotch", image: "/Skills/hoppscotch.png" },
  { name: "GitHub", image: "/Skills/github.png", darkImage: "/Skills/github-dark.png" },
  { name: "Photoshop", image: "/Skills/Adobe_Photoshop.png" },
  { name: "Illustrator", image: "/Skills/Adobe_Illustrator.png" },
  { name: "Word", image: "/Skills/Word.png" },
  { name: "Excel", image: "/Skills/Excel.png" },
  { name: "PowerPoint", image: "/Skills/Powerpoint.png" },
];

const SkillsMarquee = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // علشان نdetect الـ theme change بدون refresh
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // دالة علشان تcheck الـ theme الحالي
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? "dark" : "light");
    };

    // check الـ theme أول ما component يmount
    checkTheme();

    // MutationObserver علشان نسمع لـ theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
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

  // دالة علشان تجيب الصورة المناسبة حسب الـ theme
  const getSkillImage = (skill: typeof skills[0]) => {
    if (skill.darkImage && theme === "dark") {
      return skill.darkImage;
    }
    return skill.image;
  };

  // Drag functions
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!marqueeRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setHoveredSkill(null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto mb-16">
        <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Expertise & Toolkit</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A quick look at the skills and tools that help me deliver reliable testing results.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Click and drag to scroll • Hover to zoom
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Main marquee container مع drag support */}
        <div 
          ref={marqueeRef}
          className={`flex overflow-x-auto scrollbar-hide py-8 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {/* Auto-scrolling marquee لما مش dragging */}
          {!isDragging && (
            <div className="flex animate-marquee-smooth gap-12 px-8 flex-none">
              {[...skills, ...skills].map((skill, index) => (
                <div
                  key={`${skill.name}-auto-${index}`}
                  className="flex flex-col items-center justify-center min-w-[180px] h-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:z-10 hover:bg-white dark:hover:bg-gray-700 group"
                  style={{
                    transform: hoveredSkill === `${skill.name}-auto-${index}` ? 'scale(1.25)' : 'scale(1)',
                    zIndex: hoveredSkill === `${skill.name}-auto-${index}` ? 20 : 1,
                  }}
                  onMouseEnter={() => setHoveredSkill(`${skill.name}-auto-${index}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="w-16 h-16 mb-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <img
                      src={getSkillImage(skill)}
                      alt={skill.name}
                      className="w-full h-full object-contain transition-all duration-500"
                      key={`${skill.name}-img-${theme}`} // علشان يforce re-render لما الـ theme يتغير
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center';
                        fallback.innerHTML = `<span class="text-white font-bold text-lg">${skill.name.charAt(0)}</span>`;
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                  </div>
                  <span className="text-base font-semibold text-center text-gray-800 dark:text-gray-200 transition-all duration-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Static content for dragging */}
          {isDragging && (
            <div className="flex gap-12 px-8 flex-none">
              {skills.map((skill, index) => (
                <div
                  key={`${skill.name}-drag-${index}`}
                  className="flex flex-col items-center justify-center min-w-[180px] h-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group"
                  onMouseEnter={() => setHoveredSkill(`${skill.name}-drag-${index}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <img
                      src={getSkillImage(skill)}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                      key={`${skill.name}-drag-img-${theme}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center';
                        fallback.innerHTML = `<span class="text-white font-bold text-lg">${skill.name.charAt(0)}</span>`;
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                  </div>
                  <span className="text-base font-semibold text-center text-gray-800 dark:text-gray-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />
      </div>

      {/* إضافة الـ CSS */}
      <style jsx>{`
        @keyframes marquee-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        .animate-marquee-smooth {
          animation: marquee-smooth 40s linear infinite;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default SkillsMarquee;