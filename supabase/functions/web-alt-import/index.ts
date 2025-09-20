import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ParsedSalesData {
  address: string;
  suburb: string;
  postcode: string;
  landArea: number;
  salePrice: number;
  contractDate: string;
  settlementDate: string;
  zoning: string;
  propertyType: string;
  saleMethod: string;
  lotDetails: string;
}

function parseAltData(data: string): ParsedSalesData[] {
  const lines = data.trim().split('\n');
  const salesData: ParsedSalesData[] = [];
  let currentSale: Partial<ParsedSalesData> = {};
  
  for (const line of lines) {
    const fields = line.split(';');
    const recordType = fields[0];
    
    if (recordType === 'B') {
      const streetNumber = fields[6] || '';
      const streetName = fields[7] || '';
      const suburb = fields[8] || '';
      const postcode = fields[9] || '';
      const landArea = parseFloat(fields[10]) || 0;
      const landAreaUnit = fields[11] || '';
      const contractDate = formatDate(fields[12]);
      const settlementDate = formatDate(fields[13]);
      const salePrice = parseFloat(fields[14]) || 0;
      const zoning = fields[15] || '';
      const propertyType = fields[16] || '';
      const saleMethod = fields[18] || '';
      
      const address = `${streetNumber} ${streetName}`.trim();
      
      currentSale = {
        address,
        suburb,
        postcode,
        landArea: landAreaUnit === 'H' ? landArea * 10000 : landArea,
        salePrice,
        contractDate,
        settlementDate,
        zoning,
        propertyType,
        saleMethod,
        lotDetails: ''
      };
    } else if (recordType === 'C' && currentSale.address) {
      currentSale.lotDetails = fields[4] || '';
      if (currentSale.salePrice && currentSale.salePrice > 0) {
        salesData.push(currentSale as ParsedSalesData);
      }
      currentSale = {};
    }
  }
  
  return salesData;
}

function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.length !== 8) return '';
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${year}-${month}-${day}`;
}

async function discoverAltFiles(baseUrl: string): Promise<string[]> {
  const urls: string[] = [];
  
  try {
    // Try to fetch the directory listing
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${baseUrl}: ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Extract file links from HTML (common patterns)
    const filePatterns = [
      /href=["']([^"']*\.dat)["']/gi,
      /href=["']([^"']*ALT[^"']*)["']/gi,
      /href=["']([^"']*SALES[^"']*)["']/gi,
      /href=["']([^"']*\.txt)["']/gi,
    ];
    
    for (const pattern of filePatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const filePath = match[1];
        // Construct full URL
        const fullUrl = new URL(filePath, baseUrl).toString();
        if (!urls.includes(fullUrl)) {
          urls.push(fullUrl);
        }
      }
    }
    
    console.log(`Discovered ${urls.length} potential ALT files from ${baseUrl}`);
    return urls;
    
  } catch (error) {
    console.error('Error discovering files:', error);
    throw error;
  }
}

async function fetchAltFile(url: string): Promise<{ content: string; filename: string } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch ${url}: ${response.statusText}`);
      return null;
    }
    
    const content = await response.text();
    const filename = url.split('/').pop() || 'unknown.dat';
    
    // Basic validation - check if it looks like ALT data
    if (content.includes('RTSALEDATA') || content.includes(';B;') || content.includes('VALNET')) {
      return { content, filename };
    }
    
    console.warn(`File ${filename} doesn't appear to be ALT format`);
    return null;
    
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      throw new Error('Invalid user token')
    }

    if (req.method === 'POST') {
      const { baseUrl, fileUrls } = await req.json()
      
      let urlsToProcess: string[] = []
      
      if (fileUrls && Array.isArray(fileUrls)) {
        // Direct URLs provided
        urlsToProcess = fileUrls
        console.log(`Processing ${urlsToProcess.length} direct URLs`)
      } else if (baseUrl) {
        // Discover files from base URL
        console.log(`Discovering ALT files from: ${baseUrl}`)
        urlsToProcess = await discoverAltFiles(baseUrl)
      } else {
        throw new Error('Either baseUrl or fileUrls must be provided')
      }

      if (urlsToProcess.length === 0) {
        throw new Error('No ALT files found')
      }

      console.log(`Processing ${urlsToProcess.length} URLs for user ${user.id}`)
      
      let totalRecords = 0
      let processedFiles = 0
      const errors: string[] = []
      
      // Process URLs in batches
      const batchSize = 5 // Smaller batch for web requests
      for (let i = 0; i < urlsToProcess.length; i += batchSize) {
        const batch = urlsToProcess.slice(i, i + batchSize)
        
        // Process batch concurrently
        const promises = batch.map(async (url) => {
          try {
            const fileData = await fetchAltFile(url)
            if (!fileData) {
              errors.push(`${url}: Failed to fetch or invalid format`)
              return
            }
            
            const parsedData = parseAltData(fileData.content)
            
            if (parsedData.length > 0) {
              const salesRecords = parsedData.map(sale => ({
                user_id: user.id,
                comparable_address: sale.address,
                suburb: sale.suburb,
                postcode: sale.postcode,
                land_area: sale.landArea,
                sale_price: sale.salePrice,
                sale_date: sale.settlementDate || sale.contractDate || null,
                contract_date: sale.contractDate || null,
                settlement_date: sale.settlementDate || null,
                zoning: sale.zoning,
                property_type: sale.propertyType,
                sale_type: sale.saleMethod,
                lot_number: sale.lotDetails,
                source: 'ALT_WEB_IMPORT',
                data_source_verified: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }))

              const { error: insertError } = await supabase
                .from('sales_evidence')
                .insert(salesRecords)

              if (insertError) {
                console.error(`Error inserting data from ${url}:`, insertError)
                errors.push(`${fileData.filename}: ${insertError.message}`)
              } else {
                totalRecords += salesRecords.length
                processedFiles++
                console.log(`Successfully processed ${fileData.filename}: ${salesRecords.length} records`)
              }
            } else {
              errors.push(`${fileData.filename}: No valid sales data found`)
            }
          } catch (fileError) {
            console.error(`Error processing ${url}:`, fileError)
            errors.push(`${url}: ${fileError instanceof Error ? fileError.message : 'Unknown error'}`)
          }
        })
        
        await Promise.all(promises)
        
        // Small delay between batches to be respectful to the server
        if (i + batchSize < urlsToProcess.length) {
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }

      const result = {
        success: true,
        totalUrls: urlsToProcess.length,
        processedFiles,
        totalRecords,
        errors: errors.length > 0 ? errors : undefined
      }

      console.log('Web import completed:', result)

      return new Response(JSON.stringify(result), {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 200,
      })
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  } catch (error) {
    console.error('Web import error:', error)
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 400,
      }
    )
  }
})