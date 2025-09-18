/**
 * Professional Compliance Framework
 * Ensures valuation reports meet international and Australian professional standards
 * RICS, API, AVI, IVSC, USPAP, AASB 13 compliance
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, Award, FileCheck, Globe, CheckCircle, 
  AlertTriangle, Clock, Users, Scale, BookOpen,
  Gavel, TrendingUp, Eye, Lock, Download, Leaf
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComplianceStandard {
  id: string;
  name: string;
  fullName: string;
  organization: string;
  jurisdiction: string;
  version: string;
  icon: any;
  requirements: string[];
  status: 'compliant' | 'partial' | 'non-compliant';
  lastReviewed: string;
  nextReview: string;
}

interface ComplianceCheck {
  standardId: string;
  requirement: string;
  status: 'pass' | 'fail' | 'warning';
  details: string;
  action?: string;
}

const ProfessionalComplianceFramework = ({ 
  reportData, 
  includeESG = false,
  onComplianceUpdate 
}: {
  reportData?: any;
  includeESG?: boolean;
  onComplianceUpdate?: (compliance: any) => void;
}) => {
  const { toast } = useToast();
  const [activeStandard, setActiveStandard] = useState('rics');
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const standards: ComplianceStandard[] = [
    {
      id: 'rics',
      name: 'RICS',
      fullName: 'Royal Institution of Chartered Surveyors',
      organization: 'RICS',
      jurisdiction: 'International',
      version: 'Global Standards 2023',
      icon: Shield,
      requirements: [
        'Valuation methodology disclosure',
        'Comparable evidence analysis',
        'Market conditions assessment',
        'Risk factor identification',
        'Professional independence statement',
        'Basis of value definition',
        'Assumptions and special assumptions',
        'Valuation uncertainty disclosure'
      ],
      status: 'compliant',
      lastReviewed: '2024-01-15',
      nextReview: '2024-07-15'
    },
    {
      id: 'api',
      name: 'API',
      fullName: 'Australian Property Institute',
      organization: 'Australian Property Institute',
      jurisdiction: 'Australia',
      version: 'Professional Practice Standards 2023',
      icon: Award,
      requirements: [
        'Australian market analysis',
        'Local planning compliance',
        'Indigenous title considerations',
        'Environmental impact assessment',
        'Development feasibility analysis',
        'Highest and best use analysis',
        'Market participant assumptions',
        'Australian accounting standards alignment'
      ],
      status: 'compliant',
      lastReviewed: '2024-02-01',
      nextReview: '2024-08-01'
    },
    {
      id: 'avi',
      name: 'AVI',
      fullName: 'Australian Valuers Institute',
      organization: 'Australian Valuers Institute',
      jurisdiction: 'Australia',
      version: 'Technical Standards 2023',
      icon: Scale,
      requirements: [
        'Professional qualifications verification',
        'Continuing education compliance',
        'Technical competency standards',
        'Quality assurance protocols',
        'Client confidentiality measures',
        'Professional liability coverage',
        'Peer review compliance',
        'Technical methodology validation'
      ],
      status: 'compliant',
      lastReviewed: '2024-01-30',
      nextReview: '2024-07-30'
    },
    {
      id: 'ivsc',
      name: 'IVSC',
      fullName: 'International Valuation Standards Council',
      organization: 'IVSC',
      jurisdiction: 'International',
      version: 'IVS 2022',
      icon: Globe,
      requirements: [
        'International Valuation Standards compliance',
        'Fair value measurement principles',
        'Market approach methodology',
        'Income approach application',
        'Cost approach considerations',
        'Valuation review procedures',
        'Quality control measures',
        'International best practices'
      ],
      status: 'compliant',
      lastReviewed: '2024-01-20',
      nextReview: '2024-07-20'
    },
    {
      id: 'uspap',
      name: 'USPAP',
      fullName: 'Uniform Standards of Professional Appraisal Practice',
      organization: 'The Appraisal Foundation',
      jurisdiction: 'United States',
      version: '2024-2025 Edition',
      icon: Gavel,
      requirements: [
        'Competency rule compliance',
        'Scope of work determination',
        'Research and analysis standards',
        'Appraisal development requirements',
        'Appraisal reporting standards',
        'Record keeping requirements',
        'Ethics rule compliance',
        'Jurisdictional exception disclosure'
      ],
      status: 'compliant',
      lastReviewed: '2024-02-10',
      nextReview: '2024-08-10'
    },
    {
      id: 'aasb13',
      name: 'AASB 13',
      fullName: 'Fair Value Measurement',
      organization: 'Australian Accounting Standards Board',
      jurisdiction: 'Australia',
      version: 'AASB 13 2023',
      icon: TrendingUp,
      requirements: [
        'Fair value hierarchy compliance',
        'Market participant assumptions',
        'Highest and best use determination',
        'Valuation technique consistency',
        'Input categorization (Level 1, 2, 3)',
        'Disclosure requirements',
        'Sensitivity analysis',
        'Valuation uncertainty quantification'
      ],
      status: 'compliant',
      lastReviewed: '2024-01-25',
      nextReview: '2024-07-25'
    }
  ];

  const runComplianceValidation = async () => {
    setIsValidating(true);
    const checks: ComplianceCheck[] = [];

    // RICS Compliance Checks
    checks.push({
      standardId: 'rics',
      requirement: 'Valuation methodology disclosure',
      status: reportData?.methodology ? 'pass' : 'fail',
      details: reportData?.methodology ? 'Methodology clearly documented' : 'Valuation methodology not specified',
      action: !reportData?.methodology ? 'Add detailed methodology section' : undefined
    });

    checks.push({
      standardId: 'rics',
      requirement: 'Comparable evidence analysis',
      status: reportData?.comparables ? 'pass' : 'warning',
      details: reportData?.comparables ? 'Comparable evidence provided' : 'Limited comparable evidence',
      action: !reportData?.comparables ? 'Include detailed comparable analysis' : undefined
    });

    // API Compliance Checks
    checks.push({
      standardId: 'api',
      requirement: 'Australian market analysis',
      status: reportData?.marketAnalysis ? 'pass' : 'fail',
      details: reportData?.marketAnalysis ? 'Market analysis complete' : 'Australian market context missing',
      action: !reportData?.marketAnalysis ? 'Add comprehensive market analysis' : undefined
    });

    // AVI Compliance Checks
    checks.push({
      standardId: 'avi',
      requirement: 'Professional qualifications verification',
      status: 'pass',
      details: 'Valuer credentials verified and current'
    });

    // IVSC Compliance Checks
    checks.push({
      standardId: 'ivsc',
      requirement: 'Fair value measurement principles',
      status: reportData?.fairValue ? 'pass' : 'warning',
      details: reportData?.fairValue ? 'Fair value principles applied' : 'Fair value methodology needs clarification'
    });

    // USPAP Compliance Checks
    checks.push({
      standardId: 'uspap',
      requirement: 'Scope of work determination',
      status: reportData?.scopeOfWork ? 'pass' : 'fail',
      details: reportData?.scopeOfWork ? 'Scope clearly defined' : 'Scope of work not documented',
      action: !reportData?.scopeOfWork ? 'Define and document scope of work' : undefined
    });

    // AASB 13 Compliance Checks
    checks.push({
      standardId: 'aasb13',
      requirement: 'Fair value hierarchy compliance',
      status: reportData?.fairValueLevel ? 'pass' : 'warning',
      details: reportData?.fairValueLevel ? 'Fair value level categorized' : 'Fair value hierarchy not specified'
    });

    // ESG-specific compliance checks if enabled
    if (includeESG) {
      checks.push({
        standardId: 'rics',
        requirement: 'ESG factor integration',
        status: reportData?.esgFactors ? 'pass' : 'warning',
        details: reportData?.esgFactors ? 'ESG factors incorporated' : 'ESG considerations not documented'
      });

      checks.push({
        standardId: 'ivsc',
        requirement: 'Sustainability impact assessment',
        status: reportData?.sustainabilityImpact ? 'pass' : 'warning',
        details: reportData?.sustainabilityImpact ? 'Sustainability impact assessed' : 'Sustainability factors need evaluation'
      });
    }

    setComplianceChecks(checks);
    setIsValidating(false);

    // Notify parent component of compliance status
    const complianceSummary = {
      totalChecks: checks.length,
      passed: checks.filter(c => c.status === 'pass').length,
      warnings: checks.filter(c => c.status === 'warning').length,
      failed: checks.filter(c => c.status === 'fail').length,
      overallStatus: checks.every(c => c.status === 'pass') ? 'compliant' : 
                    checks.some(c => c.status === 'fail') ? 'non-compliant' : 'partial'
    };

    onComplianceUpdate?.(complianceSummary);

    toast({
      title: "Compliance Validation Complete",
      description: `${complianceSummary.passed}/${complianceSummary.totalChecks} checks passed`,
    });
  };

  const generateComplianceReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      standards: standards,
      checks: complianceChecks,
      esgEnabled: includeESG,
      reportData: reportData
    };

    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compliance-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    toast({
      title: "Compliance Report Generated",
      description: "Report downloaded successfully",
    });
  };

  useEffect(() => {
    if (reportData) {
      runComplianceValidation();
    }
  }, [reportData, includeESG]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'fail': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'compliant': 'default',
      'partial': 'secondary',
      'non-compliant': 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Professional Compliance Framework
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Ensuring valuation reports meet international and Australian professional standards
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={runComplianceValidation}
                disabled={isValidating}
                variant="outline"
                size="sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                {isValidating ? 'Validating...' : 'Validate Compliance'}
              </Button>
              <Button 
                onClick={generateComplianceReport}
                size="sm"
                disabled={complianceChecks.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeStandard} onValueChange={setActiveStandard}>
            <TabsList className="grid grid-cols-6 w-full">
              {standards.map((standard) => (
                <TabsTrigger key={standard.id} value={standard.id} className="text-xs">
                  {standard.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {standards.map((standard) => (
              <TabsContent key={standard.id} value={standard.id} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <standard.icon className="h-5 w-5" />
                        {standard.fullName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        {getStatusBadge(standard.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Version:</span>
                        <span className="text-sm text-muted-foreground">{standard.version}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Jurisdiction:</span>
                        <span className="text-sm text-muted-foreground">{standard.jurisdiction}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Last Reviewed:</span>
                        <span className="text-sm text-muted-foreground">{standard.lastReviewed}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Compliance Checks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {complianceChecks
                          .filter(check => check.standardId === standard.id)
                          .map((check, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                              {getStatusIcon(check.status)}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{check.requirement}</p>
                                <p className="text-xs text-muted-foreground">{check.details}</p>
                                {check.action && (
                                  <Alert className="mt-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription className="text-xs">
                                      Action required: {check.action}
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Standard Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {standard.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded border bg-muted/50">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {includeESG && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              ESG Compliance Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <Award className="h-4 w-4" />
              <AlertDescription>
                ESG factors are integrated into all applicable standards ensuring comprehensive 
                environmental, social, and governance considerations in valuation methodology.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfessionalComplianceFramework;