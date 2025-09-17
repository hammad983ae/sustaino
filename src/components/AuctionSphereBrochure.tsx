/**
 * ============================================================================
 * Auction-Sphere™ Professional Brochure - PDF Ready
 * One-page marketing brochure for email distribution
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 * ============================================================================
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Gavel, Globe, DollarSign, Brain, BarChart3, Shield, 
  Building2, Star, Crown, Zap, Award, CheckCircle,
  Phone, Mail, MapPin, Calendar
} from 'lucide-react';

const AuctionSphereBrochure = () => {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header Section */}
      <div className="text-center mb-8 border-b-4 border-blue-600 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-blue-900">
            Auction-Sphere™
          </h1>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Gavel className="h-8 w-8 text-white" />
          </div>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Revolutionary International Real Estate Auction Intelligence
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold">
            ✨ Patent Protected Technology
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
            🌍 Global FDI Platform
          </Badge>
          <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-bold">
            🤖 AI-Powered Intelligence
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Left Column - Key Features */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
            <Star className="h-6 w-6 mr-2" />
            Revolutionary Features
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Brain className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Qualifying Bidders</h3>
                <p className="text-sm text-gray-700">95% accuracy in financial assessment and risk analysis</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <Award className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Qualified Property Valuations</h3>
                <p className="text-sm text-gray-700">Ready for mortgage purposes with certified assessments</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <BarChart3 className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Cost Analysis with Bidders</h3>
                <p className="text-sm text-gray-700">Real-time financial modeling and bidding cost calculations</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <DollarSign className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">FDI Currency Exchanges</h3>
                <p className="text-sm text-gray-700">FIRB compliant with multi-currency exchange support</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <Shield className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Blockchain Enhanced by AI Intelligence</h3>
                <p className="text-sm text-gray-700">Immutable records with intelligent automation and security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Global Reach & Stats */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-2" />
            Global Platform Statistics
          </h2>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">45+</div>
              <div className="text-sm font-bold">Countries Supported</div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">10,000+</div>
              <div className="text-sm font-bold">Properties Auctioned</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">95%</div>
              <div className="text-sm font-bold">AI Accuracy Rate</div>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-4 rounded-lg text-center">
              <div className="text-3xl font-black">24/7</div>
              <div className="text-sm font-bold">Global Operations</div>
            </div>
          </div>

          {/* Currency Support */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-bold text-green-900 mb-3 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Multi-Currency Exchange
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {['AUD', 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'NZD'].map(currency => (
                  <div key={currency} className="bg-white border border-green-300 rounded px-2 py-1 text-xs font-bold text-center">
                    {currency}
                  </div>
                ))}
              </div>
              <p className="text-xs text-green-700 mt-2">
                Real-time exchange rates with automated FDI compliance
              </p>
            </CardContent>
          </Card>

          {/* International Markets */}
          <div className="mt-4">
            <h3 className="font-bold text-gray-900 mb-3">Key Markets</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl">🇦🇺</div>
                <div className="text-xs font-bold">Australia</div>
                <div className="text-xs text-gray-600">12,500+ Properties</div>
              </div>
              <div>
                <div className="text-2xl">🇺🇸</div>
                <div className="text-xs font-bold">United States</div>
                <div className="text-xs text-gray-600">8,200+ Properties</div>
              </div>
              <div>
                <div className="text-2xl">🇬🇧</div>
                <div className="text-xs font-bold">United Kingdom</div>
                <div className="text-xs text-gray-600">5,800+ Properties</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Showcase */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🚀 Revolutionary Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
            <div className="font-bold">WebGL 3D Engine</div>
            <div className="text-xs opacity-90">Patent-pending visualization</div>
          </div>
          <div className="text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="font-bold">AI Intelligence</div>
            <div className="text-xs opacity-90">Machine learning algorithms</div>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <div className="font-bold">Blockchain Security</div>
            <div className="text-xs opacity-90">Immutable transaction records</div>
          </div>
          <div className="text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <div className="font-bold">Global Infrastructure</div>
            <div className="text-xs opacity-90">Multi-region deployment</div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Contact & CTA */}
      <div className="border-t-4 border-blue-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us Today</h2>
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
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-bold">Schedule Your Demo Today</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Ready to Revolutionize Your Auctions?</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Free 3-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">Full training included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm">24/7 support</span>
              </div>
            </div>
            <div className="text-center font-bold text-lg">
              🚀 Start Your Digital Transformation Today!
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. Auction-Sphere™ is a registered trademark. 
          All rights reserved. Patent-pending technology.
        </p>
      </div>
    </div>
  );
};

export default AuctionSphereBrochure;