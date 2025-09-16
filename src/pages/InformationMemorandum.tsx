/**
 * ============================================================================
 * INFORMATION MEMORANDUM PAGE - MAXIMUM IP PROTECTION
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Patent Protected Component - Commercial License Required
 * ============================================================================
 */
import React from 'react';
import { InformationMemorandumGenerator } from '@/components/InformationMemorandumGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const InformationMemorandum = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">
                Information Memorandum Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create professional investment property memorandums with white label branding. 
              Generate comprehensive property investment documents that match your brand identity.
            </p>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Professional Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Industry-standard Information Memorandum templates with all essential sections
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mx-auto mb-2" />
              <CardTitle className="text-lg">White Label Branding</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Customize colors, logos, and contact information to match your brand
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="h-8 w-8 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white text-xs font-bold">PDF</span>
              </div>
              <CardTitle className="text-lg">Export Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Generate print-ready PDFs and professional presentation materials
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Generator Component */}
        <InformationMemorandumGenerator />

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Protected Technology</h3>
              <p className="text-blue-100">
                This Information Memorandum Generator is protected by international patents and trademarks. 
                All generated documents include proper IP attribution and licensing information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InformationMemorandum;