/**
 * ============================================================================
 * SUSTANO-SPHERE™ DEMO PAGE - REAL IMPLEMENTATION
 * Complete functional demo of Sustaino Sphere with authentication
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Leaf, Globe, TrendingUp, Shield, Award, Star, Zap, 
  Users, DollarSign, Building2, Eye, Heart, Share2,
  CheckCircle, ArrowRight, Smartphone, Camera, Lock,
  BarChart3, Target, Crown, Sparkles, ArrowLeft, Home,
  Brain, Layers, Activity, Timer, Play, Maximize,
  ThumbsUp, MapPin, Rocket, FileText, Gamepad2, LogOut, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuctionPlatform {
  id: string;
  title: string;
  subtitle: string;
  current_bid: number;
  esg_score: number;
  monthly_revenue: number;
  features: any; // JSONB from database
  category: string;
  users_count: number;
  auction_end_date: string;
}

const SustanoSphereDemo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Authentication state
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Auction state
  const [auctions, setAuctions] = useState<AuctionPlatform[]>([]);
  const [currentAuctionIndex, setCurrentAuctionIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [bidding, setBidding] = useState(false);
  
  // Live data
  const [liveData, setLiveData] = useState({
    totalAuctions: 0,
    volume: 0,
    avgEsgScore: 0,
    bidders: 0
  });

  // Check authentication and load data
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      
      // Load user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      
      setUserProfile(profile);
      await loadAuctions();
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadAuctions = async () => {
    const { data: auctionData, error } = await supabase
      .from('auction_platforms')
      .select('*')
      .eq('auction_status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading auctions:', error);
      return;
    }

    if (auctionData && auctionData.length > 0) {
      // Transform the database data to match our interface
      const transformedAuctions = auctionData.map(auction => ({
        ...auction,
        features: Array.isArray(auction.features) ? auction.features : 
                 typeof auction.features === 'string' ? [auction.features] : 
                 []
      }));
      
      setAuctions(transformedAuctions);
      
      // Calculate live stats
      const stats = {
        totalAuctions: auctionData.length,
        volume: auctionData.reduce((sum, auction) => sum + auction.current_bid, 0),
        avgEsgScore: Math.round(auctionData.reduce((sum, auction) => sum + auction.esg_score, 0) / auctionData.length),
        bidders: Math.floor(Math.random() * 1000) + 500 // Simulated for now
      };
      setLiveData(stats);
    }
  };

  // Auto-rotate auctions
  useEffect(() => {
    if (auctions.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentAuctionIndex((prev) => (prev + 1) % auctions.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [auctions.length]);

  const handleBid = async () => {
    if (!user || !bidAmount || bidding) return;
    
    const currentAuction = auctions[currentAuctionIndex];
    const newBidAmount = parseFloat(bidAmount);
    
    if (newBidAmount <= currentAuction.current_bid) {
      toast({
        title: "Invalid Bid",
        description: "Bid must be higher than current bid",
        variant: "destructive"
      });
      return;
    }

    setBidding(true);
    
    try {
      const { error } = await supabase
        .from('auction_bids')
        .insert({
          auction_id: currentAuction.id,
          bidder_id: user.id,
          bid_amount: newBidAmount
        });

      if (error) throw error;

      toast({
        title: "Bid Placed! 🎉",
        description: `Successfully bid $${newBidAmount.toLocaleString()} on ${currentAuction.title}`,
      });

      setBidAmount('');
      await loadAuctions(); // Refresh to get updated bid
    } catch (error: any) {
      toast({
        title: "Bid Failed",
        description: error.message || "Failed to place bid",
        variant: "destructive"
      });
    } finally {
      setBidding(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "Successfully logged out of Sustano-Sphere",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading Sustano-Sphere...</div>
      </div>
    );
  }

  const currentAuction = auctions[currentAuctionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/8 via-emerald-500/5 to-teal-500/8"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/15 to-emerald-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            {userProfile && (
              <div className="text-right">
                <p className="text-slate-300 text-sm">Welcome back,</p>
                <p className="text-white font-medium">{userProfile.display_name}</p>
              </div>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Badge className="bg-green-500 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE AUCTIONS
            </Badge>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
              Sustano-Sphere™
            </h1>
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <p className="text-2xl text-slate-200 mb-6 max-w-4xl mx-auto">
            The world's first ESG-integrated digital asset auction platform
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 text-lg font-bold">
              <Gamepad2 className="h-5 w-5 mr-2" />
              Live Auctions
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 text-lg font-bold">
              <Award className="h-5 w-5 mr-2" />
              ESG Certified
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-3 text-lg font-bold">
              <Brain className="h-5 w-5 mr-2" />
              Real Bidding
            </Badge>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-green-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-300">{liveData.totalAuctions}</div>
              <div className="text-sm text-gray-300">Live Auctions</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-300">{liveData.avgEsgScore}/100</div>
              <div className="text-sm text-gray-300">Avg ESG Score</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-300">{liveData.bidders}</div>
              <div className="text-sm text-gray-300">Active Bidders</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-orange-500/30 text-white">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-orange-300">{formatCurrency(liveData.volume)}</div>
              <div className="text-sm text-gray-300">Total Volume</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Auction Area */}
        {currentAuction ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
            {/* Live Auction */}
            <Card className="xl:col-span-2 bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="animate-pulse bg-green-500 w-4 h-4 rounded-full"></div>
                    <CardTitle className="text-white text-2xl">LIVE ESG AUCTION</CardTitle>
                    <Badge className="bg-green-500 text-white">
                      <Leaf className="h-4 w-4 mr-2" />
                      ESG: {currentAuction.esg_score}/100
                    </Badge>
                  </div>
                  <div className="text-slate-300">
                    <Activity className="h-5 w-5 inline mr-2" />
                    {liveData.bidders} bidders
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Asset Display */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{currentAuction.title}</h3>
                      <p className="text-slate-300">{currentAuction.subtitle}</p>
                      <div className="flex gap-2 mt-2">
                        {currentAuction.features.map((feature: string, index: number) => (
                          <span key={index} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-sm">Current Bid</p>
                      <p className="text-3xl font-bold text-green-300">{formatCurrency(currentAuction.current_bid)}</p>
                      <p className="text-slate-400 text-sm">{currentAuction.users_count.toLocaleString()} users</p>
                    </div>
                  </div>

                  {/* ESG Score Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">ESG Score</span>
                      <span className="text-green-300">{currentAuction.esg_score}/100</span>
                    </div>
                    <Progress value={currentAuction.esg_score} className="h-3" />
                  </div>
                </div>

                {/* Bidding Interface */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`Minimum: ${formatCurrency(currentAuction.current_bid + 1000)}`}
                      className="flex-1 bg-gray-800 border-gray-600 text-white"
                    />
                    <Button 
                      onClick={handleBid}
                      disabled={!bidAmount || bidding}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-8"
                    >
                      {bidding ? 'Bidding...' : 'Place Bid'}
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    💡 Tip: Bid strategically - ESG scores affect final value!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Widget */}
            <Card className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 border-green-500/30 text-white">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Your Bidding Stats</CardTitle>
                    <p className="text-green-300 text-sm">Real-time performance</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Bids</span>
                    <span className="text-white font-bold">{userProfile?.total_bids || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Auctions Won</span>
                    <span className="text-green-300 font-bold">{userProfile?.total_wins || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Success Rate</span>
                    <span className="text-blue-300 font-bold">
                      {userProfile?.total_bids > 0 ? Math.round((userProfile.total_wins / userProfile.total_bids) * 100) : 0}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-600">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
                    <Trophy className="h-4 w-4 mr-2" />
                    View All Auctions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-slate-300">No active auctions at the moment</p>
            <p className="text-slate-400">Check back soon for new ESG platform auctions!</p>
          </div>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-0 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Bidding on Sustainable Platforms</h2>
            <p className="text-xl mb-6 opacity-90">
              Join the world's first ESG-integrated digital asset marketplace
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 font-bold"
                onClick={() => navigate('/ceo-chess')}
              >
                <Crown className="h-5 w-5 mr-2" />
                CEO Chess Challenge
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/eternum-hunt')}
              >
                <Brain className="h-5 w-5 mr-2" />
                Eternum Mystery Hunt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SustanoSphereDemo;