import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileText, CheckCircle, Upload, Loader2 } from 'lucide-react';

interface CompleteReportCreatorProps {
  onReportCreated?: (jobId: string) => void;
}

export function CompleteReportCreator({ onReportCreated }: CompleteReportCreatorProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);
  const { toast } = useToast();

  const createCompleteReport = async () => {
    setIsCreating(true);

    try {
      console.log('Creating complete property report...');

      // Structured report data from the executive summary provided
      const reportData = {
        executiveSummary: {
          instructingParty: 'Kure Medical',
          reliantParty: 'Kure Medical',
          loanReference: 'N/A',
          borrower: 'N/A',
          interestValued: 'Estate held in fee simple',
          valuationApproach: 'Capitalisation of net income and direct comparison approach',
          basisOfAssessment: 'The basis of valuation assumes market value during a reasonable selling period for the estate held in fee simple. This valuation is determined on the basis that the property, the title thereto and its use is not affected by any matter other than that mentioned in this report.',
          purposeOfValuation: 'Pre Sale Advice',
          conflictOfInterest: 'We confirm we do not have a conflict of interest',
          valuationDate: '1st August 2025',
          inspectionDate: '1st August 2025',
          inspectionValuer: 'John Delorenzo',
          coSignatory: 'John Delorenzo – Director – Certified Practising Valuer',
          valuerDeclaration: 'I hereby certify that I inspected the property on the date above and have conducted the assessments above as at that date of inspection. No responsibility is accepted by the Valuer and/or the Valuation Firm to any other parties who rely, on use, distribute, publish and/or otherwise represent anything contained in this Report for any purpose. I, John Delorenzo confirm they are competent of completing this assessment.',
          reliance: 'Reliance on this report should only be taken upon sighting the original document that has been signed by the Inspecting Valuer who has undertaken the valuation. In this scenario, the Counter Signatory or Director has inspected the property, read this report, and verifies that the report is genuine and is endorsed by Delorenzo Property Group Pty Ltd.',
          criticalAssumptions: 'This report is provided subject to the assumptions, disclaimers, limitations, and qualifications detailed herein. Reliance on this report and extension of our liability is conditional upon the readers acknowledgement and understanding of these statements. That third party sales and leasing information is true and correct, we reserve the right to review the valuation if any information gathered from a third party to assist with preparation of this report is incorrect. The currency of the valuation is 3 – months. Property valued as an in use medical centre and has been valued accordingly.',
          firstMortgageSecurity: 'The property is suitable for mortgage purposes.',
          instructionDate: 'June 2025',
          sourcesOfInformation: 'Planning Maps, Lease details and outgoings, RP Data',
          valuationStandards: 'Australian Property Institute (API) Australia and New Zealand Valuation and Property Standards',
          preparerDetails: 'Delorenzo Property Group Pty Ltd',
          clientDetails: 'Liberty Finance Pty Ltd and Secure Funding Pty Ltd',
          pecuniaryInterest: 'The Primary Valuer has at least five years appropriate experience, has no pecuniary interest, and accepts instructions only from the Trustee/Responsible Entity.'
        },
        propertyDetails: {
          address: '133 – 137 Langtree Avenue Mildura VIC 3500',
          lotPlan: 'CP 150978',
          volume: '',
          folio: '',
          landArea: 1425,
          totalArea: 1435,
          propertyDescription: 'Healthcare offices with day surgery',
          entitlementLiability: 'Not Applicable',
          encumbrancesRestriction: 'Title not sighted',
          registeredProprietors: 'Title not sighted',
          generalDocuments: 'Current proposed subdivision – property valued on an As Is Basis (excluding first level office)',
          criticalDocuments: 'As Above',
          propertyIdentification: 'Identified by aerial map, cadastral plan and physical inspections',
          location: 'Located within the Mildura CBD approximately 400 metres from NAB Deakin Avenue. Mildura is a major regional service centre located approximately 550 kms north west of Melbourne, 400 kms north east of Adelaide and 1000 kms south west of Sydney. Mildura and surrounds have a population of approximately 60,000 to 80,000.',
          access: 'Accessible via Langtree Avenue, a main arterial road; secondary access points as per site inspection.',
          siteDescription: 'Irregular shaped land situated at road level. The property is located on the northwest side of Langtree Avenue and southeast side of Shillidays Lane.',
          neighbourhood: 'Commercial and mixed-use area near main roads, amenities, and community facilities.',
          amenities: 'Proximity to shopping centres, schools, parks, medical facilities, and public transportation.',
          services: 'Connected to mains water, sewerage, electricity, gas, and telecommunications.',
          proposedSubdivision: 'The property appears to be going through some subdivision changes, the valuation has been complete on an AS IS basis as of the 1st of August 2025.'
        },
        legalAndPlanning: {
          lga: 'Mildura Rural City Council',
          zoning: 'Commercial 1 Zone (C1Z)',
          currentUse: 'Healthcare',
          permissibleUse: 'Yes',
          permitNumber: 'N/A',
          overlays: {
            ddo3: true,
            po1: true,
            ho: false,
            sco1: true,
            other: 'No additional overlays directly affect this land, but nearby overlays exist as per map'
          },
          overlayImpact: 'Low – Overlays common in the area and zoning, most sales used have similar overlays',
          overlayImpactRating: 2,
          environmentalIssues: 'None evident',
          heightOfBuilding: 'N/A',
          floorSpaceRatio: 'N/A',
          minimumLotSize: 'N/A'
        },
        financialData: {
          netPassingRent: 180000,
          netPassingRentPerSuite: 11250,
          marketRentPerSqm: 230,
          marketRent: 180000,
          wale: '',
          marketValue: 2850000,
          forceSaleRange: 'Not Assessed',
          insuranceReplacementValue: 2200000
        },
        valuationDetails: {
          marketValue: 2850000,
          insuranceValue: 2200000,
          valuationDate: '1st August 2025',
          inspectionDate: '1st August 2025',
          inspectionValuer: 'John Delorenzo',
          coSignatory: 'John Delorenzo – Director – Certified Practising Valuer',
          approach: 'Capitalisation of net income and direct comparison approach',
          purpose: 'Pre-sale purposes'
        }
      };

      // Call the complete report creation function
      const { data, error } = await supabase.functions.invoke('create-complete-report', {
        body: {
          reportData,
          createJob: true
        }
      });

      if (error) throw error;

      console.log('Complete report created successfully:', data);

      setCreatedJobId(data.jobId);
      
      toast({
        title: "Complete Report Created Successfully!",
        description: `Job ID: ${data.jobId} - All sections populated with detailed information.`,
      });

      onReportCreated?.(data.jobId);

    } catch (error) {
      console.error('Complete report creation error:', error);
      
      toast({
        title: "Report Creation Error",
        description: "Failed to create complete report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (createdJobId) {
    return (
      <Card className="w-full border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Complete Report Created Successfully!
          </CardTitle>
          <CardDescription className="text-green-700">
            All report sections have been populated with the provided executive summary data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Job ID:</strong> {createdJobId}
            </div>
            <div>
              <strong>Property:</strong> 133-137 Langtree Avenue Mildura
            </div>
            <div>
              <strong>Client:</strong> Kure Medical
            </div>
            <div>
              <strong>Market Value:</strong> $2,850,000
            </div>
            <div>
              <strong>Property Type:</strong> Commercial Healthcare
            </div>
            <div>
              <strong>Inspection Date:</strong> 1st August 2025
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-green-800 mb-2">✅ Completed Sections:</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• Executive Summary - Fully populated</li>
              <li>• Property Details & RPD - Address, lot/plan, land area</li>
              <li>• Legal & Planning - LGA, zoning, overlays</li>
              <li>• Financial Analysis - Rental income, market value</li>
              <li>• Valuation Certificate - Professional valuation details</li>
              <li>• Report Configuration - Default sections enabled</li>
            </ul>
          </div>

          <div className="text-xs text-green-600 bg-green-100 p-3 rounded">
            <strong>Ready for next section:</strong> You can now provide additional information 
            for any remaining sections (photos, market analysis, risk assessment, etc.) 
            to further enhance this comprehensive report.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Create Complete Property Report
        </CardTitle>
        <CardDescription>
          Generate a comprehensive property valuation report with all sections populated 
          from the executive summary data for 133-137 Langtree Avenue Mildura VIC 3500.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Preview */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h4 className="font-medium">Report Preview - What will be created:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <div><strong>Property:</strong> 133-137 Langtree Avenue Mildura</div>
              <div><strong>Client:</strong> Kure Medical</div>
              <div><strong>Property Type:</strong> Healthcare offices with day surgery</div>
              <div><strong>Land Area:</strong> 1,425 sqm</div>
            </div>
            <div className="space-y-2">
              <div><strong>Market Value:</strong> $2,850,000</div>
              <div><strong>Annual Rent:</strong> $180,000 + GST</div>
              <div><strong>Zoning:</strong> Commercial 1 Zone</div>
              <div><strong>LGA:</strong> Mildura City Council</div>
            </div>
          </div>
        </div>

        {/* Sections to be created */}
        <div className="space-y-3">
          <h4 className="font-medium">Sections to be populated:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Executive Summary
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Property Details & RPD
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Legal & Planning Information
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Financial Analysis
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Valuation Certificate
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Report Configuration
            </div>
          </div>
        </div>

        {/* Create button */}
        <Button 
          onClick={createCompleteReport}
          disabled={isCreating}
          className="w-full"
          size="lg"
        >
          {isCreating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating Complete Report...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Create Complete Property Report
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 bg-gray-100 p-3 rounded">
          <strong>Note:</strong> This will create a new job with all the executive summary data 
          properly structured across the appropriate report sections. The job will be saved 
          to the database and ready for additional information as you provide it.
        </div>
      </CardContent>
    </Card>
  );
}