import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTranslation } from 'react-i18next';
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import villageData from "@/data/villageData.json";
import villageScene1 from "@/assets/village-scene-1.jpg";
import villageScene2 from "@/assets/village-scene-2.jpg";
import villageScene3 from "@/assets/village-scene-3.jpg";

const Hero = () => {
  const { village, panchayat } = villageData;
  const { t } = useTranslation();
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  
  const carouselImages = [
    { src: villageScene1, alt: "Shivankhed Village Landscape" },
    { src: villageScene2, alt: "Shivankhed Village Festival" },
    { src: villageScene3, alt: "Shivankhed Village Development" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Carousel */}
      <div className="absolute inset-0 h-full min-h-screen overflow-hidden">
        <Carousel 
          className="w-full h-full"
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="h-full -ml-0">
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="h-full pl-0 basis-full">
                <div className="relative w-full h-full min-h-screen">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full min-h-screen object-cover object-center transition-transform duration-700 ease-in-out"
                    style={{
                      objectPosition: 'center center'
                    }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 sm:left-4 md:left-8 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 w-10 h-10 sm:w-12 sm:h-12" />
          <CarouselNext className="right-2 sm:right-4 md:right-8 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 w-10 h-10 sm:w-12 sm:h-12" />
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40 animate-fade-in" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Text */}
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-gray-100">
              {t('hero.subtitle')}
            </p>
            
            <p className="text-lg mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Sarpanch Message */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 mb-8 max-w-2xl mx-auto">
              <blockquote className="text-gray-100 italic text-lg mb-4">
                "{t('panchayat.message')}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-semibold">
                  {panchayat.sarpanch.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {panchayat.sarpanch.name}
                  </p>
                  <p className="text-sm text-gray-300">
                    {t('panchayat.sarpanch')} ({panchayat.sarpanch.tenure})
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent-light text-accent-foreground font-semibold px-8 py-6 text-lg animate-pulse-glow"
              >
                {t('hero.explore')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/80 text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg backdrop-blur-sm"
              >
                {t('hero.contact')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;