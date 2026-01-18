import { Linkedin, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mahmoud-maher74/",
      icon: Linkedin,
      color: "hover:text-cyan-400",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/201140121877",
      icon: MessageCircle,
      color: "hover:text-green-400",
    },
    {
      label: "Email",
      href: "mailto:mahmoudmaher2033@gmail.com",
      icon: Mail,
      color: "hover:text-blue-400",
    },
  ];

  return (
    <footer className="py-8 px-4 border-t border-border bg-card">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : "_self"}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                className={`p-3 rounded-full bg-muted/50 text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-muted ${link.color}`}
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Credit */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              Built by{" "}
              <span className="font-semibold text-foreground">Mahmoud Maher</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
