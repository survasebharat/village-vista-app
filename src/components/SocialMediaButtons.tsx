import { memo } from 'react';
import { Facebook, Twitter, Youtube, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SocialMediaButtonsProps {
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
    youtube?: string;
    arattai?: string;
  };
  className?: string;
}

const SocialMediaButtons = ({ social, className = '' }: SocialMediaButtonsProps) => {
  if (!social) return null;

  const socialLinks = [
    { name: 'Facebook', url: social.facebook, icon: Facebook },
    { name: 'Twitter', url: social.twitter, icon: Twitter },
    { name: 'YouTube', url: social.youtube, icon: Youtube },
    { name: 'Instagram', url: social.instagram, icon: Share2 },
    { name: 'WhatsApp', url: social.whatsapp, icon: Share2 },
    { name: 'Arattai', url: social.arattai, icon: Share2 },
  ].filter(link => link.url); // Only show links that exist

  if (socialLinks.length === 0) return null;

  return (
    <TooltipProvider>
      <div className={`flex items-center gap-2 ${className}`}>
        {socialLinks.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <link.icon className="h-4 w-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default memo(SocialMediaButtons);
