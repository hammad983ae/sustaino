import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportSectionProps {
  title: string;
  subtitle?: string;
  sectionIndex: number;
  onNavigateToSection: (sectionIndex: number) => void;
  reportData?: any;
  onDataChange?: (data: any) => void;
}

const ReportSection = memo(({ 
  title, 
  subtitle, 
  sectionIndex, 
  onNavigateToSection, 
  reportData = {}, 
  onDataChange = () => {} 
}: ReportSectionProps) => {
  console.log(`🔄 ReportSection render: ${title} (Section ${sectionIndex + 1})`);
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Section {sectionIndex + 1}: {title}
            </p>
            <p>This section is ready for content. You can now continue working on your report.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

ReportSection.displayName = 'ReportSection';

export default ReportSection;