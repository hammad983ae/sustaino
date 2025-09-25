import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, Download, Mail, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment-session', {
          body: { session_id: sessionId }
        });

        if (error) {
          throw error;
        }

        setPaymentDetails(data);
        
        // Show success toast
        toast({
          title: "Payment Successful!",
          description: data?.payment_method === 'afterpay' 
            ? "Your Afterpay payment plan has been set up successfully."
            : "Your payment has been processed successfully.",
        });

      } catch (error) {
        console.error('Error fetching payment details:', error);
        toast({
          title: "Payment Verification Error",
          description: "There was an issue verifying your payment. Please contact support if you have concerns.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [sessionId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount / 100); // Stripe amounts are in cents
  };

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'afterpay':
      case 'afterpay_clearpay':
        return (
          <Badge className="bg-black text-white">
            <div className="flex items-center gap-1">
              <span className="font-bold text-xs">afterpay</span>
            </div>
          </Badge>
        );
      case 'card':
        return <Badge variant="secondary">Credit Card</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="space-y-6">
          {/* Success Header */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-green-800">Payment Successful!</h1>
                <p className="text-green-700">
                  Thank you for your payment. Your transaction has been completed successfully.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          {paymentDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Amount Paid</label>
                    <div className="text-xl font-bold">{formatCurrency(paymentDetails.amount_total)}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Payment Method</label>
                    <div className="mt-1">
                      {getPaymentMethodBadge(paymentDetails.payment_method)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Transaction ID</label>
                    <div className="text-sm font-mono bg-muted p-2 rounded">
                      {paymentDetails.payment_intent || sessionId}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Date</label>
                    <div className="text-sm">
                      {new Date().toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                {paymentDetails.description && (
                  <div>
                    <label className="text-sm text-muted-foreground">Description</label>
                    <div className="text-sm">{paymentDetails.description}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Afterpay Specific Information */}
          {paymentDetails?.payment_method === 'afterpay' && (
            <Card className="border-black/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold">
                    afterpay
                  </div>
                  Payment Plan Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Your Payment Schedule</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your first payment has been processed. The remaining 3 payments will be 
                        automatically charged every 2 weeks to your selected payment method.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium">Manage Your Payments:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Download the Afterpay app to track your payments</li>
                    <li>• Set up notifications for upcoming payment dates</li>
                    <li>• Update your payment method if needed</li>
                    <li>• Contact Afterpay support for any payment concerns</li>
                  </ul>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://www.afterpay.com/en-AU/my-account', '_blank')}
                >
                  Manage Afterpay Account
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <Download className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Download Receipt</div>
                    <div className="text-xs text-muted-foreground">Get your payment confirmation</div>
                  </div>
                </Button>

                <Button variant="outline" className="justify-start h-auto p-4">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Email Confirmation</div>
                    <div className="text-xs text-muted-foreground">Sent to your email address</div>
                  </div>
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  Need help? Our support team is here to assist you with any questions about your payment.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Return to Dashboard
                    </Button>
                  </Link>
                  <Button className="flex-1">
                    Continue to Services
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h4 className="font-medium">Need Support?</h4>
                <p className="text-sm text-muted-foreground">
                  Contact our customer service team if you have any questions about your payment.
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span>📧 support@sustainopro.com</span>
                  <span>📞 1800-SUSTAINO</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}