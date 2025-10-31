import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, User, LinkIcon, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Player } from '@lottiefiles/react-lottie-player';

const summaries = [
  {
    id: 1,
    title: "ISTQB FL V4.0",
    description: "Comprehensive ISTQB Foundation Level (FL) V4.0 syllabus summary with clear explanations and practice questions from sample exams.",
    image: "/Summaries/ISTQB FL Summary.jpg",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7347600961898475520/",
    mentions: [
      {
        name: "Eng. Rania Mokhtar",
        profileLink: "https://www.linkedin.com/in/rania-mokhtar-268a07178/"
      },
      {
        name: "Eng. Tarek Rushdy", 
        profileLink: "https://www.linkedin.com/in/tarekroshdy/"
      }
    ],
    references: [
      {
        title: "ISTQB Official Syllabus",
        url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/"
      },
      {
        title: "ISTQB V4.0 By Eng. Rania Mokhtar",
        url: "https://www.youtube.com/playlist?list=PL594OqWI4Um7Uk6utSPMBoMqTd7odsSr_"
      },
      {
        title: "ISTQB V4.0 By Eng. Tarek Rushdy",
        url: "https://www.udemy.com/course/foundation-level-training/"
      }
    ],
    featured: false
  },
  {
    id: 2,
    title: "ISTQB FL V4.0 Sample Exams Questions",
    description: "A compiled collection of ISTQB Foundation Level v4.0 sample exam questions gathered from official sample exams. The file includes only the questions without answers, designed to help learners practice and assess their understanding of ISTQB concepts.",
    image: "/Summaries/ISTQB FL Q.png",
    link: "https://drive.google.com/file/d/1ARIhlWtDtsbzEpLdSuxieutx2wiqnHad/view?usp=drive_link",
    references: [
      {
        title: "ISTQB Official Sample Exams",
        url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/"
      }
    ]
  },
  {
    id: 3,
    title: "ISTQB MAT V1",
    description: "Comprehensive ISTQB Mobile Application Testing (MAT) syllabus summary with clear explanations and practice questions from sample exams.",
    image: "/Summaries/MAT Mocup.png",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7372632879018717184/",
    mentions: [
      {
        name: "Eng. Rania Mokhtar",
        profileLink: "https://www.linkedin.com/in/rania-mokhtar-268a07178/"
      },
      {
        name: "Eng. Tarek Rushdy", 
        profileLink: "https://www.linkedin.com/in/tarekroshdy/"
      }
    ],
    references: [
      {
        title: "ISTQB Official Syllabus",
        url: "https://istqb.org/certifications/certified-tester-mobile-application-testing-ct-mat/"
      },
      {
        title: "ISTQB MAT By Eng. Rania Mokhtar",
        url: "https://www.youtube.com/playlist?list=PL594OqWI4Um7A4MHHeQoRL6AquHHovTUi"
      },
      {
        title: "ISTQB V4.0 By Eng. Tarek Rushdy",
        url: "https://www.udemy.com/course/istqb-mobile-tester/?couponCode=ACCAGE0923"
      }
    ],
    featured: false
  },
  {
    id: 4,
    title: "Part one Embedded Systems",
    description: "Part one of an Embedded Systems Diploma often focuses on Master C programming, Data Structures, and Algorithms.",
    image: "/Summaries/Part One Embedded.jpg",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7209553266966245376/",
    mentions: [
      {
        name: "Eng. Ahmed Abd ElGhafar",
        profileLink: "https://www.linkedin.com/in/ahmedabdelghafarmohammed/"
      }
    ],
    references: [
      {
        title: "Embedded Systems Diploma",
        url: "https://www.linkedin.com/in/ahmedabdelghafarmohammed"
      }
    ],
    featured: false
  },  {
    id: 5,
    title: "All My Collage Summaries",
    description: "A complete collection of my college summaries, including detailed explanations, compiled past exams, and organized law sheets. These materials were created to simplify studying, connect key concepts, and provide a quick and reliable reference for revision.",
    image: "/Summaries/Mockup Collage.png",
    link: "https://drive.google.com/drive/folders/1RjEORkCR185KXsl782pHt38dE_GbN0Xs?usp=drive_link",
    mentions: [
      {
        name: "Sameh El-Domyate",
        profileLink: "https://www.linkedin.com/in/sameh-eldomyate-/"
      }
    ],
    featured: false
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

  const referenceButtonStyle = `
    relative gap-2 text-white font-medium 
    bg-gradient-to-r 
    from-emerald-700 via-emerald-600 to-emerald-500
    overflow-hidden
    shadow-[0_0_8px_rgba(5,150,105,0.4)] 
    dark:shadow-[0_0_12px_rgba(5,150,105,0.3)] 
    transition-all duration-500 
    hover:scale-[1.02] hover:brightness-105
    before:absolute before:top-0 before:left-[-75%] 
    before:w-[50%] before:h-full 
    before:bg-gradient-to-tr before:from-white/30 before:to-white/10
    before:skew-x-[-40deg]
    before:animate-none
    hover:before:animate-[shine_1.2s_ease-in-out_forwards]
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

  const renderDescriptionWithMentions = (description: string, mentions: typeof summaries[0]['mentions']) => {
    let processedDescription = description;
    
    mentions?.forEach(mention => {
      const mentionRegex = new RegExp(mention.name, 'g');
      processedDescription = processedDescription.replace(
        mentionRegex, 
        `<a href="${mention.profileLink}" target="_blank" rel="noopener noreferrer" class="font-bold text-primary hover:text-blue-700 underline underline-offset-2 transition-colors">${mention.name}</a>`
      );
    });

    return <div dangerouslySetInnerHTML={{ __html: processedDescription }} />;
  };

  return (
    <section ref={sectionRef} id="summaries" className="py-8 px-2 bg-muted/30">
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">My Summaries</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Knowledge sharing through detailed technical summaries and guides
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {summaries.map((summary, index) => (
            <Dialog key={summary.id}>
              <Card
                className={`group overflow-visible hover:shadow-xl hover:scale-[1.01] transition-all duration-500 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Lottie Animation Badge */}
                {summary.featured && (
                  <div className="absolute -top-10 -left-5 z-20">
                    <Player
                      src="/star3.json"
                      className="w-28 h-28"
                      loop
                      autoplay
                      speed={0.8}
                    />
                  </div>
                )}

                <div className="flex flex-col lg:flex-row">
                  {/* الصورة */}
                  <div className="relative lg:w-1/2 h-80 lg:h-96 bg-muted/50 overflow-hidden flex-shrink-0">
                    <DialogTrigger asChild>
                      <button className="w-full h-full cursor-pointer relative">
                        <img
                          src={summary.image}
                          alt={summary.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* View Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <div className="flex items-center gap-2 text-white">
                            <Eye className="h-6 w-6" />
                            <span className="text-lg font-semibold">View</span>
                          </div>
                        </div>
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
                      
                      <div className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
                        {renderDescriptionWithMentions(summary.description, summary.mentions)}
                      </div>

                      {summary.mentions && summary.mentions.length > 0 && (
                        <div className="mb-4 lg:mb-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">Special Thanks:</span>
                          </div>
                           <div className="flex flex-wrap gap-2">
                              {summary.mentions.map((mention, idx) => (
                                <a
                                  key={idx}
                                  href={mention.profileLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative gap-2 font-medium 
                                            bg-gradient-to-r 
                                            from-purple-900/20 via-purple-800/20 to-purple-700/20
                                            text-purple-700 dark:text-purple-300
                                            border border-purple-500/50
                                            overflow-hidden
                                            shadow-[0_0_6px_rgba(147,51,234,0.3)] 
                                            dark:shadow-[0_0_10px_rgba(147,51,234,0.2)] 
                                            transition-all duration-500 
                                            hover:scale-[1.05] hover:brightness-110
                                            hover:bg-gradient-to-r hover:from-purple-900/30 hover:via-purple-800/30 hover:to-purple-700/30
                                            hover:border-purple-400
                                            hover:text-purple-800 dark:hover:text-purple-200
                                            before:absolute before:top-0 before:left-[-75%] 
                                            before:w-[50%] before:h-full 
                                            before:bg-gradient-to-tr before:from-purple-300/40 before:to-purple-200/20
                                            dark:before:from-white/30 dark:before:to-white/10
                                            before:skew-x-[-10deg]
                                            before:animate-none
                                            hover:before:animate-[shine_1.0s_ease-in-out_forwards]
                                            before:rounded-[inherit]
                                            inline-flex items-center px-3 py-2 rounded-full text-sm"
                                >
                                  <User className="h-3 w-3" />
                                  {mention.name}
                                </a>
                              ))}
                            </div>
                        </div>
                      )}
                    </div>

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

              {/* Dialog */}
              <DialogContent className="max-w-full w-full h-full max-h-screen m-0 p-0 overflow-hidden bg-background">
                <div className="p-4 lg:p-6 border-b border-border bg-background/95 backdrop-blur-sm">
                  <div className="container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                        {summary.title}
                      </h3>
                      <div className="text-sm lg:text-base text-muted-foreground">
                        {renderDescriptionWithMentions(summary.description, summary.mentions)}
                      </div>
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

                <div className="flex-1 overflow-auto bg-muted/10">
                  <div className="min-h-full flex flex-col lg:flex-row">
                    <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
                      <img
                        src={summary.image}
                        alt={summary.title}
                        className="max-w-full max-h-full object-contain rounded-lg lg:rounded-xl shadow-lg lg:shadow-2xl"
                      />
                    </div>

                    {(summary.references && summary.references.length > 0) && (
                      <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-background/50 backdrop-blur-sm">
                        <div className="p-4 lg:p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <LinkIcon className="h-5 w-5 text-primary" />
                            <h4 className="font-bold text-lg text-foreground">References</h4>
                          </div>
                          
                          <div className="space-y-3">
                            {summary.references.map((reference, idx) => (
                              <Button
                              className={`${referenceButtonStyle} w-full justify-start p-4 h-auto`}
                              onClick={() => window.open(reference.url, '_blank')}
                            >
                              <div className="flex items-center gap-3 text-left w-full">
                                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                                <span className="text-sm font-medium flex-1 break-words whitespace-normal">
                                  {reference.title}
                                </span>
                              </div>
                            </Button>
                            ))}
                          </div>
                          {summary.mentions && summary.mentions.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-border">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                <User className="h-4 w-4" />
                                <span className="font-medium">Special Thanks</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {summary.mentions.map((mention, idx) => (
                                  <a
                                    key={idx}
                                    href={mention.profileLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative gap-2 font-medium 
                                            bg-gradient-to-r 
                                            from-purple-900/20 via-purple-800/20 to-purple-700/20
                                            text-purple-700 dark:text-purple-300
                                            border border-purple-500/50
                                            overflow-hidden
                                            shadow-[0_0_6px_rgba(147,51,234,0.3)] 
                                            dark:shadow-[0_0_10px_rgba(147,51,234,0.2)] 
                                            transition-all duration-500 
                                            hover:scale-[1.05] hover:brightness-110
                                            hover:bg-gradient-to-r hover:from-purple-900/30 hover:via-purple-800/30 hover:to-purple-700/30
                                            hover:border-purple-400
                                            hover:text-purple-800 dark:hover:text-purple-200
                                            before:absolute before:top-0 before:left-[-75%] 
                                            before:w-[50%] before:h-full 
                                            before:bg-gradient-to-tr before:from-purple-300/40 before:to-purple-200/20
                                            dark:before:from-white/30 dark:before:to-white/10
                                            before:skew-x-[-10deg]
                                            before:animate-none
                                            hover:before:animate-[shine_1.0s_ease-in-out_forwards]
                                            before:rounded-[inherit]
                                            inline-flex items-center px-3 py-2 rounded-full text-sm"
                                >
                                  <User className="h-3 w-3" />
                                    {mention.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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