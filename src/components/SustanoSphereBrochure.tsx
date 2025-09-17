/**
 * ============================================================================
 * Sustaino-Sphere™ Professional Brochure - PDF Ready
 * One-page marketing brochure for email distribution
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 * ============================================================================
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, BarChart3, TrendingUp, Shield, Award, Building2,
  Target, Globe, Star, CheckCircle, Phone, Mail, MapPin, 
  Calendar, Zap, Brain, DollarSign, Activity
} from 'lucide-react';

const SustanoSphereBrochure = () => {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header Section */}
      <div className="text-center mb-8 border-b-4 border-green-600 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-green-900">
            Sustaino-Sphere™
          </h1>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Revolutionary ESG & Climate Risk Assessment Platform
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold">
            🌱 ESG Innovation Leader
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
            🎯 Climate Risk Analysis
          </Badge>
          <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-bold">
            📊 Market Intelligence
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Left Column - ESG Features */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
            <Star className="h-6 w-6 mr-2" />
            ESG Assessment Solutions
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <Leaf className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Environmental Scoring</h3>
                <p className="text-sm text-gray-700">Carbon footprint, energy efficiency, and sustainability metrics</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Building2 className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Social Impact Analysis</h3>
                <p className="text-sm text-gray-700">Community engagement and stakeholder value assessment</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Shield className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Governance Compliance</h3>
                <p className="text-sm text-gray-700">Transparency, ethics, and risk management frameworks</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <Activity className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Climate Risk Modeling</h3>
                <p className="text-sm text-gray-700">Advanced climate scenario analysis and adaptation strategies</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <TrendingUp className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Financial Impact Analysis</h3>
                <p className="text-sm text-gray-700">ESG premium calculations and investment risk assessment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Market Intelligence & Analytics */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2" />
            Market Intelligence & Analytics
          </h2>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">95%</div>
              <div className="text-sm font-bold">Accuracy Rate</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">200+</div>
              <div className="text-sm font-bold">ESG Metrics</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">50+</div>
              <div className="text-sm font-bold">Climate Scenarios</div>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">24/7</div>
              <div className="text-sm font-bold">Real-time Monitoring</div>
            </div>
          </div>

          {/* ESG Scoring Framework */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-bold text-green-900 mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                ESG Scoring Framework
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Environmental (40%)</span>
                  <div className="w-24 bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Social (30%)</span>
                  <div className="w-24 bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Governance (30%)</span>
                  <div className="w-24 bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-green-700 mt-2">
                Comprehensive weighted scoring aligned with global standards
              </p>
            </CardContent>
          </Card>

          {/* Climate Risk Categories */}
          <div className="mt-4">
            <h3 className="font-bold text-gray-900 mb-3">Climate Risk Assessment</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-red-50 border border-red-200 rounded p-2 text-center">
                <div className="text-xs font-bold text-red-800">Physical Risks</div>
                <div className="text-xs text-red-600">Flooding, Storms, Heat</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
                <div className="text-xs font-bold text-orange-800">Transition Risks</div>
                <div className="text-xs text-orange-600">Policy, Technology</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
                <div className="text-xs font-bold text-yellow-800">Market Risks</div>
                <div className="text-xs text-yellow-600">Commodity, Credit</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                <div className="text-xs font-bold text-green-800">Opportunities</div>
                <div className="text-xs text-green-600">Adaptation, Innovation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology & Innovation Showcase */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🌍 Cutting-Edge Sustainability Technology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="font-bold">AI-Powered Analysis</div>
            <div className="text-xs opacity-90">Machine learning algorithms</div>
          </div>
          <div className="text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <div className="font-bold">Global Data Integration</div>
            <div className="text-xs opacity-90">Real-time satellite data</div>
          </div>
          <div className="text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <div className="font-bold">Predictive Modeling</div>
            <div className="text-xs opacity-90">Advanced scenario analysis</div>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-orange-400" />
            <div className="font-bold">Regulatory Compliance</div>
            <div className="text-xs opacity-90">TCFD & SASB aligned</div>
          </div>
        </div>
      </div>

      {/* Financial Benefits */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-green-300 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-900 mb-4 text-center">
          💰 Proven Financial Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <DollarSign className="h-12 w-12 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-800">15%</div>
            <div className="text-sm font-medium text-gray-700">Average ESG Premium</div>
            <div className="text-xs text-gray-600">on property valuations</div>
          </div>
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-800">25%</div>
            <div className="text-sm font-medium text-gray-700">Risk Reduction</div>
            <div className="text-xs text-gray-600">in investment portfolios</div>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-800">30%</div>
            <div className="text-sm font-medium text-gray-700">Faster Due Diligence</div>
            <div className="text-xs text-gray-600">with automated reporting</div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Contact & CTA */}
      <div className="border-t-4 border-green-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">Transform Your ESG Strategy</h2>
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
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <span className="font-bold">Book Your ESG Assessment</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Ready to Lead in Sustainable Real Estate?</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Comprehensive ESG assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Climate risk analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Market intelligence reports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Expert consultation</span>
              </div>
            </div>
            <div className="text-center font-bold text-lg">
              🌱 Start Your Sustainability Journey Today!
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. Sustaino-Sphere™ is a registered trademark. 
          All rights reserved. ESG methodology patent-pending.
        </p>
      </div>
    </div>
  );
};

export default SustanoSphereBrochure;