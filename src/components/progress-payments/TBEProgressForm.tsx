import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Upload, Camera, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TBEProgressFormProps {
  onClose: () => void;
  onSuccess: () => void;
  sourceJobId?: string; // From PAF/ISFV workflow
  sourcePropertyAddress?: string; // From PAF/ISFV workflow
  sourceValuationType?: 'PAF' | 'ISFV'; // Source workflow type
}

interface HIAStage {
  id: string;
  stage_name: string;
  stage_description: string;
  standard_percentage: number;
  stage_order: number;
  typical_inclusions: any;
}

export const TBEProgressForm: React.FC<TBEProgressFormProps> = ({ onClose, onSuccess, sourceJobId, sourcePropertyAddress, sourceValuationType }) => {
  const [hiaStages, setHiaStages] = useState<HIAStage[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    property_address: sourcePropertyAddress || '',
    builder_name: '',
    approved_plans_sighted: '',
    building_contract_number: '',
    original_valuation_id: sourceJobId || '',
    contract_price: 0,
    contract_date: '',
    current_stage: '',
    claimed_percentage: 0,
    verified_percentage: 0,
    hia_stage_reference: '',
    cost_to_date: 0,
    cost_to_complete: 0,
    inspection_date: '',
    inspector_notes: sourceValuationType ? `Based on ${sourceValuationType} valuation reference: ${sourceJobId}` : '',
    invoice_amount_claimed: 0,
    fund_release_recommendation: '',
    recommendation_notes: '',
    next_stage: '',
    next_stage_percentage: 0,
    estimated_next_inspection_date: '',
  });

  const [previousClaims, setPreviousClaims] = useState<any[]>([]);
  const [loadingPreviousClaims, setLoadingPreviousClaims] = useState(false);

  useEffect(() => {
    fetchHIAStages();
    if (formData.property_address || formData.building_contract_number) {
      fetchPreviousClaims();
    }
  }, [formData.property_address, formData.building_contract_number]);

  const fetchHIAStages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hia_progress_stages')
        .select('*')
        .order('stage_order');

      if (error) throw error;
      setHiaStages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch HIA stages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviousClaims = async () => {
    if (!formData.property_address && !formData.building_contract_number) return;
    
    try {
      setLoadingPreviousClaims(true);
      const { data, error } = await supabase
        .from('tbe_progress_payments')
        .select('*')
        .or(`property_address.eq.${formData.property_address},building_contract_number.eq.${formData.building_contract_number}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPreviousClaims(data || []);
    } catch (error: any) {
      console.error('Error fetching previous claims:', error);
    } finally {
      setLoadingPreviousClaims(false);
    }
  };

  const carryOverFromPreviousClaim = (previousClaim: any) => {
    setFormData(prev => ({
      ...prev,
      builder_name: previousClaim.builder_name || prev.builder_name,
      building_contract_number: previousClaim.building_contract_number || prev.building_contract_number,
      contract_price: previousClaim.contract_price || prev.contract_price,
      contract_date: previousClaim.contract_date || prev.contract_date,
    }));
    
    toast({
      title: "Success",
      description: "Previous claim information carried over successfully",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStageSelection = (stageId: string) => {
    const selectedStage = hiaStages.find(stage => stage.id === stageId);
    if (selectedStage) {
      setFormData(prev => ({
        ...prev,
        current_stage: selectedStage.stage_name,
        hia_stage_reference: stageId,
        claimed_percentage: selectedStage.standard_percentage,
        verified_percentage: selectedStage.standard_percentage,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('tbe_progress_payments')
        .insert([{
          ...formData,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          status: 'pending',
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Progress payment inspection created successfully",
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create progress payment inspection",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Progress Payment Claims</h1>
          <p className="text-muted-foreground">Construction Progress Payment Assessment</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property & Contract Information */}
        <Card>
          <CardHeader>
            <CardTitle>Property & Contract Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="property_address">Property Address</Label>
                <Input
                  id="property_address"
                  value={formData.property_address}
                  onChange={(e) => handleInputChange('property_address', e.target.value)}
                  placeholder="Enter property address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="builder_name">Builder Name</Label>
                  <Input
                    id="builder_name"
                    value={formData.builder_name}
                    onChange={(e) => handleInputChange('builder_name', e.target.value)}
                    placeholder="Enter builder name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="approved_plans_sighted">Approved Plans Sighted</Label>
                  <Select onValueChange={(value) => handleInputChange('approved_plans_sighted', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Yes/No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contract_price">Contract Price</Label>
                <Input
                  id="contract_price"
                  type="number"
                  value={formData.contract_price}
                  onChange={(e) => handleInputChange('contract_price', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contract_date">Contract Date</Label>
                <Input
                  id="contract_date"
                  type="date"
                  value={formData.contract_date}
                  onChange={(e) => handleInputChange('contract_date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="building_contract_number">Contract Number</Label>
                <Input
                  id="building_contract_number"
                  value={formData.building_contract_number}
                  onChange={(e) => handleInputChange('building_contract_number', e.target.value)}
                  placeholder="Contract reference"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HIA Progress Stages */}
        <Card>
          <CardHeader>
            <CardTitle>Construction Stage Selection</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select the current HIA progress payment stage
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading HIA stages...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hiaStages.map((stage) => (
                  <Card 
                    key={stage.id} 
                    className={`cursor-pointer transition-colors ${
                      formData.hia_stage_reference === stage.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleStageSelection(stage.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{stage.stage_name}</h4>
                        <Badge variant="secondary">{stage.standard_percentage}%</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {stage.stage_description}
                      </p>
                      <div className="text-xs">
                        <p className="font-medium mb-1">Typical Inclusions:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {stage.typical_inclusions?.slice(0, 3).map((inclusion, idx) => (
                            <li key={idx} className="text-muted-foreground">{inclusion}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Previous Claims */}
        {previousClaims.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Previous Claims</CardTitle>
              <p className="text-sm text-muted-foreground">
                Previous progress payment claims for this property/contract
              </p>
            </CardHeader>
            <CardContent>
              {loadingPreviousClaims ? (
                <div className="text-center py-4">Loading previous claims...</div>
              ) : (
                <div className="space-y-4">
                  {previousClaims.map((claim, index) => (
                    <Card key={claim.id} className="border-l-4 border-l-primary/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{claim.current_stage}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(claim.created_at).toLocaleDateString()} • {claim.verified_percentage}% verified
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={claim.fund_release_recommendation === 'approve_full' ? 'default' : 'secondary'}>
                              {claim.fund_release_recommendation}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => carryOverFromPreviousClaim(claim)}
                            >
                              Carry Over
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Contract Price:</span>
                            <p className="font-medium">{formatCurrency(claim.contract_price)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cost to Date:</span>
                            <p className="font-medium">{formatCurrency(claim.cost_to_date)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Invoice Amount:</span>
                            <p className="font-medium">{formatCurrency(claim.invoice_amount_claimed)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <p className="font-medium capitalize">{claim.status}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Progress Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="claimed_percentage">Claimed Progress (%)</Label>
                <Input
                  id="claimed_percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.claimed_percentage}
                  onChange={(e) => handleInputChange('claimed_percentage', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="verified_percentage">Verified Progress (%)</Label>
                <Input
                  id="verified_percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.verified_percentage}
                  onChange={(e) => handleInputChange('verified_percentage', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="inspection_date">Inspection Date</Label>
                <Input
                  id="inspection_date"
                  type="date"
                  value={formData.inspection_date}
                  onChange={(e) => handleInputChange('inspection_date', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cost_to_date">Cost to Date</Label>
                <Input
                  id="cost_to_date"
                  type="number"
                  value={formData.cost_to_date}
                  onChange={(e) => handleInputChange('cost_to_date', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="cost_to_complete">Cost to Complete</Label>
                <Input
                  id="cost_to_complete"
                  type="number"
                  value={formData.cost_to_complete}
                  onChange={(e) => handleInputChange('cost_to_complete', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="inspector_notes">Inspector Notes</Label>
              <Textarea
                id="inspector_notes"
                value={formData.inspector_notes}
                onChange={(e) => handleInputChange('inspector_notes', e.target.value)}
                placeholder="Detailed inspection notes and observations..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Invoice & Claims */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice & Claims</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="invoice_amount_claimed">Invoice Amount Claimed</Label>
              <Input
                id="invoice_amount_claimed"
                type="number"
                value={formData.invoice_amount_claimed}
                onChange={(e) => handleInputChange('invoice_amount_claimed', parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Invoice
              </Button>
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Take Photos
              </Button>
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                OCR Process
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Fund Release Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fund_release_recommendation">Recommendation</Label>
              <Select onValueChange={(value) => handleInputChange('fund_release_recommendation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recommendation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approve_full">Approve Full Amount</SelectItem>
                  <SelectItem value="approve_partial">Approve Partial Amount</SelectItem>
                  <SelectItem value="reject">Reject Release</SelectItem>
                  <SelectItem value="requires_review">Requires Further Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="recommendation_notes">Recommendation Notes</Label>
              <Textarea
                id="recommendation_notes"
                value={formData.recommendation_notes}
                onChange={(e) => handleInputChange('recommendation_notes', e.target.value)}
                placeholder="Detailed reasoning for recommendation..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Progress Inspection'}
          </Button>
        </div>
      </form>
    </div>
  );
};