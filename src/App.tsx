import React from "react";
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
import NoticeBoard from "./pages/NoticeBoard";
import EmergencyHelp from "./pages/EmergencyHelp";
import QuickServices from "./pages/QuickServices";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/village-management" element={<VillageManagement />} />
          <Route path="/json-config" element={<JsonConfigManager />} />
          <Route path="/notice-board" element={<NoticeBoard />} />
          <Route path="/emergency-help" element={<EmergencyHelp />} />
          <Route path="/quick-services" element={<QuickServices />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
