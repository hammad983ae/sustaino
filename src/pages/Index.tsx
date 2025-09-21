import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Home, 
  Calculator, 
  TrendingUp, 
  Users, 
  Settings,
  BarChart3,
  Briefcase,
  Shield,
  Database,
  Building,
  LogIn,
  UserPlus,
  Leaf
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              DeLorenzo Property Platform
            </h1>
            <p className="text-lg text-slate-600">
              Comprehensive property valuation and management solutions
            </p>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-slate-600">Welcome back, {user.email}</span>
                <Link to="/sustano-sphere">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Leaf className="h-4 w-4 mr-2" />
                    Sustano-Sphere™
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/auth">
                  <Button variant="outline">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </header>


        {/* Main Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/automated-valuation">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  Property Valuation
                </CardTitle>
                <CardDescription>
                  Comprehensive automated property valuation with ESG analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={85} className="mb-2" />
                <p className="text-sm text-slate-600">Advanced AI-powered analysis</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Analytics Dashboard
                </CardTitle>
                <CardDescription>
                  Real-time property market analytics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={92} className="mb-2" />
                <p className="text-sm text-slate-600">Live market intelligence</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/work-hub">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  Work Hub
                </CardTitle>
                <CardDescription>
                  Manage valuations, clients, and professional workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={78} className="mb-2" />
                <p className="text-sm text-slate-600">Professional management suite</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/databases">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-indigo-600" />
                  Data Intelligence
                </CardTitle>
                <CardDescription>
                  Access comprehensive property and market databases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={95} className="mb-2" />
                <p className="text-sm text-slate-600">Millions of data points</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/investment-platform">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  Investment Platform
                </CardTitle>
                <CardDescription>
                  Smart investment tools and portfolio management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={88} className="mb-2" />
                <p className="text-sm text-slate-600">Automated investing solutions</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/white-label">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  White Label Config
                </CardTitle>
                <CardDescription>
                  Customize branding and platform configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={72} className="mb-2" />
                <p className="text-sm text-slate-600">Brand customization tools</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">2,450+</div>
              <div className="text-sm text-slate-600">Properties Valued</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">850+</div>
              <div className="text-sm text-slate-600">Active Users</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">99.9%</div>
              <div className="text-sm text-slate-600">Accuracy Rate</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">5,200+</div>
              <div className="text-sm text-slate-600">Reports Generated</div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="text-center text-slate-600">
            <Badge variant="outline" className="text-green-600 border-green-600 mb-4">
              Powered by DeLorenzo Property Group
            </Badge>
            <p className="text-sm">
              © 2024 DeLorenzo Property Group Pty Ltd. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;