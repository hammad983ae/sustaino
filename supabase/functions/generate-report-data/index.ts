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
        error: error.message || 'Internal server error' 
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
  
  // More lenient validation - only require address
  const hasAddress = assessmentData.addressData?.propertyAddress || 
                    assessmentData.reportData?.propertySearchData?.confirmedAddress;
  
  if (!hasAddress) {
    missingFields.push('Property Address');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields
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
    return { success: false, error: error.message };
  }
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
    throw new Error(`Failed to create work hub job: ${error.message}`);
  }
}

function generateReportSections(assessmentData: any) {
  const { reportData } = assessmentData;
  const reportConfig = reportData.reportConfig || {};
  const planningData = reportData.planningData || {};
  const fileAttachments = reportData.fileAttachments || {};

  return {
    // Valuation Certificate - Pre-populated from report config
    valuationCertificate: {
      valueComponent: reportConfig.valueComponent,
      valuationBasis: reportConfig.valuationBasis,
      interestValues: reportConfig.interestValues,
      customBasisDescription: reportConfig.customBasisDescription,
      instructingParty: reportConfig.instructingParty,
      reliantParty: reportConfig.reliantParty,
      valuationPurpose: reportConfig.valuationPurpose
    },

    // Valuation Analysis - Only selected approaches
    valuationAnalysis: {
      activeApproaches: reportConfig.valuationApproaches || [],
      selectedApproaches: reportConfig.valuationApproaches || [],
      enabledSections: reportConfig.valuationApproaches || []
    },

    // Legal and Planning - From planning data
    legalAndPlanning: {
      lga: planningData.lga,
      zoning: planningData.zoning,
      currentUse: planningData.currentUse,
      planningOverlays: planningData.overlays || [],
      planningConstraints: planningData.constraints || []
    },

    // Property Details - From assessment
    propertyDetails: {
      propertyType: reportConfig.propertyType,
      reportType: reportConfig.reportType,
      address: reportData.propertySearchData?.confirmedAddress,
      lotPlan: assessmentData.addressData?.lotPlan,
      unit: assessmentData.addressData?.unit,
      suburb: assessmentData.addressData?.suburb
    },

    // Ground Lease - Auto-show if Leasehold Interest selected
    groundLeaseDetails: {
      visible: reportConfig.interestValues?.includes('Leasehold Interest') || false,
      enabled: reportConfig.interestValues?.includes('Leasehold Interest') || false
    },

    // File Attachments
    documentAttachments: {
      propertyPhotos: fileAttachments.propertyPhotos || [],
      documents: fileAttachments.documents || [],
      planningDocuments: fileAttachments.planningDocuments || []
    },

    // Rental Valuation - If included
    rentalValuation: reportConfig.includeRentalValuation ? {
      enabled: true,
      assessmentType: reportConfig.rentalAssessmentType,
      rentalBasis: reportConfig.rentalBasis,
      customRentalBasis: reportConfig.customRentalBasis
    } : { enabled: false },

    // Metadata
    metadata: {
      generatedFromAssessment: true,
      assessmentCompletedAt: new Date().toISOString(),
      assessmentSteps: assessmentData.completedSteps,
      sourceAssessmentData: reportData
    }
  };
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
    throw new Error(`Failed to create report entry: ${error.message}`);
  }
}