import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const summaries = [
  {
    id: 1,
    title: "ISTQB FL V4.0",
    description: "Comprehensive overview of testing principles, methodologies, and best practices.",
    image: "/ISTQB FL Summary.jpg",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7347600961898475520/?updateEntityUrn=urn%3Ali%3Afs_feedUpdate%3A%28V2%2Curn%3Ali%3Aactivity%3A7347600961898475520%29",
  },
  {
    id: 2,
    title: "ISTQB MAT V1",
    description: "Advanced techniques for implementing effective automated testing frameworks.",
    image: "/MAT Mocup.png",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7372632879018717184/?updateEntityUrn=urn%3Ali%3Afs_feedUpdate%3A%28V2%2Curn%3Ali%3Aactivity%3A7372632879018717184%29",
  },
  {
    id: 3,
    title: "Part one Embedded Systems",
    description: "Testing strategies and approaches in Agile development environments.",
    image: "/Part One Embedded.jpg",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7209553266966245376/?updateEntityUrn=urn%3Ali%3Afs_feedUpdate%3A%28V2%2Curn%3Ali%3Aactivity%3A7209553266966245376%29",
  },
];

const SummariesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="summaries" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">My Summaries</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Knowledge sharing through detailed technical summaries and guides
          </p>
        </div>

        {/* عمود واحد فقط */}
        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {summaries.map((summary, index) => (
            <Dialog key={summary.id}>
              <DialogTrigger asChild>
                <Card
                  className={`group overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-all duration-500 cursor-pointer ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* الصورة - أكبر وواضحة */}
                    <div className="relative lg:w-1/2 h-80 lg:h-96 bg-muted/50 overflow-hidden flex-shrink-0">
                      <img
                        src={summary.image}
                        alt={summary.title}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* المحتوى */}
                    <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {summary.title}
                          </h3>
                        </div>
                        
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                          {summary.description}
                        </p>
                      </div>

                      {/* زر LinkedIn */}
                      {summary.link && summary.link !== "#" && (
                        <a
                          href={summary.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            className="relative w-full gap-3 text-white font-medium text-base py-3
                              bg-gradient-to-r 
                              from-[hsl(var(--gradient-start))] 
                              via-[hsl(var(--gradient-mid))] 
                              to-[hsl(var(--gradient-end))] 
                              overflow-hidden
                              shadow-[0_0_15px_hsl(var(--gradient-mid)/0.6)] 
                              dark:shadow-[0_0_20px_hsl(var(--gradient-mid)/0.5)] 
                              transition-all duration-500 
                              hover:scale-[1.02] hover:brightness-110
                              before:absolute before:top-0 before:left-[-75%] 
                              before:w-[50%] before:h-full 
                              before:bg-gradient-to-tr before:from-white/40 before:to-white/5
                              before:skew-x-[-20deg]
                              before:animate-none
                              hover:before:animate-[shine_1.2s_ease-in-out_forwards]
                              before:rounded-[inherit]"
                          >
                            View on LinkedIn
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </DialogTrigger>

              {/* Dialog للصورة */}
              <DialogContent className="max-w-6xl p-0 overflow-hidden bg-background">
                <div className="p-8 border-b border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {summary.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {summary.description}
                  </p>
                </div>
                <div className="p-8 max-h-[80vh] overflow-auto flex items-center justify-center">
                  <img
                    src={summary.image}
                    alt={summary.title}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                  />
                </div>
                {summary.link && summary.link !== "#" && (
                  <div className="p-8 border-t border-border flex justify-center">
                    <a
                      href={summary.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-sm"
                    >
                      <Button
                        className="w-full gap-3 text-white font-medium text-base py-3
                          bg-gradient-to-r 
                          from-[hsl(var(--gradient-start))] 
                          via-[hsl(var(--gradient-mid))] 
                          to-[hsl(var(--gradient-end))] 
                          hover:brightness-110 transition-all duration-300"
                      >
                        View on LinkedIn
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummariesSection;