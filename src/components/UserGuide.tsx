import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  MapPin, 
  Camera, 
  Settings, 
  CheckCircle, 
  ArrowRight, 
  Download,
  Clock,
  AlertCircle,
  Info,
  BookOpen
} from "lucide-react";

export const UserGuide = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const handleDownloadGuide = () => {
    const guideContent = `
PROPERTY ASSESSMENT PLATFORM - USER GUIDE
==========================================

QUICK START GUIDE
-----------------
1. Complete the Property Assessment Form (PAF) in 5 steps
2. Review and generate your comprehensive report
3. Navigate to Executive Summary to view results
4. Access detailed sections as needed

PROPERTY ASSESSMENT FORM (PAF) WORKFLOW
---------------------------------------

Step 1: Property Address
- Enter complete property address
- System auto-populates available data
- Confirm address accuracy before proceeding

Step 2: Planning Data Integration
- Select your state for planning portal integration
- VicPlan integration available for Victoria properties
- Download planning reports and certificates
- Access state-specific mapping tools

Step 3: Property Photos & Documents
- Upload property photos for OCR analysis
- Upload documents to secure cloud storage
- Photos automatically analyzed for property features
- Documents stored with encryption

Step 4: Report Configuration ⭐ CRITICAL STEP
- Select Property Type (transfers to all report sections)
- Choose Value Component ("As Is", "Upon Completion", etc.)
- Select Valuation Basis (Market Value, Existing Use, etc.)
- Choose Interest Values (Fee Simple, Leasehold, etc.)
- Pick Valuation Approaches (Sales Comparison, Income, Cost)
- These selections pre-populate throughout the entire report

Step 5: Professional Declarations
- Complete required professional declarations
- Review all information before submission
- Submit to generate comprehensive report

DATA FLOW & PRE-POPULATION
--------------------------
Your Step 4 selections automatically populate:
✓ Valuation Certificate - Value Component
✓ Valuation Analysis - Only selected approaches active
✓ Property Details - Property type configuration
✓ Legal & Planning - Relevant planning data
✓ All report sections - Consistent data throughout

REPORT NAVIGATION
-----------------
After completing PAF:
→ Executive Summary/Table of Contents
→ Navigate to any report section
→ Data automatically saved and synchronized
→ Photos display in relevant sections

BEST PRACTICES
--------------
• Complete all PAF steps thoroughly
• Upload clear, well-lit property photos
• Verify address accuracy in Step 1
• Choose appropriate valuation approaches in Step 4
• Review all selections before generating report

TROUBLESHOOTING
---------------
• Photos not uploading: Check file size and format
• Data not saving: Ensure stable internet connection
• Missing sections: Complete all PAF steps
• Report errors: Verify Step 4 configurations

SUPPORT
-------
For technical support or questions about the platform,
contact your system administrator or refer to the
help documentation within the application.

Generated: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([guideContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Property-Assessment-Platform-User-Guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl text-primary">User Guide & Instructions</CardTitle>
            </div>
            <Button onClick={handleDownloadGuide} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Guide
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflow">PAF Workflow</TabsTrigger>
          <TabsTrigger value="features">Key Features</TabsTrigger>
          <TabsTrigger value="tips">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Platform Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The Property Assessment Platform streamlines the property valuation process through an intelligent 
                5-step Property Assessment Form (PAF) that automatically populates comprehensive reports.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">What You'll Achieve</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Complete property assessments in minutes</li>
                    <li>• Automated data population across reports</li>
                    <li>• Professional-grade valuation certificates</li>
                    <li>• Integrated planning and compliance data</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Workflow</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Start with Property Assessment Form</li>
                    <li>• Configure report parameters in Step 4</li>
                    <li>• Generate comprehensive reports</li>
                    <li>• Navigate to Executive Summary</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                step: 1,
                icon: MapPin,
                title: "Property Address",
                description: "Enter and verify property address details",
                details: ["Complete street address required", "Auto-population of available data", "Address confirmation essential"],
                color: "blue"
              },
              {
                step: 2,
                icon: FileText,
                title: "Planning Data Integration",
                description: "Access planning portals and mapping",
                details: ["State-specific portal integration", "VicPlan support for Victoria", "Download planning certificates"],
                color: "green"
              },
              {
                step: 3,
                icon: Camera,
                title: "Property Photos & Documents",
                description: "Upload photos and documents for analysis",
                details: ["OCR analysis of photos", "Secure document storage", "Automatic feature extraction"],
                color: "purple"
              },
              {
                step: 4,
                icon: Settings,
                title: "Report Configuration",
                description: "Critical step - configures entire report",
                details: ["Property type selection", "Valuation approaches", "Value component settings", "Pre-populates all sections"],
                color: "orange",
                critical: true
              },
              {
                step: 5,
                icon: CheckCircle,
                title: "Professional Declarations",
                description: "Complete and submit assessment",
                details: ["Required professional declarations", "Final review opportunity", "Generate comprehensive report"],
                color: "emerald"
              }
            ].map((step) => (
              <Card key={step.step} className={`${step.critical ? 'border-orange-300 bg-orange-50/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full bg-${step.color}-100`}>
                      <step.icon className={`h-5 w-5 text-${step.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Step {step.step}</Badge>
                        <h3 className="font-semibold">{step.title}</h3>
                        {step.critical && <Badge variant="destructive">Critical</Badge>}
                      </div>
                      <p className="text-muted-foreground mb-3">{step.description}</p>
                      <ul className="text-sm space-y-1">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Pre-Population</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Step 4 Report Configuration automatically populates data throughout the entire report system.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Valuation Certificate - Value Component
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Valuation Analysis - Selected approaches only
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Property Details - Type configuration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Legal & Planning - Relevant data
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Smart Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Efficient workflow designed for professional valuers.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                    PAF completion → Executive Summary
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                    Auto-save throughout process
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                    Photos display in relevant sections
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                    Consistent data synchronization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">OCR & Document Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Intelligent analysis of uploaded content.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-purple-600" />
                    Automatic property feature extraction
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    Secure document storage
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-purple-600" />
                    Data population from images
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Planning Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Direct access to state planning systems.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    VicPlan integration (Victoria)
                  </li>
                  <li className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-green-600" />
                    Planning certificate downloads
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    State portal links
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid gap-4">
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Before You Start</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Gather all property documentation</li>
                      <li>• Prepare high-quality property photos</li>
                      <li>• Verify property address accuracy</li>
                      <li>• Check internet connection stability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">During Assessment</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Complete all PAF steps thoroughly</li>
                      <li>• Pay special attention to Step 4</li>
                      <li>• Upload clear, well-lit photos</li>
                      <li>• Review selections before proceeding</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="h-5 w-5" />
                  Common Issues & Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Photos Not Uploading</h4>
                    <p className="text-sm text-muted-foreground">
                      Check file size (max 10MB) and format (JPG, PNG, PDF). Ensure stable internet connection.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Not Appearing in Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Verify Step 4 Report Configuration was completed properly. Check that property type is selected.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Save Button Keeps Flashing</h4>
                    <p className="text-sm text-muted-foreground">
                      This indicates continuous saving. Wait for "✓ Saved" confirmation before proceeding.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Clock className="h-5 w-5" />
                  Workflow Efficiency Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Step 4 is critical - all report sections depend on these selections</li>
                  <li>• Upload all photos at once in Step 3 for batch processing</li>
                  <li>• Use address auto-completion in Step 1 to ensure accuracy</li>
                  <li>• Review Executive Summary first after completion</li>
                  <li>• Navigate between report sections using the table of contents</li>
                  <li>• Data automatically saves - no need to manually save between steps</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserGuide;