import CustomLoader from "@/components/CustomLoader";
import Panchayat from "@/components/Panchayat";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";

const PanchayatPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  if (loading || !config) return <CustomLoader />;
  return isPageVisible("panchayat") ? (
    <Panchayat panchayat={config.panchayat} />
  ) : (
    <NotFound />
  );
};

export default PanchayatPage;
