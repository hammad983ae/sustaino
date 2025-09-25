import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DomainAPIClient from '@/utils/domainAPIClient';

export const DomainAPIStatus: React.FC = () => {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const apiClient = new DomainAPIClient();

  const checkStatus = async () => {
    setLoading(true);
    try {
      const statusData = await apiClient.getStatus();
      setStatus(statusData);
      toast({
        title: "Status Updated",
        description: "API status has been refreshed",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Status Check Failed",
        description: "Unable to retrieve API status",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const getStatusBadge = (isOnline: boolean) => {
    return (
      <Badge variant={isOnline ? "default" : "destructive"}>
        {isOnline ? "Online" : "Offline"}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Domain API Status</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={checkStatus}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {status ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span>API Status:</span>
                {getStatusBadge(status.online)}
              </div>
              <div className="flex justify-between items-center">
                <span>Response Time:</span>
                <span className="text-sm">{status.responseTime || 'N/A'}ms</span>
              </div>
            </div>
            
            {status.endpoints && (
              <div className="space-y-2">
                <h4 className="font-medium">Endpoint Status:</h4>
                {Object.entries(status.endpoints).map(([endpoint, isOnline]) => (
                  <div key={endpoint} className="flex justify-between items-center">
                    <span className="text-sm">{endpoint}:</span>
                    {getStatusBadge(isOnline as boolean)}
                  </div>
                ))}
              </div>
            )}

            {status.rateLimit && (
              <div className="space-y-2">
                <h4 className="font-medium">Rate Limit Info:</h4>
                <div className="text-sm space-y-1">
                  <div>Requests remaining: {status.rateLimit.remaining}</div>
                  <div>Reset time: {new Date(status.rateLimit.reset).toLocaleTimeString()}</div>
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Click refresh to check API status</p>
        )}
      </CardContent>
    </Card>
  );
};