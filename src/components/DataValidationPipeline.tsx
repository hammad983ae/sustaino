import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useReportData } from '@/contexts/ReportDataContext';
import { validateAndFilterReportData } from '@/lib/reportDataValidation';
import FieldStatusManager from '@/components/FieldStatusManager';
import { CheckCircle, AlertTriangle, XCircle, FileText } from 'lucide-react';

/**
 * Data Validation Pipeline Component
 * Shows validation results and field completion status
 */
const DataValidationPipeline: React.FC = () => {
  const { reportData } = useReportData();
  const [validationResults, setValidationResults] = useState<any>(null);
  const [sectionStatus, setSectionStatus] = useState<any>({});

  useEffect(() => {
    console.log('Running data validation pipeline');
    
    // Validate the current report data
    const results = validateAndFilterReportData(reportData);
    setValidationResults(results);
    
    // Calculate section status
    const status = calculateSectionStatus();
    setSectionStatus(status);
    
  }, [reportData]);

  const calculateSectionStatus = () => {
    const sections = {
      'Section 2: RPD and Location': {
        data: reportData.locationData,
        requiredFields: ['propertyAddress', 'lotNumber', 'planNumber'],
        status: 'supplied'
      },
      'Section 3: Legal and Planning': {
        data: reportData.legalAndPlanning,
        requiredFields: ['lga', 'zoning', 'currentUse'],
        status: 'supplied'
      },
      'Section 4: Tenancy Schedule': {
        data: reportData.tenancyDetails,
        requiredFields: ['leaseDetails'],
        status: reportData.tenancyDetails?.included === false ? 'not_applicable' : 'supplied'
      },
      'Section 5: Statutory Assessment': {
        data: reportData.statutoryAssessment,
        requiredFields: ['compliance'],
        status: reportData.statutoryAssessment?.included === false ? 'not_supplied' : 'investigation_required'
      },
      'Section 6: Market Commentary': {
        data: reportData.marketCommentary,
        requiredFields: ['analysis'],
        status: 'investigation_required'
      },
      'Section 7: Property Details': {
        data: reportData.propertyDetails,
        requiredFields: ['description'],
        status: 'investigation_required'
      },
      'Section 8: Environmental': {
        data: reportData.environmentalAssessment,
        requiredFields: ['epaData'],
        status: 'investigation_required'
      },
      'Section 10: Risk Assessment': {
        data: reportData.riskAssessment,
        requiredFields: ['heritage'],
        status: 'investigation_required'
      }
    };

    // Calculate completion for each section
    Object.keys(sections).forEach(sectionName => {
      const section = sections[sectionName];
      if (section.data) {
        const completedFields = section.requiredFields.filter(field => 
          section.data[field] && 
          !section.data[field].includes('Required') &&
          !section.data[field].includes('Not Supplied')
        );
        section.completion = (completedFields.length / section.requiredFields.length) * 100;
        
        // Override status based on actual data
        if (section.data.status) {
          section.status = section.data.status;
        }
      } else {
        section.completion = 0;
      }
    });

    return sections;
  };

  const getOverallProgress = () => {
    const totalSections = Object.keys(sectionStatus).length;
    const completedSections = Object.values(sectionStatus).filter((section: any) => 
      section.completion > 50 || section.status === 'not_applicable'
    ).length;
    
    return (completedSections / totalSections) * 100;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'supplied': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'investigation_required': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'not_supplied': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'not_applicable': return <FileText className="h-4 w-4 text-gray-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'supplied': return 'default';
      case 'investigation_required': return 'secondary';
      case 'not_supplied': return 'destructive';
      case 'not_applicable': return 'outline';
      default: return 'outline';
    }
  };

  if (!validationResults) {
    return <div>Loading validation results...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Data Readiness Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <Badge variant={getOverallProgress() > 70 ? "default" : "secondary"}>
                {Math.round(getOverallProgress())}% Ready
              </Badge>
            </div>
            <Progress value={getOverallProgress()} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {Object.entries(sectionStatus).map(([sectionName, section]: [string, any]) => (
          <Card key={sectionName}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  {getStatusIcon(section.status)}
                  {sectionName}
                </CardTitle>
                <Badge variant={getStatusBadgeVariant(section.status)}>
                  {section.status === 'supplied' && 'Supplied'}
                  {section.status === 'investigation_required' && 'Investigation Required'}
                  {section.status === 'not_supplied' && 'Not Supplied'}
                  {section.status === 'not_applicable' && 'Not Applicable'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span>Data Completeness</span>
                  <span>{Math.round(section.completion || 0)}%</span>
                </div>
                <Progress value={section.completion || 0} className="h-2" />
                
                {section.data && section.requiredFields && (
                  <div className="space-y-2">
                    {section.requiredFields.slice(0, 2).map((field: string) => (
                      <FieldStatusManager
                        key={field}
                        status={section.status}
                        field={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={section.data[field] || 'No data'}
                        className="text-xs"
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {validationResults.warnings && validationResults.warnings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-amber-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Validation Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {validationResults.warnings.map((warning: string, index: number) => (
                <p key={index} className="text-xs text-muted-foreground">{warning}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataValidationPipeline;