import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import VillageManagement from "./pages/VillageManagement";
import JsonConfigManager from "./pages/JsonConfigManager";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import { CUSTOM_ROUTES } from "./custom-routes";
import Layout from "./components/Layout";
import ServicePage from "./pages/ServicePage";
import PanchayatPage from "./pages/PanchayatPage";
import ContactUsPage from "./pages/ContactUsPage";
import SchemePage from "./pages/SchemePage";
import DevelopmentPage from "./pages/DevelopmentPage";
import GalleryPage from "./pages/GalleryPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes without layout */}
          <Route path={CUSTOM_ROUTES.AUTH} element={<Auth />} />

          {/* Admin routes with basic layout (no village context) */}

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
                    path={CUSTOM_ROUTES.NOT_FOUND}
                    element={<NotFound />}
                  />
                  <Route path={CUSTOM_ROUTES.ADMIN} element={<Admin />} />
                  <Route
                    path={CUSTOM_ROUTES.VILLAGE_MANAGEMENT}
                    element={<VillageManagement />}
                  />
                  <Route
                    path={CUSTOM_ROUTES.JSON_CONFIG}
                    element={<JsonConfigManager />}
                  />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
