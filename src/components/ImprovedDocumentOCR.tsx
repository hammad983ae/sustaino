import React, { useState, useCallback, useRef } from 'react';
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
  Scale,
  RotateCcw,
  Trash2,
  Zap
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
  retryCount: number;
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

interface ImprovedDocumentOCRProps {
  onDataExtracted: (documents: DocumentData[]) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

const ImprovedDocumentOCR: React.FC<ImprovedDocumentOCRProps> = ({
  onDataExtracted,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'],
  maxSize = 20 * 1024 * 1024 // 20MB
}) => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessingId, setCurrentProcessingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    extractLeaseFields(text, fields);
  };

  const processDocument = useCallback(async (document: DocumentData) => {
    setIsProcessing(true);
    setCurrentProcessingId(document.id);
    setProgress(0);
    
    try {
      console.log('OCR: Starting processing for document:', document.name);
      
      // Update status to processing
      setDocuments(prev => prev.map(doc => 
        doc.id === document.id 
          ? { ...doc, processingStatus: 'processing' as const }
          : doc
      ));
      
      const { data } = await Tesseract.recognize(document.file, 'eng', {
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
        doc.id === document.id 
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
        description: `${document.name} processed as ${documentType.replace('_', ' ')} with ${confidence.toFixed(1)}% confidence`,
      });
      
    } catch (error) {
      console.error('OCR Error:', error);
      
      const updatedDoc = documents.find(d => d.id === document.id);
      const retryCount = (updatedDoc?.retryCount || 0) + 1;
      
      setDocuments(prev => prev.map(doc => 
        doc.id === document.id 
          ? { ...doc, processingStatus: 'failed' as const, retryCount }
          : doc
      ));
      
      toast({
        title: "Processing Failed",
        description: `Failed to process ${document.name}. ${retryCount < 3 ? 'You can retry.' : 'Max retries reached.'}`,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setCurrentProcessingId(null);
      setProgress(0);
    }
  }, [documents, toast]);

  const handleFileUpload = useCallback((files: FileList) => {
    const newDocuments: DocumentData[] = [];
    
    Array.from(files).forEach((file, index) => {
      // Validate file type
      if (!acceptedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds the ${maxSize / 1024 / 1024}MB limit`,
          variant: "destructive"
        });
        return;
      }
      
      const documentId = `doc-${Date.now()}-${index}`;
      
      const newDocument: DocumentData = {
        id: documentId,
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        documentType: 'unknown',
        confidence: 0,
        ocrText: '',
        extractedFields: {},
        processingStatus: 'pending',
        retryCount: 0
      };
      
      newDocuments.push(newDocument);
    });
    
    if (newDocuments.length === 0) {
      return;
    }
    
    setDocuments(prev => [...prev, ...newDocuments]);
    
    toast({
      title: "Documents Added",
      description: `${newDocuments.length} documents ready for processing`,
    });
    
    // Auto-process first document
    if (newDocuments.length > 0) {
      processDocument(newDocuments[0]);
    }
  }, [acceptedTypes, maxSize, processDocument, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const retryDocument = useCallback((document: DocumentData) => {
    if (document.retryCount >= 3) {
      toast({
        title: "Max Retries Reached",
        description: "This document has failed processing multiple times",
        variant: "destructive"
      });
      return;
    }
    
    processDocument(document);
  }, [processDocument, toast]);

  const removeDocument = useCallback((documentId: string) => {
    setDocuments(prev => {
      const newDocs = prev.filter(doc => doc.id !== documentId);
      const removedDoc = prev.find(doc => doc.id === documentId);
      
      if (removedDoc && removedDoc.url.startsWith('blob:')) {
        URL.revokeObjectURL(removedDoc.url);
      }
      
      return newDocs;
    });
    
    toast({
      title: "Document Removed",
      description: "Document has been removed from the list",
    });
  }, [toast]);

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

  const getStatusBadge = (doc: DocumentData) => {
    switch (doc.processingStatus) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'processing':
        return <Badge variant="default"><Loader2 className="h-3 w-3 mr-1 animate-spin" />Processing</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
    }
  };

  React.useEffect(() => {
    const completedDocuments = documents.filter(doc => doc.processingStatus === 'completed');
    onDataExtracted(completedDocuments);
  }, [documents, onDataExtracted]);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Smart Document OCR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
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
                    AI will automatically detect document type and extract information
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Lease Agreements</Badge>
                  <Badge variant="secondary">Rates Notices</Badge>
                  <Badge variant="secondary">Outgoings Statements</Badge>
                  <Badge variant="secondary">Contracts of Sale</Badge>
                  <Badge variant="secondary">Statutory Assessments</Badge>
                </div>
                <input
                  ref={fileInputRef}
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
                    {getStatusBadge(document)}
                    {document.confidence > 0 && (
                      <Badge variant={document.confidence > 80 ? "default" : "secondary"}>
                        {Math.round(document.confidence)}% confidence
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Type: {getDocumentTypeLabel(document.documentType)}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Document Preview */}
                <div className="flex gap-4">
                  <div className="w-24 h-32 bg-muted rounded border overflow-hidden flex-shrink-0">
                    <img 
                      src={document.url} 
                      alt={document.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {document.processingStatus === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => processDocument(document)}
                          disabled={isProcessing}
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Process OCR
                        </Button>
                      )}
                      
                      {document.processingStatus === 'failed' && document.retryCount < 3 && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => retryDocument(document)}
                          disabled={isProcessing}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Retry ({document.retryCount}/3)
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removeDocument(document.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    
                    {/* Extracted Fields */}
                    {document.processingStatus === 'completed' && Object.keys(document.extractedFields).length > 0 && (
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(document.extractedFields).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <Label className="text-xs font-medium text-muted-foreground">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </Label>
                            <p className="text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* OCR Text */}
                {document.ocrText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Extracted Text</Label>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => navigator.clipboard.writeText(document.ocrText)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <Textarea 
                      value={document.ocrText}
                      readOnly
                      className="min-h-[100px] text-sm"
                    />
                  </div>
                )}
                
                {/* Low Confidence Warning */}
                {document.confidence > 0 && document.confidence < 70 && (
                  <Alert>
                    <AlertDescription>
                      Low confidence detected ({document.confidence.toFixed(1)}%). 
                      Consider retaking the photo with better lighting or resolution.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImprovedDocumentOCR;