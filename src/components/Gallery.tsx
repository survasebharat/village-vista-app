import { Calendar, Camera, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';
import villageData from "@/data/villageData.json";
import galleryFestival1 from "@/assets/gallery-festival-1.jpg";
import galleryFestival2 from "@/assets/gallery-festival-2.jpg";
import galleryDevelopment1 from "@/assets/gallery-development-1.jpg";
import galleryDevelopment2 from "@/assets/gallery-development-2.jpg";
import galleryHealthcare1 from "@/assets/gallery-healthcare-1.jpg";
import galleryEducation1 from "@/assets/gallery-education-1.jpg";

const Gallery = () => {
  const { gallery } = villageData;
  const { t } = useTranslation();
  
  // Map gallery items to real images
  const galleryImages: Record<string, string> = {
    "Ganesh Festival 2023": galleryFestival1,
    "Road Construction Project": galleryDevelopment1,
    "Health Camp 2023": galleryHealthcare1,
    "School Renovation": galleryEducation1,
    "Diwali Celebration": galleryFestival2,
    "Water Tank Construction": galleryDevelopment2
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "festival":
        return "bg-accent text-accent-foreground";
      case "development":
        return "bg-primary text-primary-foreground";
      case "healthcare":
        return "bg-success text-success-foreground";
      case "education":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "festival":
        return "🎉";
      case "development":
        return "🏗️";
      case "healthcare":
        return "🏥";
      case "education":
        return "📚";
      default:
        return "📸";
    }
  };

  // Generate placeholder images for each gallery item
  const generatePlaceholderImage = (title: string, type: string) => {
    const colors = {
      festival: "from-orange-400 to-pink-500",
      development: "from-blue-500 to-green-500",
      healthcare: "from-green-400 to-blue-500",
      education: "from-purple-400 to-blue-500"
    };
    
    return `bg-gradient-to-br ${colors[type as keyof typeof colors] || 'from-gray-400 to-gray-600'}`;
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('gallery.description')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {gallery.map((item, index) => (
            <Card 
              key={item.title} 
              className="card-elegant hover-lift cursor-pointer animate-slide-up overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {/* Real or Placeholder Image */}
                {galleryImages[item.title] ? (
                  <img
                    src={galleryImages[item.title]}
                    alt={item.title}
                    className="aspect-video w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className={`
                    aspect-video w-full flex items-center justify-center text-white text-4xl sm:text-6xl 
                    ${generatePlaceholderImage(item.title, item.type)}
                    group-hover:scale-105 transition-transform duration-300
                  `}>
                    {getTypeIcon(item.type)}
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Play Button for Videos */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center">
                    {item.type === "festival" ? (
                      <Play className="h-6 w-6 sm:h-8 sm:w-8 text-primary ml-1" />
                    ) : (
                      <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    )}
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <Badge className={getTypeColor(item.type)}>
                    {item.type}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>
                    {new Date(item.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gallery Categories */}
        <Card className="card-elegant animate-fade-in">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
              {t('gallery.categories')}
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { type: "festival", label: "Festivals & Celebrations", count: 1, icon: "🎉" },
                { type: "development", label: "Development Projects", count: 1, icon: "🏗️" },
                { type: "healthcare", label: "Healthcare Initiatives", count: 1, icon: "🏥" },
                { type: "education", label: "Education Programs", count: 1, icon: "📚" },
              ].map((category, index) => (
                <div 
                  key={category.type}
                  className="text-center p-6 rounded-lg bg-muted/30 hover-lift cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h4 className="font-semibold mb-2">{category.label}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.count} {category.count === 1 ? t('gallery.photo') : t('gallery.photos')}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {t('gallery.viewAll')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <div className="mt-16 text-center">
          <Card className="card-elegant max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold mb-4">{t('gallery.shareYourMoments')}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t('gallery.uploadDescription')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Camera className="h-4 w-4" />
                  <span>{t('gallery.acceptedTypes')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge className="h-4 w-4" />
                  <span>{t('gallery.moderation')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Gallery;