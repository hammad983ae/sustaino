import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateReportRequest {
  reportData: {
    planningData?: any;
    propertySearchData?: any;
    locationData?: any;
    reportConfig?: any;
    fileAttachments?: any;
    professionalDeclarations?: any;
  };
  addressData: {
    propertyAddress?: string;
    streetNumber?: string;
    streetName?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    lotNumber?: string;
    planNumber?: string;
  };
  clientInfo?: {
    instructingParty?: string;
    reliantParty?: string;
    clientEmail?: string;
    clientPhone?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const requestData: GenerateReportRequest = await req.json();
    const { reportData, addressData, clientInfo } = requestData;

    console.log('Generating report data for:', addressData.propertyAddress);

    // Get authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Authentication failed');
    }

    // Step 1: Create or update property
    const propertyData = {
      address_line_1: addressData.propertyAddress || 
        `${addressData.streetNumber || ''} ${addressData.streetName || ''} ${addressData.suburb || ''}`.trim(),
      unit_number: addressData.unitNumber,
      street_number: addressData.streetNumber,
      street_name: addressData.streetName,
      suburb: addressData.suburb || 'Unknown',
      state: addressData.state || 'Unknown',
      postcode: addressData.postcode || '0000',
      lot_number: addressData.lotNumber || reportData.planningData?.lotNumber,
      plan_number: addressData.planNumber || reportData.planningData?.planNumber,
      property_type: reportData.reportConfig?.propertyType || 'residential',
      zoning: reportData.planningData?.zoning,
      council: reportData.planningData?.lga,
      user_id: user.id,
      country: 'Australia'
    };

    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .upsert(propertyData, { 
        onConflict: 'address_line_1,user_id',
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (propertyError) {
      console.error('Property creation error:', propertyError);
      throw new Error(`Failed to create property: ${propertyError.message}`);
    }

    console.log('Property created/updated:', property.id);

    // Step 2: Create valuation job
    const jobData = {
      job_title: `${reportData.reportConfig?.reportType || 'Property Valuation'} - ${addressData.propertyAddress}`,
      client_name: clientInfo?.instructingParty || 'Unknown Client',
      client_email: clientInfo?.clientEmail,
      client_phone: clientInfo?.clientPhone,
      job_type: reportData.reportConfig?.reportType || 'property_valuation',
      property_address: addressData.propertyAddress,
      property_id: property.id,
      priority: 'medium',
      estimated_hours: reportData.reportConfig?.reportType === 'long-form' ? 8.0 : 4.0,
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      client_type: 'long-term',
      status: 'in_progress',
      instruction_date: new Date().toISOString().split('T')[0],
      notes: `Report Type: ${reportData.reportConfig?.reportType}\nProperty Type: ${reportData.reportConfig?.propertyType}\nValuation Purpose: ${reportData.reportConfig?.valuationPurpose || 'Market Valuation'}`
    };

    const { data: job, error: jobError } = await supabase.rpc('create_valuation_job', {
      job_data: jobData
    });

    if (jobError) {
      console.error('Job creation error:', jobError);
      throw new Error(`Failed to create job: ${jobError.message}`);
    }

    console.log('Valuation job created:', job);

    // Step 3: Create report with pre-populated sections
    const sectionsData = {
      propertyDetails: {
        propertyType: reportData.reportConfig?.propertyType,
        reportType: reportData.reportConfig?.reportType,
        address: addressData.propertyAddress,
        lotPlan: `Lot ${addressData.lotNumber || ''} Plan ${addressData.planNumber || ''}`.trim(),
        lastUpdated: new Date().toISOString()
      },
      legalAndPlanning: {
        lga: reportData.planningData?.lga,
        zoning: reportData.planningData?.zoning,
        currentUse: reportData.planningData?.currentUse,
        overlays: reportData.planningData?.overlays,
        heightRestrictions: reportData.planningData?.heightRestrictions,
        setbacks: reportData.planningData?.setbacks,
        lastUpdated: new Date().toISOString()
      },
      valuationCertificate: {
        valueComponent: reportData.reportConfig?.valueComponent,
        valuationBasis: reportData.reportConfig?.valuationBasis,
        interestValues: reportData.reportConfig?.interestValues,
        customBasis: reportData.reportConfig?.customBasis,
        valuationPurpose: reportData.reportConfig?.valuationPurpose,
        instructingParty: clientInfo?.instructingParty,
        reliantParty: clientInfo?.reliantParty,
        lastUpdated: new Date().toISOString()
      },
      valuationAnalysis: {
        activeApproaches: reportData.reportConfig?.valuationApproaches || [],
        selectedApproaches: reportData.reportConfig?.valuationApproaches || [],
        lastUpdated: new Date().toISOString()
      },
      locationData: {
        location: reportData.locationData?.location,
        access: reportData.locationData?.access,
        siteDescription: reportData.locationData?.siteDescription,
        neighbourhood: reportData.locationData?.neighbourhood,
        amenities: reportData.locationData?.amenities,
        services: reportData.locationData?.services,
        lga: reportData.planningData?.lga,
        zoning: reportData.planningData?.zoning,
        lastUpdated: new Date().toISOString()
      },
      fileAttachments: {
        propertyPhotos: reportData.fileAttachments?.propertyPhotos || [],
        propertyDocuments: reportData.fileAttachments?.propertyDocuments || [],
        planningDocuments: reportData.fileAttachments?.planningDocuments || [],
        marketEvidence: reportData.fileAttachments?.marketEvidence || [],
        lastUpdated: new Date().toISOString()
      },
      professionalDeclarations: {
        conflictOfInterest: reportData.professionalDeclarations?.conflictOfInterest,
        inScopeItems: reportData.professionalDeclarations?.inScopeItems || [],
        outOfScopeItems: reportData.professionalDeclarations?.outOfScopeItems || [],
        professionalIndemnity: reportData.professionalDeclarations?.professionalIndemnity,
        cpvCompliance: reportData.professionalDeclarations?.cpvCompliance,
        declarations: reportData.professionalDeclarations?.declarations || [],
        lastUpdated: new Date().toISOString()
      },
      reportConfiguration: {
        ...reportData.reportConfig,
        generatedAt: new Date().toISOString(),
        propertyAssessmentCompleted: true
      }
    };

    const reportCreateData = {
      title: `${reportData.reportConfig?.reportType || 'Property Valuation'} Report - ${addressData.propertyAddress}`,
      report_type: reportData.reportConfig?.reportType || 'property_valuation',
      property_id: property.id,
      status: 'in_progress',
      current_section: 'executive_summary',
      progress: 15, // Initial progress after property assessment
      sections_data: sectionsData
    };

    const { data: report, error: reportError } = await supabase.rpc('create_report', {
      report_data: reportCreateData
    });

    if (reportError) {
      console.error('Report creation error:', reportError);
      throw new Error(`Failed to create report: ${reportError.message}`);
    }

    console.log('Report created:', report);

    // Step 4: Update job with report reference
    const { error: jobUpdateError } = await supabase
      .from('valuation_jobs')
      .update({ 
        notes: `${jobData.notes}\nReport ID: ${report}\nGenerated from Property Assessment Form` 
      })
      .eq('id', job);

    if (jobUpdateError) {
      console.log('Warning: Could not update job with report reference:', jobUpdateError);
    }

    // Return success response with generated IDs
    const response = {
      success: true,
      data: {
        propertyId: property.id,
        jobId: job,
        reportId: report,
        jobNumber: null, // Will be auto-generated by trigger
        reportTitle: reportCreateData.title,
        status: 'in_progress',
        progress: 15,
        sectionsPopulated: [
          'Property Details',
          'Legal and Planning', 
          'Valuation Certificate',
          'Valuation Analysis',
          'Location Data',
          'File Attachments',
          'Professional Declarations'
        ],
        nextSteps: [
          'Complete Property Details section',
          'Add Sales Evidence',
          'Complete Valuation Analysis',
          'Review and finalize report'
        ]
      },
      message: 'Report data generated successfully. Work Hub job created and report sections pre-populated.'
    };

    console.log('Report generation completed successfully');

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-report-data function:', error);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message || 'Failed to generate report data',
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});