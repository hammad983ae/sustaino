import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Image, FileText, Sparkles, ArrowLeft, X, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  ocrProcessed?: boolean;
  ocrData?: any;
}

const DocumentPhotoUpload = () => {
  const [ocrProcessing, setOcrProcessing] = useState("all");
  const [customPages, setCustomPages] = useState("10");
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedFile[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedFile[]>([]);
  const [propertyDocuments, setPropertyDocuments] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [ocrProcessingFiles, setOcrProcessingFiles] = useState<Set<string>>(new Set());
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const propertyDocInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (files: FileList, type: 'photos' | 'documents' | 'property') => {
    setIsUploading(true);
    
    try {
      const newFiles: UploadedFile[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds 10MB limit`,
            variant: "destructive",
          });
          continue;
        }
        
        // Create file URL for preview
        const url = URL.createObjectURL(file);
        const uploadedFile: UploadedFile = {
          id: `${Date.now()}-${i}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url,
        };
        
        newFiles.push(uploadedFile);
      }
      
      // Update state based on type
      if (type === 'photos') {
        setUploadedPhotos(prev => [...prev, ...newFiles]);
      } else if (type === 'documents') {
        setUploadedDocuments(prev => [...prev, ...newFiles]);
      } else {
        setPropertyDocuments(prev => [...prev, ...newFiles]);
      }
      
      toast({
        title: "Upload successful",
        description: `${newFiles.length} file(s) uploaded successfully`,
      });
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent, type: 'photos' | 'documents' | 'property') => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files, type);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeFile = useCallback((id: string, type: 'photos' | 'documents' | 'property') => {
    if (type === 'photos') {
      setUploadedPhotos(prev => prev.filter(file => file.id !== id));
    } else if (type === 'documents') {
      setUploadedDocuments(prev => prev.filter(file => file.id !== id));
    } else {
      setPropertyDocuments(prev => prev.filter(file => file.id !== id));
    }
  }, []);

  const performOCR = useCallback(async (file: UploadedFile) => {
    setOcrProcessingFiles(prev => new Set([...prev, file.id]));
    
    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update file with OCR data
      const updateFile = (prevFiles: UploadedFile[]) => 
        prevFiles.map(f => 
          f.id === file.id 
            ? { ...f, ocrProcessed: true, ocrData: { text: "Sample OCR extracted text...", confidence: 0.95 } }
            : f
        );
      
      setUploadedDocuments(updateFile);
      setPropertyDocuments(updateFile);
      
      toast({
        title: "OCR Complete",
        description: `Text extracted from ${file.name}`,
      });
      
    } catch (error) {
      toast({
        title: "OCR Failed",
        description: `Failed to process ${file.name}`,
        variant: "destructive",
      });
    } finally {
      setOcrProcessingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(file.id);
        return newSet;
      });
    }
  }, [toast]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FileList = ({ files, type }: { files: UploadedFile[], type: 'photos' | 'documents' | 'property' }) => (
    <div className="space-y-2 mt-4">
      {files.map((file) => (
        <div key={file.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-3">
            {file.type.startsWith('image/') ? (
              <Image className="h-4 w-4 text-blue-600" />
            ) : (
              <FileText className="h-4 w-4 text-red-600" />
            )}
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              {file.ocrProcessed && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  OCR Complete
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {file.type.includes('pdf') || file.type.includes('image') ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => performOCR(file)}
                disabled={ocrProcessingFiles.has(file.id) || file.ocrProcessed}
              >
                {ocrProcessingFiles.has(file.id) ? "Processing..." : file.ocrProcessed ? "OCR Done" : "Extract Text"}
              </Button>
            ) : null}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeFile(file.id, type)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Document and Photo Uploader and OCR Upload</CardTitle>
        <p className="text-sm text-muted-foreground">Name Page: Additional Information and Report Generator:</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Photos & Documents Tabs */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Property Photos & Documents</h3>
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="photos" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="photos" className="space-y-4">
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"
                onDrop={(e) => handleDrop(e, 'photos')}
                onDragOver={handleDragOver}
              >
                <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-medium mb-2">
                  {uploadedPhotos.length === 0 ? "No Property Images" : `${uploadedPhotos.length} Image(s) Uploaded`}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop images here or click to upload
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Auto Fetch Images
                  </Button>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4" />
                    {isUploading ? "Uploading..." : "Upload Images"}
                  </Button>
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'photos')}
                />
              </div>
              <FileList files={uploadedPhotos} type="photos" />
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"
                onDrop={(e) => handleDrop(e, 'documents')}
                onDragOver={handleDragOver}
              >
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-medium mb-2">
                  {uploadedDocuments.length === 0 ? "No Documents" : `${uploadedDocuments.length} Document(s) Uploaded`}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop documents here or click to browse
                </p>
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => documentInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? "Uploading..." : "Upload Documents"}
                </Button>
                <input
                  ref={documentInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'documents')}
                />
              </div>
              <FileList files={uploadedDocuments} type="documents" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Document OCR Upload */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h3 className="text-lg font-medium">Document OCR Upload</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Upload property documents (like auction reports) for automatic data extraction.
          </p>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-3">OCR Processing Preferences:</h4>
            <RadioGroup value={ocrProcessing} onValueChange={setOcrProcessing}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="text-sm">
                  Process ALL pages (recommended for comprehensive reports)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="first2" id="first2" />
                <Label htmlFor="first2" className="text-sm">
                  Process First 2 pages (quick balance of speed and accuracy)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="first1" id="first1" />
                <Label htmlFor="first1" className="text-sm">
                  Process First 1 page (fastest option)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="text-sm">Custom Preview Set</Label>
                <Input 
                  type="number" 
                  value={customPages}
                  onChange={(e) => setCustomPages(e.target.value)}
                  className="w-16 h-8 ml-2"
                  disabled={ocrProcessing !== "custom"}
                />
                <span className="text-sm text-muted-foreground">pages</span>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Upload Property Documents */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Upload Property Documents</h3>
          <div 
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"
            onDrop={(e) => handleDrop(e, 'property')}
            onDragOver={handleDragOver}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-lg font-medium mb-2">
              {propertyDocuments.length === 0 ? "Drag & Drop files here, or click to browse" : `${propertyDocuments.length} File(s) Uploaded`}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Supports files such as PDFs, images, spreadsheets. Max single file size 10mb
            </p>
            <Button 
              className="flex items-center gap-2"
              onClick={() => propertyDocInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Files"}
            </Button>
            <input
              ref={propertyDocInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
              className="hidden"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'property')}
            />
          </div>
          <FileList files={propertyDocuments} type="property" />
        </div>

        {/* Navigation */}
        <div className="flex justify-center pt-6 border-t">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPhotoUpload;