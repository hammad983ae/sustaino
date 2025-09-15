import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSign, Upload, FileText, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useReportData } from "@/contexts/ReportDataContext";
import { useToast } from "@/hooks/use-toast";

const StatutoryAssessment = () => {
  const { reportData, updateReportData } = useReportData();
  const { toast } = useToast();
  
  const [isIncluded, setIsIncluded] = useState(reportData.statutoryAssessment?.included ?? true);
  const [assessmentDate, setAssessmentDate] = useState<Date>(
    reportData.statutoryAssessment?.assessmentDate ? new Date(reportData.statutoryAssessment.assessmentDate) : undefined
  );
  const [formData, setFormData] = useState({
    currentStatutoryValue: reportData.statutoryAssessment?.currentStatutoryValue || "",
    landValue: reportData.statutoryAssessment?.landValue || "",
    capitalImprovedValue: reportData.statutoryAssessment?.capitalImprovedValue || "",
    annualRates: reportData.statutoryAssessment?.annualRates || "",
    assessingAuthority: reportData.statutoryAssessment?.assessingAuthority || "",
    landTax: reportData.statutoryAssessment?.landTax || "",
    windfallTax: reportData.statutoryAssessment?.windfallTax || "",
    stampDuty: reportData.statutoryAssessment?.stampDuty || "",
    assessmentNotes: reportData.statutoryAssessment?.assessmentNotes || "",
  });
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);

  // Save data to context whenever form data changes
  useEffect(() => {
    const statutoryData = {
      included: isIncluded,
      assessmentDate: assessmentDate?.toISOString(),
      ...formData,
      uploadedDocuments: uploadedDocuments.map(doc => doc.name),
    };
    updateReportData('statutoryAssessment', statutoryData);
  }, [isIncluded, assessmentDate, formData, uploadedDocuments, updateReportData]);

  const handleIncludeToggle = (checked: boolean) => {
    setIsIncluded(checked);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setUploadedDocuments(prev => [...prev, ...files]);
    
    // Process OCR for each uploaded file
    setIsProcessingOCR(true);
    
    try {
      for (const file of files) {
        await processStatutoryDocumentOCR(file);
      }
      
      toast({
        title: "Documents processed",
        description: `Successfully extracted data from ${files.length} document(s)`,
      });
    } catch (error) {
      console.error('OCR processing error:', error);
      toast({
        title: "Processing error",
        description: "Some documents could not be processed. Please check manually.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingOCR(false);
    }
  };

  const processStatutoryDocumentOCR = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        
        // Extract statutory assessment data using pattern matching
        const extractedData = extractStatutoryData(text);
        
        // Update form data with extracted information
        setFormData(prev => ({
          ...prev,
          ...extractedData,
        }));
        
        resolve();
      };
      reader.readAsText(file);
    });
  };

  const extractStatutoryData = (text: string) => {
    const patterns = {
      currentStatutoryValue: /(?:current statutory value|statutory value|assessed value)[\s:]*\$?([0-9,]+)/i,
      landValue: /(?:land value|site value)[\s:]*\$?([0-9,]+)/i,
      capitalImprovedValue: /(?:capital improved value|civ|improved value)[\s:]*\$?([0-9,]+)/i,
      annualRates: /(?:annual rates|rates)[\s:]*\$?([0-9,]+)/i,
      assessingAuthority: /(?:assessing authority|council|authority)[\s:]*([^\n\r]+)/i,
      landTax: /(?:land tax)[\s:]*\$?([0-9,]+)/i,
      windfallTax: /(?:windfall tax)[\s:]*\$?([0-9,]+)/i,
      stampDuty: /(?:stamp duty)[\s:]*\$?([0-9,]+)/i,
    };

    const extracted: any = {};
    
    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = text.match(pattern);
      if (match) {
        extracted[key] = match[1].trim().replace(/,/g, '');
      }
    });

    return extracted;
  };

  const regenerateFromDocuments = async () => {
    if (uploadedDocuments.length === 0) {
      toast({
        title: "No documents",
        description: "Please upload documents first to regenerate data.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingOCR(true);
    
    try {
      // Clear existing data
      setFormData({
        currentStatutoryValue: "",
        landValue: "",
        capitalImprovedValue: "",
        annualRates: "",
        assessingAuthority: "",
        landTax: "",
        windfallTax: "",
        stampDuty: "",
        assessmentNotes: "",
      });

      // Reprocess all documents
      for (const file of uploadedDocuments) {
        await processStatutoryDocumentOCR(file);
      }
      
      toast({
        title: "Data regenerated",
        description: "Successfully regenerated data from uploaded documents",
      });
    } catch (error) {
      console.error('Regeneration error:', error);
      toast({
        title: "Regeneration failed",
        description: "Could not regenerate data from documents",
        variant: "destructive",
      });
    } finally {
      setIsProcessingOCR(false);
    }
  };

  if (!isIncluded) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div>
              <h2 className="text-xl font-semibold text-muted-foreground">Statutory Assessment</h2>
              <p className="text-sm text-muted-foreground">Section excluded from report</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="include-statutory" className="text-sm">Include</Label>
            <Switch 
              id="include-statutory" 
              checked={isIncluded}
              onCheckedChange={handleIncludeToggle}
            />
          </div>
        </div>
        
        <Card className="opacity-50">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              This section is excluded from the report. Toggle "Include" to add statutory assessment details.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Include Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">Statutory Assessment</h2>
            <p className="text-sm text-muted-foreground">Statutory valuation and assessment details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="include-statutory" className="text-sm">Include</Label>
          <Switch 
            id="include-statutory" 
            checked={isIncluded}
            onCheckedChange={handleIncludeToggle}
          />
        </div>
      </div>

      {/* Document Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Document Upload & OCR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="document-upload">Upload Statutory Assessment Documents</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  id="document-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="flex-1"
                  disabled={isProcessingOCR}
                />
                {uploadedDocuments.length > 0 && (
                  <Button
                    onClick={regenerateFromDocuments}
                    variant="outline"
                    size="sm"
                    disabled={isProcessingOCR}
                  >
                    <RefreshCw className={cn("h-4 w-4 mr-2", isProcessingOCR && "animate-spin")} />
                    Regenerate
                  </Button>
                )}
              </div>
              
              {isProcessingOCR && (
                <div className="flex items-center gap-2 mt-2 text-sm text-primary">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Processing documents and extracting data...
                </div>
              )}
              
              {uploadedDocuments.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Uploaded Documents:</p>
                  <ul className="text-sm text-muted-foreground">
                    {uploadedDocuments.map((doc, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {doc.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* First Row - Current Statutory Value and Assessment Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="current-statutory-value">Current Statutory Value</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="current-statutory-value" 
                    placeholder="0" 
                    className="pl-9"
                    value={formData.currentStatutoryValue}
                    onChange={(e) => handleInputChange('currentStatutoryValue', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="assessment-date">Assessment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full mt-1 justify-start text-left font-normal",
                        !assessmentDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {assessmentDate ? format(assessmentDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={assessmentDate}
                      onSelect={setAssessmentDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Second Row - Land Value and Capital Improved Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="land-value">Land Value</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="land-value" 
                    placeholder="0" 
                    className="pl-9"
                    value={formData.landValue}
                    onChange={(e) => handleInputChange('landValue', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="capital-improved-value">Capital Improved Value</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="capital-improved-value" 
                    placeholder="0" 
                    className="pl-9"
                    value={formData.capitalImprovedValue}
                    onChange={(e) => handleInputChange('capitalImprovedValue', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Third Row - Annual Rates and Assessing Authority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annual-rates">Annual Rates</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="annual-rates" 
                    placeholder="0" 
                    className="pl-9"
                    value={formData.annualRates}
                    onChange={(e) => handleInputChange('annualRates', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="assessing-authority">Assessing Authority</Label>
                <Input 
                  id="assessing-authority" 
                  placeholder="Local Government Authority" 
                  className="mt-1"
                  value={formData.assessingAuthority}
                  onChange={(e) => handleInputChange('assessingAuthority', e.target.value)}
                />
              </div>
            </div>

            {/* Fourth Row - Land Tax and Windfall Tax */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="land-tax">Land Tax</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="land-tax" 
                    placeholder="0" 
                    className="pl-9"
                    value={formData.landTax}
                    onChange={(e) => handleInputChange('landTax', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="windfall-tax">Windfall Tax (Victoria Only)</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="windfall-tax" 
                    placeholder="0" 
                    className="pl-9"
                    value={formData.windfallTax}
                    onChange={(e) => handleInputChange('windfallTax', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Fifth Row - Stamp Duty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stamp-duty">Stamp Duty</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="stamp-duty" 
                    placeholder="0" 
                    className="pl-9"
                    value={formData.stampDuty}
                    onChange={(e) => handleInputChange('stampDuty', e.target.value)}
                  />
                </div>
              </div>
              <div></div>
            </div>

            {/* Assessment Notes */}
            <div>
              <Label htmlFor="assessment-notes">Assessment Notes</Label>
              <Textarea 
                id="assessment-notes"
                placeholder="Additional statutory assessment information..."
                className="mt-1 h-32"
                value={formData.assessmentNotes}
                onChange={(e) => handleInputChange('assessmentNotes', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatutoryAssessment;