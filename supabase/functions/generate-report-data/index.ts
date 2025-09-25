import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerateReportRequest {
  assessmentData: {
    reportData: any;
    addressData: any;
    currentStep: number;
    completedSteps: boolean[];
  };
  reportType: string;
  propertyType: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { assessmentData, reportType, propertyType }: GenerateReportRequest = await req.json();
    
    console.log('Generating report data for:', { reportType, propertyType });

    // 1. Validate assessment data completeness
    const validation = validateAssessmentData(assessmentData);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Assessment data incomplete', 
          missingFields: validation.missingFields 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // 2. Create or update property record
    const propertyResult = await createPropertyRecord(supabase, assessmentData);
    if (!propertyResult.success) {
      return new Response(
        JSON.stringify({ success: false, error: propertyResult.error }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    // 3. Generate Work Hub job for tracking
    const workHubJob = await createWorkHubJob(supabase, {
      propertyId: propertyResult.propertyId,
      reportType,
      propertyType,
      assessmentData
    });

    // 4. Pre-populate report sections
    const reportSections = generateReportSections(assessmentData);

    // 5. Create report entry
    const reportResult = await createReportEntry(supabase, {
      propertyId: propertyResult.propertyId,
      workHubJobId: workHubJob.id,
      reportSections,
      reportType,
      propertyType
    });

    console.log('Report generation completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          propertyId: propertyResult.propertyId,
          workHubJobId: workHubJob.id,
          reportId: reportResult.reportId,
          reportSections,
          redirectUrl: `/report?id=${reportResult.reportId}`
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error generating report data:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

function validateAssessmentData(assessmentData: any) {
  const missingFields = [];
  const warnings = [];
  
  console.log('Validating assessment data:', assessmentData);
  
  // Enhanced validation with comprehensive checks
  const hasAddress = assessmentData.addressData?.propertyAddress || 
                    assessmentData.reportData?.propertySearchData?.confirmedAddress ||
                    assessmentData.reportData?.planningData?.address;
  
  if (!hasAddress) {
    missingFields.push('Property Address');
  }

  // Only require property address - make report configuration optional
  const reportConfig = assessmentData.reportData?.reportConfig;
  
  // Add warnings for missing optional data instead of failing validation
  if (!reportConfig?.propertyType) {
    warnings.push('Property Type not configured - will default to Residential');
  }
  
  if (!reportConfig?.reportType) {
    warnings.push('Report Type not configured - will default to Desktop Report');
  }

  // Check data quality warnings
  const planningData = assessmentData.reportData?.planningData;
  if (!planningData?.zoning && !planningData?.lga) {
    warnings.push('Limited planning data available - manual verification recommended');
  }

  console.log('Validation results:', { 
    isValid: missingFields.length === 0, 
    missingFields, 
    warnings 
  });

  return {
    isValid: missingFields.length === 0, // Only fail if missing critical data (address)
    missingFields,
    warnings,
    dataQuality: missingFields.length === 0 && warnings.length === 0 ? 'high' : 
                 missingFields.length === 0 ? 'medium' : 'low'
  };
}

async function createPropertyRecord(supabase: any, assessmentData: any) {
  try {
    // Get address from either location
    const address = assessmentData.addressData?.propertyAddress || 
                   assessmentData.reportData?.propertySearchData?.confirmedAddress;
    
    if (!address) {
      throw new Error('No property address found');
    }

    // Create a mock property ID for now since we don't have actual database tables
    const propertyId = `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('Created mock property record:', { propertyId, address });

    return { success: true, propertyId };
  } catch (error) {
    console.error('Error in createPropertyRecord:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Data validation and formatting functions
function validateDataForInclusion(assessmentData: any) {
  const { reportData, addressData } = assessmentData;
  const reportConfig = reportData?.reportConfig || {};
  
  return {
    hasAddress: !!(addressData?.propertyAddress || 
                  reportData?.propertySearchData?.confirmedAddress ||
                  reportData?.planningData?.address),
    hasPlanning: !!(reportData?.planningData?.zoning || reportData?.planningData?.lga),
    hasReportConfig: !!(reportConfig.propertyType && reportConfig.reportType),
    isLeasehold: reportConfig.interestValues?.includes('Leasehold Interest') || 
                reportConfig.interestValues?.includes('Ground Lease'),
    hasPhotos: !!(reportData?.fileAttachments?.propertyPhotos?.length > 0),
    hasDocuments: !!(reportData?.fileAttachments?.propertyDocuments?.length > 0 ||
                    reportData?.fileAttachments?.planningDocuments?.length > 0),
    hasValuationApproaches: !!(reportConfig.valuationApproaches?.length > 0),
    includeRental: reportConfig.includeRentalValuation === true
  };
}

function formatAddressFromComponents(addressData: any) {
  if (!addressData) return null;
  
  const parts = [
    addressData.unitNumber,
    addressData.streetNumber,
    addressData.streetName,
    addressData.streetType,
    addressData.suburb,
    addressData.state,
    addressData.postcode
  ].filter(Boolean);
  
  return parts.length > 0 ? parts.join(' ') : null;
}

async function createWorkHubJob(supabase: any, data: any) {
  try {
    // Get address from either location
    const address = data.assessmentData.addressData?.propertyAddress || 
                   data.assessmentData.reportData?.propertySearchData?.confirmedAddress;
    
    // Create mock job for now
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const job = {
      id: jobId,
      title: `${data.reportType} - ${address}`,
      property_id: data.propertyId,
      report_type: data.reportType,
      property_type: data.propertyType,
      status: 'Generated from Assessment',
      source_data: data.assessmentData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Created mock work hub job:', job);
    return job;
  } catch (error) {
    console.error('Error creating work hub job:', error);
    throw new Error(`Failed to create work hub job: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function generateReportSections(assessmentData: any) {
  const { reportData, addressData } = assessmentData;
  const reportConfig = reportData?.reportConfig || {};
  const planningData = reportData?.planningData || {};
  const fileAttachments = reportData?.fileAttachments || {};
  const locationData = reportData?.locationData || {};
  const propertyIdentification = reportData?.propertyIdentification || {};

  // Comprehensive data validation and filtering
  const dataValidation = validateDataForInclusion(assessmentData);
  
  // Get address from multiple sources with priority
  const propertyAddress = addressData?.propertyAddress || 
                         reportData?.propertySearchData?.confirmedAddress ||
                         reportData?.planningData?.address ||
                         formatAddressFromComponents(addressData) ||
                         'Address to be confirmed';

  console.log('Data validation results:', dataValidation);

  const reportSections: Record<string, any> = {};

  // RPD and Location - Always include (core section)
  reportSections.rpdAndLocation = {
    propertyAddress,
    lotNumber: addressData?.lotNumber || planningData?.lotNumber || '',
    planNumber: addressData?.planNumber || planningData?.planNumber || '',
    unitNumber: addressData?.unitNumber || '',
    streetNumber: addressData?.streetNumber || '',
    streetName: addressData?.streetName || '',
    streetType: addressData?.streetType || '',
    suburb: addressData?.suburb || '',
    state: addressData?.state || '',
    postcode: addressData?.postcode || '',
    country: addressData?.country || 'Australia',
  
    // Property identification methods
    propertyIdentification: {
      physicalInspection: propertyIdentification.physicalInspection ?? true,
      surveyorPeg: propertyIdentification.surveyorPeg ?? false,
      plan: propertyIdentification.plan ?? false,
      cadastralMap: propertyIdentification.cadastralMap ?? true,
      certificateTitle: propertyIdentification.certificateTitle ?? false,
      aerialMapping: propertyIdentification.aerialMapping ?? true,
      includeInReport: propertyIdentification.includeInReport ?? true,
      other: propertyIdentification.other || '',
      otherChecked: propertyIdentification.otherChecked ?? false
    },

    // Location analysis
    locationAnalysis: {
      location: locationData.location || 'Location analysis to be completed',
      access: locationData.access || 'Access description to be completed',
      siteDescription: locationData.siteDescription || 'Site description to be completed',
      neighbourhood: locationData.neighbourhood || 'Neighbourhood analysis to be completed',
      amenities: locationData.amenities || 'Amenities assessment to be completed',
      services: locationData.services || 'Services availability to be completed'
    }
  };

  // Legal and Planning - Always include (core section)
  reportSections.legalAndPlanning = {
    zoneName: planningData.zoneName || planningData.zoning || 'Zoning to be determined',
    zoneDescription: planningData.zoneDescription || 'Zone description to be researched',
    overlays: planningData.overlays || [],
    landUse: planningData.landUse || planningData.currentUse || 'Current use to be verified',
    developmentPotential: planningData.developmentPotential || 'To be assessed',
    permitRequired: planningData.permitRequired ?? true,
    heightRestriction: planningData.heightRestriction || 'To be confirmed',
    planningScheme: planningData.planningScheme || 'Planning scheme to be identified',
    mapReference: planningData.mapReference || 'Map reference to be obtained',
    riskAssessment: {
      heritage: planningData.heritage || planningData.riskAssessment?.heritage || 'Heritage assessment required',
      flooding: planningData.floodRisk || planningData.riskAssessment?.flooding || 'Flood risk to be assessed',
      bushfire: planningData.bushfireRisk || planningData.riskAssessment?.bushfire || 'Bushfire risk to be assessed',
      contamination: planningData.riskAssessment?.contamination || 'Contamination assessment required'
    },
    coreDetails: planningData.coreDetails || {
      commercial: planningData.zoneName || 'Zone to be confirmed',
      landUse: planningData.landUse || 'Current use to be verified',
      development: planningData.developmentPotential || 'Development potential to be assessed',
      planningScheme: planningData.planningScheme || 'Planning scheme to be identified'
    },
    coordinates: planningData.coordinates,
    address: propertyAddress,
    planningImage: planningData.planningImage
  };

  // Tenancy Schedule/Lease Details - Only include for leasehold properties
  if (dataValidation.isLeasehold) {
    reportSections.tenancyScheduleLeaseDetails = {
      groundLease: {
        include: reportConfig.interestValues?.includes('Leasehold Interest') || false,
        leaseType: '',
        leaseTerm: '',
        annualGroundRent: '',
        reviewPeriod: '',
        commencementDate: '',
        expiryDate: '',
        nextReviewDate: '',
        reviewMethod: 'cpi',
        permittedUse: '',
        restrictions: '',
        impact: '',
        leaseOptions: {
          optionToRenew: false,
          optionToPurchase: false,
          surrenderClause: false,
          breakClause: false
        }
      },
      tenantSummary: {
        include: true,
        lessor: '',
        lessee: '',
        commencementDate: '',
        expiryDate: '',
        optionsTerms: '',
        reviewDate: '',
        reviewMethod: 'cpi',
        outgoings: '',
        commencementRent: '',
        incentives: '',
        repairsMaintenance: ''
      }
    };
  }

  // Risk Assessment - PESTEL & SWOT Analysis pre-configured
  reportSections.riskAssessmentMarketIndicators = {
    includePestelAnalysis: true,
    includeSwotAnalysis: true,
    includeTowsAnalysis: true,
    pestelFactors: {
      political: 'Government policies, regulations, political stability, tax policies...',
      economic: 'Interest rates, inflation, economic growth, unemployment...',
      social: 'Demographics, lifestyle changes, population growth, cultural trends...',
      technological: 'Automation, digitalization, innovation, technology adoption...',
      environmental: 'Climate change, environmental regulations, sustainability requirements...',
      legal: 'Building codes, zoning laws, safety regulations, compliance requirements...'
    },
    swotAnalysis: {
      strengths: ['Prime location', 'Strong infrastructure'],
      weaknesses: ['Age of building', 'Maintenance requirements'],
      opportunities: ['Market growth potential', 'Development opportunities'],
      threats: ['Market volatility', 'Regulatory changes']
    },
    towsStrategies: {
      soStrategies: 'How to use strengths to take advantage of opportunities...',
      woStrategies: 'How to overcome weaknesses and avoid threats...',
      stStrategies: 'How to use strengths to avoid threats...',
      wtStrategies: 'How to minimize weaknesses and avoid threats...'
    }
  };

  // Previous Sales History - Ready for completion
  reportSections.previousSalesHistoryAndCurrentSale = {
    includePreviousSales: true,
    includeCurrentSale: false,
    lastSaleDate: '',
    lastSalePrice: '',
    saleMethod: '',
    saleHistoryNotes: 'Additional information about previous sales...',
    supportingDocuments: [],
    transactionAnalysis: {
      dateOfTransaction: '',
      dateOfValuation: '',
      marketTrends: 'Analysis of market trends between sales...',
      priceVariation: 'Analysis of price changes and factors...',
      transactionReliability: '',
      valuationImpact: '',
      overallComments: 'Summary of sales history analysis and impact on valuation...'
    }
  };

  // Valuation Certificate - Pre-populated from report config with defaults
  reportSections.valuationCertificate = {
    propertyAddress,
    titleReference: `${addressData?.lotNumber || 'LOT'} ${addressData?.planNumber || 'PLAN'}`,
    propertyType: reportConfig.propertyType || 'Residential',
    interestValued: reportConfig.interestValues || 'Fee Simple',
    purposeOfValuation: reportConfig.valuationPurpose || 'Market Valuation',
    valueComponent: reportConfig.valueComponent || 'Land and Buildings',
    mortgageSecurity: reportConfig.mortgageSecurity || 'To be assessed',
    dateOfValuation: new Date().toISOString().split('T')[0],
    dateOfInspection: new Date().toISOString().split('T')[0],
    certificateDetails: {
      marketValue: 0,
      highestAndBestUse: 'Current use',
      caveats: 'Subject to detailed market analysis',
      gstTreatment: 'GST inclusive',
      currency: 'AUD'
    },
    professionalCertification: {
      valuersName: '',
      professionalQualification: '',
      registrationNumber: '',
      valuationFirm: ''
    }
  };

  // Valuation Analysis - Only selected approaches
  reportSections.valuationAnalysis = {
    activeApproaches: reportConfig.valuationApproaches || ['Direct Comparison'],
    selectedApproaches: reportConfig.valuationApproaches || ['Direct Comparison'],
    enabledSections: reportConfig.valuationApproaches || ['Direct Comparison']
  };

  // Property Details - From assessment with proper defaults
  reportSections.propertyDetails = {
    propertyType: reportConfig.propertyType || 'Residential',
    reportType: reportConfig.reportType || 'Desktop Report',
    address: propertyAddress,
    lotPlan: `${addressData?.lotNumber || ''} ${addressData?.planNumber || ''}`.trim(),
    unit: addressData?.unitNumber,
    suburb: addressData?.suburb,
    state: addressData?.state,
    postcode: addressData?.postcode
  };

  // File Attachments - Always include section even if empty
  reportSections.documentAttachments = {
    propertyPhotos: fileAttachments.propertyPhotos || [],
    documents: fileAttachments.documents || [],
    planningDocuments: fileAttachments.planningDocuments || [],
    marketEvidence: fileAttachments.marketEvidence || []
  };

  // Rental Valuation - Only include if specifically requested
  if (dataValidation.includeRental) {
    reportSections.rentalValuation = {
      enabled: true,
      assessmentType: reportConfig.rentalAssessmentType || 'Current Market Rent',
      rentalBasis: reportConfig.rentalBasis || 'Market Rent',
      customRentalBasis: reportConfig.customRentalBasis || ''
    };
  }

  // Metadata
  reportSections.metadata = {
    generatedFromAssessment: true,
    assessmentCompletedAt: new Date().toISOString(),
    assessmentSteps: assessmentData.completedSteps || [],
    sourceAssessmentData: reportData,
    generatedSections: [
      'rpdAndLocation',
      'legalAndPlanning', 
      'tenancyScheduleLeaseDetails',
      'riskAssessmentMarketIndicators',
      'previousSalesHistoryAndCurrentSale',
      'valuationCertificate',
      'valuationAnalysis',
      'propertyDetails'
    ],
    lastUpdated: new Date().toISOString()
  };

  return reportSections;
}

async function createReportEntry(supabase: any, data: any) {
  try {
    // Create mock report for now
    const reportId = `rpt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const report = {
      id: reportId,
      property_id: data.propertyId,
      work_hub_job_id: data.workHubJobId,
      report_type: data.reportType,
      property_type: data.propertyType,
      sections_data: data.reportSections,
      status: 'Draft - Generated from Assessment',
      generated_from_assessment: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Created mock report entry:', { reportId });
    return { reportId: report.id };
  } catch (error) {
    console.error('Error creating report entry:', error);
    throw new Error(`Failed to create report entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}