import CustomLoader from "@/components/CustomLoader";
import Gallery from "@/components/Gallery";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";
import { usePageSEO } from "@/hooks/usePageSEO";

const GalleryPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  usePageSEO({
    title: `Gallery - ${config?.village.name || 'Village'} Gram Panchayat`,
    description: `Photo gallery showcasing festivals, development projects, and cultural events in ${config?.village.name || 'Village'}. View images of village activities and progress.`,
    keywords: ['village gallery', 'photos', 'events', 'festivals', 'development projects']
  });

  if (loading || !config) return <CustomLoader />;
  
  return isPageVisible("gallery") ? (
    <Gallery gallery={config.gallery} />
  ) : (
    <NotFound />
  );
};

export default GalleryPage;
