import Contact from "@/components/Contact";
import CustomLoader from "@/components/CustomLoader";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";

const ContactUsPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  if (loading || !config) return <CustomLoader />;
  return isPageVisible("contact") ? (
    <Contact contact={config.contact} documents={config.documents} />
  ) : (
    <NotFound />
  );
};

export default ContactUsPage;
