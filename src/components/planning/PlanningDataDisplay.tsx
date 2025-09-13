import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  FileText, 
  MapPin, 
  Building, 
  Shield,
  Calendar
} from 'lucide-react';

interface PlanningDataDisplayProps {
  planningData?: {
    zoning?: string;
    landUse?: string;
    heightRestriction?: string;
    developmentPotential?: string;
    overlays?: string[];
    dataSource?: string;
    lastUpdated?: string;
  };
  includeInReport?: boolean;
  onToggleInclude?: (include: boolean) => void;
  onRefreshData?: () => void;
  isLoading?: boolean;
}

export const PlanningDataDisplay: React.FC<PlanningDataDisplayProps> = ({
  planningData,
  includeInReport = true,
  onToggleInclude,
  onRefreshData,
  isLoading = false
}) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const hasData = planningData && Object.keys(planningData).length > 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <CardTitle className="text-lg">Planning Data Retrieved</CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="include-planning" className="text-sm">Include in report</Label>
              <Switch
                id="include-planning"
                checked={includeInReport}
                onCheckedChange={onToggleInclude}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefreshData}
              disabled={isLoading}
              className="gap-1"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {hasData ? (
          <>
            {/* Key Planning Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-success/5 rounded-lg border border-success/20">
              
              {/* Zoning */}
              {planningData.zoning && (
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Zoning</Label>
                    <p className="text-sm font-semibold">{planningData.zoning}</p>
                  </div>
                </div>
              )}

              {/* Land Use */}
              {planningData.landUse && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Land Use</Label>
                    <p className="text-sm font-semibold">{planningData.landUse}</p>
                  </div>
                </div>
              )}

              {/* Height Restriction */}
              {planningData.heightRestriction && (
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Height Restriction</Label>
                    <p className="text-sm font-semibold">{planningData.heightRestriction}</p>
                  </div>
                </div>
              )}

              {/* Development Potential */}
              {planningData.developmentPotential && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Development Potential</Label>
                    <p className="text-sm font-semibold">{planningData.developmentPotential}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Overlays Section */}
            {planningData.overlays && planningData.overlays.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Overlays</Label>
                <div className="flex flex-wrap gap-2">
                  {planningData.overlays.map((overlay, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {overlay}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Data Source and Last Updated */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>Data sourced from {planningData.dataSource || 'Bayside Planning Scheme'}</span>
              </div>
              {planningData.lastUpdated && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Last updated: {planningData.lastUpdated}</span>
                </div>
              )}
            </div>

            {/* Toggle Full Details */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullDetails(!showFullDetails)}
              className="w-full"
            >
              {showFullDetails ? 'Hide' : 'Show'} Full Planning Details
            </Button>

            {/* Full Details Section */}
            {showFullDetails && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <h4 className="font-medium">Complete Planning Information</h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  {Object.entries(planningData).map(([key, value]) => {
                    if (key === 'overlays' && Array.isArray(value)) {
                      return (
                        <div key={key} className="grid grid-cols-3 gap-2">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="col-span-2">{value.join(', ')}</span>
                        </div>
                      );
                    }
                    if (typeof value === 'string') {
                      return (
                        <div key={key} className="grid grid-cols-3 gap-2">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="col-span-2">{value}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>No planning data available</p>
            <p className="text-xs">Try refreshing or check your property address</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanningDataDisplay;