import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Building2, FileText, AlertTriangle, MapPin } from 'lucide-react';

interface PlanningDataSummaryProps {
  planningData: any;
}

export const PlanningDataSummary = ({ planningData }: PlanningDataSummaryProps) => {
  return (
    <>
      {/* Quick Planning Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Zone</span>
          </div>
          <p className="text-sm text-muted-foreground">{planningData.zoneName}</p>
        </div>
        <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4 text-success" />
            <span className="text-sm font-medium">Development</span>
          </div>
          <p className="text-sm text-muted-foreground">{planningData.developmentPotential}</p>
        </div>
        <div className="p-3 bg-amber/5 border border-amber/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium">Overlays</span>
          </div>
          <p className="text-sm text-muted-foreground">{planningData.overlays?.length || 0} Active</p>
        </div>
        <div className="p-3 bg-blue/5 border border-blue/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Scheme</span>
          </div>
          <p className="text-sm text-muted-foreground">{planningData.planningScheme}</p>
        </div>
      </div>

      {/* Planning Data Retrieved Section */}
      <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
        <h4 className="font-medium mb-3 text-success-foreground">Planning Data Retrieved & Saved</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-sm mb-2">Core Planning</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {planningData.coreDetails?.commercial || planningData.zoneName}</li>
              <li>• {planningData.coreDetails?.landUse || planningData.landUse}</li>
              <li>• {planningData.coreDetails?.development || planningData.developmentPotential}</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-sm mb-2">Risk Assessment</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Heritage: {planningData.riskAssessment?.heritage || 'No constraints'}</li>
              <li>• Flooding: {planningData.riskAssessment?.flooding || 'Low risk'}</li>
              <li>• Bushfire: {planningData.riskAssessment?.bushfire || 'Low risk'}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanningDataSummary;