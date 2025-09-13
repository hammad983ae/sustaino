import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useReportData } from "@/contexts/ReportDataContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Upload,
  Image,
  FileText,
  X,
  CheckCircle,
  FolderOpen,
  Download,
  Eye
} from "lucide-react";

export interface ReportFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  bucket: string;
  folder: string;
  category: 'property-photos' | 'property-documents' | 'market-evidence' | 'planning-documents' | 'general-documents';
  uploadedAt: Date;
  description?: string;
  ocrProcessed?: boolean;
  ocrData?: any;
}

const ReportFileManager = () => {
  const [files, setFiles] = useState<ReportFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ReportFile['category']>('property-photos');
  const { reportData, updateReportData } = useReportData();
  const { toast } = useToast();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing files from localStorage and Supabase
  const loadExistingFiles = useCallback(async () => {
    try {
      // Load from localStorage first
      const savedFiles = localStorage.getItem('reportFiles');
      if (savedFiles) {
        setFiles(JSON.parse(savedFiles));
      }
      
      // Then sync with Supabase storage
      const buckets = ['property-images', 'documents', 'reports'];
      const remoteFiles: ReportFile[] = [];
      
      for (const bucket of buckets) {
        const { data: bucketFiles, error } = await supabase.storage
          .from(bucket)
          .list('', { limit: 100 });
        
        if (!error && bucketFiles) {
          bucketFiles.forEach(file => {
            remoteFiles.push({
              id: `${bucket}_${file.name}`,
              name: file.name,
              size: file.metadata?.size || 0,
              type: file.metadata?.mimetype || 'unknown',
              url: `${bucket}/${file.name}`,
              bucket,
              folder: 'root',
              category: bucket === 'property-images' ? 'property-photos' : 'general-documents',
              uploadedAt: new Date(file.created_at)
            });
          });
        }
      }
      
      setFiles(prev => [...prev, ...remoteFiles]);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  }, []);

  // Save files to localStorage and update report data
  const saveFilesToReport = useCallback((updatedFiles: ReportFile[]) => {
    localStorage.setItem('reportFiles', JSON.stringify(updatedFiles));
    
    // Categorize files for report sections
    const propertyPhotos = updatedFiles.filter(f => f.category === 'property-photos');
    const propertyDocuments = updatedFiles.filter(f => f.category === 'property-documents');
    const planningDocuments = updatedFiles.filter(f => f.category === 'planning-documents');
    const marketEvidence = updatedFiles.filter(f => f.category === 'market-evidence');
    
    // Update report data with file references
    updateReportData('fileAttachments', {
      propertyPhotos: propertyPhotos.map(f => ({ id: f.id, name: f.name, url: f.url, description: f.description })),
      propertyDocuments: propertyDocuments.map(f => ({ id: f.id, name: f.name, url: f.url, description: f.description })),
      planningDocuments: planningDocuments.map(f => ({ id: f.id, name: f.name, url: f.url, description: f.description })),
      marketEvidence: marketEvidence.map(f => ({ id: f.id, name: f.name, url: f.url, description: f.description }))
    });
  }, [updateReportData]);

  // Handle file upload
  const handleFileUpload = useCallback(async (uploadedFiles: FileList) => {
    if (!uploadedFiles.length) return;
    
    setIsUploading(true);
    
    try {
      const newFiles: ReportFile[] = [];
      
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        
        // Validate file size (20MB limit)
        if (file.size > 20 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds 20MB limit`,
            variant: "destructive",
          });
          continue;
        }
        
        // Determine storage bucket based on file type and category
        let bucket = 'documents';
        if (file.type.startsWith('image/')) {
          bucket = selectedCategory === 'property-photos' ? 'property-images' : 'documents';
        }
        
        // Upload to Supabase Storage
        const fileName = `${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, file);
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          });
          continue;
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);
        
        const reportFile: ReportFile = {
          id: `${Date.now()}_${i}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url: urlData.publicUrl,
          bucket,
          folder: 'root',
          category: selectedCategory,
          uploadedAt: new Date(),
          description: ''
        };
        
        newFiles.push(reportFile);
      }
      
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      saveFilesToReport(updatedFiles);
      
      toast({
        title: "Upload successful",
        description: `${newFiles.length} file(s) uploaded and categorized as ${selectedCategory.replace('-', ' ')}`,
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
  }, [files, selectedCategory, saveFilesToReport, toast]);

  // Remove file
  const removeFile = useCallback((fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    saveFilesToReport(updatedFiles);
    
    toast({
      title: "File removed",
      description: "File has been removed from the report",
    });
  }, [files, saveFilesToReport, toast]);

  // Update file description
  const updateFileDescription = useCallback((fileId: string, description: string) => {
    const updatedFiles = files.map(f => 
      f.id === fileId ? { ...f, description } : f
    );
    setFiles(updatedFiles);
    saveFilesToReport(updatedFiles);
  }, [files, saveFilesToReport]);

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get category display info
  const getCategoryInfo = (category: ReportFile['category']) => {
    const categoryMap = {
      'property-photos': { label: 'Property Photos', icon: Image, color: 'bg-blue-500' },
      'property-documents': { label: 'Property Documents', icon: FileText, color: 'bg-green-500' },
      'market-evidence': { label: 'Market Evidence', icon: FileText, color: 'bg-purple-500' },
      'planning-documents': { label: 'Planning Documents', icon: FileText, color: 'bg-orange-500' },
      'general-documents': { label: 'General Documents', icon: FileText, color: 'bg-gray-500' }
    };
    return categoryMap[category];
  };

  useEffect(() => {
    loadExistingFiles();
  }, [loadExistingFiles]);

  const filesByCategory = files.reduce((acc, file) => {
    if (!acc[file.category]) acc[file.category] = [];
    acc[file.category].push(file);
    return acc;
  }, {} as Record<ReportFile['category'], ReportFile[]>);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          Report File Manager
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload and organize files for your valuation report. Files are automatically categorized into appropriate report sections.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="category-select" className="text-sm font-medium">
              File Category:
            </Label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ReportFile['category'])}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="property-photos">Property Photos</option>
              <option value="property-documents">Property Documents</option>
              <option value="planning-documents">Planning Documents</option>
              <option value="market-evidence">Market Evidence</option>
              <option value="general-documents">General Documents</option>
            </select>
          </div>
          
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-lg font-medium mb-2">
              Upload Files to {getCategoryInfo(selectedCategory).label}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop files here or click to browse (Max 20MB per file)
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? "Uploading..." : "Choose Files"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            />
          </div>
        </div>

        {/* Files by Category */}
        <Tabs defaultValue="property-photos" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="property-photos" className="text-xs">Photos</TabsTrigger>
            <TabsTrigger value="property-documents" className="text-xs">Property Docs</TabsTrigger>
            <TabsTrigger value="planning-documents" className="text-xs">Planning</TabsTrigger>
            <TabsTrigger value="market-evidence" className="text-xs">Market Evidence</TabsTrigger>
            <TabsTrigger value="general-documents" className="text-xs">General</TabsTrigger>
          </TabsList>

          {Object.entries(filesByCategory).map(([category, categoryFiles]) => {
            const categoryInfo = getCategoryInfo(category as ReportFile['category']);
            return (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <categoryInfo.icon className="h-5 w-5" />
                    <h3 className="text-lg font-medium">{categoryInfo.label}</h3>
                  </div>
                  <Badge variant="secondary">{categoryFiles.length} files</Badge>
                </div>

                <div className="grid gap-4">
                  {categoryFiles.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground">
                      <categoryInfo.icon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No files in this category yet.</p>
                    </div>
                  ) : (
                    categoryFiles.map((file) => (
                      <Card key={file.id} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            {file.type.startsWith('image/') ? (
                              <Image className="h-5 w-5 text-blue-600 mt-1" />
                            ) : (
                              <FileText className="h-5 w-5 text-red-600 mt-1" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-medium">{file.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                              </p>
                              <Input
                                placeholder="Add description..."
                                value={file.description || ''}
                                onChange={(e) => updateFileDescription(file.id, e.target.value)}
                                className="mt-2 text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Summary */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">File Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>Total Files: <Badge variant="secondary">{files.length}</Badge></div>
            <div>Property Photos: <Badge variant="secondary">{filesByCategory['property-photos']?.length || 0}</Badge></div>
            <div>Property Documents: <Badge variant="secondary">{filesByCategory['property-documents']?.length || 0}</Badge></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportFileManager;