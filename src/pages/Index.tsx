import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompletedMilduraReport from '@/components/CompletedMilduraReport';
import PropertyAddressFormStep from '@/components/PropertyAddressFormStep';
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

import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [currentStep, setCurrentStep] = useState<'dashboard' | 'propertyAddress'>('dashboard');
  
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

  if (currentStep === 'propertyAddress') {
    return (
      <PropertyAddressFormStep
        onContinue={() => navigate('/report')}
        onBack={() => setCurrentStep('dashboard')}
      />
    );
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
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-6">
              <div className="bg-success h-2 rounded-full" style={{ width: '33%' }}></div>
            </div>
            <div className="text-sm text-muted-foreground mb-6">33% Complete</div>

            {/* Navigation */}
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                <Building className="h-4 w-4" />
                Back to Original Platform
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

            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-success" />
                <h1 className="text-4xl font-bold text-success">
                  Sustaino Pro Valuation Platform
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Automated Property Valuations with ESG Intelligence
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Select your property type to begin an automated valuation powered by AI market analysis, comparable sales 
                data, and comprehensive ESG assessment.
              </p>
            </div>

            {/* Assessment Cards */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* ESG Assessment */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-success" />
                    <div>
                      <CardTitle className="text-xl font-semibold">ESG Assessment</CardTitle>
                      <p className="text-sm text-muted-foreground">Environmental, social, and governance analysis</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">ESG Intelligence Includes:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        ESG scoring & sustainability metrics
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Carbon footprint analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Climate risk assessment
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Value premium identification
                      </li>
                    </ul>
                  </div>
                  <Button 
                    className="w-full bg-success hover:bg-success/90 text-white"
                    onClick={() => setCurrentStep('propertyAddress')}
                  >
                    Start ESG Assessment
                  </Button>
                </CardContent>
              </Card>

              {/* Portfolio Valuations */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-success" />
                    <div>
                      <CardTitle className="text-xl font-semibold">Portfolio Valuations</CardTitle>
                      <p className="text-sm text-muted-foreground">Comprehensive portfolio assessment and valuation</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Automated Analysis Includes:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Portfolio aggregation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Risk assessment
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Market analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Performance metrics
                      </li>
                    </ul>
                  </div>
                  <Button 
                    className="w-full bg-success hover:bg-success/90 text-white"
                    onClick={() => setCurrentStep('propertyAddress')}
                  >
                    Start Portfolio Valuation
                  </Button>
                </CardContent>
              </Card>

              {/* ESG Portfolio */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-success" />
                    <div>
                      <CardTitle className="text-xl font-semibold">ESG Portfolio</CardTitle>
                      <p className="text-sm text-muted-foreground">Environmental, social, and governance portfolio analysis</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Automated Analysis Includes:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        ESG portfolio scoring
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Sustainability benchmarking
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        Climate resilience assessment
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        ESG risk identification
                      </li>
                    </ul>
                  </div>
                  <Button 
                    className="w-full bg-success hover:bg-success/90 text-white"
                    onClick={() => setCurrentStep('propertyAddress')}
                  >
                    Start ESG Portfolio Analysis
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Access to Completed Report */}
              <Card className="border border-success/20 bg-success/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Button 
                      onClick={() => window.location.href = '/?mildura=true'}
                      className="bg-success hover:bg-success/90 text-white px-6 py-3 text-lg mb-2"
                    >
                      📋 View Completed Report: 320 Deakin Avenue, Mildura
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      See the fully completed property valuation report with photos
                    </p>
                  </div>
                </CardContent>
              </Card>
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