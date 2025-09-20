/**
 * ============================================================================
 * SUSTANO-SPHERE™ WIDGET COMPONENT
 * Compact widget for dashboard integration
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, Globe, TrendingUp, Shield, Award, Star, Zap, 
  Users, DollarSign, Activity, Timer, Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SustanoSphereWidget = () => {
  const navigate = useNavigate();
  const [liveData, setLiveData] = useState({
    auctions: 156,
    volume: 4200000,
    esgScore: 94,
    bidders: 1247
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        auctions: prev.auctions + Math.floor(Math.random() * 3),
        volume: prev.volume + Math.random() * 50000,
        esgScore: Math.min(100, prev.esgScore + Math.random() * 1),
        bidders: prev.bidders + Math.floor(Math.random() * 10) - 5
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 border-green-500/30 text-white shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400/20 blur-sm rounded-full"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Sustano-Sphere™</CardTitle>
            <p className="text-green-300 text-sm">ESG Digital Marketplace</p>
          </div>
          <Badge className="ml-auto bg-green-500 text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            LIVE
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Live Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">{liveData.auctions}+</div>
            <div className="text-xs text-gray-300">Live Auctions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300">{Math.round(liveData.esgScore)}/100</div>
            <div className="text-xs text-gray-300">Avg ESG Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-300">{liveData.bidders}</div>
            <div className="text-xs text-gray-300">Active Bidders</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-300">{formatCurrency(liveData.volume / 1000)}K</div>
            <div className="text-xs text-gray-300">Total Volume</div>
          </div>
        </div>

        {/* ESG Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Platform ESG Score</span>
            <span className="text-green-300">{Math.round(liveData.esgScore)}/100</span>
          </div>
          <Progress 
            value={liveData.esgScore} 
            className="h-3 bg-slate-700"
          />
        </div>

        {/* Status Indicators */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Platform Status</span>
            <Badge className="bg-green-500 text-white text-xs">
              <Activity className="h-3 w-3 mr-1" />
              ONLINE
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Next Auction</span>
            <span className="text-white font-mono">2m 45s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Carbon Status</span>
            <Badge className="bg-emerald-600 text-white text-xs">
              <Leaf className="h-3 w-3 mr-1" />
              NEUTRAL
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={() => navigate('/sustano-sphere')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold"
          >
            <Play className="h-4 w-4 mr-2" />
            Launch Platform
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-green-500/30 text-green-300 hover:bg-green-500/10"
            onClick={() => navigate('/sustano-sphere')}
          >
            <Globe className="h-4 w-4 mr-2" />
            View Auctions
          </Button>
        </div>

        {/* Quick Features */}
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="text-center p-2 bg-green-500/10 rounded">
            <Leaf className="h-4 w-4 mx-auto mb-1 text-green-400" />
            <div className="text-green-300 font-medium">ESG</div>
          </div>
          <div className="text-center p-2 bg-blue-500/10 rounded">
            <Zap className="h-4 w-4 mx-auto mb-1 text-blue-400" />
            <div className="text-blue-300 font-medium">AI</div>
          </div>
          <div className="text-center p-2 bg-purple-500/10 rounded">
            <Globe className="h-4 w-4 mx-auto mb-1 text-purple-400" />
            <div className="text-purple-300 font-medium">Global</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SustanoSphereWidget;