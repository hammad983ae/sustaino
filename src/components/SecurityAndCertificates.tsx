import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Award, Copyright } from "lucide-react";

export default function SecurityAndCertificates() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Certificates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ISO 27001:2022 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-md font-semibold">ISO 27001:2022</h3>
                  <p className="text-sm text-muted-foreground">Information Security Management</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CERTIFIED</Badge>
            </div>
            <div className="ml-11 space-y-2">
              <p className="text-sm"><strong>Certificate No:</strong> ISO_2023007.2024.001</p>
              <p className="text-sm"><strong>Valid Until:</strong> December 2027</p>
              <p className="text-sm"><strong>Issued By:</strong> International Certification Authority</p>
            </div>
          </div>

          <Separator />

          {/* Content Protection Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Lock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <h3 className="text-md font-semibold">Content Protection Features</h3>
              </div>
            </div>
            <div className="ml-11 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm">Right-click Protection</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CERTIFIED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Developer Tools Warning</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CERTIFIED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Keyboard Shortcut Blocking</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CERTIFIED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Content Watermarking</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CERTIFIED</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Intellectual Property Protection */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Copyright className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-md font-semibold">Intellectual Property Protection</h3>
              </div>
            </div>
            <div className="ml-11 space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Registered Trademarks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="text-sm">Sustaino Pro™</div>
                  <div className="text-sm">Property Valuation Platform™</div>
                  <div className="text-sm">ESG Analysis Suite™</div>
                  <div className="text-sm">Smart Property Analytics™</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Patent Applications</h4>
                <div className="space-y-1">
                  <div className="text-sm">• Patent No: AU2024001215 - Automated Property Valuation Algorithm</div>
                  <div className="text-sm">• Patent No: AU2024001216 - ESG Risk Assessment Method</div>
                  <div className="text-sm">• Patent No: AU2024001217 - Sustainability Scoring System</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Copyright Protection</h4>
                <div className="text-sm">© 2024 Sustaino Property Group Pty Ltd</div>
                <div className="text-sm">All valuation algorithms and methodologies</div>
                <div className="text-sm">Licensed under RICS Licence for authorised users</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Legal Compliance */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="text-md font-semibold">Legal Compliance</h3>
              </div>
            </div>
            <div className="ml-11 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm">GDPR Compliant</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CERTIFIED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">CCPA Compliant</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CERTIFIED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">SOX Compliant</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">CERTIFIED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">SOC 2 Type II</p>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">AUDITED</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}