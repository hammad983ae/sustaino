import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Phone, Globe, Star, Camera, BarChart3, Target, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Package {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const auctionSpherePackages: Package[] = [
  {
    id: "auction-basic",
    name: "Basic",
    price: 299,
    originalPrice: 1099,
    duration: "One-off fee",
    color: "border-blue-200 hover:border-blue-300",
    features: [
      "FREE Full Property Valuation (Worth $800)",
      "7-day listing exposure",
      "Basic property photos (up to 10)",
      "Standard listing description",
      "Email notifications",
      "Mobile-responsive listing"
    ]
  },
  {
    id: "auction-premium",
    name: "Premium",
    price: 599,
    originalPrice: 1399,
    duration: "One-off fee",
    popular: true,
    color: "border-primary hover:border-primary/80",
    features: [
      "FREE Full Property Valuation (Worth $800)",
      "14-day listing exposure",
      "Professional photography package (up to 25 photos)",
      "Enhanced listing with detailed descriptions",
      "Virtual tour integration",
      "Social media promotion",
      "Priority customer support",
      "Bidder qualification assistance"
    ]
  },
  {
    id: "auction-platinum",
    name: "Platinum",
    price: 999,
    originalPrice: 1799,
    duration: "One-off fee",
    color: "border-accent hover:border-accent/80",
    features: [
      "FREE Full Property Valuation (Worth $800)",
      "30-day listing exposure",
      "Premium photography + drone footage",
      "3D virtual tours and floor plans",
      "Video marketing content",
      "Featured placement on homepage",
      "Dedicated account manager",
      "Cross-platform promotion",
      "Advanced analytics dashboard",
      "Post-auction support"
    ]
  }
];

const sustainoSpherePackages: Package[] = [
  {
    id: "sustano-basic",
    name: "Basic",
    price: 249,
    originalPrice: 899,
    duration: "One-off fee",
    color: "border-green-200 hover:border-green-300",
    features: [
      "FREE Digital Asset Valuation (Worth $650)",
      "7-day listing exposure",
      "Basic digital asset showcase",
      "Standard ESG assessment report",
      "Email notifications",
      "Sustainability score display"
    ]
  },
  {
    id: "sustano-premium",
    name: "Premium",
    price: 499,
    originalPrice: 1199,
    duration: "One-off fee",
    popular: true,
    color: "border-primary hover:border-primary/80",
    features: [
      "FREE Digital Asset Valuation (Worth $650)",
      "14-day listing exposure",
      "Enhanced digital asset presentation",
      "Comprehensive ESG analysis",
      "Carbon footprint visualization",
      "Social media sustainability campaigns",
      "Priority green certification support",
      "Eco-investor network access"
    ]
  },
  {
    id: "sustano-platinum",
    name: "Platinum",
    price: 799,
    originalPrice: 1549,
    duration: "One-off fee",
    color: "border-accent hover:border-accent/80",
    features: [
      "FREE Digital Asset Valuation (Worth $650)",
      "30-day listing exposure",
      "Premium sustainability portfolio",
      "Advanced climate risk assessment",
      "Video sustainability story",
      "Featured green property placement",
      "Dedicated sustainability consultant",
      "Cross-platform eco-promotion",
      "Impact measurement dashboard",
      "Green certification assistance"
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
    const subject = `Inquiry for ${platform} ${packageName} Package`;
    const body = `Hello,\n\nI'm interested in the ${packageName} advertising package for ${platform}.\n\nPackage ID: ${packageId}\n\nPlease provide more information and next steps.\n\nThank you!`;
    
    const mailtoLink = `mailto:advertising@realityauctions.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink, '_blank');
    
    toast({
      title: "Email inquiry opened",
      description: `Your email client should open with a pre-filled inquiry for the ${packageName} package.`,
    });
  };

  const packages = selectedPlatform === "auction" ? auctionSpherePackages : sustainoSpherePackages;
  const platformName = selectedPlatform === "auction" ? "Auction-Sphere" : "Sustaino Sphere";
  const freeValuation = selectedPlatform === "auction" ? "Full Property Valuation" : "Digital Asset Valuation";
  const freeValue = selectedPlatform === "auction" ? "$800" : "$650";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Advertise Your Property
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Choose between our revolutionary auction platform or sustainable property marketplace
          </p>
          
          {/* Platform Selection */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              variant={selectedPlatform === "auction" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("auction")}
              className="text-lg px-8 py-4"
            >
              <Target className="mr-2 h-5 w-5" />
              Auction-Sphere Platform
            </Button>
            <Button
              size="lg"
              variant={selectedPlatform === "sustano" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("sustano")}
              className="text-lg px-8 py-4"
            >
              <Globe className="mr-2 h-5 w-5" />
              Sustaino Sphere Platform
            </Button>
          </div>
        </div>
      </div>

      {/* Platform Benefits */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-card rounded-2xl p-8 shadow-lg border">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose {platformName}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Targeted Audience</h3>
              <p className="text-muted-foreground">
                Reach qualified {selectedPlatform === "auction" ? "bidders and investors" : "eco-conscious buyers"} actively looking for properties
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Track views, engagement, and {selectedPlatform === "auction" ? "bidder interest" : "sustainability impact"} with detailed reports
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Exposure</h3>
              <p className="text-muted-foreground">
                Maximum visibility with {selectedPlatform === "auction" ? "auction-focused" : "sustainability-focused"} marketing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Free Valuation Highlight */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center border border-primary/20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            FREE {freeValuation} Included!
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            Every advertising package includes a complimentary {freeValuation.toLowerCase()} worth {freeValue}
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Limited Time Offer
          </Badge>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          {platformName} Advertising Packages
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`relative transition-all duration-300 hover:scale-105 ${pkg.color} ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription className="text-sm">{pkg.duration}</CardDescription>
                <div className="mt-4">
                  {pkg.originalPrice && (
                    <div className="text-lg text-muted-foreground line-through">
                      ${pkg.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-primary">
                    ${pkg.price.toLocaleString()}
                  </div>
                  {pkg.originalPrice && (
                    <div className="text-sm text-green-600 font-semibold">
                      Save ${(pkg.originalPrice - pkg.price).toLocaleString()}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className={feature.includes("FREE") ? "font-semibold text-primary" : ""}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full mt-6"
                  size="lg"
                  onClick={() => handleInquiry(pkg.id, pkg.name, platformName)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-card py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contact our advertising team to discuss your property marketing needs
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Email</h3>
              <a href="mailto:advertising@realityauctions.com.au" className="text-primary hover:underline">
                advertising@realityauctions.com.au
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Phone</h3>
              <a href="tel:+61-2-8000-8000" className="text-primary hover:underline">
                +61 2 8000 8000
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Camera className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Photography</h3>
              <span className="text-muted-foreground">Professional services available</span>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 border">
            <p className="text-sm text-muted-foreground">
              All packages include comprehensive support and our satisfaction guarantee. 
              Custom packages available for unique requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}