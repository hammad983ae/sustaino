import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { job_id, reviewed = false, assessment_data, include_flags } = await req.json()
    
    if (!job_id) {
      return new Response(
        JSON.stringify({ error: 'job_id is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log(`Generating report for job: ${job_id}, reviewed: ${reviewed}`)

    // Filter data based on include_flags
    const filterIncluded = (data: any, flags: Record<string, boolean>) => {
      const filtered: Record<string, any> = {}
      const includeFlags = flags || {}
      
      for (const [key, value] of Object.entries(data)) {
        if (['include_flags', 'report_url'].includes(key)) continue
        if (includeFlags[key] === false) continue // exclude if explicitly false
        filtered[key] = value
      }
      
      return filtered
    }

    // Apply filtering if include_flags provided
    const reportData = include_flags ? filterIncluded(assessment_data, include_flags) : assessment_data

    // Generate simple report content
    const generateReportContent = (data: any) => {
      let content = 'PROPERTY ASSESSMENT REPORT\\n\\n'
      content += `Generated: ${new Date().toISOString()}\\n`
      content += `Job ID: ${job_id}\\n`
      content += `Status: ${reviewed ? 'Reviewed' : 'Automated'}\\n\\n`
      
      // Add report data sections
      if (data.reportData?.reportConfig) {
        content += 'REPORT CONFIGURATION\\n'
        content += `Report Type: ${data.reportData.reportConfig.reportType || 'Not specified'}\\n`
        content += `Valuation Purpose: ${data.reportData.reportConfig.valuationPurpose || 'Not specified'}\\n`
        content += `Property Type: ${data.reportData.reportConfig.propertyType || 'Not specified'}\\n`
        content += `Basis of Valuation: ${data.reportData.reportConfig.basisOfValuation || 'Not specified'}\\n\\n`
      }
      
      // Add OCR results if included
      if (data.ocrResults && include_flags?.ocrResults !== false) {
        content += 'OCR EXTRACTED INFORMATION\\n'
        content += `${data.ocrResults}\\n\\n`
      }
      
      // Add address data
      if (data.addressData) {
        content += 'PROPERTY ADDRESS\\n'
        content += `${data.addressData.address || 'Not specified'}\\n\\n`
      }

      return content
    }

    const reportContent = generateReportContent(reportData)
    
    // Create simple text file (in production, you'd generate a proper PDF)
    const encoder = new TextEncoder()
    const reportBuffer = encoder.encode(reportContent)
    
    // Upload to Supabase storage
    const fileName = `reports/assessment_${job_id}_${Date.now()}.txt`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('evidence-uploads')
      .upload(fileName, reportBuffer, {
        contentType: 'text/plain',
        upsert: true
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return new Response(
        JSON.stringify({ error: `Upload failed: ${uploadError.message}` }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('evidence-uploads')
      .getPublicUrl(fileName)

    const reportUrl = urlData.publicUrl

    console.log(`Report generated successfully: ${reportUrl}`)

    return new Response(
      JSON.stringify({ 
        success: true,
        report_url: reportUrl,
        reviewed: reviewed
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error generating report:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})