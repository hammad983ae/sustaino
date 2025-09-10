import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  BarChart3, 
  Calculator,
  Building,
  ArrowRight,
  Shield
} from 'lucide-react';
import ClimateRiskAssessment from '@/components/ClimateRiskAssessment';
import MultiStepForm from '@/components/MultiStepForm';
import AuthStatus from '@/components/AuthStatus';
import { PropertyProvider } from '@/contexts/PropertyContext';

const Index = () => {
  const handleBasicFormSubmit = (data) => {
    // Navigate to report with ESG assessment
    window.location.href = '/report';
  };

  return (
    <PropertyProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
        {/* Navigation with Auth Status */}
        <div className="absolute top-4 right-4 z-10">
          <AuthStatus />
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                <Zap className="h-5 w-5 text-primary mr-2 animate-pulse" />
                <span className="text-primary font-semibold">World's First AI-Powered ESG Property Platform</span>
              </div>
              
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
                Revolutionary AI-driven ESG property assessment platform delivering instant 
                valuations with comprehensive environmental, social, and governance analytics. 
                The future of property evaluation, powered by lightning-fast intelligence.
              </p>

              {/* Animated Lightning & Earth Logo */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="relative">
                  {/* Earth */}
                  <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 via-green-500 to-blue-600 rounded-full shadow-2xl animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-blue-500/30 rounded-full"></div>
                    {/* Earth continents */}
                    <div className="absolute top-2 left-3 w-3 h-2 bg-green-600 rounded-sm"></div>
                    <div className="absolute bottom-3 right-2 w-4 h-3 bg-green-600 rounded"></div>
                    <div className="absolute top-4 right-1 w-2 h-1 bg-green-600 rounded"></div>
                    
                    {/* Lightning bolt striking */}
                    <div className="absolute -top-8 -left-2 transform -rotate-12">
                      <Zap className="h-8 w-8 text-yellow-400 animate-[flash_2s_ease-in-out_infinite] drop-shadow-lg" />
                    </div>
                    
                    {/* Explosion effect */}
                    <div className="absolute inset-0 opacity-0 animate-[explosion_2s_ease-in-out_infinite_1s]">
                      <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 rounded-full blur-md opacity-70"></div>
                      <div className="absolute -top-1 -left-1 w-18 h-18 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full blur-sm opacity-50"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-4xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
                    Powered
                  </span>
                </div>
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
                      <MultiStepForm onSubmit={handleBasicFormSubmit} />
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