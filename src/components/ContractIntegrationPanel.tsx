import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Send, 
  PenTool, 
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';

interface ContractPanelProps {
  sectionType: 'valuation' | 'esg' | 'auction' | 'investment' | 'property_offer';
  sectionData: any;
  className?: string;
}

export default function ContractIntegrationPanel({ 
  sectionType, 
  sectionData, 
  className = "" 
}: ContractPanelProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [contractStatus, setContractStatus] = useState<'none' | 'draft' | 'sent' | 'signed'>('none');
  const [documentId, setDocumentId] = useState<string | null>(null);

  const sectionConfig = {
    valuation: {
      title: 'Valuation Agreement',
      template: 'valuation_agreement',
      icon: <Shield className="w-4 h-4" />,
      description: 'Generate professional valuation agreement',
    },
    esg: {
      title: 'ESG Compliance Certificate',
      template: 'esg_compliance',
      icon: <CheckCircle className="w-4 h-4" />,
      description: 'Create ESG compliance documentation',
    },
    auction: {
      title: 'Auction Contract',
      template: 'auction_contract',
      icon: <PenTool className="w-4 h-4" />,
      description: 'Generate binding auction contract',
    },
    investment: {
      title: 'Investment Agreement',
      template: 'investment_agreement',
      icon: <FileText className="w-4 h-4" />,
      description: 'Create investment documentation',
    },
    property_offer: {
      title: 'Property Offer Form',
      template: 'property_offer',
      icon: <Send className="w-4 h-4" />,
      description: 'Generate digital offer form',
    },
  };

  const config = sectionConfig[sectionType];

  const handleGenerateContract = async () => {
    setIsGenerating(true);
    try {
      // Prepare document data based on section type
      const documentData = prepareDocumentData(sectionType, sectionData);

      const { data, error } = await supabase.functions.invoke('signnow-integration', {
        body: {
          action: 'create_document',
          template_type: config.template,
          document_data: documentData,
        },
      });

      if (error) throw error;

      setDocumentId(data.id);
      setContractStatus('draft');

      toast({
        title: "Contract Generated",
        description: `${config.title} has been created successfully`,
      });
    } catch (error) {
      console.error('Error generating contract:', error);
      toast({
        title: "Error",
        description: "Failed to generate contract",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendContract = async () => {
    if (!documentId) return;

    setIsGenerating(true);
    try {
      const { error } = await supabase.functions.invoke('signnow-integration', {
        body: {
          action: 'send_for_signature',
          document_id: documentId,
          recipient_email: sectionData.client_email || sectionData.recipient_email,
          recipient_name: sectionData.client_name || sectionData.recipient_name,
        },
      });

      if (error) throw error;

      setContractStatus('sent');

      toast({
        title: "Contract Sent",
        description: "Contract has been sent for signature",
      });
    } catch (error) {
      console.error('Error sending contract:', error);
      toast({
        title: "Error",
        description: "Failed to send contract",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getStatusBadge = () => {
    switch (contractStatus) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'sent':
        return <Badge variant="default">Sent for Signature</Badge>;
      case 'signed':
        return <Badge variant="outline">Signed</Badge>;
      default:
        return <Badge variant="destructive">Not Generated</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (contractStatus) {
      case 'draft':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'sent':
        return <Send className="w-4 h-4 text-orange-500" />;
      case 'signed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card className={`border-dashed border-2 border-primary/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {config.icon}
          Digital Contract
        </CardTitle>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium">{config.title}</span>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex gap-2">
          {contractStatus === 'none' && (
            <Button
              size="sm"
              onClick={handleGenerateContract}
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? 'Generating...' : 'Generate Contract'}
            </Button>
          )}

          {contractStatus === 'draft' && (
            <Button
              size="sm"
              onClick={handleSendContract}
              disabled={isGenerating || !sectionData.client_email}
              className="flex-1"
            >
              <Send className="w-4 h-4 mr-2" />
              Send for Signature
            </Button>
          )}

          {contractStatus === 'sent' && (
            <div className="flex-1 p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-sm text-center">
              Awaiting signature...
            </div>
          )}

          {contractStatus === 'signed' && (
            <div className="flex-1 p-2 bg-green-50 dark:bg-green-900/20 rounded text-sm text-center">
              ✓ Contract signed
            </div>
          )}
        </div>

        {!sectionData.client_email && contractStatus === 'draft' && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Client email required to send contract
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function prepareDocumentData(sectionType: string, sectionData: any) {
  switch (sectionType) {
    case 'valuation':
      return {
        property_address: sectionData.property_address || '',
        client_name: sectionData.client_name || '',
        valuation_purpose: sectionData.valuation_purpose || 'Market Valuation',
        valuation_fee: sectionData.valuation_fee || '',
        completion_date: sectionData.completion_date || '',
        valuer_name: sectionData.valuer_name || 'Professional Valuer',
        license_number: sectionData.license_number || '',
      };

    case 'esg':
      return {
        property_address: sectionData.property_address || '',
        esg_score: sectionData.overall_esg_score || '',
        environmental_rating: sectionData.environmental_score || '',
        social_rating: sectionData.social_score || '',
        governance_rating: sectionData.governance_score || '',
        assessment_date: new Date().toLocaleDateString(),
        certifying_body: 'Sustano Sphere ESG Assessment',
      };

    case 'auction':
      return {
        property_address: sectionData.property_address || '',
        winning_bid: sectionData.winning_bid || '',
        bidder_name: sectionData.bidder_name || '',
        bidder_email: sectionData.bidder_email || '',
        auction_date: sectionData.auction_date || new Date().toLocaleDateString(),
        settlement_terms: sectionData.settlement_terms || '30 days',
        deposit_amount: sectionData.deposit_amount || '',
      };

    case 'investment':
      return {
        property_title: sectionData.property_title || '',
        investment_amount: sectionData.investment_amount || '',
        investor_name: sectionData.investor_name || '',
        investor_email: sectionData.investor_email || '',
        expected_return: sectionData.expected_return || '',
        investment_term: sectionData.investment_term || '',
        risk_rating: sectionData.risk_rating || '',
      };

    case 'property_offer':
      return {
        property_address: sectionData.property_address || '',
        offer_price: sectionData.offer_price || '',
        purchaser_name: sectionData.purchaser_name || '',
        purchaser_email: sectionData.purchaser_email || '',
        preferred_settlement: sectionData.preferred_settlement || '',
        special_conditions: sectionData.special_conditions || '',
        offer_date: new Date().toLocaleDateString(),
      };

    default:
      return sectionData;
  }
}