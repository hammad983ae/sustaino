import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calculator, MapPin, Building, TrendingUp, FileText, Shield } from "lucide-react";

const DevelopmentSiteValuation = () => {
  const [siteData, setSiteData] = useState({
    address: '',
    area: '',
    zoning: '',
    developmentPotential: '',
    marketValue: 0,
    estimatedCosts: 0
  });

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-2">
            <Building className="w-4 h-4 mr-2" />
            Development Site Valuation Platform
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Professional Development Site Analysis
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive valuation platform for development sites with automated analysis, 
            feasibility studies, and market insights.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="site-details">Site Details</TabsTrigger>
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
            <TabsTrigger value="feasibility">Feasibility</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quick Start</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="quick-address">Site Address</Label>
                      <Input 
                        id="quick-address"
                        placeholder="Enter development site address"
                        value={siteData.address}
                        onChange={(e) => setSiteData(prev => ({...prev, address: e.target.value}))}
                      />
                    </div>
                    <Button className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Start Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Features</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                      Automated site analysis
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                      Development feasibility
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                      Market valuation tools
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                      Comprehensive reporting
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      No recent valuations
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Site Details Tab */}
          <TabsContent value="site-details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Site Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="site-address">Site Address</Label>
                    <Input 
                      id="site-address"
                      placeholder="Full site address"
                      value={siteData.address}
                      onChange={(e) => setSiteData(prev => ({...prev, address: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="site-area">Site Area (sqm)</Label>
                    <Input 
                      id="site-area"
                      placeholder="Total site area"
                      value={siteData.area}
                      onChange={(e) => setSiteData(prev => ({...prev, area: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zoning">Current Zoning</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zoning" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="mixed-use">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="development-type">Development Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select development type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential-subdivision">Residential Subdivision</SelectItem>
                        <SelectItem value="apartment-complex">Apartment Complex</SelectItem>
                        <SelectItem value="commercial-development">Commercial Development</SelectItem>
                        <SelectItem value="mixed-use-development">Mixed Use Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="development-notes">Development Notes</Label>
                  <Textarea 
                    id="development-notes"
                    placeholder="Additional notes about the development potential"
                    value={siteData.developmentPotential}
                    onChange={(e) => setSiteData(prev => ({...prev, developmentPotential: e.target.value}))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Valuation Tab */}
          <TabsContent value="valuation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Valuation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Valuation Engine Ready</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete site details to begin automated valuation analysis
                  </p>
                  <Button>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Calculate Valuation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feasibility Tab */}
          <TabsContent value="feasibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Feasibility Study</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Feasibility Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive development feasibility assessment tools
                  </p>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Feasibility Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Report Generation</h3>
                  <p className="text-muted-foreground mb-4">
                    Professional development site valuation reports
                  </p>
                  <Button variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Create Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Site Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    Track development site performance and market trends
                  </p>
                  <Button variant="outline">
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DevelopmentSiteValuation;