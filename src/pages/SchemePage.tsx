import Schemes from "@/components/Schemes";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";
import { usePageSEO } from "@/hooks/usePageSEO";
import SectionSkeleton from "@/components/ui/skeletons/SectionSkeleton";

const SchemePage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  usePageSEO({
    title: `Government Schemes - ${config?.village.name || 'Village'} Gram Panchayat`,
    description: `Government welfare schemes and programs available in ${config?.village.name || 'Village'}. Learn about benefits, eligibility criteria, and application process.`,
    keywords: ['government schemes', 'welfare programs', 'benefits', 'eligibility', 'village schemes']
  });

  if (loading || !config) return <SectionSkeleton />;
  
  return isPageVisible("schemes") ? (
    <Schemes schemes={config.schemes} />
  ) : (
    <NotFound />
  );
};

export default SchemePage;
