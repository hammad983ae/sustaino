import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { usePropertyTypeLock } from "@/components/PropertyTypeLockProvider";

interface PropertyTypeSpecificPromptProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const PropertyTypeSpecificPrompt: React.FC<PropertyTypeSpecificPromptProps> = ({
  value = '',
  onChange,
  disabled = false
}) => {
  const { selectedPropertyType, getPropertyTypePrompt, isPropertyTypeLocked } = usePropertyTypeLock();

  if (!isPropertyTypeLocked || !selectedPropertyType) {
    return null;
  }

  const prompt = getPropertyTypePrompt();

  return (
    <Card className="w-full bg-blue-50/50 border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-600" />
          <CardTitle className="text-base text-blue-800">
            {selectedPropertyType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Property Description
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label className="text-sm font-medium text-blue-700">
            Property Type Specific Requirements
          </Label>
          <p className="text-xs text-blue-600 mt-1">{prompt}</p>
        </div>
        <div>
          <Label htmlFor="property-description" className="text-sm font-medium">
            Property Description
          </Label>
          <Textarea
            id="property-description"
            placeholder={prompt}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className="mt-1 min-h-[120px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};