/**
 * ============================================================================
 * Brochure Viewer - PDF Export Ready
 * Professional brochure viewer for both platforms
 * ============================================================================
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Eye, FileText, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuctionSphereBrochure from '@/components/AuctionSphereBrochure';
import SustanoSphereBrochure from '@/components/SustanoSphereBrochure';

const BrochureViewer = () => {
  const navigate = useNavigate();
  const [activeBrochure, setActiveBrochure] = useState<'auction' | 'sustaino' | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleEmailInfo = () => {
    const subject = activeBrochure === 'auction' 
      ? 'Auction-Sphere™ - Revolutionary 3D Real Estate Auction Platform'
      : 'Sustaino-Sphere™ - ESG & Climate Risk Assessment Platform';
    
    const body = activeBrochure === 'auction'
      ? 'Dear Client,\n\nPlease find attached our comprehensive brochure for Auction-Sphere™, the world\'s first international 3D real estate auction platform.\n\nKey Features:\n- 3D WebGL Visualization\n- AI Bidder Qualification\n- International FDI Support\n- Multi-Currency Exchange\n- Real-Time Market Analytics\n\nWe would be delighted to schedule a demonstration at your convenience.\n\nBest regards,\nDeLorenzo Property Group'
      : 'Dear Client,\n\nPlease find attached our comprehensive brochure for Sustaino-Sphere™, our revolutionary ESG & Climate Risk Assessment Platform.\n\nKey Features:\n- Comprehensive ESG Scoring\n- Climate Risk Analysis\n- Market Intelligence\n- Financial Impact Assessment\n- Regulatory Compliance\n\nWe would be pleased to discuss how this can transform your sustainability strategy.\n\nBest regards,\nDeLorenzo Property Group';

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (activeBrochure) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Print Controls - Hidden in print */}
        <div className="print:hidden bg-white shadow-sm border-b p-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button
              onClick={() => setActiveBrochure(null)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Selection
            </Button>
            
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">
                {activeBrochure === 'auction' ? 'Auction-Sphere™' : 'Sustaino-Sphere™'} Brochure
              </span>
              
              <div className="flex gap-2">
                <Button onClick={handleEmailInfo} className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Template
                </Button>
                <Button onClick={handlePrint} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Print/Save PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Brochure Content */}
        <div className="print:p-0">
          {activeBrochure === 'auction' ? <AuctionSphereBrochure /> : <SustanoSphereBrochure />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Professional Marketing Brochures</h1>
            <p className="text-xl text-slate-300">
              Download PDF-ready brochures for email distribution
            </p>
          </div>
        </div>

        {/* Brochure Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Auction-Sphere Brochure */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-slate-700/50 shadow-2xl hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                Auction-Sphere™
              </CardTitle>
              <p className="text-slate-300">
                Revolutionary 3D Real Estate Auction Platform
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">Brochure Contents:</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• 3D WebGL Visualization Technology</li>
                  <li>• AI-Powered Bidder Qualification</li>
                  <li>• International FDI Support</li>
                  <li>• Multi-Currency Exchange</li>
                  <li>• Global Platform Statistics</li>
                  <li>• Contact Information & CTA</li>
                </ul>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setActiveBrochure('auction')}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View & Download
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sustaino-Sphere Brochure */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-slate-700/50 shadow-2xl hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                Sustaino-Sphere™
              </CardTitle>
              <p className="text-slate-300">
                ESG & Climate Risk Assessment Platform
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">Brochure Contents:</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Comprehensive ESG Scoring</li>
                  <li>• Climate Risk Analysis</li>
                  <li>• Market Intelligence & Analytics</li>
                  <li>• Financial Impact Assessment</li>
                  <li>• Regulatory Compliance Features</li>
                  <li>• Contact Information & CTA</li>
                </ul>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setActiveBrochure('sustaino')}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View & Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border-blue-500/20 shadow-2xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">How to Create PDF Brochures:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
              <div className="text-center">
                <div className="text-2xl mb-2">1️⃣</div>
                <h4 className="font-bold mb-2">Select Brochure</h4>
                <p className="text-sm">Choose either Auction-Sphere or Sustaino-Sphere brochure</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">2️⃣</div>
                <h4 className="font-bold mb-2">Print to PDF</h4>
                <p className="text-sm">Click "Print/Save PDF" and select "Save as PDF" in your browser</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">3️⃣</div>
                <h4 className="font-bold mb-2">Email to Clients</h4>
                <p className="text-sm">Use the email template button for professional outreach</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrochureViewer;