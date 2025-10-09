import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";
import CustomLoader from "@/components/CustomLoader";
import Services from "@/components/Services";
import { usePageSEO } from "@/hooks/usePageSEO";

const ServicePage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  usePageSEO({
    title: `Village Services - ${config?.village.name || 'Village'} Gram Panchayat`,
    description: `Essential services available in ${config?.village.name || 'Village'} including healthcare, education, shops, and other facilities for residents.`,
    keywords: ['village services', 'healthcare', 'education', 'shops', 'facilities', 'public services']
  });

  if (loading || !config) return <CustomLoader />;
  
  return isPageVisible("services") ? (
    <Services services={config.services} />
  ) : (
    <NotFound />
  );
};

export default ServicePage;
