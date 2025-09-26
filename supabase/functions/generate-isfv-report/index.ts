import { serve } from "https://deno.land/std@0.170.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

interface ISFVReportData {
  propertyAddress: string
  instructedBy: string
  lender: string
  contact: string
  loanRefNo: string
  clientRefNo: string
  valuersRefNo: string
  borrower: string
  
  // Property Summary
  titleSearchSighted: boolean
  realPropertyDescription: string
  encumbrancesRestrictions: string
  siteDimensions: string
  siteArea: string
  zoning: string
  currentUse: string
  localGovernmentArea: string
  mainDwelling: string
  builtAbout: string
  additions: string
  livingArea: number
  outdoorArea: number
  otherArea: number
  carAccommodation: number
  carAreas: number
  marketability: string
  heritageIssues: boolean
  environmentalIssues: boolean
  essentialRepairs: boolean
  estimatedCost: string
  
  // Land & Dwelling Details
  propertyIdentification: {
    aerialMapping: boolean
    physicalInspection: boolean
    cadastralMap: boolean
  }
  zoningEffect: string
  location: {
    distanceFromCapitalCity: string
    distanceFromRegionalCentre: string
  }
  neighbourhood: {
    surroundingProperties: string
    positiveInfrastructure: string
    negativeInfrastructure: string
  }
  siteAccess: {
    frontage: string
    side: string
    frontageDistance: string
    streetSide: string
    dwellingOrientation: string
    streetSystem: string
    footpaths: string
    accessLevel: string
  }
  services: {
    mainServices: boolean
    septic: boolean
    nbn: boolean
    solar: boolean
    gas: boolean
    electricity: boolean
    water: boolean
    sewer: boolean
  }
  
  // Risk Analysis
  propertyRiskRatings: {
    locationNeighbourhood: number
    landPlanningTitle: number
    environmentalIssues: number
    improvements: number
  }
  marketRiskRatings: {
    recentMarketDirection: number
    marketActivity: number
    localRegionalEconomyImpact: number
    marketSegmentConditions: number
  }
  
  // Valuation Summary
  interestValued: string
  valueComponent: string
  rentalAssessment: number
  insuranceEstimate: number
  landValue: number
  improvementsValue: number
  marketValue: number
  
  // Professional Details
  valuationFirm: string
  valuer: string
  apiNumber: string
  inspectionDate: string
  issueDate: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { jobId, reportData } = await req.json() as { jobId: string, reportData: ISFVReportData }

    if (!jobId || !reportData) {
      return new Response(JSON.stringify({ error: "Missing jobId or reportData" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Generate the HTML content for the ISFV report
    const htmlContent = generateISFVReportHTML(reportData)
    
    // For now, we'll return the HTML content. In a production setup, 
    // you would convert this to PDF using a service like Puppeteer
    const reportBytes = new TextEncoder().encode(htmlContent)

    // Save to storage
    const reportPath = `reports/isfv/${jobId}_isfv_report.html`

    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(reportPath, reportBytes, {
        contentType: "text/html",
        upsert: true,
      })

    if (uploadError) {
      throw new Error(uploadError.message)
    }

    // Create signed URL
    const { data: signedUrl } = await supabase.storage
      .from("property-images")
      .createSignedUrl(reportPath, 60 * 60 * 24) // 24h link

    return new Response(
      JSON.stringify({ 
        success: true,
        report_url: signedUrl?.signedUrl,
        message: "ISFV Report generated successfully"
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error generating ISFV report:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

function generateISFVReportHTML(data: ISFVReportData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ISFV Report - ${data.propertyAddress}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
        .info-item { margin-bottom: 8px; }
        .info-item strong { color: #374151; }
        .risk-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .risk-table th, .risk-table td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
        .risk-table th { background-color: #f3f4f6; }
        .rating-cell { text-align: center; }
        .valuation-summary { background-color: #f8fafc; padding: 20px; border-radius: 8px; }
        .market-value { font-size: 24px; font-weight: bold; color: #059669; text-align: center; }
        .signature-section { margin-top: 40px; border-top: 1px solid #d1d5db; padding-top: 20px; }
        .page-break { page-break-before: always; }
    </style>
</head>
<body>
    <div class="header">
        <h1>AUSTRALIAN PROPERTY INSTITUTE</h1>
        <h2>API RESIDENTIAL VALUATION & SECURITY ASSESSMENT Pro-Forma Report</h2>
        <p>Page 1 of 1</p>
    </div>

    <div class="info-grid">
        <div>
            <div class="info-item"><strong>Instructed By:</strong> ${data.instructedBy}</div>
            <div class="info-item"><strong>Lender:</strong> ${data.lender}</div>
            <div class="info-item"><strong>Contact:</strong> ${data.contact}</div>
            <div class="info-item"><strong>Loan Ref No:</strong> ${data.loanRefNo}</div>
        </div>
        <div>
            <div class="info-item"><strong>Client Ref No:</strong> ${data.clientRefNo}</div>
            <div class="info-item"><strong>Valuer Ref No:</strong> ${data.valuersRefNo}</div>
            <div class="info-item"><strong>Borrower:</strong> ${data.borrower}</div>
        </div>
    </div>

    <div class="section">
        <h2>1. PROPERTY SUMMARY - HOUSE</h2>
        <div class="info-item"><strong>Property Address:</strong> ${data.propertyAddress}</div>
        <div class="info-item"><strong>Title Search Sighted?</strong> ${data.titleSearchSighted ? 'Yes' : 'No'}</div>
        <div class="info-item"><strong>Real Property Description:</strong> ${data.realPropertyDescription}</div>
        <div class="info-item"><strong>Encumbrances/Restrictions:</strong> ${data.encumbrancesRestrictions}</div>
        <div class="info-item"><strong>Site Dimensions:</strong> ${data.siteDimensions}</div>
        <div class="info-item"><strong>Site Area:</strong> ${data.siteArea}</div>
        <div class="info-item"><strong>Zoning:</strong> ${data.zoning}</div>
        <div class="info-item"><strong>Current Use:</strong> ${data.currentUse}</div>
        <div class="info-item"><strong>LGA:</strong> ${data.localGovernmentArea}</div>
        <div class="info-item"><strong>Main Dwelling:</strong> ${data.mainDwelling}</div>
        <div class="info-item"><strong>Built About:</strong> ${data.builtAbout}</div>
        <div class="info-item"><strong>Additions:</strong> ${data.additions}</div>
        
        <table style="width: 100%; margin: 15px 0;">
            <tr>
                <td><strong>Areas:</strong></td>
                <td><strong>Living:</strong> ${data.livingArea.toFixed(2)} Sqm</td>
                <td><strong>Outdoor:</strong> ${data.outdoorArea.toFixed(2)} Sqm</td>
                <td><strong>Other:</strong> ${data.otherArea.toFixed(2)} Sqm</td>
            </tr>
            <tr>
                <td><strong>Car Accommodation:</strong> ${data.carAccommodation}</td>
                <td><strong>Car Areas:</strong> ${data.carAreas.toFixed(2)} Sqm</td>
                <td></td>
                <td></td>
            </tr>
        </table>

        <div class="info-item"><strong>Marketability:</strong> ${data.marketability}</div>
        <div class="info-item"><strong>Heritage Issues:</strong> ${data.heritageIssues ? 'Yes' : 'No'}</div>
        <div class="info-item"><strong>Environmental Issues:</strong> ${data.environmentalIssues ? 'Yes' : 'No'}</div>
        <div class="info-item"><strong>Essential Repairs:</strong> ${data.essentialRepairs ? 'Yes' : 'No'}</div>
        <div class="info-item"><strong>Estimated Cost:</strong> ${data.estimatedCost}</div>
    </div>

    <div class="section">
        <h2>2. RISK ANALYSIS</h2>
        
        <h3>Property Risk Ratings</h3>
        <table class="risk-table">
            <thead>
                <tr>
                    <th></th>
                    <th class="rating-cell">1</th>
                    <th class="rating-cell">2</th>
                    <th class="rating-cell">3</th>
                    <th class="rating-cell">4</th>
                    <th class="rating-cell">5</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Location / Neighbourhood:</td>
                    ${generateRatingCells(data.propertyRiskRatings.locationNeighbourhood)}
                </tr>
                <tr>
                    <td>Land (Incl. planning, Title):</td>
                    ${generateRatingCells(data.propertyRiskRatings.landPlanningTitle)}
                </tr>
                <tr>
                    <td>Environmental Issues:</td>
                    ${generateRatingCells(data.propertyRiskRatings.environmentalIssues)}
                </tr>
                <tr>
                    <td>Improvements:</td>
                    ${generateRatingCells(data.propertyRiskRatings.improvements)}
                </tr>
            </tbody>
        </table>

        <h3>Market Risk Ratings</h3>
        <table class="risk-table">
            <thead>
                <tr>
                    <th></th>
                    <th class="rating-cell">1</th>
                    <th class="rating-cell">2</th>
                    <th class="rating-cell">3</th>
                    <th class="rating-cell">4</th>
                    <th class="rating-cell">5</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Recent Market Direction (price):</td>
                    ${generateRatingCells(data.marketRiskRatings.recentMarketDirection)}
                </tr>
                <tr>
                    <td>Market Activity:</td>
                    ${generateRatingCells(data.marketRiskRatings.marketActivity)}
                </tr>
                <tr>
                    <td>Local/Regional Economy Impact:</td>
                    ${generateRatingCells(data.marketRiskRatings.localRegionalEconomyImpact)}
                </tr>
                <tr>
                    <td>Market Segment Conditions:</td>
                    ${generateRatingCells(data.marketRiskRatings.marketSegmentConditions)}
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>3. VALUATION SUMMARY</h2>
        <div class="valuation-summary">
            <div class="info-item"><strong>Interest Valued:</strong> ${data.interestValued}</div>
            <div class="info-item"><strong>Value Component:</strong> ${data.valueComponent}</div>
            <div class="info-item"><strong>Rental Assessment Unfurnished:</strong> $${data.rentalAssessment.toLocaleString()} Per week</div>
            <div class="info-item"><strong>Insurance Estimate:</strong> $${data.insuranceEstimate.toLocaleString()}</div>
            <div class="info-item"><strong>Land:</strong> $${data.landValue.toLocaleString()}</div>
            <div class="info-item"><strong>Improvements:</strong> $${data.improvementsValue.toLocaleString()}</div>
            
            <div class="market-value">
                MARKET VALUE: $${data.marketValue.toLocaleString()} (${numberToWords(data.marketValue)} dollars)
            </div>
        </div>
    </div>

    <div class="signature-section">
        <div class="info-item"><strong>Valuation Firm:</strong> ${data.valuationFirm}</div>
        <div class="info-item"><strong>Inspection/Valuation Date:</strong> ${data.inspectionDate}</div>
        <div class="info-item"><strong>Date of Issue:</strong> ${data.issueDate}</div>
        <div class="info-item"><strong>Valuer:</strong> ${data.valuer}</div>
        <div class="info-item"><strong>API No:</strong> ${data.apiNumber}</div>
        
        <p style="margin-top: 20px; font-size: 12px; line-height: 1.3;">
            <strong>Valuer Declaration:</strong> I hereby certify that I personally inspected the property on the date below and have carried out the assessments above as at that date. Neither I, nor to the best of my knowledge, any member of this firm, has any conflict of interest, or direct, indirect or financial interest in relation to this property that is not disclosed herein.
        </p>
        
        <p style="font-size: 12px; line-height: 1.3;">
            This Report is for the use only of the party named above as the Lender for first mortgage purposes only, and is not to be used for any other purpose by any other party.
        </p>
        
        <p style="text-align: center; margin-top: 30px; font-style: italic;">
            Powered by Instant Short Form Valuation (ISFV) System
        </p>
    </div>
</body>
</html>
  `
}

function generateRatingCells(rating: number): string {
  let cells = ''
  for (let i = 1; i <= 5; i++) {
    cells += `<td class="rating-cell">${i === rating ? '●' : ''}</td>`
  }
  return cells
}

function numberToWords(num: number): string {
  // Simple number to words conversion for the market value
  // This is a basic implementation - you may want to use a more comprehensive library
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  
  if (num >= 1000000) {
    const millions = Math.floor(num / 1000000)
    const remainder = num % 1000000
    let result = ones[millions] + ' Million'
    if (remainder >= 1000) {
      const thousands = Math.floor(remainder / 1000)
      result += ' ' + ones[thousands] + ' Thousand'
    }
    return result
  }
  
  return 'Value conversion needed'
}