import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WebScrapingRequest {
  url: string
  data_type: 'sales' | 'rental'
  property_type?: string
}

interface ExtractedPropertyData {
  address?: string
  price?: number
  date?: string
  bedrooms?: number
  bathrooms?: number
  car_spaces?: number
  building_area?: number
  land_area?: number
  property_type?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { url, data_type, property_type = 'residential' }: WebScrapingRequest = await req.json()

    if (!url || !data_type) {
      return new Response(
        JSON.stringify({ error: 'URL and data_type are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Scraping ${data_type} data from: ${url}`)

    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`)
    }

    const html = await response.text()
    
    // Extract property data using pattern matching
    const extractedData = extractPropertyData(html, url)
    
    if (!extractedData.address) {
      return new Response(
        JSON.stringify({ error: 'Could not extract property address from the webpage' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get the current user from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    let insertResult

    if (data_type === 'sales') {
      // Insert into sales_evidence table
      const salesData = {
        user_id: user.id,
        comparable_address: extractedData.address,
        sale_price: extractedData.price || 0,
        sale_date: extractedData.date || new Date().toISOString().split('T')[0],
        property_type: property_type,
        bedrooms: extractedData.bedrooms || null,
        bathrooms: extractedData.bathrooms || null,
        car_spaces: extractedData.car_spaces || null,
        building_area: extractedData.building_area || null,
        land_area: extractedData.land_area || null,
        source: url,
        notes: `Auto-extracted from ${new URL(url).hostname}`
      }

      const { data, error } = await supabase
        .from('sales_evidence')
        .insert(salesData)
        .select()

      if (error) throw error
      insertResult = data[0]

    } else if (data_type === 'rental') {
      // Insert into rental_evidence table
      const rentalData = {
        user_id: user.id,
        comparable_address: extractedData.address,
        rental_amount: extractedData.price || 0,
        rental_period: 'weekly', // Default assumption
        lease_date: extractedData.date || new Date().toISOString().split('T')[0],
        property_type: property_type,
        bedrooms: extractedData.bedrooms || null,
        bathrooms: extractedData.bathrooms || null,
        car_spaces: extractedData.car_spaces || null,
        building_area: extractedData.building_area || null,
        land_area: extractedData.land_area || null,
        source: url,
        notes: `Auto-extracted from ${new URL(url).hostname}`
      }

      const { data, error } = await supabase
        .from('rental_evidence')
        .insert(rentalData)
        .select()

      if (error) throw error
      insertResult = data[0]
    }

    console.log(`Successfully extracted and stored ${data_type} data:`, insertResult)

    return new Response(
      JSON.stringify({
        success: true,
        data: insertResult,
        extracted_fields: extractedData,
        message: `Successfully extracted ${data_type} data from ${new URL(url).hostname}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in web-data-scraper:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function extractPropertyData(html: string, url: string): ExtractedPropertyData {
  const data: ExtractedPropertyData = {}
  
  // Remove HTML tags and normalize whitespace
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').toLowerCase()
  
  // Extract address patterns
  const addressPatterns = [
    /(\d+[a-z]?\s+[a-z\s]+(?:street|st|road|rd|avenue|ave|drive|dr|lane|ln|court|ct|place|pl|crescent|cres|terrace|tce|highway|hwy),?\s*[a-z\s]+,?\s*[a-z]{2,3}(?:\s+\d{4})?)/gi,
    /(\d+\/\d+[a-z]?\s+[a-z\s]+(?:street|st|road|rd|avenue|ave|drive|dr|lane|ln|court|ct|place|pl|crescent|cres|terrace|tce),?\s*[a-z\s]+)/gi
  ]
  
  for (const pattern of addressPatterns) {
    const match = text.match(pattern)
    if (match) {
      data.address = match[0].trim()
      break
    }
  }

  // Extract price patterns
  const pricePatterns = [
    /\$[\d,]+(?:\.\d{2})?/g,
    /[\d,]+\s*dollars?/gi,
    /price[:\s]*\$?([\d,]+)/gi
  ]
  
  for (const pattern of pricePatterns) {
    const matches = text.match(pattern)
    if (matches) {
      const priceStr = matches[0].replace(/[^\d]/g, '')
      const price = parseInt(priceStr)
      if (price > 1000) { // Reasonable minimum price
        data.price = price
        break
      }
    }
  }

  // Extract bedrooms
  const bedroomMatch = text.match(/(\d+)\s*(?:bed|bedroom)s?/i)
  if (bedroomMatch) {
    data.bedrooms = parseInt(bedroomMatch[1])
  }

  // Extract bathrooms
  const bathroomMatch = text.match(/(\d+)\s*(?:bath|bathroom)s?/i)
  if (bathroomMatch) {
    data.bathrooms = parseInt(bathroomMatch[1])
  }

  // Extract car spaces
  const carMatch = text.match(/(\d+)\s*(?:car|garage|parking)\s*(?:space|bay|spot)s?/i)
  if (carMatch) {
    data.car_spaces = parseInt(carMatch[1])
  }

  // Extract building area
  const buildingAreaMatch = text.match(/(\d+)\s*(?:m2|sqm|square\s*meter|m²)/i)
  if (buildingAreaMatch) {
    data.building_area = parseInt(buildingAreaMatch[1])
  }

  // Extract land area
  const landAreaMatch = text.match(/(?:land|block)\s*(?:size|area)[:\s]*(\d+)\s*(?:m2|sqm|square\s*meter|m²)/i)
  if (landAreaMatch) {
    data.land_area = parseInt(landAreaMatch[1])
  }

  // Extract dates
  const datePatterns = [
    /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/g,
    /\b(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/g,
    /\b(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})\b/gi
  ]
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern)
    if (match) {
      try {
        const dateStr = match[0]
        const date = new Date(dateStr)
        if (!isNaN(date.getTime()) && date.getFullYear() > 2000) {
          data.date = date.toISOString().split('T')[0]
          break
        }
      } catch (e) {
        // Continue to next pattern
      }
    }
  }

  return data
}