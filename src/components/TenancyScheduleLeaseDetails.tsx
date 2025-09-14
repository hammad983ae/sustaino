import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Users, Eye, FileImage } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TenancyCalculationForm from "./TenancyCalculationForm";

const TenancyScheduleLeaseDetails = () => {
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file for OCR processing.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Import transformers dynamically to avoid bundle size issues
      const { pipeline } = await import('@huggingface/transformers');
      
      // Create OCR pipeline with fallback to CPU if WebGPU fails
      let ocr;
      try {
        ocr = await pipeline('image-to-text', 'onnx-community/trocr-base-printed', {
          device: 'webgpu',
        });
      } catch (webgpuError) {
        console.warn('WebGPU not available, falling back to CPU:', webgpuError);
        ocr = await pipeline('image-to-text', 'onnx-community/trocr-base-printed', {
          device: 'cpu',
        });
      }

      // Convert file to image element
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Process with OCR
      const result = await ocr(imageUrl) as any;
      const text = result?.generated_text || result?.text || (Array.isArray(result) ? result[0]?.generated_text || result[0]?.text : "") || "No text detected";
      
      setExtractedText(text);
      
      toast({
        title: "OCR Processing Complete",
        description: "Text has been extracted from the document.",
      });

      // Clean up
      URL.revokeObjectURL(imageUrl);
      
    } catch (error) {
      console.error('OCR Error:', error);
      toast({
        title: "OCR Processing Failed",
        description: "Unable to extract text from the document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Ground Lease Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">Ground Lease</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-ground-lease" className="text-sm">Include</Label>
              <Switch id="include-ground-lease" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lease Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lease-type">Lease Type</Label>
              <Input id="lease-type" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lease-term">Lease Term (Years)</Label>
              <Input id="lease-term" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="annual-ground-rent">Annual Ground Rent ($)</Label>
              <Input id="annual-ground-rent" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="review-period">Review Period (Years)</Label>
              <Input id="review-period" placeholder="" className="mt-1" />
            </div>
          </div>

          {/* Lease Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="lease-commencement">Lease Commencement Date</Label>
              <Input id="lease-commencement" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lease-expiry">Lease Expiry Date</Label>
              <Input id="lease-expiry" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="next-review">Next Review Date</Label>
              <Input id="next-review" placeholder="" className="mt-1" />
            </div>
          </div>

          {/* Review Method */}
          <div className="max-w-md">
            <Label htmlFor="review-method">Review Method</Label>
            <Select>
              <SelectTrigger className="mt-1 bg-background">
                <SelectValue placeholder="Select review method" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="cpi">CPI</SelectItem>
                <SelectItem value="market">Market Review</SelectItem>
                <SelectItem value="fixed">Fixed Increase</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lease Options */}
          <div>
            <Label className="text-base font-medium">Lease Options</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="option-renew" />
                <Label htmlFor="option-renew" className="text-sm">Option to Renew</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="option-purchase" />
                <Label htmlFor="option-purchase" className="text-sm">Option to Purchase</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="surrender-clause" />
                <Label htmlFor="surrender-clause" className="text-sm">Surrender Clause</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="break-clause" />
                <Label htmlFor="break-clause" className="text-sm">Break Clause</Label>
              </div>
            </div>
          </div>

          {/* Text Areas */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="permitted-use">Permitted Use</Label>
              <Textarea 
                id="permitted-use"
                placeholder=""
                className="mt-1 h-24"
              />
            </div>
            <div>
              <Label htmlFor="restrictions-covenants">Restrictions & Covenants</Label>
              <Textarea 
                id="restrictions-covenants"
                placeholder=""
                className="mt-1 h-24"
              />
            </div>
            <div>
              <Label htmlFor="impact-valuation">Impact on Valuation</Label>
              <Textarea 
                id="impact-valuation"
                placeholder=""
                className="mt-1 h-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tenant Summary & Documents Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <CardTitle className="text-lg">Tenant Summary & Documents</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Upload tenant summaries (valuer) and generate secure links for clients/agents to upload supporting legal documents.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-tenant-summary" className="text-sm">Include</Label>
              <Switch id="include-tenant-summary" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Section with OCR */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted rounded-lg p-6">
              <div className="text-center">
                <div className="flex justify-center gap-4 mb-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <Eye className="h-8 w-8 text-blue-500" />
                  <FileImage className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">Upload tenant summaries and documents with OCR text extraction</p>
                <p className="text-xs text-muted-foreground mb-4">Supports image files (PNG, JPG, PDF) for automatic text extraction</p>
                
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </label>
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {isProcessing && (
                    <Button disabled variant="outline">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                      Processing OCR...
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* OCR Results */}
            {extractedText && (
              <div className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-green-600" />
                  <h4 className="font-medium text-green-800">Extracted Text (OCR)</h4>
                </div>
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="h-32 bg-white border-green-200"
                  placeholder="Extracted text will appear here..."
                />
                <div className="flex gap-2 mt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setExtractedText("")}
                  >
                    Clear
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(extractedText);
                      toast({
                        title: "Copied to clipboard",
                        description: "Extracted text has been copied.",
                      });
                    }}
                  >
                    Copy Text
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Professional Tenant Lease Details Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tenant Lease Details</h3>
              <div className="text-xs text-muted-foreground bg-blue-50 px-2 py-1 rounded">
                Professional Format - All calculations automated
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Lessor/Lessee Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lessor">Lessor</Label>
                  <Input id="lessor" placeholder="Enter lessor name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lessee">Lessee</Label>
                  <Input id="lessee" placeholder="Enter lessee name" className="mt-1" />
                </div>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="commencement-date">Commencement Date</Label>
                  <Input id="commencement-date" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="options-terms">Options/Further Terms</Label>
                  <Input id="options-terms" placeholder="e.g., 5+5 years" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="review-date">Review Date</Label>
                  <Input id="review-date" type="date" className="mt-1" />
                </div>
              </div>

              {/* Review Method and Other Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="tenant-review-method">Review Method</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpi">CPI</SelectItem>
                      <SelectItem value="market">Market Review</SelectItem>
                      <SelectItem value="fixed">Fixed %</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="outgoings">Outgoings</Label>
                  <Input id="outgoings" placeholder="$0.00" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="commencement-rent">Commencement Rent</Label>
                  <Input id="commencement-rent" placeholder="$0.00" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="incentives">Incentives</Label>
                  <Input id="incentives" placeholder="$0.00" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="repairs-maintenance">Repairs and Maintenance</Label>
                  <Textarea id="repairs-maintenance" placeholder="Describe responsibility allocation" className="mt-1 h-20" />
                </div>
              </div>
            </div>
          </div>

          {/* Import Automated Calculation Component */}
          <TenancyCalculationForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default TenancyScheduleLeaseDetails;