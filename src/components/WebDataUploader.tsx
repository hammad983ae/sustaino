import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Loader2, Link, CheckCircle, AlertCircle, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ExtractedData {
  address?: string;
  price?: number;
  date?: string;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  building_area?: number;
  land_area?: number;
}

interface ScrapingResult {
  success: boolean;
  data?: any;
  extracted_fields?: ExtractedData;
  message?: string;
  error?: string;
}

export const WebDataUploader = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [dataType, setDataType] = useState<'sales' | 'rental'>('sales');
  const [propertyType, setPropertyType] = useState('residential');
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<ScrapingResult | null>(null);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL (including http:// or https://)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setLastResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('web-data-scraper', {
        body: {
          url: url.trim(),
          data_type: dataType,
          property_type: propertyType
        }
      });

      if (error) {
        throw error;
      }

      const result: ScrapingResult = data;
      setLastResult(result);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message || `Successfully extracted ${dataType} data`,
        });
        setUrl(''); // Clear the form on success
      } else {
        toast({
          title: "Extraction Failed",
          description: result.error || "Could not extract property data from this URL",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Error scraping web data:', error);
      toast({
        title: "Error",
        description: "Failed to process the URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderExtractedData = (data: ExtractedData) => {
    const fields = [
      { label: 'Address', value: data.address, icon: '📍' },
      { label: 'Price', value: data.price ? `$${data.price.toLocaleString()}` : undefined, icon: '💰' },
      { label: 'Date', value: data.date, icon: '📅' },
      { label: 'Bedrooms', value: data.bedrooms, icon: '🛏️' },
      { label: 'Bathrooms', value: data.bathrooms, icon: '🚿' },
      { label: 'Car Spaces', value: data.car_spaces, icon: '🚗' },
      { label: 'Building Area', value: data.building_area ? `${data.building_area} m²` : undefined, icon: '🏠' },
      { label: 'Land Area', value: data.land_area ? `${data.land_area} m²` : undefined, icon: '🌍' },
    ];

    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {fields.map(({ label, value, icon }) => 
          value ? (
            <div key={label} className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <span className="text-sm">{icon}</span>
              <div>
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="text-sm font-medium">{value}</div>
              </div>
            </div>
          ) : null
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Web Data Sourcing
        </CardTitle>
        <CardDescription>
          Extract property sales and rental data from real estate websites automatically
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.realestate.com.au/property/..."
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Data Type</Label>
            <RadioGroup
              value={dataType}
              onValueChange={(value: 'sales' | 'rental') => setDataType(value)}
              className="flex gap-6"
              disabled={isLoading}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sales" id="sales" />
                <Label htmlFor="sales">Sales Evidence</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rental" id="rental" />
                <Label htmlFor="rental">Rental Evidence</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property-type">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="agricultural">Agricultural</SelectItem>
                <SelectItem value="specialised">Specialised</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Extracting Data...
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 mr-2" />
                Extract Property Data
              </>
            )}
          </Button>
        </form>

        {lastResult && (
          <Card className={`border-2 ${lastResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                {lastResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <h3 className="font-semibold">
                  {lastResult.success ? 'Data Extracted Successfully' : 'Extraction Failed'}
                </h3>
              </div>
              
              {lastResult.success && lastResult.extracted_fields && (
                <>
                  <p className="text-sm text-muted-foreground mb-3">
                    {lastResult.message}
                  </p>
                  <Badge variant="secondary" className="mb-3">
                    Added to {dataType === 'sales' ? 'Sales' : 'Rental'} Evidence
                  </Badge>
                  {renderExtractedData(lastResult.extracted_fields)}
                </>
              )}
              
              {!lastResult.success && (
                <p className="text-sm text-red-600">
                  {lastResult.error}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Supported sites:</strong> Most real estate websites including Domain, Real Estate, Property.com.au, and international sites</p>
          <p><strong>Extracted data:</strong> Address, price, bedrooms, bathrooms, car spaces, areas, and dates</p>
          <p><strong>Note:</strong> Data accuracy depends on website structure. Review extracted data before use.</p>
        </div>
      </CardContent>
    </Card>
  );
};