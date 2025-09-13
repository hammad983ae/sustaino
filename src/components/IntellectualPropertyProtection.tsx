import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Copyright, Award, Hash } from "lucide-react";

const IntellectualPropertyProtection = () => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-green-600" />
          <CardTitle className="text-green-600">Intellectual Property Protection</CardTitle>
        </div>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
            <Copyright className="h-3 w-3 mr-1" />
            Copyright Protected
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
            <Award className="h-3 w-3 mr-1" />
            Patents Granted
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-300">
            <Hash className="h-3 w-3 mr-1" />
            Trademark™
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Copyright Section */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Copyright className="h-4 w-4" />
              <span className="font-semibold">Copyright</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>© 2025 Delderenzo Property Group Pty Ltd</p>
              <p className="text-xs">All Rights Reserved</p>
            </div>
          </div>

          {/* Patents Section */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Award className="h-4 w-4" />
              <span className="font-semibold">Patents Granted</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-green-600">Patent approved</p>
              <p className="text-xs">Patent applications pending for:</p>
              <p className="text-xs">• Proprietary valuation algorithms</p>
              <p className="text-xs">• Financial algorithms and methods</p>
              <p className="text-xs">• Sustainability assessment methods</p>
            </div>
          </div>

          {/* Trademark Section */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <Hash className="h-4 w-4" />
              <span className="font-semibold">Trademark</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>ESG Property Assessment Platform™</p>
              <p className="text-xs">Registered Trademark</p>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="text-xs text-muted-foreground text-center space-y-2 pt-4 border-t">
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
  );
};

export default IntellectualPropertyProtection;