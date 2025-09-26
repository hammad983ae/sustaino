// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from "../_shared/cors.ts"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

interface CompleteReportData {
  // Executive Summary
  executiveSummary?: {
    instructingParty?: string
    reliantParty?: string
    loanReference?: string
    borrower?: string
    interestValued?: string
    valuationApproach?: string
    basisOfAssessment?: string
    purposeOfValuation?: string
    conflictOfInterest?: string
    valuationDate?: string
    inspectionDate?: string
    inspectionValuer?: string
    coSignatory?: string
    valuerDeclaration?: string
    reliance?: string
    criticalAssumptions?: string
  }

  // Property Details
  propertyDetails?: {
    address?: string
    lotPlan?: string
    volume?: string
    folio?: string
    landArea?: number
    propertyDescription?: string
    entitlementLiability?: string
    encumbrancesRestriction?: string
    registeredProprietors?: string
    generalDocuments?: string
    criticalDocuments?: string
  }

  // Legal and Planning
  legalAndPlanning?: {
    lga?: string
    zoning?: string
    overlays?: {
      ddo3?: boolean
      po1?: boolean
      ho?: boolean
      sco1?: boolean
      other?: string
    }
    environmentalIssues?: string
  }

  // Financial Data
  financialData?: {
    netPassingRent?: number
    netPassingRentPerSuite?: number
    marketRentPerSqm?: number
    marketRent?: number
    wale?: string
    marketValue?: number
    forceSaleRange?: string
    insuranceReplacementValue?: number
  }

  // Valuation Details
  valuationDetails?: {
    marketValue?: number
    insuranceValue?: number
    valuationDate?: string
    inspectionDate?: string
    inspectionValuer?: string
    coSignatory?: string
    approach?: string
    purpose?: string
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { reportData, createJob = true } = await req.json()

    if (!reportData) {
      throw new Error('Report data is required')
    }

    console.log('Creating comprehensive property report with data:', reportData)

    let jobId = null
    let propertyId = null

    // Create job if requested
    if (createJob) {
      const jobResult = await createPropertyJob(reportData)
      jobId = jobResult.jobId
      propertyId = jobResult.propertyId
    }

    // Create/update report sections
    const reportSections = await createReportSections(reportData, jobId)

    // Create property assessment record
    const assessmentId = await createPropertyAssessment(reportData, jobId, propertyId)

    console.log('Comprehensive report created successfully')

    return new Response(JSON.stringify({
      success: true,
      jobId,
      propertyId,
      assessmentId,
      reportSections,
      message: 'Complete property report created successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Complete report creation error:', error)
    return new Response(JSON.stringify({
      error: error.message || 'Failed to create complete report',
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function createPropertyJob(reportData: CompleteReportData) {
  // Since authentication is disabled, we'll use a static user ID
  // In a production environment, you'd want proper user management
  const userId = '00000000-0000-0000-0000-000000000000'

  // Create or find property
  const { data: property, error: propertyError } = await supabase
    .from('properties')
    .upsert({
      address_line_1: reportData.propertyDetails?.address || '',
      suburb: extractSuburb(reportData.propertyDetails?.address || ''),
      state: extractState(reportData.propertyDetails?.address || ''),
      postcode: extractPostcode(reportData.propertyDetails?.address || ''),
      property_type: 'commercial',
      land_area: reportData.propertyDetails?.landArea,
      user_id: userId,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'address_line_1,user_id'
    })
    .select()
    .single()

  if (propertyError) throw propertyError

  // Create job
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .insert({
      job_title: `Property Valuation - ${reportData.propertyDetails?.address}`,
      client_name: reportData.executiveSummary?.instructingParty || 'Unknown Client',
      property_address: reportData.propertyDetails?.address,
      property_type: 'commercial',
      job_type: 'valuation',
      priority: 'high',
      status: 'in_progress',
      user_id: userId,
      job_data: {
        executive_summary: reportData.executiveSummary,
        property_details: reportData.propertyDetails,
        legal_planning: reportData.legalAndPlanning,
        financial_data: reportData.financialData,
        valuation_details: reportData.valuationDetails
      }
    })
    .select()
    .single()

  if (jobError) throw jobError

  // Create default report configuration
  await supabase.rpc('create_default_report_config', {
    p_job_id: job.id,
    p_user_id: userId
  })

  return { jobId: job.id, propertyId: property.id }
}

async function createReportSections(reportData: CompleteReportData, jobId: string) {
  const sections = []

  // Executive Summary section
  if (reportData.executiveSummary) {
    sections.push({
      job_id: jobId,
      section_name: 'executive_summary',
      section_data: reportData.executiveSummary,
      completion_status: 'completed',
      updated_at: new Date().toISOString()
    })
  }

  // Property Details section
  if (reportData.propertyDetails) {
    sections.push({
      job_id: jobId,
      section_name: 'property_details',
      section_data: reportData.propertyDetails,
      completion_status: 'completed',
      updated_at: new Date().toISOString()
    })
  }

  // Legal and Planning section
  if (reportData.legalAndPlanning) {
    sections.push({
      job_id: jobId,
      section_name: 'legal_planning',
      section_data: reportData.legalAndPlanning,
      completion_status: 'completed',
      updated_at: new Date().toISOString()
    })
  }

  // Financial Data section
  if (reportData.financialData) {
    sections.push({
      job_id: jobId,
      section_name: 'financial_analysis',
      section_data: reportData.financialData,
      completion_status: 'completed',
      updated_at: new Date().toISOString()
    })
  }

  // Valuation Details section
  if (reportData.valuationDetails) {
    sections.push({
      job_id: jobId,
      section_name: 'valuation_certificate',
      section_data: reportData.valuationDetails,
      completion_status: 'completed',
      updated_at: new Date().toISOString()
    })
  }

  // Insert all sections
  if (sections.length > 0) {
    const { error } = await supabase
      .from('job_sections')
      .upsert(sections, {
        onConflict: 'job_id,section_name'
      })

    if (error) {
      console.error('Error inserting report sections:', error)
    }
  }

  return sections
}

async function createPropertyAssessment(reportData: CompleteReportData, jobId: string, propertyId: string) {
  const { data: assessment, error } = await supabase
    .from('property_assessments')
    .insert({
      job_id: jobId,
      property_id: propertyId,
      assessment_type: 'commercial_valuation',
      property_address: reportData.propertyDetails?.address,
      assessment_data: {
        executive_summary: reportData.executiveSummary,
        property_details: reportData.propertyDetails,
        legal_planning: reportData.legalAndPlanning,
        financial_data: reportData.financialData,
        valuation_details: reportData.valuationDetails,
        market_value: reportData.financialData?.marketValue || reportData.valuationDetails?.marketValue,
        inspection_date: reportData.executiveSummary?.inspectionDate || reportData.valuationDetails?.inspectionDate,
        valuation_date: reportData.executiveSummary?.valuationDate || reportData.valuationDetails?.valuationDate
      },
      status: 'completed',
      confidence_score: 95,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating property assessment:', error)
    throw error
  }

  return assessment.id
}

// Helper functions
function extractSuburb(address: string): string {
  const parts = address.split(' ')
  const stateIndex = parts.findIndex(part => ['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'].includes(part.toUpperCase()))
  if (stateIndex > 0) {
    return parts[stateIndex - 2] || 'Unknown'
  }
  return 'Unknown'
}

function extractState(address: string): string {
  const stateMatch = address.match(/\b(VIC|NSW|QLD|SA|WA|TAS|NT|ACT)\b/i)
  return stateMatch ? stateMatch[1].toUpperCase() : 'VIC'
}

function extractPostcode(address: string): string {
  const postcodeMatch = address.match(/\b(\d{4})\b/)
  return postcodeMatch ? postcodeMatch[1] : '0000'
}