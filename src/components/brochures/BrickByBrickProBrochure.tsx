import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Target, 
  Sparkles, 
  Globe, 
  BarChart3,
  PieChart,
  Calendar,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Zap
} from "lucide-react";

export const BrickByBrickProBrochure = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
              <Building2 className="h-5 w-5" />
              <span className="font-semibold">BrickByBrick Pro™</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Fractional Property
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Investment Revolution
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Pool your money with other investors to access premium real estate opportunities. 
              <br />
              <strong>No amount too small or too large - everyone deserves wealth creation.</strong>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 text-lg px-8 py-3">
                Start with $100 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                View Live Properties
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">$47.2M</div>
                <div className="text-white/80">Platform Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1,247</div>
                <div className="text-white/80">Active Investors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">8.7%</div>
                <div className="text-white/80">Avg Annual Return</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">$100</div>
                <div className="text-white/80">Minimum Investment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Value Propositions */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why BrickByBrick Pro™ Dominates</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary fractional investment platform designed for maximum returns and accessibility
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle className="text-indigo-800">Pool Investments</CardTitle>
                <CardDescription className="text-indigo-600">
                  Join investment pools with other investors to access high-value properties previously 
                  reserved for institutional investors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Minimum Investment</span>
                    <Badge className="bg-indigo-100 text-indigo-800">$100</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pool Access</span>
                    <Badge className="bg-indigo-100 text-indigo-800">Premium Properties</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Diversification</span>
                    <Badge className="bg-indigo-100 text-indigo-800">Auto-Balanced</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle className="text-emerald-800">Diversified Returns</CardTitle>
                <CardDescription className="text-emerald-600">
                  Spread risk across multiple properties with professional management 
                  and transparent performance tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Target Returns</span>
                    <Badge className="bg-emerald-100 text-emerald-800">8-12% p.a.</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Level</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Moderate</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Property Types</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Mixed Portfolio</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-blue-800">Secure Platform</CardTitle>
                <CardDescription className="text-blue-600">
                  Bank-level security with regulated investment structures and 
                  full transparency in all transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security</span>
                    <Badge className="bg-blue-100 text-blue-800">Bank-Level</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Regulation</span>
                    <Badge className="bg-blue-100 text-blue-800">ASIC Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Transparency</span>
                    <Badge className="bg-blue-100 text-blue-800">Full Disclosure</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Calculator Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Calculate Your Returns</h2>
            <p className="text-xl text-muted-foreground">
              See how your investment could grow with BrickByBrick Pro™
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Investment Return Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="conservative" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="conservative">Conservative (7%)</TabsTrigger>
                  <TabsTrigger value="moderate">Moderate (9%)</TabsTrigger>
                  <TabsTrigger value="aggressive">Growth (12%)</TabsTrigger>
                </TabsList>

                <TabsContent value="conservative" className="space-y-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Initial Investment</div>
                      <div className="text-2xl font-bold text-blue-600">$1,000</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">1 Year</div>
                      <div className="text-2xl font-bold text-green-600">$1,070</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">5 Years</div>
                      <div className="text-2xl font-bold text-purple-600">$1,403</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">10 Years</div>
                      <div className="text-2xl font-bold text-orange-600">$1,967</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="moderate" className="space-y-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Initial Investment</div>
                      <div className="text-2xl font-bold text-blue-600">$1,000</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">1 Year</div>
                      <div className="text-2xl font-bold text-green-600">$1,090</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">5 Years</div>
                      <div className="text-2xl font-bold text-purple-600">$1,539</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">10 Years</div>
                      <div className="text-2xl font-bold text-orange-600">$2,367</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="aggressive" className="space-y-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Initial Investment</div>
                      <div className="text-2xl font-bold text-blue-600">$1,000</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">1 Year</div>
                      <div className="text-2xl font-bold text-green-600">$1,120</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">5 Years</div>
                      <div className="text-2xl font-bold text-purple-600">$1,762</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">10 Years</div>
                      <div className="text-2xl font-bold text-orange-600">$3,106</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="text-center mt-8">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                  Start Investing Today
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Current Investment Opportunities</h2>
            <p className="text-xl text-muted-foreground">
              Premium properties available for fractional investment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property 1 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm">Active</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">Residential</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-white/80" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Modern CBD Apartment Complex</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  123 Queen Street, Brisbane City QLD 4000
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Target Return</span>
                    <span className="font-semibold text-green-600">8.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Minimum Investment</span>
                    <span className="font-semibold">$500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Funding Progress</span>
                    <span className="font-semibold">73%</span>
                  </div>
                </div>
                <Progress value={73} className="mb-4" />
                <Button className="w-full">Invest Now</Button>
              </CardContent>
            </Card>

            {/* Property 2 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-emerald-400 to-cyan-500 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm">Active</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-500 text-white">Commercial</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-white/80" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Premium Office Tower</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  456 Collins Street, Melbourne VIC 3000
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Target Return</span>
                    <span className="font-semibold text-green-600">9.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Minimum Investment</span>
                    <span className="font-semibold">$1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Funding Progress</span>
                    <span className="font-semibold">89%</span>
                  </div>
                </div>
                <Progress value={89} className="mb-4" />
                <Button className="w-full">Invest Now</Button>
              </CardContent>
            </Card>

            {/* Property 3 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm">New</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-purple-500 text-white">Mixed Use</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-white/80" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Waterfront Development</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  789 Harbour Boulevard, Sydney NSW 2000
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Target Return</span>
                    <span className="font-semibold text-green-600">11.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Minimum Investment</span>
                    <span className="font-semibold">$750</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Funding Progress</span>
                    <span className="font-semibold">12%</span>
                  </div>
                </div>
                <Progress value={12} className="mb-4" />
                <Button className="w-full">Invest Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials & Social Proof */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Investors Say</h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-lg font-semibold ml-2">4.9/5 from 1,247 investors</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    SM
                  </div>
                  <div>
                    <div className="font-semibold">Sarah M.</div>
                    <div className="text-sm text-muted-foreground">First-time investor</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  "Started with just $200 and now I'm earning consistent returns. The platform makes property investment accessible to everyone!"
                </p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    DL
                  </div>
                  <div>
                    <div className="font-semibold">David L.</div>
                    <div className="text-sm text-muted-foreground">Portfolio investor</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  "Diversified my portfolio across 15 properties with BrickByBrick Pro. The returns have exceeded my expectations consistently."
                </p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    MT
                  </div>
                  <div>
                    <div className="font-semibold">Maria T.</div>
                    <div className="text-sm text-muted-foreground">Retiree</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  "Perfect for my retirement planning. The passive income from my investments gives me peace of mind and financial security."
                </p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Building Your Property Portfolio Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 1,247 investors already earning consistent returns through fractional property investment
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <span>No minimum balance</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <span>Start from $100</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-300" />
              <span>Fully regulated platform</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Zap className="mr-2 h-5 w-5" />
              Start Investing - Free Account
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              <Calendar className="mr-2 h-5 w-5" />
              Book Free Consultation
            </Button>
          </div>

          <p className="text-sm opacity-75 mt-6">
            * Investment returns are not guaranteed. Past performance does not indicate future results.
            <br />
            BrickByBrick Pro™ is a registered trademark. AFSL 123456.
          </p>
        </div>
      </section>
    </div>
  );
};