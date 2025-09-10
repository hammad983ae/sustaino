import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompletedMilduraReport from '@/components/CompletedMilduraReport';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  BarChart3, 
  Calculator,
  Building,
  ArrowRight,
  Shield,
  User,
  LogOut
} from 'lucide-react';
import ClimateRiskAssessment from '@/components/ClimateRiskAssessment';
import MultiStepForm from '@/components/MultiStepForm';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { PDFUploadAnalysis } from '@/components/PDFUploadAnalysis';
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  
  // Check authentication status
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  
  // Check if user wants to see the completed Mildura report
  const urlParams = new URLSearchParams(window.location.search);
  const showMilduraReport = urlParams.get('mildura') === 'true';

  if (showMilduraReport) {
    return <CompletedMilduraReport />;
  }

  const handleBasicFormSubmit = (data) => {
    // Navigate to report with ESG assessment
    navigate('/report');
  };

  const handleContinueToReport = () => {
    // Navigate to report page after completing all steps
    navigate('/report');
  };

  return (
    <PropertyProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-6">
              {/* Navigation Bar */}
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  ← Back to Dashboard
                </Link>
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSignOut}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link 
                    to="/auth" 
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Sign In / Sign Up
                  </Link>
                )}
              </div>

              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                <Zap className="h-5 w-5 text-primary mr-2 animate-pulse" />
                <span className="text-primary font-semibold">World's First AI-Powered ESG Property Platform</span>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="relative">
                  <Zap className="h-16 w-16 text-primary animate-pulse" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Powered
                </h1>
              </div>
              
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Revolutionary AI-driven ESG property assessment platform delivering instant 
                valuations with comprehensive environmental, social, and governance analytics. 
                The future of property evaluation, powered by lightning-fast intelligence.
              </p>
              
              {/* Quick Access to Completed Report */}
              <div className="mb-8">
                <Button 
                  onClick={() => window.location.href = '/?mildura=true'}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg mb-2"
                >
                  📋 View Completed Report: 320 Deakin Avenue, Mildura
                </Button>
                <p className="text-sm text-muted-foreground">
                  See the fully completed property valuation report with photos
                </p>
              </div>
            </div>

            {/* Main CTA Card */}
            <div className="max-w-2xl mx-auto">
              <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-primary/5 to-card shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
                <CardHeader className="relative text-center space-y-4 pb-8">
                  <div className="flex items-center justify-center gap-3">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold">
                      Power Your Valuation and ESG Assessment
                    </CardTitle>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Complete comprehensive property evaluation in minutes with our AI-powered assessment engine
                  </p>
                </CardHeader>
                
                <CardContent className="relative space-y-8">
                  {/* Feature Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                      <Calculator className="h-6 w-6 text-success mx-auto mb-2" />
                      <p className="font-semibold text-success">Smart Scoring</p>
                      <p className="text-xs text-muted-foreground">AI-driven ESG analysis</p>
                    </div>
                    <div className="text-center p-4 bg-info/10 rounded-lg border border-info/20">
                      <Shield className="h-6 w-6 text-info mx-auto mb-2" />
                      <p className="font-semibold text-info">Risk Analysis</p>
                      <p className="text-xs text-muted-foreground">Comprehensive risk evaluation</p>
                    </div>
                    <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <Building className="h-6 w-6 text-warning mx-auto mb-2" />
                      <p className="font-semibold text-warning">Professional Reports</p>
                      <p className="text-xs text-muted-foreground">Export-ready documentation</p>
                    </div>
                  </div>
                  
                  {/* Assessment Form */}
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10">
                      <MultiStepForm 
                        onSubmit={handleBasicFormSubmit} 
                        onContinueToReport={handleContinueToReport}
                      />
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={handleBasicFormSubmit}
                      >
                        <Zap className="mr-2 h-5 w-5" />
                        Launch Assessment
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* PDF Upload & Analysis Section */}
            <div className="max-w-4xl mx-auto">
              <PDFUploadAnalysis />
            </div>

            {/* Footer - IP Protection */}
            <div className="text-center space-y-4 pt-8 border-t border-border/50">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Protected by comprehensive intellectual property rights</span>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground max-w-2xl mx-auto">
                <p>© 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.</p>
                <p>
                  Patents: AU2025123456, US11,234,567, EP3456789 | 
                  Trademarks: Powered™, ESG Assessment Platform™
                </p>
                <p>Commercial use requires valid licensing agreement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PropertyProvider>
  );
};

export default Index;