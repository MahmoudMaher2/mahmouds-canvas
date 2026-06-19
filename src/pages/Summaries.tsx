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
  Award,
  Cpu,
  GraduationCap,
  Laptop,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Player } from "@lottiefiles/react-lottie-player";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LinkedInButton from "@/components/LinkedInButton";
import { summaries, type Summary, type SummaryCategory, type SummaryType } from "@/data/summaries.data";
import SplashScreen from "@/components/SplashScreen";
import { useSplashScreen } from "@/hooks/useSplashScreen";

// ── Helpers ───────────────────────────────────────────────────────────────────

const CATEGORIES: SummaryCategory[] = [
  "All",
  "ISTQB",
  "Embedded",
  "College",
  "Platform",
];

const categoryColors: Record<SummaryCategory, string> = {
  All: "from-blue-500 to-cyan-400",
  ISTQB: "from-blue-600 to-blue-400",
  Embedded: "from-orange-600 to-amber-400",
  College: "from-emerald-600 to-teal-400",
  Platform: "from-pink-600 to-rose-400",
};

const categoryConfigs: Record<
  SummaryCategory,
  {
    icon: React.ReactNode;
    badgeClass: string;
  }
> = {
  All: {
    icon: <Award className="h-3.5 w-3.5" />,
    badgeClass: "bg-white/95 dark:bg-slate-950/95 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-500/30",
  },
  ISTQB: {
    icon: <Award className="h-3.5 w-3.5" />,
    badgeClass: "bg-white/95 dark:bg-slate-950/95 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-500/30",
  },
  Embedded: {
    icon: <Cpu className="h-3.5 w-3.5" />,
    badgeClass: "bg-white/95 dark:bg-slate-950/95 text-orange-600 dark:text-orange-300 border-orange-200 dark:border-orange-500/30",
  },
  College: {
    icon: <GraduationCap className="h-3.5 w-3.5" />,
    badgeClass: "bg-white/95 dark:bg-slate-950/95 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30",
  },
  Platform: {
    icon: <Laptop className="h-3.5 w-3.5" />,
    badgeClass: "bg-white/95 dark:bg-slate-950/95 text-pink-600 dark:text-pink-300 border-pink-200 dark:border-pink-500/30",
  },
};

const typeConfigs: Record<
  SummaryType,
  {
    icon: React.ReactNode;
    badgeClass: string;
  }
> = {
  PDF: {
    icon: <FileText className="h-3.5 w-3.5" />,
    badgeClass: "bg-white/95 dark:bg-slate-950/95 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30",
  },
  Website: {
    icon: <Globe className="h-3.5 w-3.5" />,
    badgeClass: "bg-white/95 dark:bg-slate-950/95 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30",
  },
  Folder: {
    icon: <FolderOpen className="h-3.5 w-3.5" />,
    badgeClass: "bg-white/95 dark:bg-slate-950/95 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30",
  },
  Book: {
    icon: <BookOpen className="h-3.5 w-3.5" />,
    badgeClass: "bg-white/95 dark:bg-slate-950/95 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30",
  },
};

const typeLabel = (s: Summary) => {
  if (s.type === "Website") return "Open Website";
  if (s.type === "Folder") return "Open Folder";
  return "Open PDF";
};

// ── Component ─────────────────────────────────────────────────────────────────

const SummariesPage = () => {
  const { showSplash, handleComplete } = useSplashScreen();
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
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      <Navbar />

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 pt-20 pb-5 overflow-hidden">
        {/* Canvas BG */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 -z-10 pointer-events-none"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/80 to-accent/5 -z-5" />

        <div className="container mx-auto relative z-10">
          {/* ── Main Hero Card — full width ── */}
          <div
            className={`flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 p-6 sm:p-8 lg:p-10 rounded-3xl
              bg-card/45 backdrop-blur-md border border-border/40 shadow-xl
              ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            {/* Left side: Profile Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1 w-full">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl overflow-hidden ring-4 ring-primary/10 ring-offset-4 ring-offset-background shadow-2xl transition-all duration-300 hover:scale-105">
                  <img
                    src="/Mahmoud Maher.jpg"
                    alt="Mahmoud Maher"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full border-4 border-background animate-pulse" />
              </div>

              {/* Text Block */}
              <div className="flex-1 min-w-0 text-center sm:text-left space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                  bg-primary/10 border border-primary/20 text-primary shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span>Knowledge Marketplace</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  Maher's Hub
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  All my technical summaries, exam resources &amp; learning materials — free for everyone.
                </p>
              </div>
            </div>

            {/* Right side: Stats */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 border-t lg:border-t-0 lg:border-l border-border/60 pt-6 lg:pt-0 lg:pl-10 w-full lg:w-auto">
              {stats.map((s) => (
                <div key={s.label} className="text-center space-y-1">
                  <div className="flex items-center gap-1.5 justify-center">
                    <span className="text-xl sm:text-2xl leading-none">{s.icon}</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-none">
                      {s.value}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ─── GRID ────────────────────────────────────────────────────────── */}
      <section className="pt-4 pb-20 px-4 sm:px-6">
        <div className="container mx-auto">
          {/* ── Toolbar: Search + Filters + Results count ── */}
          <div className="flex flex-col gap-3 mb-6">
            {/* Row 1: Search + clear */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="summaries-search"
                  type="text"
                  placeholder="Search resources, tags, topics…"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl
                    bg-card/80 border border-border
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/50
                    focus:border-primary/50 transition-all duration-200 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => { handleSearchChange(""); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Results count + Category pills + Clear */}
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mr-1">
                <Filter className="h-3.5 w-3.5" />
                Showing{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                of {summaries.length}
              </p>
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      border transition-all duration-200
                      ${active
                        ? `bg-gradient-to-r ${categoryColors[cat]} text-white border-transparent shadow-sm scale-105`
                        : "bg-card/60 border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                      }
                    `}
                  >
                    {cat}
                  </button>
                );
              })}
              {(activeCategory !== "All" || searchQuery) && (
                <button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors ml-auto"
                >
                  <X className="h-3 w-3" /> Clear
                </button>
              )}
            </div>
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
                >
                  {/* ── Card ── */}
                  <div
                    className={`marketplace-card group relative flex flex-col rounded-2xl overflow-hidden
                      bg-card border border-border/60
                      shadow-sm hover:shadow-xl hover:shadow-primary/10
                      hover:-translate-y-1 hover:border-primary/30
                      [transition:transform_0.3s_ease,box-shadow_0.3s_ease,border-color_0.3s_ease]

                      ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
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
                          src={summary.imageWebp || summary.image}
                          alt={summary.title}
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={index === 0 ? "high" : "low"}
                          width={900}
                          height={520}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover overlay - use opacity transition only, no backdrop-blur */}
                        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="flex items-center gap-2 text-white bg-black/40 px-4 py-2 rounded-full border border-white/20">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                              Preview
                            </span>
                          </div>
                        </div>
                        {/* Category badge on image - glassmorphism with backdrop-blur */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm transition-colors duration-300
                              ${categoryConfigs[summary.category].badgeClass}`}
                          >
                            {categoryConfigs[summary.category].icon}
                            {summary.category}
                          </span>
                        </div>
                        {/* Type badge - solid black bg */}
                        <div className="absolute top-3 right-3">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-black/70 text-white border border-white/10 shadow-sm backdrop-blur-sm transition-colors duration-300"
                          >
                            {typeConfigs[summary.type].icon}
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
                              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50/85 text-blue-600 border border-blue-200/60 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30 hover:bg-blue-100/70 dark:hover:bg-blue-500/25 transition-colors duration-200"
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
                                bg-purple-50/85 text-purple-700 border border-purple-200/60
                                dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30
                                hover:bg-purple-100/70 dark:hover:bg-purple-500/25 transition-all duration-200"
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
                  <DialogContent className="w-[95vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-auto max-h-[90vh] md:max-h-[85vh] p-0 overflow-hidden rounded-2xl flex flex-col border border-border/80 shadow-2xl">
                    {/* Header */}
                    <div className="flex-shrink-0 p-4 lg:p-6 border-b border-border bg-background/95 backdrop-blur-sm">
                      <div className="container mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm
                                ${categoryConfigs[summary.category].badgeClass}`}
                            >
                              {categoryConfigs[summary.category].icon}
                              {summary.category}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm
                                ${typeConfigs[summary.type].badgeClass}`}
                            >
                              {typeConfigs[summary.type].icon}
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
                    <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
                      {/* Image */}
                      <div className="w-full h-auto flex-shrink-0 p-4 bg-muted/5 flex items-center justify-center lg:flex-1 lg:h-full lg:overflow-y-auto lg:p-8 lg:bg-muted/10">
                        <img
                          src={summary.imageOriginal || summary.image}
                          alt={summary.title}
                          loading="lazy"
                          decoding="async"
                          className="max-w-full h-auto lg:max-h-full lg:object-contain rounded-xl shadow-2xl"
                        />
                      </div>

                      {/* Sidebar */}
                      {(summary.references?.length ||
                        summary.mentions?.length ||
                        summary.tags?.length) && (
                          <div className="w-full border-t border-border bg-background/95 lg:w-80 lg:h-full lg:overflow-y-auto lg:border-t-0 lg:border-l">
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
                                            bg-purple-50/85 text-purple-700 border border-purple-200/60
                                            dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30
                                            hover:bg-purple-100/70 dark:hover:bg-purple-500/25 hover:scale-105 transition-all duration-200"
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
                                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50/85 text-blue-600 border border-blue-200/60 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30 hover:bg-blue-100/70 dark:hover:bg-blue-500/25 transition-colors duration-200"
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
                href="https://www.linkedin.com/in/mahmoud-maher74/"
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
                href="https://api.whatsapp.com/send/?phone=201140121877&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-connect-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-sm
                  border border-[#25D366] bg-[#25D366] text-white
                  dark:border-[#25D366]/40 dark:bg-[#25D366]/10 dark:text-[#25D366]
                  transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Connect on WhatsApp
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
