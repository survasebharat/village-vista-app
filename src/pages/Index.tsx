import { useContext, lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import CustomLoader from "@/components/CustomLoader";
import { VillageContext } from "@/context/VillageContextConfig";
import { usePageSEO } from "@/hooks/usePageSEO";
import HeroSkeleton from "@/components/ui/skeletons/HeroSkeleton";
import SectionSkeleton from "@/components/ui/skeletons/SectionSkeleton";
import GallerySkeleton from "@/components/ui/skeletons/GallerySkeleton";

// Lazy load non-critical components
const About = lazy(() => import("@/components/About"));
const Panchayat = lazy(() => import("@/components/Panchayat"));
const Announcements = lazy(() => import("@/components/Announcements"));
const Schemes = lazy(() => import("@/components/Schemes"));
const Services = lazy(() => import("@/components/Services"));
const Development = lazy(() => import("@/components/Development"));
const Gallery = lazy(() => import("@/components/Gallery"));
const Contact = lazy(() => import("@/components/Contact"));

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
        {/* Hero Section - Load immediately */}
        <Suspense fallback={<HeroSkeleton />}>
          <Hero village={config.village} panchayat={config.panchayat} />
        </Suspense>

        {/* Latest Announcements */}
        {isPageVisible("announcement") && (
          <Suspense fallback={<SectionSkeleton />}>
            <Announcements announcements={config.announcements} />
          </Suspense>
        )}

        {/* About Village Section */}
        {isPageVisible("about") && (
          <Suspense fallback={<SectionSkeleton />}>
            <About village={config.village} />
          </Suspense>
        )}

        {/* Panchayat Information */}
        {isPageVisible("panchayat") && (
          <Suspense fallback={<SectionSkeleton />}>
            <Panchayat panchayat={config.panchayat} />
          </Suspense>
        )}

        {/* Government Schemes */}
        {isPageVisible("schemes") && (
          <Suspense fallback={<SectionSkeleton />}>
            <Schemes schemes={config.schemes} />
          </Suspense>
        )}

        {/* Village Services */}
        {isPageVisible("services") && (
          <Suspense fallback={<SectionSkeleton />}>
            <Services services={config.services} />
          </Suspense>
        )}

        {/* Development Projects */}
        {isPageVisible("development") && (
          <Suspense fallback={<SectionSkeleton />}>
            <Development developmentWorks={config.developmentWorks} />
          </Suspense>
        )}

        {/* Gallery */}
        {isPageVisible("gallery") && (
          <Suspense fallback={<GallerySkeleton />}>
            <Gallery gallery={config.gallery} />
          </Suspense>
        )}

        {/* Contact Information */}
        {isPageVisible("contact") && (
          <Suspense fallback={<SectionSkeleton />}>
            <Contact contact={config.contact} documents={config.documents} />
          </Suspense>
        )}
      </main>
    </div>
  );
};

export default Index;
