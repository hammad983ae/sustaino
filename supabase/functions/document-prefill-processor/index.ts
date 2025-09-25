// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from "../_shared/cors.ts"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

interface ExtractedData {
  propertyDetails?: {
    address?: string
    propertyType?: string
    landArea?: number
    buildingArea?: number
    bedrooms?: number
    bathrooms?: number
    carSpaces?: number
    yearBuilt?: string
    zoning?: string
  }
  financialDetails?: {
    purchasePrice?: number
    rentalIncome?: number
    expenses?: number
    marketValue?: number
    councilRates?: number
    insurance?: number
  }
  legalDetails?: {
    title?: string
    lotPlan?: string
    easements?: string[]
    covenants?: string[]
    encumbrances?: string[]
  }
  planningDetails?: {
    zoning?: string
    overlays?: string[]
    permits?: string[]
    restrictions?: string[]
  }
  marketData?: {
    salePrice?: number
    saleDate?: string
    listingPrice?: number
    daysOnMarket?: number
    agentDetails?: string
  }
  tenancyDetails?: {
    currentRent?: number
    leaseExpiry?: string
    tenantType?: string
    bondAmount?: number
    rentReviews?: string
  }
  environmentalData?: {
    energyRating?: string
    waterRating?: string
    sustainabilityFeatures?: string[]
    environmentalRisks?: string[]
  }
  riskFactors?: {
    floodRisk?: string
    bushfireRisk?: string
    geotechnicalRisk?: string
    marketRisk?: string
  }
}

interface DocumentAnalysis {
  documentType: 'contract' | 'title' | 'planning' | 'valuation' | 'inspection' | 'lease' | 'financial' | 'other'
  extractedData: ExtractedData
  confidence: number
  processingNotes: string[]
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { jobId, documents } = await req.json()

    if (!jobId || !documents || !Array.isArray(documents)) {
      throw new Error('Job ID and documents array are required')
    }

    console.log(`Processing ${documents.length} documents for job ${jobId}`)

    const processedDocuments: DocumentAnalysis[] = []
    const consolidatedData: ExtractedData = {}

    // Process each document
    for (const doc of documents) {
      try {
        const analysis = await processDocument(doc)
        processedDocuments.push(analysis)
        
        // Merge extracted data
        consolidatedData = mergeExtractedData(consolidatedData, analysis.extractedData)
      } catch (error) {
        console.error(`Error processing document ${doc.name}:`, error)
        processedDocuments.push({
          documentType: 'other',
          extractedData: {},
          confidence: 0,
          processingNotes: [`Failed to process: ${error.message}`]
        })
      }
    }

    // Update report configuration with extracted data
    await updateReportConfiguration(jobId, consolidatedData)

    // Update job data with consolidated information
    await updateJobData(jobId, consolidatedData)

    console.log('Document prefill processing completed successfully')

    return new Response(JSON.stringify({
      success: true,
      documentsProcessed: processedDocuments.length,
      extractedData: consolidatedData,
      processingDetails: processedDocuments,
      reportUpdated: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Document prefill processor error:', error)
    return new Response(JSON.stringify({
      error: error.message || 'Failed to process documents',
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function processDocument(document: any): Promise<DocumentAnalysis> {
  const { name, url, mimeType, content } = document
  
  console.log(`Processing document: ${name} (${mimeType})`)

  // Determine document type from filename and content
  const documentType = classifyDocument(name, content)
  
  // Extract data based on document type
  const extractedData = await extractDataFromDocument(documentType, content, name)
  
  // Calculate confidence based on extraction success
  const confidence = calculateConfidence(extractedData)
  
  return {
    documentType,
    extractedData,
    confidence,
    processingNotes: [`Processed ${documentType} document`, `Confidence: ${confidence}%`]
  }
}

function classifyDocument(filename: string, content: string): DocumentAnalysis['documentType'] {
  const lowerName = filename.toLowerCase()
  const lowerContent = content.toLowerCase()

  // Contract of Sale
  if (lowerName.includes('contract') || lowerName.includes('sale') || 
      lowerContent.includes('contract of sale') || lowerContent.includes('vendor') || lowerContent.includes('purchaser')) {
    return 'contract'
  }

  // Title documents
  if (lowerName.includes('title') || lowerName.includes('certificate') ||
      lowerContent.includes('certificate of title') || lowerContent.includes('volume') || lowerContent.includes('folio')) {
    return 'title'
  }

  // Planning documents
  if (lowerName.includes('planning') || lowerName.includes('permit') || lowerName.includes('zone') ||
      lowerContent.includes('planning permit') || lowerContent.includes('zoning') || lowerContent.includes('overlay')) {
    return 'planning'
  }

  // Valuation reports
  if (lowerName.includes('valuation') || lowerName.includes('appraisal') ||
      lowerContent.includes('market value') || lowerContent.includes('valuation report')) {
    return 'valuation'
  }

  // Building/Pest inspection
  if (lowerName.includes('inspection') || lowerName.includes('building') || lowerName.includes('pest') ||
      lowerContent.includes('building inspection') || lowerContent.includes('pest inspection')) {
    return 'inspection'
  }

  // Lease agreements
  if (lowerName.includes('lease') || lowerName.includes('tenancy') ||
      lowerContent.includes('lease agreement') || lowerContent.includes('rental') || lowerContent.includes('tenant')) {
    return 'lease'
  }

  // Financial documents
  if (lowerName.includes('financial') || lowerName.includes('statement') || lowerName.includes('rates') ||
      lowerContent.includes('income') || lowerContent.includes('expenses') || lowerContent.includes('council rates')) {
    return 'financial'
  }

  return 'other'
}

async function extractDataFromDocument(docType: DocumentAnalysis['documentType'], content: string, filename: string): Promise<ExtractedData> {
  const extracted: ExtractedData = {}

  switch (docType) {
    case 'contract':
      extracted.propertyDetails = extractPropertyFromContract(content)
      extracted.financialDetails = extractFinancialFromContract(content)
      extracted.legalDetails = extractLegalFromContract(content)
      break

    case 'title':
      extracted.propertyDetails = extractPropertyFromTitle(content)
      extracted.legalDetails = extractLegalFromTitle(content)
      break

    case 'planning':
      extracted.planningDetails = extractPlanningData(content)
      extracted.propertyDetails = extractPropertyFromPlanning(content)
      break

    case 'valuation':
      extracted.propertyDetails = extractPropertyFromValuation(content)
      extracted.financialDetails = extractFinancialFromValuation(content)
      extracted.marketData = extractMarketFromValuation(content)
      break

    case 'lease':
      extracted.tenancyDetails = extractTenancyData(content)
      extracted.propertyDetails = extractPropertyFromLease(content)
      break

    case 'financial':
      extracted.financialDetails = extractFinancialData(content)
      break

    case 'inspection':
      extracted.propertyDetails = extractPropertyFromInspection(content)
      extracted.riskFactors = extractRiskFromInspection(content)
      break
  }

  return extracted
}

// Property extraction functions
function extractPropertyFromContract(content: string) {
  const data: any = {}
  
  // Address extraction
  const addressMatch = content.match(/(?:property|address|situated at)[\s\S]*?([0-9]+[\s\S]*?[A-Z]{2,3}\s+[0-9]{4})/i)
  if (addressMatch) data.address = addressMatch[1].trim()

  // Property type
  if (content.toLowerCase().includes('house')) data.propertyType = 'House'
  else if (content.toLowerCase().includes('unit') || content.toLowerCase().includes('apartment')) data.propertyType = 'Unit'
  else if (content.toLowerCase().includes('townhouse')) data.propertyType = 'Townhouse'

  // Land area
  const landMatch = content.match(/land[^\d]*([0-9,]+\.?[0-9]*)\s*(?:sqm|m2|square metres)/i)
  if (landMatch) data.landArea = parseFloat(landMatch[1].replace(/,/g, ''))

  return data
}

function extractPropertyFromTitle(content: string) {
  const data: any = {}
  
  // Lot and plan
  const lotPlanMatch = content.match(/lot\s+([0-9]+)[^\d]*plan\s+([A-Z0-9]+)/i)
  if (lotPlanMatch) {
    data.lotPlan = `Lot ${lotPlanMatch[1]} Plan ${lotPlanMatch[2]}`
  }

  // Area
  const areaMatch = content.match(/([0-9,]+\.?[0-9]*)\s*(?:sqm|m2|hectares)/i)
  if (areaMatch) data.landArea = parseFloat(areaMatch[1].replace(/,/g, ''))

  return data
}

function extractFinancialFromContract(content: string) {
  const data: any = {}
  
  // Purchase price
  const priceMatch = content.match(/(?:purchase price|price|consideration)[\s\S]*?\$([0-9,]+)/i)
  if (priceMatch) data.purchasePrice = parseFloat(priceMatch[1].replace(/,/g, ''))

  return data
}

function extractLegalFromContract(content: string) {
  const data: any = {}
  
  // Title reference
  const titleMatch = content.match(/(?:certificate of title|title)[\s\S]*?(volume\s+[0-9]+\s+folio\s+[0-9]+)/i)
  if (titleMatch) data.title = titleMatch[1]

  // Easements
  const easements = []
  const easementMatches = content.matchAll(/easement[^\n]*([^\n]+)/gi)
  for (const match of easementMatches) {
    easements.push(match[1].trim())
  }
  if (easements.length > 0) data.easements = easements

  return data
}

function extractPlanningData(content: string) {
  const data: any = {}
  
  // Zoning
  const zoningMatch = content.match(/(?:zone|zoning)[\s\S]*?([A-Z0-9]+)/i)
  if (zoningMatch) data.zoning = zoningMatch[1]

  // Overlays
  const overlays = []
  const overlayMatches = content.matchAll(/overlay[^\n]*([^\n]+)/gi)
  for (const match of overlayMatches) {
    overlays.push(match[1].trim())
  }
  if (overlays.length > 0) data.overlays = overlays

  return data
}

function extractTenancyData(content: string) {
  const data: any = {}
  
  // Current rent
  const rentMatch = content.match(/(?:rent|rental)[\s\S]*?\$([0-9,]+)/i)
  if (rentMatch) data.currentRent = parseFloat(rentMatch[1].replace(/,/g, ''))

  // Lease expiry
  const expiryMatch = content.match(/(?:expiry|expires|term)[\s\S]*?([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})/i)
  if (expiryMatch) data.leaseExpiry = expiryMatch[1]

  return data
}

function mergeExtractedData(existing: ExtractedData, newData: ExtractedData): ExtractedData {
  const merged = { ...existing }

  for (const [category, data] of Object.entries(newData)) {
    if (!merged[category as keyof ExtractedData]) {
      merged[category as keyof ExtractedData] = {}
    }
    
    Object.assign(merged[category as keyof ExtractedData], data)
  }

  return merged
}

async function updateReportConfiguration(jobId: string, extractedData: ExtractedData) {
  // Auto-enable sections based on extracted data
  const sectionsToEnable = []

  if (extractedData.propertyDetails) sectionsToEnable.push('rpdAndLocation', 'propertyDetails')
  if (extractedData.legalDetails || extractedData.planningDetails) sectionsToEnable.push('legalAndPlanning')
  if (extractedData.marketData) sectionsToEnable.push('marketCommentary')
  if (extractedData.tenancyDetails) sectionsToEnable.push('tenancySchedule')
  if (extractedData.environmentalData) sectionsToEnable.push('environmental')
  if (extractedData.riskFactors) sectionsToEnable.push('riskAssessment')

  // Update report configuration
  for (const sectionName of sectionsToEnable) {
    await supabase
      .from('report_sections')
      .update({ 
        included: true,
        updated_at: new Date().toISOString()
      })
      .eq('job_id', jobId)
      .eq('section_name', sectionName)
  }
}

async function updateJobData(jobId: string, extractedData: ExtractedData) {
  // Update the main job record with consolidated data
  const { error } = await supabase
    .from('jobs')
    .update({
      job_data: extractedData,
      updated_at: new Date().toISOString()
    })
    .eq('id', jobId)

  if (error) {
    console.error('Error updating job data:', error)
    throw new Error('Failed to update job with extracted data')
  }
}

function calculateConfidence(extractedData: ExtractedData): number {
  let totalFields = 0
  let filledFields = 0

  for (const category of Object.values(extractedData)) {
    if (typeof category === 'object' && category !== null) {
      for (const [key, value] of Object.entries(category)) {
        totalFields++
        if (value !== null && value !== undefined && value !== '') {
          filledFields++
        }
      }
    }
  }

  return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0
}

// Additional extraction functions for other document types
function extractPropertyFromPlanning(content: string) {
  return extractPropertyFromContract(content) // Reuse common logic
}

function extractPropertyFromValuation(content: string) {
  const data = extractPropertyFromContract(content)
  
  // Building area from valuation
  const buildingMatch = content.match(/building[^\d]*([0-9,]+\.?[0-9]*)\s*(?:sqm|m2)/i)
  if (buildingMatch) data.buildingArea = parseFloat(buildingMatch[1].replace(/,/g, ''))
  
  return data
}

function extractFinancialFromValuation(content: string) {
  const data: any = {}
  
  // Market value
  const valueMatch = content.match(/(?:market value|valuation)[\s\S]*?\$([0-9,]+)/i)
  if (valueMatch) data.marketValue = parseFloat(valueMatch[1].replace(/,/g, ''))
  
  return data
}

function extractMarketFromValuation(content: string) {
  const data: any = {}
  
  // Recent sales
  const salesMatches = content.matchAll(/(?:sale|sold)[\s\S]*?\$([0-9,]+)[\s\S]*?([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})/gi)
  const sales = []
  for (const match of salesMatches) {
    sales.push({
      salePrice: parseFloat(match[1].replace(/,/g, '')),
      saleDate: match[2]
    })
  }
  if (sales.length > 0) data.comparableSales = sales
  
  return data
}

function extractPropertyFromLease(content: string) {
  return extractPropertyFromContract(content) // Reuse common logic
}

function extractPropertyFromInspection(content: string) {
  const data = extractPropertyFromContract(content)
  
  // Additional inspection-specific details
  const bedroomMatch = content.match(/([0-9]+)\s*bedroom/i)
  if (bedroomMatch) data.bedrooms = parseInt(bedroomMatch[1])
  
  const bathroomMatch = content.match(/([0-9]+)\s*bathroom/i)
  if (bathroomMatch) data.bathrooms = parseInt(bathroomMatch[1])
  
  return data
}

function extractFinancialData(content: string) {
  const data: any = {}
  
  // Council rates
  const ratesMatch = content.match(/(?:council rates|rates)[\s\S]*?\$([0-9,]+)/i)
  if (ratesMatch) data.councilRates = parseFloat(ratesMatch[1].replace(/,/g, ''))
  
  // Insurance
  const insuranceMatch = content.match(/insurance[\s\S]*?\$([0-9,]+)/i)
  if (insuranceMatch) data.insurance = parseFloat(insuranceMatch[1].replace(/,/g, ''))
  
  return data
}

function extractRiskFromInspection(content: string) {
  const data: any = {}
  
  if (content.toLowerCase().includes('termite') || content.toLowerCase().includes('pest')) {
    data.pestRisk = 'detected'
  }
  
  if (content.toLowerCase().includes('structural') && content.toLowerCase().includes('damage')) {
    data.structuralRisk = 'detected'
  }
  
  return data
}

function extractLegalFromTitle(content: string) {
  const data: any = {}
  
  // Volume and folio
  const titleMatch = content.match(/(volume\s+[0-9]+\s+folio\s+[0-9]+)/i)
  if (titleMatch) data.title = titleMatch[1]
  
  return data
}