import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, Leaf, BarChart3, FileSpreadsheet, TrendingUp, 
  Calculator, Target, AlertTriangle, CheckCircle, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ESGAssessment from '@/components/ESGAssessment';
import EnhancedESGStrategy from '@/pages/EnhancedESGStrategy';

const StreamlinedESGPlatform = () => {
  const [activeFunction, setActiveFunction] = useState<string>('assessment');

  const coreESGFunctions = [
    {
      id: 'assessment',
      title: 'ESG Scoring',
      description: 'Comprehensive Environmental, Social, and Governance assessment with industry-standard scoring methodology.',
      icon: <Building2 className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-green-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      status: 'active'
    },
    {
      id: 'risk-analysis',
      title: 'Risk Analysis', 
      description: 'Property risk rating incorporating sustainability factors, property age, and certification status.',
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      status: 'active'
    },
    {
      id: 'strategy',
      title: 'Strategic Analysis',
      description: 'Advanced ESG strategy optimization with carbon credit swaps and financial impact modeling.',
      icon: <Target className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-purple-50 to-purple-100', 
      borderColor: 'border-purple-200',
      status: 'active'
    },
    {
      id: 'export',
      title: 'Export Tools',
      description: 'Export results to CSV, JSON, and Excel templates for integration with valuation workflows.',
      icon: <FileSpreadsheet className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-orange-50 to-orange-100',
      borderColor: 'border-orange-200', 
      status: 'active'
    }
  ];

  const renderActiveFunction = () => {
    switch (activeFunction) {
      case 'assessment':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">ESG Property Assessment</h2>
              <p className="text-muted-foreground">
                Complete environmental, social, and governance evaluation for property valuation
              </p>
            </div>
            <ESGAssessment />
          </div>
        );
      
      case 'risk-analysis':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">ESG Risk Analysis</h2>
              <p className="text-muted-foreground">
                Comprehensive risk assessment incorporating sustainability and market factors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-800">Environmental Risk</span>
                  </div>
                  <Progress value={65} className="mb-2" />
                  <p className="text-sm text-red-700">Moderate climate exposure</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Social Risk</span>
                  </div>
                  <Progress value={40} className="mb-2" />
                  <p className="text-sm text-yellow-700">Low community impact</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Governance Risk</span>
                  </div>
                  <Progress value={25} className="mb-2" />
                  <p className="text-sm text-green-700">Strong compliance</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Overall ESG Risk Score</span>
                    <Badge variant="secondary">43/100 (Moderate)</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Climate risk assessment indicates moderate exposure to physical and transition risks</p>
                    <p>• Social factors show minimal community disruption concerns</p> 
                    <p>• Governance structures meet regulatory compliance standards</p>
                    <p>• Recommended: Implement climate adaptation strategies within 24 months</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'strategy':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">ESG Strategy Optimization</h2>
              <p className="text-muted-foreground">
                Advanced carbon credit optimization and financial impact analysis
              </p>
            </div>
            <Link to="/enhanced-esg-strategy">
              <Button className="w-full mb-4">
                Open Full Strategy Analysis Platform
              </Button>
            </Link>
            
            {/* Quick Strategy Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Strategy Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">$297.0M</div>
                  <p className="text-sm text-muted-foreground">10-year projected savings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Enhanced Strategy Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success mb-2">$615.5M</div>
                  <p className="text-sm text-success">+107% improvement potential</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 'export':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Export Tools</h2>
              <p className="text-muted-foreground">
                Export ESG assessment results for integration with valuation workflows
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileSpreadsheet className="h-8 w-8 mx-auto mb-3 text-green-600" />
                  <h3 className="font-medium mb-2">Excel Export</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed ESG scores and analysis in Excel format
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Export to Excel
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-medium mb-2">CSV Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Raw data export for custom analysis and reporting
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Export CSV
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-medium mb-2">JSON API</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Structured data for direct system integration
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Download JSON
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Integration Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Valuation Workflow Template</span>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Risk Assessment Report</span>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">ESG Score Summary</span>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                ESG Property Assessment Platform
              </h1>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Badge className="mb-4">
                🌍 First in the World ESG Property Assessment Platform
              </Badge>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The world's first comprehensive ESG-integrated property valuation system.
                Professional sustainability and risk evaluation platform for real estate properties.
                Choose between basic ESG assessment or advanced automated calculations with 
                comprehensive risk analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Core Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {coreESGFunctions.map((func) => (
            <Card 
              key={func.id}
              className={`${func.color} ${func.borderColor} hover:shadow-lg transition-all duration-200 cursor-pointer ${
                activeFunction === func.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveFunction(func.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {func.icon}
                  <h3 className="font-semibold text-foreground">{func.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {func.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant={func.status === 'active' ? 'default' : 'secondary'}>
                    {func.status === 'active' ? 'Active' : 'Coming Soon'}
                  </Badge>
                  {activeFunction === func.id && (
                    <TrendingUp className="h-4 w-4 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Function Content */}
        <div className="bg-background/80 backdrop-blur rounded-lg border p-8">
          {renderActiveFunction()}
        </div>
      </div>
    </div>
  );
};

export default StreamlinedESGPlatform;