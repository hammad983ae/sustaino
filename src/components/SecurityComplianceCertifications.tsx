import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Activity, CheckCircle, Database, Key, FileText } from "lucide-react";

const SecurityComplianceCertifications = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-green-600" />
          <CardTitle className="text-green-600">Security & Compliance Certifications</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Enterprise-grade security protecting your property data
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Security Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border">
            <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h4 className="font-medium text-blue-600">ISO 27001:2022</h4>
            <p className="text-xs text-muted-foreground">Certified</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg border">
            <Lock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h4 className="font-medium text-blue-600">AES-256</h4>
            <p className="text-xs text-muted-foreground">Encryption</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg border">
            <Eye className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h4 className="font-medium text-purple-600">Privacy</h4>
            <p className="text-xs text-muted-foreground">Protected</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg border">
            <Activity className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <h4 className="font-medium text-orange-600">24/7</h4>
            <p className="text-xs text-muted-foreground">Monitoring</p>
          </div>
        </div>

        {/* Feature Details */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="font-semibold">Data Protection</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Australian Privacy Principles compliant with end-to-end encryption
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
              <Key className="h-4 w-4" />
              <span className="font-semibold">Access Control</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Role-based permissions with multi-factor authentication
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-purple-600">
              <FileText className="h-4 w-4" />
              <span className="font-semibold">Audit Trail</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Complete activity logging and compliance monitoring
            </p>
          </div>
        </div>

        {/* Compliance Information */}
        <div className="grid md:grid-cols-4 gap-6 pt-6 border-t">
          <div>
            <h4 className="font-semibold text-sm mb-2">Lovable™ Property Valuation</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>Professional automated valuation models powered by enterprise-grade security and ISO 27001 compliance.</li>
              <li className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs">ISO 27001</Badge>
                <span>Encrypted</span>
                <Badge variant="outline" className="text-xs">Secure</Badge>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Security Features</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>🔒 End-to-end encryption</li>
              <li>🛡️ SOC 2 Type II compliance</li>
              <li>🔑 Access management</li>
              <li>📊 Real-time monitoring</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Compliance</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✅ Australian Privacy Act</li>
              <li>✅ Data sovereignty</li>
              <li>✅ Retention policies</li>
              <li>✅ Transparency reporting</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Support</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>Security: security@delderenzoproperty.com</li>
              <li>Privacy: privacy@delderenzoproperty.com</li>
              <li>Support: support@delderenzoproperty.com</li>
              <li>Emergency: +61 (0) 400 123 456</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityComplianceCertifications;