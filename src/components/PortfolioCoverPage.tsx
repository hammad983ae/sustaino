import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MapPin, Leaf, DollarSign } from 'lucide-react';

interface PortfolioCoverPageProps {
  totalPortfolioValue: number;
  totalLocations: number;
  totalHectares: number;
  sustainabilityScore: number;
  reportDate?: string;
  companyName?: string;
  reportType?: string;
}

export default function PortfolioCoverPage({
  totalPortfolioValue,
  totalLocations,
  totalHectares,
  sustainabilityScore,
  reportDate = new Date().toLocaleDateString(),
  companyName = "Costa Group",
  reportType = "COMPREHENSIVE PORTFOLIO ASSESSMENT REPORT"
}: PortfolioCoverPageProps) {
  return (
    <div className="w-full min-h-[297mm] bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden print:h-screen">
      {/* Header */}
      <div className="pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-slate-800 mb-4">
          {reportType}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full"></div>
      </div>

      {/* Logo Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex flex-col gap-1">
            <div className="w-10 h-10 bg-emerald-500 rounded-sm shadow-lg"></div>
            <div className="w-10 h-10 bg-amber-500 rounded-sm shadow-lg"></div>
          </div>
          <div className="text-left">
            <div className="text-3xl font-bold text-slate-800">{companyName.toUpperCase()}</div>
            <div className="text-lg font-medium text-slate-600">PORTFOLIO ANALYTICS</div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
            <DollarSign className="h-8 w-8 mx-auto mb-3 text-emerald-600" />
            <div className="text-2xl font-bold text-slate-800 mb-1">
              ${(totalPortfolioValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-slate-600">Total Portfolio Value</div>
          </Card>

          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
            <MapPin className="h-8 w-8 mx-auto mb-3 text-blue-600" />
            <div className="text-2xl font-bold text-slate-800 mb-1">
              {totalLocations}
            </div>
            <div className="text-sm text-slate-600">Total Locations</div>
          </Card>

          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-amber-600" />
            <div className="text-2xl font-bold text-slate-800 mb-1">
              {totalHectares.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Total Hectares</div>
          </Card>

          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
            <Leaf className="h-8 w-8 mx-auto mb-3 text-green-600" />
            <div className="text-2xl font-bold text-slate-800 mb-1">
              {sustainabilityScore}%
            </div>
            <div className="text-sm text-slate-600">Sustainability Score</div>
          </Card>
        </div>
      </div>

      {/* Enhanced Sustainability Progress Section */}
      <div className="px-8 mb-12">
        <Card className="max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-sm border-slate-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Portfolio Performance Overview</h3>
            <p className="text-slate-600">Key sustainability and operational metrics</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Sustainability Score</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {sustainabilityScore}%
                </Badge>
              </div>
              <Progress value={sustainabilityScore} className="h-3" />
              <p className="text-xs text-slate-500">ESG compliance and environmental impact</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Water Efficiency</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  89%
                </Badge>
              </div>
              <Progress value={89} className="h-3" />
              <p className="text-xs text-slate-500">Water conservation and management</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Energy Efficiency</span>
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                  82%
                </Badge>
              </div>
              <Progress value={82} className="h-3" />
              <p className="text-xs text-slate-500">Renewable energy and efficiency gains</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Report Information */}
      <div className="absolute bottom-16 left-0 right-0 px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 bg-slate-800/95 backdrop-blur-sm text-white">
            <div className="text-center space-y-3">
              <div className="text-emerald-400 font-semibold text-lg">
                Report Generated: {reportDate}
              </div>
              
              <div className="flex justify-center gap-8 text-slate-300">
                <div>
                  <span className="font-semibold">Prepared By: </span>
                  <span>{companyName} Analytics Team</span>
                </div>
                <div>
                  <span className="font-semibold">Status: </span>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-800 ml-1">
                    Comprehensive Analysis Complete
                  </Badge>
                </div>
              </div>
              
              <div className="text-sm text-slate-400">
                Confidential Portfolio Assessment Report
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full translate-y-24 -translate-x-24"></div>
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-amber-400/10 rounded-full -translate-x-16"></div>
    </div>
  );
}