import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import AutomatedValuation from "./pages/AutomatedValuation";
import PropertyValuations from "./pages/PropertyValuations";
import WorkHubPage from "./pages/WorkHub";
import WhiteLabelConfig from "./pages/WhiteLabelConfig";
import AuthPage from "./pages/Auth";
import ComprehensivePropertyValuation from "./components/ComprehensivePropertyValuation";
import CryptoTradingDashboard from "./pages/CryptoTradingDashboard";
import Dashboard from "./pages/Dashboard";
import AutomaticFolderManager from "./components/AutomaticFolderManager";
import CostaGroupValuationsPage from "./pages/CostaGroupValuations";
import { BrandingProvider } from "./contexts/BrandingContext";
import { PropertyProvider } from "./contexts/PropertyContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrandingProvider>
      <PropertyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AutomatedValuation />} />
              <Route path="/index" element={<Index />} />
              <Route path="/report" element={<Report />} />
              <Route path="/property-valuations" element={<PropertyValuations />} />
              <Route path="/work-hub" element={<WorkHubPage />} />
              <Route path="/white-label" element={<WhiteLabelConfig />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/comprehensive-valuation" element={<ComprehensivePropertyValuation />} />
              <Route path="/crypto-trading" element={<CryptoTradingDashboard />} />
              <Route path="/costa-group-valuations" element={<CostaGroupValuationsPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/folder-manager" element={<AutomaticFolderManager />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PropertyProvider>
    </BrandingProvider>
  </QueryClientProvider>
);

export default App;
