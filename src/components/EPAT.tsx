/*
 * EPAT™ (Employee Performance Assessment Tool)
 * © 2024 Powered™. All Rights Reserved.
 * 
 * CONFIDENTIAL AND PROPRIETARY
 * This software contains proprietary and confidential information of Powered™.
 * Patent Pending - Advanced Performance Assessment System™
 * Unauthorized reproduction or distribution is strictly prohibited.
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PerformanceRatingSystem } from './PerformanceRatingSystem';
import { EmployeePerformancePlatform } from './EmployeePerformancePlatform';
import { EnhancedEPAT } from './comprehensive/EnhancedEPAT';
import { IndustryPositionEPAT } from './IndustryPositionEPAT';
import { DemoAccessPanel } from './DemoAccessPanel';
import { Users, TrendingUp, ArrowLeft, Zap } from 'lucide-react';

interface EPATProps {
  onBackToDashboard?: () => void;
}

export const EPAT: React.FC<EPATProps> = ({ onBackToDashboard }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                EPAT™ - Employee Performance Assessment Tool
                <span className="text-xs text-muted-foreground ml-2">® Powered™</span>
              </CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                © 2024 Powered™. EPAT™ - Patent Pending. All Rights Reserved.
              </div>
            </div>
            {onBackToDashboard && (
              <Button
                variant="outline"
                onClick={onBackToDashboard}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="demo-access" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="demo-access" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Demo Access
              </TabsTrigger>
              <TabsTrigger value="industry-position" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Industry & Position-Based EPAT™
              </TabsTrigger>
              <TabsTrigger value="performance-rating" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance Rating System™
              </TabsTrigger>
              <TabsTrigger value="employee-assessment" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Employee Performance & Value Assessment™
              </TabsTrigger>
              <TabsTrigger value="enhanced-epat" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Comprehensive Employment Analysis™
              </TabsTrigger>
            </TabsList>

            <TabsContent value="demo-access">
              <DemoAccessPanel />
            </TabsContent>

            <TabsContent value="industry-position">
              <IndustryPositionEPAT />
            </TabsContent>

            <TabsContent value="performance-rating">
              <PerformanceRatingSystem />
            </TabsContent>

            <TabsContent value="employee-assessment">
              <EmployeePerformancePlatform />
            </TabsContent>

            <TabsContent value="enhanced-epat">
              <EnhancedEPAT />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};