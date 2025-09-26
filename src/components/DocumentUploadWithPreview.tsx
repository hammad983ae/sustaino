import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Upload, 
  Loader2, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit3,
  Save,
  Building,
  DollarSign,
  FileCheck,
  Scale,
  CalendarDays,
  Info
} from 'lucide-react';

interface DocumentUploadWithPreviewProps {
  onDataConfirmed: (documentData: ProcessedDocument) => void;
}

interface ProcessedDocument {
  id: string;
  fileName: string;
  documentType: DocumentType;
  extractedData: ExtractedFields;
  ocrText: string;
  confidence: number;
  userNotes?: string;
  fieldsToUpdate: string[];
}

interface ExtractedFields {
  propertyAddress?: string;
  date?: string;
  amount?: string;
  tenantName?: string;
  landlordName?: string;
  leaseStart?: string;
  leaseEnd?: string;
  weeklyRent?: string;
  monthlyRent?: string;
  bondAmount?: string;
  councilName?: string;
  rateableValue?: string;
  landValue?: string;
  annualRates?: string;
  quarterlyRates?: string;
  vendor?: string;
  purchaser?: string;
  salePrice?: string;
  settlementDate?: string;
  deposit?: string;
  assessmentType?: string;
  assessedValue?: string;
  effectiveDate?: string;
  assessmentNumber?: string;
}

type DocumentType = 
  | 'lease_agreement'
  | 'rates_notice' 
  | 'outgoings_statement'
  | 'contract_of_sale'
  | 'statutory_assessment'
  | 'tenancy_schedule';

const DocumentUploadWithPreview: React.FC<DocumentUploadWithPreviewProps> = ({
  onDataConfirmed
}) => {
  const [step, setStep] = useState<'upload' | 'select-type' | 'preview' | 'confirm'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('lease_agreement');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedFields>({});
  const [ocrText, setOcrText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [userNotes, setUserNotes] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [editedData, setEditedData] = useState<ExtractedFields>({});
  const { toast } = useToast();

  const documentTypes = [
    { value: 'lease_agreement', label: 'Lease Agreement', icon: Building },
    { value: 'rates_notice', label: 'Rates Notice', icon: DollarSign },
    { value: 'outgoings_statement', label: 'Outgoings Statement', icon: DollarSign },
    { value: 'contract_of_sale', label: 'Contract of Sale', icon: FileCheck },
    { value: 'statutory_assessment', label: 'Statutory Assessment', icon: Scale },
    { value: 'tenancy_schedule', label: 'Tenancy Schedule', icon: CalendarDays },
  ];

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'];
    if (!acceptedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid image or PDF file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (20MB max)
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 20MB",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    setStep('select-type');
  }, [toast]);

  const processDocument = useCallback(async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setStep('preview');

    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted data based on document type
      const mockData = generateMockData(selectedDocType);
      setExtractedData(mockData);
      setEditedData(mockData);
      setOcrText(`This is mock OCR text for ${selectedDocType}. In a real implementation, this would contain the actual extracted text from the document.`);
      setConfidence(85.5);
      
      // Pre-select all fields by default
      setSelectedFields(Object.keys(mockData));

      toast({
        title: "Document Processed",
        description: `Successfully processed ${uploadedFile.name}`,
      });

    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Failed to process the document. Please try again.",
        variant: "destructive"
      });
      setStep('select-type');
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFile, selectedDocType, toast]);

  const generateMockData = (docType: DocumentType): ExtractedFields => {
    const baseData = {
      propertyAddress: "133-137 Langtree Avenue, Mildura VIC 3500",
      date: "15/09/2024"
    };

    switch (docType) {
      case 'lease_agreement':
        return {
          ...baseData,
          tenantName: "John Smith",
          landlordName: "Property Holdings Pty Ltd",
          leaseStart: "01/10/2024",
          leaseEnd: "30/09/2025",
          weeklyRent: "450.00",
          bondAmount: "1,800.00"
        };
      case 'rates_notice':
        return {
          ...baseData,
          councilName: "Mildura Rural City Council",
          rateableValue: "320,000",
          landValue: "280,000",
          annualRates: "2,450.80",
          quarterlyRates: "612.70"
        };
      case 'contract_of_sale':
        return {
          ...baseData,
          vendor: "ABC Properties Pty Ltd",
          purchaser: "John & Jane Doe",
          salePrice: "650,000",
          settlementDate: "30/11/2024",
          deposit: "65,000"
        };
      case 'statutory_assessment':
        return {
          ...baseData,
          assessmentType: "Land Tax Assessment",
          assessedValue: "520,000",
          effectiveDate: "01/01/2024",
          assessmentNumber: "LT2024-001234"
        };
      default:
        return baseData;
    }
  };

  const handleFieldToggle = (fieldKey: string, checked: boolean) => {
    setSelectedFields(prev => 
      checked 
        ? [...prev, fieldKey]
        : prev.filter(key => key !== fieldKey)
    );
  };

  const handleFieldEdit = (fieldKey: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [fieldKey]: value
    }));
  };

  const confirmAndUpdateReport = () => {
    const finalData: ProcessedDocument = {
      id: `doc-${Date.now()}`,
      fileName: uploadedFile?.name || 'Unknown',
      documentType: selectedDocType,
      extractedData: editedData,
      ocrText,
      confidence,
      userNotes,
      fieldsToUpdate: selectedFields
    };

    onDataConfirmed(finalData);
    
    toast({
      title: "Document Data Confirmed",
      description: `${selectedFields.length} fields will be updated in the report`,
    });

    // Reset for next document
    setStep('upload');
    setUploadedFile(null);
    setExtractedData({});
    setEditedData({});
    setSelectedFields([]);
    setUserNotes('');
  };

  const formatFieldName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const getDocumentTypeInfo = (type: DocumentType) => {
    const typeInfo = documentTypes.find(t => t.value === type);
    return typeInfo || documentTypes[0];
  };

  if (step === 'upload') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Smart Document Upload & OCR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Upload Property Document</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI will automatically detect document type and extract information
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="document-upload"
            />
            <label htmlFor="document-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>Choose Document</span>
              </Button>
            </label>
            <p className="text-xs text-muted-foreground mt-2">
              Supports images (JPG, PNG) and PDF files up to 20MB
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'select-type') {
    const selectedTypeInfo = getDocumentTypeInfo(selectedDocType);
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Select Document Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{uploadedFile?.name}</span>
          </div>
          
          <div className="space-y-2">
            <Label>Document Type</Label>
            <Select value={selectedDocType} onValueChange={(value: DocumentType) => setSelectedDocType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Select the document type to optimize OCR extraction for specific fields like rent amounts, property details, or assessment values.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button onClick={() => setStep('upload')} variant="outline">
              Back
            </Button>
            <Button onClick={processDocument} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <selectedTypeInfo.icon className="h-4 w-4 mr-2" />
                  Process Document
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'preview') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Review Extracted Data
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {getDocumentTypeInfo(selectedDocType).label}
            </Badge>
            <Badge variant="secondary">
              {confidence.toFixed(1)}% Confidence
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Extracted Fields */}
          <div className="space-y-4">
            <h3 className="font-medium">Extracted Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(editedData).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={selectedFields.includes(key)}
                      onCheckedChange={(checked) => handleFieldToggle(key, checked as boolean)}
                    />
                    <Label htmlFor={key} className="text-sm font-medium">
                      {formatFieldName(key)}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={value || ''}
                      onChange={(e) => handleFieldEdit(key, e.target.value)}
                      className="flex-1 p-2 border rounded text-sm"
                      disabled={!selectedFields.includes(key)}
                    />
                    <Edit3 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Notes */}
          <div className="space-y-2">
            <Label>Additional Notes (Optional)</Label>
            <Textarea
              placeholder="Add any additional notes or corrections..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* OCR Text Preview */}
          <div className="space-y-2">
            <Label>Raw OCR Text</Label>
            <Textarea
              value={ocrText}
              readOnly
              rows={4}
              className="text-xs bg-muted"
            />
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Review and edit the extracted information above. Only selected fields will be updated in your report.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button onClick={() => setStep('select-type')} variant="outline">
              Back
            </Button>
            <Button onClick={confirmAndUpdateReport} disabled={selectedFields.length === 0}>
              <Save className="h-4 w-4 mr-2" />
              Confirm & Update Report ({selectedFields.length} fields)
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default DocumentUploadWithPreview;