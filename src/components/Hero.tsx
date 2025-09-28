import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import villageData from "@/data/villageData.json";

const Hero = () => {
  const { village, panchayat } = villageData;
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {village.heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Text */}
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.welcome')}{" "}
              <span className="text-accent-light">
                {village.name}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-gray-100">
              {village.state}, {village.district} District
            </p>
            
            <p className="text-lg mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Sarpanch Message */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 mb-8 max-w-2xl mx-auto">
              <blockquote className="text-gray-100 italic text-lg mb-4">
                "{panchayat.sarpanch.message}"
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
                    Sarpanch ({panchayat.sarpanch.tenure})
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent-light font-semibold"
              >
                {t('hero.explore')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                View Schemes & Services
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