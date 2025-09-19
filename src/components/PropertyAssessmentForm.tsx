import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Upload, 
  MapPin, 
  Building, 
  Calendar,
  User,
  Save,
  CheckCircle,
  Plus,
  Eye,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DocumentUploadManager from './DocumentUploadManager';

interface JobData {
  jobNumber: string;
  assetType: string;
  valuationPurpose: string;
  instructingParty: string;
  reliantParty: string;
  propertyAddress: string;
  clientName: string;
  clientCompany: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  instructions: string;
  documents: File[];
  completedSections: string[];
  status: 'draft' | 'in-progress' | 'completed';
}

interface PropertyAssessmentFormProps {
  onJobCreate?: (jobData: JobData) => void;
  existingJob?: JobData;
}

export default function PropertyAssessmentForm({ onJobCreate, existingJob }: PropertyAssessmentFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [jobData, setJobData] = useState<JobData>({
    jobNumber: `JOB-${Date.now().toString().slice(-6)}`,
    assetType: '',
    valuationPurpose: '',
    instructingParty: '',
    reliantParty: '',
    propertyAddress: '',
    clientName: '',
    clientCompany: '',
    dueDate: '',
    priority: 'medium',
    instructions: '',
    documents: [],
    completedSections: [],
    status: 'draft',
    ...existingJob
  });

  const assetTypes = [
    'Residential Property',
    'Commercial Property', 
    'Industrial Property',
    'Development Site',
    'Agricultural Property',
    'Specialised Property',
    'Plant & Equipment',
    'Business Valuation'
  ];

  const valuationPurposes = [
    'Mortgage Security',
    'Family Law',
    'Tax Depreciation',
    'Compulsory Acquisition',
    'Insurance',
    'Accounting/Financial Reporting',
    'Feasibility Study',
    'Court Proceedings',
    'Estate Planning',
    'Due Diligence'
  ];

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800', 
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save job data to localStorage for immediate persistence
      const jobKey = `paf_job_${jobData.jobNumber}`;
      const saveData = {
        ...jobData,
        lastSaved: new Date().toISOString()
      };
      
      localStorage.setItem(jobKey, JSON.stringify(saveData));
      
      // Update work hub files list
      const workingHubFiles = JSON.parse(localStorage.getItem('workingHubFiles') || '[]');
      const existingIndex = workingHubFiles.findIndex((file: any) => file.name === jobData.jobNumber);
      
      const fileEntry = {
        name: jobData.jobNumber,
        type: 'Property Assessment Form',
        lastModified: saveData.lastSaved,
        size: JSON.stringify(jobData).length,
        status: jobData.status,
        assetType: jobData.assetType,
        address: jobData.propertyAddress
      };
      
      if (existingIndex >= 0) {
        workingHubFiles[existingIndex] = fileEntry;
      } else {
        workingHubFiles.push(fileEntry);
      }
      
      localStorage.setItem('workingHubFiles', JSON.stringify(workingHubFiles));
      
      onJobCreate?.(jobData);
      
      toast({
        title: "Job Saved Successfully",
        description: `Job ${jobData.jobNumber} has been saved to Work Hub`,
      });
      
    } catch (error) {
      console.error('Failed to save job:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save job data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartReport = () => {
    if (!jobData.assetType || !jobData.valuationPurpose) {
      toast({
        title: "Required Fields Missing",
        description: "Please select Asset Type and Purpose of Valuation before starting the report.",
        variant: "destructive"
      });
      return;
    }

    // Save current job data
    handleSave();

    // Navigate to appropriate report type based on asset type
    const routeMap: { [key: string]: string } = {
      'Residential Property': '/property-valuations',
      'Commercial Property': '/comprehensive-valuation',
      'Industrial Property': '/comprehensive-valuation',
      'Development Site': '/development-site-valuation',
      'Agricultural Property': '/property-valuations',
      'Specialised Property': '/comprehensive-valuation',
      'Plant & Equipment': '/plant-equipment',
      'Business Valuation': '/comprehensive-valuation'
    };

    const route = routeMap[jobData.assetType] || '/comprehensive-valuation';
    
    // Pass job data via URL state
    navigate(route, { 
      state: { 
        jobData: jobData,
        fromPAF: true 
      }
    });
  };

  const handleDocumentUpload = (files: File[]) => {
    setJobData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const isFormValid = jobData.assetType && jobData.valuationPurpose && jobData.instructingParty;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Assessment Form</h1>
          <p className="text-muted-foreground">Create and manage valuation jobs</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={priorityColors[jobData.priority]} variant="outline">
            {jobData.priority.toUpperCase()} PRIORITY
          </Badge>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            variant="outline"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Job
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="job-details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="job-details">Job Details</TabsTrigger>
          <TabsTrigger value="property-info">Property Information</TabsTrigger>
          <TabsTrigger value="documents">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="job-details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Job Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobNumber">Job Number</Label>
                  <Input
                    id="jobNumber"
                    value={jobData.jobNumber}
                    onChange={(e) => setJobData(prev => ({ ...prev, jobNumber: e.target.value }))}
                    className="bg-muted"
                    readOnly
                  />
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={jobData.priority} onValueChange={(value: any) => setJobData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assetType">Asset Type *</Label>
                  <Select value={jobData.assetType} onValueChange={(value) => setJobData(prev => ({ ...prev, assetType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="valuationPurpose">Purpose of Valuation *</Label>
                  <Select value={jobData.valuationPurpose} onValueChange={(value) => setJobData(prev => ({ ...prev, valuationPurpose: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {valuationPurposes.map(purpose => (
                        <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="instructingParty">Instructing Party *</Label>
                  <Input
                    id="instructingParty"
                    value={jobData.instructingParty}
                    onChange={(e) => setJobData(prev => ({ ...prev, instructingParty: e.target.value }))}
                    placeholder="Enter instructing party"
                  />
                </div>

                <div>
                  <Label htmlFor="reliantParty">Reliant Party</Label>
                  <Input
                    id="reliantParty"
                    value={jobData.reliantParty}
                    onChange={(e) => setJobData(prev => ({ ...prev, reliantParty: e.target.value }))}
                    placeholder="Enter reliant party"
                  />
                </div>

                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={jobData.dueDate}
                    onChange={(e) => setJobData(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  value={jobData.instructions}
                  onChange={(e) => setJobData(prev => ({ ...prev, instructions: e.target.value }))}
                  placeholder="Enter any special instructions for this valuation..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="property-info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Input
                    id="propertyAddress"
                    value={jobData.propertyAddress}
                    onChange={(e) => setJobData(prev => ({ ...prev, propertyAddress: e.target.value }))}
                    placeholder="Enter property address"
                  />
                </div>

                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={jobData.clientName}
                    onChange={(e) => setJobData(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <Label htmlFor="clientCompany">Client Company</Label>
                  <Input
                    id="clientCompany"
                    value={jobData.clientCompany}
                    onChange={(e) => setJobData(prev => ({ ...prev, clientCompany: e.target.value }))}
                    placeholder="Enter client company"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Documentation Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Upload supporting documentation</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, JPG, PNG files accepted</p>
              </div>
              
              {jobData.documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Uploaded Documents ({jobData.documents.length})</h4>
                  <div className="space-y-2">
                    {jobData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{doc.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {(doc.size / 1024).toFixed(1)} KB
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/workhub')}>
          Back to Work Hub
        </Button>
        
        <div className="flex gap-3">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            variant="outline"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Job
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleStartReport}
            disabled={!isFormValid || isSaving}
          >
            <Building className="h-4 w-4 mr-2" />
            Start Report
          </Button>
        </div>
      </div>
    </div>
  );
}