import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";
import CustomLoader from "@/components/CustomLoader";
import Services from "@/components/Services";

const ServicePage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  if (loading || !config) return <CustomLoader />;
  return isPageVisible("services") ? (
    <Services services={config.services} />
  ) : (
    <NotFound />
  );
};

export default ServicePage;
