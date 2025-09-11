import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  LogOut,
  Plus,
  TrendingUp,
  FileText,
  Users
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";
import AdvancedIPProtection from "@/components/AdvancedIPProtection";
import IntellectualPropertyProtection from "@/components/IntellectualPropertyProtection";

const Dashboard = () => {
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
      if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out successfully",
          description: "You have been signed out of your account.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-success" />
              <h1 className="text-3xl font-bold text-success">
                Property Valuation and Sustainable Assessment Platform - First in the World
              </h1>
            </div>
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

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Property Valuation & ESG Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional property valuations with comprehensive ESG analysis, automated market data, and AI-powered insights.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* ESG Assessment */}
            <Card className="border border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-success" />
                  <CardTitle>ESG Assessment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Environmental, social, and governance analysis with sustainability scoring and climate risk assessment.
                </p>
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-white"
                  onClick={() => handleNavigate('/esg-strategy')}
                >
                  Start ESG Assessment
                </Button>
              </CardContent>
            </Card>

            {/* Property Valuations */}
            <Card className="border border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calculator className="h-6 w-6 text-success" />
                  <CardTitle>Property Valuations</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Comprehensive property valuations with market analysis, comparable sales, and rental evidence.
                </p>
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-white"
                  onClick={() => handleNavigate('/property-valuations')}
                >
                  Start Valuation
                </Button>
              </CardContent>
            </Card>

            {/* Portfolio Analysis */}
            <Card className="border border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-success" />
                  <CardTitle>Portfolio Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Multi-property portfolio analysis with aggregated metrics and performance insights.
                </p>
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-white"
                  onClick={() => handleNavigate('/comprehensive-valuation')}
                >
                  Analyze Portfolio
                </Button>
              </CardContent>
            </Card>

            {/* Work Hub */}
            <Card className="border border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-success" />
                  <CardTitle>Work Hub</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Manage jobs, track progress, and collaborate on valuation projects.
                </p>
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-white"
                  onClick={() => handleNavigate('/work-hub')}
                >
                  Open Work Hub
                </Button>
              </CardContent>
            </Card>

            {/* Reports */}
            <Card className="border border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-success" />
                  <CardTitle>Reports</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Generate professional reports with charts, analysis, and ESG compliance documentation.
                </p>
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-white"
                  onClick={() => handleNavigate('/report')}
                >
                  View Reports
                </Button>
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card className="border border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-success" />
                  <CardTitle>White Label Config</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Customize branding, configure settings, and manage platform preferences.
                </p>
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-white"
                  onClick={() => handleNavigate('/white-label')}
                >
                  Configure Platform
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          {user && (
            <div className="bg-card rounded-lg p-6 border border-border max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold mb-4">Platform Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">12</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">85%</div>
                  <div className="text-sm text-muted-foreground">ESG Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Total Valuations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">24h</div>
                  <div className="text-sm text-muted-foreground">Avg. Report Time</div>
                </div>
              </div>
            </div>
          )}

          {/* Intellectual Property Protection */}
          <div className="max-w-6xl mx-auto">
            <AdvancedIPProtection />
          </div>

          <div className="max-w-4xl mx-auto">
            <IntellectualPropertyProtection />
          </div>

          {/* Footer */}
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
  );
};

export default Dashboard;