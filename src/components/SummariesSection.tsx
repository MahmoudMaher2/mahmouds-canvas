import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const summaries = [
  {
    id: 1,
    title: "ISTQB FL V4.0",
    description: "A complete summary of the ISTQB syllabus, including clear explanations and practice questions.Based on materials and sessions from Eng. Rania Mokhtar and Eng. Tarek Rushdy.",
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
              <Card
                className={`group overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-all duration-500 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* الصورة - أكبر وواضحة */}
                  <div className="relative lg:w-1/2 h-80 lg:h-96 bg-muted/50 overflow-hidden flex-shrink-0">
                    <DialogTrigger asChild>
                      <button className="w-full h-full cursor-pointer">
                        <img
                          src={summary.image}
                          alt={summary.title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </button>
                    </DialogTrigger>
                  </div>

                  {/* المحتوى */}
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                        <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-lg lg:rounded-xl flex items-center justify-center">
                          <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                          {summary.title}
                        </h3>
                      </div>
                      
                      <p className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
                        {summary.description}
                      </p>
                    </div>

                    {/* زر Open PDF - بره زي ما كان */}
                    {summary.link && summary.link !== "#" && (
                      <Button
                        className={`${buttonStyle} w-full gap-2 py-3`}
                        onClick={() => window.open(summary.link, '_blank')}
                      >
                        Open PDF
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Dialog زى الـ Certificates Gallery */}
              <DialogContent className="max-w-full w-full h-full max-h-screen m-0 p-0 overflow-hidden bg-background">
                {/* Header مع زر Open PDF - responsive */}
                <div className="p-4 lg:p-6 border-b border-border bg-background/95 backdrop-blur-sm">
                  <div className="container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                        {summary.title}
                      </h3>
                      <p className="text-sm lg:text-base text-muted-foreground">
                        {summary.description}
                      </p>
                    </div>
                    {summary.link && summary.link !== "#" && (
                      <div className="flex justify-center lg:justify-start">
                        <Button
                          className={`${buttonStyle} w-full lg:w-auto px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base`}
                          onClick={() => window.open(summary.link, '_blank')}
                        >
                          <span className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Open PDF
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* الصورة تاخد كل المساحة */}
                <div className="flex-1 overflow-auto bg-muted/10">
                  <div className="min-h-full flex items-center justify-center p-4 lg:p-8">
                    <img
                      src={summary.image}
                      alt={summary.title}
                      className="max-w-full max-h-full object-contain rounded-lg lg:rounded-xl shadow-lg lg:shadow-2xl"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummariesSection;
