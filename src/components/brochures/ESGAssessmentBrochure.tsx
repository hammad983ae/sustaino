/**
 * ESG Assessment Professional Brochure - PDF Ready
 * Environmental, Social & Governance assessment services
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, Users, Shield, Globe, TrendingUp, Award,
  CheckCircle, BarChart3, Target, Thermometer,
  Phone, Mail, MapPin, FileText, Star
} from 'lucide-react';

const ESGAssessmentBrochure = () => {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-green-600 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-green-900">
            ESG Assessment
          </h1>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Environmental, Social & Governance Property Assessment Solutions
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold">
            🌱 Sustainability Focus
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
            📊 Data-Driven Analysis
          </Badge>
          <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-bold">
            🏆 Industry Leading
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* ESG Components */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Comprehensive ESG Framework
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Leaf className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Environmental Assessment</h3>
                <p className="text-sm text-gray-700">Climate risk, energy efficiency, carbon footprint analysis</p>
                <p className="text-xs text-green-600 font-semibold">• Climate risk • Energy rating • Carbon assessment</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Users className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Social Impact Evaluation</h3>
                <p className="text-sm text-gray-700">Community impact, accessibility, social value assessment</p>
                <p className="text-xs text-blue-600 font-semibold">• Community benefits • Accessibility • Social value</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Shield className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Governance Compliance</h3>
                <p className="text-sm text-gray-700">Corporate governance, transparency, ethical standards</p>
                <p className="text-xs text-purple-600 font-semibold">• Governance structure • Transparency • Ethics</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Thermometer className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Climate Risk Analysis</h3>
                <p className="text-sm text-gray-700">Physical and transition risk assessment</p>
                <p className="text-xs text-orange-600 font-semibold">• Flood risk • Fire risk • Extreme weather</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Outcomes */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            ESG Assessment Benefits
          </h2>
          
          <div className="space-y-4">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-green-900 mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Financial Performance
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>15-20%</strong> premium for sustainable properties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>25%</strong> reduction in operational costs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Enhanced</strong> investment attractiveness</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Risk Management
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Climate risk identification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Regulatory compliance assurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Future-proofing strategies</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Market Positioning
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Competitive differentiation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>ESG certification support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Stakeholder confidence</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ESG Scoring Framework */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ESG Scoring Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-4xl font-black mb-2">A+</div>
            <div className="font-bold">Exceptional</div>
            <div className="text-xs opacity-90">90-100 points</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black mb-2">A</div>
            <div className="font-bold">Excellent</div>
            <div className="text-xs opacity-90">80-89 points</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black mb-2">B</div>
            <div className="font-bold">Good</div>
            <div className="text-xs opacity-90">70-79 points</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black mb-2">C</div>
            <div className="font-bold">Fair</div>
            <div className="text-xs opacity-90">60-69 points</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black mb-2">D</div>
            <div className="font-bold">Poor</div>
            <div className="text-xs opacity-90">Below 60</div>
          </div>
        </div>
      </div>

      {/* Industry Applications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-green-200">
          <CardContent className="p-6 text-center">
            <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Investment Management</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div>• Portfolio ESG screening</div>
              <div>• Due diligence support</div>
              <div>• Risk assessment</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-blue-200">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Corporate Reporting</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div>• Sustainability reporting</div>
              <div>• TCFD compliance</div>
              <div>• Stakeholder disclosure</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-purple-200">
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Asset Enhancement</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div>• Value optimization</div>
              <div>• Improvement strategies</div>
              <div>• Market positioning</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Standards & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-2 border-green-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">ESG Standards</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Global Reporting Initiative (GRI)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Sustainability Accounting Standards Board (SASB)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Task Force on Climate-related Financial Disclosures (TCFD)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">UN Sustainable Development Goals (SDGs)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Certification Support</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Green Star certification</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">NABERS energy rating</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">LEED certification</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">BREEAM assessment</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-green-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">Sustainable Property Assessment</h2>
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
            <h3 className="text-xl font-bold mb-3">Leading ESG Solutions</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Certified ESG professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Comprehensive assessment framework</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Industry-leading methodology</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Strategic improvement guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
          ESG Certified | Sustainability Assessments | Professional Advisory Services
        </p>
      </div>
    </div>
  );
};

export default ESGAssessmentBrochure;