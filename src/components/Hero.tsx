import { ArrowRight, MapPin, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import villageHero from "@/assets/village-hero.jpg";
import villageData from "@/data/villageData.json";

const Hero = () => {
  const { village, panchayat } = villageData;

  const stats = [
    {
      icon: Users,
      label: "Population",
      value: village.population.total.toLocaleString(),
    },
    {
      icon: MapPin,
      label: "Area",
      value: village.area,
    },
    {
      icon: Calendar,
      label: "Established",
      value: village.established,
    },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={villageHero}
          alt="Hariyali Village Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Text */}
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-accent-light">
                {village.name}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-gray-100">
              {village.state}, {village.district} District
            </p>
            
            <p className="text-lg mb-8 text-gray-200 max-w-xl leading-relaxed">
              {village.description}
            </p>

            {/* Sarpanch Message */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 mb-8">
              <blockquote className="text-gray-100 italic text-lg mb-4">
                "{panchayat.sarpanch.message}"
              </blockquote>
              <div className="flex items-center gap-3">
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
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent-light font-semibold"
              >
                Explore Our Village
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

          {/* Right Column - Stats Cards */}
          <div className="animate-slide-up">
            <div className="grid gap-6">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.label}
                  className="card-elegant p-6 hover-lift"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Vision Card */}
              <Card className="card-elegant p-6 hover-lift bg-gradient-primary text-primary-foreground">
                <h3 className="text-lg font-semibold mb-3">Our Vision</h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {village.vision}
                </p>
              </Card>
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