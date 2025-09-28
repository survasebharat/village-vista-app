import { Calendar, Camera, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import villageData from "@/data/villageData.json";

const Gallery = () => {
  const { gallery } = villageData;

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
            Village Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore memorable moments from our village life, festivals, development 
            projects, and community events that showcase our rich heritage and progress.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gallery.map((item, index) => (
            <Card 
              key={item.title} 
              className="card-elegant hover-lift cursor-pointer animate-slide-up overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {/* Placeholder Image */}
                <div className={`
                  aspect-video w-full flex items-center justify-center text-white text-6xl 
                  ${generatePlaceholderImage(item.title, item.type)}
                  group-hover:scale-105 transition-transform duration-300
                `}>
                  {getTypeIcon(item.type)}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Play Button for Videos */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    {item.type === "festival" ? (
                      <Play className="h-8 w-8 text-primary ml-1" />
                    ) : (
                      <Camera className="h-8 w-8 text-primary" />
                    )}
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={getTypeColor(item.type)}>
                    {item.type}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
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
              Gallery Categories
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
                    {category.count} {category.count === 1 ? 'photo' : 'photos'}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    View All
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        {/* <div className="mt-16 text-center">
          <Card className="card-elegant max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold mb-4">Share Your Village Moments</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Have photos or videos from village events? Share them with us to be 
                featured in our community gallery. Help us document our village's 
                journey and celebrate our achievements together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Camera className="h-4 w-4" />
                  <span>Photos & Videos Welcome</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge className="h-4 w-4" />
                  <span>Community Moderated</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </section>
  );
};

export default Gallery;