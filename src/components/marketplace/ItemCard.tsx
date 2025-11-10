import { Calendar, MapPin, Phone, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Item {
  id: string;
  item_name: string;
  category: string;
  price: number;
  village: string;
  contact: string;
  image_urls: string[];
  created_at: string;
}

interface ItemCardProps {
  item: Item;
  onClick: () => void;
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

const ItemCard = ({ item, onClick }: ItemCardProps) => {
  const formattedDate = new Date(item.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Card
      onClick={onClick}
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
    >
      {/* Image */}
      <div className="aspect-square bg-muted overflow-hidden relative">
        {item.image_urls[0] ? (
          <img
            src={item.image_urls[0]}
            alt={item.item_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {getCategoryIcon(item.category)}
          </div>
        )}
        <Badge className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm">
          {getCategoryIcon(item.category)} {item.category}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Item Name */}
        <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {item.item_name}
        </h3>

        {/* Price */}
        <div className="text-2xl font-bold text-primary">
          ₹{item.price.toLocaleString('en-IN')}
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{item.village}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{item.contact}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
