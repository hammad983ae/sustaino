/**
 * SAM Platform™ Professional Brochure - PDF Ready
 * Strategic Asset Management platform for comprehensive portfolio management
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, TrendingUp, Target, Award, CheckCircle, 
  Calculator, DollarSign, Star, Shield, Zap,
  Phone, Mail, MapPin, Globe, Activity, Brain
} from 'lucide-react';

const SAMPlatformBrochure = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 p-8 max-w-4xl mx-auto print:p-0 print:max-w-none relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-teal-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-gradient-to-r from-blue-400 to-teal-400 pb-6 relative z-10">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
            <BarChart3 className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-300 via-white to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
            SAM Platform™
          </h1>
        </div>
        <p className="text-2xl text-white font-bold mb-6 drop-shadow-lg">
          Strategic Asset Management: Revolutionary Portfolio Intelligence Platform
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform">
            📊 AI-Powered Analytics
          </Badge>
          <Badge className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-teal-500/30 hover:scale-105 transition-transform">
            🎯 Strategic Planning
          </Badge>
          <Badge className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform">
            🚀 Performance Optimization
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
        
        {/* SAM Features */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Strategic Management Features
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-500/20 via-teal-500/20 to-teal-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 shadow-xl shadow-blue-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Strategic Asset Allocation</h3>
                <p className="text-blue-100 mb-2">AI-driven portfolio optimization across asset classes</p>
                <p className="text-xs text-blue-300 font-semibold">• Risk assessment • Return modeling • Correlation analysis</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-cyan-600/20 backdrop-blur-sm rounded-xl border border-teal-400/30 shadow-xl shadow-teal-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Performance Analytics</h3>
                <p className="text-teal-100 mb-2">Real-time tracking and advanced performance metrics</p>
                <p className="text-xs text-teal-300 font-semibold">• Sharpe ratios • Alpha generation • Benchmark analysis</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-indigo-400/30 shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Risk Management</h3>
                <p className="text-indigo-100 mb-2">Advanced risk modeling and scenario analysis</p>
                <p className="text-xs text-indigo-300 font-semibold">• VaR calculations • Stress testing • Hedging strategies</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-cyan-500/20 via-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl border border-cyan-400/30 shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">AI-Powered Insights</h3>
                <p className="text-cyan-100 mb-2">Machine learning algorithms for predictive analytics</p>
                <p className="text-xs text-cyan-300 font-semibold">• Market forecasting • Pattern recognition • Auto-rebalancing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Analytics */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Platform Performance
          </h2>
          
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500/30 to-teal-600/30 backdrop-blur-sm p-6 rounded-xl border border-blue-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-blue-300 animate-pulse">$2.8B</div>
                <div className="text-sm font-bold text-blue-100">Assets Under Management</div>
              </div>
              <div className="bg-gradient-to-br from-teal-500/30 to-cyan-600/30 backdrop-blur-sm p-6 rounded-xl border border-teal-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-teal-300 animate-pulse">24.7%</div>
                <div className="text-sm font-bold text-teal-100">Alpha Generation</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500/30 to-blue-600/30 backdrop-blur-sm p-6 rounded-xl border border-indigo-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-indigo-300 animate-pulse">2,847</div>
                <div className="text-sm font-bold text-indigo-100">Active Portfolios</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/30 to-emerald-600/30 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-cyan-300 animate-pulse">18.5%</div>
                <div className="text-sm font-bold text-cyan-100">Avg Annual Return</div>
              </div>
            </div>

            <Card className="border-2 border-blue-400/50 bg-gradient-to-br from-blue-500/20 to-teal-600/20 backdrop-blur-sm shadow-xl shadow-blue-500/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center mr-3">
                    <Calculator className="h-4 w-4 text-white" />
                  </div>
                  Asset Allocation Framework
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Property Assets (45%)</span>
                    <div className="w-24 bg-blue-200/30 rounded-full h-3">
                      <div className="bg-blue-400 h-3 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Equity Investments (30%)</span>
                    <div className="w-24 bg-teal-200/30 rounded-full h-3">
                      <div className="bg-teal-400 h-3 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Alternative Assets (15%)</span>
                    <div className="w-24 bg-indigo-200/30 rounded-full h-3">
                      <div className="bg-indigo-400 h-3 rounded-full w-3/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Cash & Bonds (10%)</span>
                    <div className="w-24 bg-cyan-200/30 rounded-full h-3">
                      <div className="bg-cyan-400 h-3 rounded-full w-2/5"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Benefits */}
            <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-400/30 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">Client Success Metrics</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-300">94%</div>
                  <div className="text-xs text-blue-100">Client Satisfaction</div>
                </div>
                <div className="bg-teal-500/20 border border-teal-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-teal-300">287%</div>
                  <div className="text-xs text-teal-100">ROI Improvement</div>
                </div>
                <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-indigo-300">65%</div>
                  <div className="text-xs text-indigo-100">Risk Reduction</div>
                </div>
                <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-cyan-300">12 Mo</div>
                  <div className="text-xs text-cyan-100">Avg Payback</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Showcase */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 text-white p-8 rounded-2xl mb-8 shadow-2xl shadow-blue-500/30 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-teal-400/20 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
            📊 Advanced Strategic Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/30 to-teal-600/30 rounded-xl border border-blue-400/50 backdrop-blur-sm">
              <Brain className="h-10 w-10 mx-auto mb-3 text-blue-300" />
              <div className="font-bold text-lg mb-2">AI Analytics</div>
              <div className="text-xs text-blue-100">Machine learning insights</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-teal-500/30 to-cyan-600/30 rounded-xl border border-teal-400/50 backdrop-blur-sm">
              <Activity className="h-10 w-10 mx-auto mb-3 text-teal-300" />
              <div className="font-bold text-lg mb-2">Real-Time Data</div>
              <div className="text-xs text-teal-100">Live market feeds</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-indigo-500/30 to-blue-600/30 rounded-xl border border-indigo-400/50 backdrop-blur-sm">
              <Shield className="h-10 w-10 mx-auto mb-3 text-indigo-300" />
              <div className="font-bold text-lg mb-2">Risk Management</div>
              <div className="text-xs text-indigo-100">Advanced modeling</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-cyan-500/30 to-emerald-600/30 rounded-xl border border-cyan-400/50 backdrop-blur-sm">
              <Globe className="h-10 w-10 mx-auto mb-3 text-cyan-300" />
              <div className="font-bold text-lg mb-2">Global Markets</div>
              <div className="text-xs text-cyan-100">Worldwide coverage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Solutions */}
      <div className="bg-gradient-to-br from-blue-50/10 to-teal-50/10 border-2 border-blue-300/30 rounded-2xl p-8 mb-8 backdrop-blur-sm relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent mb-6 text-center drop-shadow-lg">
          💼 Strategic Investment Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <DollarSign className="h-16 w-16 mx-auto mb-4 text-blue-400" />
            <div className="text-3xl font-bold text-blue-300">$50M</div>
            <div className="text-lg font-medium text-white">Minimum AUM</div>
            <div className="text-sm text-blue-200">for institutional clients</div>
          </div>
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto mb-4 text-teal-400" />
            <div className="text-3xl font-bold text-teal-300">5-Star</div>
            <div className="text-lg font-medium text-white">Platform Rating</div>
            <div className="text-sm text-teal-200">industry recognition</div>
          </div>
          <div className="text-center">
            <Star className="h-16 w-16 mx-auto mb-4 text-cyan-400" />
            <div className="text-3xl font-bold text-cyan-300">24/7</div>
            <div className="text-lg font-medium text-white">Global Support</div>
            <div className="text-sm text-cyan-200">dedicated account managers</div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-gradient-to-r from-blue-400 to-teal-400 pt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/30 shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent mb-6">Strategic Partnership</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">sam@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">0417 693 838</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 via-teal-600 to-cyan-600 text-white p-8 rounded-2xl shadow-2xl shadow-blue-500/30 border border-blue-400/50">
            <h3 className="text-2xl font-bold mb-6 text-center">Optimize Your Portfolio!</h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-blue-300" />
                <span>Free portfolio analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-blue-300" />
                <span>Strategic planning consultation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-blue-300" />
                <span>Risk assessment review</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-blue-300" />
                <span>AI-powered optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-blue-400/30 relative z-10">
        <p className="text-lg text-blue-100 font-semibold">
          © 2025 DeLorenzo Property Group Pty Ltd. SAM Platform™ is a registered trademark.
          <br />
          <span className="text-teal-300">Strategic Asset Management platform - Patent protected technology.</span>
        </p>
      </div>
    </div>
  );
};

export default SAMPlatformBrochure;