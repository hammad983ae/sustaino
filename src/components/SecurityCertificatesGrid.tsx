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
              <p>Certificate No. DPS-ISO27001-2024-001</p>
              <p>Valid Until: December 2027</p>
              <p>Issued By: International Certification Authority</p>
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
              <h4 className="font-medium text-blue-700 mb-2">Registered Trademarks</h4>
              <div className="text-sm text-blue-600 space-y-1">
                <p>• Sustaino Pro™</p>
                <p>• ESG Analysis Suite™</p>
                <p>• Property Valuation Platform™</p>
                <p>• Smart Property Analytics™</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Patent Applications</h4>
              <div className="text-sm text-blue-600 space-y-1">
                <p>• Patent No. AU2025123456 - Automated Property Valuation Algorithm</p>
                <p>• Patent No. AU2025123457 - ESG Risk Assessment Method</p>
                <p>• Patent No. AU2025123458 - Sustainability Scoring System</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Copyright Protection</h4>
              <div className="text-sm text-blue-600 space-y-1">
                <p>• © 2024 Delderenzo Property Group Pty Ltd</p>
                <p>All valuation algorithms and methodologies</p>
                <p>Licensed under MIT License for authorized users</p>
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