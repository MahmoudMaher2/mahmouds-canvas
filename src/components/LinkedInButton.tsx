import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const LinkedInButton = () => {
  return (
    <a
      href="https://www.linkedin.com/in/mahmoud-maher74/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 animate-fade-in"
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
      >
        <Linkedin className="h-6 w-6" />
      </Button>
    </a>
  );
};

export default LinkedInButton;
