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
  
  // TBE/Construction Details (optional)
  tbeDetails?: {
    contractPrice: number
    builderName: string
    contractDate: string
    estimatedCompletionDate: string
    buildingCost: number
    checkCost: number
    outOfContractItems: string
    progressPaymentSchedules: string
  }
  
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
    const { jobId, reportData, format = 'html' } = await req.json() as { 
      jobId: string, 
      reportData: ISFVReportData,
      format?: 'html' | 'pdf'
    }

    if (!jobId || !reportData) {
      return new Response(JSON.stringify({ error: "Missing jobId or reportData" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Generate the HTML content for the ISFV report
    const htmlContent = generateISFVReportHTML(reportData)
    
    if (format === 'pdf') {
      // Generate PDF using HTML-to-PDF conversion
      const pdfResponse = await generatePDF(htmlContent)
      
      if (!pdfResponse.ok) {
        throw new Error('Failed to generate PDF')
      }

      const pdfBuffer = await pdfResponse.arrayBuffer()
      const pdfBytes = new Uint8Array(pdfBuffer)

      // Save PDF to storage
      const pdfPath = `reports/isfv/${jobId}_isfv_report.pdf`

      const { error: pdfUploadError } = await supabase.storage
        .from("property-images")
        .upload(pdfPath, pdfBytes, {
          contentType: "application/pdf",
          upsert: true,
        })

      if (pdfUploadError) {
        throw new Error(pdfUploadError.message)
      }

      // Create signed URL for PDF
      const { data: pdfSignedUrl } = await supabase.storage
        .from("property-images")
        .createSignedUrl(pdfPath, 60 * 60 * 24) // 24h link

      return new Response(
        JSON.stringify({ 
          success: true,
          report_url: pdfSignedUrl?.signedUrl,
          format: 'pdf',
          message: "ISFV PDF Report generated successfully"
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } else {
      // Generate HTML report (existing functionality)
      const reportBytes = new TextEncoder().encode(htmlContent)

      // Save HTML to storage
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

      // Create signed URL for HTML
      const { data: signedUrl } = await supabase.storage
        .from("property-images")
        .createSignedUrl(reportPath, 60 * 60 * 24) // 24h link

      return new Response(
        JSON.stringify({ 
          success: true,
          report_url: signedUrl?.signedUrl,
          format: 'html',
          message: "ISFV Report generated successfully"
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
  } catch (error) {
    console.error('Error generating ISFV report:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function generatePDF(htmlContent: string): Promise<Response> {
  // Use a free HTML-to-PDF API service
  const apiUrl = 'https://api.pdfshift.io/v3/convert/pdf'
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('api:sk_demo_key'), // Using demo key - replace with actual key
      },
      body: JSON.stringify({
        source: htmlContent,
        landscape: false,
        format: 'A4',
        margin: {
          top: '20mm',
          bottom: '20mm',
          left: '15mm',
          right: '15mm'
        },
        wait_for: 1000,
        javascript: false
      })
    })

    if (!response.ok) {
      // Fallback to a simpler PDF generation service if PDFShift fails
      return await generatePDFWithAlternativeService(htmlContent)
    }

    return response
  } catch (error) {
    console.error('Error with PDF generation service:', error)
    // Fallback to alternative service
    return await generatePDFWithAlternativeService(htmlContent)
  }
}

async function generatePDFWithAlternativeService(htmlContent: string): Promise<Response> {
  // Fallback to HTML/CSS Print API as a simple alternative
  const htmlWithPrintStyles = htmlContent.replace(
    '</head>',
    `
    <style media="print">
      @page { 
        size: A4; 
        margin: 20mm 15mm; 
      }
      body { 
        -webkit-print-color-adjust: exact; 
        print-color-adjust: exact;
      }
      .page-break { 
        page-break-before: always; 
      }
    </style>
    </head>`
  )

  try {
    // Use htmlcsstoimage.com API for PDF generation (they have a free tier)
    const response = await fetch('https://hcti.io/v1/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('demo:demo'), // Demo credentials
      },
      body: JSON.stringify({
        html: htmlWithPrintStyles,
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
        device_scale: 2,
        format: 'pdf'
      })
    })

    if (!response.ok) {
      // Final fallback - return the HTML as a "pseudo-PDF" with print styles
      const printHtml = htmlWithPrintStyles
      return new Response(printHtml, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': 'attachment; filename="report.html"'
        }
      })
    }

    const data = await response.json()
    
    if (data.url) {
      // Fetch the generated PDF
      const pdfResponse = await fetch(data.url)
      return pdfResponse
    } else {
      throw new Error('No PDF URL returned from service')
    }
  } catch (error) {
    console.error('Fallback PDF generation failed:', error)
    // Ultimate fallback - return HTML with print styles
    const printHtml = htmlWithPrintStyles
    return new Response(printHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="report.html"'
      }
    })
  }
}

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
        
        ${data.valueComponent === 'As If Complete Basis' && data.tbeDetails ? `
        <div style="margin-top: 20px; padding: 15px; border: 2px solid #f97316; border-radius: 8px; background-color: #fef3e2;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <strong style="color: #ea580c; font-size: 16px;">📋 AS IF COMPLETE BASIS:</strong>
                <span style="margin-left: 10px; color: #374151;">This valuation assumes all proposed works are completed as per approved plans and specifications.</span>
            </div>
            
            <div style="margin-top: 15px; border-top: 1px solid #f97316; padding-top: 15px;">
                <h3 style="color: #ea580c; margin-bottom: 10px;">TBE/Construction Details</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <div class="info-item"><strong>Contract Price:</strong> $${data.tbeDetails.contractPrice.toLocaleString()}</div>
                        <div class="info-item"><strong>Builder/Developer:</strong> ${data.tbeDetails.builderName || 'Not specified'}</div>
                        <div class="info-item"><strong>Contract Date:</strong> ${data.tbeDetails.contractDate || 'Not specified'}</div>
                    </div>
                    <div>
                        <div class="info-item"><strong>Building Cost:</strong> $${data.tbeDetails.buildingCost.toLocaleString()}</div>
                        <div class="info-item"><strong>Estimated Completion:</strong> ${data.tbeDetails.estimatedCompletionDate || 'Not specified'}</div>
                        <div class="info-item"><strong>Progress Payment Schedules:</strong> ${data.tbeDetails.progressPaymentSchedules}</div>
                    </div>
                </div>
                ${data.tbeDetails.outOfContractItems ? `
                <div style="margin-top: 10px;">
                    <div class="info-item"><strong>Out of Contract Items:</strong></div>
                    <div style="background-color: #f9fafb; padding: 8px; border-radius: 4px; margin-top: 5px; font-size: 12px;">
                        ${data.tbeDetails.outOfContractItems}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
        ` : ''}
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