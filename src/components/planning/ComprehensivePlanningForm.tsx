import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Save, Download, AlertTriangle } from 'lucide-react';

import {
  LGAField,
  ZoningField,
  CurrentUseField,
  PermissibleUseField,
  PermitNumberField,
  OverlaysField,
  HeightRestrictionField,
  DevelopmentPotentialField,
  OverlayImpactAssessmentField,
  FloorSpaceRatioField,
  MinimumLotSizeField,
  PlanningRestrictionsField
} from './PlanningFieldComponents';

import { PlanningDataDisplay } from './PlanningDataDisplay';

export interface PlanningFormData {
  lga: string;
  zoning: string;
  currentUse: string;
  permissibleUse: string;
  permitNumber: string;
  overlays: string[];
  heightRestriction: string;
  developmentPotential: string;
  overlayImpactAssessment: string;
  floorSpaceRatio: string;
  minimumLotSize: string;
  planningRestrictions: string;
  includeInReport: boolean;
  autoPopulated: boolean;
  lastUpdated: string;
}

interface ComprehensivePlanningFormProps {
  initialData?: Partial<PlanningFormData>;
  onSave?: (data: PlanningFormData) => void;
  onAutoGenerate?: () => Promise<Partial<PlanningFormData>>;
  readOnly?: boolean;
}

export const ComprehensivePlanningForm: React.FC<ComprehensivePlanningFormProps> = ({
  initialData,
  onSave,
  onAutoGenerate,
  readOnly = false
}) => {
  const [formData, setFormData] = useState<PlanningFormData>({
    lga: '',
    zoning: '',
    currentUse: '',
    permissibleUse: '',
    permitNumber: '',
    overlays: [],
    heightRestriction: '',
    developmentPotential: '',
    overlayImpactAssessment: '',
    floorSpaceRatio: '',
    minimumLotSize: '',
    planningRestrictions: '',
    includeInReport: true,
    autoPopulated: false,
    lastUpdated: new Date().toISOString(),
    ...initialData
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('planningFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading planning data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem('planningFormData', JSON.stringify(formData));
    setHasChanges(true);
  }, [formData]);

  const updateField = (field: keyof PlanningFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleAutoGenerate = async () => {
    if (!onAutoGenerate) return;

    setIsGenerating(true);
    try {
      const generatedData = await onAutoGenerate();
      setFormData(prev => ({
        ...prev,
        ...generatedData,
        autoPopulated: true,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error generating planning data:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      lastUpdated: new Date().toISOString()
    };
    setFormData(dataToSave);
    onSave?.(dataToSave);
    setHasChanges(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `planning-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Planning Information
              {formData.autoPopulated && (
                <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                  Auto-generated
                </span>
              )}
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="include-planning">Include in report</Label>
                <Switch
                  id="include-planning"
                  checked={formData.includeInReport}
                  onCheckedChange={(checked) => updateField('includeInReport', checked)}
                  disabled={readOnly}
                />
              </div>
              {!readOnly && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleAutoGenerate}
                    disabled={isGenerating}
                    size="sm"
                  >
                    {isGenerating ? 'Generating...' : 'Auto-Generate'}
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!hasChanges}
                    size="sm"
                    className="gap-1"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExport}
                    size="sm"
                    className="gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Auto-generated Data Display */}
      {formData.autoPopulated && (
        <PlanningDataDisplay
          planningData={{
            zoning: formData.zoning,
            landUse: formData.currentUse,
            heightRestriction: formData.heightRestriction,
            developmentPotential: formData.developmentPotential,
            overlays: formData.overlays,
            dataSource: 'VicPlan Portal',
            lastUpdated: new Date(formData.lastUpdated).toLocaleDateString()
          }}
          includeInReport={formData.includeInReport}
          onToggleInclude={(include) => updateField('includeInReport', include)}
          onRefreshData={handleAutoGenerate}
          isLoading={isGenerating}
        />
      )}

      {/* Form Fields */}
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="zoning">Zoning & Use</TabsTrigger>
          <TabsTrigger value="overlays">Overlays</TabsTrigger>
          <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Planning Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LGAField
                value={formData.lga}
                onChange={(value) => updateField('lga', value)}
                autoPopulated={formData.autoPopulated}
                required
              />
              <PermitNumberField
                value={formData.permitNumber}
                onChange={(value) => updateField('permitNumber', value)}
                autoPopulated={formData.autoPopulated}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zoning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Zoning & Land Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ZoningField
                  value={formData.zoning}
                  onChange={(value) => updateField('zoning', value)}
                  autoPopulated={formData.autoPopulated}
                  required
                />
                <CurrentUseField
                  value={formData.currentUse}
                  onChange={(value) => updateField('currentUse', value)}
                  autoPopulated={formData.autoPopulated}
                  required
                />
              </div>
              <PermissibleUseField
                value={formData.permissibleUse}
                onChange={(value) => updateField('permissibleUse', value)}
                autoPopulated={formData.autoPopulated}
              />
              <DevelopmentPotentialField
                value={formData.developmentPotential}
                onChange={(value) => updateField('developmentPotential', value)}
                autoPopulated={formData.autoPopulated}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overlays" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Planning Overlays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <OverlaysField
                value={formData.overlays}
                onChange={(value) => updateField('overlays', value)}
                autoPopulated={formData.autoPopulated}
              />
              <OverlayImpactAssessmentField
                value={formData.overlayImpactAssessment}
                onChange={(value) => updateField('overlayImpactAssessment', value)}
                autoPopulated={formData.autoPopulated}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restrictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Development Controls & Restrictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <HeightRestrictionField
                  value={formData.heightRestriction}
                  onChange={(value) => updateField('heightRestriction', value)}
                  autoPopulated={formData.autoPopulated}
                />
                <FloorSpaceRatioField
                  value={formData.floorSpaceRatio}
                  onChange={(value) => updateField('floorSpaceRatio', value)}
                  autoPopulated={formData.autoPopulated}
                />
                <MinimumLotSizeField
                  value={formData.minimumLotSize}
                  onChange={(value) => updateField('minimumLotSize', value)}
                  autoPopulated={formData.autoPopulated}
                />
              </div>
              <PlanningRestrictionsField
                value={formData.planningRestrictions}
                onChange={(value) => updateField('planningRestrictions', value)}
                autoPopulated={formData.autoPopulated}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2">
          {hasChanges && <AlertTriangle className="w-4 h-4 text-warning" />}
          <span>Last updated: {new Date(formData.lastUpdated).toLocaleString()}</span>
        </div>
        <span>
          {formData.autoPopulated ? 'Auto-generated data' : 'Manual entry'}
        </span>
      </div>
    </div>
  );
};

export default ComprehensivePlanningForm;