/**
 * Plant & Equipment Professional Brochure - PDF Ready
 * Specialized plant, machinery & equipment valuation services
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, Truck, Factory, Wrench, Calculator, 
  CheckCircle, Award, TrendingDown, BarChart3,
  Phone, Mail, MapPin, FileText, Shield
} from 'lucide-react';

const PlantEquipmentBrochure = () => {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-orange-600 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-orange-900">
            Plant & Equipment
          </h1>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Expert Valuation of Plant, Machinery & Industrial Equipment
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-orange-600 text-white px-4 py-2 text-sm font-bold">
            🔧 Technical Expertise
          </Badge>
          <Badge className="bg-red-600 text-white px-4 py-2 text-sm font-bold">
            📊 Depreciation Analysis
          </Badge>
          <Badge className="bg-yellow-600 text-white px-4 py-2 text-sm font-bold">
            ⚖️ Legal Compliance
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Equipment Types */}
        <div>
          <h2 className="text-2xl font-bold text-orange-900 mb-6">
            Equipment Valuation Services
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Factory className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Manufacturing Equipment</h3>
                <p className="text-sm text-gray-700">Production machinery, processing equipment, automation systems</p>
                <p className="text-xs text-orange-600 font-semibold">• CNC machines • Assembly lines • Quality control systems</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Truck className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Mobile Plant & Vehicles</h3>
                <p className="text-sm text-gray-700">Heavy vehicles, earthmoving equipment, transport fleet</p>
                <p className="text-xs text-blue-600 font-semibold">• Excavators • Trucks • Forklifts • Cranes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Wrench className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Specialized Equipment</h3>
                <p className="text-sm text-gray-700">Medical, scientific, agricultural and technical equipment</p>
                <p className="text-xs text-green-600 font-semibold">• Laboratory equipment • Agricultural machinery • IT systems</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Settings className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Industrial Infrastructure</h3>
                <p className="text-sm text-gray-700">Fixed plant, building services, production infrastructure</p>
                <p className="text-xs text-purple-600 font-semibold">• HVAC systems • Electrical installations • Process plant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Valuation Methods */}
        <div>
          <h2 className="text-2xl font-bold text-orange-900 mb-6">
            Professional Valuation Methods
          </h2>
          
          <div className="space-y-4">
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-orange-900 mb-3 flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Depreciated Replacement Cost
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>New replacement cost</strong> assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Physical depreciation</strong> analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Functional obsolescence</strong> evaluation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Economic obsolescence</strong> consideration</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Market Comparison Approach
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Comparable sales analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Market data research</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Auction results analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-green-900 mb-3 flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2" />
                  Income Approach
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Revenue generation analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Operating cost assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Return on investment calculation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Valuation Purposes */}
      <div className="bg-gradient-to-r from-orange-900 to-red-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Valuation Purposes & Applications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold">Insurance</div>
            <div className="opacity-90">Replacement cost coverage</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Accounting</div>
            <div className="opacity-90">AASB asset revaluation</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Finance</div>
            <div className="opacity-90">Asset-based lending</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Taxation</div>
            <div className="opacity-90">Depreciation schedules</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Sale/Purchase</div>
            <div className="opacity-90">Transaction support</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Legal Disputes</div>
            <div className="opacity-90">Expert witness services</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Liquidation</div>
            <div className="opacity-90">Forced sale values</div>
          </div>
          <div className="text-center">
            <div className="font-bold">Merger & Acquisition</div>
            <div className="opacity-90">Due diligence support</div>
          </div>
        </div>
      </div>

      {/* Quality Assurance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-orange-200">
          <CardContent className="p-6 text-center">
            <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Technical Expertise</h3>
            <p className="text-sm text-gray-700">Qualified engineers and technical specialists</p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-blue-200">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Detailed Reports</h3>
            <p className="text-sm text-gray-700">Comprehensive documentation with photographs</p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-green-200">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Professional Standards</h3>
            <p className="text-sm text-gray-700">RICS and industry compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-orange-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Expert Equipment Valuation</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-600" />
                <span className="font-bold">info@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-600" />
                <span className="font-bold">0417 693 838</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-orange-600" />
                <span className="font-bold">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Technical Excellence</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-300" />
                <span>Qualified technical specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-300" />
                <span>Industry-specific expertise</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-300" />
                <span>Comprehensive documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-yellow-300" />
                <span>Fast turnaround times</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
          Technical Valuations | Engineering Assessments | Professional Indemnity Insurance
        </p>
      </div>
    </div>
  );
};

export default PlantEquipmentBrochure;