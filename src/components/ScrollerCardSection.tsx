import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface ScrollerCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

interface ScrollerCardSectionProps {
  cards: ScrollerCard[];
}

const ScrollerCardSection = ({ cards }: ScrollerCardSectionProps) => {
  const { t } = useTranslation();

  if (!cards || cards.length === 0) return null;

  return (
    <section className="relative bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-border overflow-hidden" style={{ height: '20vh', minHeight: '150px' }}>
      <div className="container mx-auto px-4 h-full flex items-center">
        {/* Scrolling Cards Container */}
        <div className="overflow-hidden relative w-full h-full flex items-center">
          <div className="animate-scroll-left flex gap-6 whitespace-nowrap h-full items-center py-4">
            {/* Duplicate cards for seamless loop */}
            {[...cards, ...cards].map((card, index) => (
              <Card
                key={`${card.id}-${index}`}
                className="inline-flex shrink-0 w-80 h-full hover-lift transition-all duration-300 hover:shadow-lg bg-card/80 backdrop-blur-sm border-border/50"
              >
                <CardContent className="p-4 flex flex-col justify-center gap-2 w-full">
                  {card.image && (
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-primary/20">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 whitespace-normal">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ScrollerCardSection);
