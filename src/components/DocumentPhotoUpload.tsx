import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Image, FileText, Sparkles, ArrowLeft } from "lucide-react";
import { useState } from "react";

const DocumentPhotoUpload = () => {
  const [ocrProcessing, setOcrProcessing] = useState("all");
  const [customPages, setCustomPages] = useState("10");

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
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-medium mb-2">No Property Images</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get real-life ready for property images from aerial photos or upload your own
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Auto Fetch Images
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Images
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop documents here or click to browse
                </p>
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Documents
                </Button>
              </div>
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
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-lg font-medium mb-2">Drag & Drop files here, or click to browse</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Supports files such as PDFs, images, spreadsheets. Max single file size 10mb
            </p>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Details
          </Button>
          
          <div className="flex gap-3">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Perform Comprehensive Valuation
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Enhance with AI
            </Button>
          </div>
        </div>

        {/* AI Enhancement Section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium">Enhance Your Report with AI</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Generate professional content, market analytics, and sustainability insights instantly
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPhotoUpload;