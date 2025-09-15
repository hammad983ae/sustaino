import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Users, Eye, FileImage, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useReportData } from "@/contexts/ReportDataContext";
import { useValuation } from "@/contexts/ValuationContext";
import TenancyCalculationForm from "./TenancyCalculationForm";

const TenancyScheduleLeaseDetails = () => {
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { reportData, updateReportData } = useReportData();
  const { isLeaseholdValuation, valuationType } = useValuation();
  
  // Form state for ground lease
  const [groundLeaseData, setGroundLeaseData] = useState({
    include: false,
    leaseType: '',
    leaseTerm: '',
    annualGroundRent: '',
    reviewPeriod: '',
    commencementDate: '',
    expiryDate: '',
    nextReviewDate: '',
    reviewMethod: 'cpi',
    permittedUse: '',
    restrictions: '',
    impact: '',
    leaseOptions: {
      optionToRenew: false,
      optionToPurchase: false,
      surrenderClause: false,
      breakClause: false
    }
  });
  
  // Form state for tenant summary
  const [tenantData, setTenantData] = useState({
    include: true,
    lessor: '',
    lessee: '',
    commencementDate: '',
    expiryDate: '',
    optionsTerms: '',
    reviewDate: '',
    reviewMethod: 'cpi',
    outgoings: '',
    commencementRent: '',
    incentives: '',
    repairsMaintenance: ''
  });

  // Load data from generated report sections
  useEffect(() => {
    const generatedSections = reportData.generatedSections as any;
    if (generatedSections?.tenancyScheduleLeaseDetails) {
      console.log('Loading tenancy data from generated report:', generatedSections.tenancyScheduleLeaseDetails);
      
      if (generatedSections.tenancyScheduleLeaseDetails.groundLease) {
        setGroundLeaseData(prev => ({
          ...prev,
          ...generatedSections.tenancyScheduleLeaseDetails.groundLease
        }));
      }
      
      if (generatedSections.tenancyScheduleLeaseDetails.tenantSummary) {
        setTenantData(prev => ({
          ...prev,
          ...generatedSections.tenancyScheduleLeaseDetails.tenantSummary
        }));
      }
    }
  }, [reportData]);

  // Auto-populate function for OCR extracted data
  const autoPopulateFromOCR = (text: string) => {
    // Extract key information using regex patterns
    const patterns = {
      lessor: /(?:lessor|landlord)[:\s]+([^\n,;]+)/i,
      lessee: /(?:lessee|tenant)[:\s]+([^\n,;]+)/i,
      rent: /(?:rent|rental)[:\s]*(?:\$)?([0-9,]+)/i,
      commencementDate: /(?:commencement|start)[:\s]*(?:date)?[:\s]*([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})/i,
      expiryDate: /(?:expiry|end)[:\s]*(?:date)?[:\s]*([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})/i,
      term: /(?:term|period)[:\s]*([0-9]+)\s*(?:years?|yrs?)/i
    };

    const extractedData: any = {};
    
    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = text.match(pattern);
      if (match && match[1]) {
        extractedData[key] = match[1].trim();
      }
    });

    // Update tenant data with extracted information
    if (Object.keys(extractedData).length > 0) {
      setTenantData(prev => ({
        ...prev,
        lessor: extractedData.lessor || prev.lessor,
        lessee: extractedData.lessee || prev.lessee,
        commencementRent: extractedData.rent || prev.commencementRent,
        commencementDate: extractedData.commencementDate || prev.commencementDate,
        expiryDate: extractedData.expiryDate || prev.expiryDate
      }));

      toast({
        title: "Data Auto-populated",
        description: "Lease information has been extracted and populated in the form fields.",
      });
    }
  };

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
      
      // Automatically try to populate form fields from OCR text
      if (text && text !== "No text detected") {
        autoPopulateFromOCR(text);
      }
      
      toast({
        title: "OCR Processing Complete",
        description: "Text has been extracted and form fields auto-populated where possible.",
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

  // Save data to report context when form data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateReportData('tenancyDetails', {
        groundLease: groundLeaseData,
        tenantSummary: tenantData,
        extractedText,
        lastUpdated: new Date().toISOString()
      });
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [groundLeaseData, tenantData, extractedText, updateReportData]);

  return (
    <div className="space-y-6">
      {/* Conditional Ground Lease Section - Only show for leasehold valuations */}
      {isLeaseholdValuation && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                <div>
                  <CardTitle className="text-lg">Ground Lease</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Leasehold Valuation
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Valuation Type: {valuationType}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="include-ground-lease" className="text-sm">Include</Label>
                <Switch 
                  id="include-ground-lease" 
                  checked={groundLeaseData.include}
                  onCheckedChange={(checked) => 
                    setGroundLeaseData(prev => ({...prev, include: checked}))
                  }
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Lease Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lease-type">Lease Type</Label>
                <Input 
                  id="lease-type" 
                  placeholder="e.g., Ground Lease, Peppercorn Lease" 
                  className="mt-1"
                  value={groundLeaseData.leaseType}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, leaseType: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="lease-term">Lease Term (Years)</Label>
                <Input 
                  id="lease-term" 
                  placeholder="e.g., 99, 999" 
                  className="mt-1"
                  value={groundLeaseData.leaseTerm}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, leaseTerm: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="annual-ground-rent">Annual Ground Rent ($)</Label>
                <Input 
                  id="annual-ground-rent" 
                  placeholder="$0.00" 
                  className="mt-1"
                  value={groundLeaseData.annualGroundRent}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, annualGroundRent: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="review-period">Review Period (Years)</Label>
                <Input 
                  id="review-period" 
                  placeholder="e.g., 5, 10, 21" 
                  className="mt-1"
                  value={groundLeaseData.reviewPeriod}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, reviewPeriod: e.target.value}))}
                />
              </div>
            </div>

            {/* Lease Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="lease-commencement">Lease Commencement Date</Label>
                <Input 
                  id="lease-commencement" 
                  type="date" 
                  className="mt-1"
                  value={groundLeaseData.commencementDate}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, commencementDate: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="lease-expiry">Lease Expiry Date</Label>
                <Input 
                  id="lease-expiry" 
                  type="date" 
                  className="mt-1"
                  value={groundLeaseData.expiryDate}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, expiryDate: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="next-review">Next Review Date</Label>
                <Input 
                  id="next-review" 
                  type="date" 
                  className="mt-1"
                  value={groundLeaseData.nextReviewDate}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, nextReviewDate: e.target.value}))}
                />
              </div>
            </div>

            {/* Review Method */}
            <div className="max-w-md">
              <Label htmlFor="review-method">Review Method</Label>
              <Select 
                value={groundLeaseData.reviewMethod} 
                onValueChange={(value) => setGroundLeaseData(prev => ({...prev, reviewMethod: value}))}
              >
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
                  <Checkbox 
                    id="option-renew" 
                    checked={groundLeaseData.leaseOptions.optionToRenew}
                    onCheckedChange={(checked) => setGroundLeaseData(prev => ({
                      ...prev, 
                      leaseOptions: {...prev.leaseOptions, optionToRenew: !!checked}
                    }))}
                  />
                  <Label htmlFor="option-renew" className="text-sm">Option to Renew</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="option-purchase" 
                    checked={groundLeaseData.leaseOptions.optionToPurchase}
                    onCheckedChange={(checked) => setGroundLeaseData(prev => ({
                      ...prev, 
                      leaseOptions: {...prev.leaseOptions, optionToPurchase: !!checked}
                    }))}
                  />
                  <Label htmlFor="option-purchase" className="text-sm">Option to Purchase</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="surrender-clause" 
                    checked={groundLeaseData.leaseOptions.surrenderClause}
                    onCheckedChange={(checked) => setGroundLeaseData(prev => ({
                      ...prev, 
                      leaseOptions: {...prev.leaseOptions, surrenderClause: !!checked}
                    }))}
                  />
                  <Label htmlFor="surrender-clause" className="text-sm">Surrender Clause</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="break-clause" 
                    checked={groundLeaseData.leaseOptions.breakClause}
                    onCheckedChange={(checked) => setGroundLeaseData(prev => ({
                      ...prev, 
                      leaseOptions: {...prev.leaseOptions, breakClause: !!checked}
                    }))}
                  />
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
                  placeholder="Describe the permitted use of the property under the ground lease..."
                  className="mt-1 h-24"
                  value={groundLeaseData.permittedUse}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, permittedUse: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="restrictions-covenants">Restrictions & Covenants</Label>
                <Textarea 
                  id="restrictions-covenants"
                  placeholder="Detail any restrictions, covenants, or special conditions..."
                  className="mt-1 h-24"
                  value={groundLeaseData.restrictions}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, restrictions: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="impact-valuation">Impact on Valuation</Label>
                <Textarea 
                  id="impact-valuation"
                  placeholder="Assess how the ground lease affects the property valuation..."
                  className="mt-1 h-24"
                  value={groundLeaseData.impact}
                  onChange={(e) => setGroundLeaseData(prev => ({...prev, impact: e.target.value}))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Freehold Property Notice */}
      {!isLeaseholdValuation && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">
                Ground Lease section is not applicable for freehold properties. 
                {valuationType && ` Current valuation type: ${valuationType}`}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

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
              <Switch 
                id="include-tenant-summary" 
                checked={tenantData.include}
                onCheckedChange={(checked) => setTenantData(prev => ({...prev, include: checked}))}
              />
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
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <h4 className="font-medium text-green-800">Extracted Text (OCR)</h4>
                  <Badge variant="outline" className="text-xs">
                    Auto-populated form fields
                  </Badge>
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
                  <Button 
                    size="sm"
                    variant="secondary"
                    onClick={() => autoPopulateFromOCR(extractedText)}
                  >
                    Re-populate Fields
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
                  <Input 
                    id="lessor" 
                    placeholder="Enter lessor name" 
                    className="mt-1"
                    value={tenantData.lessor}
                    onChange={(e) => setTenantData(prev => ({...prev, lessor: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="lessee">Lessee</Label>
                  <Input 
                    id="lessee" 
                    placeholder="Enter lessee name" 
                    className="mt-1"
                    value={tenantData.lessee}
                    onChange={(e) => setTenantData(prev => ({...prev, lessee: e.target.value}))}
                  />
                </div>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="commencement-date">Commencement Date</Label>
                  <Input 
                    id="commencement-date" 
                    type="date" 
                    className="mt-1"
                    value={tenantData.commencementDate}
                    onChange={(e) => setTenantData(prev => ({...prev, commencementDate: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input 
                    id="expiry-date" 
                    type="date" 
                    className="mt-1"
                    value={tenantData.expiryDate}
                    onChange={(e) => setTenantData(prev => ({...prev, expiryDate: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="options-terms">Options/Further Terms</Label>
                  <Input 
                    id="options-terms" 
                    placeholder="e.g., 5+5 years" 
                    className="mt-1"
                    value={tenantData.optionsTerms}
                    onChange={(e) => setTenantData(prev => ({...prev, optionsTerms: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="review-date">Review Date</Label>
                  <Input 
                    id="review-date" 
                    type="date" 
                    className="mt-1"
                    value={tenantData.reviewDate}
                    onChange={(e) => setTenantData(prev => ({...prev, reviewDate: e.target.value}))}
                  />
                </div>
              </div>

              {/* Review Method and Other Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="tenant-review-method">Review Method</Label>
                  <Select 
                    value={tenantData.reviewMethod} 
                    onValueChange={(value) => setTenantData(prev => ({...prev, reviewMethod: value}))}
                  >
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
                  <Input 
                    id="outgoings" 
                    placeholder="$0.00" 
                    className="mt-1"
                    value={tenantData.outgoings}
                    onChange={(e) => setTenantData(prev => ({...prev, outgoings: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="commencement-rent">Commencement Rent</Label>
                  <Input 
                    id="commencement-rent" 
                    placeholder="$0.00" 
                    className="mt-1"
                    value={tenantData.commencementRent}
                    onChange={(e) => setTenantData(prev => ({...prev, commencementRent: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="incentives">Incentives</Label>
                  <Input 
                    id="incentives" 
                    placeholder="$0.00" 
                    className="mt-1"
                    value={tenantData.incentives}
                    onChange={(e) => setTenantData(prev => ({...prev, incentives: e.target.value}))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="repairs-maintenance">Repairs and Maintenance</Label>
                  <Textarea 
                    id="repairs-maintenance" 
                    placeholder="Describe responsibility allocation" 
                    className="mt-1 h-20"
                    value={tenantData.repairsMaintenance}
                    onChange={(e) => setTenantData(prev => ({...prev, repairsMaintenance: e.target.value}))}
                  />
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