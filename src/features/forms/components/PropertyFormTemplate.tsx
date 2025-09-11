import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, MapPin, Calendar, DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormTextField, FormSelectField, FormTextareaField } from "./FormFields";

interface PropertyFormProps {
  propertyType: 'residential' | 'commercial' | 'agricultural' | 'specialised';
  onDataChange?: (data: any) => void;
  initialData?: any;
}

const PropertyFormTemplate: React.FC<PropertyFormProps> = ({
  propertyType,
  onDataChange,
  initialData
}) => {
  const { control, watch } = useForm({
    defaultValues: initialData || {}
  });

  const watchedData = watch();

  React.useEffect(() => {
    onDataChange?.(watchedData);
  }, [watchedData, onDataChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{propertyType} Property Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormTextField
            name="address"
            label="Property Address"
            control={control}
            placeholder="Enter property address"
            required
          />
          
          <FormTextField
            name="market_value"
            label="Market Value"
            type="number"
            control={control}
            placeholder="0"
          />
        </div>

        <FormTextareaField
          name="description"
          label="Property Description"
          control={control}
          placeholder="Describe the property..."
          rows={3}
        />
      </CardContent>
    </Card>
  );
};

export default PropertyFormTemplate;