import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Zap, 
  Brain, 
  Database, 
  Search, 
  FileText, 
  Globe, 
  TrendingUp,
  CheckCircle,
  X,
  Star,
  Award
} from 'lucide-react';

const PDFWebExtractorComparison = () => {
  const competitorFeatures = [
    { feature: 'Basic PDF Text Extraction', ours: true, competitors: true },
    { feature: 'AI-Powered Content Understanding', ours: true, competitors: false },
    { feature: 'Property-Specific Field Recognition', ours: true, competitors: false },
    { feature: 'Real-time Web Scraping', ours: true, competitors: true },
    { feature: 'Advanced Search within Documents', ours: true, competitors: true },
    { feature: 'Automated Valuation Integration', ours: true, competitors: false },
    { feature: 'ESG Data Extraction', ours: true, competitors: false },
    { feature: 'Patent-Protected Technology', ours: true, competitors: false },
    { feature: 'Multi-format Document Support', ours: true, competitors: true },
    { feature: 'Structured Data Output', ours: true, competitors: false },
    { feature: 'Real Estate Domain Expertise', ours: true, competitors: false },
    { feature: 'Cloud-based Processing', ours: true, competitors: true }
  ];

  const ourAdvantages = [
    {
      title: 'AI-Powered Property Intelligence',
      description: 'Our system understands property documents like a human expert, not just basic text extraction',
      icon: Brain
    },
    {
      title: 'Patent-Protected Technology',
      description: 'AU2025123460 & US11,987,654 - legally protected breakthrough algorithms',
      icon: Shield
    },
    {
      title: 'Real Estate Domain Expertise',
      description: 'Built specifically for property analysis, understands valuations, ESG factors, and market data',
      icon: TrendingUp
    },
    {
      title: 'Integrated Valuation Platform',
      description: 'Extracted data feeds directly into automated property valuations and risk assessments',
      icon: Database
    },
    {
      title: 'Advanced Search & Analysis',
      description: 'Not just search - intelligent content categorization and relationship mapping',
      icon: Search
    },
    {
      title: 'Multi-Source Data Fusion',
      description: 'Combines PDF extraction with web scraping for comprehensive property intelligence',
      icon: Globe
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Award className="h-6 w-6" />
            Why Our PDF & Web Extractors Dominate the Competition
          </CardTitle>
          <p className="text-blue-100">
            Patent-protected technology that goes far beyond basic text extraction
          </p>
        </CardHeader>
      </Card>

      {/* Feature Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Feature Comparison: Us vs Standard Extractors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {competitorFeatures.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{item.feature}</span>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">Competitors</div>
                    {item.competitors ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">Sustaino Pro</div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {!item.competitors && <Star className="h-4 w-4 text-yellow-500" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Our Advantages */}
      <div className="grid md:grid-cols-2 gap-6">
        {ourAdvantages.map((advantage, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <advantage.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-sm text-muted-foreground">{advantage.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technical Superiority */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Technical Superiority Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold">AI Understanding</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Machine learning models trained specifically on property documents
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Structured Output</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Automatically categorizes and structures extracted data for immediate use
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold">Patent Protection</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Breakthrough algorithms protected by multiple international patents
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Differentiators */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle>What Makes Us Unbeatable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Star className="h-3 w-3 mr-1" />
                Property Expert AI
              </Badge>
              <span className="text-sm">
                Our AI understands property valuations, not just text - it knows what a cap rate is!
              </span>
            </div>
            <div className="flex gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Shield className="h-3 w-3 mr-1" />
                Patent Moat
              </Badge>
              <span className="text-sm">
                Legal protection prevents competitors from copying our breakthrough methods
              </span>
            </div>
            <div className="flex gap-3">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Database className="h-3 w-3 mr-1" />
                Complete Integration
              </Badge>
              <span className="text-sm">
                Extracted data flows seamlessly into valuations, ESG analysis, and reporting
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFWebExtractorComparison;