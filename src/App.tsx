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
import PropertyAssessment from "./pages/PropertyAssessment";
import WorkHubPage from "./pages/WorkHub";
import WhiteLabelConfig from "./pages/WhiteLabelConfig";
import ClientDemo from "./pages/ClientDemo";
import AuthPage from "./pages/Auth";
import AutomatedReport from "./pages/AutomatedReport";
import ComprehensivePropertyValuation from "./components/ComprehensivePropertyValuation";
import CryptoTradingDashboard from "./pages/CryptoTradingDashboard";
import Dashboard from "./pages/Dashboard";
import AutomaticFolderManager from "./components/AutomaticFolderManager";
import CostaGroupValuationsPage from "./pages/CostaGroupValuations";
import ComprehensiveValuationAnalysis from "./pages/ComprehensiveValuationAnalysis";
import ESGClimateAssessment from "./pages/ESGClimateAssessment";
import FullScreenDemo from "./pages/FullScreenDemo";
import SocialDemo from "./pages/SocialDemo";
import { BrandingProvider } from "./contexts/BrandingContext";
import { PropertyProvider } from "./contexts/PropertyContext";
import { ReportDataProvider } from "./contexts/ReportDataContext";
import { PropertyTypeLockProvider } from "./components/PropertyTypeLockProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrandingProvider>
      <PropertyProvider>
        <ReportDataProvider>
          <PropertyTypeLockProvider>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/automated-valuation" element={<AutomatedValuation />} />
                <Route path="/index" element={<Index />} />
                <Route path="/report" element={<Report />} />
        <Route path="/property-assessment" element={<PropertyAssessment />} />
        <Route path="/automated-report" element={<AutomatedReport propertyType="commercial" />} />
                <Route path="/property-valuations" element={<PropertyValuations />} />
                <Route path="/work-hub" element={<WorkHubPage />} />
                <Route path="/white-label" element={<WhiteLabelConfig />} />
                <Route path="/client-demo" element={<ClientDemo />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/comprehensive-valuation" element={<ComprehensivePropertyValuation />} />
                <Route path="/comprehensive-valuation-analysis" element={<ComprehensiveValuationAnalysis />} />
                <Route path="/crypto-trading" element={<CryptoTradingDashboard />} />
                <Route path="/costa-group-valuations" element={<CostaGroupValuationsPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/folder-manager" element={<AutomaticFolderManager />} />
                <Route path="/esg-climate-assessment" element={<ESGClimateAssessment />} />
                <Route path="/fullscreen-demo" element={<FullScreenDemo />} />
                <Route path="/social-demo" element={<SocialDemo />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PropertyTypeLockProvider>
      </ReportDataProvider>
    </PropertyProvider>
  </BrandingProvider>
</QueryClientProvider>
);

export default App;
