import { Button } from "@/components/ui/button";
import {
  FileText,
  ExternalLink,
  User,
  LinkIcon,
  Eye,
  Search,
  Download,
  Globe,
  FolderOpen,
  BookOpen,
  Sparkles,
  Bell,
  Filter,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Player } from "@lottiefiles/react-lottie-player";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LinkedInButton from "@/components/LinkedInButton";

// ── Types ────────────────────────────────────────────────────────────────────

type SummaryCategory =
  | "All"
  | "ISTQB"
  | "Mobile"
  | "Embedded"
  | "College"
  | "Platform";

type SummaryType = "PDF" | "Website" | "Folder" | "Book";

export interface Summary {
  imageWebp: string;  // optimized WebP for card thumbnails
  imageOriginal: string; // original for dialog full preview
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: SummaryCategory;
  type: SummaryType;
  downloadable: boolean;
  featured?: boolean;
  showOnHome?: boolean;
  tags?: string[];
  mentions?: { name: string; profileLink: string }[];
  references?: { title: string; url: string }[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

export const summaries: Summary[] = [
  {
    id: 1,
    title: "Test Genius",
    description:
      "Prepare, Practice, Pass. A specialized platform offering simulated ISTQB exams to enhance software testing skills.",
    image: "/Summaries/webp/Test Genius.webp",
    imageWebp: "/Summaries/webp/Test Genius.webp",
    imageOriginal: "/Summaries/Test Genius.png",
    link: "https://istqb.top",
    category: "Platform",
    type: "Website",
    downloadable: false,
    featured: false,
    showOnHome: true,
    tags: ["ISTQB", "Practice", "Exams"],
    references: [
      { title: "ISTQB Official Exams", url: "https://istqb.org/" },
    ],
  },
  {
    id: 2,
    title: "ISTQB FL V4.0",
    description:
      "Comprehensive ISTQB Foundation Level (FL) V4.0 syllabus summary with clear explanations and practice questions from sample exams.",
    image: "/Summaries/webp/ISTQB FL Summary.webp",
    imageWebp: "/Summaries/webp/ISTQB FL Summary.webp",
    imageOriginal: "/Summaries/ISTQB FL Summary.jpg",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7347600961898475520/",
    category: "ISTQB",
    type: "PDF",
    downloadable: true,
    featured: false,
    showOnHome: true,
    tags: ["Foundation Level", "V4.0", "Syllabus"],
    mentions: [
      {
        name: "Eng. Rania Mokhtar",
        profileLink: "https://www.linkedin.com/in/rania-mokhtar-268a07178/",
      },
      {
        name: "Eng. Tarek Rushdy",
        profileLink: "https://www.linkedin.com/in/tarekroshdy/",
      },
    ],
    references: [
      {
        title: "ISTQB Official Syllabus",
        url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/",
      },
      {
        title: "ISTQB V4.0 By Eng. Rania Mokhtar",
        url: "https://www.youtube.com/playlist?list=PL594OqWI4Um7Uk6utSPMBoMqTd7odsSr_",
      },
      {
        title: "ISTQB V4.0 By Eng. Tarek Rushdy",
        url: "https://www.udemy.com/course/foundation-level-training/",
      },
    ],
  },
  {
    id: 3,
    title: "ISTQB FL V4.0 Sample Exams",
    description:
      "A compiled collection of ISTQB Foundation Level v4.0 sample exam questions from official sample exams — questions only, no answers, for self-practice.",
    image: "/Summaries/webp/ISTQB FL Q.webp",
    imageWebp: "/Summaries/webp/ISTQB FL Q.webp",
    imageOriginal: "/Summaries/ISTQB FL Q.png",
    link: "https://drive.google.com/file/d/1ARIhlWtDtsbzEpLdSuxieutx2wiqnHad/view?usp=drive_link",
    category: "ISTQB",
    type: "PDF",
    downloadable: true,
    showOnHome: true,
    tags: ["Sample Exams", "Practice", "Questions"],
    references: [
      {
        title: "ISTQB Official Sample Exams",
        url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/",
      },
    ],
  },
  {
    id: 4,
    title: "ISTQB MAT V1",
    description:
      "Comprehensive ISTQB Mobile Application Testing (MAT) syllabus summary with clear explanations and practice questions from sample exams.",
    image: "/Summaries/webp/MAT Mocup.webp",
    imageWebp: "/Summaries/webp/MAT Mocup.webp",
    imageOriginal: "/Summaries/MAT Mocup.png",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7372632879018717184/",
    category: "Mobile",
    type: "PDF",
    downloadable: true,
    featured: false,
    showOnHome: true,
    tags: ["Mobile Testing", "MAT", "Syllabus"],
    mentions: [
      {
        name: "Eng. Rania Mokhtar",
        profileLink: "https://www.linkedin.com/in/rania-mokhtar-268a07178/",
      },
      {
        name: "Eng. Tarek Rushdy",
        profileLink: "https://www.linkedin.com/in/tarekroshdy/",
      },
    ],
    references: [
      {
        title: "ISTQB Official Syllabus",
        url: "https://istqb.org/certifications/certified-tester-mobile-application-testing-ct-mat/",
      },
      {
        title: "ISTQB MAT By Eng. Rania Mokhtar",
        url: "https://www.youtube.com/playlist?list=PL594OqWI4Um7A4MHHeQoRL6AquHHovTUi",
      },
      {
        title: "ISTQB MAT By Eng. Tarek Rushdy",
        url: "https://www.udemy.com/course/istqb-mobile-tester/?couponCode=ACCAGE0923",
      },
    ],
  },
  {
    id: 5,
    title: "Part One Embedded Systems",
    description:
      "Part one of an Embedded Systems Diploma — focuses on mastering C programming, Data Structures, and Algorithms.",
    image: "/Summaries/webp/Part One Embedded.webp",
    imageWebp: "/Summaries/webp/Part One Embedded.webp",
    imageOriginal: "/Summaries/Part One Embedded.jpg",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7209553266966245376/",
    category: "Embedded",
    type: "PDF",
    downloadable: true,
    featured: false,
    showOnHome: false,
    tags: ["C Programming", "Data Structures", "Algorithms"],
    mentions: [
      {
        name: "Eng. Ahmed Abd ElGhafar",
        profileLink:
          "https://www.linkedin.com/in/ahmedabdelghafarmohammed/",
      },
    ],
    references: [
      {
        title: "Embedded Systems Diploma",
        url: "https://www.linkedin.com/in/ahmedabdelghafarmohammed",
      },
    ],
  },
  {
    id: 6,
    title: "All My College Summaries",
    description:
      "A complete collection of my college summaries, including detailed explanations, compiled past exams, and organized law sheets for quick and reliable revision.",
    image: "/Summaries/webp/Mockup Collage.webp",
    imageWebp: "/Summaries/webp/Mockup Collage.webp",
    imageOriginal: "/Summaries/Mockup Collage.png",
    link: "https://drive.google.com/drive/folders/1RjEORkCR185KXsl782pHt38dE_GbN0Xs?usp=drive_link",
    category: "College",
    type: "Folder",
    downloadable: true,
    featured: false,
    showOnHome: false,
    tags: ["College", "Exams", "Law Sheets"],
    mentions: [
      {
        name: "Sameh El-Domyate",
        profileLink: "https://www.linkedin.com/in/sameh-eldomyate-/",
      },
    ],
  },
];

export type SummaryItem = (typeof summaries)[0];

// ── Helpers ───────────────────────────────────────────────────────────────────

const CATEGORIES: SummaryCategory[] = [
  "All",
  "ISTQB",
  "Mobile",
  "Embedded",
  "College",
  "Platform",
];

const categoryColors: Record<SummaryCategory, string> = {
  All: "from-blue-500 to-cyan-400",
  ISTQB: "from-blue-600 to-blue-400",
  Mobile: "from-violet-600 to-purple-400",
  Embedded: "from-orange-600 to-amber-400",
  College: "from-emerald-600 to-teal-400",
  Platform: "from-pink-600 to-rose-400",
};

const categoryBadgeColors: Record<SummaryCategory, string> = {
  All: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ISTQB: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Mobile: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Embedded: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  College: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Platform: "bg-pink-500/15 text-pink-400 border-pink-500/30",
};

const typeIcon = (type: SummaryType) => {
  switch (type) {
    case "PDF":
      return <FileText className="h-3.5 w-3.5" />;
    case "Website":
      return <Globe className="h-3.5 w-3.5" />;
    case "Folder":
      return <FolderOpen className="h-3.5 w-3.5" />;
    case "Book":
      return <BookOpen className="h-3.5 w-3.5" />;
  }
};

const typeLabel = (s: Summary) => {
  if (s.type === "Website") return "Open Website";
  if (s.type === "Folder") return "Open Folder";
  return "Open PDF";
};

// ── Component ─────────────────────────────────────────────────────────────────

const SummariesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SummaryCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search input (300ms) to avoid filtering on every keystroke
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(value), 300);
  }, []);

  // ── Filtering (uses debounced query) ──
  const filtered = useMemo(() => {
    return summaries.filter((s) => {
      const matchCat =
        activeCategory === "All" || s.category === activeCategory;
      const q = debouncedQuery.toLowerCase();
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags?.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, debouncedQuery]);

  // Stats
  const stats = [
    { label: "Resources", value: summaries.length, icon: "📚" },
    { label: "Categories", value: CATEGORIES.length - 1, icon: "🗂️" },
    { label: "Free", value: "100%", icon: "🎁" },
  ];

  // ── Canvas BG (pauses when tab hidden, fewer particles on mobile) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = () =>
      document.documentElement.classList.contains("dark");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number;
      y: number;
      ox: number;
      oy: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      angle: number;
      amp: number;
      freq: number;
      shape: number;

      constructor(dark: boolean) {
        this.x = this.ox = Math.random() * canvas.width;
        this.y = this.oy = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 30;
        this.speedX = Math.random() * 0.08 - 0.04;
        this.speedY = Math.random() * 0.08 - 0.04;
        this.angle = Math.random() * Math.PI * 2;
        this.amp = Math.random() * 80 + 30;
        this.freq = Math.random() * 0.002 + 0.001;
        this.shape = Math.floor(Math.random() * 2);
        this.color = this.pick(dark);
      }

      pick(dark: boolean) {
        const d = [
          "rgba(59,130,246,0.35)",
          "rgba(139,92,246,0.35)",
          "rgba(14,165,233,0.35)",
          "rgba(99,102,241,0.35)",
        ];
        const l = [
          "rgba(37,99,235,0.25)",
          "rgba(124,58,237,0.25)",
          "rgba(2,132,199,0.25)",
        ];
        const arr = dark ? d : l;
        return arr[Math.floor(Math.random() * arr.length)];
      }

      update() {
        this.angle += this.freq;
        this.x = this.ox + Math.cos(this.angle) * this.amp + this.speedX;
        this.y = this.oy + Math.sin(this.angle * 0.7) * this.amp + this.speedY;
        if (this.x < -100) this.x = this.ox = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = this.ox = -100;
        if (this.y < -100) this.y = this.oy = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = this.oy = -100;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (this.shape === 0) {
          ctx.moveTo(this.x, this.y - this.size / 2);
          ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
          ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
          ctx.closePath();
        } else {
          ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      recolor(dark: boolean) {
        this.color = this.pick(dark);
      }
    }

    // Fewer particles on mobile to save CPU
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const particleCount = isMobile ? 4 : 8;
    const particles: Particle[] = Array.from(
      { length: particleCount },
      () => new Particle(isDark())
    );

    const obs = new MutationObserver(() =>
      particles.forEach((p) => p.recolor(isDark()))
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let raf: number;
    let paused = false;

    const animate = () => {
      if (!paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Pause animation when tab is hidden to save CPU/battery
    const handleVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Meta ──
  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    document.title =
      "Maher Summaries | Mahmoud Maher - Software Testing Engineer";

    const setMeta = (prop: string, val: string, isName = false) => {
      const attr = isName ? "name" : "property";
      let el = document.querySelector(
        `meta[${attr}="${prop}"]`
      ) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, prop);
        document.head.appendChild(el);
      }
      el.content = val;
    };

    setMeta("og:title", "Maher Summaries | Mahmoud Maher");
    setMeta(
      "og:description",
      "A complete collection of all my technical summaries and educational resources — ISTQB, Mobile Testing, and more."
    );
    setMeta(
      "og:url",
      "https://mahmoud-maher-portfolio.vercel.app/Summaries"
    );
    setMeta(
      "og:image",
      "https://mahmoud-maher-portfolio.vercel.app/Mahmoud%20Maher.jpg?version=3"
    );
    setMeta("twitter:title", "Maher Summaries | Mahmoud Maher", true);
    setMeta(
      "twitter:description",
      "A complete collection of all my technical summaries and educational resources.",
      true
    );

    return () => {
      document.title =
        "Mahmoud Maher | Software Testing Engineer & QC/QA Specialist | ISTQB Certified";
      setMeta(
        "og:title",
        "Mahmoud Maher | Software Testing Engineer & QC/QA Specialist"
      );
      setMeta(
        "og:description",
        "ISTQB Certified Software Testing Engineer & QC/QA Specialist with expertise in manual testing, test automation, and mobile application testing."
      );
      setMeta("og:url", "https://mahmoud-maher-portfolio.vercel.app");
    };
  }, []);

  // ── Mentions renderer ──
  const renderDesc = (desc: string, mentions: Summary["mentions"]) => {
    if (!mentions?.length) return <span>{desc}</span>;
    let html = desc;
    mentions.forEach((m) => {
      html = html.replace(
        new RegExp(m.name, "g"),
        `<a href="${m.profileLink}" target="_blank" rel="noopener noreferrer" class="font-bold text-primary hover:text-blue-700 underline underline-offset-2 transition-colors">${m.name}</a>`
      );
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  // ── Shared button styles ──
  const primaryBtn = `
    relative gap-2 text-white font-semibold
    bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400
    overflow-hidden shadow-[0_0_10px_rgba(59,130,246,0.4)]
    transition-all duration-500 hover:scale-[1.02] hover:brightness-110
    before:absolute before:top-0 before:left-[-75%]
    before:w-[50%] before:h-full
    before:bg-gradient-to-tr before:from-white/30 before:to-white/10
    before:skew-x-[-20deg] before:animate-none
    hover:before:animate-[shine_1.5s_ease-in-out_forwards]
    before:rounded-[inherit]
  `;

  const refBtn = `
    relative gap-2 text-white font-medium
    bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500
    overflow-hidden shadow-[0_0_8px_rgba(5,150,105,0.4)]
    transition-all duration-500 hover:scale-[1.02] hover:brightness-105
    before:absolute before:top-0 before:left-[-75%]
    before:w-[50%] before:h-full
    before:bg-gradient-to-tr before:from-white/30 before:to-white/10
    before:skew-x-[-40deg] before:animate-none
    hover:before:animate-[shine_1.2s_ease-in-out_forwards]
    before:rounded-[inherit]
  `;

  // ── Render ──
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-24 pb-12 overflow-hidden">
        {/* Canvas BG */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 -z-10 pointer-events-none"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/80 to-accent/5 -z-5" />

        <div className="container mx-auto text-center relative z-10">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6
              bg-primary/10 border border-primary/20 text-primary
              ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Knowledge Marketplace
          </div>

          {/* Title */}
          <h1
            className={`text-5xl md:text-7xl font-extrabold mb-4 tracking-tight ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="gradient-text">Maher's Hub</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            All my technical summaries, exam resources &amp; learning materials
            — free for everyone.
          </p>

          {/* Stats Bar */}
          <div
            className={`flex flex-wrap justify-center gap-4 md:gap-8 mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center px-6 py-3 rounded-2xl
                  bg-card/60 backdrop-blur-sm border border-border/60
                  shadow-sm hover:shadow-md hover:border-primary/30
                  transition-all duration-300"
              >
                <span className="text-2xl mb-1">{s.icon}</span>
                <span className="text-2xl font-bold gradient-text">
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Search + Filter */}
          <div
            className={`max-w-3xl mx-auto space-y-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="summaries-search"
                type="text"
                placeholder="Search resources, tags, topics…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl
                  bg-card/80 backdrop-blur-sm border border-border
                  text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                  focus:border-primary/50 transition-all duration-200
                  shadow-sm text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-4 py-1.5 rounded-full text-sm font-semibold
                      border transition-all duration-200
                      ${
                        active
                          ? `bg-gradient-to-r ${categoryColors[cat]} text-white border-transparent shadow-md scale-105`
                          : "bg-card/60 border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                      }
                    `}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── GRID ────────────────────────────────────────────────────────── */}
      <section className="py-8 pb-20 px-4">
        <div className="container mx-auto">
          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              of {summaries.length} resources
            </p>
            {(activeCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
              >
                <X className="h-3 w-3" /> Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-xl font-semibold text-foreground mb-2">
                No resources found
              </p>
              <p className="text-muted-foreground text-sm">
                Try a different search term or category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((summary, index) => (
                <Dialog
                  key={summary.id}
                  onOpenChange={(open) =>
                    setSelectedSummary(open ? summary : null)
                  }
                >
                  {/* ── Card ── */}
                  <div
                    className={`group relative flex flex-col rounded-2xl overflow-hidden
                      bg-card border border-border/60
                      shadow-sm hover:shadow-xl hover:shadow-primary/10
                      hover:-translate-y-1 hover:border-primary/30
                      transition-all duration-400
                      ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {/* Featured star badge */}
                    {summary.featured && (
                      <div className="absolute -top-10 -left-3 z-20">
                        <Player
                          src="/icons/star3.json"
                          className="w-24 h-24"
                          loop
                          autoplay
                          speed={0.8}
                        />
                      </div>
                    )}

                    {/* ── Image ── */}
                    <DialogTrigger asChild>
                      <button className="relative w-full h-52 overflow-hidden bg-muted/50 flex-shrink-0 cursor-pointer">
                        <img
                          src={summary.image}
                          alt={summary.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                              Preview
                            </span>
                          </div>
                        </div>
                        {/* Category badge on image */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-sm
                              ${categoryBadgeColors[summary.category]}`}
                          >
                            {summary.category}
                          </span>
                        </div>
                        {/* Type badge */}
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-black/50 text-white border border-white/20 backdrop-blur-sm">
                            {typeIcon(summary.type)}
                            {summary.type}
                          </span>
                        </div>
                      </button>
                    </DialogTrigger>

                    {/* ── Body ── */}
                    <div className="flex flex-col flex-1 p-5">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
                        {summary.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                        {summary.description}
                      </p>

                      {/* Tags */}
                      {summary.tags && summary.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {summary.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground border border-border/60"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Mentions */}
                      {summary.mentions && summary.mentions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {summary.mentions.map((m, i) => (
                            <a
                              key={i}
                              href={m.profileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                                bg-purple-500/10 border border-purple-500/30 text-purple-400
                                hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-200"
                            >
                              <User className="h-2.5 w-2.5" />
                              {m.name}
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 mt-auto">
                        {/* Preview button */}
                        <DialogTrigger asChild>
                          <button
                            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium
                              bg-muted hover:bg-muted/80 border border-border text-muted-foreground hover:text-foreground
                              transition-all duration-200"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Preview
                          </button>
                        </DialogTrigger>

                        {/* Main CTA */}
                        {summary.link && summary.link !== "#" && (
                          <Button
                            className={`${primaryBtn} flex-1 py-2 text-sm rounded-xl`}
                            onClick={() =>
                              window.open(summary.link, "_blank")
                            }
                          >
                            {summary.downloadable ? (
                              <Download className="h-3.5 w-3.5" />
                            ) : (
                              <ExternalLink className="h-3.5 w-3.5" />
                            )}
                            {typeLabel(summary)}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Dialog / Full Preview ── */}
                  <DialogContent className="max-w-full w-full h-full max-h-screen m-0 p-0 overflow-hidden bg-background">
                    {/* Header */}
                    <div className="p-4 lg:p-6 border-b border-border bg-background/95 backdrop-blur-sm">
                      <div className="container mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${categoryBadgeColors[summary.category]}`}
                            >
                              {summary.category}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-muted border border-border text-muted-foreground">
                              {typeIcon(summary.type)}
                              {summary.type}
                            </span>
                          </div>
                          <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-1">
                            {summary.title}
                          </h3>
                          <div className="text-sm text-muted-foreground line-clamp-2 lg:line-clamp-none">
                            {renderDesc(summary.description, summary.mentions)}
                          </div>
                        </div>
                        {summary.link && summary.link !== "#" && (
                          <Button
                            className={`${primaryBtn} flex-shrink-0 px-5 py-2.5 text-sm`}
                            onClick={() =>
                              window.open(summary.link, "_blank")
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                            {typeLabel(summary)}
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 overflow-auto h-[calc(100vh-140px)]">
                      <div className="flex-1 flex flex-col lg:flex-row min-h-full">
                        {/* Image */}
                        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-muted/10">
                          <img
                            src={summary.image}
                            alt={summary.title}
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                          />
                        </div>

                        {/* Sidebar */}
                        {(summary.references?.length ||
                          summary.mentions?.length) && (
                          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-background/60 backdrop-blur-sm">
                            <div className="p-4 lg:p-6 space-y-6">
                              {/* References */}
                              {summary.references &&
                                summary.references.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-2 mb-3">
                                      <LinkIcon className="h-4 w-4 text-primary" />
                                      <h4 className="font-bold text-base text-foreground">
                                        References
                                      </h4>
                                    </div>
                                    <div className="space-y-2">
                                      {summary.references.map((ref, i) => (
                                        <Button
                                          key={i}
                                          className={`${refBtn} w-full justify-start p-3 h-auto text-left`}
                                          onClick={() =>
                                            window.open(ref.url, "_blank")
                                          }
                                        >
                                          <div className="flex items-center gap-2 text-left w-full">
                                            <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                                            <span className="text-xs font-medium flex-1 break-words whitespace-normal">
                                              {ref.title}
                                            </span>
                                          </div>
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              {/* Mentions */}
                              {summary.mentions &&
                                summary.mentions.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-2 mb-3">
                                      <User className="h-4 w-4 text-purple-400" />
                                      <h4 className="font-bold text-base text-foreground">
                                        Special Thanks
                                      </h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {summary.mentions.map((m, i) => (
                                        <a
                                          key={i}
                                          href={m.profileLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                                            bg-purple-500/10 border border-purple-500/30 text-purple-400
                                            hover:bg-purple-500/20 hover:scale-105 transition-all duration-200"
                                        >
                                          <User className="h-3 w-3" />
                                          {m.name}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              {/* Tags */}
                              {summary.tags && summary.tags.length > 0 && (
                                <div>
                                  <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                                    Tags
                                  </h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {summary.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground border border-border"
                                      >
                                        #{tag}
                                      </span>
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
          )}
        </div>
      </section>

      {/* ─── STAY UPDATED ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 relative overflow-hidden">
        {/* Glow bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div
            className="max-w-2xl mx-auto text-center rounded-3xl border border-border/60 bg-card/60 backdrop-blur-sm p-8 md:p-12
            shadow-xl shadow-primary/5"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
              <Bell className="h-6 w-6 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Stay Updated
            </h2>
            <p className="text-muted-foreground text-base mb-8 leading-relaxed">
              New summaries and resources are added regularly.
              <br />
              Follow me on LinkedIn to never miss a release.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.linkedin.com/in/mahmoud-maher-2002/"
                target="_blank"
                rel="noopener noreferrer"
                id="linkedin-follow-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-sm text-white
                  bg-[#0A66C2] hover:bg-[#0958A8]
                  shadow-lg shadow-[#0A66C2]/30 hover:shadow-[#0A66C2]/50
                  transition-all duration-300 hover:scale-[1.02]"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Follow on LinkedIn
              </a>

              <a
                href="https://mahmoud-maher-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                id="portfolio-link-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-sm
                  border border-border bg-card hover:bg-muted text-foreground
                  transition-all duration-300 hover:scale-[1.02] hover:border-primary/40"
              >
                <Globe className="h-4.5 w-4.5" />
                Visit Portfolio
              </a>
            </div>

            {/* Decorative dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary/30"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <LinkedInButton />
      <Footer />
    </div>
  );
};

export default SummariesPage;
