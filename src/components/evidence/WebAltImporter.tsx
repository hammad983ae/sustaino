import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Globe, Link, CheckCircle, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WebImportResult {
  success: boolean;
  totalUrls: number;
  processedFiles: number;
  totalRecords: number;
  errors?: string[];
}

const WebAltImporter: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState('');
  const [customUrls, setCustomUrls] = useState<string[]>(['']);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [result, setResult] = useState<WebImportResult | null>(null);
  const { toast } = useToast();

  const addUrlField = () => {
    setCustomUrls([...customUrls, '']);
  };

  const removeUrlField = (index: number) => {
    if (customUrls.length > 1) {
      setCustomUrls(customUrls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index: number, value: string) => {
    const updated = [...customUrls];
    updated[index] = value;
    setCustomUrls(updated);
  };

  const handleAutoDiscovery = async () => {
    if (!baseUrl.trim()) {
      toast({
        title: "Missing URL",
        description: "Please enter a base URL to discover ALT files",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const progressInterval = setInterval(() => {
        setImportProgress(prev => Math.min(prev + 3, 90));
      }, 1000);

      const { data, error } = await supabase.functions.invoke('web-alt-import', {
        body: { baseUrl: baseUrl.trim() },
      });

      clearInterval(progressInterval);
      setImportProgress(100);

      if (error) throw error;

      const importResult = data as WebImportResult;
      setResult(importResult);

      toast({
        title: "Auto-Discovery Completed",
        description: `Found and processed ${importResult.processedFiles}/${importResult.totalUrls} files, imported ${importResult.totalRecords} sales records`,
      });

    } catch (error) {
      console.error('Auto discovery error:', error);
      toast({
        title: "Discovery Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      setTimeout(() => setImportProgress(0), 2000);
    }
  };

  const handleCustomUrls = async () => {
    const validUrls = customUrls.filter(url => url.trim());
    
    if (validUrls.length === 0) {
      toast({
        title: "No URLs",
        description: "Please enter at least one URL",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const progressInterval = setInterval(() => {
        setImportProgress(prev => Math.min(prev + 5, 90));
      }, 500);

      const { data, error } = await supabase.functions.invoke('web-alt-import', {
        body: { fileUrls: validUrls },
      });

      clearInterval(progressInterval);
      setImportProgress(100);

      if (error) throw error;

      const importResult = data as WebImportResult;
      setResult(importResult);

      toast({
        title: "Import Completed",
        description: `Processed ${importResult.processedFiles}/${importResult.totalUrls} URLs, imported ${importResult.totalRecords} sales records`,
      });

    } catch (error) {
      console.error('Custom URLs import error:', error);
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      setTimeout(() => setImportProgress(0), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Web-Based ALT File Import
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="auto" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="auto">Auto Discovery</TabsTrigger>
              <TabsTrigger value="custom">Custom URLs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="auto" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Base URL</label>
                <Input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://example.com/alt-files/"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the base URL where ALT files are stored. The system will automatically discover and import all ALT files.
                </p>
              </div>
              
              <Button 
                onClick={handleAutoDiscovery}
                disabled={!baseUrl.trim() || isImporting}
                className="w-full"
              >
                <Globe className="h-4 w-4 mr-2" />
                {isImporting ? 'Discovering & Importing...' : 'Auto-Discover & Import Files'}
              </Button>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Direct File URLs</label>
                {customUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => updateUrl(index, e.target.value)}
                      placeholder="https://example.com/file.dat"
                      className="flex-1"
                    />
                    {customUrls.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeUrlField(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addUrlField} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another URL
                </Button>
                <p className="text-xs text-muted-foreground">
                  Enter direct URLs to specific ALT files you want to import.
                </p>
              </div>
              
              <Button 
                onClick={handleCustomUrls}
                disabled={customUrls.filter(url => url.trim()).length === 0 || isImporting}
                className="w-full"
              >
                <Link className="h-4 w-4 mr-2" />
                {isImporting ? 'Importing...' : `Import ${customUrls.filter(url => url.trim()).length} URLs`}
              </Button>
            </TabsContent>
          </Tabs>

          {isImporting && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span>Processing files from web...</span>
                <span>{importProgress}%</span>
              </div>
              <Progress value={importProgress} className="w-full" />
            </div>
          )}
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
              Web Import Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{result.totalUrls}</div>
                <div className="text-xs text-muted-foreground">URLs Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{result.processedFiles}</div>
                <div className="text-xs text-muted-foreground">Files Processed</div>
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
                <h4 className="font-medium mb-2">Import Errors:</h4>
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

export default WebAltImporter;