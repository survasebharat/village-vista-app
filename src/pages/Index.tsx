import { useContext } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Panchayat from "@/components/Panchayat";
import Announcements from "@/components/Announcements";
import Schemes from "@/components/Schemes";
import Services from "@/components/Services";
import Development from "@/components/Development";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import { VillageContext } from "@/context/VillageContextConfig";
import CustomLoader from "@/components/CustomLoader";
import { usePageSEO } from "@/hooks/usePageSEO";

const Index = () => {
  const { config, isPageVisible, loading } = useContext(VillageContext);

  usePageSEO({
    title: `${config?.village.name || 'Village'} Gram Panchayat | Official Website`,
    description: config?.village.description || `Official website of ${config?.village.name || 'Village'} Gram Panchayat. Access government schemes, development projects, announcements, services, and contact information.`,
    keywords: ['gram panchayat', 'village website', 'government schemes', 'development projects', 'village services', config?.village.name || 'village']
  });

  if (loading || !config) return <CustomLoader />;

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <Hero village={config.village} panchayat={config.panchayat} />

        {/* Latest Announcements */}
        {isPageVisible("announcement") && (
          <Announcements announcements={config.announcements} />
        )}

        {/* About Village Section */}
        {isPageVisible("about") && <About village={config.village} />}

        {/* Panchayat Information */}
        {isPageVisible("panchayat") && (
          <Panchayat panchayat={config.panchayat} />
        )}

        {/* Government Schemes */}
        {isPageVisible("schemes") && <Schemes schemes={config.schemes} />}

        {/* Village Services */}
        {isPageVisible("services") && <Services services={config.services} />}

        {/* Development Projects */}
        {isPageVisible("development") && (
          <Development developmentWorks={config.developmentWorks} />
        )}

        {/* Gallery */}
        {isPageVisible("gallery") && <Gallery gallery={config.gallery} />}

        {/* Contact Information */}
        {isPageVisible("contact") && (
          <Contact contact={config.contact} documents={config.documents} />
        )}
      </main>
    </div>
  );
};

export default Index;
