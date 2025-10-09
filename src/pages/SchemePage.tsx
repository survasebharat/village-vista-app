import CustomLoader from "@/components/CustomLoader";
import Schemes from "@/components/Schemes";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";

const SchemePage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  if (loading || !config) return <CustomLoader />;
  return isPageVisible("schemes") ? (
    <Schemes schemes={config.schemes} />
  ) : (
    <NotFound />
  );
};

export default SchemePage;
