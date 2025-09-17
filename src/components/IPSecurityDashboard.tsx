/**
 * ============================================================================
 * IP SECURITY DASHBOARD - CONFIDENTIAL
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * MAXIMUM SECURITY CLASSIFICATION
 * Access to this component is restricted to authorized personnel only.
 * Unauthorized access, use, or distribution is strictly prohibited.
 * ============================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Lock, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Star,
  TrendingUp,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

export default function IPSecurityDashboard() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [securityLevel, setSecurityLevel] = useState<'public' | 'restricted' | 'confidential' | 'top_secret'>('top_secret');

  // Core IP Assets Portfolio
  const patentApplications = [
    {
      id: 'PAT-001',
      title: 'AI-Powered ESG Property Valuation Algorithm',
      status: 'filed',
      applicationNumber: 'AU2024901234',
      filingDate: '2024-03-15',
      jurisdiction: ['Australia', 'United States', 'European Union'],
      commercialValue: 50000000,
      protectionLevel: 'critical',
      description: 'Revolutionary algorithm combining ESG factors with traditional valuation methods'
    },
    {
      id: 'PAT-002', 
      title: 'Real-Time Digital Asset Auction Platform',
      status: 'pending',
      applicationNumber: 'AU2024901235',
      filingDate: '2024-04-20',
      jurisdiction: ['Australia', 'United States'],
      commercialValue: 75000000,
      protectionLevel: 'critical',
      description: 'Blockchain-integrated live auction system for digital assets'
    },
    {
      id: 'PAT-003',
      title: 'Climate Risk Integration for Property Assessment',
      status: 'draft',
      applicationNumber: 'Pending',
      filingDate: '2024-12-01',
      jurisdiction: ['Australia'],
      commercialValue: 25000000,
      protectionLevel: 'high',
      description: 'Climate data integration methodology for future-proof valuations'
    }
  ];

  const trademarks = [
    {
      id: 'TM-001',
      name: 'Sustaino-Sphere™',
      registrationNumber: 'TM2024567890',
      status: 'registered',
      jurisdiction: ['Australia', 'United States'],
      protectionLevel: 'critical',
      commercialValue: 15000000,
      description: 'Digital asset valuation and marketplace platform'
    },
    {
      id: 'TM-002',
      name: 'Auction-Sphere™', 
      registrationNumber: 'TM2024567891',
      status: 'registered',
      jurisdiction: ['Australia'],
      protectionLevel: 'critical',
      commercialValue: 12000000,
      description: 'Live property auction intelligence platform'
    },
    {
      id: 'TM-003',
      name: 'POWERED™',
      registrationNumber: 'TM2024567892',
      status: 'pending',
      jurisdiction: ['Australia', 'United States', 'European Union'],
      protectionLevel: 'high',
      commercialValue: 20000000,
      description: 'Comprehensive property intelligence ecosystem'
    }
  ];

  const tradeSecrets = [
    {
      id: 'TS-001',
      name: 'SustanoVal™ Algorithm',
      category: 'algorithm',
      riskLevel: 'critical',
      commercialValue: 100000000,
      accessLevel: 'founder',
      protectionMeasures: ['Code Obfuscation', 'Access Controls', 'NDA Requirements'],
      description: 'Proprietary valuation algorithm combining AI, ESG, and market data'
    },
    {
      id: 'TS-002',
      name: 'Customer Database & Analytics',
      category: 'database',
      riskLevel: 'high',
      commercialValue: 5000000,
      accessLevel: 'senior',
      protectionMeasures: ['Encryption', 'Access Logging', 'Regular Audits'],
      description: 'Comprehensive client relationship and behavior analytics'
    },
    {
      id: 'TS-003',
      name: 'Market Intelligence Processes',
      category: 'process',
      riskLevel: 'medium',
      commercialValue: 8000000,
      accessLevel: 'developer',
      protectionMeasures: ['Process Documentation', 'Training Protocols'],
      description: 'Methodologies for real-time market data analysis and prediction'
    }
  ];

  const copyrights = [
    {
      id: 'CR-001',
      title: 'POWERED Platform Source Code',
      registrationNumber: 'CR2024-POWERED-001',
      status: 'registered',
      commercialValue: 50000000,
      protectionLevel: 'critical',
      description: 'Complete platform codebase including all modules and integrations'
    },
    {
      id: 'CR-002',
      title: 'Training Materials and Documentation',
      registrationNumber: 'CR2024-POWERED-002', 
      status: 'registered',
      commercialValue: 2000000,
      protectionLevel: 'medium',
      description: 'Comprehensive user guides, training materials, and technical documentation'
    }
  ];

  const getTotalIPValue = () => {
    const patentValue = patentApplications.reduce((sum, p) => sum + p.commercialValue, 0);
    const trademarkValue = trademarks.reduce((sum, t) => sum + t.commercialValue, 0);
    const tradeSecretValue = tradeSecrets.reduce((sum, ts) => sum + ts.commercialValue, 0);
    const copyrightValue = copyrights.reduce((sum, c) => sum + c.commercialValue, 0);
    return patentValue + trademarkValue + tradeSecretValue + copyrightValue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered':
      case 'granted':
        return 'bg-green-100 text-green-800';
      case 'filed':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Security Classification Header */}
      <div className="bg-red-900 text-white p-4 rounded-lg mb-6 border-2 border-red-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6" />
            <div>
              <h1 className="text-xl font-bold">CONFIDENTIAL - IP SECURITY DASHBOARD</h1>
              <p className="text-sm opacity-90">Classification: TOP SECRET | Access Level: FOUNDER ONLY</p>
            </div>
          </div>
          <Badge variant="destructive" className="bg-red-600">
            RESTRICTED ACCESS
          </Badge>
        </div>
      </div>

      {/* IP Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total IP Value</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(getTotalIPValue())}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Patent Applications</p>
                <p className="text-2xl font-bold text-blue-400">{patentApplications.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Registered Trademarks</p>
                <p className="text-2xl font-bold text-purple-400">{trademarks.filter(t => t.status === 'registered').length}</p>
              </div>
              <Star className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Trade Secrets</p>
                <p className="text-2xl font-bold text-red-400">{tradeSecrets.length}</p>
              </div>
              <Lock className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Alert className="bg-yellow-50 border-yellow-200 mb-6">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Security Notice:</strong> 3 patent applications require action within 30 days. 
          1 trademark renewal due in 60 days. All trade secrets access logged and monitored.
        </AlertDescription>
      </Alert>

      {/* Detailed IP Portfolio */}
      <Tabs defaultValue="patents" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="patents" className="text-white data-[state=active]:bg-slate-700">Patents</TabsTrigger>
          <TabsTrigger value="trademarks" className="text-white data-[state=active]:bg-slate-700">Trademarks</TabsTrigger>
          <TabsTrigger value="secrets" className="text-white data-[state=active]:bg-slate-700">Trade Secrets</TabsTrigger>
          <TabsTrigger value="copyrights" className="text-white data-[state=active]:bg-slate-700">Copyrights</TabsTrigger>
        </TabsList>

        <TabsContent value="patents" className="space-y-4">
          {patentApplications.map((patent) => (
            <Card key={patent.id} className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{patent.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getRiskColor(patent.protectionLevel)}>
                      {patent.protectionLevel.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(patent.status)}>
                      {patent.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Application Number</p>
                    <p className="font-semibold">{patent.applicationNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Filing Date</p>
                    <p className="font-semibold">{patent.filingDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Commercial Value</p>
                    <p className="font-semibold text-green-400">{formatCurrency(patent.commercialValue)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-slate-400 text-sm">Jurisdictions</p>
                  <div className="flex gap-2 mt-1">
                    {patent.jurisdiction.map((j) => (
                      <Badge key={j} variant="outline" className="text-slate-300 border-slate-600">
                        {j}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 mt-4">{patent.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trademarks" className="space-y-4">
          {trademarks.map((trademark) => (
            <Card key={trademark.id} className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{trademark.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getRiskColor(trademark.protectionLevel)}>
                      {trademark.protectionLevel.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(trademark.status)}>
                      {trademark.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Registration Number</p>
                    <p className="font-semibold">{trademark.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Commercial Value</p>
                    <p className="font-semibold text-green-400">{formatCurrency(trademark.commercialValue)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Jurisdictions</p>
                    <div className="flex gap-1">
                      {trademark.jurisdiction.map((j) => (
                        <Badge key={j} variant="outline" className="text-slate-300 border-slate-600 text-xs">
                          {j}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 mt-4">{trademark.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="secrets" className="space-y-4">
          {tradeSecrets.map((secret) => (
            <Card key={secret.id} className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{secret.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getRiskColor(secret.riskLevel)}>
                      {secret.riskLevel.toUpperCase()} RISK
                    </Badge>
                    <Badge className="bg-slate-700 text-slate-300">
                      {secret.accessLevel.toUpperCase()} ACCESS
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Category</p>
                    <p className="font-semibold capitalize">{secret.category.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Commercial Value</p>
                    <p className="font-semibold text-green-400">{formatCurrency(secret.commercialValue)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-slate-400 text-sm">Protection Measures</p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {secret.protectionMeasures.map((measure) => (
                      <Badge key={measure} variant="outline" className="text-slate-300 border-slate-600">
                        {measure}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 mt-4">{secret.description}</p>
                <Alert className="bg-red-900 border-red-700 mt-4">
                  <Lock className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-200">
                    <strong>CONFIDENTIAL:</strong> Access to this trade secret is strictly controlled and monitored.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="copyrights" className="space-y-4">
          {copyrights.map((copyright) => (
            <Card key={copyright.id} className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{copyright.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getRiskColor(copyright.protectionLevel)}>
                      {copyright.protectionLevel.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(copyright.status)}>
                      {copyright.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Registration Number</p>
                    <p className="font-semibold">{copyright.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Commercial Value</p>
                    <p className="font-semibold text-green-400">{formatCurrency(copyright.commercialValue)}</p>
                  </div>
                </div>
                <p className="text-slate-300 mt-4">{copyright.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Action Center */}
      <Card className="bg-slate-800 border-slate-700 text-white mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            IP Security Action Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Download className="h-4 w-4 mr-2" />
              Export IP Portfolio
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Update Protection Status
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Eye className="h-4 w-4 mr-2" />
              Security Audit Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer Security Notice */}
      <div className="mt-8 p-4 bg-slate-900 rounded-lg border border-slate-700">
        <p className="text-slate-400 text-center text-sm">
          © 2025 DeLorenzo Property Group Pty Ltd. All intellectual property rights reserved. 
          This dashboard contains confidential and proprietary information protected by multiple layers of security.
          Unauthorized access or distribution is prohibited and will be prosecuted to the full extent of the law.
        </p>
      </div>
    </div>
  );
}