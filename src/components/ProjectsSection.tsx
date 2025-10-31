import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play, FileText, Building, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Player } from '@lottiefiles/react-lottie-player';

const projects = [
  {
    id: 1,
    title: "HerokuApp Automation Project",
    description: "Implemented an automation testing project for the Heroku App website using IntelliJ IDEA. Employed both TestNG and Cucumber frameworks to design and execute automated test cases, ensuring functionality and reliability of the web application.",
    image: "/projects/1-HerokuApp.png",
    technologies: ["Selenium", "Java", "TestNG", "Maven", "Cucumber"],
    links: {
      github: "https://github.com/MahmoudMaher2/HerokuApp-Test-CucumberDemo",
      live:  "https://the-internet.herokuapp.com/login",
      video: null,
      sheet: null
    },
    companies: [    
      {
        name: "DEPI",      
        logo: "/company/DEPI.jpg",
        linkedin: "https://www.linkedin.com/company/digital-egypt-pioneers-initiative-depi/"
      }
    ],
    type: "automation",
  },
  {
    id: 2,
    title: "Talent Kid Website",
    description: "Tested the demo version of the Talent Kid platform, focusing on validating core functionalities and user interface elements. Conducted functional and UI testing to ensure that the prototype behaved as intended and provided a smooth, consistent user experience.",
    image: "/projects/4-talentkid.png",
    technologies: ["Test Cases", "Bug Reporting"],
    links: {        live:  "https://talentkid.sa/"    },
    companies: [    
      {
        name: "Pixbyte",      
        logo: "/company/pixbyte.jpg",
        linkedin: "https://www.linkedin.com/company/pixbyteco/"
      }
    ],
    type: "manual"
  },
  {
    id: 3,
    title: "OpenCart Automation Graduation Project",
    description: "Developed an automation testing project for the AwesomeQA website using IntelliJ IDEA. Utilized the Cucumber framework to design and execute 30 automated test cases, ensuring the functionality and reliability of the web application. Additionally, generated comprehensive Extent Reports in multiple formats, including HTML, PDF, and screenshots, to document the test results.",
    image: "/projects/2-opencart.png",
    technologies: ["Selenium", "Java", "TestNG", "Maven", "Cucumber", "POM" , "BDD" ,"Extent Report"],
    links: {
      github: "https://github.com/MohanadWael1/depi_grad",
      live:  "https://awesomeqa.com/ui/index.php?route=common/home",
      video: "https://www.linkedin.com/posts/mahmoud-maher74_finally-im-proud-to-present-my-graduation-activity-7253842698674077696-2VlK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC8ZR_4Bc4J1qHvjF8JxJ4jD4p9JZ5jHZ5o",
      sheet: null
    },
    companies: [    
      {
        name: "DEPI",      
        logo: "/company/DEPI.jpg",
        linkedin: "https://www.linkedin.com/company/digital-egypt-pioneers-initiative-depi/"
      }
    ],
    type: "automation",
    featured: true
  },
  {
    id: 4,
    title: "More English LMS Website",
    description: "Performed functional testing on the More English website, focusing on validating user roles and permissions, including access levels and feature restrictions. Tested the comments and admin reply features on videos to ensure proper interaction and visibility. Also verified the exams and assignments modules, including text styling, exam validation, retake permissions, and timing controls, to ensure all functionalities worked correctly according to user roles.",
    image: "/projects/6-moreenglish.png",
    technologies: ["Test Cases", "Bug Reporting"],
    links: {        live:  "https://www.more-english.net/"    },
    companies: [    
      {
        name: "Pixbyte",      
        logo: "/company/pixbyte.jpg",
        linkedin: "https://www.linkedin.com/company/pixbyteco/"
      }
    ],
    type: "manual"
  },
  {
    id: 5,
    title: "Buggy Cars Rating Website",
    description: "Performed comprehensive manual testing on the Buggy Cars Rating website as part of my graduation project at Algoriza. Conducted exploratory testing to identify and document functional, UI, and usability bugs across different modules. All findings and defect details were reported and tracked using Google Sheets to ensure clear and consistent bug documentation.",
    image: "/projects/8-carbug.png",
    technologies: ["Bug Reporting"],
    links: {
      live: "https://www.google.com/url?q=https://buggy.justtestit.org/&sa=D&source=editors&ust=1760294632664285&usg=AOvVaw22QYBbvcfufo2AO-jIMCii",
      sheet: "https://docs.google.com/spreadsheets/d/16z0K46qpXTb7D1H0J-6YdgoM-NOvQJUngjk8GNHqTx8/edit?gid=1454934651#gid=1454934651"
    },
    companies: [    
      {
        name: "Algoriza",      
        logo: "/company/AZM1.jpg",
        linkedin: "https://www.linkedin.com/company/algoriza"
      },
      {
        name: "AZM Squad",      
        logo: "/company/AZM1.jpg",
        linkedin: "https://www.linkedin.com/company/azmsquad"
      }
    ],
    type: "manual"
  },
  {
    id: 6,
    title: "Dorra print Website",
    description: "Performed in-depth functional and UI testing on the custom-built design editor (canvas) within the Dorra Print platform. The editor was developed from scratch to function similarly to tools like Canva or Photoshop. My testing covered all available tools, features, and keyboard shortcuts, ensuring correct behavior, responsiveness, and smooth user experience across different scenarios. I validated text, shapes, layers, alignment tools, undo/redo actions, drag-and-drop functionality, and export options. Leveraging my background as a graphic designer, I was able to test the system with a user-centered perspective, ensuring both usability and precision in the editor's performance.",
    image: "/projects/5-dorraprint.png",
    technologies: ["Test Cases", "Bug Reporting"],
    links: {        live:  "https://dorraprint.com/"    },
    companies: [    
      {
        name: "Pixbyte",      
        logo: "/company/pixbyte.jpg",
        linkedin: "https://www.linkedin.com/company/pixbyteco/"
      }
    ],
    type: "manual",
    featured: true
  },
  {
    id: 7,
    title: "The Pass AI Exams & Interviews Website",
    description: "Participated in a testing bootcamp organized by Algoriza in collaboration with The Pass. The challenge involved performing exploratory testing on The Pass website within a limited time frame of 10 hours to identify valid functional and UI bugs. The discovered issues were documented in a structured Google Sheet based on predefined topics provided by the organizers, focusing on bug details and categorization rather than writing full bug reports.",
    image: "/projects/7-thepass.png",
    technologies: ["Bug Reporting"],
    links: {
      live:   "https://thepass.sa/",
      sheet:  "https://docs.google.com/spreadsheets/d/1MnLzrbhaqGlrnLQUAqv0Bon7R8JdlXFNx2lQGJBnyiA/edit?usp=drive_link"
    },
    companies: [    
      {
        name: "Algoriza",      
        logo: "/company/AZM1.jpg",
        linkedin: "https://www.linkedin.com/company/algoriza"
      },
      {
        name: "AZM Squad",      
        logo: "/company/AZM1.jpg",
        linkedin: "https://www.linkedin.com/company/azmsquad"
      }
    ],
    type: "manual",
    featured: true
  },
  {
    id: 8,
    title: "Penguin LMS Website",
    description: "Performed extensive testing on the Penguin educational platform, focusing heavily on the payment and discount systems. Tested multiple pricing scenarios, coupon rules, and course-specific discount logic to ensure accurate calculations before and after applying offers. Conducted backend API testing to validate the discount and coupon logic, followed by frontend testing to confirm proper integration and accurate user experience. Validated edge cases such as overlapping discounts, expired coupons, and dynamic price updates across different user roles. Also tested the WhatsApp integration and the live sessions feature, which included a custom-built platform inside the website with integration to Zoom. Tested the switching between both systems to ensure stable connectivity and smooth user experience. For the teacher role, I verified functionalities added from the admin side such as creating and correcting exams, managing sessions, and accessing the dashboard. This project was one of the most challenging, requiring detailed analysis and precise validation across multiple integrated systems.",
    image: "/projects/3-penguin.png",
    technologies: ["Test Cases", "Bug Reporting", "API Testing", "Hoppscotch"],
    links: {        live:  "https://penguin.com.sa/"    },
    companies: [    
      {
        name: "Pixbyte",      
        logo: "/company/pixbyte.jpg",
        linkedin: "https://www.linkedin.com/company/pixbyteco/"
      }
    ],
    type: "manual",
    featured: true
  },
  {
    id: 9,
    title: "CartLow E-Commerce Website",
    description: "Developed a complete automation testing framework for CartLow's e-commerce platform as part of my graduation project at Algoriza. The project involved creating and executing manual test cases for selected pages, reporting discovered bugs, and implementing automated test scenarios using Selenium WebDriver. The framework was built following the BDD approach and implemented using the Page Object Model (POM) design pattern, with Maven for dependency management and GitHub for version control.",
    image: "/projects/9-cartlow.png",
    technologies: ["Test Cases", "Bug Reporting","Selenium", "Java", "TestNG", "Maven", "Cucumber", "POM" , "BDD"],
    links: {
      github: "https://github.com/MahmoudMaher2/CartLow-Automation-Project",
      live:   "https://cartlow.com/intl/en.",
      video: "https://www.linkedin.com/posts/mahmoud-maher74_excited-to-share-a-new-milestone-in-my-activity-7383410436710236160-_47v?utm_source=share&utm_medium=member_desktop&rcm=ACoAADfONi4B0pCCpxdTkwSiJuxyKYmXLylhGv0",
      sheet: "https://docs.google.com/spreadsheets/d/16z0K46qpXTb7D1H0J-6YdgoM-NOvQJUngjk8GNHqTx8/edit?gid=239239246#gid=239239246"
    },
    companies: [    
      {
        name: "Algoriza",      
        logo: "/company/AZM1.jpg",
        linkedin: "https://www.linkedin.com/company/algoriza"
      },
      {
        name: "AZM Squad",      
        logo: "/company/AZM1.jpg",
        linkedin: "https://www.linkedin.com/company/azmsquad"
      }
    ],
    type: ["automation", "manual"],
    featured: true
  }
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // زر View All Projects بنفس الاستايل
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

  // عرض آخر 4 مشاريع (الأحدث) أو كل المشاريع
  const displayedProjects = showAllProjects 
    ? projects.slice().reverse() 
    : projects.slice(-4).reverse();

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'Java': 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20 dark:border-red-500/30',
      'Selenium': 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20 dark:border-green-500/30',
      'TestNG': 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 dark:border-blue-500/30',
      'Maven': 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20 dark:border-yellow-500/30',
      'Cucumber': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 dark:border-emerald-500/30',
      'POM': 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20 dark:border-indigo-500/30',
      'BDD': 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20 dark:border-teal-500/30',
      'Extent Report': 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20 dark:border-rose-500/30',
      'Test Cases': 'bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20 dark:border-pink-500/30',
      'Bug Reporting': 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20 dark:border-rose-500/30',
      'API Testing': 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20 dark:border-orange-500/30',
      'Hoppscotch': 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 dark:border-blue-500/30',
    };
    
    return colors[tech] || 'bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20 dark:border-gray-500/30';
  };

  const getTypeStyle = (type: string) => {
    const typeConfig: { [key: string]: { label: string, gradient: string } } = {
      'automation': { 
        label: 'Automation', 
        gradient: 'from-emerald-500 to-emerald-600' 
      },
      'manual': { 
        label: 'Manual', 
        gradient: 'from-blue-500 to-blue-600' 
      },
      'mobile': { 
        label: 'Mobile', 
        gradient: 'from-purple-500 to-purple-600' 
      },
      'api': { 
        label: 'API', 
        gradient: 'from-orange-500 to-orange-600' 
      }
    };
    
    return typeConfig[type] || { 
      label: type, 
      gradient: 'from-gray-500 to-gray-600' 
    };
  };

  const getDualTypeStyle = (types: string[]) => {
    const typeConfig: { [key: string]: { label: string, gradient: string } } = {
      'automation': { 
        label: 'Automation', 
        gradient: 'from-emerald-500 to-emerald-600' 
      },
      'manual': { 
        label: 'Manual', 
        gradient: 'from-blue-500 to-blue-600' 
      },
      'mobile': { 
        label: 'Mobile', 
        gradient: 'from-purple-500 to-purple-600' 
      },
      'api': { 
        label: 'API', 
        gradient: 'from-orange-500 to-orange-600' 
      }
    };

    return types.map(type => typeConfig[type] || { 
      label: type, 
      gradient: 'from-gray-500 to-gray-600' 
    });
  };

  const renderAllLinks = (links: typeof projects[0]['links']) => {
    const availableLinks = [];
    
    if (links.video) availableLinks.push({
      icon: <Play className="h-4 w-4" />,
      label: "Watch Demo",
      tooltip: "Watch project demo video",
      onClick: () => window.open(links.video, '_blank'),
      className: "hover:bg-purple-50 dark:hover:bg-purple-950"
    });
    
    if (links.live) availableLinks.push({
      icon: <ExternalLink className="h-4 w-4" />,
      label: "View Live",
      tooltip: "live website",
      onClick: () => window.open(links.live, '_blank'),
      className: "hover:bg-green-50 dark:hover:bg-green-950"
    });
    
    if (links.sheet) availableLinks.push({
      icon: <FileText className="h-4 w-4" />,
      label: "Test Cases",
      tooltip: "View sheet",
      onClick: () => window.open(links.sheet, '_blank'),
      className: "hover:bg-orange-50 dark:hover:bg-orange-950"
    });
    
    if (links.github) availableLinks.push({
      icon: <Github className="h-4 w-4" />,
      label: "View Code",
      tooltip: "GitHub",
      onClick: () => window.open(links.github, '_blank'),
      className: "hover:bg-blue-50 dark:hover:bg-blue-950"
    });

    return availableLinks;
  };

  return (
    <section ref={sectionRef} id="projects" className="py-8 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A look into my journey in software testing and how each project shaped my skills
          </p>
        </div>

        {/* عرض المشاريع */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {displayedProjects.map((project, index) => {
            const typeStyle = getTypeStyle(project.type);
            const allLinks = renderAllLinks(project.links);
            
            return (
              <Card
                key={project.id}
                className={`group overflow-visible hover:shadow-xl hover:border-primary/30 transition-all duration-300 border-border bg-card relative aspect-auto h-auto ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Lottie Animation Badge */}
                {project.featured && (
                  <div className="absolute -top-10 -left-10 z-20">
                    <Player
                      src="/icons/star1.json"
                      className="w-28 h-28"
                      loop
                      autoplay
                      speed={0.8}
                    />
                  </div>
                )}

                {/* Dual Type Ribbons */}
                <div className="absolute -top-1 -right-1 flex flex-col gap-1 z-10">
                  {Array.isArray(project.type) 
                    ? getDualTypeStyle(project.type).map((typeStyle, idx) => (
                        <div 
                          key={idx}
                          className={`bg-gradient-to-r ${typeStyle.gradient} text-white px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-lg`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wide">
                            {typeStyle.label}
                          </span>
                        </div>
                      ))
                    : (
                      <div className={`bg-gradient-to-r ${typeStyle.gradient} text-white px-4 py-1 rounded-bl-lg rounded-tr-lg shadow-lg`}>
                        <span className="text-xs font-bold uppercase tracking-wide">
                          {typeStyle.label}
                        </span>
                      </div>
                    )
                  }
                </div>

                {/* Project Image */}
                <div className="relative w-full overflow-hidden bg-muted/30">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-contain transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-transparent" />
                </div>

                {/* المحتوى */}
                <CardContent className="p-6">
                  {/* Header with Company Logo */}
                  <div className="flex items-center gap-3 mb-4">
                    {project.companies[0].logo ? (
                      <img 
                        src={project.companies[0].logo} 
                        alt={project.companies[0].name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        with {" "}
                        {project.companies.map((company, companyIdx) => (
                          <span key={company.name}>
                            <a 
                              href={company.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:text-blue-700 underline underline-offset-2 transition-colors"
                            >
                              {company.name}
                            </a>
                            {companyIdx < project.companies.length - 1 && " & "}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <CardDescription className="text-base mb-4">
                    {project.description}
                  </CardDescription>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium ${getTechColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    {/* Main Action Button */}
                    {allLinks.length > 0 && (
                      <Button 
                        className={`${buttonStyle} flex-1 gap-2`}
                        onClick={allLinks[0].onClick}
                      >
                        {allLinks[0].icon}
                        {allLinks[0].label}
                      </Button>
                    )}

                    {/* Additional Links */}
                    {allLinks.length > 1 && (
                      <TooltipProvider>
                        <div className="flex gap-1">
                          {allLinks.slice(1).map((link, idx) => (
                            <Tooltip key={idx}>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={link.onClick}
                                  className={link.className}
                                >
                                  {link.icon}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{link.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </TooltipProvider>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* زر View All Projects - يظهر دائماً إذا كان هناك أكثر من 4 مشاريع */}
        {projects.length > 4 && (
          <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <Button 
              className={`${buttonStyle} px-8 py-3 text-lg`}
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${showAllProjects ? 'rotate-180' : ''}`} />
              {showAllProjects ? 'Show Less' : `View All Projects (${projects.length - 4} more)`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;