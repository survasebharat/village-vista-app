import { Phone, Clock, MapPin, Store, Car, User, GraduationCap, Coffee, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

interface ServicesProps {
  services: any[];
}

const Services = ({ services }: ServicesProps) => {
  const { t } = useTranslation();

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "retail & grocery":
        return Store;
      case "transportation":
        return Car;
      case "religious services":
        return User;
      case "education":
        return GraduationCap;
      case "food & dining":
        return Coffee;
      case "healthcare":
        return Heart;
      default:
        return Store;
    }
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover all the essential services available in our village community, 
            from local businesses to healthcare and education.
          </p>
        </div>

        {/* Services Categories */}
        <div className="space-y-12">
          {services.map((category, categoryIndex) => {
            const IconComponent = getCategoryIcon(category.category);
            
            return (
              <div 
                key={category.category}
                className="animate-fade-in"
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-gradient">
                    {t(`services.category.${category.category.toLowerCase().replace(/[^a-z0-9]/g, '')}`)}
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((service, serviceIndex) => (
                    <Card 
                      key={service.name}
                      className="card-elegant hover-lift animate-slide-up"
                      style={{ animationDelay: `${(categoryIndex * 3 + serviceIndex) * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                          <img 
                            src={service.image} 
                            alt={service.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        {service.owner && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{t('services.owner')}: {service.owner}</span>
                          </div>
                        )}
                        {service.doctor && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{t('services.doctor')}: {service.doctor}</span>
                          </div>
                        )}
                        {service.teacher && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{t('services.teacher')}: {service.teacher}</span>
                          </div>
                        )}
                        {service.pujari && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{t('services.pujari')}: {service.pujari}</span>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {service.address && (
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span>{service.address}</span>
                          </div>
                        )}
                        
                        {(service.hours || service.timing || service.timings) && (
                          <div className="flex items-start gap-2 text-sm">
                            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span>{service.hours || service.timing || service.timings}</span>
                          </div>
                        )}
                        
                        {service.speciality && (
                          <Badge variant="secondary" className="w-fit">
                            {service.speciality}
                          </Badge>
                        )}
                        
                        {service.subjects && (
                          <Badge variant="secondary" className="w-fit">
                            {service.subjects}
                          </Badge>
                        )}
                        
                        {service.services && (
                          <Badge variant="secondary" className="w-fit">
                            {service.services}
                          </Badge>
                        )}
                        
                        {service.vehicle && (
                          <div className="text-sm">
                            <strong>Vehicle:</strong> {service.vehicle}
                          </div>
                        )}
                        
                        {service.routes && (
                          <div className="text-sm">
                            <strong>Routes:</strong> {service.routes}
                          </div>
                        )}
                        
                        {service.deity && (
                          <div className="text-sm">
                            <strong>Deity:</strong> {service.deity}
                          </div>
                        )}
                        
                        <Button variant="outline" className="w-full mt-4">
                          <Phone className="h-4 w-4 mr-2" />
                          {service.contact}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Services);