import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface BulkImportResult {
  success: boolean;
  totalFiles: number;
  processedFiles: number;
  totalRecords: number;
  errors?: string[];
}

const BulkAltImporter: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState<BulkImportResult | null>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const altFiles = selectedFiles.filter(file => 
      file.name.toLowerCase().endsWith('.dat') || 
      file.name.toLowerCase().includes('alt') ||
      file.type === 'text/plain'
    );
    
    if (altFiles.length !== selectedFiles.length) {
      toast({
        title: "File Filter Applied",
        description: `Selected ${altFiles.length} ALT files out of ${selectedFiles.length} total files`,
      });
    }
    
    setFiles(altFiles);
    setResult(null);
  }, [toast]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const altFiles = droppedFiles.filter(file => 
      file.name.toLowerCase().endsWith('.dat') || 
      file.name.toLowerCase().includes('alt') ||
      file.type === 'text/plain'
    );
    
    if (altFiles.length > 0) {
      setFiles(prev => [...prev, ...altFiles]);
      setResult(null);
      toast({
        title: "Files Added",
        description: `Added ${altFiles.length} ALT files`,
      });
    }
  }, [toast]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleBulkImport = async () => {
    if (files.length === 0) {
      toast({
        title: "No Files",
        description: "Please select ALT files to import",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 2, 90));
      }, 500);

      const { data, error } = await supabase.functions.invoke('bulk-alt-import', {
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) throw error;

      const importResult = data as BulkImportResult;
      setResult(importResult);

      toast({
        title: "Bulk Import Completed",
        description: `Processed ${importResult.processedFiles}/${importResult.totalFiles} files, imported ${importResult.totalRecords} sales records`,
      });

    } catch (error) {
      console.error('Bulk import error:', error);
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk ALT File Import
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop ALT files here or click to select</p>
              <p className="text-sm text-muted-foreground">
                Supports .DAT files, ALT format files, and plain text files
              </p>
              <input
                type="file"
                multiple
                accept=".dat,.txt,text/plain"
                onChange={handleFileSelect}
                className="hidden"
                id="bulk-file-input"
              />
              <label
                htmlFor="bulk-file-input"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90"
              >
                Select Files
              </label>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {files.length} files selected
                </span>
                <Button variant="outline" size="sm" onClick={clearFiles}>
                  Clear All
                </Button>
              </div>
              
              <div className="max-h-40 overflow-y-auto border rounded p-2">
                {files.slice(0, 10).map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs py-1">
                    <FileText className="h-3 w-3" />
                    <span className="truncate">{file.name}</span>
                    <span className="text-muted-foreground">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                ))}
                {files.length > 10 && (
                  <div className="text-xs text-muted-foreground py-1">
                    ... and {files.length - 10} more files
                  </div>
                )}
              </div>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing files...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleBulkImport}
              disabled={files.length === 0 || isUploading}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Processing...' : `Import ${files.length} Files`}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.errors && result.errors.length > 0 ? (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              Import Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{result.totalFiles}</div>
                <div className="text-xs text-muted-foreground">Total Files</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{result.processedFiles}</div>
                <div className="text-xs text-muted-foreground">Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{result.totalRecords}</div>
                <div className="text-xs text-muted-foreground">Sales Records</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {result.errors ? result.errors.length : 0}
                </div>
                <div className="text-xs text-muted-foreground">Errors</div>
              </div>
            </div>

            {result.errors && result.errors.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">File Processing Errors:</h4>
                <div className="max-h-40 overflow-y-auto border rounded p-2 bg-muted/30">
                  {result.errors.map((error, index) => (
                    <div key={index} className="text-xs text-red-600 py-1">
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkAltImporter;