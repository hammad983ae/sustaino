import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import PropertyValuation from "./pages/PropertyValuation";
import WorkHub from "./pages/WorkHub";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import WhiteLabelConfig from "./pages/WhiteLabelConfig";
import EnhancedESGStrategy from "./pages/EnhancedESGStrategy";
import { PropertyProvider } from "./contexts/PropertyContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PropertyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/index" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report" element={<Report />} />
            <Route path="/property-valuations" element={<PropertyValuation />} />
            <Route path="/work-hub" element={<WorkHub />} />
            <Route path="/white-label" element={<WhiteLabelConfig />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/comprehensive-valuation" element={<Dashboard />} />
            <Route path="/esg-strategy" element={<EnhancedESGStrategy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PropertyProvider>
  </QueryClientProvider>
);

export default App;
