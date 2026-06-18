import { useState, useEffect } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isSummariesPage = location.pathname === "/Summaries";

  const sectionIds = ["home", "summaries", "about", "skills", "projects", "certificates", "contact"];
  const activeSection = useScrollSpy(sectionIds);

  // Determine which section should be active
  const currentActiveSection = isSummariesPage ? "summaries" : activeSection;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const defaultTheme = savedTheme || "dark";
    setTheme(defaultTheme);
    document.documentElement.classList.toggle("dark", defaultTheme === "dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = docHeight - winHeight;
      const progress = trackLength > 0 ? Math.floor((scrollTop / trackLength) * 100) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavClick = (id: string) => {
    if (isHomePage) {
      // If on home page, just scroll to section
      scrollToSection(id);
    } else {
      // If on another page, navigate to home and then scroll
      setIsMobileMenuOpen(false);
      navigate(`/#${id}`);
    }
  };

  // Handle hash navigation after page load
  useEffect(() => {
    if (isHomePage && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, [location.hash, isHomePage]);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Summaries", id: "summaries" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Certificates", id: "certificates" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
        : "bg-transparent"
        }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="h-1 bg-gradient-to-r from-primary to-accent transition-all duration-300"
        style={{
          width: `${scrollProgress}%`,
          opacity: scrolled ? 1 : 0
        }}
      />

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* الاسم على الشمال */}
          {isHomePage ? (
            <button
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity flex-shrink-0"
            >
              Mahmoud Maher
            </button>
          ) : (
            <Link
              to="/"
              className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity flex-shrink-0"
            >
              Mahmoud Maher
            </Link>
          )}

          {/* Navigation Items في النص - للشاشات الكبيرة فقط */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-sm font-bold transition-all duration-300 px-1 py-2 ${currentActiveSection === item.id
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                    }`}
                >
                  {item.label}
                  {currentActiveSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode على اليمين */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-accent text-foreground hover:text-foreground"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu - للشاشات الصغيرة فقط */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-muted"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-background/95 backdrop-blur-xl border-b border-border">
                <div className="flex flex-col items-center gap-6 py-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-lg font-bold transition-all duration-300 ${currentActiveSection === item.id
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                        }`}
                    >
                      {item.label}
                      {currentActiveSection === item.id && (
                        <div className="mx-auto mt-1 h-0.5 w-8 bg-gradient-to-r from-primary to-accent rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;