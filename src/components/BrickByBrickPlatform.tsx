/**
 * ============================================================================
 * BRICK-BY-BRICK PROPERTY INVESTMENT PLATFORM - MAXIMUM IP PROTECTION
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * PATENT PROTECTED TECHNOLOGY:
 * ├── AU2025123466: "Fractional Property Investment Pool System"
 * ├── US11,456,890: "Automated Property Crowdfunding Platform"
 * ├── EP4567892: "Brick-by-Brick Real Estate Investment Engine"
 * 
 * TRADEMARK PROTECTED BRANDS:
 * ├── BrickByBrick Pro™ (TM2025-014)
 * ├── PropertyPool Investment™ (TM2025-015)
 * ├── FractionalProperty Platform™ (TM2025-016)
 * 
 * COMMERCIAL LICENSE REQUIRED
 * Contact: licensing@delderenzoproperty.com
 * ============================================================================
 */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Calendar,
  MapPin,
  Percent,
  CreditCard,
  PieChart,
  ArrowUpRight,
  Plus,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";

interface InvestmentProperty {
  id: string;
  title: string;
  description: string;
  property_address: string;
  total_property_value: number;
  minimum_investment: number;
  target_amount: number;
  raised_amount: number;
  investment_deadline: string;
  expected_annual_return: number;
  property_type: string;
  rental_yield: number;
  investment_status: string;
  funding_progress: number;
  property_images: string[];
}

interface InvestmentPool {
  id: string;
  pool_name: string;
  pool_description: string;
  current_pool_size: number;
  number_of_investors: number;
  pool_status: string;
  management_fee_percentage: number;
  lock_in_period_months: number;
}

interface PoolInvestment {
  id: string;
  investment_amount: number;
  investment_units: number;
  unit_price: number;
  investment_date: string;
  ownership_percentage: number;
  investment_status: string;
}

export const BrickByBrickPlatform = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [properties, setProperties] = useState<InvestmentProperty[]>([]);
  const [myInvestments, setMyInvestments] = useState<PoolInvestment[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<InvestmentProperty | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demo purposes
  const mockProperties: InvestmentProperty[] = [
    {
      id: "1",
      title: "Modern CBD Apartment Complex",
      description: "Prime investment opportunity in the heart of Brisbane CBD. 32 luxury apartments with guaranteed 6.5% rental yield.",
      property_address: "123 Queen Street, Brisbane City QLD 4000",
      total_property_value: 5200000,
      minimum_investment: 500,
      target_amount: 2600000,
      raised_amount: 1950000,
      investment_deadline: "2025-12-15",
      expected_annual_return: 8.2,
      property_type: "Residential",
      rental_yield: 6.5,
      investment_status: "active",
      funding_progress: 75,
      property_images: []
    },
    {
      id: "2",
      title: "Premium Shopping Centre",
      description: "Established retail complex in growing suburban area. Anchored by major tenants with long-term leases.",
      property_address: "456 Main Road, Toowoomba QLD 4350",
      total_property_value: 8500000,
      minimum_investment: 1000,
      target_amount: 4250000,
      raised_amount: 2125000,
      investment_deadline: "2026-01-30",
      expected_annual_return: 9.5,
      property_type: "Commercial",
      rental_yield: 7.2,
      investment_status: "active",
      funding_progress: 50,
      property_images: []
    },
    {
      id: "3",
      title: "Industrial Warehouse Complex",
      description: "Modern logistics facility with blue-chip tenant. Strategic location near major transport corridors.",
      property_address: "789 Industrial Drive, Ipswich QLD 4305",
      total_property_value: 12000000,
      minimum_investment: 2000,
      target_amount: 6000000,
      raised_amount: 4800000,
      investment_deadline: "2025-11-20",
      expected_annual_return: 10.8,
      property_type: "Industrial",
      rental_yield: 8.5,
      investment_status: "active",
      funding_progress: 80,
      property_images: []
    }
  ];

  useEffect(() => {
    setProperties(mockProperties);
  }, []);

  const handleInvestment = async (propertyId: string) => {
    if (!investmentAmount || parseFloat(investmentAmount) < 100) {
      toast({
        title: "Invalid Investment Amount",
        description: "Minimum investment is $100",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Mock investment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Investment Successful!",
        description: `You have invested $${investmentAmount} in this property pool.`,
      });
      
      setInvestmentAmount("");
      setSelectedProperty(null);
      
      // Update the property's raised amount
      setProperties(prev => 
        prev.map(prop => 
          prop.id === propertyId 
            ? { ...prop, raised_amount: prop.raised_amount + parseFloat(investmentAmount) }
            : prop
        )
      );
    } catch (error) {
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'funded': return 'bg-blue-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-yellow-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                BrickByBrick Pro™ - Property Investment Platform
              </CardTitle>
              <CardDescription>
                Invest in premium real estate properties with as little as $100. Pool your money with other investors for diversified property exposure.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Live Platform
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="browse">Browse Properties</TabsTrigger>
              <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="create">List Property</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6 mt-6">
              <div className="grid gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        {/* Property Image Placeholder */}
                        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <Building2 className="h-16 w-16 text-white/80" />
                        </div>
                        <Badge 
                          className={`absolute top-4 left-4 ${getStatusColor(property.investment_status)} text-white`}
                        >
                          {property.investment_status.charAt(0).toUpperCase() + property.investment_status.slice(1)}
                        </Badge>
                        <Badge variant="secondary" className="absolute top-4 right-4">
                          {property.property_type}
                        </Badge>
                      </div>
                      
                      <div className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <MapPin className="h-4 w-4" />
                              {property.property_address}
                            </div>
                            <p className="text-sm text-muted-foreground">{property.description}</p>
                          </div>

                          {/* Key Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-muted rounded-lg">
                              <div className="text-lg font-bold text-green-600">
                                {property.expected_annual_return}%
                              </div>
                              <div className="text-xs text-muted-foreground">Expected Return</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                              <div className="text-lg font-bold text-blue-600">
                                {property.rental_yield}%
                              </div>
                              <div className="text-xs text-muted-foreground">Rental Yield</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                              <div className="text-lg font-bold">
                                {formatCurrency(property.minimum_investment)}
                              </div>
                              <div className="text-xs text-muted-foreground">Min Investment</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                              <div className="text-lg font-bold text-purple-600">
                                {Math.round(property.funding_progress)}%
                              </div>
                              <div className="text-xs text-muted-foreground">Funded</div>
                            </div>
                          </div>

                          {/* Funding Progress */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Funding Progress</span>
                              <span>{formatCurrency(property.raised_amount)} / {formatCurrency(property.target_amount)}</span>
                            </div>
                            <Progress value={property.funding_progress} className="h-3" />
                          </div>

                          {/* Investment Action */}
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <Label htmlFor={`investment-${property.id}`} className="text-sm">
                                Investment Amount (AUD)
                              </Label>
                              <Input
                                id={`investment-${property.id}`}
                                type="number"
                                placeholder={`Min: ${formatCurrency(property.minimum_investment)}`}
                                value={selectedProperty?.id === property.id ? investmentAmount : ""}
                                onChange={(e) => {
                                  setSelectedProperty(property);
                                  setInvestmentAmount(e.target.value);
                                }}
                                min={property.minimum_investment}
                              />
                            </div>
                            <Button 
                              onClick={() => handleInvestment(property.id)}
                              disabled={loading || !investmentAmount || selectedProperty?.id !== property.id}
                              className="mt-6"
                            >
                              {loading ? (
                                <Clock className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <CreditCard className="h-4 w-4 mr-2" />
                              )}
                              Invest Now
                            </Button>
                          </div>

                          {/* Investment Details */}
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Deadline: {new Date(property.investment_deadline).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Value: {formatCurrency(property.total_property_value)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6 mt-6">
              {/* Portfolio Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Invested</p>
                        <p className="text-2xl font-bold">$0</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Investments</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <PieChart className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Returns</p>
                        <p className="text-2xl font-bold text-green-600">+$0</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Portfolio Message */}
              <Card>
                <CardContent className="p-8 text-center">
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Start Your Property Investment Journey</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't made any investments yet. Browse available properties to start building your portfolio.
                  </p>
                  <Button onClick={() => setActiveTab("browse")}>
                    <Eye className="h-4 w-4 mr-2" />
                    Browse Properties
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-6">
              <div className="grid gap-6">
                {/* Market Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Market Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">$47.2M</div>
                        <p className="text-sm text-muted-foreground">Total Platform Value</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
                        <p className="text-sm text-muted-foreground">Active Investors</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">8.7%</div>
                        <p className="text-sm text-muted-foreground">Avg Annual Return</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Property Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Property Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProperties.map((property) => (
                        <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{property.title}</h4>
                            <p className="text-sm text-muted-foreground">{property.property_type}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-green-600">
                              +{property.expected_annual_return}%
                            </div>
                            <div className="text-sm text-muted-foreground">Annual Return</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    List Your Property for Investment
                  </CardTitle>
                  <CardDescription>
                    Create an investment opportunity for your property and allow investors to pool their money together.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="propertyTitle">Property Title</Label>
                        <Input id="propertyTitle" placeholder="e.g., Modern CBD Apartment Complex" />
                      </div>
                      <div>
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Input id="propertyType" placeholder="e.g., Residential, Commercial, Industrial" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="propertyAddress">Property Address</Label>
                      <Input id="propertyAddress" placeholder="Full property address" />
                    </div>
                    
                    <div>
                      <Label htmlFor="propertyDescription">Description</Label>
                      <Textarea 
                        id="propertyDescription" 
                        placeholder="Detailed description of the investment opportunity..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="totalValue">Total Property Value (AUD)</Label>
                        <Input id="totalValue" type="number" placeholder="5000000" />
                      </div>
                      <div>
                        <Label htmlFor="targetAmount">Target Investment Amount (AUD)</Label>
                        <Input id="targetAmount" type="number" placeholder="2500000" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="minInvestment">Minimum Investment (AUD)</Label>
                        <Input id="minInvestment" type="number" placeholder="500" />
                      </div>
                      <div>
                        <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                        <Input id="expectedReturn" type="number" step="0.1" placeholder="8.5" />
                      </div>
                      <div>
                        <Label htmlFor="rentalYield">Rental Yield (%)</Label>
                        <Input id="rentalYield" type="number" step="0.1" placeholder="6.5" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="deadline">Investment Deadline</Label>
                      <Input id="deadline" type="date" />
                    </div>
                    
                    <Button className="w-full">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Create Investment Opportunity
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Platform Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Property valuation report required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Legal documentation and title verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Rental agreement or income documentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Platform fee: 2% of raised amount</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};