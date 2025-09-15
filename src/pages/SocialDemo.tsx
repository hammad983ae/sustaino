import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  BarChart3, 
  FileText, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Trophy,
  Sparkles
} from 'lucide-react';

const SocialDemo = () => {
  const features = [
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      title: "AI-Powered Property Valuations",
      description: "Advanced automated valuation models with real-time market data integration",
      demo: "/automated-valuation",
      badge: "Most Popular"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Comprehensive Analysis Reports",
      description: "Full market analysis with comparable sales, rental evidence, and risk assessment",
      demo: "/property-assessment",
      badge: "Professional"
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Instant PDF Reports",
      description: "Generate professional valuation reports in seconds with automated data",
      demo: "/report",
      badge: "Automated"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "ESG & Climate Assessment",
      description: "Environmental, Social & Governance analysis with climate risk evaluation",
      demo: "/esg-climate-assessment",
      badge: "Cutting Edge"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Work Hub Management",
      description: "Complete project management with file organization and team collaboration",
      demo: "/work-hub",
      badge: "Enterprise"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "White Label Solutions",
      description: "Customize the platform with your branding for client presentations",
      demo: "/white-label",
      badge: "Custom"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Properties Valued" },
    { number: "500+", label: "Professional Users" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "Platform Availability" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Next-Generation Property Technology
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Transform Property Valuations with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Experience the future of property valuation with our comprehensive AI-powered platform. 
              From automated valuations to ESG assessments - everything you need in one place.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="px-8 py-4 text-lg" asChild>
                <Link to="/automated-valuation">
                  Try Free Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg" asChild>
                <Link to="/client-demo">
                  Full Platform Access
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground">
              Discover why professionals choose our platform for property valuations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    {feature.icon}
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link to={feature.demo}>
                      Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Our Platform?</h2>
              <div className="space-y-6">
                {[
                  "Save 90% time on property valuations with AI automation",
                  "Access real-time market data and comparable sales",
                  "Generate professional reports in multiple formats",
                  "Ensure compliance with industry standards",
                  "Scale your business with enterprise features"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-center">
                  <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Industry Leading</h3>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Trusted by property professionals across Australia for accurate, 
                    reliable valuations and comprehensive market analysis.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Used by 500+ professionals nationwide</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of property professionals using our platform
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg" asChild>
              <Link to="/automated-valuation">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/client-demo">
                View Full Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Property Valuation Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SocialDemo;