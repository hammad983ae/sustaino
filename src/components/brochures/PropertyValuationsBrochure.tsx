/**
 * Property Valuations Professional Brochure - PDF Ready
 * Comprehensive valuation services across all property types
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, Home, TreePine, Factory, Award, CheckCircle,
  BarChart3, Shield, Calculator, FileText, Phone, Mail, MapPin
} from 'lucide-react';

const PropertyValuationsBrochure = () => {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-blue-600 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
            <Building className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-blue-900">
            Property Valuations
          </h1>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Professional Property Assessment Services Across All Asset Classes
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
            ✅ RICS Certified
          </Badge>
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold">
            📊 AI-Enhanced Analysis
          </Badge>
          <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-bold">
            🏆 Industry Leading
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Valuation Types */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Comprehensive Valuation Services
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Home className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Residential Valuations</h3>
                <p className="text-sm text-gray-700">Houses, units, townhouses, vacant land</p>
                <p className="text-xs text-blue-600 font-semibold">• Mortgage security • Family law • Probate</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Building className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Commercial Valuations</h3>
                <p className="text-sm text-gray-700">Office, retail, industrial, hospitality</p>
                <p className="text-xs text-green-600 font-semibold">• Investment analysis • Leasing • Acquisition</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <TreePine className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Agricultural Valuations</h3>
                <p className="text-sm text-gray-700">Farms, rural land, agricultural assets</p>
                <p className="text-xs text-orange-600 font-semibold">• Primary production • Rural finance • Succession</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Factory className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Specialised Valuations</h3>
                <p className="text-sm text-gray-700">Special purpose properties, unique assets</p>
                <p className="text-xs text-purple-600 font-semibold">• Healthcare • Education • Infrastructure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Methodology & Features */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Advanced Valuation Methodology
          </h2>
          
          <div className="space-y-4">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Three Approaches to Value
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Sales Comparison:</strong> Market evidence analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Income Approach:</strong> Capitalisation & DCF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Cost Approach:</strong> Replacement cost analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-green-900 mb-3 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Enhanced Analytics
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Risk assessment integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Market trend analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Sensitivity analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Quality Assurance
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>RICS Red Book compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Professional indemnity insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Independent peer review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-gradient-to-r from-blue-900 to-green-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Complete Valuation Solutions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold">Mortgage Security</div>
            <div className="opacity-90">Bank lending purposes</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Family Law</div>
            <div className="opacity-90">Property settlements</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Probate & Estate</div>
            <div className="opacity-90">Inheritance valuations</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Insurance</div>
            <div className="opacity-90">Replacement cost assessment</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Compulsory Acquisition</div>
            <div className="opacity-90">Government resumption</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Investment Analysis</div>
            <div className="opacity-90">Acquisition & disposal</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Accounting</div>
            <div className="opacity-90">Fair value assessment</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Tax Purposes</div>
            <div className="opacity-90">CGT & depreciation</div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-blue-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Get Professional Valuation</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="font-bold">info@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="font-bold">0417 693 838</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="font-bold">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Why Choose Our Valuations?</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>RICS certified professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Fast turnaround times</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Comprehensive reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Competitive pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
          RICS Registered Valuer | Professional Indemnity Insurance | API Certified
        </p>
      </div>
    </div>
  );
};

export default PropertyValuationsBrochure;