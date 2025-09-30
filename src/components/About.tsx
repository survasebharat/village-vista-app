import { MapPin, Users, GraduationCap, Calendar, Mountain, Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';
import villageData from "@/data/villageData.json";

const About = () => {
  const { village } = villageData;
  const { t } = useTranslation();

  const geographyStats = [
    {
      icon: MapPin,
      label: t('common.coordinates'),
      value: `${village.geography.latitude}°N, ${village.geography.longitude}°E`,
    },
    {
      icon: Mountain,
      label: t('common.altitude'),
      value: village.geography.altitude,
    },
    {
      icon: Compass,
      label: t('common.area'),
      value: village.area,
    },
  ];

  const demographics = [
    {
      icon: Users,
      label: t('common.totalPopulation'),
      value: village.population.total.toLocaleString(),
      color: "bg-primary",
    },
    {
      icon: Users,
      label: t('common.malePopulation'),
      value: village.population.male.toLocaleString(),
      color: "bg-accent",
    },
    {
      icon: Users,
      label: t('common.femalePopulation'), 
      value: village.population.female.toLocaleString(),
      color: "bg-success",
    },
    {
      icon: GraduationCap,
      label: t('common.literacyRate'),
      value: village.population.literacy,
      color: "bg-warning",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Village Information */}
          <div className="space-y-8 animate-slide-up">
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  {t('about.location')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {geographyStats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover-lift transition-all duration-300 animate-fade-in">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{stat.label}</p>
                        <p className="text-muted-foreground">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 rounded-lg bg-primary/5 border-l-4 border-primary animate-slide-up">
                  <p className="text-sm text-muted-foreground mb-2">{t('common.administrativeDetails')}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">{t('common.district')}:</span> {village.district}
                    </div>
                    <div>
                      <span className="font-medium">{t('common.state')}:</span> {village.state}
                    </div>
                    <div>
                      <span className="font-medium">{t('common.pinCode')}:</span> {village.pincode}
                    </div>
                    <div>
                      <span className="font-medium">{t('about.established')}:</span> {village.established}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demographics */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Users className="h-6 w-6 text-primary" />
                  {t('about.population')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {demographics.map((stat, index) => (
                    <div 
                      key={stat.label} 
                      className="text-center p-4 rounded-lg hover-lift transition-all duration-300 animate-fade-in"
                      style={{ 
                        animationDelay: `${(index + 1) * 100}ms`,
                        background: `hsl(var(--muted) / 0.5)` 
                      }}
                    >
                      <div className={`w-12 h-12 ${stat.color} text-white rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-300 hover:scale-110`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 rounded-lg bg-success/5 border border-success/20 animate-slide-up">
                  <p className="text-success font-semibold text-center mb-2">
                    {t('common.genderRatio')}: {Math.round((village.population.female / village.population.male) * 1000)} {t('common.femalesPerMales')}
                  </p>
                  <p className="text-sm text-muted-foreground text-center">
                    {t('common.progressiveValues')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Culture & Traditions */}
        <Card className="card-elegant animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Calendar className="h-6 w-6 text-primary" />
              {t('about.culture')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our village celebrates rich cultural traditions that have been passed down through generations, 
              fostering community unity and preserving our heritage.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {village.culture.map((festival, index) => (
                <Badge 
                  key={festival} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm font-medium hover-lift animate-fade-in transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {festival}
                </Badge>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-accent-foreground text-center italic">
                "Unity in diversity, prosperity through tradition - celebrating our cultural heritage 
                while embracing modern development."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;