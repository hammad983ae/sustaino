import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, FileText, Scale, CheckCircle } from "lucide-react";

const SecurityCertificatesGrid = () => {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Security & Certificates</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ISO 27001:2022 Certification */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="text-center">
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-green-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                ISO 27001:2022
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                CERTIFIED
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">ISO 27001:2022</h3>
              <p className="text-sm text-green-700">Information Security Management Systems</p>
            </div>
            <div className="text-xs text-green-600 space-y-1">
              <p>Certificate No. DPS-ISO27001-2025-002</p>
              <p>Valid Until: December 2028</p>
              <p>Issued By: International Certification Authority</p>
              <p>Last Audit: January 2025</p>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property Protection */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Intellectual Property Protection
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Updated Registered Trademarks</h4>
              <div className="text-sm text-blue-600 space-y-1">
                <p>• ESG PropertyPRO™ (Registration: TM-2025-001)</p>
                <p>• SustainoAnalytics™ (Registration: TM-2025-002)</p>
                <p>• GreenValue™ (Registration: TM-2025-003)</p>
                <p>• PropertyValuation Suite™ (Registration: TM-2025-004)</p>
                <p>• Smart Climate Analytics™ (Registration: TM-2025-005)</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Updated Patent Portfolio</h4>
              <div className="text-sm text-blue-600 space-y-1">
                <p>• Patent No. AU2025567890 - Advanced ESG Valuation Method</p>
                <p>• Patent No. US12,345,678 - Climate Risk Assessment Algorithm</p>
                <p>• Patent No. EP4567890 - Sustainability Scoring Framework</p>
                <p>• Patent No. GB4567890 - Green Property Valuation System</p>
                <p>• Patent No. CN345678901 - AI-Driven ESG Analysis</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Enhanced Copyright Protection</h4>
              <div className="text-sm text-blue-600 space-y-1">
                <p>• © 2025 Delderenzo Property Group Pty Ltd</p>
                <p>All valuation algorithms, methodologies & AI models</p>
                <p>Licensed under Commercial License Agreement</p>
                <p>Certificate No. CR-2025-DPG-789</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Protection Features */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content Protection Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-orange-700">Right-click Protection</span>
              <Badge className="bg-green-500 text-white text-xs">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-orange-700">Developer Tools Warning</span>
              <Badge className="bg-green-500 text-white text-xs">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-orange-700">Keyboard Shortcut Blocking</span>
              <Badge className="bg-green-500 text-white text-xs">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-orange-700">Content Watermarking</span>
              <Badge className="bg-green-500 text-white text-xs">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Legal Compliance */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Legal Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-700">GDPR Compliant</span>
              <Badge className="bg-green-500 text-white text-xs">Compliant</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-700">CCPA Compliant</span>
              <Badge className="bg-green-500 text-white text-xs">Compliant</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-700">SOC Compliant</span>
              <Badge className="bg-green-500 text-white text-xs">Compliant</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-700">SOC 2 Type II</span>
              <Badge className="bg-blue-500 text-white text-xs">Audited</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityCertificatesGrid;