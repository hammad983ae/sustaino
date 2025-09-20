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
import kitchen1 from '@/assets/kitchen-1.jpg';
import kitchen2 from '@/assets/kitchen-2.jpg';
import kitchen3 from '@/assets/kitchen-3.jpg';
import outdoorArea from '@/assets/outdoor-area.jpg';
import commonArea from '@/assets/common-area.jpg';
import frontExterior from '@/assets/front-exterior.jpg';
import streetView from '@/assets/street-view.jpg';
import backyard from '@/assets/backyard.jpg';
import bathroom from '@/assets/bathroom.jpg';
import planningMap from '@/assets/planning-map.png';

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
            <p className="text-muted-foreground leading-relaxed mb-4">
              This report provides a comprehensive valuation of the property at 320 Deakin Avenue, Mildura, 
              incorporating recent market transactions, sector-specific data, regional economic outlook, and 
              climate change risk assessments. The analysis aims to support an informed understanding of the 
              property's current market value and associated risks.
            </p>
            
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-foreground mb-3">Property Overview</h3>
              <p className="text-muted-foreground mb-3">
                The property is a purpose-built accommodation facility comprising 18 rooms, strategically located on a main road within a Commercial 1 zone. The property generates stable rental income of approximately $120,000 per annum with high occupancy potential.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Key Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 18-room purpose-built accommodation facility</li>
                    <li>• Commercial 1 zoning providing flexibility of use</li>
                    <li>• Solar power system (13.2 kW) enhancing energy efficiency</li>
                    <li>• Low-maintenance gardens and acoustic fencing</li>
                    <li>• Strong cash flow with EBITDA of $87,000</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Property Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Modern construction with low-maintenance materials</li>
                    <li>• Acoustic fencing providing privacy</li>
                    <li>• Low-maintenance landscaping</li>
                    <li>• Car parking facilities</li>
                    <li>• Common areas and facilities</li>
                  </ul>
                </div>
              </div>
            </div>
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

        {/* Property Photos */}
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MapPin className="w-6 h-6" />
              Property Inspection Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <img src={frontExterior} alt="Front Exterior" className="w-full h-48 object-cover rounded-lg shadow-md" />
                <p className="text-sm text-muted-foreground text-center font-medium">Front Exterior View</p>
              </div>
              <div className="space-y-2">
                <img src={streetView} alt="Street View" className="w-full h-48 object-cover rounded-lg shadow-md" />
                <p className="text-sm text-muted-foreground text-center font-medium">Street View & Approach</p>
              </div>
              <div className="space-y-2">
                <img src={backyard} alt="Backyard" className="w-full h-48 object-cover rounded-lg shadow-md" />
                <p className="text-sm text-muted-foreground text-center font-medium">Backyard & Landscaping</p>
              </div>
              <div className="space-y-2">
                <img src={kitchen1} alt="Kitchen Area 1" className="w-full h-48 object-cover rounded-lg shadow-md" />
                <p className="text-sm text-muted-foreground text-center font-medium">Kitchen Facilities - Gas Range</p>
              </div>
              <div className="space-y-2">
                <img src={kitchen2} alt="Kitchen Area 2" className="w-full h-48 object-cover rounded-lg shadow-md" />
                <p className="text-sm text-muted-foreground text-center font-medium">Kitchen Facilities - Electric</p>
              </div>
              <div className="space-y-2">
                <img src={kitchen3} alt="Kitchen Area 3" className="w-full h-48 object-cover rounded-lg shadow-md" />
                <p className="text-sm text-muted-foreground text-center font-medium">Kitchen & Dining Area</p>
              </div>
              <div className="space-y-2">
                <img src={outdoorArea} alt="Outdoor Area" className="w-full h-48 object-cover rounded-lg shadow-md" />
                <p className="text-sm text-muted-foreground text-center font-medium">Outdoor Common Area</p>
              </div>
              <div className="space-y-2">
                <img src={commonArea} alt="Common Area" className="w-full h-48 object-cover rounded-lg shadow-md" />
                <p className="text-sm text-muted-foreground text-center font-medium">Indoor Common Area</p>
              </div>
              <div className="space-y-2">
                <img src={bathroom} alt="Bathroom" className="w-full h-48 object-cover rounded-lg shadow-md" />
                <p className="text-sm text-muted-foreground text-center font-medium">Bathroom Facilities</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Property Condition Assessment:</strong> The property displays well-maintained facilities with modern kitchen appliances, 
                clean common areas, landscaped outdoor spaces, and contemporary bathroom fittings. The exterior presents professionally 
                with secure fencing and established gardens, supporting the accommodation facility's commercial viability.
              </p>
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

        {/* Planning & Legal Details */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <FileText className="w-6 h-6" />
              Planning & Legal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Property Identification</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Address</span>
                    <span className="font-medium text-foreground">320 Deakin Avenue, Mildura 3500</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Lot & Plan</span>
                    <span className="text-foreground">Lot 46 LP14633</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">SPI</span>
                    <span className="text-foreground">46\LP14633</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Council Property No.</span>
                    <span className="text-foreground">1508</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Planning Controls</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <span className="text-muted-foreground">Zone</span>
                    <Badge variant="secondary">Commercial 1 Zone (C1Z)</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Planning Scheme</span>
                    <span className="text-foreground">Mildura Planning Scheme</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Council</span>
                    <span className="text-foreground">Mildura Rural City Council</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <span className="text-muted-foreground">Overlays</span>
                    <div className="text-right">
                      <Badge variant="outline" className="mr-1">DDO1</Badge>
                      <Badge variant="outline">SCO1</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Utilities & Services</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Water & Sewerage</h4>
                  <p className="text-sm text-muted-foreground">Lower Murray Water</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Power Distributor</h4>
                  <p className="text-sm text-muted-foreground">POWERCOR</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Fire Authority</h4>
                  <p className="text-sm text-muted-foreground">Fire Rescue Victoria & Country Fire Authority</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Bushfire Prone Area</h4>
                  <p className="text-sm text-green-600 font-medium">Not in designated bushfire prone area</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-foreground">
                <strong>Planning Summary:</strong> The Commercial 1 Zone provides excellent flexibility for accommodation use, 
                with Design and Development Overlay (DDO1) and Specific Controls Overlay (SCO1) applying additional design requirements. 
                The property benefits from full urban services and is not subject to bushfire construction requirements.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Financial Analysis */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <DollarSign className="w-6 h-6" />
              Financial Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Income Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Gross Annual Rental Income</span>
                    <span className="font-medium text-foreground">$120,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Occupancy Rate (estimated)</span>
                    <Badge variant="secondary">80%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <span className="text-muted-foreground">Effective Gross Income</span>
                    <span className="font-semibold text-green-600">$96,000</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Expense Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Operating Expenses</span>
                    <span className="text-foreground">$33,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Depreciation</span>
                    <span className="text-foreground">$10,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Amortization</span>
                    <span className="text-foreground">$10,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <span className="text-muted-foreground">Total Expenses</span>
                    <span className="font-semibold text-red-600">$53,000</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Profitability</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <span className="text-muted-foreground">Net Operating Income (NOI)</span>
                    <span className="font-semibold text-blue-600">$87,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <span className="text-muted-foreground">EBITDA</span>
                    <span className="font-semibold text-blue-600">$87,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="text-muted-foreground">Cap Rate (estimated)</span>
                    <Badge variant="default">7.0%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="text-muted-foreground">Estimated Value Range</span>
                    <span className="font-bold text-primary">$1.2M - $1.4M</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SWOT Analysis */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="w-6 h-6" />
              SWOT Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">Strengths</h3>
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Purpose-built accommodation for 18 residents with high occupancy potential</li>
                      <li>• Located on main road within Commercial 1 zone</li>
                      <li>• Solar energy reduces operating costs significantly</li>
                      <li>• Low-maintenance gardens and fencing minimize ongoing expenses</li>
                      <li>• Stable gross revenue stream of approximately $120,000</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-3">Opportunities</h3>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Potential to increase occupancy rates or rental rates</li>
                      <li>• Energy savings through solar and efficiency upgrades</li>
                      <li>• Expansion or renovation to modernize facilities</li>
                      <li>• Leveraging location for increased demand from nearby industries</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-orange-600 mb-3">Weaknesses</h3>
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Dependence on local economic conditions and demand for worker housing</li>
                      <li>• High depreciation and amortization costs ($20,000 combined)</li>
                      <li>• Limited diversification of income streams</li>
                      <li>• Subject to accommodation industry fluctuations</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">Threats</h3>
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Regulatory changes affecting accommodation use</li>
                      <li>• Market competition from other housing providers</li>
                      <li>• Economic downturn affecting occupancy</li>
                      <li>• Maintenance or operational issues impacting revenue</li>
                    </ul>
                  </div>
                </div>
              </div>
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
                <p className="text-sm text-muted-foreground mt-1">Based on comprehensive analysis incorporating income approach, market comparison, and EBITDA multiples</p>
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
                <strong>Market Position:</strong> The property is well-positioned to service the growing demand for worker accommodation in the Mildura region, benefiting from its strategic location and purpose-built design. The strong cash flow with EBITDA of $87,000 and estimated 80% occupancy rate supports the valuation range.
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Appendices */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-gray-500/10 to-slate-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <FileText className="w-6 h-6" />
              Appendices
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Appendix A: Planning Zone Map</h3>
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <img 
                  src={planningMap} 
                  alt="320 Deakin Avenue Planning Zone Map" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  <strong>Planning Zone Map:</strong> Shows Commercial 1 Zone (C1Z) designation for 320 Deakin Avenue, 
                  with surrounding General Residential Zone (GRZ1), Public Use Zone-Education (PUZ2), and Principal Road Network (TRZ2). 
                  Source: VicPlan Planning Property Report, Department of Transport and Planning, Victoria.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Appendix B: Data Sources & Methodology</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Sales Evidence Sources</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CoreLogic RP Data</li>
                    <li>• Regional real estate agents</li>
                    <li>• Industry accommodation databases</li>
                    <li>• Local market intelligence</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Valuation Methodology</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Income Capitalization Approach</li>
                    <li>• Direct Comparison Method</li>
                    <li>• EBITDA Multiple Analysis</li>
                    <li>• Climate Risk Adjustment</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Planning Information</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• VicPlan Planning Property Report</li>
                    <li>• Mildura Planning Scheme</li>
                    <li>• Design & Development Overlays</li>
                    <li>• Heritage & Environmental Overlays</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Climate Data</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Bureau of Meteorology data</li>
                    <li>• CSIRO climate projections</li>
                    <li>• Regional risk assessments</li>
                    <li>• Industry climate studies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Appendix C: Report Limitations & Disclaimers</h3>
              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Valuation Date:</strong> This valuation is current as at {new Date().toLocaleDateString()} and may not reflect subsequent market changes.</p>
                  <p><strong>Purpose:</strong> This report is prepared for investment analysis purposes and should not be relied upon for other purposes without specific consent.</p>
                  <p><strong>Market Conditions:</strong> Valuations are subject to market volatility and economic conditions that may materially affect property values.</p>
                  <p><strong>Climate Risks:</strong> Climate risk assessments are based on current scientific understanding and may be subject to revision as new data becomes available.</p>
                  <p><strong>Planning Information:</strong> Planning data sourced from official Victorian Government sources dated September 2025. Users should verify current planning controls with relevant authorities.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MilduraValuationReport;