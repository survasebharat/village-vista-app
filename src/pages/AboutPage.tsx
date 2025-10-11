import About from "@/components/About";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";
import { usePageSEO } from "@/hooks/usePageSEO";
import SectionSkeleton from "@/components/ui/skeletons/SectionSkeleton";

const AboutPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  usePageSEO({
    title: `About ${config?.village.name || 'Village'} - Gram Panchayat`,
    description: config?.village.description || `Learn about ${config?.village.name || 'Village'} village - its history, demographics, culture, and development. Official information from the Gram Panchayat.`,
    keywords: ['village information', 'demographics', 'history', 'culture', 'about village']
  });

  if (loading || !config) return <SectionSkeleton />;

  return isPageVisible("about") ? (
    <About village={config.village} />
  ) : (
    <NotFound />
  );
};

export default AboutPage;
