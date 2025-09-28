import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Eye, Camera, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TBEProgressForm } from "./TBEProgressForm";

interface ProgressPayment {
  id: string;
  property_address: string;
  builder_name: string;
  contract_price: number;
  current_stage: string;
  claimed_percentage: number;
  verified_percentage: number;
  status: string;
  created_at: string;
  inspection_date?: string;
  next_stage?: string;
}

export const TBEProgressPaymentDashboard = () => {
  const [progressPayments, setProgressPayments] = useState<ProgressPayment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProgressPayments();
  }, []);

  const fetchProgressPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('tbe_progress_payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProgressPayments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch progress payments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'requires_review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (showForm) {
    return (
      <TBEProgressForm 
        onClose={() => setShowForm(false)}
        onSuccess={() => {
          setShowForm(false);
          fetchProgressPayments();
        }}
      />
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Construction Progress Payments</h1>
          <p className="text-muted-foreground mt-2">
            TBE/As If Complete Progress Payment Inspections & Fund Release Approvals
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Progress Inspection
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : progressPayments.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Progress Payments Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start your first construction progress payment inspection
            </p>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              Create First Progress Inspection
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {progressPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg line-clamp-2">
                      {payment.property_address}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {payment.builder_name}
                    </p>
                  </div>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Contract Price</p>
                    <p className="font-semibold">{formatCurrency(payment.contract_price)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Stage</p>
                    <p className="font-semibold">{payment.current_stage}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Claimed: {payment.claimed_percentage}%</span>
                    <span>Verified: {payment.verified_percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full relative"
                      style={{ width: `${payment.verified_percentage}%` }}
                    >
                      {payment.claimed_percentage > payment.verified_percentage && (
                        <div 
                          className="absolute top-0 bg-red-400 h-2 rounded-full opacity-50"
                          style={{ 
                            left: `${payment.verified_percentage}%`,
                            width: `${payment.claimed_percentage - payment.verified_percentage}%`
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Camera className="h-4 w-4 mr-1" />
                    Inspect
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Invoice
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  Created: {new Date(payment.created_at).toLocaleDateString()}
                  {payment.inspection_date && (
                    <span className="block">
                      Inspected: {new Date(payment.inspection_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};