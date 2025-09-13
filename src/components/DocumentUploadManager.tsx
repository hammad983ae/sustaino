import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Upload,
  FileText,
  CheckCircle,
  X,
  Briefcase,
  Clock,
  AlertCircle,
  Eye,
  FileTextIcon,
  Zap
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  category: string;
  uploadedAt: Date;
  ocrProcessed?: boolean;
  ocrData?: {
    text: string;
    confidence: number;
    language?: string;
  };
}

interface JobDetails {
  title: string;
  description: string;
  clientName: string;
  clientEmail: string;
  clientType: 'long-term' | 'one-time';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  jobType: 'valuation' | 'inspection' | 'analysis' | 'report';
  dueDate: string;
  estimatedHours: number;
  propertyAddress: string;
}

const DocumentUploadManager = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [ocrProcessingFiles, setOcrProcessingFiles] = useState<Set<string>>(new Set());
  const [enableOCR, setEnableOCR] = useState(true);
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    title: '',
    description: '',
    clientName: '',
    clientEmail: '',
    clientType: 'long-term',
    priority: 'medium',
    jobType: 'valuation',
    dueDate: '',
    estimatedHours: 2,
    propertyAddress: ''
  });
  const [creatingJob, setCreatingJob] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // OCR Processing Function
  const performOCR = useCallback(async (document: UploadedDocument) => {
    if (!document.type.startsWith('image/') && !document.type.includes('pdf')) {
      toast({
        title: "OCR Not Supported",
        description: "OCR is only available for images and PDF files",
        variant: "destructive",
      });
      return;
    }

    setOcrProcessingFiles(prev => new Set([...prev, document.id]));
    
    try {
      // Create OCR pipeline using Hugging Face Transformers
      const { pipeline } = await import('@huggingface/transformers');
      const ocr = await pipeline('image-to-text', 'Xenova/trocr-base-printed', {
        device: 'webgpu',
        dtype: 'fp32',
      });

      // Process the document
      const result = await ocr(document.url) as any;
      const extractedText = Array.isArray(result) ? result[0]?.generated_text : result.generated_text;
      
      // Update document with OCR data
      setUploadedDocuments(prev => 
        prev.map(doc => 
          doc.id === document.id 
            ? { 
                ...doc, 
                ocrProcessed: true, 
                ocrData: { 
                  text: extractedText || "No text detected", 
                  confidence: 0.85,
                  language: "en"
                } 
              }
            : doc
        )
      );

      toast({
        title: "OCR Processing Complete",
        description: `Text extracted from ${document.name}`,
      });

    } catch (error) {
      console.error('OCR Error:', error);
      toast({
        title: "OCR Processing Failed", 
        description: `Failed to extract text from ${document.name}`,
        variant: "destructive",
      });
    } finally {
      setOcrProcessingFiles(prev => {
        const updated = new Set(prev);
        updated.delete(document.id);
        return updated;
      });
    }
  }, [toast]);

  const handleFileUpload = useCallback(async (files: FileList) => {
    if (!files.length) return;
    
    setIsUploading(true);
    
    try {
      const newDocuments: UploadedDocument[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file size (20MB limit)
        if (file.size > 20 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds 20MB limit`,
            variant: "destructive",
          });
          continue;
        }
        
        // Upload to Supabase Storage (scoped to user folder for RLS)
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: "Login required",
            description: "Please sign in to upload files",
            variant: "destructive",
          });
          break;
        }

        const fileName = `${Date.now()}_${file.name}`;
        const storagePath = `${user.id}/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(storagePath, file);
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          });
          continue;
        }
        
        // Get public URL (signed URL would be better if private; using public URL for simplicity)
        const { data: urlData } = supabase.storage
          .from('documents')
          .getPublicUrl(storagePath);
        
        const document: UploadedDocument = {
          id: `${Date.now()}_${i}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url: urlData.publicUrl,
          category: getFileCategory(file.type),
          uploadedAt: new Date(),
          ocrProcessed: false
        };
        
        newDocuments.push(document);
        
        // Auto-process OCR if enabled and file is suitable
        if (enableOCR && (file.type.startsWith('image/') || file.type.includes('pdf'))) {
          setTimeout(() => performOCR(document), 1000); // Small delay to allow state update
        }
      }
      
      setUploadedDocuments(prev => [...prev, ...newDocuments]);
      
      toast({
        title: "Upload successful",
        description: `${newDocuments.length} file(s) uploaded successfully`,
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast]);

  const getFileCategory = (mimeType: string): string => {
    if (mimeType.includes('pdf')) return 'PDF Document';
    if (mimeType.includes('word') || mimeType.includes('docx')) return 'Word Document';
    if (mimeType.includes('excel') || mimeType.includes('xlsx')) return 'Spreadsheet';
    if (mimeType.includes('image')) return 'Image';
    return 'Other Document';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeDocument = (documentId: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: "Document removed",
      description: "Document has been removed from the list",
    });
  };

  const createWorkHubJob = async () => {
    setCreatingJob(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to create a job",
          variant: "destructive"
        });
        return;
      }

      // Generate job number
      const jobNumber = `JOB-${Date.now().toString().slice(-6)}`;
      
      // First create/find a property record
      let propertyId: string;
      
      // Try to find existing property by address
      const { data: existingProperty } = await supabase
        .from('properties')
        .select('id')
        .eq('address_line_1', jobDetails.propertyAddress)
        .eq('user_id', user.id)
        .single();

      if (existingProperty) {
        propertyId = existingProperty.id;
      } else {
        // Create new property record
        const addressParts = jobDetails.propertyAddress.split(',').map(part => part.trim());
        const { data: newProperty, error: propertyError } = await supabase
          .from('properties')
          .insert({
            user_id: user.id,
            address_line_1: addressParts[0] || jobDetails.propertyAddress,
            suburb: addressParts[1] || 'Unknown',
            state: addressParts[2] || 'Unknown',
            postcode: addressParts[3] || '0000',
            property_type: jobDetails.jobType === 'valuation' ? 'residential' : 'commercial',
            country: 'Australia'
          })
          .select('id')
          .single();

        if (propertyError) throw propertyError;
        propertyId = newProperty.id;
      }
      
      // Create job in valuation_jobs table
      const { data: jobData, error: jobError } = await supabase
        .from('valuation_jobs')
        .insert({
          user_id: user.id,
          property_id: propertyId,
          job_number: jobNumber,
          job_title: jobDetails.title,
          job_description: jobDetails.description,
          client_name: jobDetails.clientName,
          client_email: jobDetails.clientEmail,
          client_type: jobDetails.clientType,
          property_address: jobDetails.propertyAddress,
          priority: jobDetails.priority,
          job_type: jobDetails.jobType,
          due_date: jobDetails.dueDate,
          estimated_hours: jobDetails.estimatedHours,
          status: 'pending',
          instruction_date: new Date().toISOString().split('T')[0],
          notes: `Created with ${uploadedDocuments.length} attached documents`
        })
        .select()
        .single();

      if (jobError) throw jobError;

      // Create a report entry linked to the job
      const { data: reportData, error: reportError } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          property_id: propertyId,
          title: `${jobDetails.title} - Report`,
          report_type: jobDetails.jobType,
          status: 'in_progress',
          current_section: 'document_upload',
          progress: 10,
          sections_data: {
            documents: uploadedDocuments.map(doc => ({
              name: doc.name,
              url: doc.url,
              category: doc.category,
              uploadedAt: doc.uploadedAt.toISOString()
            }))
          }
        })
        .select()
        .single();

      if (reportError) throw reportError;

      toast({
        title: "Job created successfully",
        description: `Job ${jobNumber} has been created and added to Work Hub`,
      });

      // Reset form
      setShowJobForm(false);
      setJobDetails({
        title: '',
        description: '',
        clientName: '',
        clientEmail: '',
        clientType: 'long-term',
        priority: 'medium',
        jobType: 'valuation',
        dueDate: '',
        estimatedHours: 2,
        propertyAddress: ''
      });
      setUploadedDocuments([]);

    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Job creation failed",
        description: "There was an error creating the job",
        variant: "destructive",
      });
    } finally {
      setCreatingJob(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-6">
      {/* Document Upload Section */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Document Upload Manager
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload property documents including PDFs, Word docs, Excel files, and images. 
            Create jobs in Work Hub with automated cloud storage integration.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OCR Settings */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">OCR Text Extraction</p>
                <p className="text-sm text-muted-foreground">Automatically extract text from images and PDFs</p>
              </div>
            </div>
            <Switch
              checked={enableOCR}
              onCheckedChange={setEnableOCR}
            />
          </div>

          {/* Upload Zone */}
          <div 
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-lg font-medium mb-2">
              {uploadedDocuments.length === 0 
                ? "Drag & Drop files here, or click to browse" 
                : `${uploadedDocuments.length} File(s) Uploaded`
              }
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Supports files such as PDFs, images, spreadsheets. Max single file size 20MB
              {enableOCR && <span className="block text-primary">✨ OCR enabled for images and PDFs</span>}
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Files"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
              className="hidden"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            />
          </div>

          {/* Uploaded Documents List */}
          {uploadedDocuments.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Uploaded Documents</h3>
                <span className="text-sm text-muted-foreground">
                  {uploadedDocuments.length} files ready
                </span>
              </div>
              
              <div className="space-y-2">
                {uploadedDocuments.map((doc) => (
                  <Card key={doc.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.category} • {formatFileSize(doc.size)} • {doc.uploadedAt.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.ocrProcessed && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                            <FileTextIcon className="h-3 w-3" />
                            OCR Complete
                          </div>
                        )}
                        {ocrProcessingFiles.has(doc.id) && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                            <Clock className="h-3 w-3 animate-spin" />
                            Processing...
                          </div>
                        )}
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {!doc.ocrProcessed && !ocrProcessingFiles.has(doc.id) && (doc.type.startsWith('image/') || doc.type.includes('pdf')) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => performOCR(doc)}
                            className="text-xs"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Extract Text
                          </Button>
                        )}
                        {doc.ocrProcessed && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "OCR Text",
                                description: doc.ocrData?.text || "No text extracted",
                              });
                            }}
                            className="text-xs"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Text
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeDocument(doc.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Create Job Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button
                  onClick={() => setShowJobForm(true)}
                  className="flex items-center gap-2"
                  disabled={uploadedDocuments.length === 0}
                >
                  <Briefcase className="h-4 w-4" />
                  Create Job in Work Hub
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Creation Form */}
      {showJobForm && (
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Create Work Hub Job
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Create a new job with the uploaded documents attached
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title *</Label>
                <Input
                  id="job-title"
                  placeholder="e.g., Property Valuation - 123 Main St"
                  value={jobDetails.title}
                  onChange={(e) => setJobDetails(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property-address">Property Address *</Label>
                <Input
                  id="property-address"
                  placeholder="123 Main Street, Suburb, State"
                  value={jobDetails.propertyAddress}
                  onChange={(e) => setJobDetails(prev => ({ ...prev, propertyAddress: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Describe the scope of work..."
                value={jobDetails.description}
                onChange={(e) => setJobDetails(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Client Name</Label>
                <Input
                  id="client-name"
                  placeholder="John Smith"
                  value={jobDetails.clientName}
                  onChange={(e) => setJobDetails(prev => ({ ...prev, clientName: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client-email">Client Email</Label>
                <Input
                  id="client-email"
                  type="email"
                  placeholder="john@example.com"
                  value={jobDetails.clientEmail}
                  onChange={(e) => setJobDetails(prev => ({ ...prev, clientEmail: e.target.value }))}
                />
              </div>
            </div>

            {/* Client Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Client Type</Label>
              <RadioGroup
                value={jobDetails.clientType}
                onValueChange={(value: 'long-term' | 'one-time') => 
                  setJobDetails(prev => ({ ...prev, clientType: value }))
                }
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long-term" id="long-term" />
                  <Label htmlFor="long-term" className="flex items-center gap-2 cursor-pointer">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    Long-term Client
                    <span className="text-xs text-muted-foreground">(Ongoing relationship)</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-time" id="one-time" />
                  <Label htmlFor="one-time" className="flex items-center gap-2 cursor-pointer">
                    <Clock className="h-4 w-4 text-green-600" />
                    One-time Client
                    <span className="text-xs text-muted-foreground">(Single project)</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job-type">Job Type</Label>
                <Select
                  value={jobDetails.jobType}
                  onValueChange={(value) => setJobDetails(prev => ({ ...prev, jobType: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="valuation">Valuation</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="analysis">Analysis</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={jobDetails.priority}
                  onValueChange={(value) => setJobDetails(prev => ({ ...prev, priority: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimated-hours">Estimated Hours</Label>
                <Input
                  id="estimated-hours"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={jobDetails.estimatedHours}
                  onChange={(e) => setJobDetails(prev => ({ ...prev, estimatedHours: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                value={jobDetails.dueDate}
                onChange={(e) => setJobDetails(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>

            {/* Job Summary */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Job Summary
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Documents:</span> {uploadedDocuments.length} files
                </div>
                <div>
                  <span className="text-muted-foreground">Priority:</span> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${getPriorityColor(jobDetails.priority)}`}>
                    {jobDetails.priority.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span> {jobDetails.jobType}
                </div>
                <div>
                  <span className="text-muted-foreground">Client Type:</span> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    jobDetails.clientType === 'long-term' 
                      ? 'text-blue-700 bg-blue-100' 
                      : 'text-green-700 bg-green-100'
                  }`}>
                    {jobDetails.clientType === 'long-term' ? 'Long-term' : 'One-time'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Est. Hours:</span> {jobDetails.estimatedHours}h
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowJobForm(false)}
                disabled={creatingJob}
              >
                Cancel
              </Button>
              
              <Button
                onClick={createWorkHubJob}
                disabled={!jobDetails.title || !jobDetails.propertyAddress || creatingJob}
                className="flex items-center gap-2"
              >
                {creatingJob ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    Creating Job...
                  </>
                ) : (
                  <>
                    <Briefcase className="h-4 w-4" />
                    Create Job
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUploadManager;