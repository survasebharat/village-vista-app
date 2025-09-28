import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    if (language === 'en') {
      setLanguage('mr');
    } else if (language === 'mr') {
      setLanguage('hi');
    } else {
      setLanguage('en');
    }
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'en':
        return 'मराठी';
      case 'mr':
        return 'हिन्दी';
      case 'hi':
        return 'English';
      default:
        return 'English';
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 text-primary-foreground hover:bg-primary/20"
    >
      <Globe className="h-4 w-4" />
      {getLanguageLabel()}
    </Button>
  );
};