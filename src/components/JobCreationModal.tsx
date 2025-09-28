import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import PropertyAddressSuggestion from './PropertyAddressSuggestion';
import { apiClient } from '@/lib/api';
import { MapPin, Building, User, Calendar, DollarSign, FileText, CheckCircle } from 'lucide-react';

interface PropertySuggestion {
  id: string;
  address: string;
  addressComponents: {
    unitNumber: string;
    streetNumber: string;
    streetName: string;
    streetType: string;
    streetTypeLong: string;
    suburb: string;
    postcode: string;
    state: string;
  };
  relativeScore: number;
  normalized: {
    unitNumber: string;
    streetNumber: string;
    streetName: string;
    streetType: string;
    streetTypeLong: string;
    suburb: string;
    postcode: string;
    state: string;
    fullAddress: string;
  };
}

interface JobCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (jobId: string) => void;
}

const JobCreationModal: React.FC<JobCreationModalProps> = ({
  isOpen,
  onClose,
  onJobCreated
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertySuggestion | null>(null);
  const { toast } = useToast();

  // Form data
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    jobType: '',
    purpose: '',
    
    // Property Address
    propertyAddress: '',
    
    // Client Information
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    
    // Job Details
    dueDate: '',
    priority: 'medium',
    estimatedValue: '',
    specialInstructions: ''
  });

  const jobTypes = [
    'Property Valuation',
    'Portfolio Assessment',
    'Agricultural Valuation',
    'Commercial Assessment',
    'Industrial Valuation',
    'Development Feasibility',
    'Insurance Valuation',
    'Mortgage Security Assessment',
    'Rental Assessment',
    'Market Analysis',
    'ESG Assessment'
  ];

  const purposes = [
    'purchase',
    'sale',
    'refinance',
    'insurance',
    'taxation',
    'development',
    'investment',
    'legal',
    'other'
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePropertySelect = (property: PropertySuggestion) => {
    setSelectedProperty(property);
    setFormData(prev => ({
      ...prev,
      propertyAddress: property.address
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Basic Info
        return !!(formData.title && formData.jobType && formData.purpose);
      case 2: // Property Address
        return !!(selectedProperty && formData.propertyAddress);
      case 3: // Client Information
        return !!(formData.clientName && formData.clientEmail);
      case 4: // Job Details
        return !!(formData.dueDate && formData.priority);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // First, save the property data
      const propertyData = await apiClient.saveProperty({
        domainId: selectedProperty?.id,
        address: selectedProperty?.address,
        addressComponents: selectedProperty?.addressComponents
      });

      // Then create the job
      const jobData = await apiClient.createJob({
        title: formData.title,
        description: formData.description,
        jobType: formData.jobType,
        purpose: formData.purpose,
        propertyId: propertyData.data.property._id,
        client: {
          name: formData.clientName,
          email: formData.clientEmail,
          phone: formData.clientPhone,
          company: formData.clientCompany
        },
        dueDate: formData.dueDate,
        priority: formData.priority,
        estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : 0,
        notes: formData.specialInstructions
      });

      toast({
        title: "Success",
        description: "Job created successfully!",
      });

      onJobCreated(jobData.data.job._id);
      onClose();
      
      // Reset form
      setCurrentStep(1);
      setFormData({
        title: '',
        description: '',
        jobType: '',
        purpose: '',
        propertyAddress: '',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientCompany: '',
        dueDate: '',
        priority: 'medium',
        estimatedValue: '',
        specialInstructions: ''
      });
      setSelectedProperty(null);

    } catch (error) {
      console.error('Job creation error:', error);
      toast({
        title: "Error",
        description: "Failed to create job. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
  return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Residential Property Valuation"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the valuation job..."
                rows={3}
                    />
                  </div>

            <div>
              <Label htmlFor="jobType">Job Type *</Label>
              <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                      <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                      </SelectContent>
                    </Select>
                  </div>

                          <div>
              <Label htmlFor="purpose">Purpose *</Label>
              <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                      <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                  {purposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose.charAt(0).toUpperCase() + purpose.slice(1)}
                    </SelectItem>
                  ))}
                      </SelectContent>
                    </Select>
                  </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="propertyAddress">Property Address *</Label>
              <PropertyAddressSuggestion
                value={formData.propertyAddress}
                onChange={(value) => handleInputChange('propertyAddress', value)}
                onSelect={handlePropertySelect}
                placeholder="Start typing the property address..."
              />
            </div>

            {selectedProperty && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Selected Property
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="font-medium">{selectedProperty.address}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedProperty.addressComponents.suburb}, {selectedProperty.addressComponents.state} {selectedProperty.addressComponents.postcode}
                    </div>
                    {selectedProperty.relativeScore > 80 && (
                      <Badge variant="secondary" className="text-xs">
                        High Match Score: {selectedProperty.relativeScore}%
                      </Badge>
                    )}
                </div>
              </CardContent>
            </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input
                      id="clientName"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="Full name of the client"
                    />
                  </div>

            <div>
              <Label htmlFor="clientEmail">Client Email *</Label>
                    <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                placeholder="client@example.com"
              />
                </div>

            <div>
              <Label htmlFor="clientPhone">Client Phone</Label>
                    <Input
                id="clientPhone"
                value={formData.clientPhone}
                onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                placeholder="+61 400 000 000"
                    />
                  </div>

            <div>
              <Label htmlFor="clientCompany">Client Company</Label>
                    <Input
                id="clientCompany"
                value={formData.clientCompany}
                onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                placeholder="Company name (if applicable)"
                    />
                  </div>
                </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                  />
                </div>

            <div>
              <Label htmlFor="priority">Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                    </SelectContent>
                  </Select>
                </div>

            <div>
              <Label htmlFor="estimatedValue">Estimated Value (AUD)</Label>
                    <Input
                id="estimatedValue"
                      type="number"
                value={formData.estimatedValue}
                onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                placeholder="0"
                min="0"
                step="1000"
                    />
                  </div>

            <div>
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Any special requirements or instructions..."
                rows={3}
                    />
                  </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Property Address';
      case 3: return 'Client Information';
      case 4: return 'Job Details';
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Provide basic information about the valuation job';
      case 2: return 'Search and select the property address';
      case 3: return 'Enter client contact information';
      case 4: return 'Set job timeline and requirements';
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create New Valuation Job
          </DialogTitle>
          <DialogDescription>
            Step {currentStep} of 4: {getStepDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Separator />

          {/* Step content */}
          <div className="min-h-[400px]">
            <h3 className="text-lg font-semibold mb-4">{getStepTitle()}</h3>
            {renderStepContent()}
          </div>

          {/* Navigation buttons */}
        <div className="flex justify-between pt-4">
              <Button
                variant="outline"
              onClick={currentStep === 1 ? onClose : handlePrevious}
              disabled={isLoading}
            >
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext} disabled={isLoading}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Job'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobCreationModal;