/**
 * ============================================================================
 * INVESTMENT PLATFORM PAGE - MAXIMUM IP PROTECTION
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Patent Protected Component - Commercial License Required
 * ============================================================================
 */
import React from 'react';
import { InvestmentPlatform } from '@/components/InvestmentPlatform';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PiggyBank, ArrowLeft, TrendingUp, Shield, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Import professional images
import investmentPlatformInterface from '@/assets/investment-platform-interface.jpg';

const InvestmentPlatformPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <PiggyBank className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">
                SmartInvest Pro™
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build wealth with spare change and smart goals. Micro-investing made simple with 
              automated portfolio management and goal-based investing.
            </p>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Smart Portfolios</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Choose from Conservative, Moderate, or Aggressive portfolios designed by experts
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Goal-Based Investing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Set specific financial goals and track progress with automated contributions
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Secure & Regulated</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Bank-level security with AFSL licensing and investor protection coverage
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Platform Component */}
        <InvestmentPlatform />

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Protected Investment Technology</h3>
              <p className="text-green-100">
                This investment platform is protected by international patents covering micro-investing, 
                automated portfolio management, and goal-based investment allocation systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlatformPage;