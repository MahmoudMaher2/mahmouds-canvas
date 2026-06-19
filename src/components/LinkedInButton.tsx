import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const LinkedInButton = () => {
  return (
    <a
      href="https://www.linkedin.com/in/mahmoud-maher74/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40"
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#0077B5] hover:bg-[#006097]"
      >
        <img
          src="/icons/linkedin.png"
          alt="LinkedIn"
          className="h-14 w-14 object-contain"
        />
      </Button>
    </a>
  );
};

export default LinkedInButton;
