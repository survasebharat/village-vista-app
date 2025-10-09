import CustomLoader from "@/components/CustomLoader";
import Announcements from "@/components/Announcements";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext, useEffect } from "react";
import NotFound from "./NotFound";
import { usePageSEO } from "@/hooks/usePageSEO";

const AnnouncementsPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  usePageSEO({
    title: `Announcements - ${config?.village.name || 'Village'} Gram Panchayat`,
    description: `Latest announcements and updates from ${config?.village.name || 'Village'} Gram Panchayat. Stay informed about meetings, events, and important notices.`,
    keywords: ['announcements', 'village notices', 'panchayat updates', 'village meetings']
  });

  if (loading || !config) return <CustomLoader />;
  
  return isPageVisible("announcement") ? (
    <Announcements announcements={config.announcements} />
  ) : (
    <NotFound />
  );
};

export default AnnouncementsPage;
