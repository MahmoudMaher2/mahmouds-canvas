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
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 bg-[#0077B5] hover:bg-[#006097] animate-float"
      >
        <img
          src="/icons/linkedin.png"
          alt="LinkedIn"
          className="h-14 w-14 object-contain transform transition-transform duration-500 hover:scale-110 hover:rotate-6 drop-shadow-[0_0_5px_#0077B5] hover:drop-shadow-[0_0_8px_#00A0DC]"
        />
      </Button>
    </a>
  );
};

export default LinkedInButton;
