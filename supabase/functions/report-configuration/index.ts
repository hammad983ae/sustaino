import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from "../_shared/cors.ts"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { jobId, sections } = await req.json()
    
    if (!jobId) {
      return new Response(
        JSON.stringify({ error: 'Missing jobId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (req.method === 'GET') {
      // Get existing configuration
      const { data: config, error } = await supabase
        .from('report_configurations')
        .select(`
          *,
          report_sections (*)
        `)
        .eq('job_id', jobId)
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (!config) {
        // Create default configuration
        const { data: newConfig, error: createError } = await supabase
          .rpc('create_default_report_config', {
            p_job_id: jobId,
            p_user_id: user.id
          })

        if (createError) throw createError

        // Fetch the created config
        const { data: createdConfig, error: fetchError } = await supabase
          .from('report_configurations')
          .select(`
            *,
            report_sections (*)
          `)
          .eq('job_id', jobId)
          .eq('user_id', user.id)
          .single()

        if (fetchError) throw fetchError

        return new Response(
          JSON.stringify(createdConfig),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify(config),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (req.method === 'POST') {
      // Update configuration
      if (!sections || !Array.isArray(sections)) {
        return new Response(
          JSON.stringify({ error: 'Missing or invalid sections array' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Get existing config
      const { data: config } = await supabase
        .from('report_configurations')
        .select('id')
        .eq('job_id', jobId)
        .eq('user_id', user.id)
        .single()

      if (!config) {
        return new Response(
          JSON.stringify({ error: 'Configuration not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Update sections
      for (const section of sections) {
        const { error: updateError } = await supabase
          .from('report_sections')
          .update({
            is_included: section.included,
            updated_at: new Date().toISOString()
          })
          .eq('config_id', config.id)
          .eq('section_name', section.name)

        if (updateError) throw updateError
      }

      // Update configuration timestamp
      await supabase
        .from('report_configurations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', config.id)

      return new Response(
        JSON.stringify({ success: true, message: 'Configuration updated successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Report configuration error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})