import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Panchayat from "@/components/Panchayat";
import Announcements from "@/components/Announcements";
import Schemes from "@/components/Schemes";
import Services from "@/components/Services";
import Development from "@/components/Development";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { usePageVisibility } from "@/hooks/usePageVisibility";

const Index = () => {
  const { isPageVisible } = usePageVisibility();
  useEffect(() => {
    // Update document title and meta tags for SEO
    document.title = "Hariyali Gram Panchayat | Official Website | Maharashtra";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Official website of Hariyali Gram Panchayat, Pune District, Maharashtra. Access government schemes, development projects, announcements, and services for rural development and transparent governance.'
      );
    }

    // Add structured data for local government organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "GovernmentOrganization",
      "name": "Hariyali Gram Panchayat",
      "description": "Village Panchayat serving the rural community with transparent governance and development initiatives",
      "url": window.location.origin,
      "telephone": "+91-20-2567-8901",
      "email": "info@hariyaligram.gov.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gram Panchayat Office, Hariyali Village",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "18.5204",
        "longitude": "73.8567"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-20-2567-8901",
        "contactType": "customer service",
        "availableLanguage": ["Hindi", "Marathi", "English"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
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
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Latest Announcements */}
        <Announcements />
        
        {/* About Village Section */}
        {isPageVisible("about") && <About />}
        
        {/* Panchayat Information */}
        {isPageVisible("panchayat") && <Panchayat />}
        
        {/* Government Schemes */}
        {isPageVisible("schemes") && <Schemes />}
        
        {/* Village Services */}
        {isPageVisible("services") && <Services />}
        
        {/* Development Projects */}
        {isPageVisible("development") && <Development />}
        
        {/* Gallery */}
        {isPageVisible("gallery") && <Gallery />}
        
        {/* Contact Information */}
        {isPageVisible("contact") && <Contact />}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;