import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, TrendingUp, Shield, Lightbulb, Globe } from 'lucide-react';
import jsPDF from 'jspdf';
import logoImage from '@/assets/sustano-pro-logo-header.jpg';

const SustanoProInvestorBrochure = () => {
  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Page 1 - Cover
    pdf.setFillColor(45, 55, 72);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Header with logo space
    pdf.setFillColor(255, 255, 255);
    pdf.rect(20, 20, pageWidth - 40, 40, 'F');
    
    pdf.setTextColor(45, 55, 72);
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text('SUSTANO PRO', 30, 45);
    
    // Main title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(32);
    pdf.text('SUSTANO-PHERE™', pageWidth / 2, 120, { align: 'center' });
    
    pdf.setFontSize(20);
    pdf.text('COMPREHENSIVE INVESTOR ANALYSIS', pageWidth / 2, 140, { align: 'center' });
    
    // Key metrics boxes
    pdf.setFillColor(59, 130, 246);
    pdf.rect(30, 160, 50, 30, 'F');
    pdf.setFontSize(16);
    pdf.text('Platform Valuation', 32, 175);
    pdf.setFontSize(14);
    pdf.text('$15M', 32, 185);
    
    pdf.setFillColor(16, 185, 129);
    pdf.rect(90, 160, 50, 30, 'F');
    pdf.setFontSize(16);
    pdf.text('Market TAM', 92, 175);
    pdf.setFontSize(14);
    pdf.text('$2.8T', 92, 185);
    
    pdf.setFillColor(139, 92, 246);
    pdf.rect(150, 160, 50, 30, 'F');
    pdf.setFontSize(16);
    pdf.text('IP Portfolio', 152, 175);
    pdf.setFontSize(14);
    pdf.text('$8M Value', 152, 185);
    
    // Page 2 - Executive Summary
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    pdf.setTextColor(45, 55, 72);
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text('EXECUTIVE SUMMARY', 20, 30);
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    
    let yPos = 50;
    const lineHeight = 8;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Platform Valuation:', 20, yPos);
    pdf.setFont(undefined, 'normal');
    pdf.text('$15M (conservative early-stage valuation)', 70, yPos);
    yPos += lineHeight;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Market Opportunity:', 20, yPos);
    pdf.setFont(undefined, 'normal');
    pdf.text('$2.8T Total Addressable Market', 70, yPos);
    yPos += lineHeight;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Revenue Growth:', 20, yPos);
    pdf.setFont(undefined, 'normal');
    pdf.text('450% projected (3-year)', 70, yPos);
    yPos += lineHeight;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Patents Filed:', 20, yPos);
    pdf.setFont(undefined, 'normal');
    pdf.text('15+ applications', 70, yPos);
    yPos += lineHeight;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('IP Portfolio Value:', 20, yPos);
    pdf.setFont(undefined, 'normal');
    pdf.text('$8M (protected algorithms & methodologies)', 70, yPos);
    yPos += 20;
    
    // Platform Ecosystem
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text('PLATFORM ECOSYSTEM OVERVIEW', 20, yPos);
    yPos += 15;
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('Core Platforms:', 20, yPos);
    yPos += 10;
    
    pdf.setFont(undefined, 'normal');
    pdf.text('• SustanoSphere™: AI-driven property valuation ($3M+ value)', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Reality Auction Platform™: Live 3D bidding system', 25, yPos);
    yPos += lineHeight;
    pdf.text('• ESG Assessment Suite: Environmental impact analysis', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Blockchain Integration: Immutable transaction records', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Financial Reporting Hub: Automated compliance reporting', 25, yPos);
    yPos += 15;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Revenue Streams:', 20, yPos);
    yPos += 10;
    
    pdf.setFont(undefined, 'normal');
    pdf.text('• SaaS Subscriptions: $800K projected (Year 3)', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Transaction Fees: 2.5% per auction', 25, yPos);
    yPos += lineHeight;
    pdf.text('• API Licensing: $400K projected (Year 5)', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Data Analytics: $600K projected (Year 4)', 25, yPos);
    
    // Page 3 - Market Analysis
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    pdf.setTextColor(45, 55, 72);
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text('MARKET ANALYSIS (PESTEL)', 20, 30);
    
    yPos = 50;
    pdf.setFontSize(12);
    
    const pestelFactors = [
      ['Political:', 'Regulatory support for PropTech innovation'],
      ['Economic:', '$2.8T property market, 15% digital adoption gap'],
      ['Social:', 'ESG demand driving 40% premium valuations'],
      ['Technological:', 'AI/ML advancement creating competitive moats'],
      ['Environmental:', 'Carbon neutrality mandates by 2030'],
      ['Legal:', 'IP protection securing market position']
    ];
    
    pestelFactors.forEach(([factor, description]) => {
      pdf.setFont(undefined, 'bold');
      pdf.text(factor, 20, yPos);
      pdf.setFont(undefined, 'normal');
      pdf.text(description, 50, yPos);
      yPos += lineHeight;
    });
    
    yPos += 20;
    
    // Competitive Analysis
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text('COMPETITIVE ANALYSIS', 20, yPos);
    yPos += 15;
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('Competitor', 20, yPos);
    pdf.text('Market Cap', 70, yPos);
    pdf.text('Key Weakness', 120, yPos);
    pdf.text('Our Advantage', 160, yPos);
    yPos += 10;
    
    pdf.setFont(undefined, 'normal');
    const competitors = [
      ['CoreLogic', '$4.2B', 'Legacy systems', 'AI-native platform'],
      ['Zillow', '$8.1B', 'Limited commercial', 'Full asset spectrum'],
      ['PropTech Startups', '$500M avg', 'Single-point solutions', 'Integrated ecosystem']
    ];
    
    competitors.forEach(([name, cap, weakness, advantage]) => {
      pdf.text(name, 20, yPos);
      pdf.text(cap, 70, yPos);
      pdf.text(weakness, 120, yPos);
      pdf.text(advantage, 160, yPos);
      yPos += lineHeight;
    });
    
    // Page 4 - Financial Projections
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    pdf.setTextColor(45, 55, 72);
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text('FINANCIAL PROJECTIONS', 20, 30);
    
    yPos = 50;
    pdf.setFontSize(12);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Revenue Projections (Conservative):', 20, yPos);
    yPos += 15;
    
    pdf.setFont(undefined, 'normal');
    pdf.text('Year 1: $150K revenue', 25, yPos);
    yPos += lineHeight;
    pdf.text('Year 2: $400K revenue', 25, yPos);
    yPos += lineHeight;
    pdf.text('Year 3: $800K revenue (break-even)', 25, yPos);
    yPos += lineHeight;
    pdf.text('Year 4: $1.5M revenue', 25, yPos);
    yPos += lineHeight;
    pdf.text('Year 5: $2.2M revenue', 25, yPos);
    yPos += 20;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('ROI Metrics:', 20, yPos);
    yPos += 15;
    
    pdf.setFont(undefined, 'normal');
    pdf.text('• 3-Year IRR: 85%', 25, yPos);
    yPos += lineHeight;
    pdf.text('• 5-Year IRR: 65%', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Expected Multiple: 8-12x', 25, yPos);
    yPos += 20;
    
    // Investment Opportunity
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text('INVESTMENT OPPORTUNITY', 20, yPos);
    yPos += 15;
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.text('Series A: $1.5M (Q2 2025)', 25, yPos);
    yPos += lineHeight;
    pdf.text('Series B: $3M (Q4 2026)', 25, yPos);
    yPos += lineHeight;
    pdf.text('IPO/Exit: $5M+ (2027-2028)', 25, yPos);
    yPos += 20;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Use of Funds:', 20, yPos);
    yPos += 15;
    
    pdf.setFont(undefined, 'normal');
    pdf.text('• 40% Technology development', 25, yPos);
    yPos += lineHeight;
    pdf.text('• 30% Market expansion', 25, yPos);
    yPos += lineHeight;
    pdf.text('• 20% Team scaling', 25, yPos);
    yPos += lineHeight;
    pdf.text('• 10% Working capital', 25, yPos);
    
    // Page 5 - Innovation & IP
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    pdf.setTextColor(45, 55, 72);
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text('INNOVATION & IP PROTECTION', 20, 30);
    
    yPos = 50;
    pdf.setFontSize(12);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Patent Portfolio:', 20, yPos);
    yPos += 15;
    
    pdf.setFont(undefined, 'normal');
    pdf.text('• AI-powered auction algorithms', 25, yPos);
    yPos += lineHeight;
    pdf.text('• 3D property visualization methods', 25, yPos);
    yPos += lineHeight;
    pdf.text('• ESG integration frameworks', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Blockchain transaction processing', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Automated valuation methodologies', 25, yPos);
    yPos += 20;
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Competitive Advantages:', 20, yPos);
    yPos += 15;
    
    pdf.setFont(undefined, 'normal');
    pdf.text('• First-mover advantage in 3D auction space', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Patent-protected core algorithms', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Integrated ecosystem vs. point solutions', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Scalable SaaS architecture', 25, yPos);
    yPos += lineHeight;
    pdf.text('• Strong regulatory compliance framework', 25, yPos);
    
    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Ready for immediate investment discussions', pageWidth / 2, pageHeight - 20, { align: 'center' });
    pdf.text('Contact: john@delorenzopropertygroup.com', pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Save the PDF
    pdf.save('SustanoPro-Investor-Analysis.pdf');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img 
              src={logoImage} 
              alt="Sustano Pro Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SUSTANO-PHERE™
              </h1>
              <p className="text-lg text-muted-foreground">Comprehensive Investor Analysis</p>
            </div>
          </div>
          <Button onClick={generatePDF} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Executive Summary */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">$15M</div>
              <div className="text-sm text-blue-600">Platform Valuation</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">$2.8T</div>
              <div className="text-sm text-green-600">Market TAM</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">450%</div>
              <div className="text-sm text-purple-600">3-Year Growth</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">15+</div>
              <div className="text-sm text-orange-600">Patents Filed</div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Highlights */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Investment Opportunity</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-blue-100 text-blue-700">Series A</Badge>
                  <div className="text-xl font-bold">$1.5M</div>
                  <div className="text-sm text-muted-foreground">Q2 2025</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-green-100 text-green-700">Series B</Badge>
                  <div className="text-xl font-bold">$3M</div>
                  <div className="text-sm text-muted-foreground">Q4 2026</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-purple-100 text-purple-700">Exit</Badge>
                  <div className="text-xl font-bold">$5M+</div>
                  <div className="text-sm text-muted-foreground">2027-2028</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Revenue Projections</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Year 1:</span>
                <span className="font-semibold">$150K revenue</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Year 2:</span>
                <span className="font-semibold">$400K revenue</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span>Year 3:</span>
                <span className="font-semibold text-green-700">$800K revenue (break-even)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span>Year 4:</span>
                <span className="font-semibold text-blue-700">$1.5M revenue</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span>Year 5:</span>
                <span className="font-semibold text-purple-700">$2.2M revenue</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Use of Funds</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">40%</div>
                <div className="text-sm">Technology</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">30%</div>
                <div className="text-sm">Market Expansion</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">20%</div>
                <div className="text-sm">Team Scaling</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">10%</div>
                <div className="text-sm">Working Capital</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <h3 className="text-xl font-semibold mb-2">Ready for Investment Discussions</h3>
          <p className="text-muted-foreground">Contact: john@delorenzopropertygroup.com</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SustanoProInvestorBrochure;