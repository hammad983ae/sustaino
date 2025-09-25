import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";

export default function PaymentCancelled() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="space-y-6">
          {/* Cancellation Header */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <XCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h1 className="text-2xl font-bold text-orange-800">Payment Cancelled</h1>
                <p className="text-orange-700">
                  Your payment was cancelled. No charges have been made to your account.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What Happened */}
          <Card>
            <CardHeader>
              <CardTitle>What Happened?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your payment process was interrupted or cancelled. This can happen for several reasons:
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  You clicked the back button or closed the payment window
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  There was a network connection issue
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  Your payment method was declined
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  You decided not to complete the purchase
                </li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800">Don't worry!</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      No payment has been processed. You can try again at any time, 
                      or contact our support team if you need assistance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Options */}
          <Card>
            <CardHeader>
              <CardTitle>What Would You Like To Do?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="justify-start h-auto p-4" onClick={() => window.history.back()}>
                  <RefreshCw className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Try Payment Again</div>
                    <div className="text-xs text-muted-foreground">Return to payment options</div>
                  </div>
                </Button>

                <Link to="/" className="block">
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <ArrowLeft className="h-4 w-4 mr-3 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium">Return to Dashboard</div>
                      <div className="text-xs text-muted-foreground">Go back to main page</div>
                    </div>
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t space-y-3">
                <h4 className="font-medium">Need a Different Payment Method?</h4>
                <p className="text-sm text-muted-foreground">
                  If you're having trouble with Afterpay, you can try:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                  <li>• Using a different payment method (credit/debit card)</li>
                  <li>• Checking your Afterpay account status</li>
                  <li>• Contacting Afterpay customer service</li>
                  <li>• Reaching out to our support team for alternative options</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Support Information */}
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h4 className="font-medium">Still Need Help?</h4>
                <p className="text-sm text-muted-foreground">
                  Our customer support team is available to help you complete your payment 
                  or answer any questions you might have.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm">
                    Payment Help
                  </Button>
                </div>

                <div className="flex justify-center gap-6 text-sm text-muted-foreground pt-2">
                  <span>📧 support@sustainopro.com</span>
                  <span>📞 1800-SUSTAINO</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Afterpay Specific Help */}
          <Card className="border-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold">
                  afterpay
                </div>
                Afterpay Payment Issues?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                If you're having trouble with Afterpay specifically, here are some common solutions:
              </p>
              
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Check your Afterpay limits:</strong> You may have reached your spending limit
                </div>
                <div>
                  <strong>Verify your details:</strong> Ensure your personal information is up to date
                </div>
                <div>
                  <strong>Outstanding payments:</strong> Make sure you don't have any overdue Afterpay payments
                </div>
                <div>
                  <strong>Account verification:</strong> Your Afterpay account may need additional verification
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => window.open('https://help.afterpay.com/hc/en-au', '_blank')}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Visit Afterpay Help Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}