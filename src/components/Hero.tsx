import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTranslation } from 'react-i18next';
import Autoplay from "embla-carousel-autoplay";
import { useRef, memo } from "react";

interface HeroProps {
  village: any;
  panchayat: any;
}

const Hero = ({ village, panchayat }: HeroProps) => {

  const { t } = useTranslation();
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  
  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-[85vh] flex items-center">
      {/* Background Carousel */}
      <div className="absolute inset-0 h-full overflow-hidden">
        <Carousel 
          className="w-full h-full"
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="h-full -ml-0">
            {[...village.heroImages].map((image, index) => (
              <CarouselItem key={index} className="h-full pl-0 basis-full">
                <div className="relative w-full h-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover object-center"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding={index === 0 ? "sync" : "async"}
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 md:left-6 bg-white/90 backdrop-blur-sm border-white text-foreground hover:bg-white transition-all w-9 h-9 md:w-10 md:h-10" />
          <CarouselNext className="right-3 md:right-6 bg-white/90 backdrop-blur-sm border-white text-foreground hover:bg-white transition-all w-9 h-9 md:w-10 md:h-10" />
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {t('hero.title')}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/95 font-medium">
              {t('hero.subtitle')}
            </p>

            {/* Sarpanch Card */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 p-4 md:p-5 max-w-md shadow-lg">
              <blockquote className="text-foreground/90 text-sm md:text-base mb-3 italic">
                "{t('panchayat.message')}"
              </blockquote>
              <div className="flex items-center gap-3">
                {panchayat.sarpanch.image ? (
                  <img 
                    src={panchayat.sarpanch.image} 
                    alt={panchayat.sarpanch.name}  
                    className="w-10 h-10 rounded-full ring-2 ring-primary object-cover" 
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
                    {panchayat.sarpanch.name.charAt(0)} 
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground text-sm md:text-base">
                    {panchayat.sarpanch.name}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {t('panchayat.sarpanch')} ({panchayat.sarpanch.tenure})
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);