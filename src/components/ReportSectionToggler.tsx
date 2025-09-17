import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useReportData } from '@/contexts/ReportDataContext';

/**
 * Report Section Toggler Component
 * Controls optional section inclusion in reports
 */
const ReportSectionToggler: React.FC = () => {
  const { reportData, updateReportData } = useReportData();

  const handleToggle = (section: string, enabled: boolean) => {
    updateReportData('reportConfig', {
      ...reportData.reportConfig,
      [section]: enabled
    });
    
    console.log(`Section ${section} ${enabled ? 'enabled' : 'disabled'}`);
  };

  const sections = [
    {
      id: 'includeTenancySchedule',
      title: 'Section 4: Tenancy Schedule/Lease Details',
      description: 'Include tenancy information and lease details',
      required: false,
      defaultEnabled: true
    },
    {
      id: 'includeStatutoryAssessment',
      title: 'Section 5: Statutory Assessment',
      description: 'Include statutory compliance and assessment details',
      required: false,
      defaultEnabled: false
    }
  ];

  const requiredSections = [
    { title: 'Section 2: RPD and Location', description: 'Property identification and location data' },
    { title: 'Section 3: Legal and Planning', description: 'Planning search and legal information' },
    { title: 'Section 6: Market Commentary', description: 'Market analysis and commentary' },
    { title: 'Section 7: Property Details (Pre-Inspection)', description: 'Property information and photos' },
    { title: 'Section 8: Environmental & Sustainability Assessment', description: 'Environmental data and sustainability' },
    { title: 'Section 10: Risk Assessment (Pre-Physical Inspection)', description: 'Risk assessment and management' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Report Section Configuration</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Configure which sections to include in your valuation report. Required sections are automatically included.
        </p>
      </div>

      {/* Required Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Required Sections
            <Badge variant="secondary">Always Included</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requiredSections.map((section, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <div>
                  <p className="font-medium text-sm">{section.title}</p>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
                <Badge variant="outline">Required</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optional Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Optional Sections
            <Badge variant="outline">Configurable</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.map((section) => {
              const isEnabled = reportData.reportConfig?.[section.id] !== false;
              
              return (
                <div key={section.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex-1">
                    <Label htmlFor={section.id} className="text-sm font-medium cursor-pointer">
                      {section.title}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {section.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={isEnabled ? "default" : "secondary"}>
                      {isEnabled ? "Included" : "Excluded"}
                    </Badge>
                    <Switch
                      id={section.id}
                      checked={isEnabled}
                      onCheckedChange={(checked) => handleToggle(section.id, checked)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Optional sections will be included in the report even when disabled, 
              but all fields will be marked as "Not Supplied" or "Not Applicable" as appropriate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportSectionToggler;