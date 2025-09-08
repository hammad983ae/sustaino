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
import ComprehensivePropertyValuation from "./components/ComprehensivePropertyValuation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AutomatedValuation />} />
          <Route path="/index" element={<Index />} />
          <Route path="/report" element={<Report />} />
          <Route path="/property-valuations" element={<PropertyValuations />} />
          <Route path="/comprehensive-valuation" element={<ComprehensivePropertyValuation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
