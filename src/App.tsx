import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
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

// Auth Context
const AuthContext = createContext<{
  user: User | null;
  session: Session | null;
}>({
  user: null,
  session: null,
});

export const useAuth = () => useContext(AuthContext);

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, session }}>
        <PropertyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
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
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
