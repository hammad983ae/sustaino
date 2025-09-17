/**
 * Financial Reporting Professional Brochure - PDF Ready
 * Comprehensive financial reporting and accounting services
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, FileText, Calculator, TrendingUp, PieChart,
  CheckCircle, Award, Shield, DollarSign, Target,
  Phone, Mail, MapPin, Clock, Users
} from 'lucide-react';

const FinancialReportingBrochure = () => {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-purple-600 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-purple-900">
            Financial Reporting
          </h1>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Professional Financial Analysis & Reporting Solutions
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-bold">
            📊 AASB Compliant
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
            💼 CPA Standards
          </Badge>
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold">
            🎯 Strategic Insights
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Core Services */}
        <div>
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            Comprehensive Reporting Services
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <FileText className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Annual Financial Reports</h3>
                <p className="text-sm text-gray-700">AASB compliant financial statements and annual reports</p>
                <p className="text-xs text-purple-600 font-semibold">• Balance sheets • P&L statements • Cash flow • Notes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <TrendingUp className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Management Reporting</h3>
                <p className="text-sm text-gray-700">Executive dashboards and strategic performance analysis</p>
                <p className="text-xs text-blue-600 font-semibold">• KPI tracking • Budget variance • Forecasting</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <PieChart className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Asset Valuation Reports</h3>
                <p className="text-sm text-gray-700">Fair value assessments for financial reporting</p>
                <p className="text-xs text-green-600 font-semibold">• AASB 116 • AASB 136 • AASB 13 compliance</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Calculator className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Tax Compliance Reporting</h3>
                <p className="text-sm text-gray-700">Tax returns, BAS and compliance documentation</p>
                <p className="text-xs text-orange-600 font-semibold">• Corporate tax • GST • FBT • PAYG</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Solutions */}
        <div>
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            Specialized Financial Solutions
          </h2>
          
          <div className="space-y-4">
            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Real Estate Financial Analysis
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Property portfolio</strong> performance analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Rental yield</strong> and ROI calculations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Development project</strong> feasibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Asset revaluation</strong> reporting</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Strategic Financial Planning
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Budget preparation and monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Cash flow forecasting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Financial scenario modeling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Investment appraisal</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-green-900 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Stakeholder Reporting
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Board and committee reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Investor presentations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Regulatory compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>ESG reporting integration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Technology & Standards */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Technology-Enhanced Reporting
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <div className="font-bold">Automated Analytics</div>
            <div className="text-xs opacity-90">Real-time data processing and analysis</div>
          </div>
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <div className="font-bold">Real-Time Reporting</div>
            <div className="text-xs opacity-90">Live dashboards and instant updates</div>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="font-bold">Data Security</div>
            <div className="text-xs opacity-90">Bank-grade encryption and compliance</div>
          </div>
          <div className="text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
            <div className="font-bold">Quality Assurance</div>
            <div className="text-xs opacity-90">Multi-level review and validation</div>
          </div>
        </div>
      </div>

      {/* Industry Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-2 border-purple-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Compliance Standards</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Australian Accounting Standards (AASB)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">International Financial Reporting Standards (IFRS)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Corporations Act 2001 requirements</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">CPA Australia professional standards</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Service Features</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Timely delivery guaranteed</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Dedicated account management</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Professional indemnity coverage</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Quality assurance protocols</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-purple-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Professional Financial Services</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-600" />
                <span className="font-bold">info@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-purple-600" />
                <span className="font-bold">0417 693 838</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span className="font-bold">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Expert Financial Solutions</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>CPA qualified professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>AASB compliant reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Technology-enhanced processes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Strategic business insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
          CPA Practice | AASB Compliance | Professional Indemnity Insurance
        </p>
      </div>
    </div>
  );
};

export default FinancialReportingBrochure;