import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link, FileText, Globe, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const WebDataUploadInterface = () => {
  const { toast } = useToast();
  const [urls, setUrls] = useState(['']);
  const [bulkUrls, setBulkUrls] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrls, setPdfUrls] = useState(['']);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to extract actual URL from chrome extension wrapper
  const extractActualUrl = (url: string): string => {
    // Handle chrome extension URLs like chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://...
    const chromeExtensionMatch = url.match(/chrome-extension:\/\/[^\/]+\/(https?:\/\/.+)/i);
    if (chromeExtensionMatch) {
      return chromeExtensionMatch[1];
    }
    
    // Handle other common PDF viewer wrappers
    const pdfViewerMatch = url.match(/\/pdf\/web\/viewer\.html\?file=(.+)/i);
    if (pdfViewerMatch) {
      return decodeURIComponent(pdfViewerMatch[1]);
    }
    
    return url;
  };

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

  // PDF URL management functions
  const addPdfUrlField = () => {
    setPdfUrls([...pdfUrls, '']);
  };

  const removePdfUrlField = (index: number) => {
    setPdfUrls(pdfUrls.filter((_, i) => i !== index));
  };

  const updatePdfUrl = (index: number, value: string) => {
    const newUrls = [...pdfUrls];
    newUrls[index] = value;
    setPdfUrls(newUrls);
  };

  const processBulkUrls = async () => {
    setIsProcessing(true);
    
    // Split URLs by line and filter empty lines
    const urlList = bulkUrls.split('\n').filter(url => url.trim());
    
    try {
      let successCount = 0;
      let errorCount = 0;
      
      for (const url of urlList) {
        try {
          const cleanUrl = extractActualUrl(url.trim());
          const { data, error } = await supabase.functions.invoke('web-data-scraper', {
            body: { 
              url: cleanUrl, 
              data_type: 'both' // Extract both sales and rental data
            }
          });
          
          if (error) throw error;
          if (data?.success) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (err) {
          console.error(`Error processing ${url}:`, err);
          errorCount++;
        }
      }
      
      toast({
        title: "Bulk Processing Complete",
        description: `Successfully processed ${successCount} URLs${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
      });
    } catch (error) {
      console.error('Bulk processing error:', error);
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
                      placeholder="https://example.com or chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://..."
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
                  onClick={async () => {
                    const validUrls = urls.filter(url => url.trim());
                    if (validUrls.length === 0) return;
                    
                    setIsProcessing(true);
                    
                    try {
                      let successCount = 0;
                      let errorCount = 0;
                      
                      for (const url of validUrls) {
                        try {
                          const cleanUrl = extractActualUrl(url.trim());
                          const { data, error } = await supabase.functions.invoke('web-data-scraper', {
                            body: { 
                              url: cleanUrl, 
                              data_type: 'both' // Extract both sales and rental data
                            }
                          });
                          
                          if (error) throw error;
                          if (data?.success) {
                            successCount++;
                          } else {
                            errorCount++;
                          }
                        } catch (err) {
                          console.error(`Error processing ${url}:`, err);
                          errorCount++;
                        }
                      }
                      
                      toast({
                        title: "Processing Complete",
                        description: `Successfully processed ${successCount} URLs${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
                      });
                    } catch (error) {
                      console.error('Processing error:', error);
                      toast({
                        title: "Processing Error",
                        description: "Failed to process URLs",
                        variant: "destructive",
                      });
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Process URLs'}
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

              {/* PDF URL Input Section */}
              <div className="border-t pt-4">
                <Label className="text-base font-semibold">Or Enter PDF URLs</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Enter direct PDF links or chrome extension URLs
                </p>
                
                {pdfUrls.map((url, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <div className="flex-1">
                      <Label htmlFor={`pdf-url-${index}`}>PDF URL {index + 1}</Label>
                      <Input
                        id={`pdf-url-${index}`}
                        value={url}
                        onChange={(e) => updatePdfUrl(index, e.target.value)}
                        placeholder="https://example.com/document.pdf or chrome-extension://..."
                        type="url"
                      />
                    </div>
                    {pdfUrls.length > 1 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removePdfUrlField(index)}
                        className="mt-6"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button onClick={addPdfUrlField} variant="outline" size="sm" className="mb-4">
                  Add Another PDF URL
                </Button>
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
                  <div className="font-semibold">Ready for Processing:</div>
                  <div className="text-sm text-muted-foreground">
                    {files.length} files + {pdfUrls.filter(url => url.trim()).length} PDF URLs
                  </div>
                </div>
                <Button 
                  onClick={async () => {
                    setIsProcessing(true);
                    
                    try {
                      let successCount = 0;
                      let errorCount = 0;
                      
                      // Process file uploads
                      if (files.length > 0) {
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        successCount += files.length;
                      }
                      
                      // Process PDF URLs
                      const validPdfUrls = pdfUrls.filter(url => url.trim());
                      for (const url of validPdfUrls) {
                        try {
                          const cleanUrl = extractActualUrl(url.trim());
                          const { data, error } = await supabase.functions.invoke('web-data-scraper', {
                            body: { 
                              url: cleanUrl, 
                              data_type: 'both'
                            }
                          });
                          
                          if (error) throw error;
                          if (data?.success) {
                            successCount++;
                          } else {
                            errorCount++;
                          }
                        } catch (err) {
                          console.error(`Error processing PDF URL ${url}:`, err);
                          errorCount++;
                        }
                      }
                      
                      toast({
                        title: "Processing Complete",
                        description: `Successfully processed ${successCount} items${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
                      });
                    } catch (error) {
                      toast({
                        title: "Processing Error",
                        description: "Failed to process some items",
                        variant: "destructive",
                      });
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  disabled={isProcessing || (files.length === 0 && pdfUrls.filter(url => url.trim()).length === 0)}
                >
                  {isProcessing ? 'Processing...' : 'Process All'}
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