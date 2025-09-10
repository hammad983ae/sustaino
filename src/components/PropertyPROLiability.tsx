import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Camera, FileText } from 'lucide-react';

export const PropertyPROLiability: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Section 10 - Capped Liability Scheme</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Capped Liability Statement */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-primary">Professional Standards Scheme</h3>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">
              Liability limited by a scheme approved under Professional Standards Legislation.
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            This statement must be printed in a size not less than Times New Roman 8 point typeface 
            and may only be used by those covered by the APIV Professional Standards Scheme.
          </p>
        </div>

        {/* Photographs Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Camera className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Photographs</h3>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-3">Photography Requirements</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• <strong>Minimum:</strong> Two (2) photographs taken by Valuer at time of inspection</li>
              <li>• <strong>Required views:</strong> Street view, front and rear of main improvements</li>
              <li>• <strong>Interior:</strong> Kitchen, bathroom(s)</li>
              <li>• <strong>Features:</strong> Any improvements/attributes that assist in identifying positive or negative features</li>
              <li>• <strong>Examples:</strong> Designated car spaces, views, swimming pool, structural defects, current building works</li>
              <li>• <strong>Timestamp:</strong> Photographs should be date and time stamped</li>
              <li>• <strong>Purpose:</strong> Assist Client understanding and future dispute resolution</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-700">
              <strong>Note:</strong> If photography requirements cannot be met, provide appropriate comment 
              in Section 8 outlining the reasons why requirements were unable to be met.
            </p>
          </div>
        </div>

        {/* Report Compliance */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Report Compliance</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">PropertyPRO Report Standards</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Report completed in accordance with PropertyPRO Supporting Memorandum</li>
                <li>• Brief Report for Single Residential First Mortgage Purposes Only</li>
                <li>• Physical inspection and limited enquiries as contained in Supporting Memorandum</li>
                <li>• Must be signed by Primary Valuer who fully inspected the subject property</li>
                <li>• Counter-signature required where specified in supervision guidelines</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">Important Limitations</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Not suitable for marketing advice, pre-purchase valuations, or family law</li>
                <li>• Not suitable for development sites where highest & best use is subdivision</li>
                <li>• Property must be 20 hectares or less</li>
                <li>• Not suitable for properties over $5 million market value</li>
                <li>• Copy of report to property owner or borrower is not appropriate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Contact Information */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Australian Property Institute</h4>
          <p className="text-sm text-muted-foreground">
            PropertyPRO Supporting Memorandum available at: 
            <a href="https://www.api.org.au/propertypro" className="text-primary hover:underline ml-1">
              www.api.org.au/propertypro
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};