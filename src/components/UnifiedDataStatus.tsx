import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Database, RefreshCw } from 'lucide-react';
import { useUnifiedDataManager } from '@/hooks/useUnifiedDataManager';

export const UnifiedDataStatus = () => {
  const [dataStatus, setDataStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getAllData, clearAllData } = useUnifiedDataManager();

  const checkDataStatus = async () => {
    setIsLoading(true);
    try {
      const data = await getAllData();
      setDataStatus({
        hasData: !!data,
        reportSections: data?.reportData ? Object.keys(data.reportData).length : 0,
        componentSections: data?.componentData ? Object.keys(data.componentData).length : 0,
        hasAddress: !!(data?.addressData?.propertyAddress || data?.addressData?.streetNumber),
        currentStep: data?.assessmentProgress?.currentStep || 0,
        completedSteps: data?.assessmentProgress?.completedSteps?.filter(Boolean).length || 0,
        lastUpdated: data?.lastUpdated,
        userId: data?.userId,
        isDemo: data?.isDemo
      });
    } catch (error) {
      console.error('Error checking data status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkDataStatus();
  }, []);

  const handleClearData = async () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      await clearAllData();
      await checkDataStatus();
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Loading data status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Unified Data Manager Status
          {dataStatus?.hasData ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <AlertCircle className="h-3 w-3 mr-1" />
              No Data
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {dataStatus?.reportSections || 0}
            </div>
            <div className="text-sm text-muted-foreground">Report Sections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {dataStatus?.componentSections || 0}
            </div>
            <div className="text-sm text-muted-foreground">Component Data</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {dataStatus?.currentStep || 0}
            </div>
            <div className="text-sm text-muted-foreground">Current Step</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {dataStatus?.completedSteps || 0}
            </div>
            <div className="text-sm text-muted-foreground">Completed Steps</div>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Address:</span>
            <Badge variant={dataStatus?.hasAddress ? "default" : "secondary"}>
              {dataStatus?.hasAddress ? "Set" : "Not Set"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>User Type:</span>
            <Badge variant={dataStatus?.isDemo ? "secondary" : "default"}>
              {dataStatus?.isDemo ? "Demo" : "Authenticated"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Last Updated:</span>
            <span className="text-muted-foreground">
              {dataStatus?.lastUpdated ? new Date(dataStatus.lastUpdated).toLocaleString() : 'Never'}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={checkDataStatus}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleClearData}
            className="flex items-center gap-1"
          >
            Clear All Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};