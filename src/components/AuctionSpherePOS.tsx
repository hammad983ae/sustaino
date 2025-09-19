/**
 * ============================================================================
 * Auction-Sphere™ Point of Sale System
 * Professional real estate auction transaction processing
 * 
 * © 2025 Delderenzo Property Group Pty Ltd. All rights reserved.
 * 
 * FEATURES:
 * - Real-time bidding transactions
 * - Automated deposit processing
 * - Commission calculations
 * - Payment gateway integration
 * - Digital contracts & signatures
 * - Instant settlement processing
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DigitalContractSigning from './DigitalContractSigning';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, DollarSign, Receipt, CheckCircle, Clock, Users, 
  Shield, Zap, TrendingUp, Building2, Calculator, FileText,
  ArrowLeft, Star, Award, Lock, Smartphone, Globe, Eye,
  Crown, Target, BarChart3, Activity, Layers, Brain
} from 'lucide-react';

const AuctionSpherePOS = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProperty, setSelectedProperty] = useState(0);
  const [bidAmount, setBidAmount] = useState('2,650,000');
  const [deposit, setDeposit] = useState('265,000');
  const [commission, setCommission] = useState('79,500');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [pexaStatus, setPexaStatus] = useState('pending');
  const [settlementProgress, setSettlementProgress] = useState({
    propertySearch: 'complete',
    workspaceCreation: 'in-progress',
    documentLodgement: 'pending',
    settlementCompletion: 'pending'
  });

  // Demo properties for POS
  const properties = [
    {
      id: 1,
      address: '15 Harbour View Terrace, Sydney NSW',
      finalBid: 2650000,
      deposit: 265000,
      commission: 79500,
      buyer: 'John & Sarah Mitchell',
      vendor: 'Premium Developments Pty Ltd',
      auctioneer: 'James Richardson',
      settlement: '45 days'
    },
    {
      id: 2,
      address: '42 Collins Street, Melbourne VIC',
      finalBid: 8500000,
      deposit: 850000,
      commission: 255000,
      buyer: 'Metro Investment Group',
      vendor: 'CBD Properties Trust',
      auctioneer: 'Sarah Chen',
      settlement: '60 days'
    }
  ];

  // Social media demo slides
  const demoSlides = [
    {
      title: "World's First 3D Auction POS",
      subtitle: "Revolutionary transaction processing",
      icon: <Layers className="h-16 w-16" />,
      color: "from-blue-500 to-cyan-500",
      features: ["3D Property Visualization", "Real-time Processing", "Instant Settlements"],
      stats: "95% Faster Transactions"
    },
    {
      title: "Licensed Aggregator Integration",
      subtitle: "ASIC compliant payment processing",
      icon: <Shield className="h-16 w-16" />,
      color: "from-emerald-500 to-green-500",
      features: ["40+ Bank Partners", "Instant Pre-approvals", "Secure Payments"],
      stats: "Bank-Grade Security"
    },
    {
      title: "AI-Powered Smart Contracts",
      subtitle: "Automated legal processing",
      icon: <Brain className="h-16 w-16" />,
      color: "from-purple-500 to-violet-500",
      features: ["Digital Signatures", "Auto Compliance", "Risk Assessment"],
      stats: "99.8% Accuracy Rate"
    },
    {
      title: "Real-Time Market Analytics",
      subtitle: "Instant valuation & reporting",
      icon: <BarChart3 className="h-16 w-16" />,
      color: "from-orange-500 to-red-500",
      features: ["Live Market Data", "Commission Tracking", "Performance Analytics"],
      stats: "$2.5B+ Processed"
    }
  ];

  const currentProperty = properties[selectedProperty];

  // Auto-rotate demo slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % demoSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [demoSlides.length]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };


  // PEXA Integration Functions
  const callPEXAFunction = async (action: string, data: any) => {
    try {
      const { data: result, error } = await supabase.functions.invoke('pexa-integration', {
        body: { action, ...data }
      });

      if (error) throw error;

      if (!result.success) {
        throw new Error(result.error || 'PEXA integration failed');
      }

      return result.data;
    } catch (error) {
      console.error('PEXA Function Error:', error);
      toast({
        title: "PEXA Integration Error",
        description: error.message || 'Failed to communicate with PEXA',
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleCreatePEXAWorkspace = async () => {
    try {
      const property = properties[selectedProperty];
      const result = await callPEXAFunction('create_workspace', {
        propertyData: {
          propertyId: `PROP-${property.id}`,
          address: property.address
        },
        settlementData: {
          transactionType: 'sale',
          settlementDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
          purchasePrice: property.finalBid,
          participants: [
            {
              role: 'buyer',
              name: property.buyer
            },
            {
              role: 'vendor', 
              name: property.vendor
            },
            {
              role: 'auctioneer',
              name: property.auctioneer
            }
          ]
        }
      });

      setSettlementProgress(prev => ({
        ...prev,
        workspaceCreation: 'complete',
        documentLodgement: 'in-progress'
      }));

      toast({
        title: "PEXA Workspace Created",
        description: `Workspace created successfully for ${property.address}`,
      });
    } catch (error) {
      // Error already handled in callPEXAFunction
    }
  };

  const handleSubmitValuationToPEXA = async () => {
    try {
      const property = properties[selectedProperty];
      const result = await callPEXAFunction('submit_valuation', {
        settlementData: {
          workspaceId: `WS-${property.id}`
        },
        propertyData: {
          valuationAmount: property.finalBid,
          valuationDate: new Date().toISOString(),
          valuerDetails: {
            name: 'Sustaino Pro Valuations',
            license: 'VIC12345',
            firm: 'Sustaino Sphere Professional Services'
          },
          reportUrl: `${window.location.origin}/report/${property.id}`
        }
      });

      toast({
        title: "Valuation Submitted to PEXA",
        description: "Valuation report successfully lodged in settlement workspace",
      });
    } catch (error) {
      // Error already handled in callPEXAFunction
    }
  };

  const handleTrackSettlement = async () => {
    try {
      const property = properties[selectedProperty];
      const result = await callPEXAFunction('track_settlement', {
        settlementData: {
          workspaceId: `WS-${property.id}`
        }
      });

      setSettlementProgress(prev => ({
        ...prev,
        documentLodgement: 'complete',
        settlementCompletion: 'in-progress'
      }));

      toast({
        title: "Settlement Status Updated",
        description: "Retrieved latest settlement progress from PEXA",
      });
    } catch (error) {
      // Error already handled in callPEXAFunction
    }
  };

  const processTransaction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionComplete(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Enhanced Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-cyan-300/5 to-purple-400/5"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-300/10 to-violet-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Back to Dashboard */}
        <div className="mb-6">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-100 font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl blur-xl animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-br from-blue-500/80 to-cyan-500/80 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
                <CreditCard className="h-12 w-12 text-white drop-shadow-lg" />
              </div>
            </div>
            <div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                Auction-Sphere™ POS
              </h1>
              <p className="text-2xl text-slate-700 font-bold mt-2">Professional Transaction Processing</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-2xl blur-xl animate-pulse delay-500"></div>
              <div className="relative p-4 bg-gradient-to-br from-purple-500/80 to-violet-500/80 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
                <Receipt className="h-12 w-12 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-emerald-500/90 to-green-500/90 text-white px-6 py-3 text-lg font-bold backdrop-blur-sm border border-white/20 shadow-lg">
              <Shield className="h-5 w-5 mr-2" />
              ASIC Licensed
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 text-white px-6 py-3 text-lg font-bold backdrop-blur-sm border border-white/20 shadow-lg">
              <Zap className="h-5 w-5 mr-2" />
              Real-Time Processing
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500/90 to-violet-500/90 text-white px-6 py-3 text-lg font-bold backdrop-blur-sm border border-white/20 shadow-lg">
              <Award className="h-5 w-5 mr-2" />
              Patent Protected
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Social Media Demo Slides */}
          <Card className="xl:col-span-1 bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-xl border-slate-700/50 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-white text-lg">
                <div className="flex items-center gap-2 justify-center">
                  <Eye className="h-5 w-5" />
                  Social Media Demo
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className={`text-center p-6 rounded-xl bg-gradient-to-r ${demoSlides[currentSlide].color} bg-opacity-20 border border-opacity-30 min-h-[400px] flex flex-col justify-center`}>
                <div className="text-white mb-6">
                  {demoSlides[currentSlide].icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {demoSlides[currentSlide].title}
                </h3>
                <p className="text-slate-200 mb-6 text-lg">
                  {demoSlides[currentSlide].subtitle}
                </p>
                <div className="space-y-3 mb-6">
                  {demoSlides[currentSlide].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-slate-200">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black text-yellow-400 mb-1">
                    {demoSlides[currentSlide].stats}
                  </p>
                  <p className="text-slate-300 text-sm">Performance Metric</p>
                </div>
              </div>
              
              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {demoSlides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-blue-400' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main POS Interface */}
          <Card className="xl:col-span-3 backdrop-blur-xl bg-white/60 border-white/30 shadow-2xl rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-slate-700">
                  Live Transaction Processing
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className="bg-green-500 text-white animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    LIVE
                  </Badge>
                  <Badge variant="outline" className="text-slate-600">
                    Property #{currentProperty.id}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Property Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map((property, idx) => (
                  <Card 
                    key={property.id}
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      selectedProperty === idx 
                        ? 'ring-2 ring-blue-400 bg-blue-50/80' 
                        : 'bg-white/40 hover:bg-white/60'
                    } rounded-xl border border-white/30`}
                    onClick={() => setSelectedProperty(idx)}
                  >
                    <h4 className="font-bold text-slate-700 mb-2">{property.address}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black text-green-600">
                        {formatCurrency(property.finalBid)}
                      </span>
                      <Badge className="bg-blue-500 text-white">SOLD</Badge>
                    </div>
                  </Card>
                ))}
              </div>

              <Tabs defaultValue="transaction" className="w-full">
                <TabsList className="grid w-full grid-cols-6 bg-white/50 backdrop-blur-lg">
                  <TabsTrigger value="transaction">Transaction</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="settlement">PEXA Settlement</TabsTrigger>
                  <TabsTrigger value="contracts">Contracts</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="reporting">Reporting</TabsTrigger>
                </TabsList>

                <TabsContent value="transaction" className="space-y-6">
                  {/* Transaction Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 border-green-200/50 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="text-sm text-green-700 font-medium">Final Bid</p>
                          <p className="text-3xl font-black text-green-800">
                            {formatCurrency(currentProperty.finalBid)}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border-blue-200/50 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Calculator className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="text-sm text-blue-700 font-medium">Deposit (10%)</p>
                          <p className="text-3xl font-black text-blue-800">
                            {formatCurrency(currentProperty.deposit)}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-50/80 to-violet-50/80 border-purple-200/50 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                        <div>
                          <p className="text-sm text-purple-700 font-medium">Commission (3%)</p>
                          <p className="text-3xl font-black text-purple-800">
                            {formatCurrency(currentProperty.commission)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Transaction Form */}
                  <Card className="bg-white/60 backdrop-blur-lg border-white/30 p-6">
                    <h4 className="text-xl font-bold text-slate-700 mb-6">Process Transaction</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-700 font-medium">Buyer</Label>
                          <Input value={currentProperty.buyer} className="mt-1" readOnly />
                        </div>
                        <div>
                          <Label className="text-slate-700 font-medium">Vendor</Label>
                          <Input value={currentProperty.vendor} className="mt-1" readOnly />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-700 font-medium">Auctioneer</Label>
                          <Input value={currentProperty.auctioneer} className="mt-1" readOnly />
                        </div>
                        <div>
                          <Label className="text-slate-700 font-medium">Settlement Period</Label>
                          <Input value={currentProperty.settlement} className="mt-1" readOnly />
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="payment" className="space-y-6">
                  <Card className="bg-white/60 backdrop-blur-lg border-white/30 p-6">
                    <h4 className="text-xl font-bold text-slate-700 mb-6">Payment Processing</h4>
                    
                    {!transactionComplete ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-slate-700 font-medium">Payment Method</Label>
                              <select className="w-full mt-1 p-3 border border-slate-300 rounded-lg">
                                <option>Bank Transfer</option>
                                <option>Credit Card</option>
                                <option>Finance Pre-approval</option>
                              </select>
                            </div>
                            <div>
                              <Label className="text-slate-700 font-medium">Bank BSB</Label>
                              <Input placeholder="123-456" className="mt-1" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-slate-700 font-medium">Account Number</Label>
                              <Input placeholder="123456789" className="mt-1" />
                            </div>
                            <div>
                              <Label className="text-slate-700 font-medium">Reference</Label>
                              <Input value={`AUC-${currentProperty.id}-${Date.now().toString().slice(-6)}`} className="mt-1" readOnly />
                            </div>
                          </div>
                        </div>

                        {isProcessing ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-lg font-semibold text-slate-700">Processing Payment...</p>
                            <Progress value={75} className="w-64 mx-auto mt-4" />
                          </div>
                        ) : (
                          <Button 
                            onClick={processTransaction}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg py-4"
                          >
                            <CreditCard className="h-5 w-5 mr-2" />
                            Process Deposit Payment - {formatCurrency(currentProperty.deposit)}
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h3>
                        <p className="text-slate-600 mb-6">Transaction ID: TXN-{Date.now()}</p>
                        <Button 
                          onClick={() => setTransactionComplete(false)}
                          variant="outline"
                          className="border-green-500 text-green-700 hover:bg-green-50"
                        >
                          Process Another Transaction
                        </Button>
                      </div>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="settlement" className="space-y-6">
                  <Card className="bg-white/60 backdrop-blur-lg border-white/30 p-6">
                    <h4 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-3">
                      <Shield className="h-6 w-6 text-blue-600" />
                      PEXA Electronic Settlement Tracking
                      <Badge className="bg-blue-500 text-white">LIVE</Badge>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Settlement Status */}
                      <Card className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border-blue-200/50 p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Clock className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm text-blue-700 font-medium">Settlement Status</p>
                            <p className="text-lg font-bold text-blue-800">Workspace Created</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-green-700 font-medium">Active in PEXA</span>
                        </div>
                      </Card>

                      {/* Settlement Timeline */}
                      <Card className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 border-green-200/50 p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="text-sm text-green-700 font-medium">Settlement Date</p>
                            <p className="text-lg font-bold text-green-800">
                              {new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-green-600">
                          <span>{currentProperty.settlement} from auction date</span>
                        </div>
                      </Card>
                    </div>

                    {/* PEXA Integration Actions */}
                    <div className="space-y-4">
                      <h5 className="text-lg font-semibold text-slate-700">Settlement Actions</h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button 
                          className="h-20 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white flex flex-col items-center justify-center gap-2"
                          onClick={handleCreatePEXAWorkspace}
                        >
                          <Building2 className="h-6 w-6" />
                          <span className="text-sm font-medium">Create PEXA Workspace</span>
                        </Button>

                        <Button 
                          className="h-20 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white flex flex-col items-center justify-center gap-2"
                          onClick={handleSubmitValuationToPEXA}
                        >
                          <FileText className="h-6 w-6" />
                          <span className="text-sm font-medium">Submit Valuation</span>
                        </Button>

                        <Button 
                          className="h-20 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex flex-col items-center justify-center gap-2"
                          onClick={handleTrackSettlement}
                        >
                          <Activity className="h-6 w-6" />
                          <span className="text-sm font-medium">Track Settlement</span>
                        </Button>
                      </div>
                    </div>

                    {/* Settlement Progress */}
                    <Card className="bg-gradient-to-r from-slate-50/80 to-gray-50/80 border-slate-200/50 p-6 mt-6">
                      <h5 className="text-lg font-semibold text-slate-700 mb-4">Settlement Progress</h5>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-700">Property Search Completed</p>
                            <p className="text-sm text-slate-500">Property verified in PEXA database</p>
                          </div>
                          <Badge className="bg-green-500 text-white">Complete</Badge>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-700">Workspace Creation</p>
                            <p className="text-sm text-slate-500">Setting up electronic settlement workspace</p>
                          </div>
                          <Badge className="bg-blue-500 text-white">In Progress</Badge>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-500">Document Lodgement</p>
                            <p className="text-sm text-slate-400">Submit contracts and settlement documents</p>
                          </div>
                          <Badge variant="outline">Pending</Badge>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <Shield className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-500">Settlement Completion</p>
                            <p className="text-sm text-slate-400">Electronic settlement processing</p>
                          </div>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h6 className="font-semibold text-blue-800">PEXA Integration Benefits</h6>
                            <ul className="text-sm text-blue-700 mt-2 space-y-1">
                              <li>• Secure electronic settlement processing</li>
                              <li>• Real-time transaction tracking</li>
                              <li>• Automated document verification</li>
                              <li>• Instant fund settlement</li>
                              <li>• Reduced settlement risk</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Card>
                </TabsContent>

                <TabsContent value="contracts" className="space-y-6">
                  <Card className="bg-white/60 backdrop-blur-lg border-white/30 p-6">
                    <h4 className="text-xl font-bold text-slate-700 mb-6">Digital Contracts & Signatures</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-slate-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="font-semibold text-slate-700">Sale Contract</p>
                            <p className="text-sm text-slate-500">Generated automatically</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white">Ready</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-slate-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="font-semibold text-slate-700">Digital Signatures</p>
                            <p className="text-sm text-slate-500">Blockchain verified</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-500 text-white">Pending</Badge>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <DigitalContractSigning />
                </TabsContent>

                <TabsContent value="reporting" className="space-y-6">
                  <Card className="bg-white/60 backdrop-blur-lg border-white/30 p-6">
                    <h4 className="text-xl font-bold text-slate-700 mb-6">Transaction Analytics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50/80 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">$8.2M</p>
                        <p className="text-sm text-slate-600">Total Sales Today</p>
                      </div>
                      <div className="text-center p-4 bg-green-50/80 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">15</p>
                        <p className="text-sm text-slate-600">Properties Sold</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50/80 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">$246K</p>
                        <p className="text-sm text-slate-600">Commission Earned</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50/80 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">98%</p>
                        <p className="text-sm text-slate-600">Success Rate</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Promotion Footer */}
        <Card className="mt-12 bg-gradient-to-r from-slate-900/90 to-blue-900/90 text-white rounded-2xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Crown className="h-12 w-12 text-yellow-400" />
              <div>
                <h3 className="text-3xl font-black">Ready for Social Media?</h3>
                <p className="text-blue-200">Share Australia's Most Advanced Auction POS</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <p className="text-3xl font-black text-yellow-400">$2.5B+</p>
                <p className="text-sm text-blue-200">Transactions Processed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-yellow-400">95%</p>
                <p className="text-sm text-blue-200">Faster Processing</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-yellow-400">40+</p>
                <p className="text-sm text-blue-200">Banking Partners</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-yellow-400">1st</p>
                <p className="text-sm text-blue-200">3D Auction POS in Australia</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 hover:from-yellow-500 hover:to-orange-500 px-8 py-4 text-lg font-bold">
              <Smartphone className="h-5 w-5 mr-2" />
              Download Social Media Kit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuctionSpherePOS;