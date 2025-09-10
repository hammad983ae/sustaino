import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  FileText, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Bot,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PDFUpload {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  analysis_status: string;
  analysis_result?: any;
  consent_given: boolean;
  implemented: boolean;
  created_at: string;
}

export const PDFUploadAnalysis = () => {
  const [uploads, setUploads] = useState<PDFUpload[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<PDFUpload | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [consentNotes, setConsentNotes] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Check authentication status
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          loadUploads();
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        loadUploads();
      } else {
        setUploads([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load user's PDF uploads
  const loadUploads = async () => {
    try {
      const { data, error } = await supabase
        .from('pdf_uploads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUploads(data || []);
    } catch (error) {
      console.error('Error loading uploads:', error);
      toast({
        title: "Error",
        description: "Failed to load PDF uploads",
        variant: "destructive"
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF files only",
        variant: "destructive"
      });
      return;
    }

    for (const file of pdfFiles) {
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload PDF files",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      // Use the already authenticated user
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('pdf-analysis')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save to database
      const { error: dbError } = await supabase
        .from('pdf_uploads')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          analysis_status: 'pending'
        });

      if (dbError) throw dbError;

      toast({
        title: "Upload successful",
        description: `${file.name} uploaded successfully`
      });

      loadUploads();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload PDF",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const analyzeDocument = async (upload: PDFUpload) => {
    try {
      // Update status to processing
      await supabase
        .from('pdf_uploads')
        .update({ analysis_status: 'processing' })
        .eq('id', upload.id);

      const { data, error } = await supabase.functions.invoke('pdf-analysis-assistant', {
        body: { 
          uploadId: upload.id,
          filePath: upload.file_path 
        }
      });

      if (error) throw error;

      // Update with analysis result
      await supabase
        .from('pdf_uploads')
        .update({ 
          analysis_status: 'completed',
          analysis_result: data
        })
        .eq('id', upload.id);

      toast({
        title: "Analysis complete",
        description: "PDF analysis has been completed"
      });

      loadUploads();
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Update status to error
      await supabase
        .from('pdf_uploads')
        .update({ analysis_status: 'error' })
        .eq('id', upload.id);

      toast({
        title: "Analysis failed",
        description: "Failed to analyze PDF",
        variant: "destructive"
      });

      loadUploads();
    }
  };

  const viewAnalysis = (upload: PDFUpload) => {
    setSelectedFile(upload);
    setShowAnalysis(true);
  };

  const requestConsent = (upload: PDFUpload) => {
    setSelectedFile(upload);
    setShowConsent(true);
  };

  const giveConsent = async () => {
    if (!selectedFile) return;

    try {
      await supabase
        .from('pdf_uploads')
        .update({ consent_given: true })
        .eq('id', selectedFile.id);

      toast({
        title: "Consent given",
        description: "Analysis has been approved for implementation"
      });

      setShowConsent(false);
      setConsentNotes('');
      loadUploads();
    } catch (error) {
      console.error('Consent error:', error);
      toast({
        title: "Error",
        description: "Failed to record consent",
        variant: "destructive"
      });
    }
  };

  const implementAnalysis = async (upload: PDFUpload) => {
    try {
      await supabase
        .from('pdf_uploads')
        .update({ implemented: true })
        .eq('id', upload.id);

      toast({
        title: "Implementation complete",
        description: "Analysis recommendations have been implemented"
      });

      loadUploads();
    } catch (error) {
      console.error('Implementation error:', error);
      toast({
        title: "Error",
        description: "Failed to mark as implemented",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-warning" />;
      case 'processing': return <Bot className="h-4 w-4 text-info animate-pulse" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const getVariant = (status: string) => {
      switch (status) {
        case 'pending': return 'secondary';
        case 'processing': return 'default';
        case 'completed': return 'default';
        case 'error': return 'destructive';
        default: return 'secondary';
      }
    };
    
  // Show loading state
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  // Show authentication required message
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            PDF Upload & Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please sign in to access PDF upload and analysis features.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="bg-primary hover:bg-primary/90"
          >
            Sign In to Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
      <Badge variant={getVariant(status) as any}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            PDF Upload & Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Upload PDF Documents</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop PDF files here, or click to browse
            </p>
            <Button disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Select Files'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
          
          {isUploading && (
            <div className="mt-4">
              <Progress value={50} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {uploads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {uploads.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-medium">{upload.file_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(upload.file_size)} • {new Date(upload.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(upload.analysis_status)}
                    
                    {upload.analysis_status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => analyzeDocument(upload)}
                        className="flex items-center gap-1"
                      >
                        <Bot className="h-4 w-4" />
                        Analyze
                      </Button>
                    )}
                    
                    {upload.analysis_status === 'completed' && !upload.consent_given && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => viewAnalysis(upload)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => requestConsent(upload)}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Consent
                        </Button>
                      </>
                    )}
                    
                    {upload.consent_given && !upload.implemented && (
                      <Button
                        size="sm"
                        onClick={() => implementAnalysis(upload)}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        Implement
                      </Button>
                    )}
                    
                    {upload.implemented && (
                      <Badge variant="default" className="bg-success text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Implemented
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Modal */}
      {showAnalysis && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-auto">
            <CardHeader>
              <CardTitle>Analysis Results: {selectedFile.file_name}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAnalysis(false)}
                className="w-fit"
              >
                Close
              </Button>
            </CardHeader>
            <CardContent>
              {selectedFile.analysis_result ? (
                <div className="space-y-4">
                  <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                    {JSON.stringify(selectedFile.analysis_result, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-muted-foreground">No analysis results available</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Consent Modal */}
      {showConsent && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Consent Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You are about to approve the implementation of AI analysis recommendations for "{selectedFile.file_name}". 
                  Please review the analysis carefully before proceeding.
                </AlertDescription>
              </Alert>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  value={consentNotes}
                  onChange={(e) => setConsentNotes(e.target.value)}
                  placeholder="Any additional comments or requirements..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowConsent(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={giveConsent}
                  className="flex-1"
                >
                  Give Consent
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};