/**
 * SustanoCoin™ Professional Brochure - PDF Ready
 * Blockchain cryptocurrency for sustainable property investments
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Coins, TrendingUp, Shield, Zap, Globe, Award,
  BarChart3, Lock, CheckCircle, Phone, Mail, MapPin,
  Wallet, DollarSign, Star, Brain, Leaf
} from 'lucide-react';

const SustanoCoinBrochure = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 p-8 max-w-4xl mx-auto print:p-0 print:max-w-none relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-gradient-to-r from-emerald-400 to-blue-400 pb-6 relative z-10">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 animate-pulse">
            <Coins className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-300 via-white to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
            SustanoCoin™
          </h1>
        </div>
        <p className="text-2xl text-white font-bold mb-6 drop-shadow-lg">
          World's First ESG-Focused Cryptocurrency for Sustainable Property Investment
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform">
            🌱 Carbon Neutral
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform">
            🔒 Blockchain Secured
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform">
            📈 High Yield Staking
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
        
        {/* Coin Features */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Revolutionary Crypto Features
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl border border-emerald-400/30 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">ESG-Integrated Mining</h3>
                <p className="text-emerald-100 mb-2">100% renewable energy powered blockchain operations</p>
                <p className="text-xs text-emerald-300 font-semibold">• Carbon negative footprint • Solar powered nodes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-cyan-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 shadow-xl shadow-blue-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">High Yield Staking</h3>
                <p className="text-blue-100 mb-2">Up to 12% APY for sustainable property investments</p>
                <p className="text-xs text-blue-300 font-semibold">• Compound rewards • Flexible terms • Auto-reinvestment</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-600/20 backdrop-blur-sm rounded-xl border border-purple-400/30 shadow-xl shadow-purple-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Quantum-Resistant Security</h3>
                <p className="text-purple-100 mb-2">Advanced cryptography protecting your investments</p>
                <p className="text-xs text-purple-300 font-semibold">• Military-grade encryption • Multi-sig wallets</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl border border-orange-400/30 shadow-xl shadow-orange-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Lightning Fast Transactions</h3>
                <p className="text-orange-100 mb-2">Sub-second settlements with minimal fees</p>
                <p className="text-xs text-orange-300 font-semibold">• Less than $0.01 transaction costs • Instant confirmations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Data & Analytics */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Live Market Performance
          </h2>
          
          <div className="space-y-6">
            {/* Price Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-500/30 to-green-600/30 backdrop-blur-sm p-6 rounded-xl border border-emerald-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-emerald-300 animate-pulse">$2.85</div>
                <div className="text-sm font-bold text-emerald-100">Current Price</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/30 to-cyan-600/30 backdrop-blur-sm p-6 rounded-xl border border-blue-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-blue-300 animate-pulse">+47.8%</div>
                <div className="text-sm font-bold text-blue-100">30-Day Growth</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/30 to-violet-600/30 backdrop-blur-sm p-6 rounded-xl border border-purple-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-purple-300 animate-pulse">$125M</div>
                <div className="text-sm font-bold text-purple-100">Market Cap</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/30 to-red-600/30 backdrop-blur-sm p-6 rounded-xl border border-orange-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-orange-300 animate-pulse">12.4%</div>
                <div className="text-sm font-bold text-orange-100">Staking APY</div>
              </div>
            </div>

            <Card className="border-2 border-emerald-400/50 bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-sm shadow-xl shadow-emerald-500/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mr-3">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  Tokenomics Distribution
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100">Sustainable Projects (40%)</span>
                    <div className="w-24 bg-emerald-200/30 rounded-full h-3">
                      <div className="bg-emerald-400 h-3 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100">Community Rewards (30%)</span>
                    <div className="w-24 bg-blue-200/30 rounded-full h-3">
                      <div className="bg-blue-400 h-3 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100">Development Fund (20%)</span>
                    <div className="w-24 bg-purple-200/30 rounded-full h-3">
                      <div className="bg-purple-400 h-3 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100">Liquidity Pool (10%)</span>
                    <div className="w-24 bg-orange-200/30 rounded-full h-3">
                      <div className="bg-orange-400 h-3 rounded-full w-2/5"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Utility Benefits */}
            <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-sm p-6 rounded-2xl border border-cyan-400/30 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">Exclusive Holder Benefits</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-cyan-100">Priority access to property auctions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-cyan-100">Reduced transaction fees (up to 90% off)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-cyan-100">Governance voting rights</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-cyan-100">Exclusive ESG investment opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-8 shadow-2xl shadow-emerald-500/30 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
            🚀 Revolutionary Blockchain Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-emerald-500/30 to-green-600/30 rounded-xl border border-emerald-400/50 backdrop-blur-sm">
              <Leaf className="h-10 w-10 mx-auto mb-3 text-emerald-300" />
              <div className="font-bold text-lg mb-2">Carbon Negative</div>
              <div className="text-xs text-emerald-100">Proof-of-Green consensus</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 rounded-xl border border-blue-400/50 backdrop-blur-sm">
              <Zap className="h-10 w-10 mx-auto mb-3 text-blue-300" />
              <div className="font-bold text-lg mb-2">Lightning Network</div>
              <div className="text-xs text-blue-100">Sub-second transactions</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-500/30 to-violet-600/30 rounded-xl border border-purple-400/50 backdrop-blur-sm">
              <Shield className="h-10 w-10 mx-auto mb-3 text-purple-300" />
              <div className="font-bold text-lg mb-2">Quantum Safe</div>
              <div className="text-xs text-purple-100">Future-proof security</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-xl border border-orange-400/50 backdrop-blur-sm">
              <Brain className="h-10 w-10 mx-auto mb-3 text-orange-300" />
              <div className="font-bold text-lg mb-2">AI-Optimized</div>
              <div className="text-xs text-orange-100">Smart contract automation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-gradient-to-r from-emerald-400 to-blue-400 pt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-800/80 to-emerald-900/80 backdrop-blur-sm p-8 rounded-2xl border border-emerald-400/30 shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent mb-6">Start Your Crypto Journey</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">crypto@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">0417 693 838</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">Download SustanoWallet</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-2xl shadow-emerald-500/30 border border-emerald-400/50">
            <h3 className="text-2xl font-bold mb-6 text-center">Join the Green Revolution!</h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-300" />
                <span>Free wallet setup & tutorial</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-300" />
                <span>$50 welcome bonus in SustanoCoin</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-300" />
                <span>Premium staking rates (first 90 days)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-300" />
                <span>24/7 crypto support & education</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-emerald-400/30 relative z-10">
        <p className="text-lg text-emerald-100 font-semibold">
          © 2025 DeLorenzo Property Group Pty Ltd. SustanoCoin™ is a registered trademark.
          <br />
          <span className="text-blue-300">Not financial advice. Cryptocurrency investments carry risk. Always DYOR.</span>
        </p>
      </div>
    </div>
  );
};

export default SustanoCoinBrochure;