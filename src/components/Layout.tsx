import Header from "./Header";
import Footer from "./Footer";
import FeedbackForm from "./FeedbackForm";
import { useEffect } from "react";
import { VillageProvider } from "@/context/VillageContextConfig";

const Layout = ({ children }) => {
  useEffect(() => {
    // Update document title and meta tags for SEO
    document.title =
      "Shivankhed Khurd Gram Panchayat | Official Website | Maharashtra";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Official website of Shivankhed Khurd Gram Panchayat, Pune District, Maharashtra. Access government schemes, development projects, announcements, and services for rural development and transparent governance."
      );
    }

    // Add structured data for local government organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "GovernmentOrganization",
      name: "Shivankhed Khurd Gram Panchayat",
      description:
        "Village Panchayat serving the rural community with transparent governance and development initiatives",
      url: window.location.origin,
      telephone: "+91-20-2567-8901",
      email: "info@shivankhedkhurdgram.gov.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gram Panchayat Office, Shivankhed Khurd Village",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "18.5204",
        longitude: "73.8567",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-20-2567-8901",
        contactType: "customer service",
        availableLanguage: ["Hindi", "Marathi", "English"],
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  return (
    <div>
      <VillageProvider villageName="Shivankhed">
        <Header />
        {children}
        <Footer />
        <FeedbackForm />
      </VillageProvider>
    </div>
  );
};

export default Layout;
