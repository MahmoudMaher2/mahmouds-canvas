import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play, FileText, Building, ChevronDown, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Player } from '@lottiefiles/react-lottie-player';

const projects = [
  {
    id: 1,
    title: "HerokuApp Automation Project",
    description: "My first hands-on automation testing project, built to apply core automation fundamentals on The Internet (Heroku App) demo site. Designed and executed automated test cases using the TestNG and Cucumber frameworks in IntelliJ IDEA, covering key functional flows and laying the foundation for the automation skills used in later projects.",
    image: "/projects/1-HerokuApp.png",
    technologies: ["Selenium", "Java", "TestNG", "Maven", "Cucumber"],
    links: {
      github: "https://github.com/MahmoudMaher2/HerokuApp-Test-CucumberDemo",
      live: "https://the-internet.herokuapp.com/login",
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
    description: "Tested the demo version of the Talent Kid platform — a landing page paired with an admin dashboard for managing course data. Conducted functional and UI testing on a straightforward but business-critical flow, verifying that data entered through the dashboard reflected correctly and consistently on the public-facing pages.",
    image: "/projects/4-talentkid.png",
    technologies: ["Test Cases", "Bug Reporting"],
    links: { live: "https://talentkid.sa/" },
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
    description: "Graduation project for the DEPI (Digital Egypt Pioneers Initiative) program, built in a 3-person team for the AwesomeQA e-commerce platform. Of 15 automated test scenarios split across the team, owned and implemented 5 end-to-end using the Cucumber framework with the Page Object Model (POM), and collaborated closely with teammates to debug shared blockers. Generated comprehensive Extent Reports in HTML, PDF, and screenshot formats to document results.",
    image: "/projects/2-opencart.png",
    technologies: ["Selenium", "Java", "TestNG", "Maven", "Cucumber", "POM", "BDD", "Extent Report"],
    links: {
      github: "https://github.com/MohanadWael1/depi_grad",
      live: "https://awesomeqa.com/ui/index.php?route=common/home",
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
    type: ["automation", "Team Project"],
    featured: true
  },
  {
    id: 4,
    title: "More English LMS Website",
    description: "Returned to a previously tested LMS platform to validate two major additions: a role-based permissions system (access levels and feature restrictions) and a rebuilt examination engine covering text styling, exam validation, retake permissions, and timing controls. Also tested a new video-comments feature supporting student-to-admin replies. Identified and reported 56 bugs across these modules through structured functional testing.",
    image: "/projects/6-moreenglish.png",
    technologies: ["Test Cases", "Bug Reporting"],
    links: { live: "https://www.more-english.net/" },
    bugCount: 56,
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
    description: "Performed exploratory testing on the Buggy Cars Rating website during the AZM Squad/AZM Squad internship, identifying 15 functional, UI, and usability bugs across multiple modules within a defined testing window. All findings were documented and tracked in Google Sheets for clear, consistent defect reporting.",
    image: "/projects/8-carbug.png",
    technologies: ["Bug Reporting", "Exploratory Testing"],
    links: {
      live: "https://buggy.justtestit.org/",
      sheet: "https://docs.google.com/spreadsheets/d/16z0K46qpXTb7D1H0J-6YdgoM-NOvQJUngjk8GNHqTx8/edit?gid=1454934651#gid=1454934651"
    },
    bugCount: 15,
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
    title: "Dorra Print Website",
    description: "Owned functional and UI testing for Dorra Print's custom-built design editor — a from-scratch canvas tool comparable to Canva or Photoshop. Tested every available tool, feature, and keyboard shortcut, validating text, shapes, layers, alignment, undo/redo, drag-and-drop, and export behavior across multiple scenarios. A graphic design background brought a user-centered testing perspective beyond pure functional checks. Identified 100 bugs throughout the editor, making this one of the most demanding manual testing assignments to date.",
    image: "/projects/5-dorraprint.png",
    technologies: ["Test Cases", "Bug Reporting", "Exploratory Testing"],
    links: { live: "https://dorraprint.com/" },
    bugCount: 100,
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
    description: "Took on a fast-paced testing challenge during the AZM Squad x The Pass bootcamp: exploratory testing of an AI-powered interview platform, where an AI model conducts full live interview conversations with candidates. Within a strict 10-hour window, identified and documented 11 valid functional and UI bugs in a structured Google Sheet organized by predefined categories — testing under time pressure on a non-traditional, AI-driven product.",
    image: "/projects/7-thepass.png",
    technologies: ["Bug Reporting"],
    links: {
      live: "https://thepass.sa/",
      sheet: "https://docs.google.com/spreadsheets/d/1MnLzrbhaqGlrnLQUAqv0Bon7R8JdlXFNx2lQGJBnyiA/edit?usp=drive_link"
    },
    bugCount: 11,
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
    description: "One of the most demanding projects at Pixbyte, covering the full payment and discount system for an educational platform. Tested complex pricing logic — including cart-value-triggered discounts and different rules for individually purchased versus bundled courses — validating backend calculations through API testing in Hoppscotch and frontend behavior across multiple pricing scenarios. Covered edge cases such as overlapping discounts, expired coupons, and dynamic price updates across user roles. Validated a WhatsApp integration and a dual live-session system supporting both Zoom and a custom-built in-house meeting platform, including the switch between them. For the teacher role, verified exam creation/correction, session management, and dashboard access. Identified and reported 160 bugs across these modules.",
    image: "/projects/3-penguin.png",
    technologies: ["Test Cases", "Bug Reporting", "API Testing", "Hoppscotch"],
    links: { live: "https://penguin.com.sa/" },
    bugCount: 160,
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
    technologies: ["Test Cases", "Bug Reporting", "Selenium", "Java", "TestNG", "Maven", "Cucumber", "POM", "BDD"],
    links: {
      github: "https://github.com/MahmoudMaher2/CartLow-Automation-Project",
      live: "https://cartlow.com/intl/en.",
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
  },
  {
    id: 10,
    title: "SECU Security",
    description: "Executed comprehensive testing for the Secu platform, covering the Web Dashboard, Mobile Apps (iOS & Android), and backend APIs. I performed extensive API testing to validate business logic, response codes, and data accuracy independent of the user interface. The scope included validating all functional and UI requirements, alongside rigorous performance testing to ensure data integrity and system stability during high-concurrency user scenarios.",
    image: "/projects/10- SECU3.png",
    technologies: ["Test Cases", "Bug Reporting", "API Testing", "Performance Testing", "Mobile Testing"],
    links: {
      appStore: "https://apps.apple.com/sa/app/secu-security/id6503944413?l=ar",
      playStore: "https://play.google.com/store/apps/details?id=secu.sa&hl=en",
    },
    companies: [
      {
        name: "Neop",
        logo: "/company/neop.png",
        linkedin: "https://www.linkedin.com/company/neopksa"
      }
    ],
    type: ["manual", "mobile", "api", "performance"],
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
      'Performance Testing': 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20 dark:border-rose-500/30',
      'Mobile Testing': 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20 dark:border-purple-500/30',
      'Manual Testing': 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 dark:border-blue-500/30',
      'Exploratory Testing': 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 dark:border-amber-500/30',
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
      },
      'performance': {
        label: 'Performance',
        gradient: 'from-rose-500 to-rose-600'
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
      },
      'performance': {
        label: 'Performance',
        gradient: 'from-rose-500 to-rose-600'
      }
    };

    return types.map(type => typeConfig[type] || {
      label: type,
      gradient: 'from-gray-500 to-gray-600'
    });
  };

  const renderAllLinks = (links: (typeof projects)[number]['links']) => {
    const availableLinks = [];

    if (links.video) availableLinks.push({
      icon: <Play className="h-4 w-4" />,
      label: "Watch Demo",
      tooltip: "Watch project demo video",
      onClick: () => window.open(links.video, '_blank'),
      className: "text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950 hover:text-purple-600 dark:hover:text-purple-300 hover:border-purple-300"
    });

    if (links.live) availableLinks.push({
      icon: <ExternalLink className="h-4 w-4" />,
      label: "View Live",
      tooltip: "live website",
      onClick: () => window.open(links.live, '_blank'),
      className: "text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-950 hover:text-green-600 dark:hover:text-green-300 hover:border-green-300"
    });

    if (links.sheet) availableLinks.push({
      icon: <FileText className="h-4 w-4" />,
      label: "Test Cases",
      tooltip: "View sheet",
      onClick: () => window.open(links.sheet, '_blank'),
      className: "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950 hover:text-orange-600 dark:hover:text-orange-300 hover:border-orange-300"
    });

    if (links.github) availableLinks.push({
      icon: <Github className="h-4 w-4" />,
      label: "View Code",
      tooltip: "GitHub",
      onClick: () => window.open(links.github, '_blank'),
      className: "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-300 hover:border-blue-300"
    });

    // Smart App Store detection
    if (links.appStore || links.playStore) {
      const handleAppStoreClick = () => {
        const userAgent = navigator.userAgent || navigator.vendor;

        // Check if iOS
        if (/iPad|iPhone|iPod/.test(userAgent)) {
          if (links.appStore) window.open(links.appStore, '_blank');
          else if (links.playStore) window.open(links.playStore, '_blank');
        }
        // Check if Android
        else if (/android/i.test(userAgent)) {
          if (links.playStore) window.open(links.playStore, '_blank');
          else if (links.appStore) window.open(links.appStore, '_blank');
        }
        // Desktop - open Play Store by default or show both
        else {
          if (links.playStore) window.open(links.playStore, '_blank');
          else if (links.appStore) window.open(links.appStore, '_blank');
        }
      };

      availableLinks.push({
        icon: <Smartphone className="h-4 w-4" />,
        label: "Download App",
        tooltip: "Get the mobile app",
        onClick: handleAppStoreClick,
        className: "text-gray-600 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-950 hover:text-violet-600 dark:hover:text-violet-300 hover:border-violet-300"
      });
    }

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
            const typeStyle = getTypeStyle(Array.isArray(project.type) ? project.type[0] : project.type);
            const allLinks = renderAllLinks(project.links);

            return (
              <Card
                key={project.id}
                className={`group overflow-visible hover:shadow-xl hover:border-primary/30 transition-all duration-300 border-border bg-card relative flex flex-col ${isVisible ? "animate-fade-in-up" : "opacity-0"
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
                <CardContent className="p-6 flex flex-col flex-1">
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
                  <CardDescription className="text-base mb-4 flex-1">
                    {project.description}
                  </CardDescription>

                  {/* Technologies + Bug Badge */}
                  <div className="flex flex-wrap gap-2 mb-3 mt-auto">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium ${getTechColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {/* Bug count badge */}
                    {"bugCount" in project && project.bugCount && (
                      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-bold
                        bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25
                        ring-1 ring-red-500/20 shadow-sm">
                        🐛 {project.bugCount} bugs found
                      </span>
                    )}
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