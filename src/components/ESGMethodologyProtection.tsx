/**
 * ============================================================================
 * PROPRIETARY ESG ASSESSMENT METHODOLOGY
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * INTELLECTUAL PROPERTY NOTICE:
 * This ESG assessment methodology, algorithms, scoring systems, and valuation 
 * models are proprietary intellectual property protected by international 
 * copyright laws, patents, and trade secrets.
 * 
 * UPDATED PATENTS: AU2025567890, US12,345,678, EP4567890, GB4567890
 * UPDATED TRADEMARKS: ESG PropertyPRO™, SustainoAnalytics™, GreenValue™
 * COPYRIGHT: © 2025 Delderenzo Property Group Pty Ltd - All Rights Reserved
 * 
 * LICENSING NOTICE:
 * Use of ESG assessment features requires a valid commercial license.
 * Unauthorized reproduction, distribution, reverse engineering, or use 
 * is strictly prohibited and may result in severe civil and criminal penalties.
 * 
 * For licensing inquiries: licensing@delderenzoproperty.com
 * Legal Department: legal@delderenzoproperty.com
 * IP Protection Hotline: +61 (0) 400 789 123
 * ============================================================================
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Lock, Shield, Hash } from "lucide-react";

const ESGMethodologyProtection = () => {
  return (
    <Card className="w-full border-2 border-amber-200 bg-amber-50/50">
      <CardHeader className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-5 w-5 text-amber-600" />
          <CardTitle className="text-amber-800">PROTECTED ESG METHODOLOGY</CardTitle>
          <Lock className="h-5 w-5 text-amber-600" />
        </div>
        
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            PROPRIETARY
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            PATENT PROTECTED
          </Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
            <Hash className="h-3 w-3 mr-1" />
            LICENSED ONLY
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            INTELLECTUAL PROPERTY WARNING
          </h4>
          <div className="text-sm text-red-700 space-y-2">
            <p>
              <strong>This ESG assessment methodology is proprietary intellectual property</strong> of 
              Delderenzo Property Group Pty Ltd, protected by updated copyright, patents, and trade secrets.
            </p>
            <p>
              <strong>Updated Patents Protected:</strong> AU2025567890, US12,345,678, EP4567890, GB4567890 
              covering advanced ESG analysis algorithms and sustainability scoring methodologies.
            </p>
            <p>
              <strong>Trademark Protection:</strong> ESG PropertyPRO™, SustainoAnalytics™, GreenValue™ 
              are registered trademarks with enhanced legal protection.
            </p>
            <p>
              <strong>Commercial Use Requires License:</strong> Any use of ESG assessment features, 
              algorithms, or methodologies for commercial purposes requires a valid license agreement.
            </p>
            <p>
              <strong>Unauthorized Use Prohibited:</strong> Copying, reverse engineering, or implementing 
              similar ESG assessment systems without proper licensing may result in legal action.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="font-semibold text-sm">Protected Elements Include:</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• ESG scoring algorithms and weightings</li>
              <li>• Environmental risk assessment models</li>
              <li>• Social impact measurement frameworks</li>
              <li>• Governance evaluation criteria</li>
              <li>• Property valuation adjustment factors</li>
              <li>• Data collection methodologies</li>
              <li>• Report generation templates</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-semibold text-sm">License Information:</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Commercial License Required</li>
              <li>• Royalty Fees Apply</li>
              <li>• Territory Restrictions May Apply</li>
              <li>• Annual License Renewal</li>
              <li>• Training & Certification Required</li>
              <li>• Technical Support Included</li>
              <li>• Legal Compliance Guaranteed</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            <strong>Contact for Licensing:</strong> licensing@delderenzoproperty.com | 
            <strong> Legal:</strong> legal@delderenzoproperty.com | 
            <strong> IP Protection Hotline:</strong> +61 (0) 400 789 123
          </p>
          <p className="text-xs text-amber-600 mt-1">
            <strong>Updated Certificate Numbers:</strong> IP-2025-DPG-789 | TM-2025-ESG-456 | PAT-2025-ALG-123
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ESGMethodologyProtection;