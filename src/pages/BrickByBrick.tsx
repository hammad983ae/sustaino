/**
 * ============================================================================
 * BRICK-BY-BRICK PLATFORM PAGE - MAXIMUM IP PROTECTION
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Patent Protected Component - Commercial License Required
 * ============================================================================
 */
import React from 'react';
import { BrickByBrickPlatform } from '@/components/BrickByBrickPlatform';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ArrowLeft, Users, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BrickByBrickPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
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
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">
                BrickByBrick Pro™
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fractional property investment platform. Pool your money with other investors to access 
              premium real estate opportunities with as little as $100.
            </p>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Pool Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Join investment pools with other investors to access high-value properties
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Diversified Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Spread risk across multiple properties with professional management
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Secure Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Bank-level security with regulated investment structures and transparency
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Key Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">$47.2M</div>
              <div className="text-sm text-muted-foreground">Total Platform Value</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600 mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Active Investors</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600 mb-1">8.7%</div>
              <div className="text-sm text-muted-foreground">Average Annual Return</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600 mb-1">$500</div>
              <div className="text-sm text-muted-foreground">Minimum Investment</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Platform Component */}
        <BrickByBrickPlatform />

        {/* How It Works */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">How BrickByBrick Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Browse Properties</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore vetted investment opportunities with detailed analytics
                  </p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Invest Your Amount</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your investment amount from as little as $100
                  </p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Join the Pool</h3>
                  <p className="text-sm text-muted-foreground">
                    Your investment is pooled with other investors for the property
                  </p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Earn Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive proportional rental income and capital appreciation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Protected Investment Technology</h3>
              <p className="text-purple-100">
                This fractional property investment platform is protected by international patents covering 
                pool-based property investing, automated crowdfunding, and brick-by-brick ownership systems.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrickByBrickPage;