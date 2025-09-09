import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MockGoogleMapComponent from "./MockGoogleMapComponent";

interface SimplifiedMultiStepFormProps {
  onSubmit?: (data: any) => void;
}

const SimplifiedMultiStepForm = ({ onSubmit }: SimplifiedMultiStepFormProps = {}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    carSpaces: '',
    landSize: '',
    description: ''
  });

  const steps = [
    {
      title: "Property Address",
      component: <PropertyAddressStep formData={formData} setFormData={setFormData} />
    },
    {
      title: "Property Details", 
      component: <PropertyDetailsStep formData={formData} setFormData={setFormData} />
    },
    {
      title: "Location Map",
      component: <LocationMapStep formData={formData} />
    },
    {
      title: "Additional Info",
      component: <AdditionalInfoStep formData={formData} setFormData={setFormData} />
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - submit form
      onSubmit?.(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Header */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold truncate">
            Step {currentStep + 1}: {steps[currentStep].title}
          </h1>
          <div className="text-sm text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Form Content */}
      <div className="p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {steps[currentStep].component}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                    ? "bg-primary/60"
                    : "bg-muted"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            className="flex items-center gap-2"
          >
            <span className="hidden sm:inline">
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const PropertyAddressStep = ({ formData, setFormData }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>Property Address Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="address">Street Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          placeholder="123 Main Street"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="suburb">Suburb</Label>
          <Input
            id="suburb"
            value={formData.suburb}
            onChange={(e) => setFormData(prev => ({ ...prev, suburb: e.target.value }))}
            placeholder="Suburb"
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NSW">NSW</SelectItem>
              <SelectItem value="VIC">VIC</SelectItem>
              <SelectItem value="QLD">QLD</SelectItem>
              <SelectItem value="WA">WA</SelectItem>
              <SelectItem value="SA">SA</SelectItem>
              <SelectItem value="TAS">TAS</SelectItem>
              <SelectItem value="ACT">ACT</SelectItem>
              <SelectItem value="NT">NT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="postcode">Postcode</Label>
          <Input
            id="postcode"
            value={formData.postcode}
            onChange={(e) => setFormData(prev => ({ ...prev, postcode: e.target.value }))}
            placeholder="2000"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const PropertyDetailsStep = ({ formData, setFormData }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>Property Details</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="propertyType">Property Type</Label>
        <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="land">Vacant Land</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
            placeholder="3"
          />
        </div>
        <div>
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
            placeholder="2"
          />
        </div>
        <div>
          <Label htmlFor="carSpaces">Car Spaces</Label>
          <Input
            id="carSpaces"
            type="number"
            value={formData.carSpaces}
            onChange={(e) => setFormData(prev => ({ ...prev, carSpaces: e.target.value }))}
            placeholder="2"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="landSize">Land Size (sqm)</Label>
        <Input
          id="landSize"
          value={formData.landSize}
          onChange={(e) => setFormData(prev => ({ ...prev, landSize: e.target.value }))}
          placeholder="600"
        />
      </div>
    </CardContent>
  </Card>
);

const LocationMapStep = ({ formData }: any) => {
  const fullAddress = `${formData.address} ${formData.suburb} ${formData.state} ${formData.postcode}`.trim();
  
  return (
    <div className="space-y-4">
      <MockGoogleMapComponent height="500px" />
      {fullAddress && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Property Location</h3>
            <p className="text-sm text-muted-foreground">{fullAddress}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const AdditionalInfoStep = ({ formData, setFormData }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>Additional Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="description">Property Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter any additional details about the property..."
          rows={4}
        />
      </div>
      
      {/* Form Summary */}
      <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
        <h3 className="font-medium mb-3">Form Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div><strong>Address:</strong> {formData.address || 'Not provided'}</div>
          <div><strong>Suburb:</strong> {formData.suburb || 'Not provided'}</div>
          <div><strong>State:</strong> {formData.state || 'Not provided'}</div>
          <div><strong>Postcode:</strong> {formData.postcode || 'Not provided'}</div>
          <div><strong>Property Type:</strong> {formData.propertyType || 'Not provided'}</div>
          <div><strong>Bedrooms:</strong> {formData.bedrooms || 'Not provided'}</div>
          <div><strong>Bathrooms:</strong> {formData.bathrooms || 'Not provided'}</div>
          <div><strong>Car Spaces:</strong> {formData.carSpaces || 'Not provided'}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default SimplifiedMultiStepForm;