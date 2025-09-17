/**
 * Development Site Professional Brochure - PDF Ready
 * Comprehensive development site analysis and feasibility services
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Calculator, TrendingUp, Building2, Zap,
  CheckCircle, Award, BarChart3, Target, Clock,
  Phone, Mail, MapIcon, FileText, Users, Shield
} from 'lucide-react';

const DevelopmentSiteBrochure = () => {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-blue-600 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-blue-900">
            Development Sites
          </h1>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Expert Development Site Analysis & Feasibility Assessment Services
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
            🏗️ Feasibility Analysis
          </Badge>
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold">
            📊 Market Research
          </Badge>
          <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-bold">
            ⚡ Fast Turnaround
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Core Services */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Development Site Services
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Calculator className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Feasibility Studies</h3>
                <p className="text-sm text-gray-700">Comprehensive development feasibility and financial modeling</p>
                <p className="text-xs text-blue-600 font-semibold">• Financial analysis • Market demand • Risk assessment</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <MapPin className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Site Analysis</h3>
                <p className="text-sm text-gray-700">Detailed site evaluation including planning and zoning assessment</p>
                <p className="text-xs text-green-600 font-semibold">• Zoning compliance • Site constraints • Opportunity analysis</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <TrendingUp className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Market Analysis</h3>
                <p className="text-sm text-gray-700">Local market research and demand analysis for development</p>
                <p className="text-xs text-orange-600 font-semibold">• Sales evidence • Rental demand • Competition analysis</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <BarChart3 className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Financial Modeling</h3>
                <p className="text-sm text-gray-700">Detailed cash flow and return analysis for development projects</p>
                <p className="text-xs text-purple-600 font-semibold">• DCF analysis • Sensitivity testing • IRR calculations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Development Types */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Development Categories
          </h2>
          
          <div className="space-y-4">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Residential Development
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>House & Land:</strong> Subdivision projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Apartments:</strong> Multi-unit developments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Townhouses:</strong> Medium density housing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-green-900 mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Commercial Development
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Office buildings and business parks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Retail centers and shopping complexes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Industrial and warehouse facilities</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Mixed-Use Development
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Integrated residential and commercial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Master-planned communities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Transit-oriented developments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Process & Methodology */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Development Assessment Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">1</span>
            </div>
            <div className="font-bold">Site Inspection</div>
            <div className="text-xs opacity-90">Physical assessment and constraints analysis</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">2</span>
            </div>
            <div className="font-bold">Planning Review</div>
            <div className="text-xs opacity-90">Zoning, overlays and approval pathways</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">3</span>
            </div>
            <div className="font-bold">Market Research</div>
            <div className="text-xs opacity-90">Demand analysis and competition review</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">4</span>
            </div>
            <div className="font-bold">Financial Modeling</div>
            <div className="text-xs opacity-90">Feasibility and return calculations</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">5</span>
            </div>
            <div className="font-bold">Report Delivery</div>
            <div className="text-xs opacity-90">Comprehensive feasibility report</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-2 border-blue-200 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-black text-blue-600 mb-2">250+</div>
            <div className="font-bold text-gray-900">Development Sites</div>
            <div className="text-sm text-gray-600">Successfully assessed</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-green-200 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-black text-green-600 mb-2">95%</div>
            <div className="font-bold text-gray-900">Accuracy Rate</div>
            <div className="text-sm text-gray-600">Feasibility predictions</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-orange-200 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-black text-orange-600 mb-2">15+</div>
            <div className="font-bold text-gray-900">Years Experience</div>
            <div className="text-sm text-gray-600">Development analysis</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-purple-200 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-black text-purple-600 mb-2">$2B+</div>
            <div className="font-bold text-gray-900">Project Value</div>
            <div className="text-sm text-gray-600">Developments assessed</div>
          </CardContent>
        </Card>
      </div>

      {/* Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              Report Deliverables
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Executive summary with recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Detailed financial modeling and cash flows</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Market analysis and demand assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Planning compliance and risk analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Site plans and development concepts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              Service Timeframes
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-semibold">Initial Assessment:</span>
                <span className="text-green-700 font-bold">3-5 days</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="font-semibold">Feasibility Study:</span>
                <span className="text-blue-700 font-bold">10-15 days</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                <span className="font-semibold">Comprehensive Report:</span>
                <span className="text-orange-700 font-bold">15-20 days</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                <span className="font-semibold">Due Diligence:</span>
                <span className="text-purple-700 font-bold">5-10 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-blue-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Expert Development Analysis</h2>
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
                <MapIcon className="h-5 w-5 text-blue-600" />
                <span className="font-bold">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Development Expertise</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Qualified development specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Advanced financial modeling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Local market intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Fast turnaround guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
          Development Specialists | Planning Consultants | Financial Analysis Experts
        </p>
      </div>
    </div>
  );
};

export default DevelopmentSiteBrochure;