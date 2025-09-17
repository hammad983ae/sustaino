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
          World's Only Combined Independent Digital Asset Valuation and Auction Market Place
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold">
            🏆 World's First Combined Platform
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
            🎯 SustanoVal™ Proprietary Algorithm
          </Badge>
          <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-bold">
            📊 Blue Ocean Market Leader
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Left Column - ESG Features */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
            <Star className="h-6 w-6 mr-2" />
            Revolutionary Auction Solutions
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <Leaf className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">SustanoVal™ Proprietary Algorithm</h3>
                <p className="text-sm text-gray-700">World's first integrated valuation system for digital startup assets</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Building2 className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">First-Mover Market Advantage</h3>
                <p className="text-sm text-gray-700">Creating entirely new $847B digital asset valuation industry</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Shield className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Patent-Protected Technology</h3>
                <p className="text-sm text-gray-700">2-3 year competitive moat through proprietary IP portfolio</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <Activity className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Climate-Smart Valuations</h3>
                <p className="text-sm text-gray-700">AI-powered valuations incorporating climate risk factors</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <TrendingUp className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Sustainable Investment Analytics</h3>
                <p className="text-sm text-gray-700">ESG premium calculations and green investment insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Market Intelligence & Analytics */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2" />
            Live Auction Analytics & Performance
          </h2>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">$847B</div>
              <div className="text-sm font-bold">Market Opportunity</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">18.5%</div>
              <div className="text-sm font-bold">Annual Growth Rate</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">ZERO</div>
              <div className="text-sm font-bold">Direct Competitors</div>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">24 Mo</div>
              <div className="text-sm font-bold">Competitive Window</div>
            </div>
          </div>

          {/* ESG Scoring Framework */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-bold text-green-900 mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                SustanoVal™ Valuation Framework
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Proprietary Algorithms (50%)</span>
                  <div className="w-24 bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Market Intelligence (30%)</span>
                  <div className="w-24 bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">ESG Integration (20%)</span>
                  <div className="w-24 bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-green-700 mt-2">
                Proprietary algorithmic approach combining human expertise with advanced analytics
              </p>
            </CardContent>
          </Card>

          {/* Climate Risk Categories */}
          <div className="mt-4">
            <h3 className="font-bold text-gray-900 mb-3">Auction Asset Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-red-50 border border-red-200 rounded p-2 text-center">
                <div className="text-xs font-bold text-red-800">Property Assets</div>
                <div className="text-xs text-red-600">Commercial, Residential</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
                <div className="text-xs font-bold text-orange-800">Digital Assets</div>
                <div className="text-xs text-orange-600">NFTs, Virtual Real Estate</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
                <div className="text-xs font-bold text-yellow-800">Green Bonds</div>
                <div className="text-xs text-yellow-600">Sustainable Investments</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                <div className="text-xs font-bold text-green-800">ESG Portfolios</div>
                <div className="text-xs text-green-600">Climate-Smart Assets</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology & Innovation Showcase */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🌍 Revolutionary Auction Technology Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="font-bold">Collaborative AI Intelligence</div>
            <div className="text-xs opacity-90">Human expertise + advanced algorithms</div>
          </div>
          <div className="text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <div className="font-bold">Blue Ocean Strategy</div>
            <div className="text-xs opacity-90">Creating new market category</div>
          </div>
          <div className="text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <div className="font-bold">Industry Standard Setting</div>
            <div className="text-xs opacity-90">First-mover advantage leveraged</div>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-orange-400" />
            <div className="font-bold">Patent Protection Moat</div>
            <div className="text-xs opacity-90">Competitive barriers established</div>
          </div>
        </div>
      </div>

      {/* Financial Benefits */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-green-300 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-900 mb-4 text-center">
          💰 Proven Auction Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <DollarSign className="h-12 w-12 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-800">$847B</div>
            <div className="text-sm font-medium text-gray-700">Total Addressable Market</div>
            <div className="text-xs text-gray-600">digital asset valuations</div>
          </div>
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-800">18.5%</div>
            <div className="text-sm font-medium text-gray-700">Annual Market Growth</div>
            <div className="text-xs text-gray-600">outpacing traditional assets</div>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-800">24 Mo</div>
            <div className="text-sm font-medium text-gray-700">First-Mover Window</div>
            <div className="text-xs text-gray-600">before competition emerges</div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Contact & CTA */}
      <div className="border-t-4 border-green-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">Join the Auction Revolution</h2>
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
                <span className="font-bold">Schedule Live Demo</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Ready to Revolutionize Your Auction Experience?</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Live auction platform access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">ESG-integrated valuations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Global market intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Expert auction support</span>
              </div>
            </div>
            <div className="text-center font-bold text-lg">
              🏆 Experience the Future of Digital Auctions!
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. Sustaino-Sphere™ is a registered trademark. 
          All rights reserved. World's only ESG-focused digital auction platform - Patent protected.
        </p>
      </div>
    </div>
  );
};

export default SustanoSphereBrochure;