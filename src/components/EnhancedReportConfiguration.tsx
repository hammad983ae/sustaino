import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Settings, 
  Users, 
  Shield, 
  Mail, 
  Ruler,
  Eye,
  EyeOff,
  Upload,
  Palette,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface SectionConfig {
  id: string;
  name: string;
  description: string;
  required: boolean;
  included: boolean;
  category: 'core' | 'optional' | 'supplementary';
}

interface ReportConfigurationState {
  // Document Management
  documentOrganization: string;
  ocrProcessing: boolean;
  evidenceQualityCheck: boolean;
  autoFileNaming: boolean;
  
  // Reporting Preferences
  measurementSystem: string;
  reportFormat: string;
  pageOrientation: string;
  colorScheme: string;
  fontFamily: string;
  fontSize: string;
  
  // Branding
  companyName: string;
  companyLogo: string;
  letterheadEnabled: boolean;
  brandingColors: {
    primary: string;
    secondary: string;
  };
  
  // Compliance & Standards
  professionalStandards: string[];
  regulatoryCompliance: string[];
  qualityAssurance: boolean;
  peerReview: boolean;
  
  // Client Communication
  deliveryMethod: string;
  reviewProcess: string;
  approvalWorkflow: boolean;
  clientNotifications: boolean;
  
  // Technical Specifications
  valuationMethodology: string[];
  riskAssessmentLevel: string;
  marketAnalysisDepth: string;
  
  // Section Configuration
  sections: SectionConfig[];
}

const EnhancedReportConfiguration: React.FC = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<ReportConfigurationState>({
    // Document Management defaults
    documentOrganization: 'chronological',
    ocrProcessing: true,
    evidenceQualityCheck: true,
    autoFileNaming: true,
    
    // Reporting Preferences defaults (metric preset)
    measurementSystem: 'metric',
    reportFormat: 'pdf',
    pageOrientation: 'portrait',
    colorScheme: 'professional',
    fontFamily: 'arial',
    fontSize: '11pt',
    
    // Branding defaults
    companyName: '',
    companyLogo: '',
    letterheadEnabled: false,
    brandingColors: {
      primary: '#1e40af',
      secondary: '#64748b'
    },
    
    // Compliance defaults
    professionalStandards: ['API'],
    regulatoryCompliance: ['APRA'],
    qualityAssurance: true,
    peerReview: false,
    
    // Client Communication defaults
    deliveryMethod: 'email',
    reviewProcess: 'standard',
    approvalWorkflow: false,
    clientNotifications: true,
    
    // Technical defaults
    valuationMethodology: ['Direct Comparison', 'Income Capitalization'],
    riskAssessmentLevel: 'comprehensive',
    marketAnalysisDepth: 'detailed',
    
    // Default sections
    sections: [
      // Core sections (required)
      { id: 'executive_summary', name: 'Executive Summary', description: 'High-level overview and conclusions', required: true, included: true, category: 'core' },
      { id: 'property_details', name: 'Property Details', description: 'Comprehensive property description', required: true, included: true, category: 'core' },
      { id: 'market_analysis', name: 'Market Analysis', description: 'Local market conditions and trends', required: true, included: true, category: 'core' },
      { id: 'valuation_methodology', name: 'Valuation Methodology', description: 'Approach and reasoning', required: true, included: true, category: 'core' },
      { id: 'valuation_conclusion', name: 'Valuation Conclusion', description: 'Final valuation and opinion', required: true, included: true, category: 'core' },
      
      // Optional sections
      { id: 'tenancy_schedule', name: 'Tenancy Schedule', description: 'Rental and lease details', required: false, included: true, category: 'optional' },
      { id: 'statutory_assessment', name: 'Statutory Assessment', description: 'Council rates and statutory charges', required: false, included: true, category: 'optional' },
      { id: 'environmental_assessment', name: 'Environmental Assessment', description: 'Environmental factors and sustainability', required: false, included: true, category: 'optional' },
      { id: 'risk_assessment', name: 'Risk Assessment', description: 'Property and market risk analysis', required: false, included: true, category: 'optional' },
      { id: 'comparable_sales', name: 'Comparable Sales Analysis', description: 'Recent sales evidence and analysis', required: false, included: true, category: 'optional' },
      
      // Supplementary sections
      { id: 'planning_analysis', name: 'Planning Analysis', description: 'Zoning and development potential', required: false, included: false, category: 'supplementary' },
      { id: 'esg_assessment', name: 'ESG Assessment', description: 'Environmental, Social & Governance factors', required: false, included: false, category: 'supplementary' },
      { id: 'insurance_valuation', name: 'Insurance Valuation', description: 'Replacement cost assessment', required: false, included: false, category: 'supplementary' },
      { id: 'legal_analysis', name: 'Legal Analysis', description: 'Title and legal considerations', required: false, included: false, category: 'supplementary' },
      { id: 'financial_analysis', name: 'Financial Analysis', description: 'Investment returns and cash flow', required: false, included: false, category: 'supplementary' }
    ]
  });

  const updateConfig = (path: string, value: any) => {
    setConfig(prev => {
      const keys = path.split('.');
      const newConfig = { ...prev };
      let current: any = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newConfig;
    });
  };

  const toggleSection = (sectionId: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { ...section, included: !section.included }
          : section
      )
    }));
  };

  const saveConfiguration = () => {
    toast({
      title: "Configuration Saved",
      description: "Your report configuration has been saved successfully",
    });
  };

  const getSectionsByCategory = (category: 'core' | 'optional' | 'supplementary') => {
    return config.sections.filter(section => section.category === category);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="document" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="document" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Reporting
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Communication
          </TabsTrigger>
          <TabsTrigger value="sections" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Sections
          </TabsTrigger>
        </TabsList>

        {/* Document Management Tab */}
        <TabsContent value="document">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Document Organization</Label>
                  <Select 
                    value={config.documentOrganization} 
                    onValueChange={(value) => updateConfig('documentOrganization', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chronological">Chronological Order</SelectItem>
                      <SelectItem value="document_type">By Document Type</SelectItem>
                      <SelectItem value="property_section">By Property Section</SelectItem>
                      <SelectItem value="importance">By Importance Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>OCR Processing</Label>
                    <Switch
                      checked={config.ocrProcessing}
                      onCheckedChange={(checked) => updateConfig('ocrProcessing', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Evidence Quality Check</Label>
                    <Switch
                      checked={config.evidenceQualityCheck}
                      onCheckedChange={(checked) => updateConfig('evidenceQualityCheck', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Auto File Naming</Label>
                    <Switch
                      checked={config.autoFileNaming}
                      onCheckedChange={(checked) => updateConfig('autoFileNaming', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reporting Preferences Tab */}
        <TabsContent value="reporting">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Reporting Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Measurement System</Label>
                  <Select 
                    value={config.measurementSystem} 
                    onValueChange={(value) => updateConfig('measurementSystem', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (Preset) 🌍</SelectItem>
                      <SelectItem value="imperial">Imperial</SelectItem>
                      <SelectItem value="both">Both Systems</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Report Format</Label>
                  <Select 
                    value={config.reportFormat} 
                    onValueChange={(value) => updateConfig('reportFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="word">Microsoft Word</SelectItem>
                      <SelectItem value="both">PDF + Word</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Page Orientation</Label>
                  <Select 
                    value={config.pageOrientation} 
                    onValueChange={(value) => updateConfig('pageOrientation', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                      <SelectItem value="mixed">Mixed (Auto)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <Select 
                    value={config.colorScheme} 
                    onValueChange={(value) => updateConfig('colorScheme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select 
                    value={config.fontFamily} 
                    onValueChange={(value) => updateConfig('fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="calibri">Calibri</SelectItem>
                      <SelectItem value="times">Times New Roman</SelectItem>
                      <SelectItem value="helvetica">Helvetica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select 
                    value={config.fontSize} 
                    onValueChange={(value) => updateConfig('fontSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10pt">10pt</SelectItem>
                      <SelectItem value="11pt">11pt</SelectItem>
                      <SelectItem value="12pt">12pt</SelectItem>
                      <SelectItem value="14pt">14pt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Branding & Letterhead
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={config.companyName}
                    onChange={(e) => updateConfig('companyName', e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={config.companyLogo}
                      onChange={(e) => updateConfig('companyLogo', e.target.value)}
                      placeholder="Logo URL or path"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Custom Letterhead</Label>
                <Switch
                  checked={config.letterheadEnabled}
                  onCheckedChange={(checked) => updateConfig('letterheadEnabled', checked)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Brand Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={config.brandingColors.primary}
                      onChange={(e) => updateConfig('brandingColors.primary', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={config.brandingColors.primary}
                      onChange={(e) => updateConfig('brandingColors.primary', e.target.value)}
                      placeholder="#1e40af"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Secondary Brand Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={config.brandingColors.secondary}
                      onChange={(e) => updateConfig('brandingColors.secondary', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={config.brandingColors.secondary}
                      onChange={(e) => updateConfig('brandingColors.secondary', e.target.value)}
                      placeholder="#64748b"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compliance & Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Professional Standards</Label>
                  <div className="space-y-2">
                    {['API', 'RICS', 'AIVLE', 'PINZ'].map((standard) => (
                      <div key={standard} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={config.professionalStandards.includes(standard)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const current = config.professionalStandards;
                            const updated = checked 
                              ? [...current, standard]
                              : current.filter(s => s !== standard);
                            updateConfig('professionalStandards', updated);
                          }}
                        />
                        <Label className="text-sm">{standard}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Regulatory Compliance</Label>
                  <div className="space-y-2">
                    {['APRA', 'ASIC', 'ATO', 'Banking Standards'].map((regulation) => (
                      <div key={regulation} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={config.regulatoryCompliance.includes(regulation)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const current = config.regulatoryCompliance;
                            const updated = checked 
                              ? [...current, regulation]
                              : current.filter(r => r !== regulation);
                            updateConfig('regulatoryCompliance', updated);
                          }}
                        />
                        <Label className="text-sm">{regulation}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Quality Assurance Review</Label>
                  <Switch
                    checked={config.qualityAssurance}
                    onCheckedChange={(checked) => updateConfig('qualityAssurance', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Peer Review Process</Label>
                  <Switch
                    checked={config.peerReview}
                    onCheckedChange={(checked) => updateConfig('peerReview', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Client Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Delivery Method</Label>
                  <Select 
                    value={config.deliveryMethod} 
                    onValueChange={(value) => updateConfig('deliveryMethod', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Delivery</SelectItem>
                      <SelectItem value="secure_portal">Secure Portal</SelectItem>
                      <SelectItem value="both">Email + Portal</SelectItem>
                      <SelectItem value="physical">Physical Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Review Process</Label>
                  <Select 
                    value={config.reviewProcess} 
                    onValueChange={(value) => updateConfig('reviewProcess', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Review</SelectItem>
                      <SelectItem value="expedited">Expedited Review</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive Review</SelectItem>
                      <SelectItem value="peer_review">Peer Review Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Approval Workflow</Label>
                  <Switch
                    checked={config.approvalWorkflow}
                    onCheckedChange={(checked) => updateConfig('approvalWorkflow', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Client Notifications</Label>
                  <Switch
                    checked={config.clientNotifications}
                    onCheckedChange={(checked) => updateConfig('clientNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sections Tab */}
        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Report Sections Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Core Sections */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold">Core Sections (Required)</h3>
                </div>
                <div className="space-y-3">
                  {getSectionsByCategory('core').map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Required</Badge>
                          <h4 className="font-medium">{section.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Included</Badge>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Optional Sections */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Optional Sections</h3>
                </div>
                <div className="space-y-3">
                  {getSectionsByCategory('optional').map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Optional</Badge>
                          <h4 className="font-medium">{section.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={section.included}
                          onCheckedChange={() => toggleSection(section.id)}
                        />
                        {section.included ? (
                          <Eye className="h-4 w-4 text-blue-600" />
                        ) : (
                          <div className="flex items-center gap-1">
                            <EyeOff className="h-4 w-4 text-gray-400" />
                            <Badge variant="secondary" className="text-xs">Not Applicable</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Supplementary Sections */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold">Supplementary Sections</h3>
                </div>
                <div className="space-y-3">
                  {getSectionsByCategory('supplementary').map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Supplementary</Badge>
                          <h4 className="font-medium">{section.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={section.included}
                          onCheckedChange={() => toggleSection(section.id)}
                        />
                        {section.included ? (
                          <Eye className="h-4 w-4 text-orange-600" />
                        ) : (
                          <div className="flex items-center gap-1">
                            <EyeOff className="h-4 w-4 text-gray-400" />
                            <Badge variant="secondary" className="text-xs">Not Applicable</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Note:</strong> Sections marked as excluded will display "Not Applicable" in the final report. 
                  Core sections are always included and cannot be disabled.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Configuration */}
      <div className="flex justify-end">
        <Button onClick={saveConfiguration} className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default EnhancedReportConfiguration;