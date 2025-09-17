import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Phone, Globe, Star, Camera, BarChart3, Target, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const auctionSpherePackages: Package[] = [
  {
    id: "auction-basic",
    name: "Basic",
    price: 799,
    duration: "One-off fee",
    color: "border-blue-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/25",
    features: [
      "FREE Full Property Valuation (Worth $800)",
      "60-day listing exposure",
      "Basic property photos (up to 10)",
      "Standard listing description",
      "Email notifications",
      "Mobile-responsive listing",
      "Basic analytics dashboard"
    ]
  },
  {
    id: "auction-premium",
    name: "Premium",
    price: 1299,
    duration: "One-off fee",
    popular: true,
    color: "border-primary hover:border-primary/80 hover:shadow-xl hover:shadow-primary/30",
    features: [
      "FREE Full Property Valuation (Worth $800)",
      "90-day listing exposure",
      "Professional photography package (up to 25 photos)",
      "Enhanced listing with detailed descriptions",
      "Virtual tour integration",
      "Social media promotion",
      "Priority customer support",
      "Bidder qualification assistance",
      "Advanced analytics dashboard"
    ]
  },
  {
    id: "auction-platinum",
    name: "Platinum",
    price: 1899,
    duration: "One-off fee",
    color: "border-accent hover:border-accent/80 hover:shadow-2xl hover:shadow-accent/40",
    features: [
      "FREE Full Property Valuation (Worth $800)",
      "120-day listing exposure",
      "Premium photography + drone footage",
      "3D virtual tours and floor plans",
      "Video marketing content",
      "Featured placement on homepage",
      "Dedicated account manager",
      "Cross-platform promotion",
      "Premium analytics dashboard",
      "Post-auction support",
      "24/7 priority support"
    ]
  }
];

const sustainoSpherePackages: Package[] = [
  {
    id: "sustano-basic",
    name: "Basic",
    price: 699,
    duration: "One-off fee",
    color: "border-green-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/25",
    features: [
      "FREE Digital Asset Valuation (Worth $650)",
      "60-day listing exposure",
      "Basic digital asset showcase",
      "Standard ESG assessment report",
      "Email notifications",
      "Sustainability score display",
      "Basic carbon tracking"
    ]
  },
  {
    id: "sustano-premium",
    name: "Premium",
    price: 1199,
    duration: "One-off fee",
    popular: true,
    color: "border-primary hover:border-primary/80 hover:shadow-xl hover:shadow-primary/30",
    features: [
      "FREE Digital Asset Valuation (Worth $650)",
      "90-day listing exposure",
      "Enhanced digital asset presentation",
      "Comprehensive ESG analysis",
      "Carbon footprint visualization",
      "Social media sustainability campaigns",
      "Priority green certification support",
      "Eco-investor network access",
      "Advanced sustainability metrics"
    ]
  },
  {
    id: "sustano-platinum",
    name: "Platinum",
    price: 1749,
    duration: "One-off fee",
    color: "border-accent hover:border-accent/80 hover:shadow-2xl hover:shadow-accent/40",
    features: [
      "FREE Digital Asset Valuation (Worth $650)",
      "120-day listing exposure",
      "Premium sustainability portfolio",
      "Advanced climate risk assessment",
      "Video sustainability story",
      "Featured green property placement",
      "Dedicated sustainability consultant",
      "Cross-platform eco-promotion",
      "Impact measurement dashboard",
      "Green certification assistance",
      "24/7 sustainability support"
    ]
  }
];

export default function AdvertisingPlatforms() {
  const [searchParams] = useSearchParams();
  const [selectedPlatform, setSelectedPlatform] = useState<"auction" | "sustano">("auction");

  useEffect(() => {
    const platform = searchParams.get("platform");
    if (platform === "auction" || platform === "sustano") {
      setSelectedPlatform(platform);
    }
  }, [searchParams]);

  const handleInquiry = async (packageId: string, packageName: string, platform: string) => {
    try {
      const pkg = packages.find(p => p.id === packageId);
      if (!pkg) {
        toast({
          title: "Error",
          description: "Package not found",
          variant: "destructive",
        });
        return;
      }

      // Send inquiry through our email service
      const { data, error } = await supabase.functions.invoke('send-advertising-inquiry', {
        body: {
          packageId,
          packageName,
          platform,
          price: pkg.price,
          // You can add customer details here if you collect them
        }
      });

      if (error) {
        console.error('Error sending inquiry:', error);
        toast({
          title: "Error sending inquiry",
          description: "Please try again or contact us directly at advertising@realityauctions.com.au",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Inquiry sent successfully!",
        description: `We've received your inquiry for the ${packageName} package. Our team will contact you within 2 business hours.`,
      });
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast({
        title: "Error sending inquiry",
        description: "Please try again or contact us directly at advertising@realityauctions.com.au",
        variant: "destructive",
      });
    }
  };

  const packages = selectedPlatform === "auction" ? auctionSpherePackages : sustainoSpherePackages;
  const platformName = selectedPlatform === "auction" ? "Auction-Sphere" : "Sustaino Sphere";
  const freeValuation = selectedPlatform === "auction" ? "Full Property Valuation" : "Digital Asset Valuation";
  const freeValue = selectedPlatform === "auction" ? "$800" : "$650";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-[float_6s_ease-in-out_infinite] blur-sm" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-[float_8s_ease-in-out_infinite_reverse] blur-sm" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/5 rounded-full animate-[float_10s_ease-in-out_infinite] blur-sm" />
      </div>
      
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 backdrop-blur-sm" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 animate-fade-in transform hover:scale-105 transition-transform duration-500">
            Advertise Your Property
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            Choose between our revolutionary auction platform or sustainable property marketplace
          </p>
          
          {/* Platform Selection */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-400">
            <Button
              size="lg"
              variant={selectedPlatform === "auction" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("auction")}
              className="text-lg px-8 py-4 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Target className="mr-2 h-5 w-5" />
              Auction-Sphere Platform
            </Button>
            <Button
              size="lg"
              variant={selectedPlatform === "sustano" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("sustano")}
              className="text-lg px-8 py-4 transform hover:scale-105 hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              <Globe className="mr-2 h-5 w-5" />
              Sustaino Sphere Platform
            </Button>
          </div>
        </div>
      </div>

      {/* Platform Benefits */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-card rounded-2xl p-8 shadow-lg border backdrop-blur-sm bg-card/90 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Why Choose {platformName}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
                <Users className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Targeted Audience</h3>
              <p className="text-muted-foreground">
                Reach qualified {selectedPlatform === "auction" ? "bidders and investors" : "eco-conscious buyers"} actively looking for properties
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
                <BarChart3 className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Track views, engagement, and {selectedPlatform === "auction" ? "bidder interest" : "sustainability impact"} with detailed reports
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
                <Star className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Premium Exposure</h3>
              <p className="text-muted-foreground">
                Maximum visibility with {selectedPlatform === "auction" ? "auction-focused" : "sustainability-focused"} marketing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Free Valuation Highlight */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-accent/10 rounded-2xl p-8 text-center border border-primary/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:scale-[1.02] group">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/40">
            <CheckCircle className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            FREE {freeValuation} Included!
          </h2>
          <p className="text-xl text-muted-foreground mb-4 group-hover:text-foreground transition-colors duration-300">
            Every advertising package includes a complimentary {freeValuation.toLowerCase()} worth {freeValue}
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 animate-pulse">
            Exclusive Offer
          </Badge>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          {platformName} Advertising Packages
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card key={pkg.id} className={`relative transition-all duration-500 hover:scale-105 ${pkg.color} ${pkg.popular ? 'ring-2 ring-primary ring-offset-4 ring-offset-background' : ''} backdrop-blur-sm bg-card/95 hover:bg-card group animate-fade-in`} style={{animationDelay: `${index * 200}ms`}}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {/* 3D Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="text-center pb-4 relative z-10">
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">{pkg.name}</CardTitle>
                <CardDescription className="text-sm">{pkg.duration}</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    ${pkg.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Includes FREE {freeValuation} ({freeValue})
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 relative z-10">
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 group/item">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className={`${feature.includes("FREE") ? "font-semibold text-primary" : ""} group-hover/item:text-primary transition-colors duration-200`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full mt-6 group-hover:shadow-lg group-hover:shadow-primary/25 transform group-hover:scale-105 transition-all duration-300"
                  size="lg"
                  onClick={() => handleInquiry(pkg.id, pkg.name, platformName)}
                >
                  Get Started
                </Button>
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent/40 rounded-full animate-pulse" />
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-card/90 to-card/95 py-16 backdrop-blur-sm relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[length:50px_50px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contact our advertising team to discuss your property marketing needs
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <Mail className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">Email</h3>
               <a href="mailto:advertising@sovereignvaluations.com.au" className="text-primary hover:underline transition-all duration-300 hover:text-accent">
                advertising@sovereignvaluations.com.au
              </a>
            </div>
            <div className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <Phone className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">Phone</h3>
               <a href="tel:+61-3-9016-0000" className="text-primary hover:underline transition-all duration-300 hover:text-accent">
                +61 3 9016 0000
              </a>
            </div>
            <div className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <Camera className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">Photography</h3>
               <a href="mailto:photography@sovereignvaluations.com.au" className="text-primary hover:underline transition-all duration-300 hover:text-accent">
                photography@sovereignvaluations.com.au
              </a>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/10 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              All packages include comprehensive support and our satisfaction guarantee. 
              Custom packages available for unique requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}