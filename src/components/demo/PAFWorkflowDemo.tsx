import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContradictionChecker } from '@/components/reports/ContradictionChecker';
import { ContradictionAmender } from '@/components/reports/ContradictionAmender';
import { 
  FileText, 
  MapPin, 
  Building, 
  Leaf, 
  Shield, 
  BarChart3,
  CheckCircle,
  Clock,
  ArrowRight,
  Home,
  Scale,
  Camera,
  Users,
  Eye,
  AlertTriangle
} from 'lucide-react';

export const PAFWorkflowDemo = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [completedSections, setCompletedSections] = useState(new Set());
  const [viewingReport, setViewingReport] = useState(false);
  const [showContradictionChecker, setShowContradictionChecker] = useState(false);

  const pafSections = [
    {
      id: 'property-details',
      title: 'Property Details',
      description: 'Basic property information and location',
      icon: Home,
      required: true,
      estimated_time: '5 min',
      example_data: {
        address: '456 Bourke Street, Melbourne VIC 3000',
        property_type: 'Residential House',
        land_area: '650 sqm',
        building_area: '280 sqm',
        bedrooms: 4,
        bathrooms: 3,
        parking: 2
      }
    },
    {
      id: 'legal-planning',
      title: 'Legal & Planning',
      description: 'Title details, zoning, and planning information',
      icon: Scale,
      required: true,
      estimated_time: '8 min',
      example_data: {
        title_type: 'Torrens Title',
        zoning: 'Residential 1 Zone (R1Z)',
        overlays: 'Heritage Overlay (HO123)',
        easements: 'None identified',
        planning_permits: 'Current permit for extensions'
      }
    },
    {
      id: 'market-analysis',
      title: 'Market Commentary',
      description: 'Local market conditions and comparable sales',
      icon: BarChart3,
      required: true,
      estimated_time: '12 min',
      example_data: {
        market_trend: 'Stable with moderate growth',
        comparable_sales: '8 sales in past 12 months',
        median_price: '$1,180,000',
        days_on_market: '32 days average',
        growth_rate: '3.2% per annum'
      }
    },
    {
      id: 'physical-inspection',
      title: 'Physical Inspection',
      description: 'Property condition and improvement details',
      icon: Camera,
      required: true,
      estimated_time: '15 min',
      example_data: {
        condition: 'Good overall condition',
        improvements: 'Recent kitchen renovation',
        maintenance: 'Regular maintenance evident',
        defects: 'Minor paint touch-ups required',
        photos: '24 interior/exterior photos'
      }
    },
    {
      id: 'esg-assessment',
      title: 'ESG Assessment',
      description: 'Environmental, social, and governance factors',
      icon: Leaf,
      required: true,
      estimated_time: '8 min',
      example_data: {
        energy_rating: '7.5 stars',
        environmental_score: '85%',
        social_impact: 'High walkability, good schools',
        governance: 'Compliant with all regulations',
        sustainability_features: 'Solar panels, rainwater tank'
      }
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment',
      description: 'Risk factors and mitigation strategies',
      icon: Shield,
      required: true,
      estimated_time: '5 min',
      example_data: {
        flood_risk: 'Low risk zone',
        bushfire_risk: 'Minimal risk',
        earthquake_risk: 'Low seismic activity',
        market_risk: 'Stable market conditions',
        environmental_risks: 'None identified'
      }
    },
    {
      id: 'valuation-approach',
      title: 'Valuation Approach',
      description: 'Methodology and final valuation conclusion',
      icon: Building,
      required: true,
      estimated_time: '8 min',
      example_data: {
        primary_method: 'Direct Comparison',
        secondary_method: 'Cost Approach',
        market_value: '$1,320,000',
        confidence_level: '95%',
        effective_date: new Date().toLocaleDateString()
      }
    }
  ];

  const toggleSection = (sectionId: string) => {
    const newCompleted = new Set(completedSections);
    if (newCompleted.has(sectionId)) {
      newCompleted.delete(sectionId);
    } else {
      newCompleted.add(sectionId);
    }
    setCompletedSections(newCompleted);
  };

  const completeAllSections = () => {
    setCompletedSections(new Set(pafSections.map(s => s.id)));
  };

  const progressPercentage = (completedSections.size / pafSections.length) * 100;
  const totalEstimatedTime = pafSections.reduce((acc, section) => {
    const minutes = parseInt(section.estimated_time);
    return acc + minutes;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-blue-500" />
          <h3 className="text-2xl font-bold text-primary">PAF Comprehensive Workflow</h3>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Property Assessment Form - Complete professional valuation workflow with all required sections and documentation.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Button onClick={completeAllSections} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete All Sections
          </Button>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
            Est. Time: {totalEstimatedTime} minutes
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">PAF Completion Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedSections.size} of {pafSections.length} sections complete ({Math.round(progressPercentage)}%)
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Sections Overview</TabsTrigger>
            <TabsTrigger value="workflow">Step-by-Step Workflow</TabsTrigger>
            <TabsTrigger value="report">View Report</TabsTrigger>
            <TabsTrigger value="quality">Quality Check</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4">
              {pafSections.map((section) => {
                const Icon = section.icon;
                const isCompleted = completedSections.has(section.id);
                
                return (
                  <Card 
                    key={section.id} 
                    className={`transition-all duration-300 cursor-pointer hover:shadow-md ${
                      isCompleted ? 'border-green-300 bg-green-50' : 'border-muted hover:border-primary'
                    }`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{section.title}</h4>
                            {section.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                        </div>
                        
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {section.estimated_time}
                          </Badge>
                        </div>
                      </div>
                      
                      {isCompleted && (
                        <div className="mt-4 p-3 bg-white rounded-lg border">
                          <h5 className="font-medium text-sm mb-2">Example Data Captured:</h5>
                          <div className="grid md:grid-cols-2 gap-2 text-xs">
                            {Object.entries(section.example_data).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground capitalize">
                                  {key.replace(/_/g, ' ')}:
                                </span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <div className="space-y-4">
              {pafSections.map((section, index) => {
                const Icon = section.icon;
                const isCompleted = completedSections.has(section.id);
                
                return (
                  <div key={section.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full ${
                        isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      {index < pafSections.length - 1 && (
                        <div className={`w-px h-12 mt-2 ${
                          isCompleted ? 'bg-green-300' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                    
                    <Card className={`flex-1 ${isCompleted ? 'border-green-300' : 'border-muted'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{section.title}</h4>
                          <Badge variant={isCompleted ? 'default' : 'secondary'}>
                            Step {index + 1}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{section.estimated_time}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>

            {completedSections.size === pafSections.length && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    PAF Workflow Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Final Valuation</h4>
                      <p className="text-2xl font-bold text-green-700">$1,320,000</p>
                      <p className="text-sm text-muted-foreground">Market Value (Fee Simple)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Report Status</h4>
                      <p className="text-sm">✓ All sections completed</p>
                      <p className="text-sm">✓ Quality checks passed</p>
                      <p className="text-sm">✓ Ready for client delivery</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Actions</h4>
                      <Button 
                        className="w-full mb-2" 
                        size="sm"
                        onClick={() => setActiveSection('report')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        size="sm"
                        onClick={() => setActiveSection('quality')}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Quality Check
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    PAF Report - Property Assessment Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Executive Summary */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold mb-3">Executive Summary</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Property Address</p>
                          <p className="font-medium">456 Bourke Street, Melbourne VIC 3000</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Market Value</p>
                          <p className="text-xl font-bold text-green-600">$1,320,000</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Property Type</p>
                          <p className="font-medium">Residential House</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Effective Date</p>
                          <p className="font-medium">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Report Sections */}
                    {pafSections.map((section) => (
                      <div key={section.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-3">
                          <section.icon className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-semibold">{section.title}</h3>
                          {completedSections.has(section.id) && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        
                        {completedSections.has(section.id) ? (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid md:grid-cols-2 gap-3">
                              {Object.entries(section.example_data).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-sm text-muted-foreground capitalize">
                                    {key.replace(/_/g, ' ')}:
                                  </span>
                                  <span className="text-sm font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            Section pending completion
                          </p>
                        )}
                      </div>
                    ))}

                    {completedSections.size === pafSections.length && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-2">Valuation Conclusion</h4>
                        <p className="text-sm mb-3">
                          Based on comprehensive analysis of all property factors, market conditions, 
                          and comparable sales, the market value of the subject property is assessed at 
                          $1,320,000 as at {new Date().toLocaleDateString()}.
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500">Certified Valuation</Badge>
                          <Badge variant="outline">95% Confidence</Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Quality Assurance & Contradiction Checking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Automated quality checking and contradiction detection for PAF reports.
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={() => setShowContradictionChecker(!showContradictionChecker)}
                      variant={showContradictionChecker ? "default" : "outline"}
                      className="w-full"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {showContradictionChecker ? 'Hide' : 'Show'} Contradiction Checker Demo
                    </Button>
                    
                    {showContradictionChecker && (
                      <div className="space-y-6">
                        <ContradictionChecker
                          reportData={{
                            property_address: "456 Bourke Street, Melbourne VIC 3000",
                            market_value: 1320000,
                            property_type: "Residential House",
                            land_area: "650 sqm",
                            building_area: "280 sqm",
                            bedrooms: 4,
                            bathrooms: 3,
                            condition: "Good overall condition",
                            market_trend: "Stable with moderate growth",
                            comparable_sales: "8 sales in past 12 months",
                            median_price: 1180000,
                            energy_rating: "7.5 stars",
                            zoning: "Residential 1 Zone (R1Z)"
                          }}
                          reportType="PAF"
                        />
                        
                        <ContradictionAmender
                          reportData={{
                            valuation: { marketValue: 1320000 },
                            propertyDetails: { 
                              salePrice: 1320000,
                              condition: "Good overall condition"
                            },
                            rental: { weeklyRent: 800 },
                            inspectionDate: new Date().toISOString(),
                            valuationDate: new Date().toISOString()
                          }}
                          contradictions={[
                            {
                              id: "1",
                              type: "data_inconsistency",
                              severity: "medium",
                              description: "Market value ($1,320,000) significantly above median price ($1,180,000) for comparable properties",
                              field: "market_value",
                              suggested_fix: "Review comparable sales analysis and justify premium",
                              confidence: 0.8
                            },
                            {
                              id: "2", 
                              type: "logical_conflict",
                              severity: "low",
                              description: "High energy rating (7.5 stars) not reflected in ESG assessment premiums",
                              field: "energy_rating",
                              suggested_fix: "Apply sustainability premium to valuation",
                              confidence: 0.65
                            }
                          ]}
                          onAmendmentSaved={(amendments) => {
                            console.log('Amendments saved:', amendments);
                          }}
                          onReportUpdated={(updatedData) => {
                            console.log('Report updated:', updatedData);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};