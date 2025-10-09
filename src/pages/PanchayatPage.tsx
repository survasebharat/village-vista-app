import CustomLoader from "@/components/CustomLoader";
import Panchayat from "@/components/Panchayat";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";
import { usePageSEO } from "@/hooks/usePageSEO";

const PanchayatPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  usePageSEO({
    title: `Panchayat Members - ${config?.village.name || 'Village'} Gram Panchayat`,
    description: `Meet the elected representatives of ${config?.village.name || 'Village'} Gram Panchayat. Information about Sarpanch, ward members, and panchayat officials.`,
    keywords: ['panchayat members', 'sarpanch', 'ward members', 'elected representatives', 'village officials']
  });

  if (loading || !config) return <CustomLoader />;
  
  return isPageVisible("panchayat") ? (
    <Panchayat panchayat={config.panchayat} />
  ) : (
    <NotFound />
  );
};

export default PanchayatPage;
