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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 p-8 max-w-4xl mx-auto print:p-0 print:max-w-none relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-gradient-to-r from-cyan-400 to-emerald-400 pb-6 relative z-10">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50 animate-pulse">
            <Building className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-300 via-white to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl">
            Property Valuations
          </h1>
        </div>
        <p className="text-2xl text-white font-bold mb-6 drop-shadow-lg">
          Professional Property Assessment Services Across All Asset Classes
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform">
            ✅ RICS Certified
          </Badge>
          <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform">
            📊 AI-Enhanced Analysis
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform">
            🏆 Industry Leading
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
        
        {/* Valuation Types */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Comprehensive Valuation Services
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-cyan-400/30 shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Residential Valuations</h3>
                <p className="text-cyan-100 mb-2">Houses, units, townhouses, vacant land</p>
                <p className="text-xs text-cyan-300 font-semibold">• Mortgage security • Family law • Probate</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl border border-emerald-400/30 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Commercial Valuations</h3>
                <p className="text-emerald-100 mb-2">Office, retail, industrial, hospitality</p>
                <p className="text-xs text-emerald-300 font-semibold">• Investment analysis • Leasing • Acquisition</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl border border-orange-400/30 shadow-xl shadow-orange-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <TreePine className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Agricultural Valuations</h3>
                <p className="text-orange-100 mb-2">Farms, rural land, agricultural assets</p>
                <p className="text-xs text-orange-300 font-semibold">• Primary production • Rural finance • Succession</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-600/20 backdrop-blur-sm rounded-xl border border-purple-400/30 shadow-xl shadow-purple-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
                <Factory className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Specialised Valuations</h3>
                <p className="text-purple-100 mb-2">Special purpose properties, unique assets</p>
                <p className="text-xs text-purple-300 font-semibold">• Healthcare • Education • Infrastructure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Methodology & Features */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Advanced Valuation Methodology
          </h2>
          
          <div className="space-y-6">
            <Card className="border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Calculator className="h-4 w-4 text-white" />
                  </div>
                  Three Approaches to Value
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-cyan-100"><strong className="text-white">Sales Comparison:</strong> Market evidence analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-cyan-100"><strong className="text-white">Income Approach:</strong> Capitalisation & DCF</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-cyan-100"><strong className="text-white">Cost Approach:</strong> Replacement cost analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-400/50 bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mr-3">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  Enhanced Analytics
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-emerald-100">Risk assessment integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-emerald-100">Market trend analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-emerald-100">Sensitivity analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-400/50 bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm shadow-xl shadow-purple-500/20 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  Quality Assurance
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-purple-100">RICS Red Book compliance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-purple-100">Professional indemnity insurance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-purple-100">Independent peer review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Speed Advantage */}
      <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white p-8 rounded-2xl mb-8 shadow-2xl shadow-cyan-500/30 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
            ⚡ Revolutionary Speed Advantage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-500/30 to-green-600/30 backdrop-blur-sm p-6 rounded-xl border border-emerald-400/50 shadow-xl">
              <h3 className="font-bold text-emerald-300 mb-4 text-center text-xl">🚀 OUR DELIVERY</h3>
              <div className="space-y-3 text-lg">
                <div className="flex justify-between items-center">
                  <span>Comprehensive Valuation:</span>
                  <span className="font-black text-emerald-300 text-xl animate-pulse">SAME DAY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Full Due Diligence:</span>
                  <span className="font-black text-emerald-300 text-xl animate-pulse">SAME DAY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Market Analysis:</span>
                  <span className="font-black text-emerald-300 text-xl animate-pulse">INSTANT</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-500/30 to-orange-600/30 backdrop-blur-sm p-6 rounded-xl border border-red-400/50 shadow-xl">
              <h3 className="font-bold text-red-300 mb-4 text-center text-xl">🐌 INDUSTRY STANDARD</h3>
              <div className="space-y-3 text-lg">
                <div className="flex justify-between items-center">
                  <span>Initial Assessment:</span>
                  <span className="font-bold text-red-300 text-xl">3-5 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Comprehensive Report:</span>
                  <span className="font-bold text-red-300 text-xl">15-20 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Due Diligence:</span>
                  <span className="font-bold text-red-300 text-xl">5-10 days</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-3xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent animate-pulse">UP TO 2000% FASTER</p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 text-white p-8 rounded-2xl mb-8 shadow-2xl shadow-blue-500/30 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-emerald-400/10 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            Complete Valuation Solutions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="text-center p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-400/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="font-bold text-cyan-300 text-lg mb-2">Mortgage Security</div>
              <div className="text-cyan-100">Bank lending purposes</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-xl border border-emerald-400/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="font-bold text-emerald-300 text-lg mb-2">Family Law</div>
              <div className="text-emerald-100">Property settlements</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-xl border border-purple-400/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="font-bold text-purple-300 text-lg mb-2">Probate & Estate</div>
              <div className="text-purple-100">Inheritance valuations</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-xl border border-orange-400/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="font-bold text-orange-300 text-lg mb-2">Insurance</div>
              <div className="text-orange-100">Replacement cost assessment</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-pink-500/20 to-rose-600/20 rounded-xl border border-pink-400/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="font-bold text-pink-300 text-lg mb-2">Compulsory Acquisition</div>
              <div className="text-pink-100">Government resumption</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-teal-500/20 to-cyan-600/20 rounded-xl border border-teal-400/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="font-bold text-teal-300 text-lg mb-2">Investment Analysis</div>
              <div className="text-teal-100">Acquisition & disposal</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-indigo-500/20 to-blue-600/20 rounded-xl border border-indigo-400/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="font-bold text-indigo-300 text-lg mb-2">Accounting</div>
              <div className="text-indigo-100">Fair value assessment</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl border border-yellow-400/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="font-bold text-yellow-300 text-lg mb-2">Tax Purposes</div>
              <div className="text-yellow-100">CGT & depreciation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-gradient-to-r from-cyan-400 to-emerald-400 pt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/30 shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent mb-6">Get Professional Valuation</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">info@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">0417 693 838</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl shadow-cyan-500/30 border border-cyan-400/50">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Our Valuations?</h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-300" />
                <span>INSTANT same-day valuations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-300" />
                <span>RICS certified professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-300" />
                <span>Comprehensive due diligence included</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-300" />
                <span>AI-enhanced accuracy & insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-cyan-400/30 relative z-10">
        <p className="text-lg text-cyan-100 font-semibold">
          © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
          <br />
          <span className="text-emerald-300">RICS Registered Valuer | Professional Indemnity Insurance | API Certified</span>
        </p>
      </div>
    </div>
  );
};

export default PropertyValuationsBrochure;