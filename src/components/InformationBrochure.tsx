import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Building, BarChart3, Shield, TrendingUp } from 'lucide-react';

const InformationBrochure = () => {
  const handleDownload = () => {
    // Create a comprehensive brochure content
    const brochureContent = `
POWERED - A SUSTAINO PRO PRODUCT
Property Assessment Platform

COMPREHENSIVE ESG-INTEGRATED PROPERTY VALUATION SYSTEM

Overview:
Powered is the world's first comprehensive ESG-integrated property valuation system, providing professional sustainability and risk evaluation for real estate properties.

Key Features:

🌱 ESG SCORING
• Environmental assessment with sustainability metrics
• Social impact evaluation including community factors
• Governance analysis for property management standards
• Industry-standard scoring methodology
• Comprehensive risk-adjusted calculations

📊 RISK ANALYSIS
• Climate risk assessment (flood, fire, storm, drought)
• Property age and condition evaluation
• Market volatility analysis
• Insurance risk factors
• Financial risk modeling

🏢 PROPERTY VALUATION
• Automated valuation models
• Comparative market analysis
• Income approach calculations
• Cost approach methodology
• Hybrid valuation techniques

📈 EXPORT & REPORTING
• Professional PDF reports
• CSV data exports
• Excel template integration
• API connectivity
• Custom report generation

🔒 COMPLIANCE & SECURITY
• RICS valuation standards
• APIV certification compliance
• ISO 27001 security protocols
• GDPR data protection
• Audit trail capabilities

Contact Information:
Email: support@sustainopro.com
Website: www.sustainopro.com
Phone: 1800 SUSTAIN (1800 787 824)

© 2024 Sustaino Pro. All rights reserved.
    `;

    const blob = new Blob([brochureContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Powered-Information-Brochure.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Download className="h-5 w-5" />
          Product Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Download comprehensive information about our ESG-integrated property assessment platform.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-xs">
            <Building className="h-3 w-3 text-success" />
            <span>Property Valuation</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <BarChart3 className="h-3 w-3 text-info" />
            <span>Risk Assessment</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Shield className="h-3 w-3 text-warning" />
            <span>Compliance Standards</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="h-3 w-3 text-primary" />
            <span>ESG Integration</span>
          </div>
        </div>

        <Button 
          onClick={handleDownload}
          className="w-full"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Brochure
        </Button>
      </CardContent>
    </Card>
  );
};

export default InformationBrochure;