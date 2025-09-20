import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  TrendingDown, 
  AlertTriangle, 
  DollarSign, 
  BarChart3,
  MapPin,
  Calendar,
  FileText,
  Home,
  Thermometer
} from 'lucide-react';
import floorPlanImage from '@/assets/marco-floor-plan.jpg';

const MilduraValuationReport = () => {
  const salesData = [
    {
      property: "Worker Accommodation, Mildura",
      salePrice: "$1,200,000",
      yield: "7.5%",
      rooms: 20,
      pricePerRoom: "$60,000",
      dateOfSale: "Q2 2024",
      comments: "Purpose-built, strong demand"
    },
    {
      property: "Regional Motel, Mildura",
      salePrice: "$2,500,000",
      yield: "8%",
      rooms: 20,
      pricePerRoom: "$125,000",
      dateOfSale: "Q4 2023",
      comments: "Well-established, modern amenities"
    },
    {
      property: "Motel, Gippsland",
      salePrice: "$1,800,000",
      yield: "8%",
      rooms: 15,
      pricePerRoom: "$120,000",
      dateOfSale: "Q3 2023",
      comments: "Strategic location, high occupancy"
    },
    {
      property: "Motel, Murray Valley",
      salePrice: "$2,200,000",
      yield: "7.5%",
      rooms: 25,
      pricePerRoom: "$88,000",
      dateOfSale: "Q2 2023",
      comments: "Recent upgrade, good access"
    },
    {
      property: "Worker Accommodation, Riverina",
      salePrice: "$950,000",
      yield: "7.8%",
      rooms: 15,
      pricePerRoom: "$63,333",
      dateOfSale: "Q1 2024",
      comments: "New build, high occupancy expectations"
    },
    {
      property: "Small Regional Motel, Gippsland",
      salePrice: "$1,200,000",
      yield: "7.9%",
      rooms: 12,
      pricePerRoom: "$100,000",
      dateOfSale: "Q4 2023",
      comments: "Niche market, stable income"
    }
  ];

  const leasingData = [
    {
      property: "Worker Accommodation, Mildura",
      leaseRate: "$1,200 – $1,800",
      leaseTerm: "5-10 years",
      leaseType: "CPI-linked",
      comments: "Recent regional leases"
    },
    {
      property: "Regional Motel, Mildura",
      leaseRate: "$1,500 – $2,000",
      leaseTerm: "5-10 years",
      leaseType: "Fixed / CPI",
      comments: "Well-established properties"
    },
    {
      property: "Motel, Gippsland",
      leaseRate: "$1,300 – $1,900",
      leaseTerm: "5-10 years",
      leaseType: "CPI escalation",
      comments: "Properties near tourist attractions"
    },
    {
      property: "Motel, Murray Valley",
      leaseRate: "$1,200 – $2,000",
      leaseTerm: "5-10 years",
      leaseType: "Fixed",
      comments: "Mostly long-term occupancy"
    },
    {
      property: "Caravan Park / Short-stay",
      leaseRate: "$800 – $1,300",
      leaseTerm: "3-5 years",
      leaseType: "Fixed / CPI",
      comments: "Growing sector, seasonal peaks"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Comprehensive Valuation Report</h1>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-2">320 Deakin Avenue</h2>
            <p className="text-xl text-muted-foreground">Mildura VIC 3500, Australia</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant="secondary" className="text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                Report Date: {new Date().toLocaleDateString()}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <FileText className="w-4 h-4 mr-1" />
                Comprehensive Analysis
              </Badge>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Home className="w-6 h-6" />
              1. Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              This report provides a comprehensive valuation of the property at 320 Deakin Avenue, Mildura, 
              incorporating recent market transactions, sector-specific data, regional economic outlook, and 
              climate change risk assessments. The analysis aims to support an informed understanding of the 
              property's current market value and associated risks.
            </p>
          </CardContent>
        </Card>

        {/* Climate Change Risk Assessment */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-red-500/10 to-orange-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Thermometer className="w-6 h-6" />
              2. Climate Change Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Regional Climate Vulnerability</h3>
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border-l-4 border-orange-500">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <Badge variant="destructive">Risk Score: 62%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Moderate-to-high vulnerability related to water scarcity, temperature extremes, and weather-related events.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Property Value Adjustments</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                    <span className="text-red-600 font-medium">3% - 7% potential reduction</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Conservative estimate due to climate risks, emphasizing the importance of adaptive infrastructure.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Interest Rate Premiums</h4>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-foreground">0.1% - 0.3% lender premium</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reflecting perceived environmental vulnerabilities in lending assessments.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Mitigation Recommendations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Water-efficient systems</li>
                    <li>• Climate-resilient building materials</li>
                    <li>• Sustainable landscaping</li>
                    <li>• Adaptive infrastructure strategies</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floor Plan */}
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MapPin className="w-6 h-6" />
              Property Floor Plan & Site Layout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <img 
                src={floorPlanImage} 
                alt="320 Deakin Avenue Floor Plan" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Architectural plans showing site layout, proposed detached bungalow, and development details
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Market Evidence - Sales Data */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="w-6 h-6" />
              3. Market Evidence - Recent Sales Data
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">Property / Location</th>
                    <th className="text-left p-3 font-semibold text-foreground">Sale Price</th>
                    <th className="text-left p-3 font-semibold text-foreground">Yield</th>
                    <th className="text-left p-3 font-semibold text-foreground">Rooms</th>
                    <th className="text-left p-3 font-semibold text-foreground">Price/Room</th>
                    <th className="text-left p-3 font-semibold text-foreground">Date</th>
                    <th className="text-left p-3 font-semibold text-foreground">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((sale, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-3 font-medium text-foreground">{sale.property}</td>
                      <td className="p-3 text-muted-foreground">{sale.salePrice}</td>
                      <td className="p-3">
                        <Badge variant="secondary">{sale.yield}</Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">{sale.rooms}</td>
                      <td className="p-3 text-muted-foreground">{sale.pricePerRoom}</td>
                      <td className="p-3 text-muted-foreground">{sale.dateOfSale}</td>
                      <td className="p-3 text-sm text-muted-foreground">{sale.comments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Market Evidence - Leasing Evidence */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <DollarSign className="w-6 h-6" />
              Leasing Evidence
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">Property / Location</th>
                    <th className="text-left p-3 font-semibold text-foreground">Lease Rate per Room/Annum</th>
                    <th className="text-left p-3 font-semibold text-foreground">Lease Term</th>
                    <th className="text-left p-3 font-semibold text-foreground">Type of Lease</th>
                    <th className="text-left p-3 font-semibold text-foreground">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {leasingData.map((lease, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-3 font-medium text-foreground">{lease.property}</td>
                      <td className="p-3 text-muted-foreground">{lease.leaseRate}</td>
                      <td className="p-3 text-muted-foreground">{lease.leaseTerm}</td>
                      <td className="p-3">
                        <Badge variant="outline">{lease.leaseType}</Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{lease.comments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Economic Overview */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingDown className="w-6 h-6" />
              4. Economic and Sectoral Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">National Trends</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Occupancy Rates</span>
                    <Badge variant="secondary">65-75%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Average Room Rate</span>
                    <Badge variant="secondary">$150-$200</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Yields</span>
                    <Badge variant="secondary">8-10%</Badge>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Recent Transaction:</strong> Regional motel sold for $3.5M at 8% yield
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Mildura-Specific Data</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Room Rate</span>
                    <Badge variant="secondary">$120-$150</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Turnover per Room</span>
                    <Badge variant="secondary">$25K-$40K</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Yield</span>
                    <Badge variant="secondary">8-9%</Badge>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Market Activity:</strong> Stable demand from tourism, agriculture, and regional industry
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Regional Analysis</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Gippsland</h4>
                  <p className="text-sm text-muted-foreground">
                    Strategic tourism locations with strong seasonal demand. Properties near attractions commanding premium rates.
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Murray Valley</h4>
                  <p className="text-sm text-muted-foreground">
                    Established regional market with consistent long-term occupancy and stable rental yields.
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Riverina</h4>
                  <p className="text-sm text-muted-foreground">
                    Growing worker accommodation sector with new builds achieving strong occupancy expectations.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Valuation Summary */}
        <Card className="shadow-lg border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground text-xl">
              <Building2 className="w-6 h-6" />
              Valuation Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">Market Value Range</h4>
                <p className="text-2xl font-bold text-primary">$1.2M - $1.4M</p>
                <p className="text-sm text-muted-foreground mt-1">Based on comparable analysis</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">Climate Adjustment</h4>
                <p className="text-xl font-bold text-red-600">-3% to -7%</p>
                <p className="text-sm text-muted-foreground mt-1">Risk-adjusted valuation</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">Expected Yield</h4>
                <p className="text-2xl font-bold text-green-600">7.5% - 8.5%</p>
                <p className="text-sm text-muted-foreground mt-1">Regional market aligned</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-foreground">
                <strong>Recommendation:</strong> The property represents a solid investment opportunity within the regional accommodation sector, 
                with recommended implementation of climate resilience measures to preserve long-term value.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MilduraValuationReport;