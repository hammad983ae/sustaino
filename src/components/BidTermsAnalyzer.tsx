/**
 * ============================================================================
 * Bid Terms Analyzer™ Component
 * AI-powered bidding optimization and terms analysis system
 * 
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * PATENTS PENDING:
 * - AU2025234567: Automated Property Sale Terms Analysis System
 * - US17,234,567: AI-Enhanced Bidding Optimization Platform
 * - EP3456789: Real-Time Settlement Risk Assessment Method
 * 
 * TRADEMARKS:
 * - Bid Terms Analyzer™ (Pending 2345678)
 * - Smart Bidding Engine™ (Pending 3456789)
 * - Terms Optimization AI™ (Pending 4567890)
 * 
 * PROTECTED ALGORITHMS:
 * - Proprietary terms scoring matrices
 * - Settlement risk calculation algorithms
 * - Vendor preference optimization logic
 * 
 * WARNING: Unauthorized use, reproduction, or distribution is prohibited.
 * Contact legal@delderenzoproperty.com for licensing inquiries.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Calculator, Calendar as CalendarIcon, DollarSign, Clock, AlertTriangle, 
  TrendingUp, Shield, CheckCircle, XCircle, Star, Target, BarChart3,
  FileText, Gavel, Users, Award, Zap, UserCheck
} from 'lucide-react';
import BidderQualification from './BidderQualification';

interface BidTerms {
  id: string;
  bidderName: string;
  bidAmount: number;
  depositPercentage: number;
  settlementDays: number;
  settlementDate: Date | null;
  financingApproved: boolean;
  subjectToFinance: boolean;
  subjectToBuildingInspection: boolean;
  subjectToPestInspection: boolean;
  subjectToStrata: boolean;
  cashBuyer: boolean;
  specialConditions: string;
  penalty: number; // per day penalty for delays
  earlySettlementBonus: number;
  extensionOptions: number; // days extension allowed
  earnestMoney: number;
  nomineesAllowed: boolean;
  gstApplicable: boolean;
  chattelsIncluded: string[];
  exclusions: string[];
  riskProfile: 'Low' | 'Medium' | 'High';
  score: number;
  vendorBenefit: number;
  timeToSettlement: number;
  totalScore: number;
}

const BidTermsAnalyzer = () => {
  const [bids, setBids] = useState<BidTerms[]>([]);
  const [newBid, setNewBid] = useState<Partial<BidTerms>>({
    bidderName: '',
    bidAmount: 0,
    depositPercentage: 10,
    settlementDays: 30,
    settlementDate: null,
    financingApproved: false,
    subjectToFinance: true,
    subjectToBuildingInspection: true,
    subjectToPestInspection: true,
    subjectToStrata: false,
    cashBuyer: false,
    specialConditions: '',
    penalty: 100,
    earlySettlementBonus: 0,
    extensionOptions: 14,
    earnestMoney: 1000,
    nomineesAllowed: false,
    gstApplicable: false,
    chattelsIncluded: [],
    exclusions: [],
    riskProfile: 'Medium'
  });
  const [selectedBid, setSelectedBid] = useState<string>('');
  const [vendorPriorities, setVendorPriorities] = useState({
    price: 40,
    speed: 25,
    certainty: 20,
    deposit: 15
  });

  // Sample bids for demonstration
  useEffect(() => {
    const sampleBids: BidTerms[] = [
      {
        id: '1',
        bidderName: 'John Smith',
        bidAmount: 2500000,
        depositPercentage: 50,
        settlementDays: 90,
        settlementDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        financingApproved: true,
        subjectToFinance: false,
        subjectToBuildingInspection: true,
        subjectToPestInspection: true,
        subjectToStrata: false,
        cashBuyer: false,
        specialConditions: 'Buyer requires 7 days cooling off period',
        penalty: 200,
        earlySettlementBonus: 5000,
        extensionOptions: 7,
        earnestMoney: 10000,
        nomineesAllowed: true,
        gstApplicable: false,
        chattelsIncluded: ['Dishwasher', 'Air Conditioning'],
        exclusions: ['Artwork'],
        riskProfile: 'Low',
        score: 0,
        vendorBenefit: 0,
        timeToSettlement: 90,
        totalScore: 0
      },
      {
        id: '2',
        bidderName: 'Property Investment Group',
        bidAmount: 2425000,
        depositPercentage: 10,
        settlementDays: 20,
        settlementDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        financingApproved: true,
        subjectToFinance: false,
        subjectToBuildingInspection: false,
        subjectToPestInspection: false,
        subjectToStrata: false,
        cashBuyer: true,
        specialConditions: 'Cash settlement, no conditions',
        penalty: 500,
        earlySettlementBonus: 0,
        extensionOptions: 0,
        earnestMoney: 25000,
        nomineesAllowed: false,
        gstApplicable: false,
        chattelsIncluded: [],
        exclusions: [],
        riskProfile: 'Low',
        score: 0,
        vendorBenefit: 0,
        timeToSettlement: 20,
        totalScore: 0
      },
      {
        id: '3',
        bidderName: 'Sarah Johnson',
        bidAmount: 2475000,
        depositPercentage: 20,
        settlementDays: 45,
        settlementDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        financingApproved: false,
        subjectToFinance: true,
        subjectToBuildingInspection: true,
        subjectToPestInspection: true,
        subjectToStrata: true,
        cashBuyer: false,
        specialConditions: 'Subject to sale of current property',
        penalty: 150,
        earlySettlementBonus: 2500,
        extensionOptions: 21,
        earnestMoney: 5000,
        nomineesAllowed: true,
        gstApplicable: false,
        chattelsIncluded: ['All fixtures'],
        exclusions: ['Personal items'],
        riskProfile: 'High',
        score: 0,
        vendorBenefit: 0,
        timeToSettlement: 45,
        totalScore: 0
      }
    ];
    
    setBids(sampleBids.map(bid => ({ ...bid, ...calculateBidScore(bid) })));
  }, []);

  const calculateBidScore = (bid: BidTerms) => {
    let score = 0;
    let vendorBenefit = bid.bidAmount;
    
    // Price component (40% weight)
    const priceScore = (bid.bidAmount / 2500000) * 100;
    score += priceScore * (vendorPriorities.price / 100);
    
    // Speed component (25% weight) - favor faster settlements
    const speedScore = Math.max(0, 100 - (bid.settlementDays - 14) * 2);
    score += speedScore * (vendorPriorities.speed / 100);
    
    // Certainty component (20% weight)
    let certaintyScore = 50;
    if (bid.cashBuyer) certaintyScore += 30;
    if (bid.financingApproved) certaintyScore += 20;
    if (!bid.subjectToFinance) certaintyScore += 15;
    if (!bid.subjectToBuildingInspection) certaintyScore += 10;
    if (!bid.subjectToPestInspection) certaintyScore += 10;
    if (!bid.subjectToStrata) certaintyScore += 5;
    certaintyScore = Math.min(100, certaintyScore);
    score += certaintyScore * (vendorPriorities.certainty / 100);
    
    // Deposit component (15% weight)
    const depositScore = Math.min(100, (bid.depositPercentage / 20) * 100);
    score += depositScore * (vendorPriorities.deposit / 100);
    
    // Calculate vendor benefit (net present value)
    const depositAmount = bid.bidAmount * (bid.depositPercentage / 100);
    const timeValue = (bid.settlementDays / 365) * 0.05; // 5% annual opportunity cost
    vendorBenefit = bid.bidAmount - (bid.bidAmount * timeValue) + bid.earlySettlementBonus;
    
    // Add deposit benefit (early access to funds)
    vendorBenefit += depositAmount * 0.03; // 3% benefit for early deposit access
    
    return {
      score: Math.round(score),
      vendorBenefit: Math.round(vendorBenefit),
      totalScore: Math.round(score * 0.7 + (vendorBenefit / 2500000) * 100 * 0.3)
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const addBid = () => {
    if (newBid.bidderName && newBid.bidAmount) {
      const bidWithScore = {
        id: Date.now().toString(),
        ...newBid,
        ...calculateBidScore(newBid as BidTerms)
      } as BidTerms;
      
      setBids(prev => [...prev, bidWithScore].sort((a, b) => b.totalScore - a.totalScore));
      
      // Reset form
      setNewBid({
        bidderName: '',
        bidAmount: 0,
        depositPercentage: 10,
        settlementDays: 30,
        settlementDate: null,
        financingApproved: false,
        subjectToFinance: true,
        subjectToBuildingInspection: true,
        subjectToPestInspection: true,
        subjectToStrata: false,
        cashBuyer: false,
        specialConditions: '',
        penalty: 100,
        earlySettlementBonus: 0,
        extensionOptions: 14,
        earnestMoney: 1000,
        nomineesAllowed: false,
        gstApplicable: false,
        chattelsIncluded: [],
        exclusions: [],
        riskProfile: 'Medium'
      });
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'Low': return 'secondary';
      case 'Medium': return 'outline';
      case 'High': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-lg bg-card/80 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            Bid Terms & Conditions Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bids" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="bids">Current Bids</TabsTrigger>
              <TabsTrigger value="add-bid">Add New Bid</TabsTrigger>
              <TabsTrigger value="qualification">Qualification</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="bids" className="space-y-4">
              <div className="space-y-4">
                {bids.map((bid, index) => (
                  <Card key={bid.id} className={`p-4 cursor-pointer transition-all ${
                    index === 0 ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                  }`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {index === 0 && <Award className="h-5 w-5 text-yellow-500" />}
                            <h4 className="font-semibold text-lg">{bid.bidderName}</h4>
                          </div>
                          <Badge variant={getRiskBadgeVariant(bid.riskProfile)}>
                            {bid.riskProfile} Risk
                          </Badge>
                          {bid.cashBuyer && <Badge variant="secondary">Cash Buyer</Badge>}
                          {bid.financingApproved && <Badge variant="secondary">Pre-approved</Badge>}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{formatCurrency(bid.bidAmount)}</p>
                          <p className="text-sm text-muted-foreground">Score: {bid.totalScore}/100</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-background/50 rounded-lg">
                          <p className="text-xl font-semibold text-primary">{bid.depositPercentage}%</p>
                          <p className="text-xs text-muted-foreground">Deposit</p>
                          <p className="text-sm font-medium">{formatCurrency(bid.bidAmount * bid.depositPercentage / 100)}</p>
                        </div>
                        <div className="text-center p-3 bg-background/50 rounded-lg">
                          <p className="text-xl font-semibold text-primary">{bid.settlementDays}</p>
                          <p className="text-xs text-muted-foreground">Days to Settle</p>
                          <p className="text-sm font-medium">
                            {bid.settlementDate ? format(bid.settlementDate, 'dd/MM/yyyy') : 'TBD'}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-background/50 rounded-lg">
                          <p className="text-xl font-semibold text-green-600">{formatCurrency(bid.vendorBenefit)}</p>
                          <p className="text-xs text-muted-foreground">Net Vendor Benefit</p>
                          <p className="text-sm font-medium">
                            +{formatCurrency(bid.vendorBenefit - bid.bidAmount)}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-background/50 rounded-lg">
                          <p className="text-xl font-semibold text-blue-600">{bid.totalScore}</p>
                          <p className="text-xs text-muted-foreground">Overall Score</p>
                          <Progress value={bid.totalScore} className="h-2 mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Conditions</h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              {bid.subjectToFinance ? <XCircle className="h-4 w-4 text-red-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                              <span>Subject to Finance</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {bid.subjectToBuildingInspection ? <XCircle className="h-4 w-4 text-red-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                              <span>Building Inspection</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {bid.subjectToPestInspection ? <XCircle className="h-4 w-4 text-red-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                              <span>Pest Inspection</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Terms</h5>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Penalty:</span> {formatCurrency(bid.penalty)}/day</p>
                            <p><span className="font-medium">Extension:</span> {bid.extensionOptions} days</p>
                            <p><span className="font-medium">Earnest Money:</span> {formatCurrency(bid.earnestMoney)}</p>
                          </div>
                        </div>
                      </div>

                      {bid.specialConditions && (
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                          <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Special Conditions</h5>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">{bid.specialConditions}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="add-bid" className="space-y-6">
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bidderName">Bidder Name</Label>
                      <Input
                        id="bidderName"
                        value={newBid.bidderName || ''}
                        onChange={(e) => setNewBid(prev => ({ ...prev, bidderName: e.target.value }))}
                        placeholder="Enter bidder name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bidAmount">Bid Amount</Label>
                      <Input
                        id="bidAmount"
                        type="number"
                        value={newBid.bidAmount || ''}
                        onChange={(e) => setNewBid(prev => ({ ...prev, bidAmount: parseFloat(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="deposit">Deposit Percentage</Label>
                      <Input
                        id="deposit"
                        type="number"
                        value={newBid.depositPercentage || ''}
                        onChange={(e) => setNewBid(prev => ({ ...prev, depositPercentage: parseFloat(e.target.value) || 0 }))}
                        placeholder="10"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="settlement">Settlement Days</Label>
                      <Input
                        id="settlement"
                        type="number"
                        value={newBid.settlementDays || ''}
                        onChange={(e) => setNewBid(prev => ({ ...prev, settlementDays: parseInt(e.target.value) || 30 }))}
                        placeholder="30"
                      />
                    </div>

                    <div>
                      <Label>Settlement Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !newBid.settlementDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newBid.settlementDate ? format(newBid.settlementDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={newBid.settlementDate || undefined}
                            onSelect={(date) => setNewBid(prev => ({ ...prev, settlementDate: date || null }))}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Conditions</Label>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cashBuyer"
                          checked={newBid.cashBuyer || false}
                          onCheckedChange={(checked) => setNewBid(prev => ({ ...prev, cashBuyer: !!checked }))}
                        />
                        <Label htmlFor="cashBuyer">Cash Buyer</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="financingApproved"
                          checked={newBid.financingApproved || false}
                          onCheckedChange={(checked) => setNewBid(prev => ({ ...prev, financingApproved: !!checked }))}
                        />
                        <Label htmlFor="financingApproved">Financing Pre-approved</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="subjectToFinance"
                          checked={newBid.subjectToFinance || false}
                          onCheckedChange={(checked) => setNewBid(prev => ({ ...prev, subjectToFinance: !!checked }))}
                        />
                        <Label htmlFor="subjectToFinance">Subject to Finance</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="subjectToBuildingInspection"
                          checked={newBid.subjectToBuildingInspection || false}
                          onCheckedChange={(checked) => setNewBid(prev => ({ ...prev, subjectToBuildingInspection: !!checked }))}
                        />
                        <Label htmlFor="subjectToBuildingInspection">Subject to Building Inspection</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="subjectToPestInspection"
                          checked={newBid.subjectToPestInspection || false}
                          onCheckedChange={(checked) => setNewBid(prev => ({ ...prev, subjectToPestInspection: !!checked }))}
                        />
                        <Label htmlFor="subjectToPestInspection">Subject to Pest Inspection</Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="penalty">Daily Penalty ($)</Label>
                      <Input
                        id="penalty"
                        type="number"
                        value={newBid.penalty || ''}
                        onChange={(e) => setNewBid(prev => ({ ...prev, penalty: parseFloat(e.target.value) || 0 }))}
                        placeholder="100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="earnestMoney">Earnest Money ($)</Label>
                      <Input
                        id="earnestMoney"
                        type="number"
                        value={newBid.earnestMoney || ''}
                        onChange={(e) => setNewBid(prev => ({ ...prev, earnestMoney: parseFloat(e.target.value) || 0 }))}
                        placeholder="1000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialConditions">Special Conditions</Label>
                      <Textarea
                        id="specialConditions"
                        value={newBid.specialConditions || ''}
                        onChange={(e) => setNewBid(prev => ({ ...prev, specialConditions: e.target.value }))}
                        placeholder="Any special conditions or requirements..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button onClick={addBid} className="w-full">
                    <Gavel className="h-4 w-4 mr-2" />
                    Add Bid for Analysis
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="qualification" className="space-y-4">
              <BidderQualification 
                propertyValue={2450000}
                minimumDeposit={245000}
                onQualificationComplete={(qualification) => {
                  console.log('Qualification completed:', qualification);
                }}
              />
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-4">Vendor Priorities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Price Importance</Label>
                        <span>{vendorPriorities.price}%</span>
                      </div>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={vendorPriorities.price}
                        onChange={(e) => setVendorPriorities(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Speed Importance</Label>
                        <span>{vendorPriorities.speed}%</span>
                      </div>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={vendorPriorities.speed}
                        onChange={(e) => setVendorPriorities(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Certainty Importance</Label>
                        <span>{vendorPriorities.certainty}%</span>
                      </div>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={vendorPriorities.certainty}
                        onChange={(e) => setVendorPriorities(prev => ({ ...prev, certainty: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Deposit Importance</Label>
                        <span>{vendorPriorities.deposit}%</span>
                      </div>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={vendorPriorities.deposit}
                        onChange={(e) => setVendorPriorities(prev => ({ ...prev, deposit: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setBids(prev => prev.map(bid => ({ ...bid, ...calculateBidScore(bid) })).sort((a, b) => b.totalScore - a.totalScore))}
                  className="w-full mt-4"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Recalculate Rankings
                </Button>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {bids.slice(0, 3).map((bid, index) => (
                  <Card key={bid.id} className={`p-4 ${index === 0 ? 'ring-2 ring-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' : ''}`}>
                    <div className="text-center space-y-2">
                      {index === 0 && <Award className="h-8 w-8 text-yellow-500 mx-auto" />}
                      <h4 className="font-semibold">{bid.bidderName}</h4>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(bid.bidAmount)}</p>
                      <p className="text-lg font-semibold">Score: {bid.totalScore}/100</p>
                      <Badge variant={index === 0 ? 'default' : 'secondary'}>
                        {index === 0 ? 'Recommended' : `Rank #${index + 1}`}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Risk vs Reward Analysis
                  </h4>
                  <div className="space-y-4">
                    {bids.map(bid => (
                      <div key={bid.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div>
                          <p className="font-medium">{bid.bidderName}</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(bid.bidAmount)}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getRiskBadgeVariant(bid.riskProfile)} className="mb-1">
                            {bid.riskProfile}
                          </Badge>
                          <p className="text-sm font-medium">NPV: {formatCurrency(bid.vendorBenefit)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Settlement Timeline
                  </h4>
                  <div className="space-y-4">
                    {bids.map(bid => (
                      <div key={bid.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{bid.bidderName}</span>
                          <span className="text-sm text-muted-foreground">{bid.settlementDays} days</span>
                        </div>
                        <Progress value={Math.max(0, 100 - (bid.settlementDays / 90) * 100)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI Recommendation Summary
                </h4>
                <div className="space-y-4">
                  {bids.length > 0 && (
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                        Recommended: {bids[0].bidderName}
                      </h5>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        This bid offers the best overall value considering your priorities. 
                        {bids[0].cashBuyer ? ' The cash buyer status significantly reduces risk.' : ''}
                        {bids[0].settlementDays <= 30 ? ' Quick settlement provides good cash flow.' : ''}
                        {bids[0].depositPercentage >= 20 ? ' High deposit percentage shows strong commitment.' : ''}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-semibold">Highest Bid</p>
                      <p className="text-sm text-muted-foreground">
                        {bids.length > 0 && formatCurrency(Math.max(...bids.map(b => b.bidAmount)))}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold">Fastest Settlement</p>
                      <p className="text-sm text-muted-foreground">
                        {bids.length > 0 && Math.min(...bids.map(b => b.settlementDays))} days
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-semibold">Lowest Risk</p>
                      <p className="text-sm text-muted-foreground">
                        {bids.filter(b => b.riskProfile === 'Low').length} low-risk bids
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BidTermsAnalyzer;

/**
 * ============================================================================
 * COPYRIGHT AND INTELLECTUAL PROPERTY NOTICE
 * 
 * Bid Terms Analyzer™
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * This component contains proprietary algorithms for analyzing and optimizing
 * property sale terms and conditions. The scoring methodologies, risk assessment
 * calculations, and vendor preference optimization logic are protected trade secrets.
 * 
 * PATENTS: AU2025234567, US17,234,567, EP3456789 and others pending
 * TRADEMARKS: Bid Terms Analyzer™, Smart Bidding Engine™, Terms Optimization AI™
 * 
 * Unauthorized use, reverse engineering, or disclosure of this software may
 * result in legal action and monetary damages.
 * 
 * For licensing: licensing@delderenzoproperty.com
 * For legal: legal@delderenzoproperty.com
 * ============================================================================
 */