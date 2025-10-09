import Contact from "@/components/Contact";
import CustomLoader from "@/components/CustomLoader";
import { VillageContext } from "@/context/VillageContextConfig";
import { useContext } from "react";
import NotFound from "./NotFound";
import { usePageSEO } from "@/hooks/usePageSEO";

const ContactUsPage = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  usePageSEO({
    title: `Contact Us - ${config?.village.name || 'Village'} Gram Panchayat`,
    description: `Contact ${config?.village.name || 'Village'} Gram Panchayat. Office address, phone numbers, email, working hours, and emergency contact information.`,
    keywords: ['contact', 'gram panchayat office', 'phone number', 'email', 'address', 'emergency contacts']
  });

  if (loading || !config) return <CustomLoader />;
  
  return isPageVisible("contact") ? (
    <Contact contact={config.contact} documents={config.documents} />
  ) : (
    <NotFound />
  );
};

export default ContactUsPage;
