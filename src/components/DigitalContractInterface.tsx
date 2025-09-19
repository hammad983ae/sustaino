import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Send, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  PenTool,
  Shield,
  Zap
} from 'lucide-react';

interface ContractData {
  template_type: string;
  recipient_email: string;
  recipient_name: string;
  document_data: any;
}

interface DocumentStatus {
  id: string;
  name: string;
  status: 'draft' | 'sent' | 'signed' | 'completed';
  created_date: string;
  signed_date?: string;
}

export default function DigitalContractInterface() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [contractData, setContractData] = useState<ContractData>({
    template_type: '',
    recipient_email: '',
    recipient_name: '',
    document_data: {},
  });
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus[]>([]);
  const [activeDocument, setActiveDocument] = useState<string | null>(null);

  const templateTypes = [
    { value: 'property_offer', label: 'Property Offer Form', icon: <FileText className="w-4 h-4" /> },
    { value: 'valuation_agreement', label: 'Valuation Agreement', icon: <Shield className="w-4 h-4" /> },
    { value: 'auction_contract', label: 'Auction Contract', icon: <Zap className="w-4 h-4" /> },
    { value: 'esg_compliance', label: 'ESG Compliance Certificate', icon: <CheckCircle className="w-4 h-4" /> },
    { value: 'investment_agreement', label: 'Investment Agreement', icon: <PenTool className="w-4 h-4" /> },
  ];

  const handleCreateDocument = async () => {
    if (!contractData.template_type) {
      toast({
        title: "Error",
        description: "Please select a document template",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('signnow-integration', {
        body: {
          action: 'create_document',
          template_type: contractData.template_type,
          document_data: contractData.document_data,
        },
      });

      if (error) throw error;

      toast({
        title: "Document Created",
        description: "Your document has been created successfully",
      });

      // Update document status
      setDocumentStatus(prev => [...prev, {
        id: data.id,
        name: data.document_name,
        status: 'draft',
        created_date: new Date().toISOString(),
      }]);

      setActiveDocument(data.id);
    } catch (error) {
      console.error('Error creating document:', error);
      toast({
        title: "Error",
        description: "Failed to create document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendForSignature = async (documentId: string) => {
    if (!contractData.recipient_email || !contractData.recipient_name) {
      toast({
        title: "Error",
        description: "Please provide recipient details",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('signnow-integration', {
        body: {
          action: 'send_for_signature',
          document_id: documentId,
          recipient_email: contractData.recipient_email,
          recipient_name: contractData.recipient_name,
        },
      });

      if (error) throw error;

      toast({
        title: "Document Sent",
        description: `Document sent to ${contractData.recipient_email}`,
      });

      // Update document status
      setDocumentStatus(prev => 
        prev.map(doc => 
          doc.id === documentId 
            ? { ...doc, status: 'sent' as const }
            : doc
        )
      );
    } catch (error) {
      console.error('Error sending document:', error);
      toast({
        title: "Error",
        description: "Failed to send document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadDocument = async (documentId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('signnow-integration', {
        body: {
          action: 'download_document',
          document_id: documentId,
        },
      });

      if (error) throw error;

      // Create download link
      const binaryString = atob(data.document_data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-${documentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Complete",
        description: "Document downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'sent':
        return <Send className="w-4 h-4 text-orange-500" />;
      case 'signed':
        return <PenTool className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      sent: 'default',
      signed: 'outline',
      completed: 'default',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <PenTool className="w-8 h-8" />
            Digital Contract & Signature Management
          </CardTitle>
          <p className="text-blue-100">
            Create, send, and manage digital contracts with blockchain-secured signatures
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Creation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Create New Document
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="template-select">Document Template</Label>
              <Select
                value={contractData.template_type}
                onValueChange={(value) => setContractData(prev => ({ ...prev, template_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {templateTypes.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      <div className="flex items-center gap-2">
                        {template.icon}
                        {template.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipient-name">Recipient Name</Label>
                <Input
                  id="recipient-name"
                  value={contractData.recipient_name}
                  onChange={(e) => setContractData(prev => ({ ...prev, recipient_name: e.target.value }))}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label htmlFor="recipient-email">Recipient Email</Label>
                <Input
                  id="recipient-email"
                  type="email"
                  value={contractData.recipient_email}
                  onChange={(e) => setContractData(prev => ({ ...prev, recipient_email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="document-data">Document Data (JSON)</Label>
              <Textarea
                id="document-data"
                value={JSON.stringify(contractData.document_data, null, 2)}
                onChange={(e) => {
                  try {
                    const data = JSON.parse(e.target.value);
                    setContractData(prev => ({ ...prev, document_data: data }));
                  } catch (error) {
                    // Invalid JSON, keep the text as is
                  }
                }}
                placeholder={`{
  "property_address": "123 Main St",
  "offer_price": "$500,000",
  "purchaser_name": "John Smith"
}`}
                rows={6}
                className="font-mono text-sm"
              />
            </div>

            <Button 
              onClick={handleCreateDocument}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Creating...' : 'Create Document'}
            </Button>
          </CardContent>
        </Card>

        {/* Document Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Document Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            {documentStatus.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No documents created yet</p>
                <p className="text-sm">Create your first document to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {documentStatus.map((document) => (
                  <div
                    key={document.id}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(document.status)}
                        <span className="font-medium">{document.name}</span>
                      </div>
                      {getStatusBadge(document.status)}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Created: {new Date(document.created_date).toLocaleDateString()}
                      {document.signed_date && (
                        <span className="ml-4">
                          Signed: {new Date(document.signed_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {document.status === 'draft' && (
                        <Button
                          size="sm"
                          onClick={() => handleSendForSignature(document.id)}
                          disabled={isLoading}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send for Signature
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadDocument(document.id)}
                        disabled={isLoading}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Blockchain Security & Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Document Integrity</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                All documents are cryptographically hashed and stored on blockchain for tamper-proof verification
              </p>
            </div>
            
            <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Smart Contracts</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Automated execution of contract terms through blockchain smart contracts
              </p>
            </div>
            
            <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Immutable Audit Trail</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Complete signing history preserved permanently on distributed ledger
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
