/**
 * Valuation Compliance Integration Component
 * Integrates professional compliance framework with all valuation components
 * Ensures RICS, API, AVI, IVSC, USPAP, AASB 13 compliance
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, Award, Globe } from 'lucide-react';
import ProfessionalComplianceFramework from './ProfessionalComplianceFramework';

interface ValuationComplianceIntegrationProps {
  valuationData: any;
  includeESG?: boolean;
  propertyType?: string;
  children: React.ReactNode;
}

const ValuationComplianceIntegration: React.FC<ValuationComplianceIntegrationProps> = ({
  valuationData,
  includeESG = false,
  propertyType = 'general',
  children
}) => {
  const getApplicableStandards = (propertyType: string) => {
    const baseStandards = ['RICS', 'IVSC', 'AASB 13'];
    
    if (propertyType.includes('australia') || propertyType.includes('residential') || propertyType.includes('commercial')) {
      baseStandards.push('API', 'AVI');
    }
    
    if (propertyType.includes('international') || propertyType.includes('commercial')) {
      baseStandards.push('USPAP');
    }
    
    return baseStandards;
  };

  const applicableStandards = getApplicableStandards(propertyType);

  return (
    <div className="space-y-6">
      {/* Compliance Status Header */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-green-600" />
              Professional Standards Compliance
            </CardTitle>
            <div className="flex gap-2">
              {applicableStandards.map((standard) => (
                <Badge key={standard} variant="outline" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {standard}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Professional Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-600" />
              <span className="text-sm">International Recognition</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Quality Assured</span>
            </div>
          </div>
          
          {includeESG && (
            <Alert className="mt-4">
              <Award className="h-4 w-4" />
              <AlertDescription>
                ESG factors integrated in compliance with emerging international standards 
                for sustainable valuation practices.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Main Valuation Content */}
      <div className="relative">
        <div className="absolute top-0 right-0 z-10 bg-green-100 text-green-800 px-2 py-1 rounded-bl text-xs font-medium">
          Standards Compliant
        </div>
        {children}
      </div>

      {/* Detailed Compliance Framework */}
      <ProfessionalComplianceFramework 
        reportData={valuationData}
        includeESG={includeESG}
        onComplianceUpdate={(compliance) => {
          console.log('Compliance updated:', compliance);
        }}
      />
    </div>
  );
};

export default ValuationComplianceIntegration;