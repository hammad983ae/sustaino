/**
 * Blockchain Platform Professional Brochure - PDF Ready
 * Advanced blockchain infrastructure for property & ESG applications
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Zap, Globe, Lock, TrendingUp, Award,
  BarChart3, Cpu, CheckCircle, Phone, Mail, MapPin,
  Database, Network, Star, Brain, Coins
} from 'lucide-react';

const BlockchainBrochure = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-8 max-w-4xl mx-auto print:p-0 print:max-w-none relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-gradient-to-r from-indigo-400 to-purple-400 pb-6 relative z-10">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 animate-pulse">
            <Shield className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
            BlockChain Platform™
          </h1>
        </div>
        <p className="text-2xl text-white font-bold mb-6 drop-shadow-lg">
          Next-Generation Blockchain Infrastructure for Property & ESG Applications
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform">
            🔐 Quantum-Safe
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform">
            ⚡ Lightning Fast
          </Badge>
          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 text-sm font-bold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform">
            🌱 Carbon Negative
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
        
        {/* Blockchain Features */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Revolutionary Blockchain Features
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-indigo-400/30 shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Quantum-Resistant Security</h3>
                <p className="text-indigo-100 mb-2">Future-proof cryptography protecting all transactions</p>
                <p className="text-xs text-indigo-300 font-semibold">• Post-quantum algorithms • Zero knowledge proofs</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-pink-600/20 backdrop-blur-sm rounded-xl border border-purple-400/30 shadow-xl shadow-purple-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Lightning Network Integration</h3>
                <p className="text-purple-100 mb-2">Sub-second transactions with minimal energy consumption</p>
                <p className="text-xs text-purple-300 font-semibold">• 100,000+ TPS • <$0.001 fees • Instant finality</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-cyan-400/30 shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Smart Contract Platform</h3>
                <p className="text-cyan-100 mb-2">Advanced property and ESG application framework</p>
                <p className="text-xs text-cyan-300 font-semibold">• Automated valuations • Compliance tracking • Audit trails</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl border border-emerald-400/30 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Network className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Cross-Chain Interoperability</h3>
                <p className="text-emerald-100 mb-2">Seamless integration with major blockchain networks</p>
                <p className="text-xs text-emerald-300 font-semibold">• Multi-chain support • Bridge protocols • Universal APIs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Platform Performance
          </h2>
          
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-indigo-500/30 to-purple-600/30 backdrop-blur-sm p-6 rounded-xl border border-indigo-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-indigo-300 animate-pulse">150K</div>
                <div className="text-sm font-bold text-indigo-100">TPS Capacity</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/30 to-pink-600/30 backdrop-blur-sm p-6 rounded-xl border border-purple-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-purple-300 animate-pulse">0.3s</div>
                <div className="text-sm font-bold text-purple-100">Block Time</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-cyan-300 animate-pulse">99.99%</div>
                <div className="text-sm font-bold text-cyan-100">Uptime</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/30 to-green-600/30 backdrop-blur-sm p-6 rounded-xl border border-emerald-400/50 shadow-xl text-center">
                <div className="text-3xl font-black text-emerald-300 animate-pulse">-65%</div>
                <div className="text-sm font-bold text-emerald-100">Carbon Impact</div>
              </div>
            </div>

            <Card className="border-2 border-indigo-400/50 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-sm shadow-xl shadow-indigo-500/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <Cpu className="h-4 w-4 text-white" />
                  </div>
                  Technical Architecture
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-100">Consensus Algorithm</span>
                    <span className="text-sm font-bold text-white">Proof-of-Green</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-100">Virtual Machine</span>
                    <span className="text-sm font-bold text-white">EVM Compatible</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-100">Storage Layer</span>
                    <span className="text-sm font-bold text-white">IPFS + Arweave</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-100">Oracle Network</span>
                    <span className="text-sm font-bold text-white">Chainlink + Custom</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <div className="bg-gradient-to-br from-slate-800/80 to-indigo-900/80 backdrop-blur-sm p-6 rounded-2xl border border-indigo-400/30 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">Property Applications</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-indigo-300">🏠</div>
                  <div className="text-xs text-indigo-100">Property Tokens</div>
                </div>
                <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-300">📊</div>
                  <div className="text-xs text-purple-100">ESG Tracking</div>
                </div>
                <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-cyan-300">🔄</div>
                  <div className="text-xs text-cyan-100">Smart Contracts</div>
                </div>
                <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-emerald-300">💰</div>
                  <div className="text-xs text-emerald-100">DeFi Integration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-2xl mb-8 shadow-2xl shadow-indigo-500/30 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
            🚀 Advanced Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-xl border border-indigo-400/50 backdrop-blur-sm">
              <Lock className="h-10 w-10 mx-auto mb-3 text-indigo-300" />
              <div className="font-bold text-lg mb-2">Quantum Safe</div>
              <div className="text-xs text-indigo-100">Post-quantum cryptography</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-xl border border-purple-400/50 backdrop-blur-sm">
              <Zap className="h-10 w-10 mx-auto mb-3 text-purple-300" />
              <div className="font-bold text-lg mb-2">Lightning Speed</div>
              <div className="text-xs text-purple-100">Sub-second finality</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-xl border border-cyan-400/50 backdrop-blur-sm">
              <Brain className="h-10 w-10 mx-auto mb-3 text-cyan-300" />
              <div className="font-bold text-lg mb-2">AI Integration</div>
              <div className="text-xs text-cyan-100">Smart automation</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-500/30 to-green-600/30 rounded-xl border border-emerald-400/50 backdrop-blur-sm">
              <Globe className="h-10 w-10 mx-auto mb-3 text-emerald-300" />
              <div className="font-bold text-lg mb-2">Global Scale</div>
              <div className="text-xs text-emerald-100">Multi-region deployment</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-xl border border-orange-400/50 backdrop-blur-sm">
              <Coins className="h-10 w-10 mx-auto mb-3 text-orange-300" />
              <div className="font-bold text-lg mb-2">Multi-Token</div>
              <div className="text-xs text-orange-100">Cross-chain compatibility</div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Impact */}
      <div className="bg-gradient-to-br from-indigo-50/10 to-purple-50/10 border-2 border-indigo-300/30 rounded-2xl p-8 mb-8 backdrop-blur-sm relative z-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-6 text-center drop-shadow-lg">
          🌟 Platform Advantages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <TrendingUp className="h-16 w-16 mx-auto mb-4 text-indigo-400" />
            <div className="text-3xl font-bold text-indigo-300">10,000x</div>
            <div className="text-lg font-medium text-white">Faster Than Bitcoin</div>
            <div className="text-sm text-indigo-200">transaction processing speed</div>
          </div>
          <div className="text-center">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 text-purple-400" />
            <div className="text-3xl font-bold text-purple-300">99.5%</div>
            <div className="text-lg font-medium text-white">Energy Reduction</div>
            <div className="text-sm text-purple-200">compared to Proof-of-Work</div>
          </div>
          <div className="text-center">
            <Star className="h-16 w-16 mx-auto mb-4 text-cyan-400" />
            <div className="text-3xl font-bold text-cyan-300">$0.0001</div>
            <div className="text-lg font-medium text-white">Average Fee</div>
            <div className="text-sm text-cyan-200">per transaction</div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-gradient-to-r from-indigo-400 to-purple-400 pt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-800/80 to-indigo-900/80 backdrop-blur-sm p-8 rounded-2xl border border-indigo-400/30 shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-6">Deploy on Our Platform</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">blockchain@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">0417 693 838</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-2xl shadow-indigo-500/30 border border-indigo-400/50">
            <h3 className="text-2xl font-bold mb-6 text-center">Join the Blockchain Revolution!</h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-indigo-300" />
                <span>Free developer onboarding</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-indigo-300" />
                <span>Comprehensive API documentation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-indigo-300" />
                <span>Testnet access & support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-indigo-300" />
                <span>Enterprise-grade infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-indigo-400/30 relative z-10">
        <p className="text-lg text-indigo-100 font-semibold">
          © 2025 DeLorenzo Property Group Pty Ltd. BlockChain Platform™ is a registered trademark.
          <br />
          <span className="text-purple-300">Next-generation blockchain infrastructure - Patent protected technology.</span>
        </p>
      </div>
    </div>
  );
};

export default BlockchainBrochure;