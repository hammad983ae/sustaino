/**
 * Greenium™ Professional Brochure - PDF Ready
 * Green premium valuation methodology for sustainable properties
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, TrendingUp, BarChart3, Award, CheckCircle, 
  Calculator, DollarSign, Star, Shield, Zap,
  Phone, Mail, MapPin, Globe, Activity
} from 'lucide-react';

const GreeniumBrochure = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 p-8 max-w-4xl mx-auto print:p-0 print:max-w-none relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-lime-400 to-green-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-gradient-to-r from-green-400 to-emerald-400 pb-6 relative z-10">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 animate-pulse">
            <Leaf className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-green-300 via-white to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl">
            Greenium™
          </h1>
        </div>
        <p className="text-2xl text-white font-bold mb-6 drop-shadow-lg">
          World's First Quantified Green Premium Valuation Methodology
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-green-500/30 hover:scale-105 transition-transform">
            🌱 ESG Certified
          </Badge>
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform">
            📊 Data-Driven
          </Badge>
          <Badge className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-teal-500/30 hover:scale-105 transition-transform">
            🏆 Industry First
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
        
        {/* Greenium Features */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Revolutionary Green Valuations
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl border border-green-400/30 shadow-xl shadow-green-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Quantified Green Premium</h3>
                <p className="text-green-100 mb-2">Precise calculation of sustainability value uplift</p>
                <p className="text-xs text-green-300 font-semibold">• 5-25% premium range • Data validated • Market proven</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-teal-600/20 backdrop-blur-sm rounded-xl border border-emerald-400/30 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">ESG Score Integration</h3>
                <p className="text-emerald-100 mb-2">Comprehensive environmental impact assessment</p>
                <p className="text-xs text-emerald-300 font-semibold">• Energy efficiency • Carbon footprint • Water usage</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-cyan-600/20 backdrop-blur-sm rounded-xl border border-teal-400/30 shadow-xl shadow-teal-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Market Performance Tracking</h3>
                <p className="text-teal-100 mb-2">Real-time green premium market intelligence</p>
                <p className="text-xs text-teal-300 font-semibold">• Trend analysis • Comparable sales • Future projections</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-lime-500/20 via-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl border border-lime-400/30 shadow-xl shadow-lime-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Certification Benefits</h3>
                <p className="text-lime-100 mb-2">NABERS, Green Star, and BREEAM integration</p>
                <p className="text-xs text-lime-300 font-semibold">• Official ratings • Premium validation • Market acceptance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Analysis */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Green Premium Analytics
          </h2>
          
          <div className="space-y-6">
            {/* Premium Ranges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-500/30 to-emerald-600/30 backdrop-blur-sm p-6 rounded-xl border border-green-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-green-300 animate-pulse">8.5%</div>
                <div className="text-sm font-bold text-green-100">Average Premium</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/30 to-teal-600/30 backdrop-blur-sm p-6 rounded-xl border border-emerald-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-emerald-300 animate-pulse">25%</div>
                <div className="text-sm font-bold text-emerald-100">Max Premium</div>
              </div>
              <div className="bg-gradient-to-br from-teal-500/30 to-cyan-600/30 backdrop-blur-sm p-6 rounded-xl border border-teal-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-teal-300 animate-pulse">$2.4M</div>
                <div className="text-sm font-bold text-teal-100">Avg Value Add</div>
              </div>
              <div className="bg-gradient-to-br from-lime-500/30 to-green-600/30 backdrop-blur-sm p-6 rounded-xl border border-lime-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-lime-300 animate-pulse">18 Mo</div>
                <div className="text-sm font-bold text-lime-100">ROI Timeline</div>
              </div>
            </div>

            <Card className="border-2 border-green-400/50 bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm shadow-xl shadow-green-500/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  Greenium Factors Analysis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Energy Efficiency (35%)</span>
                    <div className="w-24 bg-green-200/30 rounded-full h-3">
                      <div className="bg-green-400 h-3 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Carbon Reduction (25%)</span>
                    <div className="w-24 bg-emerald-200/30 rounded-full h-3">
                      <div className="bg-emerald-400 h-3 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Water Conservation (20%)</span>
                    <div className="w-24 bg-teal-200/30 rounded-full h-3">
                      <div className="bg-teal-400 h-3 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Material Sustainability (20%)</span>
                    <div className="w-24 bg-lime-200/30 rounded-full h-3">
                      <div className="bg-lime-400 h-3 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Types */}
            <div className="bg-gradient-to-br from-slate-800/80 to-green-900/80 backdrop-blur-sm p-6 rounded-2xl border border-green-400/30 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">Property Type Premiums</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-300">12-18%</div>
                  <div className="text-xs text-green-100">Commercial Offices</div>
                </div>
                <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-emerald-300">8-15%</div>
                  <div className="text-xs text-emerald-100">Residential</div>
                </div>
                <div className="bg-teal-500/20 border border-teal-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-teal-300">15-25%</div>
                  <div className="text-xs text-teal-100">Industrial</div>
                </div>
                <div className="bg-lime-500/20 border border-lime-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-lime-300">10-20%</div>
                  <div className="text-xs text-lime-100">Retail</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Showcase */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-8 rounded-2xl mb-8 shadow-2xl shadow-green-500/30 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
            🌱 Scientific Greenium Methodology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-xl border border-green-400/50 backdrop-blur-sm">
              <Activity className="h-10 w-10 mx-auto mb-3 text-green-300" />
              <div className="font-bold text-lg mb-2">ESG Assessment</div>
              <div className="text-xs text-green-100">Comprehensive scoring</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-500/30 to-teal-600/30 rounded-xl border border-emerald-400/50 backdrop-blur-sm">
              <BarChart3 className="h-10 w-10 mx-auto mb-3 text-emerald-300" />
              <div className="font-bold text-lg mb-2">Market Analysis</div>
              <div className="text-xs text-emerald-100">Comparable sales data</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-teal-500/30 to-cyan-600/30 rounded-xl border border-teal-400/50 backdrop-blur-sm">
              <Calculator className="h-10 w-10 mx-auto mb-3 text-teal-300" />
              <div className="font-bold text-lg mb-2">Premium Calculation</div>
              <div className="text-xs text-teal-100">Algorithmic precision</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-lime-500/30 to-green-600/30 rounded-xl border border-lime-400/50 backdrop-blur-sm">
              <Shield className="h-10 w-10 mx-auto mb-3 text-lime-300" />
              <div className="font-bold text-lg mb-2">Validation</div>
              <div className="text-xs text-lime-100">Third-party verification</div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Impact */}
      <div className="bg-gradient-to-br from-green-50/10 to-emerald-50/10 border-2 border-green-300/30 rounded-2xl p-8 mb-8 backdrop-blur-sm relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-6 text-center drop-shadow-lg">
          💰 Proven Market Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <DollarSign className="h-16 w-16 mx-auto mb-4 text-green-400" />
            <div className="text-3xl font-bold text-green-300">$12.7B</div>
            <div className="text-lg font-medium text-white">Green Premium Value</div>
            <div className="text-sm text-green-200">captured in 2024</div>
          </div>
          <div className="text-center">
            <TrendingUp className="h-16 w-16 mx-auto mb-4 text-emerald-400" />
            <div className="text-3xl font-bold text-emerald-300">34%</div>
            <div className="text-lg font-medium text-white">Annual Growth</div>
            <div className="text-sm text-emerald-200">in green property demand</div>
          </div>
          <div className="text-center">
            <Globe className="h-16 w-16 mx-auto mb-4 text-teal-400" />
            <div className="text-3xl font-bold text-teal-300">85%</div>
            <div className="text-lg font-medium text-white">Investor Preference</div>
            <div className="text-sm text-teal-200">for sustainable properties</div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-gradient-to-r from-green-400 to-emerald-400 pt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-800/80 to-green-900/80 backdrop-blur-sm p-8 rounded-2xl border border-green-400/30 shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-6">Unlock Your Green Value</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">greenium@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">0417 693 838</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white p-8 rounded-2xl shadow-2xl shadow-green-500/30 border border-green-400/50">
            <h3 className="text-2xl font-bold mb-6 text-center">Start Your Green Journey!</h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span>Free Greenium assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span>Detailed premium calculation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span>ESG improvement roadmap</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span>Market intelligence reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-green-400/30 relative z-10">
        <p className="text-lg text-green-100 font-semibold">
          © 2025 DeLorenzo Property Group Pty Ltd. Greenium™ is a registered trademark.
          <br />
          <span className="text-emerald-300">World's first quantified green premium methodology - Patent protected.</span>
        </p>
      </div>
    </div>
  );
};

export default GreeniumBrochure;