import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard-3d.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Leaf,
  Target,
  Zap,
  Globe,
  Building,
  Users,
  Moon,
  Calculator,
  DollarSign,
  Shield,
  Sparkles,
  ChartLine
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
      {/* Enhanced 3D Background with Cloud-like Effects */}
      <div className="absolute inset-0">
        {/* Animated cloud-like shapes */}
        <div 
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-white/10 to-blue-200/20 rounded-full blur-3xl animate-pulse" 
          style={{
            transform: 'perspective(1000px) rotateX(45deg) rotateY(45deg)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-32 right-20 w-80 h-80 bg-gradient-to-r from-blue-300/15 to-purple-300/20 rounded-full blur-3xl" 
          style={{
            transform: 'perspective(1000px) rotateX(-30deg) rotateZ(30deg)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        <div 
          className="absolute bottom-20 left-32 w-72 h-72 bg-gradient-to-r from-emerald-300/15 to-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000" 
          style={{
            transform: 'perspective(1000px) rotateY(-45deg) rotateX(30deg)',
            animation: 'float 12s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-40 right-40 w-64 h-64 bg-gradient-to-r from-orange-300/15 to-yellow-300/20 rounded-full blur-3xl" 
          style={{
            transform: 'perspective(1000px) rotateX(60deg) rotateZ(-30deg)',
            animation: 'float 9s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* 3D Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'center bottom',
        }}
      />

      {/* Header with Sustano Pro Branding */}
      <div className="relative z-10 text-center py-8 px-4">
        {/* Sustano Pro Logo and Title */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-blue-200/30 rounded-full blur-2xl opacity-60 animate-pulse" />
              <Moon 
                className="relative h-16 w-16 text-white" 
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))',
                  transform: 'perspective(1000px) rotateY(-15deg)',
                }} 
              />
            </div>
            <h1 
              className="text-6xl font-bold text-white" 
              style={{
                textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(59,130,246,0.3)',
                transform: 'perspective(1000px) rotateX(5deg)',
              }}
            >
              Sustano Pro
            </h1>
            <Moon className="h-8 w-8 text-white/60" />
          </div>
          
          <h2 
            className="text-4xl font-semibold text-white mb-3" 
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.3)',
              transform: 'perspective(1000px) rotateX(2deg)',
            }}
          >
            ICV (Instant Comprehensive Valuation)™
          </h2>
          
          <p 
            className="text-xl text-white/90 font-medium" 
            style={{
              textShadow: '0 0 15px rgba(255,255,255,0.2)',
            }}
          >
            AI-Powered Property Valuation And Assessment Technology
          </p>
          
          <p className="text-white/75 text-sm mt-2">
            Trademarked • Patented • IP Protected • Copyright Protected
          </p>
        </div>

        {/* Platform Status Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-lg rounded-full px-6 py-2 border border-green-400/50">
            <span className="text-green-200 font-medium">🔋 ICV Platform Operational</span>
          </div>
          <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 backdrop-blur-lg rounded-full px-6 py-2 border border-blue-400/50">
            <span className="text-blue-200 font-medium">🔮 CV3 Automated Comprehensive Platform</span>
          </div>
        </div>
      </div>

      {/* Main Platform Grid */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Platform Navigation */}
          <div 
            className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/30 mb-8"
            style={{
              transform: 'perspective(1000px) rotateX(-1deg)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            
            {/* Main Platform Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Analytics Dashboard */}
              <Link to="/icv-dashboard">
                <Card 
                  className="bg-gradient-to-br from-blue-400/30 to-indigo-500/30 backdrop-blur-lg border-blue-300/50 hover:border-blue-300/80 transition-all duration-500 cursor-pointer group hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateY(-2deg) rotateX(3deg)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <BarChart3 
                      className="h-12 w-12 mx-auto text-blue-200 mb-3 group-hover:scale-110 transition-transform"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.5))' }} 
                    />
                    <h4 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h4>
                    <p className="text-blue-100 text-sm">Comprehensive analytics and reporting</p>
                  </CardContent>
                </Card>
              </Link>

              {/* ESG Platform */}
              <Link to="/esg-climate-assessment">
                <Card 
                  className="bg-gradient-to-br from-emerald-400/30 to-green-500/30 backdrop-blur-lg border-emerald-300/50 hover:border-emerald-300/80 transition-all duration-500 cursor-pointer group hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateY(-1deg) rotateX(3deg)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <Leaf 
                      className="h-12 w-12 mx-auto text-emerald-200 mb-3 group-hover:scale-110 transition-transform"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.5))' }} 
                    />
                    <h4 className="text-lg font-semibold text-white mb-2">ESG Platform</h4>
                    <p className="text-emerald-100 text-sm">Environmental analysis and reporting</p>
                  </CardContent>
                </Card>
              </Link>

              {/* SAM Platform */}
              <Link to="/sam-platform">
                <Card 
                  className="bg-gradient-to-br from-purple-400/30 to-violet-500/30 backdrop-blur-lg border-purple-300/50 hover:border-purple-300/80 transition-all duration-500 cursor-pointer group hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateY(0deg) rotateX(3deg)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <Target 
                      className="h-12 w-12 mx-auto text-purple-200 mb-3 group-hover:scale-110 transition-transform"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.5))' }} 
                    />
                    <h4 className="text-lg font-semibold text-white mb-2">SAM Platform</h4>
                    <p className="text-purple-100 text-sm">Strategic Asset Management</p>
                  </CardContent>
                </Card>
              </Link>

              {/* Blockchain Hub */}
              <Link to="/crypto-trading-dashboard">
                <Card 
                  className="bg-gradient-to-br from-orange-400/30 to-red-500/30 backdrop-blur-lg border-orange-300/50 hover:border-orange-300/80 transition-all duration-500 cursor-pointer group hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateY(1deg) rotateX(3deg)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <Zap 
                      className="h-12 w-12 mx-auto text-orange-200 mb-3 group-hover:scale-110 transition-transform"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(251,146,60,0.5))' }} 
                    />
                    <h4 className="text-lg font-semibold text-white mb-2">Blockchain Hub</h4>
                    <p className="text-orange-100 text-sm">Crypto and digital assets</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Sustano Sphere Platform */}
            <div className="mb-8">
              <Link to="/sustano-sphere">
                <Card 
                  className="bg-gradient-to-br from-cyan-400/25 to-teal-500/25 backdrop-blur-lg border-cyan-300/40 hover:border-cyan-300/70 transition-all duration-500 cursor-pointer group hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateX(2deg)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Globe 
                        className="h-10 w-10 text-cyan-200"
                        style={{ filter: 'drop-shadow(0 0 15px rgba(6,182,212,0.5))' }} 
                      />
                      <h4 className="text-2xl font-bold text-white">Sustano Sphere™</h4>
                    </div>
                    <p className="text-cyan-100">Revolutionary platform ecosystem</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Secondary Platforms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Mortgage Broker */}
              <Link to="/investment-platform">
                <Card className="bg-gradient-to-br from-teal-400/25 to-cyan-500/25 backdrop-blur-lg border-teal-300/40 hover:border-teal-300/70 transition-all duration-500 cursor-pointer group hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <DollarSign 
                      className="h-10 w-10 mx-auto text-teal-200 mb-3"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(20,184,166,0.5))' }} 
                    />
                    <h4 className="text-lg font-semibold text-white mb-2">Mortgage Broker</h4>
                    <p className="text-teal-100 text-sm">Mortgage and finance platform</p>
                  </CardContent>
                </Card>
              </Link>

              {/* Reality Sales */}
              <Link to="/reality-sales">
                <Card className="bg-gradient-to-br from-pink-400/25 to-rose-500/25 backdrop-blur-lg border-pink-300/40 hover:border-pink-300/70 transition-all duration-500 cursor-pointer group hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <Building 
                      className="h-10 w-10 mx-auto text-pink-200 mb-3"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(236,72,153,0.5))' }} 
                    />
                    <h4 className="text-lg font-semibold text-white mb-2">Reality Sales</h4>
                    <p className="text-pink-100 text-sm">Real estate sales platform</p>
                  </CardContent>
                </Card>
              </Link>

              {/* Property Management */}
              <Link to="/work-hub">
                <Card className="bg-gradient-to-br from-indigo-400/25 to-blue-500/25 backdrop-blur-lg border-indigo-300/40 hover:border-indigo-300/70 transition-all duration-500 cursor-pointer group hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <Building 
                      className="h-10 w-10 mx-auto text-indigo-200 mb-3"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.5))' }} 
                    />
                    <h4 className="text-lg font-semibold text-white mb-2">Property Management</h4>
                    <p className="text-indigo-100 text-sm">Property management hub</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Property Valuation Section */}
            <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/30">
              <h3 className="text-2xl font-bold text-white text-center mb-6">Start Property Valuation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Commercial Property */}
                <Link to="/property-valuations?type=commercial">
                  <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Building className="h-8 w-8 mx-auto text-green-600 mb-3" />
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Commercial Property</h4>
                      <p className="text-gray-600 text-sm mb-4">AUTOMATED ANALYTICS INCLUDED</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        <li>• Income analysis</li>
                        <li>• Market assessment</li>
                        <li>• Yield analysis</li>
                        <li>• ROI calculations</li>
                      </ul>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Start Commercial Property Valuation
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                {/* Residential Property */}
                <Link to="/property-valuations?type=residential">
                  <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Building className="h-8 w-8 mx-auto text-green-600 mb-3" />
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Residential Property</h4>
                      <p className="text-gray-600 text-sm mb-4">AUTOMATED ANALYTICS INCLUDED</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        <li>• Comparable sales</li>
                        <li>• Market trends</li>
                        <li>• Price analysis</li>
                        <li>• Growth forecasts</li>
                      </ul>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Start Residential Property Valuation
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                {/* Agricultural Property */}
                <Link to="/property-valuations?type=agricultural">
                  <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Leaf className="h-8 w-8 mx-auto text-green-600 mb-3" />
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Agricultural Property</h4>
                      <p className="text-gray-600 text-sm mb-4">AUTOMATED ANALYTICS INCLUDED</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        <li>• Soil analysis</li>
                        <li>• Water rights</li>
                        <li>• Farming zones</li>
                        <li>• Productivity metrics</li>
                      </ul>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Start Agricultural Property Valuation
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                {/* Specialised Property */}
                <Link to="/property-valuations?type=specialised">
                  <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Target className="h-8 w-8 mx-auto text-green-600 mb-3" />
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Specialised Property</h4>
                      <p className="text-gray-600 text-sm mb-4">AUTOMATED ANALYTICS INCLUDED</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        <li>• Plant & equipment</li>
                        <li>• Industry analysis</li>
                        <li>• Special considerations</li>
                        <li>• Custom methodologies</li>
                      </ul>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Start Specialised Property Valuation
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                {/* Development Site */}
                <Link to="/development-site-valuation">
                  <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Calculator className="h-8 w-8 mx-auto text-green-600 mb-3" />
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Development Site</h4>
                      <p className="text-gray-600 text-sm mb-4">AUTOMATED ANALYTICS INCLUDED</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        <li>• Site assessment</li>
                        <li>• Planning approval</li>
                        <li>• Feasibility studies</li>
                        <li>• Development potential</li>
                      </ul>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Start Development Site Valuation
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;