import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Trophy, DollarSign, FileText, Users, Timer, Shield, Gavel, Zap, Star, Target, Gamepad2, CheckCircle, ArrowRight } from 'lucide-react';

interface CEOPlayer {
  id: string;
  name: string;
  company: string;
  netWorth: string;
  chessRating: number;
  taxBracket: string;
  artCollection: number;
  avatar: string;
}

interface TaxBenefit {
  type: string;
  amount: string;
  description: string;
}

interface ArtPrize {
  name: string;
  value: string;
  taxStatus: string;
  description: string;
}

const CEOChessChallenge = () => {
  const [selectedTournament, setSelectedTournament] = useState<string>('billionaire');
  const [gameMode, setGameMode] = useState<'classic' | 'blind' | 'corporate'>('blind');
  const [liveStats, setLiveStats] = useState({
    activePlayers: 47,
    totalPrizes: 8500000,
    currentBids: 156
  });

  const ceoPlayers: CEOPlayer[] = [
    {
      id: 'ceo1',
      name: 'Alexander Sterling',
      company: 'Sterling Enterprises',
      netWorth: '$2.4B',
      chessRating: 2150,
      taxBracket: '37%',
      artCollection: 47,
      avatar: '👑'
    },
    {
      id: 'ceo2',
      name: 'Victoria Goldman',
      company: 'Goldman Industries',
      netWorth: '$1.8B',
      chessRating: 2280,
      taxBracket: '37%',
      artCollection: 63,
      avatar: '♛'
    },
    {
      id: 'ceo3',
      name: 'Marcus Rothschild',
      company: 'Rothschild Holdings',
      netWorth: '$3.1B',
      chessRating: 2090,
      taxBracket: '39.6%',
      artCollection: 152,
      avatar: '👑'
    },
    {
      id: 'ceo4',
      name: 'Elena Blackstone',
      company: 'Blackstone Capital',
      netWorth: '$1.2B',
      chessRating: 2330,
      taxBracket: '37%',
      artCollection: 89,
      avatar: '♕'
    }
  ];

  const taxBenefits: TaxBenefit[] = [
    {
      type: 'Corporate Gift Deduction (ATO Compliant)',
      amount: 'Full $500 per employee',
      description: 'Company claims 100% tax deduction for art gifts to employees as business expense'
    },
    {
      type: 'Cultural Donation Credit',
      amount: 'Up to $250,000 annually',
      description: 'Enhanced tax credits for donations to registered cultural institutions'
    },
    {
      type: 'Art Investment Write-Off',
      amount: '40% immediate depreciation',
      description: 'Accelerated depreciation for art used in business operations'
    },
    {
      type: 'Executive Bonus Tax Shield',
      amount: 'Reduce taxable income by 30%',
      description: 'Art-based executive compensation reduces corporate tax liability'
    }
  ];

  const artPrizes: ArtPrize[] = [
    {
      name: 'Renaissance Collection NFT',
      value: '$2.5M',
      taxStatus: 'Tax Deductible Gift',
      description: 'Exclusive digital art collection with physical authentication'
    },
    {
      name: 'Corporate Art Package',
      value: '$850K',
      taxStatus: 'Business Expense',
      description: 'Complete office art installation with maintenance included'
    },
    {
      name: 'Philanthropic Art Fund',
      value: '$1.2M',
      taxStatus: 'Charitable Deduction',
      description: 'Directed giving fund for art education and cultural programs'
    },
    {
      name: 'Executive Art Portfolio',
      value: '$450K',
      taxStatus: 'Employee Benefit',
      description: 'Personal art collection for C-suite executives'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activePlayers: prev.activePlayers + Math.floor(Math.random() * 5) - 2,
        totalPrizes: prev.totalPrizes + Math.random() * 100000,
        currentBids: prev.currentBids + Math.floor(Math.random() * 10) - 3
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white p-6">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/8 via-indigo-500/5 to-violet-500/8"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-300 via-indigo-200 to-violet-300 bg-clip-text text-transparent">
              CEO Chess Challenge
            </h1>
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <p className="text-2xl text-slate-200 mb-6 max-w-4xl mx-auto">
            Elite chess tournaments with tax-deductible art prizes for corporate executives
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
            <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 text-lg font-bold">
              <Crown className="h-5 w-5 mr-2" />
              Billionaire League
            </Badge>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 text-lg font-bold">
              <Trophy className="h-5 w-5 mr-2" />
              Tax Deductible
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 text-lg font-bold">
              <FileText className="h-5 w-5 mr-2" />
              ATO Compliant
            </Badge>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-300">{liveStats.activePlayers}</div>
              <div className="text-sm text-gray-300">Active CEOs</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-yellow-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-yellow-300">{formatCurrency(liveStats.totalPrizes)}</div>
              <div className="text-sm text-gray-300">Prize Pool Value</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-green-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Gavel className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-300">{liveStats.currentBids}</div>
              <div className="text-sm text-gray-300">Live Bids</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Active Players */}
          <Card className="xl:col-span-2 bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <Crown className="h-6 w-6 text-purple-400" />
                  Elite Players
                </CardTitle>
                <Badge className="bg-purple-500 text-white">
                  <Timer className="h-4 w-4 mr-2" />
                  Live Tournament
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {ceoPlayers.map((player, index) => (
                <div key={player.id} className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{player.avatar}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{player.name}</h3>
                        <p className="text-slate-300">{player.company}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                            Rating: {player.chessRating}
                          </Badge>
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {player.artCollection} Art Pieces
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-300">{player.netWorth}</p>
                      <p className="text-slate-400">Tax: {player.taxBracket}</p>
                      <Button size="sm" className="mt-2 bg-gradient-to-r from-purple-500 to-indigo-500">
                        Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tournament Info */}
          <Card className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-purple-500/30 text-white">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <Trophy className="h-6 w-6 text-yellow-400" />
                Current Tournament
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Format</span>
                  <Badge className="bg-indigo-500">Blind Chess</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Time Control</span>
                  <span className="text-white">15+10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Entry Fee</span>
                  <span className="text-green-300">$50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Tax Benefit</span>
                  <span className="text-yellow-300">100% Deductible</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                <Zap className="h-4 w-4 mr-2" />
                Join Tournament
              </Button>

              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Next Match</h4>
                <p className="text-white">Sterling vs Goldman</p>
                <p className="text-slate-400 text-sm">Starting in 12 minutes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tax Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-3">
                <FileText className="h-6 w-6 text-green-400" />
                Tax Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {taxBenefits.map((benefit, index) => (
                <div key={index} className="p-4 bg-green-500/5 rounded-lg border border-green-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{benefit.type}</h4>
                    <Badge className="bg-green-500 text-white">{benefit.amount}</Badge>
                  </div>
                  <p className="text-slate-300 text-sm">{benefit.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-3">
                <Trophy className="h-6 w-6 text-yellow-400" />
                Art Prizes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {artPrizes.map((prize, index) => (
                <div key={index} className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{prize.name}</h4>
                    <Badge className="bg-yellow-500 text-black">{prize.value}</Badge>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {prize.taxStatus}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm">{prize.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 border-0 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Play with Tax Benefits?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join elite CEOs in tax-deductible chess tournaments with valuable art prizes
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold">
                <Crown className="h-5 w-5 mr-2" />
                Start Playing
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Shield className="h-5 w-5 mr-2" />
                Tax Calculator
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CEOChessChallenge;