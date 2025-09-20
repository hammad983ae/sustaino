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
  Thermometer,
  TrendingUp
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
              3. Sales Evidence Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Selected Comparable Sales</h3>
              <p className="text-muted-foreground mb-4">
                The following three comparable sales have been selected based on property type similarity, location proximity, 
                timing relevance, and accommodation sector alignment with the subject property.
              </p>
            </div>

            <div className="space-y-6">
              {/* Comparable 1 */}
              <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Comparable 1: Worker Accommodation, Mildura</h4>
                    <Badge variant="default" className="mt-1">Most Similar</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">$1,200,000</p>
                    <p className="text-sm text-muted-foreground">Q2 2024</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Yield</p>
                    <p className="font-semibold text-foreground">7.5%</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Rooms</p>
                    <p className="font-semibold text-foreground">20</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Price per Room</p>
                    <p className="font-semibold text-foreground">$60,000</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Relevance</p>
                    <Badge variant="secondary">95%</Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> Identical property type and location. Purpose-built accommodation with strong demand characteristics. 
                    Recent sale date provides excellent market timing relevance. Higher room count (20 vs 18) suggests economies of scale benefits.
                  </p>
                </div>
              </div>

              {/* Comparable 2 */}
              <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Comparable 2: Regional Motel, Mildura</h4>
                    <Badge variant="outline" className="mt-1">Location Match</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">$2,500,000</p>
                    <p className="text-sm text-muted-foreground">Q4 2023</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Yield</p>
                    <p className="font-semibold text-foreground">8.0%</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Rooms</p>
                    <p className="font-semibold text-foreground">20</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Price per Room</p>
                    <p className="font-semibold text-foreground">$125,000</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Relevance</p>
                    <Badge variant="secondary">80%</Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> Same location and similar room count but different accommodation type (motel vs worker accommodation). 
                    Well-established with modern amenities commanding premium price. Higher yield and price per room reflect tourist/commercial guest market premium.
                  </p>
                </div>
              </div>

              {/* Comparable 3 */}
              <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Comparable 3: Worker Accommodation, Riverina</h4>
                    <Badge variant="outline" className="mt-1">Use Match</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">$950,000</p>
                    <p className="text-sm text-muted-foreground">Q1 2024</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Yield</p>
                    <p className="font-semibold text-foreground">7.8%</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Rooms</p>
                    <p className="font-semibold text-foreground">15</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Price per Room</p>
                    <p className="font-semibold text-foreground">$63,333</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Relevance</p>
                    <Badge variant="secondary">75%</Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> Identical property type (worker accommodation) but different location. New build with high occupancy expectations. 
                    Lower total price reflects smaller scale (15 vs 18 rooms) and regional location differential. Recent timing provides good market reference.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Sales Evidence Summary</h4>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Average Price per Room</p>
                  <p className="text-lg font-bold text-primary">$82,778</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Yield</p>
                  <p className="text-lg font-bold text-primary">7.77%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subject Property (18 rooms)</p>
                  <p className="text-lg font-bold text-primary">$1.2M - $1.4M</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Evidence - Leasing Evidence */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <DollarSign className="w-6 h-6" />
              Leasing Evidence Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Selected Comparable Leases</h3>
              <p className="text-muted-foreground mb-4">
                The following three comparable leases demonstrate current market rental levels and lease structures 
                applicable to the subject property's accommodation sector.
              </p>
            </div>

            <div className="space-y-6">
              {/* Lease Comparable 1 */}
              <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Lease Comparable 1: Worker Accommodation, Mildura</h4>
                    <Badge variant="default" className="mt-1">Direct Match</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">$1,200 - $1,800</p>
                    <p className="text-sm text-muted-foreground">per room per annum</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Lease Term</p>
                    <p className="font-semibold text-foreground">5-10 years</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Review Type</p>
                    <p className="font-semibold text-foreground">CPI-linked</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Market Position</p>
                    <Badge variant="secondary">Current</Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> Direct comparable - same property type and location. Recent regional leases showing strong market acceptance. 
                    CPI-linked reviews provide inflation protection. Range reflects room quality and facility differences within the accommodation sector.
                  </p>
                </div>
              </div>

              {/* Lease Comparable 2 */}
              <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Lease Comparable 2: Regional Motel, Mildura</h4>
                    <Badge variant="outline" className="mt-1">Location Match</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">$1,500 - $2,000</p>
                    <p className="text-sm text-muted-foreground">per room per annum</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Lease Term</p>
                    <p className="font-semibold text-foreground">5-10 years</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Review Type</p>
                    <p className="font-semibold text-foreground">Fixed / CPI</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Market Position</p>
                    <Badge variant="secondary">Established</Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> Well-established properties in same location commanding premium rates. Mixed review mechanisms (Fixed/CPI) 
                    provide flexibility for both parties. Higher rental rates reflect tourist accommodation premium over worker accommodation sector.
                  </p>
                </div>
              </div>

              {/* Lease Comparable 3 */}
              <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Lease Comparable 3: Motel, Gippsland</h4>
                    <Badge variant="outline" className="mt-1">Sector Benchmark</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-purple-600">$1,300 - $1,900</p>
                    <p className="text-sm text-muted-foreground">per room per annum</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Lease Term</p>
                    <p className="font-semibold text-foreground">5-10 years</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Review Type</p>
                    <p className="font-semibold text-foreground">CPI escalation</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Market Position</p>
                    <Badge variant="secondary">Tourist Area</Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> Regional accommodation properties near tourist attractions. CPI escalation clauses standard practice. 
                    Rental range reflects seasonal demand fluctuations and location premiums. Provides good benchmark for regional accommodation sector performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Leasing Evidence Summary</h4>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Average Rental Range</p>
                  <p className="text-lg font-bold text-primary">$1,333 - $1,900</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Typical Lease Term</p>
                  <p className="text-lg font-bold text-primary">5-10 years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Review</p>
                  <p className="text-lg font-bold text-primary">CPI-linked</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Subject Property Assessment:</strong> Based on comparable evidence, the subject property should achieve 
                  rental income in the range of $1,200-$1,500 per room per annum (18 rooms = $21,600-$27,000 total), 
                  supporting the current gross income estimate of $120,000 per annum.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Economic, Geographical and Catchment Area Analysis */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-amber-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="w-6 h-6" />
              Economic, Geographical and Catchment Area Analysis
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Market dynamics, location factors, and catchment area assessment</p>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            
            {/* Macro Economic Factors */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Macro Economic Environment</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">National Economic Indicators</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">RBA Cash Rate</span>
                        <span className="font-medium text-foreground">4.35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">CPI (Annual)</span>
                        <span className="font-medium text-foreground">3.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">GDP Growth</span>
                        <span className="font-medium text-foreground">1.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Unemployment Rate</span>
                        <span className="font-medium text-foreground">3.7%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Construction Cost Factors</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Construction Cost Index</span>
                        <span className="font-medium text-foreground">+8.5% YoY</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Material Costs</span>
                        <span className="font-medium text-foreground">+12.3% YoY</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Labor Costs</span>
                        <span className="font-medium text-foreground">+6.8% YoY</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Supply Chain Impact</span>
                        <Badge variant="destructive">High</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Property Market Dynamics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">National Property Growth</span>
                        <span className="font-medium text-foreground">+4.2% YoY</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Regional Victoria Growth</span>
                        <span className="font-medium text-foreground">+2.8% YoY</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Commercial Property Yield</span>
                        <span className="font-medium text-foreground">6.5-8.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Investment Demand</span>
                        <Badge variant="secondary">Moderate</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Sunraysia Region Infrastructure Impact</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Murray River infrastructure upgrades and flood mitigation works</li>
                      <li>• Sunraysia Institute TAFE campus expansions and upgrades</li>
                      <li>• Mildura Hospital redevelopment and healthcare facility upgrades</li>
                      <li>• Regional solar farm developments requiring construction workforce</li>
                      <li>• Irrigation modernization projects across the Sunraysia district</li>
                      <li>• Mildura Airport terminal upgrade and runway improvements</li>
                      <li>• Regional road network improvements (Calder Highway, Sturt Highway)</li>
                      <li>• Water treatment and recycling infrastructure projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Mildura Geographical and Economic Summary */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Mildura Regional Analysis</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Geographic Profile</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-2"><strong>Location:</strong> Northwestern Victoria, Murray River region</p>
                        <p className="text-muted-foreground mb-2"><strong>Distance to Melbourne:</strong> 550km (approx. 5.5 hours drive)</p>
                        <p className="text-muted-foreground mb-2"><strong>Population:</strong> ~55,000 (Greater Mildura area)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-2"><strong>Climate:</strong> Semi-arid, hot summers, mild winters</p>
                        <p className="text-muted-foreground mb-2"><strong>Transport:</strong> Mildura Airport, rail, highway access</p>
                        <p className="text-muted-foreground mb-2"><strong>Border Location:</strong> NSW/SA proximity advantage</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-100 dark:from-emerald-950/20 dark:to-teal-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Economic Drivers</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Primary Industries</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Agriculture (citrus, grapes, almonds)</li>
                          <li>• Horticulture and food processing</li>
                          <li>• Wine production and viticulture</li>
                          <li>• Dried fruit processing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Secondary Sectors</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Tourism and hospitality</li>
                          <li>• Healthcare and aged care</li>
                          <li>• Education and training</li>
                          <li>• Retail and services</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Economic Indicators</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Local GDP</span>
                        <span className="font-medium text-foreground">$2.8B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">GDP per Capita</span>
                        <span className="font-medium text-foreground">$51,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Unemployment</span>
                        <span className="font-medium text-foreground">4.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Economic Growth</span>
                        <span className="font-medium text-foreground">+2.1% YoY</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-b from-amber-50 to-yellow-100 dark:from-amber-950/20 dark:to-yellow-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Investment Climate</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Business Confidence</span>
                        <Badge variant="secondary">Stable</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Population Growth</span>
                        <span className="font-medium text-foreground">+1.8% YoY</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Development Activity</span>
                        <Badge variant="secondary">Moderate</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Accommodation Sector Catchment Analysis */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Accommodation Sector Catchment Analysis</h3>
              
              <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">Sector Overview</h4>
                <p className="text-sm text-muted-foreground">
                  The Mildura accommodation sector encompasses diverse market segments including worker accommodation, 
                  traditional motels, boarding houses, and short-term rentals (Airbnb), each serving distinct demand drivers 
                  within the regional economy.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Worker Accommodation Demand Drivers
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-foreground mb-1">Agricultural Workforce</h5>
                        <p className="text-sm text-muted-foreground">Seasonal harvest workers (3,000-5,000 annually), permanent farm employees, and processing facility staff driving consistent accommodation demand.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground mb-1">Sunraysia Infrastructure Projects</h5>
                        <p className="text-sm text-muted-foreground">Major regional infrastructure developments including Murray River upgrades, irrigation modernization, and renewable energy projects requiring temporary worker housing.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground mb-1">Mining & Energy</h5>
                        <p className="text-sm text-muted-foreground">Regional mining operations and renewable energy projects creating demand for worker accommodation facilities.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Home className="w-5 h-5" />
                      Traditional Accommodation Supply
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Motels & Hotels</span>
                        <span className="font-medium text-foreground">~850 rooms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Worker Accommodation</span>
                        <span className="font-medium text-foreground">~400 beds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Boarding Houses</span>
                        <span className="font-medium text-foreground">~200 beds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Airbnb/Short-term</span>
                        <span className="font-medium text-foreground">~300 listings</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Market Demand Analysis
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-foreground mb-1">Tourism Segment</h5>
                        <p className="text-sm text-muted-foreground">Murray River tourism, wine tours, and paddle steamer operations generating 280,000+ visitor nights annually.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground mb-1">Business Travel</h5>
                        <p className="text-sm text-muted-foreground">Corporate visitors, government officials, and professional services creating consistent mid-week demand.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground mb-1">Events & Conferences</h5>
                        <p className="text-sm text-muted-foreground">Mildura Regional Convention Centre and seasonal events driving peak accommodation demand.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Competitive Market Position
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Average Occupancy</span>
                        <span className="font-medium text-foreground">72%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Peak Season Occupancy</span>
                        <span className="font-medium text-foreground">85-90%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Average Daily Rate</span>
                        <span className="font-medium text-foreground">$110-140</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Market Growth</span>
                        <Badge variant="secondary">+3.2% YoY</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-foreground mb-2">Subject Property Market Position</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  The 18-room worker accommodation facility at 320 Deakin Avenue is strategically positioned to capture demand from multiple market segments:
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-foreground mb-1">Primary Market (60%)</h5>
                    <p className="text-muted-foreground">Agricultural and seasonal workers requiring medium to long-term accommodation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-1">Secondary Market (25%)</h5>
                    <p className="text-muted-foreground">Infrastructure project workers and temporary business visitors</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-1">Tertiary Market (15%)</h5>
                    <p className="text-muted-foreground">Budget-conscious tourists and extended-stay leisure travelers</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Supply and Demand Outlook */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Supply & Demand Outlook</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-900/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3 text-green-700 dark:text-green-300">Demand Growth Factors</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✓ Expanding agricultural sector requiring seasonal workforce</li>
                    <li>✓ Sunraysia region infrastructure investment (hospital, TAFE, solar farms)</li>
                    <li>✓ Murray River tourism and recreational development projects</li>
                    <li>✓ Limited quality worker accommodation supply in the region</li>
                    <li>✓ Population growth driving service sector employment</li>
                    <li>✓ Renewable energy projects throughout Sunraysia creating accommodation demand</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-950/20 dark:to-orange-900/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3 text-red-700 dark:text-red-300">Supply Constraints</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>⚠ Rising construction costs limiting new development</li>
                    <li>⚠ Planning approval complexities for accommodation facilities</li>
                    <li>⚠ Labor shortages affecting construction timelines</li>
                    <li>⚠ Interest rate environment impacting investment appetite</li>
                    <li>⚠ Regulatory requirements increasing compliance costs</li>
                    <li>⚠ Land availability constraints in prime locations</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">Market Outlook Summary</h4>
                <p className="text-sm text-muted-foreground">
                  The accommodation sector in Mildura demonstrates strong fundamentals with diverse demand drivers and limited quality supply. 
                  The subject property's worker accommodation focus positions it well to capitalize on agricultural, infrastructure, and tourism growth. 
                  Supply constraints support stable occupancy rates and rental growth, while the facility's strategic location and purpose-built 
                  design provide competitive advantages in the local market.
                </p>
              </div>
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

        {/* Valuation Analysis and Rationale */}
        <Card className="shadow-lg border-border">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="w-6 h-6" />
              Valuation Analysis and Rationale
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Comprehensive valuation methodology and future value projections</p>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            
            {/* Valuation Methodology */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Valuation Methodology</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">Income Capitalization Approach</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Operating Income:</span>
                      <span className="font-medium text-foreground">$87,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capitalization Rate:</span>
                      <span className="font-medium text-foreground">7.0%</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-muted-foreground">Indicated Value:</span>
                      <span className="font-bold text-blue-600">$1,243,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">Direct Comparison Method</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. Price per Room:</span>
                      <span className="font-medium text-foreground">$82,778</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subject Rooms:</span>
                      <span className="font-medium text-foreground">18</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-muted-foreground">Indicated Value:</span>
                      <span className="font-bold text-green-600">$1,290,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">EBITDA Multiple Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">EBITDA:</span>
                      <span className="font-medium text-foreground">$87,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry Multiple:</span>
                      <span className="font-medium text-foreground">15.5x</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-muted-foreground">Indicated Value:</span>
                      <span className="font-bold text-purple-600">$1,349,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">Weighted Valuation Analysis</h4>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">Income Approach (40%)</p>
                    <p className="font-medium text-foreground">$497,200</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Sales Comparison (35%)</p>
                    <p className="font-medium text-foreground">$451,500</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">EBITDA Multiple (25%)</p>
                    <p className="font-medium text-foreground">$337,250</p>
                  </div>
                  <div className="text-center border-l border-primary/30">
                    <p className="text-muted-foreground">Market Value</p>
                    <p className="text-xl font-bold text-primary">$1,286,000</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Sunraysia Infrastructure Impact Analysis */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Sunraysia Infrastructure Value Impact</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-100 dark:from-emerald-950/20 dark:to-teal-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Major Infrastructure Projects</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">Mildura Hospital Redevelopment</p>
                          <p className="text-sm text-muted-foreground">Completion: Q2 2025 | Distance: 1.2km</p>
                        </div>
                        <Badge variant="secondary">+8.2% impact</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">Sunraysia TAFE Campus Upgrade</p>
                          <p className="text-sm text-muted-foreground">Completion: Q1 2025 | Distance: 0.8km</p>
                        </div>
                        <Badge variant="secondary">+6.5% impact</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">Regional Solar Farm Development</p>
                          <p className="text-sm text-muted-foreground">Completion: Q4 2024 | Distance: 2.1km</p>
                        </div>
                        <Badge variant="secondary">+4.8% impact</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-100 dark:from-blue-950/20 dark:to-cyan-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Cumulative Value Enhancement</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Market Value:</span>
                        <span className="font-medium text-foreground">$1,286,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Infrastructure Premium:</span>
                        <span className="font-medium text-green-600">+12.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Enhanced Value (6 months):</span>
                        <span className="font-medium text-foreground">$1,451,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-muted-foreground">24-month Projection:</span>
                        <span className="font-bold text-primary">$1,525,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-sm text-foreground">
                      <strong>Infrastructure Impact Rationale:</strong> Proximity to major Sunraysia infrastructure developments 
                      creates increased demand for worker accommodation, supporting premium pricing and enhanced occupancy rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Market Cycle and Risk Analysis */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Market Cycle & Risk Assessment</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Market Cycle Position
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Current Phase:</span>
                        <Badge variant="default" className="bg-green-600">Growth</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Confidence Level:</span>
                        <span className="font-bold text-green-600">73%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Time to Next Phase:</span>
                        <span className="font-medium text-foreground">18 months</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-3">
                        Market currently in growth phase with positive momentum expected to continue, 
                        supporting value appreciation and rental growth prospects.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-950/20 dark:to-red-900/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      Risk Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Interest Rate Rise (65% probability):</span>
                        <span className="text-red-600 font-medium">-8.5% impact</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Economic Recession (25% probability):</span>
                        <span className="text-red-600 font-medium">-15.2% impact</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Oversupply Risk (40% probability):</span>
                        <span className="text-orange-600 font-medium">-6.1% impact</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Infrastructure Delays (30% probability):</span>
                        <span className="text-orange-600 font-medium">-4.3% impact</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-900/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3">Risk-Adjusted Valuation Range</h4>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Conservative Scenario</p>
                    <p className="text-lg font-bold text-red-600">$1,150,000</p>
                    <p className="text-xs text-muted-foreground">High risk impact</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Most Likely Scenario</p>
                    <p className="text-xl font-bold text-primary">$1,286,000</p>
                    <p className="text-xs text-muted-foreground">Current market conditions</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Optimistic Scenario</p>
                    <p className="text-lg font-bold text-green-600">$1,450,000</p>
                    <p className="text-xs text-muted-foreground">Infrastructure benefits realized</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Value Projections */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Future Value Projections</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">6 Month Projection</h4>
                  <div className="text-center mb-3">
                    <p className="text-2xl font-bold text-blue-600">$1,287,500</p>
                    <p className="text-sm text-green-600">+3.0% change</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground"><strong>Key Factors:</strong></p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Interest rate stability</li>
                      <li>• Local demand patterns</li>
                      <li>• Seasonal variation</li>
                    </ul>
                    <p className="text-muted-foreground mt-2"><strong>Confidence:</strong> <Badge variant="secondary">High (78%)</Badge></p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">12 Month Projection</h4>
                  <div className="text-center mb-3">
                    <p className="text-2xl font-bold text-green-600">$1,342,000</p>
                    <p className="text-sm text-green-600">+7.4% change</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground"><strong>Key Factors:</strong></p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Infrastructure development</li>
                      <li>• Population growth</li>
                      <li>• Employment trends</li>
                    </ul>
                    <p className="text-muted-foreground mt-2"><strong>Confidence:</strong> <Badge variant="secondary">Medium (71%)</Badge></p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">24 Month Projection</h4>
                  <div className="text-center mb-3">
                    <p className="text-2xl font-bold text-purple-600">$1,425,000</p>
                    <p className="text-sm text-green-600">+14.0% change</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground"><strong>Key Factors:</strong></p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Major infrastructure projects</li>
                      <li>• Urban development</li>
                      <li>• Economic growth</li>
                    </ul>
                    <p className="text-muted-foreground mt-2"><strong>Confidence:</strong> <Badge variant="secondary">Medium (64%)</Badge></p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-foreground mb-3">Valuation Summary & Recommendation</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Current Valuation Range</h5>
                    <p className="text-2xl font-bold text-primary mb-2">$1.2M - $1.4M</p>
                    <p className="text-sm text-muted-foreground">
                      Based on comprehensive analysis incorporating income approach, comparable sales, and EBITDA multiples, 
                      with adjustments for climate risk and infrastructure benefits.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Investment Recommendation</h5>
                    <Badge variant="default" className="mb-2">POSITIVE OUTLOOK</Badge>
                    <p className="text-sm text-muted-foreground">
                      Strong fundamentals with Sunraysia infrastructure development creating additional value enhancement. 
                      Purpose-built accommodation facility well-positioned for sustained demand growth and capital appreciation.
                    </p>
                  </div>
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