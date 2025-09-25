import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, CreditCard, Calendar, DollarSign, Info } from "lucide-react";

interface AfterpayCheckoutProps {
  amount: number;
  description: string;
  metadata?: Record<string, any>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AfterpayCheckout({ 
  amount, 
  description, 
  metadata = {}, 
  onSuccess, 
  onCancel 
}: AfterpayCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Calculate Afterpay installments (4 equal payments)
  const installmentAmount = amount / 4;
  const todayPayment = installmentAmount;
  const futurePayments = [
    { date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), amount: installmentAmount },
    { date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), amount: installmentAmount },
    { date: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000), amount: installmentAmount }
  ];

  const handleAfterpayPayment = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-afterpay-payment', {
        body: {
          amount: Math.round(amount * 100), // Convert to cents
          currency: 'aud',
          description,
          metadata,
          return_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-cancelled`
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open Stripe Checkout in a new tab
        window.open(data.url, '_blank');
        
        toast({
          title: "Redirecting to Afterpay",
          description: "Complete your payment in the new tab that just opened.",
        });
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Afterpay payment error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to initialize Afterpay payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="bg-black text-white px-3 py-1 rounded text-sm font-bold">
            afterpay
          </div>
          <span className="text-lg">Payment Options</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Amount:</span>
            <span className="text-2xl font-bold">{formatCurrency(amount)}</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {description}
          </div>
        </div>

        <Separator />

        {/* Afterpay Benefits */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Pay in 4 interest-free installments
          </h4>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Badge variant="outline" className="justify-center py-2">
              <DollarSign className="h-3 w-3 mr-1" />
              No Interest
            </Badge>
            <Badge variant="outline" className="justify-center py-2">
              <Calendar className="h-3 w-3 mr-1" />
              6 Weeks
            </Badge>
          </div>
        </div>

        {/* Payment Schedule */}
        <div className="space-y-3">
          <h4 className="font-semibold">Payment Schedule:</h4>
          
          <div className="space-y-2">
            {/* Today's payment */}
            <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border">
              <div>
                <div className="font-medium">Today</div>
                <div className="text-xs text-muted-foreground">Payment 1 of 4</div>
              </div>
              <div className="font-bold">{formatCurrency(todayPayment)}</div>
            </div>

            {/* Future payments */}
            {futurePayments.map((payment, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <div className="text-sm">{formatDate(payment.date)}</div>
                  <div className="text-xs text-muted-foreground">
                    Payment {index + 2} of 4
                  </div>
                </div>
                <div className="font-medium">{formatCurrency(payment.amount)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Notice */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>How it works:</strong> Pay your first installment today, then 3 more 
            payments every 2 weeks. No interest, no fees when you pay on time.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleAfterpayPayment}
            disabled={isLoading}
            className="w-full bg-black hover:bg-gray-800 text-white"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up payment...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Afterpay
              </>
            )}
          </Button>

          {onCancel && (
            <Button 
              onClick={onCancel}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Terms */}
        <div className="text-xs text-muted-foreground text-center">
          By proceeding, you agree to Afterpay's{' '}
          <a 
            href="https://www.afterpay.com/en-AU/terms-of-service" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            Terms of Service
          </a>
          {' '}and{' '}
          <a 
            href="https://www.afterpay.com/en-AU/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            Privacy Policy
          </a>
        </div>
      </CardContent>
    </Card>
  );
}