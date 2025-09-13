import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Hash, Award, Lock, AlertTriangle } from "lucide-react";

const ComprehensiveIPProtection = () => {
  return (
    <div className="space-y-4">
      {/* Main IP Protection Banner */}
      <Card className="w-full border-2 border-green-200 bg-green-50/50">
        <CardHeader className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-green-600" />
            <CardTitle className="text-2xl text-green-700">Intellectual Property Protection</CardTitle>
          </div>
          
          <div className="flex justify-center gap-3 flex-wrap">
            <Badge className="bg-green-600 text-white border-green-600 px-4 py-1">
              <Shield className="h-3 w-3 mr-1" />
              Copyright Protected
            </Badge>
            <Badge className="bg-blue-600 text-white border-blue-600 px-4 py-1">
              <Award className="h-3 w-3 mr-1" />
              Patents Granted
            </Badge>
            <Badge className="bg-purple-600 text-white border-purple-600 px-4 py-1">
              <Hash className="h-3 w-3 mr-1" />
              Trademark™
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {/* Copyright Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Shield className="h-5 w-5" />
                <span className="font-semibold text-lg">Copyright</span>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-medium">© 2025 Delderenzo Property Group Pty Ltd</p>
                <p className="text-muted-foreground">All Rights Reserved</p>
              </div>
            </div>

            {/* Patents Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Award className="h-5 w-5" />
                <span className="font-semibold text-lg">Patents Granted</span>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-medium text-green-600">Patent approved</p>
                <p className="text-xs text-muted-foreground">Patents approved for:</p>
                <p className="text-xs">• Proprietary valuation algorithms</p>
                <p className="text-xs">• Financial algorithms and methods</p>
                <p className="text-xs">• Sustainability assessment methods</p>
                <p className="text-xs">• Automated risk assessment systems</p>
                <p className="text-xs">• Residential & non-residential risk matrices</p>
                <p className="text-xs">• Auto-generated calculation engines</p>
              </div>
            </div>

            {/* Trademark Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-purple-600">
                <Hash className="h-5 w-5" />
                <span className="font-semibold text-lg">Trademark</span>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-medium">ESG Property Assessment Platform™</p>
                <p className="text-muted-foreground">Registered Trademark</p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground pt-4 border-t space-y-2">
            <p>
              This software and its algorithms are protected by international copyright laws, granted patents, and registered trademarks. 
              Unauthorized reproduction, distribution, or use is strictly prohibited and may result in severe civil and criminal penalties. 
              Licensed under MIT License for authorized use only.
            </p>
            <p>For licensing inquiries: legal@delderenzoproperty.com</p>
            <p>Patent Portfolio managed by Delderenzo Property Group Legal Department</p>
          </div>
        </CardContent>
      </Card>

      {/* Professional Platform Notice */}
      <Card className="w-full border border-blue-200 bg-blue-50/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg shrink-0">
              <span className="text-blue-600 font-bold text-lg">P</span>
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-blue-800">Property Pro™</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                  REGISTERED TRADEMARK
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                  <Lock className="h-3 w-3 mr-1" />
                  IP PROTECTED
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                  LICENSED SOFTWARE
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                © 2024 Delderenzo Property Group Pty Ltd. All rights reserved.
              </p>
              <p className="text-sm">
                Property Pro™ is a registered trademark of Delderenzo Property Group Pty Ltd. 
                Unauthorized copying, reproduction, or distribution is <span className="text-red-600 font-medium">strictly prohibited</span>.
              </p>

              <div className="pt-2">
                <h4 className="font-medium text-sm mb-2">Legal Notices:</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• This software is protected by copyright law and international treaties.</li>
                  <li>• Unauthorized reproduction or distribution may result in severe civil and criminal penalties.</li>
                  <li>• Patents approved for proprietary valuation algorithms, functionality, methods, financial algorithms and methods, sustainability assessment methods, automated risk assessment systems, residential & non-residential risk matrices, and auto-generated calculation engines.</li>
                  <li>• Licensed under MIT License for authorized users only. See LICENSE file for terms.</li>
                  <li>• Built with Lovable.dev - AI powered development platform.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple IP Badge */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-teal-100 border border-teal-200 rounded-lg px-4 py-2">
          <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">©</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-teal-800">IP Protected Content</span>
            <div className="text-xs text-teal-600">All Rights Reserved © 2025</div>
          </div>
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-300 text-xs">
            PROTECTED
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveIPProtection;