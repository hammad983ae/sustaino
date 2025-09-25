import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface DocumentPrefillUploaderProps {
  jobId: string;
  onPrefillComplete?: (extractedData: any) => void;
}

interface UploadedDocument {
  name: string;
  url: string;
  mimeType: string;
  content?: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  extractedData?: any;
}

export function DocumentPrefillUploader({ jobId, onPrefillComplete }: DocumentPrefillUploaderProps) {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log('Files dropped:', acceptedFiles.length);
    
    const newDocuments: UploadedDocument[] = acceptedFiles.map(file => ({
      name: file.name,
      url: '',
      mimeType: file.type,
      status: 'uploading' as const
    }));

    setDocuments(prev => [...prev, ...newDocuments]);

    // Upload files to Supabase Storage
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const docIndex = documents.length + i;

      try {
        // Upload to Supabase Storage
        const fileName = `${jobId}/${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('evidence-files')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('evidence-files')
          .getPublicUrl(fileName);

        // Extract text content for supported file types
        let content = '';
        if (file.type === 'text/plain' || file.type === 'application/json') {
          content = await file.text();
        } else if (file.type === 'application/pdf') {
          // For PDFs, we'd integrate with a PDF text extraction service
          content = `PDF document: ${file.name}`;
        }

        // Update document with URL and mark as ready for processing
        setDocuments(prev => prev.map((doc, idx) => 
          idx === docIndex 
            ? { ...doc, url: urlData.publicUrl, content, status: 'processing' as const }
            : doc
        ));

      } catch (error) {
        console.error('Upload error:', error);
        setDocuments(prev => prev.map((doc, idx) => 
          idx === docIndex 
            ? { ...doc, status: 'error' as const }
            : doc
        ));
        
        toast({
          title: "Upload Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      }
    }
  }, [jobId, documents.length, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 20 * 1024 * 1024, // 20MB
  });

  const processAllDocuments = async () => {
    const readyDocuments = documents.filter(doc => doc.status === 'processing' && doc.url);
    
    if (readyDocuments.length === 0) {
      toast({
        title: "No Documents Ready",
        description: "Please wait for uploads to complete before processing.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      console.log('Processing documents with AI extraction...');
      
      // Call the document prefill processor
      const { data, error } = await supabase.functions.invoke('document-prefill-processor', {
        body: {
          jobId,
          documents: readyDocuments
        }
      });

      if (error) throw error;

      console.log('Document processing completed:', data);

      // Update document statuses
      setDocuments(prev => prev.map(doc => 
        readyDocuments.some(rd => rd.name === doc.name)
          ? { ...doc, status: 'completed' as const, extractedData: data.extractedData }
          : doc
      ));

      setProcessingProgress(100);

      toast({
        title: "Documents Processed Successfully!",
        description: `Extracted data from ${data.documentsProcessed} documents and prefilled your report.`,
      });

      // Notify parent component
      onPrefillComplete?.(data.extractedData);

    } catch (error) {
      console.error('Document processing error:', error);
      
      toast({
        title: "Processing Error",
        description: "Failed to process documents. Please try again.",
        variant: "destructive",
      });

      // Mark documents as error
      setDocuments(prev => prev.map(doc => 
        readyDocuments.some(rd => rd.name === doc.name)
          ? { ...doc, status: 'error' as const }
          : doc
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = (status: UploadedDocument['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: UploadedDocument['status']) => {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'processing': return 'Ready to process';
      case 'completed': return 'Data extracted';
      case 'error': return 'Error occurred';
      default: return 'Unknown';
    }
  };

  const readyToProcess = documents.some(doc => doc.status === 'processing');
  const hasCompleted = documents.some(doc => doc.status === 'completed');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Document-Based Report Prefill
        </CardTitle>
        <CardDescription>
          Upload your property documents (contracts, titles, planning permits, valuations, leases, etc.) 
          to automatically extract and prefill your report sections.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-2">
            {isDragActive ? 'Drop documents here...' : 'Drag & drop documents here'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supports PDF, Word, text files, and images (max 20MB each)
          </p>
          <Button variant="outline" type="button">
            Browse Files
          </Button>
        </div>

        {/* Document List */}
        {documents.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Uploaded Documents</h4>
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-500">{getStatusText(doc.status)}</p>
                  </div>
                </div>
                {doc.extractedData && (
                  <div className="text-xs text-green-600">
                    Data extracted ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Processing Controls */}
        {readyToProcess && (
          <div className="space-y-4">
            <Button 
              onClick={processAllDocuments}
              disabled={isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing Documents...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Extract Data & Prefill Report
                </>
              )}
            </Button>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing progress</span>
                  <span>{processingProgress}%</span>
                </div>
                <Progress value={processingProgress} />
              </div>
            )}
          </div>
        )}

        {/* Success Message */}
        {hasCompleted && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-800">Report Prefilled Successfully!</h4>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Your report sections have been automatically populated with extracted data. 
              Review the sections and make any necessary adjustments.
            </p>
          </div>
        )}

        {/* Supported Document Types */}
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Supported Documents:</strong></p>
          <p>• Contracts of Sale (property details, pricing, legal information)</p>
          <p>• Title Documents (lot/plan, easements, ownership)</p>
          <p>• Planning Permits (zoning, overlays, restrictions)</p>
          <p>• Valuation Reports (market value, property details)</p>
          <p>• Lease Agreements (rental terms, tenancy details)</p>
          <p>• Building Inspections (property condition, risks)</p>
          <p>• Financial Statements (income, expenses, rates)</p>
        </div>
      </CardContent>
    </Card>
  );
}