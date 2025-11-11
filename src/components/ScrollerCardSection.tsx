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
    <section className="relative bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-border overflow-hidden py-8">
      <div className="container mx-auto px-4">
        {/* Scrolling Cards Container */}
        <div className="overflow-hidden relative w-full flex items-center">
          <div className="animate-scroll-left flex gap-6 whitespace-nowrap items-stretch">
            {/* Duplicate cards for seamless loop */}
            {[...cards, ...cards].map((card, index) => (
              <Card
                key={`${card.id}-${index}`}
                className="inline-flex flex-col shrink-0 w-80 md:w-96 lg:w-[28rem] bg-card/90 hover:shadow-xl backdrop-blur-md border border-border/40 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-5 flex flex-col gap-4 h-full">
                  {/* Top section: photo + name side by side */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    {card.image && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary/20 flex-shrink-0">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-lg md:text-xl text-center sm:text-left text-foreground break-words">
                      {card.title}
                    </h3>
                  </div>

                  {/* Bottom: description full width */}
                  <p className="text-sm md:text-base text-muted-foreground text-center sm:text-left whitespace-normal break-words">
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
