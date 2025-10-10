import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    title: "API Testing Guide",
    description: "Complete guide to testing RESTful APIs and web services with Postman.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
  },
  {
    id: 4,
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

        {/* الشبكة من عمودين */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {summaries.map((summary, index) => (
            <Card
              key={summary.id}
              className={`group overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-500 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* الصورة */}
              <div className="relative w-full h-[350px] bg-muted overflow-hidden">
                <img
                  src={summary.image}
                  alt={summary.title}
                  className="w-full h-full object-contain md:object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* المحتوى */}
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <FileText className="h-6 w-6 text-primary" />
                  {summary.title}
                </CardTitle>
                <CardDescription className="text-base mt-3 text-muted-foreground">
                  {summary.description}
                </CardDescription>
              </CardHeader>
                <CardFooter className="px-6 pb-6">
                  <a
                    href={summary.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="ghost"
                      className="relative w-full gap-2 text-white font-medium 
                        bg-gradient-to-r 
                        from-[hsl(var(--gradient-start))] 
                        via-[hsl(var(--gradient-mid))] 
                        to-[hsl(var(--gradient-end))] 
                        overflow-hidden
                        shadow-[0_0_10px_hsl(var(--gradient-mid)/0.5)] 
                        dark:shadow-[0_0_14px_hsl(var(--gradient-mid)/0.4)] 
                        transition-all duration-500 
                        hover:scale-[1.03] hover:brightness-110
                        before:absolute before:top-0 before:left-[-75%] 
                        before:w-[50%] before:h-full 
                        before:bg-gradient-to-tr before:from-white/40 before:to-white/5
                        before:skew-x-[-20deg]
                        before:animate-none
                        hover:before:animate-[shine_1.2s_ease-in-out_forwards]
                        before:rounded-[inherit]"
                    >
                      Open PDF
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummariesSection;