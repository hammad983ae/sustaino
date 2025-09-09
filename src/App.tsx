import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ComprehensiveValuation from "./pages/ComprehensiveValuation";
import WhiteLabelConfig from "./pages/WhiteLabelConfig";
import Auth from "./pages/Auth";
import PropertyValuations from "./pages/PropertyValuations";
import WorkHub from "./pages/WorkHub";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route 
          path="/comprehensive-valuation" 
          element={
            <ProtectedRoute requireAuth={true}>
              <ComprehensiveValuation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/white-label" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <WhiteLabelConfig />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/property-valuations" 
          element={
            <ProtectedRoute requireAuth={true}>
              <PropertyValuations />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/work-hub" 
          element={
            <ProtectedRoute requireAuth={true}>
              <WorkHub />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;