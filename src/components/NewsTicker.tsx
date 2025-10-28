import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Megaphone } from "lucide-react";

interface NewsItem {
  id: string;
  text: string;
  priority?: "high" | "medium" | "low";
}

interface NewsTickerProps {
  news: NewsItem[];
}

const NewsTicker = ({ news }: NewsTickerProps) => {
  const { t } = useTranslation();

  if (!news || news.length === 0) return null;

  return (
    <section className="relative bg-primary/10 border-y border-primary/20 py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          {/* Icon Label */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-primary text-primary-foreground p-2 rounded-full animate-pulse">
              <Megaphone className="h-4 w-4" />
            </div>
            <span className="font-semibold text-primary hidden sm:inline">
              {t("news.latest", "Latest News")}
            </span>
          </div>

          {/* Scrolling News Container */}
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-scroll-left flex gap-8 whitespace-nowrap">
              {/* Duplicate news items for seamless loop */}
              {[...news, ...news].map((item, index) => (
                <span
                  key={`${item.id}-${index}`}
                  className={`inline-flex items-center gap-2 text-sm ${
                    item.priority === "high"
                      ? "text-destructive font-semibold"
                      : "text-foreground"
                  }`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(NewsTicker);
