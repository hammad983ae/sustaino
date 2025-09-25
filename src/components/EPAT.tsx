import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceRatingSystem } from './PerformanceRatingSystem';
import { EmployeePerformancePlatform } from './EmployeePerformancePlatform';
import { Users, TrendingUp } from 'lucide-react';

export const EPAT: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            EPAT - Employee Performance Assessment Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance-rating" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="performance-rating" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance Rating System
              </TabsTrigger>
              <TabsTrigger value="employee-assessment" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Employee Performance & Value Assessment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance-rating">
              <PerformanceRatingSystem />
            </TabsContent>

            <TabsContent value="employee-assessment">
              <EmployeePerformancePlatform />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};