import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Building, Calculator, Save, Loader2 } from "lucide-react";
import { useUniversalSave } from "@/hooks/useUniversalSave";
import { useToast } from "@/hooks/use-toast";
import AddressVerificationService from "./AddressVerificationService";
import DataSourcesConfig from "./DataSourcesConfig";
import AutoPopulationService from "./AutoPopulationService";
import DocumentUploadAnalyzer from "./DocumentUploadAnalyzer";
import DevelopmentProposalGenerator from "./DevelopmentProposalGenerator";

interface SiteData {
  address: string;
  lotNumber: string;
  planNumber: string;
  landArea: number;
  currentZoning: string;
  proposedZoning: string;
  fsr: number;
  proposedGFA: number;
  estimatedUnits: number;
  hdaSupport: boolean;
  ssdaApproval: boolean;
  heightLimit: number;
  state: string;
  council: string;
  description: string;
  valuationPurpose: string;
  valuationDate: string;
  clientName: string;
  clientCompany: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  autoPopulated?: boolean;
  extractedDocumentData?: any;
}

interface SiteDetailsFormProps {
  onSiteDataChange: (data: SiteData) => void;
}

export default function SiteDetailsForm({ onSiteDataChange }: SiteDetailsFormProps) {
  const [siteData, setSiteData] = useState<SiteData>({
    address: '',
    lotNumber: '',
    planNumber: '',
    landArea: 0,
    currentZoning: '',
    proposedZoning: '',
    fsr: 0,
    proposedGFA: 0,
    estimatedUnits: 0,
    hdaSupport: false,
    ssdaApproval: false,
    heightLimit: 0,
    state: 'VIC',
    council: '',
    description: '',
    valuationPurpose: '',
    valuationDate: new Date().toISOString().split('T')[0],
    clientName: '',
    clientCompany: '',
    autoPopulated: false
  });

  const [addressVerified, setAddressVerified] = useState(false);
  const [verifiedAddressData, setVerifiedAddressData] = useState<any>(null);
  const [enabledDataSources, setEnabledDataSources] = useState<any[]>([]);
  
  // Save system implementation
  const { saveData, loadData, isSaving } = useUniversalSave('development-site-details');
  const { toast } = useToast();

  // Auto-save functionality
  useEffect(() => {
    const autoSave = async () => {
      if (siteData.address || siteData.clientName || siteData.description) {
        try {
          await saveData(siteData);
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    };

    const debounceTimer = setTimeout(autoSave, 2000);
    return () => clearTimeout(debounceTimer);
  }, [siteData, saveData]);

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await loadData();
        if (savedData && savedData.address) {
          const typedData = savedData as SiteData;
          setSiteData(typedData);
          onSiteDataChange(typedData);
          toast({
            title: "Data Loaded",
            description: "Previously saved site details have been restored.",
          });
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    };

    loadSavedData();
  }, [loadData, onSiteDataChange, toast]);

  const handleInputChange = (field: keyof SiteData, value: any) => {
    const updatedData = { ...siteData, [field]: value };
    setSiteData(updatedData);
    onSiteDataChange(updatedData);
  };

  const handleManualSave = async () => {
    try {
      await saveData(siteData);
      toast({
        title: "Data Saved",
        description: "Site details have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save site details. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddressVerified = (addressData: any) => {
    setAddressVerified(true);
    setVerifiedAddressData(addressData);
    
    // Update site data with verified address information
    const updatedData = {
      ...siteData,
      address: addressData.fullAddress,
      lotNumber: addressData.lotNumber,
      planNumber: addressData.planNumber,
      landArea: addressData.landArea,
      currentZoning: addressData.zoning,
      state: addressData.state,
      council: addressData.council,
      coordinates: addressData.coordinates
    };
    
    setSiteData(updatedData);
    onSiteDataChange(updatedData);
  };

  const handleDataPopulated = (populatedData: any) => {
    console.log('handleDataPopulated called with:', populatedData);
    const updatedData = { ...siteData };
    
    // Merge populated data
    if (populatedData['planning-data']) {
      const planningData = populatedData['planning-data'];
      console.log('Planning data:', planningData);
      updatedData.currentZoning = planningData.currentZoning;
      updatedData.heightLimit = planningData.heightLimit;
      updatedData.fsr = planningData.floorSpaceRatio;
    }
    
    if (populatedData['title-data']) {
      const titleData = populatedData['title-data'];
      console.log('Title data:', titleData);
      updatedData.lotNumber = titleData.lotNumber;
      updatedData.planNumber = titleData.planNumber;
      updatedData.landArea = titleData.landArea;
    }
    
    if (populatedData['council-data']) {
      const councilData = populatedData['council-data'];
      console.log('Council data:', councilData);
      updatedData.council = councilData.localGovernmentArea;
    }
    
    if (populatedData['development-data']) {
      const devData = populatedData['development-data'];
      console.log('Development data:', devData);
      updatedData.proposedGFA = devData.developmentPotential.maximumGFA;
      updatedData.estimatedUnits = devData.developmentPotential.estimatedUnits;
    }
    
    updatedData.autoPopulated = true;
    console.log('Updated site data:', updatedData);
    setSiteData(updatedData);
    onSiteDataChange(updatedData);
    
    // Show toast to confirm data update
    toast({
      title: "Site Information Updated",
      description: "Auto-populated data has been applied to the form fields.",
    });
  };

  const handleProposalGenerated = (proposal: any) => {
    // Optional: Handle the generated proposal data
    console.log('Development proposal generated:', proposal);
  };

  const handleFieldsUpdated = (updates: Partial<SiteData>) => {
    const updatedData = { ...siteData, ...updates };
    setSiteData(updatedData);
    onSiteDataChange(updatedData);
  };

  const handleDocumentDataExtracted = (extractedData: any) => {
    const updatedData = { ...siteData };
    
    // Merge extracted property details
    if (extractedData.propertyDetails) {
      const propDetails = extractedData.propertyDetails;
      if (propDetails.address && !updatedData.address) updatedData.address = propDetails.address;
      if (propDetails.landArea && !updatedData.landArea) updatedData.landArea = propDetails.landArea;
      if (propDetails.zoning && !updatedData.currentZoning) updatedData.currentZoning = propDetails.zoning;
      if (propDetails.lotNumber && !updatedData.lotNumber) updatedData.lotNumber = propDetails.lotNumber;
      if (propDetails.planNumber && !updatedData.planNumber) updatedData.planNumber = propDetails.planNumber;
      if (propDetails.council && !updatedData.council) updatedData.council = propDetails.council;
    }
    
    // Store the extracted document data for use in highest and best use analysis
    updatedData.extractedDocumentData = extractedData;
    
    setSiteData(updatedData);
    onSiteDataChange(updatedData);
  };

  return (
    <div className="space-y-6">
      {/* Document Upload & Analysis */}
      <DocumentUploadAnalyzer 
        onDataExtracted={handleDocumentDataExtracted}
      />

      {/* Address Verification */}
      <AddressVerificationService 
        onAddressVerified={handleAddressVerified}
        initialAddress={siteData.address}
      />

      {/* Data Sources Configuration */}
      <DataSourcesConfig 
        selectedState={siteData.state}
        onSourcesChange={setEnabledDataSources}
      />

      {/* Auto-Population Service */}
      <AutoPopulationService
        addressData={verifiedAddressData}
        selectedState={siteData.state}
        enabledSources={enabledDataSources}
        onDataPopulated={handleDataPopulated}
      />

      {/* Valuation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Valuation Details
            </div>
            <Button onClick={handleManualSave} disabled={isSaving} size="sm">
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Data
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="valuationPurpose">Purpose of Valuation</Label>
              <Select 
                value={siteData.valuationPurpose} 
                onValueChange={(value) => {
                  console.log('Purpose of valuation changed to:', value);
                  handleInputChange('valuationPurpose', value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select valuation purpose" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  <SelectItem value="development-feasibility">Development Feasibility</SelectItem>
                  <SelectItem value="mortgage-security">Mortgage/Security Purposes</SelectItem>
                  <SelectItem value="sale-purchase">Sale/Purchase</SelectItem>
                  <SelectItem value="investment-analysis">Investment Analysis</SelectItem>
                  <SelectItem value="compulsory-acquisition">Compulsory Acquisition</SelectItem>
                  <SelectItem value="insurance">Insurance Purposes</SelectItem>
                  <SelectItem value="financial-reporting">Financial Reporting</SelectItem>
                  <SelectItem value="litigation-support">Litigation Support</SelectItem>
                  <SelectItem value="lease-negotiations">Lease Negotiations</SelectItem>
                  <SelectItem value="family-law">Family Law/Matrimonial</SelectItem>
                  <SelectItem value="taxation">Taxation Purposes</SelectItem>
                  <SelectItem value="stamp-duty">Stamp Duty Assessment</SelectItem>
                  <SelectItem value="capital-gains-tax">Capital Gains Tax</SelectItem>
                  <SelectItem value="estate-planning">Estate Planning</SelectItem>
                  <SelectItem value="partnership-dissolution">Partnership Dissolution</SelectItem>
                  <SelectItem value="joint-venture">Joint Venture</SelectItem>
                  <SelectItem value="refinancing">Refinancing</SelectItem>
                  <SelectItem value="restructuring">Corporate Restructuring</SelectItem>
                  <SelectItem value="acquisition-due-diligence">Acquisition Due Diligence</SelectItem>
                  <SelectItem value="asset-management">Asset Management</SelectItem>
                  <SelectItem value="portfolio-management">Portfolio Management</SelectItem>
                  <SelectItem value="fund-management">Fund Management</SelectItem>
                  <SelectItem value="rei-listing">REIT Listing</SelectItem>
                  <SelectItem value="going-concern">Going Concern</SelectItem>
                  <SelectItem value="liquidation">Liquidation/Forced Sale</SelectItem>
                  <SelectItem value="rental-determination">Rental Determination</SelectItem>
                  <SelectItem value="rent-review">Rent Review</SelectItem>
                  <SelectItem value="lease-renewal">Lease Renewal</SelectItem>
                  <SelectItem value="arbitration">Arbitration</SelectItem>
                  <SelectItem value="expert-determination">Expert Determination</SelectItem>
                  <SelectItem value="compensation">Compensation Assessment</SelectItem>
                  <SelectItem value="infrastructure-funding">Infrastructure Funding</SelectItem>
                  <SelectItem value="development-contributions">Development Contributions</SelectItem>
                  <SelectItem value="heritage-listing">Heritage Listing Impact</SelectItem>
                  <SelectItem value="contamination-impact">Contamination Impact</SelectItem>
                  <SelectItem value="native-title">Native Title</SelectItem>
                  <SelectItem value="crown-land">Crown Land Assessment</SelectItem>
                  <SelectItem value="government-acquisition">Government Acquisition</SelectItem>
                  <SelectItem value="utility-easement">Utility Easement</SelectItem>
                  <SelectItem value="road-widening">Road Widening</SelectItem>
                  <SelectItem value="resumption">Resumption</SelectItem>
                  <SelectItem value="rating-objection">Rating Objection</SelectItem>
                  <SelectItem value="land-tax">Land Tax Assessment</SelectItem>
                  <SelectItem value="council-rates">Council Rates Objection</SelectItem>
                  <SelectItem value="highest-best-use">Highest and Best Use</SelectItem>
                  <SelectItem value="market-value">Market Value Assessment</SelectItem>
                  <SelectItem value="fair-value">Fair Value (AASB 13)</SelectItem>
                  <SelectItem value="depreciated-replacement-cost">Depreciated Replacement Cost</SelectItem>
                  <SelectItem value="existing-use-value">Existing Use Value</SelectItem>
                  <SelectItem value="special-value">Special Value</SelectItem>
                  <SelectItem value="synergistic-value">Synergistic Value</SelectItem>
                  <SelectItem value="investment-value">Investment Value</SelectItem>
                  <SelectItem value="mortgagee-sale">Mortgagee in Possession Sale</SelectItem>
                  <SelectItem value="court-ordered-sale">Court Ordered Sale</SelectItem>
                  <SelectItem value="deceased-estate">Deceased Estate</SelectItem>
                  <SelectItem value="probate">Probate Valuation</SelectItem>
                  <SelectItem value="charitable-purpose">Charitable Purpose</SelectItem>
                  <SelectItem value="education-facility">Educational Facility</SelectItem>
                  <SelectItem value="religious-facility">Religious Facility</SelectItem>
                  <SelectItem value="community-facility">Community Facility</SelectItem>
                  <SelectItem value="social-housing">Social Housing</SelectItem>
                  <SelectItem value="affordable-housing">Affordable Housing</SelectItem>
                  <SelectItem value="build-to-rent">Build to Rent</SelectItem>
                  <SelectItem value="student-accommodation">Student Accommodation</SelectItem>
                  <SelectItem value="aged-care">Aged Care Facility</SelectItem>
                  <SelectItem value="childcare">Childcare Facility</SelectItem>
                  <SelectItem value="medical-facility">Medical Facility</SelectItem>
                  <SelectItem value="other">Other (Please Specify)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="valuationDate">Valuation Date</Label>
              <Input
                id="valuationDate"
                type="date"
                value={siteData.valuationDate}
                onChange={(e) => handleInputChange('valuationDate', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={siteData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            <div>
              <Label htmlFor="clientCompany">Client Company</Label>
              <Input
                id="clientCompany"
                value={siteData.clientCompany}
                onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                placeholder="Enter company name (if applicable)"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Site Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Site Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="address">Property Address</Label>
              <Input
                id="address"
                value={siteData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter property address"
              />
            </div>
            
            <div>
              <Label htmlFor="landArea">Land Area (sqm)</Label>
              <Input
                id="landArea"
                type="number"
                value={siteData.landArea || ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? 0 : Number(e.target.value);
                  handleInputChange('landArea', value);
                }}
                placeholder="Enter land area in square meters"
              />
            </div>
            
            <div>
              <Label htmlFor="state">State</Label>
              <Select value={siteData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">NSW</SelectItem>
                  <SelectItem value="VIC">VIC</SelectItem>
                  <SelectItem value="QLD">QLD</SelectItem>
                  <SelectItem value="SA">SA</SelectItem>
                  <SelectItem value="WA">WA</SelectItem>
                  <SelectItem value="TAS">TAS</SelectItem>
                  <SelectItem value="NT">NT</SelectItem>
                  <SelectItem value="ACT">ACT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="council">Local Council</Label>
              <Input
                id="council"
                value={siteData.council || ''}
                onChange={(e) => handleInputChange('council', e.target.value)}
                placeholder="Enter local council name"
              />
            </div>
            
            <div>
              <Label htmlFor="currentZoning">Current Zoning</Label>
              <Input
                id="currentZoning"
                value={siteData.currentZoning || ''}
                onChange={(e) => handleInputChange('currentZoning', e.target.value)}
                placeholder="Enter current zoning classification"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Development Proposal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Development Proposal Generator */}
          <DevelopmentProposalGenerator
            siteData={siteData}
            onProposalGenerated={handleProposalGenerated}
            onFieldsUpdated={handleFieldsUpdated}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="proposedZoning">Proposed Zoning</Label>
              <Input
                id="proposedZoning"
                value={siteData.proposedZoning}
                onChange={(e) => handleInputChange('proposedZoning', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="fsr">Floor Space Ratio</Label>
              <Input
                id="fsr"
                type="number"
                step="0.1"
                value={siteData.fsr}
                onChange={(e) => handleInputChange('fsr', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="heightLimit">Height Limit (m)</Label>
              <Input
                id="heightLimit"
                type="number"
                value={siteData.heightLimit}
                onChange={(e) => handleInputChange('heightLimit', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="proposedGFA">Proposed GFA (sqm)</Label>
              <Input
                id="proposedGFA"
                type="number"
                value={siteData.proposedGFA}
                onChange={(e) => handleInputChange('proposedGFA', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="estimatedUnits">Estimated Units</Label>
              <Input
                id="estimatedUnits"
                type="number"
                value={siteData.estimatedUnits}
                onChange={(e) => handleInputChange('estimatedUnits', Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hdaSupport"
                checked={siteData.hdaSupport}
                onCheckedChange={(checked) => handleInputChange('hdaSupport', checked)}
              />
              <Label htmlFor="hdaSupport">Housing Delivery Authority (HDA) Support</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ssdaApproval"
                checked={siteData.ssdaApproval}
                onCheckedChange={(checked) => handleInputChange('ssdaApproval', checked)}
              />
              <Label htmlFor="ssdaApproval">State Significant Development Assessment (SSDA) Approval</Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Development Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={siteData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}