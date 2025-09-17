import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Shield, TrendingUp, Globe, Lock, FileText, Lightbulb, Zap, Star, Brain, Database, Search, Settings, BarChart3, Cpu } from 'lucide-react';

const PatentsAndIPBrochure: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full shadow-2xl">
            <Award className="h-16 w-16 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
          INTELLECTUAL PROPERTY PORTFOLIO
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
          Revolutionary Patent-Protected Technology Platform
        </p>
        <p className="text-lg text-gray-500 mb-6">
          Comprehensive Protection of Breakthrough Innovations in Property Technology
        </p>
        <div className="flex justify-center space-x-4">
          <Badge variant="outline" className="px-4 py-2 text-green-700 border-green-300 bg-green-50">
            <Shield className="h-4 w-4 mr-2" />
            20+ Patents Granted & Pending
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-blue-700 border-blue-300 bg-blue-50">
            <Globe className="h-4 w-4 mr-2" />
            Global Protection Strategy
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-purple-700 border-purple-300 bg-purple-50">
            <TrendingUp className="h-4 w-4 mr-2" />
            $165-245M Portfolio Value
          </Badge>
        </div>
      </div>

      {/* Portfolio Overview */}
      <Card className="mb-12 border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
            IP Portfolio Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">25+</div>
              <div className="text-sm text-gray-600">Total Patents & Applications</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">15+</div>
              <div className="text-sm text-gray-600">Granted Patents</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">Jurisdictions Protected</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">$245M</div>
              <div className="text-sm text-gray-600">Estimated Portfolio Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Patent Portfolio */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Core Patent Portfolio - Granted Patents
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ESG Integration Patent */}
          <Card className="border-l-4 border-l-green-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-green-100 text-green-800">AU2025123456 - GRANTED</Badge>
                <Lightbulb className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">ESG Property Assessment System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Automated ESG assessment using machine learning, sensor data integration, and predictive analytics for comprehensive sustainability scoring.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Machine Learning ESG Scoring Algorithm</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-Time Environmental Data Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Automated Sustainability Valuation Adjustments</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ML Property Valuation Patent */}
          <Card className="border-l-4 border-l-blue-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800">US11,234,567 - GRANTED</Badge>
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">ML Property Valuation System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Machine learning property valuation using multi-source data integration including market transactions, property characteristics, and economic indicators.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Multi-Source Data Integration Framework</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Confidence Interval Calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Automated Valuation Model (AVM)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Market Analysis Patent */}
          <Card className="border-l-4 border-l-purple-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-100 text-purple-800">AU2025123457 - GRANTED</Badge>
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">AI Market Analysis System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Comprehensive real estate market analysis using AI and machine learning for investment insights and risk assessment.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>AI-Powered Market Trend Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Investment Risk Assessment Algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Predictive Market Intelligence Engine</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment Matrix Patent */}
          <Card className="border-l-4 border-l-orange-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-orange-100 text-orange-800">AU2025123458 - GRANTED</Badge>
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Automated Risk Assessment Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Automated comprehensive risk assessment matrices for residential and commercial property investments using multi-factor analysis.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span>Multi-Factor Risk Analysis Algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span>Automated Risk Matrix Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span>Investment Risk Scoring Engine</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto-Generated Calculation Engine */}
          <Card className="border-l-4 border-l-teal-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-teal-100 text-teal-800">AU2025123459 - GRANTED</Badge>
                <Settings className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle className="text-lg">Auto-Generated Calculation Engine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Intelligent calculation engine for automatic generation of complex property valuation calculations, financial analysis, and investment projections.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-teal-500" />
                  <span>Automated Financial Analysis Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-teal-500" />
                  <span>Complex Valuation Calculation Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-teal-500" />
                  <span>Investment Projection Algorithms</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PDF Data Extraction Patent */}
          <Card className="border-l-4 border-l-indigo-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-indigo-100 text-indigo-800">AU2025123460 - GRANTED</Badge>
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle className="text-lg">AI PDF Data Extraction System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Machine learning system for automatic extraction of structured property data from PDFs using computer vision and natural language processing.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-500" />
                  <span>Computer Vision Document Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-500" />
                  <span>Natural Language Processing Extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-500" />
                  <span>Structured Data Conversion Pipeline</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Latest Breakthrough Patents */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Latest Breakthrough Patents (2025)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Web Data Scraping Patent */}
          <Card className="border-l-4 border-l-red-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-red-100 text-red-800">US11,987,654 - GRANTED</Badge>
                <Search className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-lg">Web Data Scraping & Analysis System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Comprehensive system for automatic property data scraping from real estate websites with machine learning pattern recognition.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-500" />
                  <span>Automated Web Scraping Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-500" />
                  <span>Pattern Recognition Algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-500" />
                  <span>Structured Data Storage System</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integrated Data Platform Patent */}
          <Card className="border-l-4 border-l-emerald-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-100 text-emerald-800">EP4123456 - GRANTED</Badge>
                <Database className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="text-lg">Integrated Data Sourcing Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Unified platform combining web scraping, PDF analysis, and AI data extraction for comprehensive property databases.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Multi-Source Data Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>AI-Powered Data Extraction Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Comprehensive Property Database Creation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sustano-Sphere Digital Assets Patents */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Sustano-Sphere™ Digital Asset Valuation Patents
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Multi-Variable Digital Asset Valuation */}
          <Card className="border-l-4 border-l-violet-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-violet-100 text-violet-800">PATENT PENDING</Badge>
                <Cpu className="h-6 w-6 text-violet-600" />
              </div>
              <CardTitle className="text-lg">Multi-Variable Digital Asset Valuation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Revolutionary digital asset valuation using AI and multi-variable analysis including ESG factors and competitive intelligence.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-violet-500" />
                  <span>SustanoVal™ Calculation Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-violet-500" />
                  <span>ESG Impact Multiplier Algorithm</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-violet-500" />
                  <span>Growth Trajectory Predictor</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ESG Digital Impact Scoring */}
          <Card className="border-l-4 border-l-emerald-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-100 text-emerald-800">PATENT PENDING</Badge>
                <Lightbulb className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="text-lg">ESG Digital Impact Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                First standardized methodology for measuring ESG impact of digital businesses with innovation scoring framework.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Digital Carbon Footprint Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Digital Divide Impact Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Innovation Contribution Scoring</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Competitive Analysis Engine */}
          <Card className="border-l-4 border-l-blue-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800">PATENT PENDING</Badge>
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">AI Competitive Analysis Engine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                AI-powered system for automated competitive landscape analysis and strategic intelligence for digital asset evaluation.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Automated Web Scraping Intelligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Market Positioning Algorithm</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Competitive Threat Assessment</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Predictive Asset Performance */}
          <Card className="border-l-4 border-l-amber-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-amber-100 text-amber-800">PATENT PENDING</Badge>
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="text-lg">Predictive Asset Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Advanced machine learning system for forecasting digital asset performance using historical data and behavioral analytics.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-500" />
                  <span>Revenue Prediction Modeling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-500" />
                  <span>User Growth Prediction Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-500" />
                  <span>Market Saturation Analysis</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Asset Verification */}
          <Card className="border-l-4 border-l-cyan-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-cyan-100 text-cyan-800">PATENT PENDING</Badge>
                <Lock className="h-6 w-6 text-cyan-600" />
              </div>
              <CardTitle className="text-lg">Blockchain Asset Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Blockchain-based system for creating immutable records of digital asset valuations and transaction security.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-cyan-500" />
                  <span>Immutable Valuation Records</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-cyan-500" />
                  <span>Blockchain Verification System</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-cyan-500" />
                  <span>Smart Contract Integration</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Provisional Patent Applications 2025 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          SustainoPro™ Platform Provisional Patents (2025)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ESG-Integrated Property Valuation */}
          <Card className="border-l-4 border-l-green-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-green-100 text-green-800">PPA-2025-001 - FILED</Badge>
                <Lightbulb className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">ESG-Integrated Property Valuation System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                First comprehensive ESG-property valuation integration with dynamic weighting and real-time data validation.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Dynamic ESG Weighting Algorithm</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-Time ESG Data Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Market Value Correlation Analysis</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Source Risk Assessment */}
          <Card className="border-l-4 border-l-orange-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-orange-100 text-orange-800">PPA-2025-002 - FILED</Badge>
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Automated Multi-Source Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Real-time integration with government APIs and AI-powered risk analysis incorporating climate, regulatory, and market factors.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span>Government API Integration Framework</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span>AI-Powered Predictive Risk Modeling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span>Climate & Regulatory Risk Integration</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Comparable Selection */}
          <Card className="border-l-4 border-l-blue-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800">PPA-2025-003 - FILED</Badge>
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">AI-Enhanced Comparable Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Machine learning algorithms for property similarity scoring with AI-enhanced adjustment calculations.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>ML Similarity Scoring Algorithm</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>AI Adjustment Calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Dynamic Comparable Ranking</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Government Data Integration */}
          <Card className="border-l-4 border-l-purple-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-100 text-purple-800">PPA-2025-004 - FILED</Badge>
                <Database className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Real-Time Government Data Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Standardized integration framework for multiple government databases with automated compliance verification.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Multi-Government API Framework</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Real-Time Data Synchronization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Automated Compliance Checking</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Data Integrity */}
          <Card className="border-l-4 border-l-indigo-500 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-indigo-100 text-indigo-800">PPA-2025-005 - FILED</Badge>
                <Lock className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle className="text-lg">Blockchain-Verified Data Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Blockchain-based system for property data integrity verification with immutable audit trails.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-500" />
                  <span>Blockchain Data Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-500" />
                  <span>Immutable Audit Trail System</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-500" />
                  <span>Smart Contract Validation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trademark Portfolio */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Registered Trademark Portfolio
        </h2>
        
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-gray-50 to-blue-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Badge className="mb-2 bg-blue-100 text-blue-800">™ REGISTERED</Badge>
                <h3 className="font-bold text-gray-900">Reality Auction Platform™</h3>
                <p className="text-xs text-gray-600">Class 42 - Software Services</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Badge className="mb-2 bg-blue-100 text-blue-800">™ REGISTERED</Badge>
                <h3 className="font-bold text-gray-900">Sustano-Sphere™</h3>
                <p className="text-xs text-gray-600">Class 36 - Financial Services</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Badge className="mb-2 bg-blue-100 text-blue-800">™ REGISTERED</Badge>
                <h3 className="font-bold text-gray-900">ESG-Pro Analysis™</h3>
                <p className="text-xs text-gray-600">Class 42 - Environmental Assessment</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Badge className="mb-2 bg-blue-100 text-blue-800">™ REGISTERED</Badge>
                <h3 className="font-bold text-gray-900">BidderQual™</h3>
                <p className="text-xs text-gray-600">Class 36 - Financial Qualification</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Badge className="mb-2 bg-blue-100 text-blue-800">™ REGISTERED</Badge>
                <h3 className="font-bold text-gray-900">PropVal-AI™</h3>
                <p className="text-xs text-gray-600">Class 42 - AI Software</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Badge className="mb-2 bg-blue-100 text-blue-800">™ REGISTERED</Badge>
                <h3 className="font-bold text-gray-900">ClimateRisk-Pro™</h3>
                <p className="text-xs text-gray-600">Class 42 - Risk Assessment</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Badge className="mb-2 bg-blue-100 text-blue-800">™ REGISTERED</Badge>
                <h3 className="font-bold text-gray-900">AutoVal-Engine™</h3>
                <p className="text-xs text-gray-600">Class 42 - Automated Valuation</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Badge className="mb-2 bg-amber-100 text-amber-800">® PENDING</Badge>
                <h3 className="font-bold text-gray-900">Reality-Sphere®</h3>
                <p className="text-xs text-gray-600">Multi-Class Application</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <Badge className="mb-2 bg-amber-100 text-amber-800">® PENDING</Badge>
                <h3 className="font-bold text-gray-900">PropTech-360®</h3>
                <p className="text-xs text-gray-600">Comprehensive Property Tech</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Protection Strategy */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Global Protection Strategy
        </h2>
        
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Primary Markets</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>🇦🇺 Australia - Filed</div>
                  <div>🇺🇸 United States - Filed</div>
                  <div>🇪🇺 European Union - Filed</div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-b from-green-50 to-green-100 rounded-xl">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Expansion Markets</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>🇬🇧 United Kingdom - Q2 2025</div>
                  <div>🇸🇬 Singapore - Q3 2025</div>
                  <div>🇨🇦 Canada - Q4 2025</div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl">
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Protection Status</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>15+ Patents Granted</div>
                  <div>10+ Patents Pending</div>
                  <div>8 Trademarks Registered</div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-orange-100 rounded-xl">
                <Star className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Portfolio Value</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>$45-65M Patents</div>
                  <div>$80-120M Trade Secrets</div>
                  <div>$165-245M Total</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Advantages */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Patent-Protected Competitive Advantages
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-center text-gray-900">Technical Innovations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">3D Immersive Auction Experience</h4>
                    <p className="text-sm text-gray-600">First-to-market WebGL property visualization</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">AI-Powered Bidder Qualification</h4>
                    <p className="text-sm text-gray-600">95% accuracy in financial assessment</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">Real-Time ESG Integration</h4>
                    <p className="text-sm text-gray-600">Live climate risk factor analysis</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-orange-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">Multi-Modal Data Integration</h4>
                    <p className="text-sm text-gray-600">50+ API connections for analysis</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-center text-gray-900">Market Position Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-teal-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">End-to-End Platform</h4>
                    <p className="text-sm text-gray-600">Complete auction-to-settlement workflow</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">Regulatory Compliance</h4>
                    <p className="text-sm text-gray-600">Built-in ASIC and state compliance</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">Professional Integration</h4>
                    <p className="text-sm text-gray-600">Direct PEXA, CoreLogic, government APIs</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">Scalable Architecture</h4>
                    <p className="text-sm text-gray-600">Cloud-native microservices design</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center p-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-4">Comprehensive Intellectual Property Protection</h2>
        <p className="text-lg mb-6">Leading the Future of Property Technology with Patent-Protected Innovation</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto mb-2 text-yellow-400" />
            <h3 className="font-bold text-lg">Industry Leadership</h3>
            <p className="text-sm opacity-90">First-mover advantage in patent-protected PropTech innovations</p>
          </div>
          
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-2 text-blue-400" />
            <h3 className="font-bold text-lg">Global Protection</h3>
            <p className="text-sm opacity-90">Comprehensive IP protection across major markets worldwide</p>
          </div>
          
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-2 text-green-400" />
            <h3 className="font-bold text-lg">Strategic Value</h3>
            <p className="text-sm opacity-90">$165-245M estimated portfolio value with continuous growth</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="text-sm opacity-80">
            © 2025 DeLorenzo Property Group Pty Ltd | All patents, trademarks, and trade secrets protected under international IP law
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatentsAndIPBrochure;