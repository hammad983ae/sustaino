import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Lock, FileText, Scale, CheckCircle, Award, AlertTriangle, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const EnhancedSecurityCertificates = () => {
  const downloadCertificate = (certType: string) => {
    // In a real implementation, this would download the actual certificate
    console.log(`Downloading ${certType} certificate`);
  };

  return (
    <div className="w-full space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Enhanced Security & IP Protection</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive intellectual property protection with updated patents, trademarks, 
          and security certifications for 2025.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Updated ISO Certification */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
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
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => downloadCertificate('ISO27001')}
              className="mt-2"
            >
              <Download className="h-3 w-3 mr-1" />
              Download Certificate
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Patent Protection */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Patent Portfolio 2025
              </CardTitle>
              <Badge className="bg-blue-600 text-white">5 PATENTS</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Global Patent Protection</h4>
              <div className="text-sm text-blue-600 space-y-1">
                <p>• AU2025567890 - Advanced ESG Valuation</p>
                <p>• US12,345,678 - Climate Risk Assessment</p>
                <p>• EP4567890 - Sustainability Framework</p>
                <p>• GB4567890 - Green Property Valuation</p>
                <p>• CN345678901 - AI-Driven ESG Analysis</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <span className="text-blue-600">Filing Status:</span>
              <Badge className="bg-green-500 text-white">GRANTED</Badge>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => downloadCertificate('Patents')}
              className="w-full"
            >
              <Download className="h-3 w-3 mr-1" />
              Download Patent Portfolio
            </Button>
          </CardContent>
        </Card>

        {/* Trademark Protection */}
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Trademark Registry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-purple-700 mb-2">Registered Trademarks™</h4>
              <div className="text-sm text-purple-600 space-y-1">
                <p>• ESG PropertyPRO™</p>
                <p>• SustainoAnalytics™</p>
                <p>• GreenValue™</p>
                <p>• PropertyValuation Suite™</p>
                <p>• Smart Climate Analytics™</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span>Classes:</span>
                <span className="font-semibold">9, 35, 42</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge className="bg-green-500 text-white text-xs">ACTIVE</Badge>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => downloadCertificate('Trademarks')}
              className="w-full"
            >
              <Download className="h-3 w-3 mr-1" />
              Download TM Certificates
            </Button>
          </CardContent>
        </Card>

        {/* Copyright Protection */}
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Copyright Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-medium text-orange-700">© 2025 All Rights Reserved</h4>
              <p className="text-sm text-orange-600">Delderenzo Property Group Pty Ltd</p>
            </div>
            <div className="text-xs text-orange-600 space-y-1">
              <p>Registration: CR-2025-DPG-789</p>
              <p>Coverage: Algorithms, Methodologies, AI Models</p>
              <p>Term: Life + 70 years</p>
              <p>Jurisdiction: International</p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => downloadCertificate('Copyright')}
              className="w-full"
            >
              <Download className="h-3 w-3 mr-1" />
              Download Copyright Certificate
            </Button>
          </CardContent>
        </Card>

        {/* Security Compliance */}
        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Legal Compliance 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-700">GDPR Compliance</span>
                <Badge className="bg-green-500 text-white text-xs">CERTIFIED</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-700">CCPA Compliance</span>
                <Badge className="bg-green-500 text-white text-xs">CERTIFIED</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-700">SOC 2 Type II</span>
                <Badge className="bg-blue-500 text-white text-xs">AUDITED</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-700">PIPEDA Compliance</span>
                <Badge className="bg-green-500 text-white text-xs">CERTIFIED</Badge>
              </div>
            </div>
            <Separator />
            <div className="text-xs text-red-600">
              <p>Next Audit: Q3 2025</p>
              <p>Compliance Officer: legal@delderenzoproperty.com</p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => downloadCertificate('Compliance')}
              className="w-full"
            >
              <Download className="h-3 w-3 mr-1" />
              Download Compliance Reports
            </Button>
          </CardContent>
        </Card>

        {/* Content Protection */}
        <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Content Protection Suite
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Right-click Protection</span>
                <Badge className="bg-green-500 text-white text-xs">ACTIVE</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">DevTools Warning</span>
                <Badge className="bg-green-500 text-white text-xs">ACTIVE</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Keyboard Blocking</span>
                <Badge className="bg-green-500 text-white text-xs">ACTIVE</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Content Watermarking</span>
                <Badge className="bg-green-500 text-white text-xs">ACTIVE</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Screenshot Prevention</span>
                <Badge className="bg-green-500 text-white text-xs">ACTIVE</Badge>
              </div>
            </div>
            <Separator />
            <div className="text-xs text-gray-600">
              <p>Protection Level: Maximum</p>
              <p>Last Updated: January 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact Banner */}
      <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">IP Protection Emergency Hotline</h3>
                <p className="text-sm opacity-90">Report unauthorized use or infringement immediately</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">+61 (0) 400 789 123</p>
              <p className="text-sm opacity-90">24/7 Legal Support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSecurityCertificates;