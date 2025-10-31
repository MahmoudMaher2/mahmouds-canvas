import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border bg-card">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          Built by{" "}
          <span className="font-semibold text-foreground">Mahmoud Maher</span>
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
