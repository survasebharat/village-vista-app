import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import CustomLoader from "./components/CustomLoader";
import { CUSTOM_ROUTES } from "./custom-routes";
import Layout from "./components/Layout";
import SectionSkeleton from "./components/ui/skeletons/SectionSkeleton";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const VillageManagement = lazy(() => import("./pages/VillageManagement"));
const JsonConfigManager = lazy(() => import("./pages/JsonConfigManager"));
const ContactMessagesAdmin = lazy(() => import("./pages/ContactMessagesAdmin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const PanchayatPage = lazy(() => import("./pages/PanchayatPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const SchemePage = lazy(() => import("./pages/SchemePage"));
const DevelopmentPage = lazy(() => import("./pages/DevelopmentPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AnnouncementsPage = lazy(() => import("./pages/AnnouncementsPage"));
const NoticesPage = lazy(() => import("./pages/NoticesPage"));
const MarketPricesPage = lazy(() => import("./pages/MarketPricesPage"));
const TaxPaymentPage = lazy(() => import("./pages/TaxPaymentPage"));
const TaxPaymentReceipt = lazy(() => import("./pages/TaxPaymentReceipt"));
const ForumPage = lazy(() => import("./pages/ForumPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<SectionSkeleton />}>
          <Routes>
            {/* Auth routes without layout */}
            <Route path={CUSTOM_ROUTES.AUTH} element={<Auth />} />

         

          {/* Public routes with full layout and village context */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path={CUSTOM_ROUTES.HOME} element={<Index />} />
                  <Route path={CUSTOM_ROUTES.ABOUT} element={<AboutPage />} />
                  <Route
                    path={CUSTOM_ROUTES.SERVICES}
                    element={<ServicePage />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.PANCHAYAT}
                    element={<PanchayatPage />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.CONTACT_US}
                    element={<ContactUsPage />}
                  />
                  <Route path={CUSTOM_ROUTES.SCHEME} element={<SchemePage />} />
                  <Route
                    path={CUSTOM_ROUTES.DEVELOPMENT}
                    element={<DevelopmentPage />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.GALLERY}
                    element={<GalleryPage />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.ANNOUNCEMENTS}
                    element={<AnnouncementsPage />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.NOTICES}
                    element={<NoticesPage />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.MARKET_PRICES}
                    element={<MarketPricesPage />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.TAX_PAYMENT}
                    element={<TaxPaymentPage />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.TAX_PAYMENT_RECEIPT}
                    element={<TaxPaymentReceipt />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.NOT_FOUND}
                    element={<NotFound />}
                  />
                   {/* Admin routes with basic layout (no village context) */}
                  <Route path={CUSTOM_ROUTES.ADMIN} element={<Admin />} />
                  <Route
                    path={CUSTOM_ROUTES.VILLAGE_MANAGEMENT}
                    element={<VillageManagement />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.JSON_CONFIG}
                    element={<JsonConfigManager />}
                  />
                  <Route path={CUSTOM_ROUTES.CONTACT_MESSAGE} element={<ContactMessagesAdmin />} />
                </Routes>
              </Layout>
            }
          />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
