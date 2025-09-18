import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link, FileText, Globe, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WebDataUploadInterface = () => {
  const { toast } = useToast();
  const [urls, setUrls] = useState(['']);
  const [bulkUrls, setBulkUrls] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addUrlField = () => {
    setUrls([...urls, '']);
  };

  const removeUrlField = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const processBulkUrls = async () => {
    setIsProcessing(true);
    
    // Split URLs by line and filter empty lines
    const urlList = bulkUrls.split('\n').filter(url => url.trim());
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Bulk Processing Complete",
        description: `Successfully processed ${urlList.length} URLs`,
      });
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process some URLs",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processFiles = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "File Processing Complete",
        description: `Successfully processed ${files.length} files`,
      });
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process some files",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Globe className="w-8 h-8" />
            Web Data & Document Upload Interface
          </CardTitle>
          <p className="text-blue-100">
            Upload URLs for web scraping and PDF documents for comprehensive data extraction
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="urls" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/90 border border-slate-600">
          <TabsTrigger value="urls" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            <Link className="w-4 h-4 mr-2" />
            Individual URLs
          </TabsTrigger>
          <TabsTrigger value="bulk" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            <Globe className="w-4 h-4 mr-2" />
            Bulk URLs
          </TabsTrigger>
          <TabsTrigger value="files" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            <FileText className="w-4 h-4 mr-2" />
            PDF Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="urls" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Individual URL Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {urls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`url-${index}`}>Website URL {index + 1}</Label>
                    <Input
                      id={`url-${index}`}
                      value={url}
                      onChange={(e) => updateUrl(index, e.target.value)}
                      placeholder="https://example.com"
                      type="url"
                    />
                  </div>
                  {urls.length > 1 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeUrlField(index)}
                      className="mt-6"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              
              <div className="flex gap-2">
                <Button onClick={addUrlField} variant="outline">
                  Add Another URL
                </Button>
                <Button 
                  onClick={() => {
                    // Process individual URLs
                    toast({
                      title: "Processing URLs",
                      description: `Processing ${urls.filter(url => url.trim()).length} URLs...`,
                    });
                  }}
                  disabled={isProcessing}
                >
                  Process URLs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Bulk URL Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bulk-urls">Paste URLs (one per line)</Label>
                <Textarea
                  id="bulk-urls"
                  value={bulkUrls}
                  onChange={(e) => setBulkUrls(e.target.value)}
                  placeholder={`https://example1.com
https://example2.com
https://example3.com`}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">URLs to Process:</div>
                  <div className="text-sm text-muted-foreground">
                    {bulkUrls.split('\n').filter(url => url.trim()).length} valid URLs
                  </div>
                </div>
                <Button 
                  onClick={processBulkUrls}
                  disabled={isProcessing || !bulkUrls.trim()}
                >
                  {isProcessing ? 'Processing...' : 'Process All URLs'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                PDF Document Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Upload PDF Documents</Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Supported formats: PDF, DOC, DOCX
                </p>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files:</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Files Ready for Processing:</div>
                  <div className="text-sm text-muted-foreground">
                    {files.length} files ({(files.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB total)
                  </div>
                </div>
                <Button 
                  onClick={processFiles}
                  disabled={isProcessing || files.length === 0}
                >
                  {isProcessing ? 'Processing...' : 'Process Files'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Processing Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Data Extraction</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Text content extraction</li>
                <li>• Table data parsing</li>
                <li>• Image text recognition (OCR)</li>
                <li>• Metadata extraction</li>
              </ul>
            </div>
            
            <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Web Scraping</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Property listing data</li>
                <li>• Market analysis reports</li>
                <li>• News and insights</li>
                <li>• Competitor information</li>
              </ul>
            </div>
            
            <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Integration</h4>
              <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                <li>• Automatic report integration</li>
                <li>• Data validation and cleaning</li>
                <li>• Structured data output</li>
                <li>• API endpoint creation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebDataUploadInterface;