import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RefreshCw, Check, AlertCircle } from 'lucide-react';

interface PlanningFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  autoPopulated?: boolean;
  required?: boolean;
  placeholder?: string;
}

export const LGAField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = true,
  placeholder = "Enter Local Government Area"
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="lga" className="flex items-center gap-2">
        Local Government Area (LGA)
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Input
        id="lga"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={autoPopulated ? "bg-muted/50" : ""}
      />
    </div>
  );
};

export const ZoningField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = true 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const zoningOptions = [
    "Commercial 1 Zone (C1Z)",
    "Commercial 2 Zone (C2Z)", 
    "Commercial 3 Zone (C3Z)",
    "Industrial 1 Zone (IN1Z)",
    "Industrial 2 Zone (IN2Z)",
    "Industrial 3 Zone (IN3Z)",
    "Residential 1 Zone (R1Z)",
    "Residential 2 Zone (R2Z)",
    "Residential 3 Zone (R3Z)",
    "Mixed Use Zone (MUZ)",
    "Activity Centre Zone (ACZ)",
    "Special Use Zone (SUZ)",
    "Public Use Zone (PUZ)",
    "Road Zone (RDZ)",
    "Public Park and Recreation Zone (PPRZ)",
    "Farming Zone (FZ)",
    "Rural Conservation Zone (RCZ)",
    "Green Wedge Zone (GWZ)"
  ];

  const handleValueChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="zoning" className="flex items-center gap-2">
        Zoning
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Select value={localValue} onValueChange={handleValueChange}>
        <SelectTrigger className={autoPopulated ? "bg-muted/50" : ""}>
          <SelectValue placeholder="Select zoning classification" />
        </SelectTrigger>
        <SelectContent>
          {zoningOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const CurrentUseField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = true 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const currentUseOptions = [
    "Commercial uses",
    "Retail premises", 
    "Office premises",
    "Industrial uses",
    "Warehouse",
    "Manufacturing",
    "Residential uses",
    "Dwelling",
    "Apartment development",
    "Mixed use development",
    "Vacant land",
    "Car park",
    "Service station",
    "Accommodation",
    "Food and drink premises",
    "Entertainment facility",
    "Education centre",
    "Community facility",
    "Medical centre",
    "Place of worship"
  ];

  const handleValueChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="currentUse" className="flex items-center gap-2">
        Current Use
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Select value={localValue} onValueChange={handleValueChange}>
        <SelectTrigger className={autoPopulated ? "bg-muted/50" : ""}>
          <SelectValue placeholder="Select current land use" />
        </SelectTrigger>
        <SelectContent>
          {currentUseOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const PermissibleUseField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = false 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="permissibleUse" className="flex items-center gap-2">
        Permissible Use
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Textarea
        id="permissibleUse"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter permissible uses under current zoning..."
        className={autoPopulated ? "bg-muted/50" : ""}
        rows={3}
      />
    </div>
  );
};

export const PermitNumberField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = false 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="permitNumber" className="flex items-center gap-2">
        Planning Permit Number
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Input
        id="permitNumber"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="e.g., PA2023/001234"
        className={autoPopulated ? "bg-muted/50" : ""}
      />
    </div>
  );
};

export const OverlaysField: React.FC<{ 
  value?: string[], 
  onChange?: (value: string[]) => void,
  autoPopulated?: boolean 
}> = ({ 
  value = [], 
  onChange, 
  autoPopulated = false 
}) => {
  const [selectedOverlays, setSelectedOverlays] = useState<string[]>(value);

  const overlayOptions = [
    "Development Contributions Plan Overlay",
    "Special Building Overlay", 
    "Heritage Overlay",
    "Environmental Significance Overlay",
    "Vegetation Protection Overlay",
    "Significant Landscape Overlay",
    "Salinity Management Overlay",
    "Erosion Management Overlay",
    "Inundation Overlay", 
    "Land Subject to Inundation Overlay",
    "Special Water Supply Catchment Overlay",
    "Airport Environs Overlay",
    "Development Plan Overlay",
    "Comprehensive Development Zone",
    "Design and Development Overlay",
    "Environmental Audit Overlay",
    "Restructure Overlay",
    "Public Acquisition Overlay"
  ];

  const toggleOverlay = (overlay: string) => {
    const newOverlays = selectedOverlays.includes(overlay)
      ? selectedOverlays.filter(o => o !== overlay)
      : [...selectedOverlays, overlay];
    
    setSelectedOverlays(newOverlays);
    onChange?.(newOverlays);
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        Planning Overlays
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <div className="space-y-2">
        {selectedOverlays.map((overlay) => (
          <Badge key={overlay} variant="outline" className="mr-2 mb-1">
            {overlay}
          </Badge>
        ))}
      </div>
      <Select onValueChange={toggleOverlay}>
        <SelectTrigger className={autoPopulated ? "bg-muted/50" : ""}>
          <SelectValue placeholder="Add planning overlay" />
        </SelectTrigger>
        <SelectContent>
          {overlayOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const HeightRestrictionField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = false 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="heightRestriction" className="flex items-center gap-2">
        Height Restriction
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Input
        id="heightRestriction"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="e.g., 15m maximum"
        className={autoPopulated ? "bg-muted/50" : ""}
      />
    </div>
  );
};

export const DevelopmentPotentialField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = false 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const potentialOptions = [
    "High - Significant development opportunities",
    "Medium - Subject to overlays",
    "Low - Limited by planning constraints",
    "Restricted - Heritage or environmental constraints",
    "As of right - Existing use rights",
    "Permit required - Subject to planning approval"
  ];

  const handleValueChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="developmentPotential" className="flex items-center gap-2">
        Development Potential
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Select value={localValue} onValueChange={handleValueChange}>
        <SelectTrigger className={autoPopulated ? "bg-muted/50" : ""}>
          <SelectValue placeholder="Select development potential" />
        </SelectTrigger>
        <SelectContent>
          {potentialOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const OverlayImpactAssessmentField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = false 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="overlayImpact" className="flex items-center gap-2">
        Overlay Impact Assessment
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Textarea
        id="overlayImpact"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Assess the impact of planning overlays on development potential..."
        className={autoPopulated ? "bg-muted/50" : ""}
        rows={4}
      />
    </div>
  );
};

export const FloorSpaceRatioField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = false 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="floorSpaceRatio" className="flex items-center gap-2">
        Floor Space Ratio (FSR)
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Input
        id="floorSpaceRatio"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="e.g., 2:1 or Not specified"
        className={autoPopulated ? "bg-muted/50" : ""}
      />
    </div>
  );
};

export const MinimumLotSizeField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = false 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="minimumLotSize" className="flex items-center gap-2">
        Minimum Lot Size
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Input
        id="minimumLotSize"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="e.g., 300m² or Not specified"
        className={autoPopulated ? "bg-muted/50" : ""}
      />
    </div>
  );
};

export const PlanningRestrictionsField: React.FC<PlanningFieldProps> = ({ 
  value = '', 
  onChange, 
  autoPopulated = false,
  required = false 
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="planningRestrictions" className="flex items-center gap-2">
        Planning Restrictions & Overlays
        {required && <span className="text-destructive">*</span>}
        {autoPopulated && <Badge variant="secondary" className="text-xs">Auto-filled</Badge>}
      </Label>
      <Textarea
        id="planningRestrictions"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Detail any planning restrictions, conditions, or overlay requirements..."
        className={autoPopulated ? "bg-muted/50" : ""}
        rows={4}
      />
    </div>
  );
};