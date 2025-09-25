import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Calendar, DollarSign, Info, CheckCircle } from "lucide-react";
import AfterpayCheckout from './AfterpayCheckout';

interface PaymentMethodSelectorProps {
  amount: number;
  description: string;
  metadata?: Record<string, any>;
  onSuccess?: () => void;
  onCancel?: () => void;
  showOnlyAfterway?: boolean;
}

export default function PaymentMethodSelector({
  amount,
  description,
  metadata = {},
  onSuccess,
  onCancel,
  showOnlyAfterway = false
}: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>(showOnlyAfterway ? 'afterpay' : 'card');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Pay instantly with your card',
      features: ['Instant payment', 'Secure processing', 'All major cards accepted'],
      available: !showOnlyAfterway
    },
    {
      id: 'afterpay',
      name: 'Afterpay',
      icon: <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold">afterpay</div>,
      description: 'Buy now, pay later in 4 installments',
      features: ['0% interest', 'Pay over 6 weeks', 'No fees when paid on time'],
      available: true
    }
  ];

  if (showOnlyAfterway) {
    return <AfterpayCheckout 
      amount={amount} 
      description={description} 
      metadata={metadata}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Complete Your Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold">{formatCurrency(amount)}</div>
            <div className="text-muted-foreground">{description}</div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="card" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Card Payment
          </TabsTrigger>
          <TabsTrigger value="afterpay" className="flex items-center gap-2">
            <div className="bg-black text-white px-1.5 py-0.5 rounded text-xs font-bold">
              afterpay
            </div>
            Buy Now, Pay Later
          </TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Credit/Debit Card Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Badge variant="outline" className="justify-center py-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Instant
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Secure
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Protected
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Pay the full amount instantly with your credit or debit card.
                  All transactions are secured with 256-bit SSL encryption.
                </div>
              </div>

              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay {formatCurrency(amount)} Now
              </Button>

              <div className="text-xs text-center text-muted-foreground">
                Accepted cards: Visa, Mastercard, American Express
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="afterpay" className="mt-6">
          <AfterpayCheckout 
            amount={amount} 
            description={description} 
            metadata={metadata}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        </TabsContent>
      </Tabs>

      {/* Payment Method Comparison */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Why choose Afterpay?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium">No Interest or Fees</span>
              </div>
              <div className="text-muted-foreground pl-6">
                When you pay on time, there are no additional costs
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Flexible Payments</span>
              </div>
              <div className="text-muted-foreground pl-6">
                Split your purchase into 4 equal payments over 6 weeks
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Easy Management</span>
              </div>
              <div className="text-muted-foreground pl-6">
                Track and manage payments via the Afterpay app
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Instant Approval</span>
              </div>
              <div className="text-muted-foreground pl-6">
                Get approved instantly with soft credit check
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}