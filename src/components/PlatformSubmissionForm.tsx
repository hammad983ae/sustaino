import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Building2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Calculator,
  Globe,
  Shield,
  Award,
  BarChart3,
  Zap,
  Clock,
  Gavel
} from 'lucide-react';

interface PlatformData {
  // Basic Information
  platformName: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  
  // Platform Details
  platformType: string;
  industry: string;
  description: string;
  foundedYear: string;
  employees: string;
  
  // Financial Data
  currentRevenue: string;
  monthlyRecurring: string;
  totalUsers: string;
  activeUsers: string;
  transactionVolume: string;
  
  // Technology Stack
  techStack: string[];
  hasAPI: boolean;
  hasMobileApp: boolean;
  hasBlockchain: boolean;
  hasAI: boolean;
  
  // IP & Assets
  patents: string;
  trademarks: string;
  copyrights: string;
  tradSecrets: string;
  
  // Market Position
  competitors: string;
  marketShare: string;
  growth: string;
  funding: string;
  
  // Auction Preferences
  reservePrice: string;
  auctionType: string;
  timeframe: string;
  
  // Trading Status
  yetToCommenceTrading: boolean;
}

export default function PlatformSubmissionForm() {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<PlatformData>({
    platformName: '',
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    platformType: '',
    industry: '',
    description: '',
    foundedYear: '',
    employees: '',
    currentRevenue: '',
    monthlyRecurring: '',
    totalUsers: '',
    activeUsers: '',
    transactionVolume: '',
    techStack: [],
    hasAPI: false,
    hasMobileApp: false,
    hasBlockchain: false,
    hasAI: false,
    patents: '',
    trademarks: '',
    copyrights: '',
    tradSecrets: '',
    competitors: '',
    marketShare: '',
    growth: '',
    funding: '',
    reservePrice: '',
    auctionType: '',
    timeframe: '',
    yetToCommenceTrading: false
  });

  const [completionProgress, setCompletionProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const handleInputChange = (field: keyof PlatformData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    calculateProgress();
    calculateEstimatedValue();
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const completedFields = Object.values(formData).filter(value => {
      if (typeof value === 'string') return value.trim() !== '';
      if (typeof value === 'boolean') return true;
      if (Array.isArray(value)) return value.length > 0;
      return false;
    }).length;
    
    setCompletionProgress((completedFields / totalFields) * 100);
  };

  const calculateEstimatedValue = () => {
    if (formData.yetToCommenceTrading) {
      // Pre-revenue valuation based on potential and development stage
      let baseValue = 500000; // Base pre-revenue valuation
      
      // Tech stack multipliers for pre-revenue
      if (formData.hasAI) baseValue *= 2.5;
      if (formData.hasBlockchain) baseValue *= 2.0;
      if (formData.hasAPI) baseValue *= 1.5;
      if (formData.hasMobileApp) baseValue *= 1.3;
      
      // IP multipliers (more valuable for pre-revenue)
      const patentCount = parseInt(formData.patents) || 0;
      baseValue += patentCount * 750000; // $750k per patent for pre-revenue
      
      // Funding raised as indicator of value
      const fundingRaised = parseFloat(formData.funding) || 0;
      baseValue += fundingRaised * 0.8; // 80% of funding raised
      
      setEstimatedValue(baseValue);
      return;
    }
    
    const revenue = parseFloat(formData.currentRevenue) || 0;
    const users = parseFloat(formData.totalUsers) || 0;
    const mrr = parseFloat(formData.monthlyRecurring) || 0;
    const transactionVol = parseFloat(formData.transactionVolume) || 0;
    
    // Simplified valuation algorithm
    let baseValue = revenue * 5; // 5x revenue multiple
    baseValue += mrr * 12 * 8; // 8x ARR for recurring revenue
    baseValue += users * 100; // $100 per user
    baseValue += transactionVol * 0.02; // 2% of transaction volume
    
    // Tech stack multipliers
    if (formData.hasAI) baseValue *= 1.3;
    if (formData.hasBlockchain) baseValue *= 1.2;
    if (formData.hasAPI) baseValue *= 1.1;
    if (formData.hasMobileApp) baseValue *= 1.1;
    
    // IP multipliers
    const patentCount = parseInt(formData.patents) || 0;
    baseValue += patentCount * 500000; // $500k per patent
    
    setEstimatedValue(baseValue);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    calculateEstimatedValue();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCompletionColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Platform Submitted Successfully!</h2>
            <p className="text-green-700 mb-6">Your platform has been submitted for valuation and auction listing.</p>
            
            {estimatedValue && (
              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-2">Preliminary Valuation</h3>
                <div className="text-3xl font-bold text-blue-600">{formatCurrency(estimatedValue)}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  *Estimated market value based on submitted data. Final valuation will be completed by our expert team.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4">
                <Clock className="h-8 w-8 text-blue-600 mb-2" />
                <div className="font-semibold">Next Steps</div>
                <div className="text-sm text-muted-foreground">Expert review within 48 hours</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <FileText className="h-8 w-8 text-purple-600 mb-2" />
                <div className="font-semibold">Documentation</div>
                <div className="text-sm text-muted-foreground">Professional audit & due diligence</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Gavel className="h-8 w-8 text-green-600 mb-2" />
                <div className="font-semibold">Live Auction</div>
                <div className="text-sm text-muted-foreground">Platform listed for bidding</div>
              </div>
            </div>
            
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Submit Another Platform
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            List Your Platform for Live Auction
          </CardTitle>
          <p className="text-muted-foreground">
            Submit your digital platform for professional valuation and live auction listing on SustanoSphere™
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>Completion Progress</span>
                <span>{Math.round(completionProgress)}%</span>
              </div>
              <Progress value={completionProgress} className={`h-2 ${getCompletionColor(completionProgress)}`} />
            </div>
            {estimatedValue && (
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Estimated Value</div>
                <div className="text-lg font-bold text-blue-600">{formatCurrency(estimatedValue)}</div>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="ip">IP & Assets</TabsTrigger>
          <TabsTrigger value="auction">Auction Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platformName">Platform Name *</Label>
                  <Input
                    id="platformName"
                    value={formData.platformName}
                    onChange={(e) => handleInputChange('platformName', e.target.value)}
                    placeholder="e.g., SustanoSphere"
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="e.g., DeLorenzo Property Group"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="contact@yourcompany.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone *</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+61 xxx xxx xxx"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourplatform.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input
                    id="foundedYear"
                    value={formData.foundedYear}
                    onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                    placeholder="2020"
                  />
                </div>
                <div>
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Select value={formData.employees} onValueChange={(value) => handleInputChange('employees', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5</SelectItem>
                      <SelectItem value="6-20">6-20</SelectItem>
                      <SelectItem value="21-50">21-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="200+">200+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platform">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Platform Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platformType">Platform Type *</Label>
                  <Select value={formData.platformType} onValueChange={(value) => handleInputChange('platformType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="saas">SaaS Platform</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="proptech">PropTech</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="edtech">EdTech</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Platform Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your platform's core functionality, value proposition, and key features..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Trading Status */}
              <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Checkbox
                  id="yetToCommenceTrading"
                  checked={formData.yetToCommenceTrading}
                  onCheckedChange={(checked) => handleInputChange('yetToCommenceTrading', checked)}
                />
                <Label htmlFor="yetToCommenceTrading" className="flex items-center gap-2 font-medium">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Yet to Commence Trading (Pre-Revenue Stage)
                </Label>
              </div>
              
              {formData.yetToCommenceTrading && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Pre-Revenue Platform</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Valuation will be based on development stage, technology stack, IP portfolio, and funding raised.
                    Financial projections can be added in the description section.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentRevenue">
                    {formData.yetToCommenceTrading ? "Projected Annual Revenue (AUD)" : "Annual Revenue (AUD)"}
                    {!formData.yetToCommenceTrading && " *"}
                  </Label>
                  <Input
                    id="currentRevenue"
                    type="number"
                    value={formData.currentRevenue}
                    onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
                    placeholder={formData.yetToCommenceTrading ? "Projected: 1000000" : "1000000"}
                    disabled={formData.yetToCommenceTrading}
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyRecurring">
                    {formData.yetToCommenceTrading ? "Projected Monthly Recurring Revenue (AUD)" : "Monthly Recurring Revenue (AUD)"}
                  </Label>
                  <Input
                    id="monthlyRecurring"
                    type="number"
                    value={formData.monthlyRecurring}
                    onChange={(e) => handleInputChange('monthlyRecurring', e.target.value)}
                    placeholder={formData.yetToCommenceTrading ? "Projected: 50000" : "50000"}
                    disabled={formData.yetToCommenceTrading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalUsers">
                    {formData.yetToCommenceTrading ? "Projected Total Users" : "Total Users"}
                  </Label>
                  <Input
                    id="totalUsers"
                    type="number"
                    value={formData.totalUsers}
                    onChange={(e) => handleInputChange('totalUsers', e.target.value)}
                    placeholder={formData.yetToCommenceTrading ? "Projected: 10000" : "10000"}
                  />
                </div>
                <div>
                  <Label htmlFor="activeUsers">
                    {formData.yetToCommenceTrading ? "Projected Monthly Active Users" : "Monthly Active Users"}
                  </Label>
                  <Input
                    id="activeUsers"
                    type="number"
                    value={formData.activeUsers}
                    onChange={(e) => handleInputChange('activeUsers', e.target.value)}
                    placeholder={formData.yetToCommenceTrading ? "Projected: 5000" : "5000"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transactionVolume">
                    {formData.yetToCommenceTrading ? "Projected Annual Transaction Volume (AUD)" : "Annual Transaction Volume (AUD)"}
                  </Label>
                  <Input
                    id="transactionVolume"
                    type="number"
                    value={formData.transactionVolume}
                    onChange={(e) => handleInputChange('transactionVolume', e.target.value)}
                    placeholder={formData.yetToCommenceTrading ? "Projected: 10000000" : "10000000"}
                    disabled={formData.yetToCommenceTrading}
                  />
                </div>
                
                <div>
                  <Label htmlFor="funding">Total Funding Raised (AUD)</Label>
                  <Input
                    id="funding"
                    type="number"
                    value={formData.funding}
                    onChange={(e) => handleInputChange('funding', e.target.value)}
                    placeholder="500000"
                  />
                </div>
                <div>
                  <Label htmlFor="funding">Total Funding Raised (AUD)</Label>
                  <Input
                    id="funding"
                    type="number"
                    value={formData.funding}
                    onChange={(e) => handleInputChange('funding', e.target.value)}
                    placeholder="500000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAPI"
                    checked={formData.hasAPI}
                    onCheckedChange={(checked) => handleInputChange('hasAPI', checked)}
                  />
                  <Label htmlFor="hasAPI">API Integration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasMobileApp"
                    checked={formData.hasMobileApp}
                    onCheckedChange={(checked) => handleInputChange('hasMobileApp', checked)}
                  />
                  <Label htmlFor="hasMobileApp">Mobile App</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasBlockchain"
                    checked={formData.hasBlockchain}
                    onCheckedChange={(checked) => handleInputChange('hasBlockchain', checked)}
                  />
                  <Label htmlFor="hasBlockchain">Blockchain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAI"
                    checked={formData.hasAI}
                    onCheckedChange={(checked) => handleInputChange('hasAI', checked)}
                  />
                  <Label htmlFor="hasAI">AI/ML Features</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="techStackDescription">Technology Description</Label>
                <Textarea
                  id="techStackDescription"
                  placeholder="Describe your technology stack, architecture, databases, frameworks, cloud services, etc..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ip">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Intellectual Property & Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patents">Patents Filed/Granted</Label>
                  <Input
                    id="patents"
                    type="number"
                    value={formData.patents}
                    onChange={(e) => handleInputChange('patents', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="trademarks">Trademarks</Label>
                  <Input
                    id="trademarks"
                    type="number"
                    value={formData.trademarks}
                    onChange={(e) => handleInputChange('trademarks', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="copyrights">Copyrights</Label>
                  <Input
                    id="copyrights"
                    type="number"
                    value={formData.copyrights}
                    onChange={(e) => handleInputChange('copyrights', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="tradSecrets">Trade Secrets</Label>
                  <Input
                    id="tradSecrets"
                    type="number"
                    value={formData.tradSecrets}
                    onChange={(e) => handleInputChange('tradSecrets', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="competitors">Main Competitors</Label>
                  <Textarea
                    id="competitors"
                    value={formData.competitors}
                    onChange={(e) => handleInputChange('competitors', e.target.value)}
                    placeholder="List your main competitors..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="marketShare">Market Position</Label>
                  <Textarea
                    id="marketShare"
                    value={formData.marketShare}
                    onChange={(e) => handleInputChange('marketShare', e.target.value)}
                    placeholder="Describe your market position and competitive advantages..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auction">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Auction Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reservePrice">Reserve Price (AUD)</Label>
                  <Input
                    id="reservePrice"
                    type="number"
                    value={formData.reservePrice}
                    onChange={(e) => handleInputChange('reservePrice', e.target.value)}
                    placeholder="Minimum acceptable price"
                  />
                </div>
                <div>
                  <Label htmlFor="auctionType">Auction Type</Label>
                  <Select value={formData.auctionType} onValueChange={(value) => handleInputChange('auctionType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="absolute">Absolute Sale</SelectItem>
                      <SelectItem value="reserve">With Reserve</SelectItem>
                      <SelectItem value="partnership">Partnership Sale</SelectItem>
                      <SelectItem value="equity">Equity Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="timeframe">Preferred Auction Timeframe</Label>
                <Select value={formData.timeframe} onValueChange={(value) => handleInputChange('timeframe', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Within 2 weeks</SelectItem>
                    <SelectItem value="month">Within 1 month</SelectItem>
                    <SelectItem value="quarter">Within 3 months</SelectItem>
                    <SelectItem value="flexible">Flexible timing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Auction Process</h4>
                <ul className="text-sm space-y-1">
                  <li>• Professional valuation by certified assessors</li>
                  <li>• Due diligence documentation preparation</li>
                  <li>• Marketing campaign to qualified buyers</li>
                  <li>• Live auction with transparent bidding</li>
                  <li>• Secure transaction and settlement</li>
                </ul>
              </div>

              <Button onClick={handleSubmit} className="w-full" size="lg">
                Submit Platform for Auction
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}