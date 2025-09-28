import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DomainAPIConfig {
  baseUrl: string
  clientId: string
  clientSecret: string
  tokenUrl: string
}

interface SalesEvidenceData {
  property_address: string
  sale_date?: string
  sale_price?: number
  property_type?: string
  bedrooms?: number
  bathrooms?: number
  car_spaces?: number
  land_area?: number
  building_area?: number
  sale_method?: string
  vendor_type?: string
  settlement_period?: number
  conditions?: string
  agent_name?: string
  agent_commission?: number
  suburb?: string
  state?: string
  postcode?: string
  latitude?: number
  longitude?: number
  days_on_market?: number
  listing_price?: number
  price_per_sqm?: number
  source_url?: string
  notes?: string
  images?: any[]
}

interface LeasingEvidenceData {
  property_address: string
  lease_start_date?: string
  lease_end_date?: string
  rental_amount: number
  bond_amount?: number
  property_type?: string
  bedrooms?: number
  bathrooms?: number
  car_spaces?: number
  land_area?: number
  building_area?: number
  latitude?: number
  longitude?: number
  furnished?: boolean
  pets_allowed?: boolean
  utilities_included?: any[]
  days_to_lease?: number
  listing_rent?: number
  rent_per_sqm?: number
  yield_calculation?: number
  rental_period?: string
  suburb?: string
  state?: string
  postcode?: string
  lease_type?: string
  tenant_type?: string
  source_url?: string
  notes?: string
  images?: any[]
}

// Get Domain API configuration from secrets
async function getDomainConfig(): Promise<DomainAPIConfig> {
  return {
    baseUrl: Deno.env.get('DOMAIN_BASE_URL') || 'https://api.domain.com.au',
    clientId: Deno.env.get('DOMAIN_CLIENT_ID') || '',
    clientSecret: Deno.env.get('DOMAIN_CLIENT_SECRET') || '',
    tokenUrl: Deno.env.get('DOMAIN_TOKEN_URL') || 'https://auth.domain.com.au/v1/connect/token'
  }
}

// Get access token for Domain API
async function getAccessToken(config: DomainAPIConfig): Promise<string> {
  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      scope: 'api_properties_read api_listings_read'
    })
  })

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status}`)
  }

  const data = await response.json()
  return data.access_token
}

// Make authenticated request to Domain API
async function domainRequest(path: string, token: string, config: DomainAPIConfig, options: any = {}) {
  const url = `${config.baseUrl}${path}`
  
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  })

  if (!response.ok) {
    throw new Error(`Domain API request failed: ${response.status}`)
  }

  return await response.json()
}

// Transform Domain listing data to sales evidence format
function transformToSalesEvidence(listing: any, sourceUrl?: string): Partial<SalesEvidenceData> {
  return {
    property_address: listing.address || listing.propertyAddress || '',
    sale_date: listing.saleDate || listing.soldDate,
    sale_price: listing.salePrice || listing.price,
    property_type: listing.propertyType,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    car_spaces: listing.carspaces || listing.parking,
    land_area: listing.landArea,
    building_area: listing.buildingArea,
    sale_method: listing.saleMethod,
    suburb: listing.suburb,
    state: listing.state,
    postcode: listing.postcode,
    latitude: listing.latitude,
    longitude: listing.longitude,
    days_on_market: listing.daysOnMarket,
    listing_price: listing.listingPrice,
    price_per_sqm: listing.pricePerSqm,
    // data_source: 'Domain API', // Removed: not in SalesEvidenceData type
    source_url: sourceUrl,
    // extraction_date: new Date().toISOString(), // Removed: not in SalesEvidenceData type
    // data_quality_score: 85, // Removed: not in SalesEvidenceData type
    // verification_status: 'verified', // Removed: not in SalesEvidenceData type
    images: listing.images || []
  }
}

// Transform Domain listing data to leasing evidence format
function transformToLeasingEvidence(listing: any, sourceUrl?: string): Partial<LeasingEvidenceData> {
  return {
    property_address: listing.address || listing.propertyAddress || '',
    lease_start_date: listing.availableDate || listing.leaseStartDate,
    rental_amount: listing.rent || listing.rentalAmount || 0,
    bond_amount: listing.bond,
    property_type: listing.propertyType,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    car_spaces: listing.carspaces || listing.parking,
    land_area: listing.landArea,
    building_area: listing.buildingArea,
    latitude: listing.latitude,
    longitude: listing.longitude,
    furnished: listing.furnished || false,
    pets_allowed: listing.petsAllowed || false,
    utilities_included: listing.utilitiesIncluded || [],
    listing_rent: listing.rent,
    rental_period: listing.rentalPeriod || 'weekly',
    suburb: listing.suburb,
    state: listing.state,
    postcode: listing.postcode,
    lease_type: listing.leaseType,
    tenant_type: listing.tenantType,
    // data_source: 'Domain API', // Removed: not in LeasingEvidenceData type
    source_url: sourceUrl,
    // extraction_date: new Date().toISOString(), // Removed: not in LeasingEvidenceData type
    // data_quality_score: 85, // Removed: not in LeasingEvidenceData type
    // verification_status: 'verified', // Removed: not in LeasingEvidenceData type
    images: listing.images || []
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get user from request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    const url = new URL(req.url)
    const path = url.pathname.replace('/functions/v1/domain-integration', '')
    
    // Get Domain API configuration
    const config = await getDomainConfig()
    
    // Check if Domain integration is enabled
    const useFeature = Deno.env.get('FEATURE_USE_DOMAIN')
    if (useFeature !== 'true') {
      return new Response(
        JSON.stringify({ error: 'Domain integration is disabled' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get access token
    const token = await getAccessToken(config)

    if (req.method === 'POST') {
      const body = await req.json()
      
      // Handle direct function calls (without path routing)
      if (!path || path === '/') {
        if (body.terms) {
          // Property suggestions
          const { terms, options = {} } = body
          const params = new URLSearchParams({
            terms: terms,
            pageSize: String(options.pageSize || 20),
            channel: options.channel || 'All'
          })

          const response = await domainRequest(`/v1/properties/_suggest?${params.toString()}`, token, config)
          
          // Transform response to match expected format
          const transformedData = response.map((property: any) => ({
            id: property.id,
            address: property.address,
            addressComponents: property.addressComponents,
            relativeScore: property.relativeScore,
            normalized: {
              unitNumber: property.addressComponents?.unitNumber || '',
              streetNumber: property.addressComponents?.streetNumber || '',
              streetName: property.addressComponents?.streetName || '',
              streetType: property.addressComponents?.streetType || '',
              streetTypeLong: property.addressComponents?.streetTypeLong || '',
              suburb: property.addressComponents?.suburb || '',
              postcode: property.addressComponents?.postcode || property.addressComponents?.postCode || '',
              state: property.addressComponents?.state || '',
              fullAddress: property.address
            }
          }))
          
          return new Response(JSON.stringify({ success: true, data: transformedData }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        } else if (body.propertyId) {
          // Property details
          const response = await domainRequest(`/v1/properties/${body.propertyId}`, token, config)
          
          return new Response(JSON.stringify({ success: true, data: response }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }
      }

      switch (path) {
        case '/proxy': {
          // Forward request to Domain API
          const apiPath = body.path
          const response = await domainRequest(apiPath, token, config, {
            method: body.method || 'GET',
            query: body.query,
            body: body.body
          })
          
          return new Response(JSON.stringify(response), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        case '/suggest': {
          // Property suggestions endpoint
          const { terms, options = {} } = body
          const params = new URLSearchParams({
            terms: terms,
            pageSize: String(options.pageSize || 20),
            channel: options.channel || 'All'
          })

          const response = await domainRequest(`/v1/properties/_suggest?${params.toString()}`, token, config)
          
          // Transform response to match expected format
          const transformedData = response.map((property: any) => ({
            id: property.id,
            address: property.address,
            addressComponents: property.addressComponents,
            relativeScore: property.relativeScore,
            normalized: {
              unitNumber: property.addressComponents?.unitNumber || '',
              streetNumber: property.addressComponents?.streetNumber || '',
              streetName: property.addressComponents?.streetName || '',
              streetType: property.addressComponents?.streetType || '',
              streetTypeLong: property.addressComponents?.streetTypeLong || '',
              suburb: property.addressComponents?.suburb || '',
              postcode: property.addressComponents?.postcode || property.addressComponents?.postCode || '',
              state: property.addressComponents?.state || '',
              fullAddress: property.address
            }
          }))
          
          return new Response(JSON.stringify({ success: true, data: transformedData }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        case '/property-details': {
          // Get property details by ID
          const { propertyId } = body
          const response = await domainRequest(`/v1/properties/${propertyId}`, token, config)
          
          return new Response(JSON.stringify({ success: true, data: response }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        case '/save-sales-evidence': {
          // Save sales evidence to database
          const salesData = body as SalesEvidenceData
          
          const { data, error } = await supabaseClient
            .from('sales_evidence')
            .insert({
              ...salesData,
              user_id: user.id,
              data_source: 'Domain API',
              extraction_date: new Date().toISOString(),
              data_quality_score: 85,
              verification_status: 'verified'
            })
            .select()

          if (error) {
            console.error('Error saving sales evidence:', error)
            throw new Error('Failed to save sales evidence')
          }

          return new Response(JSON.stringify({ success: true, data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        case '/save-leasing-evidence': {
          // Save leasing evidence to database
          const leasingData = body as LeasingEvidenceData
          
          const { data, error } = await supabaseClient
            .from('leasing_evidence')
            .insert({
              ...leasingData,
              user_id: user.id,
              data_source: 'Domain API',
              extraction_date: new Date().toISOString(),
              data_quality_score: 85,
              verification_status: 'verified'
            })
            .select()

          if (error) {
            console.error('Error saving leasing evidence:', error)
            throw new Error('Failed to save leasing evidence')
          }

          return new Response(JSON.stringify({ success: true, data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        case '/search-and-save-sales': {
          // Search for sales listings and save to evidence table
          const criteria = body.criteria
          const response = await domainRequest('/v1/listings/residential/_search', token, config, {
            method: 'POST',
            body: criteria
          })

          // Transform and save each listing
          const savedEvidence = []
          for (const listing of response.data || []) {
            const evidenceData = transformToSalesEvidence(listing, response.sourceUrl)
            
            const { data, error } = await supabaseClient
              .from('sales_evidence')
              .insert({
                ...evidenceData,
                user_id: user.id
              })
              .select()

            if (!error && data) {
              savedEvidence.push(data[0])
            }
          }

          return new Response(JSON.stringify({ 
            success: true, 
            total_found: response.data?.length || 0,
            saved_count: savedEvidence.length,
            evidence: savedEvidence 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        case '/search-and-save-leasing': {
          // Search for rental listings and save to evidence table
          const criteria = body.criteria
          const response = await domainRequest('/v1/listings/residential/_search', token, config, {
            method: 'POST',
            body: criteria
          })

          // Transform and save each listing
          const savedEvidence = []
          for (const listing of response.data || []) {
            const evidenceData = transformToLeasingEvidence(listing, response.sourceUrl)
            
            const { data, error } = await supabaseClient
              .from('leasing_evidence')
              .insert({
                ...evidenceData,
                user_id: user.id
              })
              .select()

            if (!error && data) {
              savedEvidence.push(data[0])
            }
          }

          return new Response(JSON.stringify({ 
            success: true, 
            total_found: response.data?.length || 0,
            saved_count: savedEvidence.length,
            evidence: savedEvidence 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        default:
          return new Response(
            JSON.stringify({ error: 'Endpoint not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
      }
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Domain API Error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})