import CustomLoader from "@/components/CustomLoader";
import Development from "@/components/Development";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";

const DevelopmentPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  if (loading || !config) return <CustomLoader />;
  return isPageVisible("development") ? (
    <Development developmentWorks={config.developmentWorks} />
  ) : (
    <NotFound />
  );
};

export default DevelopmentPage;
