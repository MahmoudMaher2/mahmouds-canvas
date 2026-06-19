import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play, FileText, Building, ChevronDown, Smartphone, CheckCircle2, Bug, Zap, ShieldCheck, Users, Map, Bell, BarChart3, FlaskConical, Layers, Code2, GitBranch, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Player } from '@lottiefiles/react-lottie-player';

const projects = [
  {
    id: 1,
    title: "HerokuApp Automation Project",
    description: "My first hands-on automation testing project applying core automation fundamentals on The Internet (Heroku App) demo site.",
    highlights: [
      { icon: "target", text: "My very first automation project — built from scratch to apply the core fundamentals of test automation on a real demo site (The Internet / Heroku App)" },
      { icon: "code", text: "Designed and executed automated test cases using both the TestNG and Cucumber frameworks inside IntelliJ IDEA, learning how each differs in structure and reporting" },
      { icon: "layers", text: "Covered key functional flows across multiple feature modules on the Heroku demo site including login, dynamic elements, file upload/download, and form inputs" },
      { icon: "git", text: "Managed the project with Maven for dependencies and structured the code for readability from day one" },
      { icon: "check", text: "This project established the automation foundation — the patterns, mindset, and toolchain — that directly carried into every automation project that came after" },
    ],
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
    description: "Functional and UI testing for Talent Kid — a landing page with an admin dashboard for managing course data.",
    highlights: [
      { icon: "layers", text: "Tested the full product as a connected system — admin dashboard where course data is entered, and the public landing page where users see it — verifying data consistency end-to-end" },
      { icon: "check", text: "Validated that every data change made through the admin interface reflected correctly, immediately, and consistently on the live public-facing pages" },
      { icon: "shield", text: "Although the scope looked simple on the surface, the business impact was high — any mismatch between backend input and frontend display would directly affect the product's credibility with users" },
      { icon: "flask", text: "Covered functional and UI testing — not just 'does it work' but 'does it look and behave right for the end user'" },
    ],
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
    description: "DEPI graduation project — automation testing for the AwesomeQA e-commerce platform in a 3-person team.",
    highlights: [
      { icon: "users", text: "Graduation project for DEPI (Digital Egypt Pioneers Initiative) — built in a 3-person team testing the AwesomeQA e-commerce platform, with 15 end-to-end automated scenarios split across the team" },
      { icon: "code", text: "Personally owned and fully implemented 5 of the 15 scenarios end-to-end, following the BDD approach using Cucumber and structuring the code with the Page Object Model (POM) for maintainability" },
      { icon: "git", text: "Collaborated closely with teammates to debug shared blockers — some failures were environment-related, some were timing issues, and resolving them together was a key learning experience" },
      { icon: "bar", text: "Generated comprehensive Extent Reports covering all test results in HTML, PDF, and screenshot formats — providing a professional, readable output for documentation and presentation" },
      { icon: "check", text: "This was the first project where I worked as part of an automation team, understanding how to divide ownership, avoid conflicts, and maintain shared code standards" },
    ],
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
    description: "Re-engagement on the More English LMS to validate two major new features — permissions system & a rebuilt exam engine.",
    highlights: [
      { icon: "shield", text: "Returned to a previously tested LMS platform to validate two major new additions — this required understanding the original system deeply before testing the new layers on top of it" },
      { icon: "layers", text: "Role-based permissions system: tested access levels and feature visibility restrictions across different user roles, verifying that each role could only see and do exactly what they were supposed to" },
      { icon: "flask", text: "Rebuilt examination engine: validated every aspect of the new exam flow — text styling inside questions, exam submission rules, score calculation, retake permissions, and timing controls including edge cases like time expiration mid-exam" },
      { icon: "check", text: "New video-comments feature: validated the student-to-admin reply flow, ensuring comments appeared correctly, notifications worked, and the thread stayed consistent across both sides" },
      { icon: "bug", text: "Found and reported 56 bugs through structured functional testing across all three new modules — covering both obvious failures and subtle logic gaps" },
    ],
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
    description: "Exploratory testing challenge on the Buggy Cars Rating site during the Algoriza/AZM Squad internship.",
    highlights: [
      { icon: "zap", text: "Part of the Algoriza/AZM Squad internship program — this was a time-boxed exploratory testing challenge designed to test real skills under pressure with no pre-written test cases" },
      { icon: "target", text: "Used a structured exploratory approach across multiple modules of the Buggy Cars Rating site — covering registration, voting, model pages, and general UI behavior" },
      { icon: "bug", text: "Identified and documented 15 functional, UI, and usability bugs within the defined testing window — ranging from broken validations to inconsistent UI states and misleading error messages" },
      { icon: "check", text: "All findings were logged in a structured Google Sheet with clear severity, steps to reproduce, expected vs. actual results, and environment details — ready for developer handoff" },
    ],
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
    description: "Full functional & UI testing of Dorra Print's custom canvas design editor — a from-scratch tool built like Canva or Photoshop.",
    highlights: [
      { icon: "layers", text: "Dorra Print built a fully custom canvas design editor from scratch — comparable to Canva or Photoshop — and I was responsible for owning the complete functional and UI testing of the entire editor" },
      { icon: "target", text: "Tested every single available tool and feature: text editing, shape tools, layer management, alignment controls, color pickers, undo/redo behavior, keyboard shortcuts, and multi-select operations" },
      { icon: "check", text: "Validated complex interaction patterns including drag-and-drop reordering, element grouping, canvas zoom, export to different formats, and edge cases like overlapping elements or deeply nested layers" },
      { icon: "flask", text: "A graphic design background proved invaluable here — testing went beyond 'does it technically function' to 'does it behave the way a real designer would expect it to', catching UX-level issues that pure functional testing would miss" },
      { icon: "bug", text: "Identified 100 bugs throughout the editor — making this one of the most demanding and detail-intensive manual testing assignments in this portfolio" },
    ],
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
    description: "Speed testing challenge — exploratory testing of an AI-powered interview platform within a strict 10-hour window.",
    highlights: [
      { icon: "zap", text: "Part of the Algoriza x The Pass bootcamp challenge — a strict 10-hour testing window with no pre-written test cases, simulating real-world rapid exploratory testing under genuine time pressure" },
      { icon: "flask", text: "The Pass is an AI-powered platform where an AI model conducts full live interview conversations with candidates in real time — this made it a non-traditional and uniquely challenging product to test, since behavior varied across sessions" },
      { icon: "target", text: "Designed an exploratory test strategy on the fly — prioritizing high-risk areas like the AI conversation flow, question delivery, timer behavior, candidate recording, and result submission within the time constraint" },
      { icon: "bug", text: "Identified and documented 11 valid functional and UI bugs under real time pressure — including issues in the interview flow, edge cases in question rendering, and inconsistencies in the results page" },
      { icon: "check", text: "All findings were recorded in a structured Google Sheet using predefined categories provided by the bootcamp, ensuring every bug report was clear, reproducible, and submission-ready" },
    ],
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
    description: "One of the most demanding projects at Pixbyte — full testing of a complex payment system, live sessions & teacher dashboard on an LMS.",
    highlights: [
      { icon: "flask", text: "One of the most demanding projects at Pixbyte — the core scope was the full payment and discount system, which involved highly complex pricing logic: cart-value-triggered discounts, different rules for individually purchased versus bundled courses, dynamic price recalculation across user roles, and overlapping/expired coupon edge cases" },
      { icon: "zap", text: "Backend pricing calculations were validated directly through API testing in Hoppscotch — not just checking the UI output, but verifying the server returned the correct numbers before the frontend even displayed them" },
      { icon: "layers", text: "Validated a dual live-session system supporting both Zoom and a custom in-house meeting platform, including the logic for switching between them — and tested that each mode behaved correctly for both students and teachers" },
      { icon: "check", text: "Covered a WhatsApp integration for session notifications, and for the teacher role: verified exam creation, answer correction workflows, session scheduling, and dashboard access controls" },
      { icon: "shield", text: "Tested edge cases that most testers would skip: what happens when a coupon expires mid-checkout, when a user switches course bundles after applying a discount, or when two discount rules conflict" },
      { icon: "bug", text: "Reported 160 bugs across all modules — the highest bug count of any project at Pixbyte, reflecting both the system's complexity and the depth of testing applied" },
    ],
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
    description: "Algoriza graduation project — a combined manual + automation framework for CartLow's e-commerce platform.",
    highlights: [
      { icon: "code", text: "Algoriza internship graduation project — built a complete automation testing framework for CartLow's e-commerce platform from the ground up, combining both manual and automated testing in a single structured engagement" },
      { icon: "layers", text: "Started with manual test case creation and execution across selected pages to understand the system behavior, then moved into automation — building the framework to run those same scenarios programmatically" },
      { icon: "flask", text: "Framework built with Selenium WebDriver and structured using the Page Object Model (POM) design pattern — keeping test logic separate from page interaction code for maintainability and scalability" },
      { icon: "target", text: "Followed the BDD approach with Cucumber, writing scenarios in Gherkin to make tests readable by non-technical stakeholders — a key skill for professional QA environments" },
      { icon: "git", text: "Used Maven for dependency management and GitHub for version control — maintaining clean commit history and project structure throughout the engagement" },
      { icon: "bug", text: "Discovered and reported bugs found during both manual execution and automation runs — treating every test failure as a potential defect worth investigating" },
    ],
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
    description: "A full SaaS workforce-management platform for a security guard company, spanning 2 mobile apps (Security Guard, PMO) and 4 web dashboards (Admin, Provider, Client, PMO).",
    highlights: [
      { icon: "shield", text: "Full guard lifecycle tested end-to-end: the guard registers on the app, admin approves the account, provider assigns them to a project, the guard accepts, and from that point check-in is only allowed when physically inside their designated zone — step outside and the system automatically triggers a force check-out." },
      { icon: "map", text: "Location tracking validated in three states: app in foreground, app backgrounded, and app fully closed — in all three cases the guard's location remained trackable and visible on the real-time tracking map, built with Pusher, showing live position, movement trail, and check-in photo for each guard." },
      { icon: "bell", text: "Full notification system covered: if a guard loses connectivity or closes the app, an alert goes to the admin immediately — providers can also send broadcast notifications to guards directly through the dashboard — and guards have a dedicated SOS button that fires an emergency alert straight to the provider." },
      { icon: "bar", text: "PMO app tested thoroughly: project managers can generate 9 different report types directly from the mobile app — after filling in the fields, a branded company PDF is auto-generated, saved to the system, and the PMO can also check in a guard on-site using a unique QR code tied to each guard per contract." },
      { icon: "layers", text: "Equipment inventory module tested separately: every piece of equipment is registered in the system with a system-generated barcode that gets printed and physically attached to the item. Guards request equipment (e.g., a specific weapon type) from the mobile app and see live stock availability before submitting the request. Once approved, the guard scans the barcode with their phone camera, which updates the item's status to checked-out and assigns it to them for the project's duration. On return, the warehouse manager scans the same barcode using a dedicated handheld scanner device — similar to a retail POS scanner — and the stock count updates back automatically." },
      { icon: "zap", text: "Testing here wasn't the usual simulator workflow — went outside with multiple Android and iOS devices, physically walked in and out of geofenced zones, cut the internet mid-session, and watched the real-time behavior. Each phone model and OS version had its own restrictions around background location access and battery optimization, making device-specific bugs a major part of the findings." },
      { icon: "flask", text: "When a large on-site event brought over 100 guards checking in simultaneously, the real-time tracking map started freezing — guard markers appeared static instead of updating with live movement, requiring manual refreshes to see current positions. After the fix was implemented, validated it under load using JMeter, simulating 100 concurrent guards on the tracking map to confirm real-time updates held without freezing." },
      { icon: "bug", text: "490 bugs logged and tracked in Jira across 2 mobile apps and 4 web dashboards — this was one of the most intensive, multi-platform, real-world testing engagements in this portfolio." },
    ],
    image: "/projects/10- SECU3.png",
    bugCount: 490,
    technologies: ["Test Cases", "Bug Reporting", "API Testing", "Performance Testing", "Mobile Testing", "JMeter"],
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
      'JMeter': 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20 dark:border-orange-500/30',
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
                  <div className="mb-4 flex-1 space-y-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    {(project as any).highlights && (
                      <ul className="mt-2 space-y-1.5">
                        {(project as any).highlights.map((h: any, i: number) => {
                          const iconMap: Record<string, React.ReactNode> = {
                            check: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />,
                            bug: <Bug className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />,
                            zap: <Zap className="h-3.5 w-3.5 text-yellow-500 shrink-0 mt-0.5" />,
                            shield: <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />,
                            users: <Users className="h-3.5 w-3.5 text-violet-400 shrink-0 mt-0.5" />,
                            map: <Map className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />,
                            bell: <Bell className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />,
                            bar: <BarChart3 className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />,
                            flask: <FlaskConical className="h-3.5 w-3.5 text-pink-400 shrink-0 mt-0.5" />,
                            layers: <Layers className="h-3.5 w-3.5 text-teal-400 shrink-0 mt-0.5" />,
                            code: <Code2 className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />,
                            git: <GitBranch className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />,
                            target: <Target className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />,
                          };
                          return (
                            <li key={i} className="flex items-start gap-2 text-xs text-foreground/75">
                              {iconMap[h.icon] ?? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />}
                              <span className="leading-snug">{h.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

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