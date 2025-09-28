import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, FileText, TrendingUp, DollarSign, Clock } from "lucide-react";

const FinancialProfessionalsAnalysis = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Sustaino Pro Integration Platform vs CoreLogic/RP Data
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          Financial Professionals Analysis
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-2">Executive Summary for Financial Industry</h2>
          <p className="text-blue-800 dark:text-blue-300">
            Sustaino Pro's integration platform delivers transformational value for mortgage brokers, lenders, lawyers, and real estate agents by eliminating CoreLogic's bottlenecks and high costs that impact your clients' experiences and your operational efficiency.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Why Financial Professionals Should Switch from CoreLogic
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Mortgage Brokers */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400 mb-3">For Mortgage Brokers:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">CoreLogic Pain Points:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Clients pay $300-600 residential, $800-2000+ commercial valuations through CoreLogic network</li>
                    <li>• 2-3 day delays killing deal momentum and client satisfaction</li>
                    <li>• Manual data entry across multiple systems slowing applications</li>
                    <li>• Limited lender integration requiring duplicate work</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Sustaino Pro Solution:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Client Cost Savings: Residential $200-800, Commercial $400-800, Agricultural $200-400, Development $500-1200</li>
                    <li>• Instant Pre-approvals: 15 minutes vs 2-3 days with CoreLogic delays</li>
                    <li>• Automated Lender Matching: Direct API to 50+ lenders vs manual CoreLogic processes</li>
                    <li>• Client Retention: Real-time updates keep deals moving vs CoreLogic delays causing client loss</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Lenders */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-3">For Lenders:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">CoreLogic Challenges:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Slow batch processing delays loan approvals affecting customer satisfaction</li>
                    <li>• High valuation costs burden borrowers (your clients)</li>
                    <li>• Limited integration requiring manual verification processes</li>
                    <li>• Outdated risk assessment models</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Sustaino Pro Advantages:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Real-time Risk Assessment: Instant ATO, credit bureau, ASIC verification</li>
                    <li>• 95% Faster Processing: Automated compliance checks vs CoreLogic manual reviews</li>
                    <li>• Lower Client Costs: 50-60% valuation savings for your borrowers</li>
                    <li>• Competitive Edge: Offer same-day approvals while competitors wait for CoreLogic</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Legal Professionals */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-400 mb-3">For Legal Professionals:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">CoreLogic Limitations:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• No PEXA integration requiring separate systems</li>
                    <li>• Limited settlement automation capabilities</li>
                    <li>• High research costs for title verification passed to clients</li>
                    <li>• Manual document preparation increasing billable hours</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Sustaino Pro Legal Tech Integration:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• PEXA Direct Connect: Seamless settlement processing</li>
                    <li>• 80% Time Reduction: Automated title searches and verification</li>
                    <li>• Contract Automation: AI-powered document generation</li>
                    <li>• Client Value: Fixed-fee settlements with predictable costs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Real Estate Agents */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-400 mb-3">For Real Estate Agents:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">CoreLogic Agent Challenges:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Vendors pay expensive CoreLogic valuations ($300-600 residential) for listing advice</li>
                    <li>• Slow reports delaying marketing campaigns and client decisions</li>
                    <li>• Limited comparative market analysis tools</li>
                    <li>• No client-facing technology for instant insights</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Sustaino Pro Agent Benefits:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Instant Valuations: Immediate CMA reports for vendor meetings</li>
                    <li>• Client Portal Access: Branded valuation reports for prospects</li>
                    <li>• Vendor Savings: Residential $200-800 vs CoreLogic $300-600</li>
                    <li>• Competitive Advantage: Instant market insights vs delayed CoreLogic reports</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Valuation Cost Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              Valuation Cost Comparison by Property Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Residential Valuations:</h4>
                  <p className="text-sm mb-2"><span className="text-red-600">CoreLogic Network:</span> $300-600 per valuation</p>
                  <p className="text-sm mb-2"><span className="text-green-600">Sustaino Pro:</span> $200-800 per valuation</p>
                  <Badge variant="outline" className="text-green-700 bg-green-50">Competitive pricing</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Commercial Valuations:</h4>
                  <p className="text-sm mb-2"><span className="text-red-600">CoreLogic Network:</span> $800-2000+ per valuation</p>
                  <p className="text-sm mb-2"><span className="text-green-600">Sustaino Pro:</span> $400-800 per valuation</p>
                  <Badge variant="outline" className="text-green-700 bg-green-50">Client Savings: $400-1200 per transaction</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Agricultural Valuations:</h4>
                  <p className="text-sm mb-2"><span className="text-red-600">CoreLogic Network:</span> $500-1200 per valuation</p>
                  <p className="text-sm mb-2"><span className="text-green-600">Sustaino Pro:</span> $200-400 per valuation</p>
                  <Badge variant="outline" className="text-green-700 bg-green-50">Client Savings: $300-800 per transaction</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Development/Land Valuations:</h4>
                  <p className="text-sm mb-2"><span className="text-red-600">CoreLogic Network:</span> $1000-2500+ per valuation</p>
                  <p className="text-sm mb-2"><span className="text-green-600">Sustaino Pro:</span> $500-1200 per valuation</p>
                  <Badge variant="outline" className="text-green-700 bg-green-50">Client Savings: $500-1300 per transaction</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Impact Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Financial Impact Analysis by Professional Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Mortgage Brokers:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Client Satisfaction: Competitive valuation costs</li>
                    <li>• Deal Velocity: Process 3x more applications with instant turnaround</li>
                    <li>• Competitive Edge: Offer comprehensive solutions vs CoreLogic-dependent competitors</li>
                    <li>• Referral Growth: Happy clients refer more business</li>
                  </ul>
                </div>
                
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-400 mb-2">Legal Firms:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Settlement Efficiency: 80% reduction in preparation time increases capacity</li>
                    <li>• Client Value: Predictable settlement costs</li>
                    <li>• Error Reduction: Automated compliance vs manual CoreLogic research</li>
                    <li>• Service Quality: Faster settlements improve client satisfaction</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">Lenders:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Customer Acquisition: Competitive valuation costs attract borrowers</li>
                    <li>• Market Share Growth: Same-day approvals capture time-sensitive deals</li>
                    <li>• Risk Mitigation: Real-time compliance checks</li>
                    <li>• Brand Differentiation: Technology leadership vs traditional CoreLogic users</li>
                  </ul>
                </div>
                
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-400 mb-2">Real Estate Agencies:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Vendor Value: Competitive listing costs</li>
                    <li>• Marketing Speed: Instant valuations accelerate listing campaigns</li>
                    <li>• Client Acquisition: Technology differentiation</li>
                    <li>• Market Intelligence: Real-time data insights</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Call to Action for Financial Professionals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <strong className="text-blue-600">Mortgage Brokers:</strong> Offer your clients competitive valuation costs
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <strong className="text-green-600">Lenders:</strong> Attract borrowers with same-day approvals
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <strong className="text-purple-600">Lawyers:</strong> Automate settlements and provide client value
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <strong className="text-orange-600">Agents:</strong> Provide instant valuations and win listings
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Bottom Line</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Sustaino Pro delivers competitive pricing while providing 3-5x efficiency improvements compared to CoreLogic's basic, expensive legacy platform.
              </p>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-2">
                Switch today and give your clients the comprehensive value they deserve.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialProfessionalsAnalysis;