import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PropertyValuation3DBackground from "@/components/PropertyValuation3DBackground";
import BrandedHeader from "@/components/BrandedHeader";

const CLIENT_DEMO_PASSWORD = "ClientDemo2024!";

export default function ClientDemo() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already authenticated
  useEffect(() => {
    const isAuth = sessionStorage.getItem("clientDemoAuth") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (password === CLIENT_DEMO_PASSWORD) {
        sessionStorage.setItem("clientDemoAuth", "true");
        setIsAuthenticated(true);
        toast.success("Welcome to the client demo platform!");
      } else {
        toast.error("Incorrect password. Please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  const demoFeatures = [
    {
      title: "Property Valuation Demo",
      description: "Experience our automated property assessment workflow",
      link: "/property-assessment",
      icon: "🏢"
    },
    {
      title: "Sample Reports",
      description: "View professionally generated valuation reports",
      link: "/automated-report",
      icon: "📋"
    },
    {
      title: "ESG Assessment",
      description: "Comprehensive environmental and sustainability analysis",
      link: "/esg-strategy-analysis",
      icon: "🌱"
    },
    {
      title: "Dashboard Overview",
      description: "See your valuation management dashboard",
      link: "/dashboard",
      icon: "📊"
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <PropertyValuation3DBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/95 via-white/98 to-teal-50/95 backdrop-blur-sm" />
        
        <div className="relative z-10">
          <BrandedHeader />
          
          <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-emerald-200/50 shadow-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Client Demo Access
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Enter the demo password to access the client platform
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Demo Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter demo password"
                        className="pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={loading}
                  >
                    {loading ? "Authenticating..." : "Access Demo Platform"}
                  </Button>
                </form>
                
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 text-sm text-emerald-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Demo Credentials:</span>
                  </div>
                  <p className="text-sm text-emerald-600 mt-1">
                    Password: <code className="bg-emerald-100 px-2 py-1 rounded">ClientDemo2024!</code>
                  </p>
                </div>
                
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="text-sm"
                  >
                    Back to Main Platform
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <PropertyValuation3DBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/95 via-white/98 to-teal-50/95 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <BrandedHeader />
        
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Client Demo Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Welcome to your exclusive demonstration of our property valuation platform. 
              Explore the features below to experience our professional solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {demoFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white/90 backdrop-blur-sm border-emerald-200/50 hover:border-emerald-400/70 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                onClick={() => navigate(feature.link)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-1">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center space-y-4">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200/50 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Demo Instructions
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                This is a demonstration environment showcasing our property valuation platform. 
                All data and reports generated are for demonstration purposes only. 
                Click on any feature above to explore the platform capabilities.
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  sessionStorage.removeItem("clientDemoAuth");
                  setIsAuthenticated(false);
                }}
              >
                Lock Demo
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
              >
                Return to Main Platform
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}