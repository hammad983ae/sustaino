// @ts-nocheck
import { serve } from "https://deno.land/std@0.170.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { getErrorMessage } from '../_shared/error-handler.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { job_id, reviewed } = await req.json()

    if (!job_id) {
      return new Response(JSON.stringify({ error: "Missing job_id" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Fetch assessment record
    const { data: assessment, error } = await supabase
      .from("property_assessments")
      .select("*")
      .eq("job_id", job_id)
      .single()

    if (error || !assessment) {
      return new Response(JSON.stringify({ error: "Assessment not found" }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Apply include_flags
    const includeFlags = assessment.include_flags || {}
    const reportData = {}
    for (const key of [
      "report_type",
      "valuation_purpose", 
      "ocr_results",
      "comparables",
      "market_analysis"
    ]) {
      if (includeFlags[key] ?? true) {
        reportData[key] = assessment[key]
      }
    }

    // Get branding
    const branding = assessment.branding || {}
    const company = branding.company || "Property Valuations"

    // Build report content
    let content = `${company.toUpperCase()}\n\n`
    content += `PROPERTY VALUATION REPORT\n\n`
    content += `Job ID: ${job_id}\n`
    content += `Reviewed: ${reviewed}\n`
    content += `Generated: ${new Date().toLocaleDateString()}\n\n`

    if (reportData.report_type) {
      content += `Report Type: ${reportData.report_type}\n\n`
    }

    if (reportData.valuation_purpose) {
      content += `Valuation Purpose: ${reportData.valuation_purpose}\n\n`
    }

    if (reportData.ocr_results) {
      content += `OCR Extracted Text:\n${reportData.ocr_results}\n\n`
    }

    // Fetch property photos
    const { data: files } = await supabase.storage
      .from("property-images")
      .list(`${assessment.user_id}/job_${job_id}`, { limit: 50 })

    if (files && files.length > 0) {
      content += `Property Photos:\n`
      for (const file of files) {
        if (file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
          content += `- ${file.name}\n`
        }
      }
      content += `\n`
    }

    const encoder = new TextEncoder()
    const reportBytes = encoder.encode(content)

    // Save to storage
    const reportPath = `reports/${assessment.user_id}/job_${job_id}.txt`

    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(reportPath, reportBytes, {
        contentType: "text/plain",
        upsert: true,
      })

    if (uploadError) {
      return new Response(JSON.stringify({ error: uploadError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Create signed URL
    const { data: signedUrl } = await supabase.storage
      .from("property-images")
      .createSignedUrl(reportPath, 60 * 60 * 24) // 24h link

    // Update DB
    await supabase
      .from("property_assessments")
      .update({
        reviewed,
        report_url: signedUrl?.signedUrl || null,
      })
      .eq("job_id", job_id)

    return new Response(
      JSON.stringify({ 
        success: true,
        report_url: signedUrl?.signedUrl 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: getErrorMessage(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})