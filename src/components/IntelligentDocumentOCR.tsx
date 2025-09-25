import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Upload, 
  Loader2, 
  CheckCircle, 
  XCircle,
  Eye,
  Copy,
  FileCheck,
  DollarSign,
  CalendarDays,
  Building,
  Scale
} from 'lucide-react';
import Tesseract from 'tesseract.js';

interface DocumentData {
  id: string;
  file: File;
  url: string;
  name: string;
  documentType: DocumentType;
  confidence: number;
  ocrText: string;
  extractedFields: ExtractedFields;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
}

interface ExtractedFields {
  // Common fields
  propertyAddress?: string;
  date?: string;
  amount?: string;
  
  // Lease-specific fields
  tenantName?: string;
  landlordName?: string;
  leaseStart?: string;
  leaseEnd?: string;
  weeklyRent?: string;
  monthlyRent?: string;
  bondAmount?: string;
  
  // Rates/Outgoings-specific fields
  councilName?: string;
  rateableValue?: string;
  landValue?: string;
  annualRates?: string;
  quarterlyRates?: string;
  
  // Contract of Sale-specific fields
  vendor?: string;
  purchaser?: string;
  salePrice?: string;
  settlementDate?: string;
  deposit?: string;
  
  // Statutory Assessment-specific fields
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
  | 'tenancy_schedule'
  | 'unknown';

interface IntelligentDocumentOCRProps {
  onDataExtracted: (documents: DocumentData[]) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

const IntelligentDocumentOCR: React.FC<IntelligentDocumentOCRProps> = ({
  onDataExtracted,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  maxSize = 10 * 1024 * 1024 // 10MB
}) => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessingId, setCurrentProcessingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const detectDocumentType = (text: string): DocumentType => {
    const lowerText = text.toLowerCase();
    
    // Lease Agreement patterns
    if (lowerText.includes('lease agreement') || 
        lowerText.includes('tenancy agreement') ||
        lowerText.includes('rental agreement') ||
        (lowerText.includes('tenant') && lowerText.includes('landlord'))) {
      return 'lease_agreement';
    }
    
    // Rates Notice patterns
    if (lowerText.includes('rates notice') ||
        lowerText.includes('council rates') ||
        lowerText.includes('municipal rates') ||
        lowerText.includes('rateable value')) {
      return 'rates_notice';
    }
    
    // Outgoings Statement patterns
    if (lowerText.includes('outgoings') ||
        lowerText.includes('body corporate') ||
        lowerText.includes('strata fees') ||
        lowerText.includes('owners corporation')) {
      return 'outgoings_statement';
    }
    
    // Contract of Sale patterns
    if (lowerText.includes('contract of sale') ||
        lowerText.includes('purchase agreement') ||
        lowerText.includes('sale contract') ||
        (lowerText.includes('vendor') && lowerText.includes('purchaser'))) {
      return 'contract_of_sale';
    }
    
    // Statutory Assessment patterns
    if (lowerText.includes('statutory assessment') ||
        lowerText.includes('land tax') ||
        lowerText.includes('property assessment') ||
        lowerText.includes('valuation notice')) {
      return 'statutory_assessment';
    }
    
    // Tenancy Schedule patterns
    if (lowerText.includes('tenancy schedule') ||
        lowerText.includes('rental schedule') ||
        lowerText.includes('lease schedule')) {
      return 'tenancy_schedule';
    }
    
    return 'unknown';
  };

  const extractFieldsByType = (text: string, documentType: DocumentType): ExtractedFields => {
    const fields: ExtractedFields = {};
    
    // Common field extraction
    const addressMatch = text.match(/(?:property|address|location)[\s:]+([^\n\r]{10,100})/i);
    if (addressMatch) fields.propertyAddress = addressMatch[1].trim();
    
    const dateMatch = text.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/);
    if (dateMatch) fields.date = dateMatch[1];
    
    const amountMatch = text.match(/\$([0-9,]+\.?[0-9]*)/);
    if (amountMatch) fields.amount = amountMatch[1];
    
    // Document-specific extraction
    switch (documentType) {
      case 'lease_agreement':
        extractLeaseFields(text, fields);
        break;
      case 'rates_notice':
        extractRatesFields(text, fields);
        break;
      case 'outgoings_statement':
        extractOutgoingsFields(text, fields);
        break;
      case 'contract_of_sale':
        extractContractFields(text, fields);
        break;
      case 'statutory_assessment':
        extractAssessmentFields(text, fields);
        break;
      case 'tenancy_schedule':
        extractTenancyScheduleFields(text, fields);
        break;
    }
    
    return fields;
  };

  const extractLeaseFields = (text: string, fields: ExtractedFields) => {
    const tenantMatch = text.match(/(?:tenant|lessee)[\s:]+([^\n\r]+)/i);
    if (tenantMatch) fields.tenantName = tenantMatch[1].trim();
    
    const landlordMatch = text.match(/(?:landlord|lessor)[\s:]+([^\n\r]+)/i);
    if (landlordMatch) fields.landlordName = landlordMatch[1].trim();
    
    const weeklyRentMatch = text.match(/(?:weekly rent|rent per week)[\s:]+\$?([0-9,]+\.?[0-9]*)/i);
    if (weeklyRentMatch) fields.weeklyRent = weeklyRentMatch[1];
    
    const monthlyRentMatch = text.match(/(?:monthly rent|rent per month)[\s:]+\$?([0-9,]+\.?[0-9]*)/i);
    if (monthlyRentMatch) fields.monthlyRent = monthlyRentMatch[1];
    
    const bondMatch = text.match(/(?:bond|security deposit)[\s:]+\$?([0-9,]+\.?[0-9]*)/i);
    if (bondMatch) fields.bondAmount = bondMatch[1];
    
    const leaseStartMatch = text.match(/(?:commencement|start date|from)[\s:]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
    if (leaseStartMatch) fields.leaseStart = leaseStartMatch[1];
    
    const leaseEndMatch = text.match(/(?:expiry|end date|to)[\s:]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
    if (leaseEndMatch) fields.leaseEnd = leaseEndMatch[1];
  };

  const extractRatesFields = (text: string, fields: ExtractedFields) => {
    const councilMatch = text.match(/(?:council|municipality)[\s:]+([^\n\r]+)/i);
    if (councilMatch) fields.councilName = councilMatch[1].trim();
    
    const rateableValueMatch = text.match(/(?:rateable value|assessed value)[\s:]+\$?([0-9,]+)/i);
    if (rateableValueMatch) fields.rateableValue = rateableValueMatch[1];
    
    const landValueMatch = text.match(/(?:land value|site value)[\s:]+\$?([0-9,]+)/i);
    if (landValueMatch) fields.landValue = landValueMatch[1];
    
    const annualRatesMatch = text.match(/(?:annual rates|yearly rates)[\s:]+\$?([0-9,]+\.?[0-9]*)/i);
    if (annualRatesMatch) fields.annualRates = annualRatesMatch[1];
    
    const quarterlyRatesMatch = text.match(/(?:quarterly rates|quarter)[\s:]+\$?([0-9,]+\.?[0-9]*)/i);
    if (quarterlyRatesMatch) fields.quarterlyRates = quarterlyRatesMatch[1];
  };

  const extractOutgoingsFields = (text: string, fields: ExtractedFields) => {
    // Extract body corporate fees, strata fees, etc.
    const bodyCorpMatch = text.match(/(?:body corporate|strata|owners corporation)[\s:]+\$?([0-9,]+\.?[0-9]*)/i);
    if (bodyCorpMatch) fields.amount = bodyCorpMatch[1];
  };

  const extractContractFields = (text: string, fields: ExtractedFields) => {
    const vendorMatch = text.match(/(?:vendor|seller)[\s:]+([^\n\r]+)/i);
    if (vendorMatch) fields.vendor = vendorMatch[1].trim();
    
    const purchaserMatch = text.match(/(?:purchaser|buyer)[\s:]+([^\n\r]+)/i);
    if (purchaserMatch) fields.purchaser = purchaserMatch[1].trim();
    
    const salePriceMatch = text.match(/(?:sale price|purchase price)[\s:]+\$?([0-9,]+\.?[0-9]*)/i);
    if (salePriceMatch) fields.salePrice = salePriceMatch[1];
    
    const settlementMatch = text.match(/(?:settlement|closing)[\s:]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
    if (settlementMatch) fields.settlementDate = settlementMatch[1];
    
    const depositMatch = text.match(/(?:deposit)[\s:]+\$?([0-9,]+\.?[0-9]*)/i);
    if (depositMatch) fields.deposit = depositMatch[1];
  };

  const extractAssessmentFields = (text: string, fields: ExtractedFields) => {
    const assessmentTypeMatch = text.match(/(?:assessment type|type)[\s:]+([^\n\r]+)/i);
    if (assessmentTypeMatch) fields.assessmentType = assessmentTypeMatch[1].trim();
    
    const assessedValueMatch = text.match(/(?:assessed value|valuation)[\s:]+\$?([0-9,]+)/i);
    if (assessedValueMatch) fields.assessedValue = assessedValueMatch[1];
    
    const effectiveDateMatch = text.match(/(?:effective date|assessment date)[\s:]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
    if (effectiveDateMatch) fields.effectiveDate = effectiveDateMatch[1];
    
    const assessmentNumberMatch = text.match(/(?:assessment number|reference)[\s:]+([A-Z0-9\-]+)/i);
    if (assessmentNumberMatch) fields.assessmentNumber = assessmentNumberMatch[1];
  };

  const extractTenancyScheduleFields = (text: string, fields: ExtractedFields) => {
    // Similar to lease but might have multiple tenants/units
    extractLeaseFields(text, fields);
  };

  const processDocument = useCallback(async (file: File) => {
    const documentId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create initial document entry
    const newDocument: DocumentData = {
      id: documentId,
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      documentType: 'unknown',
      confidence: 0,
      ocrText: '',
      extractedFields: {},
      processingStatus: 'pending'
    };
    
    setDocuments(prev => [...prev, newDocument]);
    setIsProcessing(true);
    setCurrentProcessingId(documentId);
    setProgress(0);
    
    try {
      console.log('OCR: Starting processing for document:', file.name);
      
      // Update status to processing
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, processingStatus: 'processing' as const }
          : doc
      ));
      
      const { data } = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      
      const extractedText = data.text.trim();
      const confidence = data.confidence;
      const documentType = detectDocumentType(extractedText);
      const extractedFields = extractFieldsByType(extractedText, documentType);
      
      console.log('OCR: Completed processing. Document type:', documentType);
      console.log('OCR: Extracted fields:', extractedFields);
      
      // Update document with results
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { 
              ...doc, 
              documentType,
              confidence,
              ocrText: extractedText,
              extractedFields,
              processingStatus: 'completed' as const
            }
          : doc
      ));
      
      toast({
        title: "Document Processed",
        description: `${file.name} processed as ${documentType.replace('_', ' ')} with ${confidence.toFixed(1)}% confidence`,
      });
      
    } catch (error) {
      console.error('OCR Error:', error);
      
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, processingStatus: 'failed' as const }
          : doc
      ));
      
      toast({
        title: "Processing Failed",
        description: `Failed to process ${file.name}`,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setCurrentProcessingId(null);
      setProgress(0);
    }
  }, [toast]);

  const handleFileUpload = useCallback((files: FileList) => {
    console.log('Document OCR: handleFileUpload called with', files.length, 'files');
    console.log('Document OCR: Accepted types:', acceptedTypes);
    
    Array.from(files).forEach(file => {
      console.log('Document OCR: Processing file:', file.name, 'type:', file.type);
      
      if (!acceptedTypes.includes(file.type)) {
        console.log('Document OCR: File type not accepted:', file.type);
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds the ${maxSize / 1024 / 1024}MB limit`,
          variant: "destructive"
        });
        return;
      }
      
      console.log('Document OCR: File passed validation, calling processDocument');
      processDocument(file);
    });
    
    console.log('Document OCR: All files processed, current documents:', documents.length);
  }, [acceptedTypes, maxSize, processDocument, toast, documents.length]);

  const getDocumentTypeIcon = (type: DocumentType) => {
    switch (type) {
      case 'lease_agreement': return <Building className="h-4 w-4" />;
      case 'rates_notice': return <DollarSign className="h-4 w-4" />;
      case 'outgoings_statement': return <DollarSign className="h-4 w-4" />;
      case 'contract_of_sale': return <FileCheck className="h-4 w-4" />;
      case 'statutory_assessment': return <Scale className="h-4 w-4" />;
      case 'tenancy_schedule': return <CalendarDays className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDocumentTypeLabel = (type: DocumentType) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  React.useEffect(() => {
    onDataExtracted(documents.filter(doc => doc.processingStatus === 'completed'));
  }, [documents, onDataExtracted]);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Intelligent Document OCR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
            {isProcessing ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Processing document...</p>
                  <Progress value={progress} className="w-full max-w-sm mx-auto" />
                  <p className="text-xs text-muted-foreground mt-2">{progress}% complete</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Upload Property Documents</p>
                  <p className="text-sm text-muted-foreground">
                    AI will automatically detect document type and extract relevant information
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Lease Agreements</Badge>
                  <Badge variant="secondary">Rates Notices</Badge>
                  <Badge variant="secondary">Outgoings Statements</Badge>
                  <Badge variant="secondary">Contracts of Sale</Badge>
                  <Badge variant="secondary">Statutory Assessments</Badge>
                  <Badge variant="secondary">Tenancy Schedules</Badge>
                </div>
                <input
                  type="file"
                  multiple
                  accept={acceptedTypes.join(',')}
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                  id="document-upload"
                />
                <label htmlFor="document-upload">
                  <Button variant="outline" className="cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    Select Documents
                  </Button>
                </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Document Results */}
      {documents.length > 0 && (
        <div className="space-y-4">
          {documents.map((document) => (
            <Card key={document.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    {getDocumentTypeIcon(document.documentType)}
                    {document.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      document.documentType === 'unknown' ? 'outline' : 'default'
                    }>
                      {getDocumentTypeLabel(document.documentType)}
                    </Badge>
                    {document.processingStatus === 'processing' && (
                      <Badge variant="secondary">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Processing
                      </Badge>
                    )}
                    {document.processingStatus === 'completed' && (
                      <Badge variant="default">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {document.processingStatus === 'failed' && (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {document.processingStatus === 'completed' && (
                  <div className="space-y-4">
                    {/* Extracted Fields */}
                    {Object.keys(document.extractedFields).length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Extracted Information:</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {Object.entries(document.extractedFields).map(([key, value]) => (
                            value && (
                              <div key={key} className="text-sm">
                                <span className="font-medium capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                                </span>
                                <span className="ml-2">{value}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* OCR Text */}
                    <div>
                      <Label className="text-sm font-medium">
                        OCR Text (Confidence: {document.confidence.toFixed(1)}%)
                      </Label>
                      <Textarea
                        value={document.ocrText}
                        readOnly
                        className="mt-2 h-32 text-xs"
                        placeholder="Extracted text will appear here..."
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntelligentDocumentOCR;