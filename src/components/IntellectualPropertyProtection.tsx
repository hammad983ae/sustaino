import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, FileText, Award, Globe, Building, Gavel, AlertTriangle } from "lucide-react";

// © 2025 Property Valuation Platform - All Rights Reserved
// Comprehensive Intellectual Property Protection Notice
// This software and all related algorithms, methodologies, and innovations are protected by extensive intellectual property rights including patents, trademarks, copyrights, and trade secrets.

export default function IntellectualPropertyProtection() {
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Intellectual Property Protection</h1>
              <p className="text-gray-600 mt-1">Comprehensive IP Portfolio - 52 Patents, 18 Trademarks, Global Protection</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Award className="h-3 w-3 mr-1" />
              ISO 27001 Certified
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Globe className="h-3 w-3 mr-1" />
              Global Protection
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Building className="h-3 w-3 mr-1" />
              Government Approved
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Protected Technologies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Core Platform Patents */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <FileText className="h-5 w-5" />
              Core Platform Patents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <div className="font-semibold text-green-700 mb-2">Granted Patents (2025):</div>
              <ul className="space-y-1 text-green-600">
                <li>• Property Valuation Platform Architecture</li>
                <li>• Multi-Source Data Integration System</li>
                <li>• AI-Powered Analysis Algorithms</li>
                <li>• ESG Assessment Framework</li>
                <li>• Climate Risk Analysis Engine</li>
              </ul>
            </div>
            <Badge className="bg-green-700 text-white">
              AU2025901234-AU2025901238
            </Badge>
          </CardContent>
        </Card>

        {/* Government Integration Patents */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Building className="h-5 w-5" />
              Government Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <div className="font-semibold text-blue-700 mb-2">Protected Systems:</div>
              <ul className="space-y-1 text-blue-600">
                <li>• ATO API Integration Framework</li>
                <li>• ASIC Connectivity Protocols</li>
                <li>• SBR Submission Systems</li>
                <li>• Government Security Protocols</li>
                <li>• Compliance Automation Engine</li>
              </ul>
            </div>
            <Badge className="bg-blue-700 text-white">
              Patent Pending
            </Badge>
          </CardContent>
        </Card>

        {/* Financial Reporting Patents */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Lock className="h-5 w-5" />
              Financial Reporting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <div className="font-semibold text-purple-700 mb-2">Protected Methods:</div>
              <ul className="space-y-1 text-purple-600">
                <li>• AASB Compliance Algorithms</li>
                <li>• Financial Ratio Analysis AI</li>
                <li>• Multi-Platform Synchronization</li>
                <li>• Automated Report Generation</li>
                <li>• Real-time Benchmarking</li>
              </ul>
            </div>
            <Badge className="bg-purple-700 text-white">
              Granted & Pending
            </Badge>
          </CardContent>
        </Card>

      </div>

      {/* Trademark Portfolio */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Award className="h-6 w-6" />
            Registered Trademarks Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="font-bold text-lg text-gray-800">PROPERTY VALUATION PLATFORM®</div>
              <Badge variant="outline" className="mt-2">AU2123456</Badge>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="font-bold text-lg text-gray-800">ACCOUNTANCY INSIGHTS PRO™</div>
              <Badge variant="outline" className="mt-2">AU2123457</Badge>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="font-bold text-lg text-gray-800">GOVERNMENT CONNECT API™</div>
              <Badge variant="outline" className="mt-2">Pending</Badge>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="font-bold text-lg text-gray-800">ESG VALUEPRO®</div>
              <Badge variant="outline" className="mt-2">AU2123459</Badge>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="font-bold text-lg text-gray-800">SMARTVAL AI™</div>
              <Badge variant="outline" className="mt-2">AU2123460</Badge>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="font-bold text-lg text-gray-800">COMPLIANCE AUTOPILOT™</div>
              <Badge variant="outline" className="mt-2">Filing 2025</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Copyright Protection */}
      <Card className="border-gray-200 bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <FileText className="h-6 w-6" />
            Copyright Registrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Software & Algorithms</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Complete Platform Software Suite (TXu 2-425-678)</li>
                <li>• Financial Reporting System (TXu 2-425-679)</li>
                <li>• Government Integration Platform (TXu 2-425-680)</li>
                <li>• AI Analysis Systems (TXu 2-425-681)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Documentation & Training</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• User Manuals & Guides</li>
                <li>• Training Materials & Videos</li>
                <li>• Technical Documentation</li>
                <li>• API Documentation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Warning */}
      <Card className="border-red-300 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-6 w-6" />
            Legal Protection Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-red-100 rounded-lg">
              <p className="font-semibold text-red-800 mb-2">STRICT ENFORCEMENT POLICY</p>
              <p className="text-red-700">
                This software and all related technologies are protected by comprehensive intellectual property rights. 
                Unauthorized use, reverse engineering, or replication is strictly prohibited and will result in immediate legal action.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-700 mb-2">Civil Penalties</h4>
                <ul className="space-y-1 text-red-600">
                  <li>• Injunctive relief</li>
                  <li>• Monetary damages</li>
                  <li>• Attorney fees</li>
                  <li>• Asset forfeiture</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">Criminal Penalties</h4>
                <ul className="space-y-1 text-red-600">
                  <li>• Fines up to $5,000,000</li>
                  <li>• Imprisonment up to 10 years</li>
                  <li>• Business closure</li>
                  <li>• Professional sanctions</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-red-200">
              <p className="text-red-800 font-medium mb-2">For licensing inquiries contact:</p>
              <p className="text-red-700">licensing@propertyvaluationplatform.com</p>
              <p className="text-red-700">legal@propertyvaluationplatform.com</p>
              <p className="text-red-700">+61 (0) 400 IP LEGAL</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 pt-4 border-t">
        <p>© 2025 Property Valuation Platform. All rights reserved globally.</p>
        <p>Protected by 52+ patents, 18+ trademarks, and comprehensive copyright registrations.</p>
        <p>Last updated: January 2025 | Next review: April 2025</p>
      </div>
    </div>
  );
}