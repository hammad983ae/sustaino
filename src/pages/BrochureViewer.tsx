import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';

// Import all the actual brochures
import PropertyValuationsBrochure from '@/components/brochures/PropertyValuationsBrochure';
import FinancialReportingBrochure from '@/components/brochures/FinancialReportingBrochure';
import ESGAssessmentBrochure from '@/components/brochures/ESGAssessmentBrochure';
import DevelopmentSiteBrochure from '@/components/brochures/DevelopmentSiteBrochure';
import PlantEquipmentBrochure from '@/components/brochures/PlantEquipmentBrochure';
import RentReversionsBrochure from '@/components/brochures/RentReversionsBrochure';
import ESDBrochure from '@/components/brochures/ESDBrochure';
import PlatformEcosystemBrochure from '@/components/brochures/PlatformEcosystemBrochure';
import PatentsAndIPBrochure from '@/components/brochures/PatentsAndIPBrochure';
import { BrickByBrickProBrochure } from '@/components/brochures/BrickByBrickProBrochure';

const brochures = [
  {
    id: 'property-valuations',
    title: 'Property Valuations',
    description: 'Comprehensive valuation services across all property types',
    component: PropertyValuationsBrochure,
    category: 'Core Services'
  },
  {
    id: 'financial-reporting', 
    title: 'Financial Reporting',
    description: 'Comprehensive financial reporting and accounting services',
    component: FinancialReportingBrochure,
    category: 'Core Services'
  },
  {
    id: 'esg-assessment',
    title: 'ESG Assessment',
    description: 'Environmental, Social & Governance assessment services',
    component: ESGAssessmentBrochure,
    category: 'Sustainability'
  },
  {
    id: 'development-site',
    title: 'Development Site Analysis',
    description: 'Comprehensive development site analysis and feasibility services',
    component: DevelopmentSiteBrochure,
    category: 'Development'
  },
  {
    id: 'plant-equipment',
    title: 'Plant & Equipment',
    description: 'Specialized plant, machinery & equipment valuation services',
    component: PlantEquipmentBrochure,
    category: 'Specialized'
  },
  {
    id: 'rent-reversions',
    title: 'Rent Reversions',
    description: 'Specialized rental valuation and review services',
    component: RentReversionsBrochure,
    category: 'Specialized'
  },
  {
    id: 'esd',
    title: 'ESD Services',
    description: 'Ecologically Sustainable Development services',
    component: ESDBrochure,
    category: 'Sustainability'
  },
  {
    id: 'platform-ecosystem',
    title: 'Platform Ecosystem',
    description: 'Complete property services platform overview',
    component: PlatformEcosystemBrochure,
    category: 'Platform'
  },
  {
    id: 'patents-ip',
    title: 'Patents & IP Portfolio',
    description: 'Intellectual property and patent portfolio overview',
    component: PatentsAndIPBrochure,
    category: 'Innovation'
  },
  {
    id: 'brick-by-brick',
    title: 'Brick by Brick Pro',
    description: 'Advanced property development and construction analysis',
    component: BrickByBrickProBrochure,
    category: 'Development'
  }
];

const BrochureViewer = () => {
  const [selectedBrochure, setSelectedBrochure] = useState<string | null>(null);
  
  const selectedBrochureData = brochures.find(b => b.id === selectedBrochure);
  
  if (selectedBrochure && selectedBrochureData) {
    const BrochureComponent = selectedBrochureData.component;
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4 border-b bg-white shadow-sm">
          <Button 
            onClick={() => setSelectedBrochure(null)}
            variant="outline"
            className="mb-2"
          >
            ← Back to Brochures
          </Button>
          <h1 className="text-2xl font-bold">{selectedBrochureData.title}</h1>
          <p className="text-muted-foreground">{selectedBrochureData.description}</p>
        </div>
        <BrochureComponent />
      </div>
    );
  }

  const categories = Array.from(new Set(brochures.map(b => b.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Professional Marketing Brochures</CardTitle>
            <p className="text-muted-foreground">
              Access all our professional service brochures - click to view, print, or share
            </p>
          </CardHeader>
        </Card>

        {categories.map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-primary">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brochures
                .filter(brochure => brochure.category === category)
                .map(brochure => (
                  <Card key={brochure.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{brochure.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {brochure.description}
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => setSelectedBrochure(brochure.id)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedBrochure(brochure.id);
                                setTimeout(() => window.print(), 500);
                              }}
                              className="flex items-center gap-1"
                            >
                              <Download className="h-4 w-4" />
                              Print
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrochureViewer;