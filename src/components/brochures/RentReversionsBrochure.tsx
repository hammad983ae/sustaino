/**
 * Rent Reversions Professional Brochure - PDF Ready
 * Specialized rental valuation and review services
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, FileText, Calculator, BarChart3, Clock, 
  CheckCircle, Award, Shield, Phone, Mail, MapPin, Calendar
} from 'lucide-react';

const RentReversionsBrochure = () => {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-green-600 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-green-900">
            Rent Reversions
          </h1>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Expert Rental Valuation & Market Review Services
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold">
            📈 Market Analysis
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
            ⚖️ Tribunal Ready
          </Badge>
          <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-bold">
            🎯 Precise Valuations
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Comprehensive Rental Services
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Calculator className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Rent Determination</h3>
                <p className="text-sm text-gray-700">Market-based rental assessments for new leases</p>
                <p className="text-xs text-green-600 font-semibold">• Market evidence • Comparative analysis • Expert opinion</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Clock className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Rent Reviews</h3>
                <p className="text-sm text-gray-700">Statutory and contractual rent review processes</p>
                <p className="text-xs text-blue-600 font-semibold">• Annual reviews • CPI adjustments • Market reviews</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <BarChart3 className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Market Analysis</h3>
                <p className="text-sm text-gray-700">Comprehensive rental market research and trends</p>
                <p className="text-xs text-orange-600 font-semibold">• Vacancy rates • Rental growth • Demand analysis</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Award className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Expert Witness</h3>
                <p className="text-sm text-gray-700">Tribunal and court representation services</p>
                <p className="text-xs text-purple-600 font-semibold">• VCAT • NCAT • Supreme Court</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process & Methodology */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Professional Methodology
          </h2>
          
          <div className="space-y-4">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-green-900 mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Rental Assessment Process
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>1. Property Inspection:</strong> Detailed site analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>2. Market Research:</strong> Comparable evidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>3. Analysis:</strong> Rental rate determination</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>4. Reporting:</strong> Comprehensive documentation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-900 mb-3">
                  Property Types Covered
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Residential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Commercial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Industrial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Retail</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Agricultural</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Special Purpose</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Legal Compliance
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Retail Leases Act compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Residential Tenancies Act</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Commercial lease provisions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Expertise Areas */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Specialized Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="font-bold">Lease Renewals</div>
            <div className="text-sm opacity-90">Market rent determination for lease renewal negotiations</div>
          </div>
          <div className="text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <div className="font-bold">Rent Escalations</div>
            <div className="text-sm opacity-90">CPI, market, or fixed percentage increase calculations</div>
          </div>
          <div className="text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <div className="font-bold">Dispute Resolution</div>
            <div className="text-sm opacity-90">Expert witness services for rental disputes</div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-green-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">Expert Rental Assessment</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <span className="font-bold">info@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <span className="font-bold">0417 693 838</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-600" />
                <span className="font-bold">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Fast & Accurate Service</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>5-7 business day turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Detailed market analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Tribunal-ready reports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Expert witness support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
          Licensed Real Estate Agent | RICS Member | Professional Indemnity Insurance
        </p>
      </div>
    </div>
  );
};

export default RentReversionsBrochure;