import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MapPin, FileText, User, AlertTriangle, Shield, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useReportData } from "@/contexts/ReportDataContext";

const ValuationCertificate = () => {
  const { reportData } = useReportData();
  const [includePropertyId, setIncludePropertyId] = useState(true);
  const [includeValuationDetails, setIncludeValuationDetails] = useState(true);
  const [includeProfessionalCert, setIncludeProfessionalCert] = useState(true);
  const [includeValuationSummary, setIncludeValuationSummary] = useState(true);
  const [includeCertificationStatement, setIncludeCertificationStatement] = useState(true);
  const [includeLimitations, setIncludeLimitations] = useState(true);
  const [includeDisclaimers, setIncludeDisclaimers] = useState(true);
  
  // Pre-populated data from Property Assessment Form
  const [prePopulatedData, setPrePopulatedData] = useState({
    valueComponent: '',
    valuationBasis: '',
    interestValues: '',
    propertyType: '',
    propertyAddress: '',
    purposeOfValuation: '',
    mortgageSecurity: ''
  });

  // Update pre-populated data when report config changes
  useEffect(() => {
    console.log('Updating valuation certificate pre-populated data from:', reportData);
    
    if (reportData.reportConfig || reportData.valuationCertificate) {
      const config = reportData.reportConfig || {};
      const certificate = reportData.valuationCertificate || {};
      
      setPrePopulatedData({
        // Use certificate data first, then config data, then array values
        valueComponent: certificate.valueComponent || 
                      config.valueComponent || 
                      (Array.isArray(config['Value Component']) ? config['Value Component'].join(', ') : config['Value Component']) || '',
        
        valuationBasis: certificate.valuationBasis || 
                       config.valuationBasis || 
                       (Array.isArray(config['Basis of Valuation']) ? config['Basis of Valuation'].join(', ') : config['Basis of Valuation']) || '',
        
        interestValues: certificate.interestValues || 
                       config.interestValues || 
                       (Array.isArray(config['Interest Values']) ? config['Interest Values'].join(', ') : config['Interest Values']) || '',
        
        propertyType: certificate.propertyType || 
                     config.propertyType || 
                     config['property-type'] || '',
        
        propertyAddress: certificate.propertyAddress || 
                        reportData.propertySearchData?.confirmedAddress || 
                        reportData.propertySearchData?.address || 
                        reportData.propertySearchData?.propertyAddress || '',
        
        purposeOfValuation: certificate.purposeOfValuation || 
                           config.purposeOfValuation || 
                           (Array.isArray(config['Valuation Purpose']) ? config['Valuation Purpose'].join(', ') : config['Valuation Purpose']) || '',
        
        mortgageSecurity: certificate.mortgageSecurity || 
                         config.mortgageSecurity || 'To be assessed'
      });
    }
  }, [reportData.reportConfig, reportData.propertySearchData, reportData.valuationCertificate]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight">VALUATION CERTIFICATE</CardTitle>
          <p className="text-muted-foreground">This certificate confirms the valuation details and professional compliance</p>
        </CardHeader>
      </Card>

      {/* Property Identification */}
      {includePropertyId && (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Property Identification
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-property-id" className="text-sm">Include</Label>
              <Switch 
                id="include-property-id" 
                checked={includePropertyId}
                onCheckedChange={setIncludePropertyId}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Pre-populated from platform</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="property-address">Property Address</Label>
              <Textarea
                id="property-address"
                value={prePopulatedData.propertyAddress || "Complete property address will be auto-populated..."}
                className="min-h-[100px] bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">✅ Pre-filled from Property Assessment Form</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title-reference">Title Reference</Label>
              <Input
                id="title-reference"
                placeholder="Auto-populated from title data..."
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from title data</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-type">Property Type</Label>
              <Input
                id="property-type"
                value={prePopulatedData.propertyType || "Auto-populated from property classification..."}
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">✅ Pre-filled from Property Assessment Form</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest-valued">Interest Valued</Label>
              <Input
                id="interest-valued"
                value={prePopulatedData.interestValues || "Auto-populated from title data..."}
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">✅ Pre-filled from Property Assessment Form</p>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Valuation Details */}
      {includeValuationDetails && (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Valuation Details
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-valuation-details" className="text-sm">Include</Label>
              <Switch 
                id="include-valuation-details" 
                checked={includeValuationDetails}
                onCheckedChange={setIncludeValuationDetails}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Pre-populated from platform</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="purpose-valuation">Purpose of Valuation</Label>
              <Input
                id="purpose-valuation"
                value={prePopulatedData.purposeOfValuation || prePopulatedData.valuationBasis || "Auto-populated from valuation instructions..."}
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">✅ Pre-filled from Property Assessment Form</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value-component">Value Component</Label>
              <Input
                id="value-component"
                value={prePopulatedData.valueComponent || "Auto-populated from assessment..."}
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">✅ Pre-filled from Property Assessment Form</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mortgage-security">Mortgage Security</Label>
              <Input
                id="mortgage-security"
                value={prePopulatedData.mortgageSecurity || "Auto-populated from security assessment..."}
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">✅ Pre-filled from Property Assessment Form</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="valuation-date">Date of Valuation</Label>
              <Input
                id="valuation-date"
                type="date"
                placeholder="dd/mm/yyyy"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from valuation data</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspection-date">Date of Inspection</Label>
              <Input
                id="inspection-date"
                type="date"
                placeholder="dd/mm/yyyy"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from inspection data</p>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Professional Certification */}
      {includeProfessionalCert && (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Professional Certification
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-professional-cert" className="text-sm">Include</Label>
              <Switch 
                id="include-professional-cert" 
                checked={includeProfessionalCert}
                onCheckedChange={setIncludeProfessionalCert}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Pre-populated from platform</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="valuer-name">Valuer Name</Label>
              <Input
                id="valuer-name"
                placeholder="Enter qualified valuer name"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from valuer profile</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Professional Qualification</Label>
              <Input
                id="qualification"
                placeholder="e.g., Certified Practising Valuer (CPV)"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from valuer profile</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                placeholder="Enter professional registration number"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from valuer profile</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="firm">Valuation Firm</Label>
              <Input
                id="firm"
                placeholder="Enter firm/company name"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from firm profile</p>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Valuation Summary */}
      {includeValuationSummary && (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Valuation Summary
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-valuation-summary" className="text-sm">Include</Label>
              <Switch 
                id="include-valuation-summary" 
                checked={includeValuationSummary}
                onCheckedChange={setIncludeValuationSummary}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Pre-populated from platform</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-medium text-foreground">Interest Valued</Label>
                <span className="text-xs text-blue-600 dark:text-blue-400">[Pre-populated from platform]</span>
              </div>
              <Input 
                value={prePopulatedData.interestValues || "Freehold"} 
                className="bg-white dark:bg-gray-800" 
                readOnly 
              />
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-medium text-foreground">Value Component</Label>
                <span className="text-xs text-blue-600 dark:text-blue-400">[Pre-populated from platform]</span>
              </div>
              <Input 
                value={prePopulatedData.valueComponent || "Market Value"} 
                className="bg-white dark:bg-gray-800" 
                readOnly 
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-medium text-foreground">Highest and Best Use</Label>
                <span className="text-xs text-blue-600 dark:text-blue-400">[Pre-populated from platform]</span>
              </div>
              <Input 
                value="Current Use" 
                className="bg-white dark:bg-gray-800" 
                readOnly 
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-medium text-foreground">Currency of Valuation</Label>
                <span className="text-xs text-blue-600 dark:text-blue-400">[Pre-populated from platform]</span>
              </div>
              <Input 
                value="AUD" 
                className="bg-white dark:bg-gray-800" 
                readOnly 
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-medium text-foreground">GST Treatment</Label>
                <span className="text-xs text-blue-600 dark:text-blue-400">[Pre-populated from platform]</span>
              </div>
              <Input 
                value="Exclusive" 
                className="bg-white dark:bg-gray-800" 
                readOnly 
              />
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-medium text-green-800 dark:text-green-200">Market Value</Label>
                <span className="text-xs text-green-600 dark:text-green-400">[Pre-populated from platform]</span>
              </div>
              <Input 
                value="$XXX,XXX" 
                className="bg-white dark:bg-gray-800 font-bold" 
                readOnly 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Certification Statement */}
      {includeCertificationStatement && (
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Certification Statement</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-certification" className="text-sm">Include</Label>
              <Switch 
                id="include-certification" 
                checked={includeCertificationStatement}
                onCheckedChange={setIncludeCertificationStatement}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="font-medium mb-3">I certify that:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                This valuation has been prepared in accordance with the relevant Australian Property Institute (API) Professional Practice Standards
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                The valuation represents my unbiased professional opinion of the market value of the subject property
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                I have personally inspected the property and am satisfied with the extent of the inspection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                I have no pecuniary interest in the subject property that could affect the valuation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                The valuation is current as at the date of valuation specified above
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                I am appropriately qualified and experienced to undertake this valuation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                I have complied with all applicable professional and ethical standards
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Limitations and Assumptions */}
      {includeLimitations && (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Limitations and Assumptions</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-limitations" className="text-sm">Include</Label>
              <Switch 
                id="include-limitations" 
                checked={includeLimitations}
                onCheckedChange={setIncludeLimitations}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter any specific limitations, assumptions, or conditions that apply to this valuation..."
            className="min-h-[120px]"
          />
        </CardContent>
      </Card>
      )}

      {/* Important Disclaimers */}
      {includeDisclaimers && (
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-5 w-5" />
              Important Disclaimers
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-disclaimers" className="text-sm">Include</Label>
              <Switch 
                id="include-disclaimers" 
                checked={includeDisclaimers}
                onCheckedChange={setIncludeDisclaimers}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-200">Market Movement:</p>
              <p className="text-amber-700 dark:text-amber-300">This valuation is current at the date of valuation only. Property values may change significantly over short periods due to market movements.</p>
            </div>
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-200">Limited Liability:</p>
              <p className="text-amber-700 dark:text-amber-300">Our liability is limited in accordance with our Professional Indemnity insurance and applicable professional standards legislation.</p>
            </div>
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-200">Use Limitations:</p>
              <p className="text-amber-700 dark:text-amber-300">This valuation is prepared for the specific purpose stated and should not be used for any other purpose without written consent.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  );
};

export default ValuationCertificate;