import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Phone, Tag, MessageCircle, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";

interface Item {
  id: string;
  item_name: string;
  category: string;
  price: number;
  description: string | null;
  village: string;
  contact: string;
  image_urls: string[];
  created_at: string;
}

interface ItemPopupProps {
  item: Item;
  open: boolean;
  onClose: () => void;
}

const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: string } = {
    "Farming Tools": "🚜",
    "Vegetables": "🥬",
    "Electronics": "📱",
    "Vehicles": "🚗",
    "Mobile Phones": "📱",
    "Animals": "🐄",
    "Household Items": "🏠",
    "Furniture": "🪑",
    "Construction Tools": "🔨",
    "Seeds & Fertilizers": "🌱",
    "Other": "📦"
  };
  return icons[category] || "📦";
};

const ItemPopup = ({ item, open, onClose }: ItemPopupProps) => {
  const { toast } = useToast();

  const formattedDate = new Date(item.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in "${item.item_name}" listed for ₹${item.price}`;
    const whatsappUrl = `https://wa.me/${item.contact}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: item.item_name,
      text: `Check out this item: ${item.item_name} for ₹${item.price}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Item link copied to clipboard"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.item_name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Carousel */}
          <div className="space-y-4">
            {item.image_urls.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {item.image_urls.map((url, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <img
                          src={url}
                          alt={`${item.item_name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {item.image_urls.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-8xl">
                {getCategoryIcon(item.category)}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Price */}
            <div>
              <div className="text-3xl font-bold text-primary">
                ₹{item.price.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Category Badge */}
            <Badge variant="secondary" className="text-base">
              {getCategoryIcon(item.category)} {item.category}
            </Badge>

            {/* Description */}
            {item.description && (
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{item.village}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <a 
                  href={`tel:${item.contact}`}
                  className="font-medium text-primary hover:underline"
                >
                  {item.contact}
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-5 w-5 flex-shrink-0" />
                <span>Posted on {formattedDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="w-full gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Contact via WhatsApp
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full gap-2"
              >
                <a href={`tel:${item.contact}`}>
                  <Phone className="h-5 w-5" />
                  Call Seller
                </a>
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="lg"
                className="w-full gap-2"
              >
                <Share2 className="h-5 w-5" />
                Share Item
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemPopup;
