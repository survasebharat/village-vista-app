import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const languages = [
     { code: "mr", name: "मराठी" },
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
 
  ];

  const currentIndex = languages.findIndex(
    (lang) => lang.code === i18n.language
  );

  const toggleLanguage = () => {
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];
    i18n.changeLanguage(nextLanguage.code);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-foreground hover:text-primary bg-accent"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">
        {languages[currentIndex]?.name || "English"}
      </span>
      <span className="sm:hidden capitalize">
        {languages[currentIndex]?.code || "en"}
      </span>
    </Button>
  );
};

export default LanguageToggle;
