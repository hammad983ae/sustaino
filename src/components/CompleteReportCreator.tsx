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
        // Environmental Assessment
        environmentalAssessment: {
          previousContaminatingUse: 'Not evident',
          environmentalPlanningOverlay: 'Not evident',
          contaminationAdjoiningProperties: 'Not evident',
          knownContaminationSurrounding: 'Not evident',
          contaminatingProcesses: 'Not evident',
          undergroundStorageContaminants: 'Not evident',
          contaminatedSiteRegisters: 'No',
          environmentalLicensing: 'No',
          noxiousWeeds: 'Not applicable',
          salinityErosion: 'No',
          bioSecurityIssues: 'Not evident',
          floodingIssues: 'None',
          landslipMineSubsidence: 'None',
          mainRoadAcquisition: 'None',
          compliantBuildingMaterials: 'Yes',
          asbestosRelatedMaterials: 'No',
          renewableEnergySystems: 'Not present (no solar panels installed)',
          renewableEnergyCapacity: '0 kW',
          nathersRating: 'Not applicable',
          greenStarRating: '4 Stars',
          nabersEnergy: '6 Stars',
          nabersWater: '0 (indicating minimal water efficiency features)',
          nabersIEQ: '3 Stars',
          buildingOrientation: 'Northwest',
          esgSustainabilityRating: '3 out of 5',
          overallComments: 'The building appears to be somewhat dated, with fixtures and fittings that likely do not incorporate the latest sustainability standards. The property lacks a reticulated watering system and does not operate with renewable energy systems. This presents opportunities for future upgrades to enhance sustainability.',
          status: 'completed'
        },
        // Economic Commentary
        economicCommentary: {
          australianEconomicOverlay: 'As of August 2025, the Australian economy is experiencing persistent headwinds, with GDP growth tapering to an estimated 1.0% for the year. Recent data indicates headline GDP growth remains subdued, driven by subdued domestic demand and ongoing global uncertainties. Population growth remains modest at around 0.5% annually, with per capita GDP growth still negative at approximately -0.2% over the past year.',
          cashRate: 'The Reserve Bank of Australia (RBA), as of August 2025, has maintained the cash rate at 3.85%. Recent inflation data indicates that headline inflation has moderated to around 3.2%, with core inflation estimates remaining elevated at 3.4%.',
          inflationData: '3.2% headline, 3.4% core inflation',
          productivityChallenges: 'Decline in productivity persists, with recent data showing a 1.2% decrease in real GDP per hour worked over the past year. Real unit labour costs continue to climb, registering a 1.4% annual increase.',
          source: 'KPMG (August 2025 Outlook), Sprintfinance (August 2025)',
          status: 'completed'
        },
        // Financial Data
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
        // Valuation Details
        valuationDetails: {
          marketValue: 2850000,
          insuranceValue: 2200000,
          valuationDate: '1st August 2025',
          inspectionDate: '1st August 2025',
          inspectionValuer: 'John Delorenzo',
          coSignatory: 'John Delorenzo – Director – Certified Practising Valuer',
          approach: 'Capitalisation of net income and direct comparison approach',
          purpose: 'Pre-sale purposes'
        },
        // Market Commentary
        marketCommentary: {
          nationalHealthcareAssets: 'The healthcare sector in Australia remains a resilient and vital component of the property market. Driven by demographic shifts such as an aging population and rising healthcare service demands, the sector continues to attract investment and steady income streams. The proportion of Australians aged 65 and over is projected to exceed 20% by 2030.',
          milduraCommercialMarket: 'The commercial property market in Mildura remains relatively stable in August 2025, buoyed by regional economic diversification including agriculture, tourism, and burgeoning small business activity. Commercial rents are steady, with select sectors experiencing modest rent increases.',
          milduraResidentialMarket: 'The residential property sector in Mildura remains resilient, characterized by stable demand supported by local population growth. Property values have appreciated slightly, averaging around 2-3% annually, sustained by low vacancy rates and high occupancy levels.',
          milduraAgriculturalMarket: 'Agriculture continues to underpin Mildura economy in 2025, with positive seasonal conditions enhancing productivity and profitability. Improved water allocations and favorable seasonal yields have driven farm profitability.',
          investmentOutlook: 'Investment interest continues to favor stable, income-generating assets. Healthcare assets are regarded as a secure and resilient asset class with favorable long-term prospects.',
          marketDrivers: 'Aging population, infrastructure investments, regional diversification, and government initiatives supporting healthcare expansion.',
          status: 'completed'
        },
        // Property Construction Details
        propertyConstruction: {
          yearBuilt: '1990s',
          foundation: 'Concrete',
          roof: 'CGI',
          windows: 'Aluminium',
          externalCladding: 'Rendered/Brick',
          internalCladding: 'Plasterboard',
          ceilings: 'Plasterboard and acoustic panel grid',
          signage: 'Yes – Front of building Langtree Avenue side',
          floorCoverings: 'Mixed',
          lighting: 'LED',
          fixturesAndFittings: 'Ceiling fans, evaporative air conditioning, his and hers toilet amenities, kitchen amenities, day surgery room – Full list held on file',
          pathways: 'Concrete',
          fencing: 'Parting walls',
          parking: 'Approximately 12 car parks at the rear of the premises and on-site parking',
          communalAreas: 'N/A',
          nla: '860 sqm',
          awning: '60 sqm',
          otherAreas: 'First Level office was not accessible, and any consideration has been excluded from the value',
          totalArea: '920 sqm',
          floorPlan: 'Available',
          status: 'completed'
        },
        // Property Photos
        propertyPhotos: {
          exteriorPhotos: [
            {
              id: 'ext-001',
              name: 'Covered Parking Area',
              url: '/property-photos/parking-area.png',
              description: 'Covered parking spaces with concrete flooring and structural pillars'
            },
            {
              id: 'ext-002', 
              name: 'Exterior Parking View',
              url: '/property-photos/exterior-parking.png',
              description: 'External view of building with designated parking spaces'
            }
          ],
          interiorPhotos: [
            {
              id: 'int-001',
              name: 'Office/Consultation Room',
              url: '/property-photos/office-consultation.png',
              description: 'Professional office space with desk, chairs, and medical certificates on wall'
            },
            {
              id: 'int-002',
              name: 'Conference Room',
              url: '/property-photos/conference-room.png',
              description: 'Large conference room with meeting table and chairs for staff meetings'
            },
            {
              id: 'int-003',
              name: 'Medical Storage Room',
              url: '/property-photos/medical-storage.png', 
              description: 'Well-organized medical storage with shelving and medical supplies'
            },
            {
              id: 'int-004',
              name: 'Meeting Room',
              url: '/property-photos/meeting-room-2.png',
              description: 'Additional meeting space with conference table'
            },
            {
              id: 'int-005',
              name: 'Patient Waiting Area',
              url: '/property-photos/waiting-area.png',
              description: 'Comfortable patient waiting area with modern seating and decor'
            },
            {
              id: 'int-006',
              name: 'Reception Area',
              url: '/property-photos/reception-area.png',
              description: 'Modern reception area with comfortable seating and professional layout'
            },
            {
              id: 'int-007',
              name: 'Kitchen Facilities',
              url: '/property-photos/kitchen-facilities.png',
              description: 'Staff kitchen with modern appliances, cabinets, and preparation areas'
            }
          ],
          facilityPhotos: [
            {
              id: 'fac-001',
              name: 'Bathroom Facilities', 
              url: '/property-photos/bathroom-facilities.png',
              description: 'Clean, modern bathroom facilities with appropriate accessibility features'
            }
          ],
          totalPhotos: 10,
          photoDate: '1st August 2025',
          photographer: 'John Delorenzo',
          status: 'completed'
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
              <li>• Executive Summary - Fully populated with professional details</li>
              <li>• Property Details & RPD - Address, construction, areas (860 sqm NLA)</li>
              <li>• Legal & Planning - LGA, zoning, overlays, environmental compliance</li>
              <li>• Environmental Assessment - ESG rating, NABERS, sustainability analysis</li>
              <li>• Economic Commentary - Australian economy, cash rates, inflation data</li>
              <li>• Market Commentary - Healthcare, Mildura commercial/residential markets</li>
              <li>• Property Construction - Building details, fixtures, parking, amenities</li>
              <li>• Property Photos - 10 professional photos (exterior, interior, facilities)</li>
              <li>• Financial Analysis - Rental income, market value ($2.85M)</li>
              <li>• Valuation Certificate - Professional valuation certification</li>
              <li>• Report Configuration - All sections properly structured for PDF generation</li>
            </ul>
          </div>

          <div className="text-xs text-green-600 bg-green-100 p-3 rounded">
            <strong>Ready for next section:</strong> You can now provide additional information 
            for any remaining sections (tenancy details, sales evidence, risk assessment, etc.) 
            to further enhance this comprehensive report. 11 major sections now complete including property photos and ready for PDF generation.
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
              Executive Summary & Purpose
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Property Details & Construction
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Legal & Planning Information
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Environmental Assessment
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Economic Commentary
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Market Commentary
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Financial Analysis
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Valuation Certificate
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