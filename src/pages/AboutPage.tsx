import About from "@/components/About";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";
import { Loader2 } from "lucide-react";
import CustomLoader from "@/components/CustomLoader";

const AboutPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  if (loading || !config) return <CustomLoader />;

  return isPageVisible("about") ? (
    <About village={config.village} />
  ) : (
    <NotFound />
  );
};

export default AboutPage;
