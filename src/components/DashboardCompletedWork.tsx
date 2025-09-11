import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Archive, CheckCircle, FileText, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { useBranding } from "@/contexts/BrandingContext";

interface CompletedWork {
  id: string;
  type: 'valuation' | 'report' | 'esg_assessment';
  title: string;
  created_at: string;
  isArchived: boolean;
}

export default function DashboardCompletedWork() {
  const [completedWork, setCompletedWork] = useState<CompletedWork[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { branding } = useBranding();

  useEffect(() => {
    fetchCompletedWork();
  }, []);

  const fetchCompletedWork = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch all completed work from different tables
      const [valuationsResponse, reportsResponse, esgResponse] = await Promise.all([
        supabase
          .from('valuations')
          .select(`
            id, 
            created_at,
            properties!inner(address_line_1, suburb, state, postcode)
          `)
          .eq('user_id', user.id)
          .eq('status', 'completed'),
        
        supabase
          .from('reports')
          .select('id, title, created_at')
          .eq('user_id', user.id)
          .eq('status', 'completed'),
        
        supabase
          .from('esg_assessments')
          .select('id, property_id, created_at')
          .eq('user_id', user.id)
      ]);

      const completed: CompletedWork[] = [
        ...(valuationsResponse.data || []).map(item => ({
          id: item.id,
          type: 'valuation' as const,
          title: item.properties ? `${item.properties.address_line_1}, ${item.properties.suburb} ${item.properties.state}` : 'Unknown Property',
          created_at: item.created_at,
          isArchived: false
        })),
        ...(reportsResponse.data || []).map(item => ({
          id: item.id,
          type: 'report' as const,
          title: item.title,
          created_at: item.created_at,
          isArchived: false
        })),
        ...(esgResponse.data || []).map(item => ({
          id: item.id,
          type: 'esg_assessment' as const,
          title: `ESG Assessment - ${item.property_id}`,
          created_at: item.created_at,
          isArchived: false
        }))
      ];

      setCompletedWork(completed.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    } catch (error) {
      console.error('Error fetching completed work:', error);
    } finally {
      setLoading(false);
    }
  };

  const archiveWork = async (workId: string, type: string) => {
    try {
      // In a real implementation, you'd add an 'archived' column to your tables
      // For now, we'll just remove it from the local state to simulate archiving
      setCompletedWork(prev => prev.filter(item => item.id !== workId));
      
      toast({
        title: "Work archived",
        description: "The completed work has been moved to Work Hub archives",
      });
    } catch (error) {
      console.error('Error archiving work:', error);
      toast({
        title: "Error",
        description: "Failed to archive work",
        variant: "destructive"
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'valuation': return <TrendingUp className="h-4 w-4" />;
      case 'report': return <FileText className="h-4 w-4" />;
      case 'esg_assessment': return <TrendingUp className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'valuation': return 'Property Valuation';
      case 'report': return 'Analysis Report';
      case 'esg_assessment': return 'ESG Assessment';
      default: return 'Analysis';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-pulse">Loading completed work...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (completedWork.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Completed Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No completed work to archive yet.</p>
            <p className="text-sm">Complete some analyses to see them here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Completed Work ({completedWork.length})
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Archive completed work to keep your dashboard clean
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {completedWork.slice(0, 5).map((work) => (
            <div key={work.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getTypeIcon(work.type)}
                <div>
                  <p className="font-medium text-sm">{work.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {getTypeLabel(work.type)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(work.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => archiveWork(work.id, work.type)}
                className="flex items-center gap-1"
              >
                <Archive className="h-3 w-3" />
                Archive
              </Button>
            </div>
          ))}
          
          {completedWork.length > 5 && (
            <div className="text-center pt-4">
              <Button variant="outline" size="sm">
                View All ({completedWork.length - 5} more)
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}