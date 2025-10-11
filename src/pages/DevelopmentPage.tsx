import Development from "@/components/Development";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";
import { usePageSEO } from "@/hooks/usePageSEO";
import SectionSkeleton from "@/components/ui/skeletons/SectionSkeleton";

const DevelopmentPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  usePageSEO({
    title: `Development Projects - ${config?.village.name || 'Village'} Gram Panchayat`,
    description: `Ongoing and completed development projects in ${config?.village.name || 'Village'}. Infrastructure improvements, public works, and village development initiatives.`,
    keywords: ['development projects', 'infrastructure', 'public works', 'village development', 'ongoing projects']
  });

  if (loading || !config) return <SectionSkeleton />;
  
  return isPageVisible("development") ? (
    <Development developmentWorks={config.developmentWorks} />
  ) : (
    <NotFound />
  );
};

export default DevelopmentPage;
