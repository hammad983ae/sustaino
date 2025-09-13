import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MapPin, FileText, User, AlertTriangle, Info } from "lucide-react";
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
  const [includePurposeOfValuation, setIncludePurposeOfValuation] = useState(true);
  
  // Pre-populated data from Property Assessment Form
  const [prePopulatedData, setPrePopulatedData] = useState({
    valueComponent: '',
    valuationBasis: '',
    interestValues: '',
    propertyType: ''
  });

  // Update pre-populated data when report config changes
  useEffect(() => {
    if (reportData.reportConfig) {
      setPrePopulatedData({
        valueComponent: reportData.reportConfig.valueComponent || '',
        valuationBasis: reportData.reportConfig.valuationBasis || '',
        interestValues: reportData.reportConfig.interestValues || '',
        propertyType: reportData.reportConfig.propertyType || ''
      });
    }
  }, [reportData.reportConfig]);
  
  // Individual valuation summary items
  const [summaryItems, setSummaryItems] = useState({
    interestValued: true,
    valueComponent: true,
    highestBestUse: true,
    sellingPeriod: true,
    currency: true,
    gstTreatment: true,
    marketValue: true,
    insuranceReplacement: false, // Default off for desktop valuations
    marketRentGrossResidential: false, // Default off for desktop valuations
    netRent: false, // Default off for desktop valuations
    netMarketRent: false, // Default off for desktop valuations
    forcedSaleRange: false, // Default off for desktop valuations
    totalGrossRealisation: false // Default off for desktop valuations
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight">VALUATION CERTIFICATE</CardTitle>
          <p className="text-muted-foreground">This certificate confirms the valuation details and professional compliance</p>
        </CardHeader>
      </Card>

      {/* Purpose of Valuation */}
      {includePurposeOfValuation && (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Purpose of Valuation
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-purpose-of-valuation" className="text-sm">Include</Label>
              <Switch 
                id="include-purpose-of-valuation" 
                checked={includePurposeOfValuation}
                onCheckedChange={setIncludePurposeOfValuation}
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
              <Label htmlFor="purpose-valuation">Purpose of Valuation</Label>
              <Input
                id="purpose-valuation"
                value={prePopulatedData.valuationBasis || "Auto-populated from valuation instructions..."}
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">✅ Pre-filled from Property Assessment Form</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mortgage-security">Mortgage Security</Label>
              <Input
                id="mortgage-security"
                placeholder="Auto-populated from security assessment..."
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from security assessment</p>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Automated vs Manual Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Certificate Generation Mode
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="auto-mode" className="text-sm">Manual</Label>
              <Switch id="auto-mode" />
              <Label htmlFor="auto-mode" className="text-sm">Automated</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Automated mode pre-populates fields from platform data. Manual mode allows custom input.
            </p>
          </div>
        </CardContent>
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
                placeholder="Complete property address will be auto-populated..."
                className="min-h-[100px] bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                readOnly
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from property data</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Automated Valuation Details */}
      {includeValuationSummary && (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Automated Valuation Summary</CardTitle>
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
          <div className="space-y-4">
            {[
              { key: "interestValued", label: "Interest Valued", enabled: summaryItems.interestValued },
              { key: "valueComponent", label: "Value Component", enabled: summaryItems.valueComponent },
              { key: "highestBestUse", label: "Highest and Best Use", enabled: summaryItems.highestBestUse },
              { key: "sellingPeriod", label: "Selling Period", enabled: summaryItems.sellingPeriod },
              { key: "currency", label: "Currency of Valuation", enabled: summaryItems.currency },
              { key: "gstTreatment", label: "GST Treatment", enabled: summaryItems.gstTreatment },
              { key: "marketValue", label: "Market Value", enabled: summaryItems.marketValue },
              { key: "insuranceReplacement", label: "Insurance Replacement Value", enabled: summaryItems.insuranceReplacement },
              { key: "marketRentGrossResidential", label: "Market Rent (Gross Residential)", enabled: summaryItems.marketRentGrossResidential },
              { key: "netRent", label: "Net Rent", enabled: summaryItems.netRent },
              { key: "netMarketRent", label: "Net Market Rent", enabled: summaryItems.netMarketRent },
              { key: "forcedSaleRange", label: "Forced Sale Range", enabled: summaryItems.forcedSaleRange },
              { key: "totalGrossRealisation", label: "Total Gross Realisation (BTR)", enabled: summaryItems.totalGrossRealisation }
            ].filter(item => item.enabled).map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <div className="flex items-center justify-between w-full">
                  <Label className="font-medium text-foreground">{item.label}</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground italic">[Pre-populated from platform]</span>
                    <Switch 
                      checked={summaryItems[item.key as keyof typeof summaryItems]}
                      onCheckedChange={(checked) => setSummaryItems(prev => ({...prev, [item.key]: checked}))}
                    />
                  </div>
                </div>
              </div>
            ))}
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