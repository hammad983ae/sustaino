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
      // Property sale record
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
        landArea: landAreaUnit === 'H' ? landArea * 10000 : landArea, // Convert hectares to sqm
        salePrice,
        contractDate,
        settlementDate,
        zoning,
        propertyType,
        saleMethod,
        lotDetails: ''
      };
    } else if (recordType === 'C' && currentSale.address) {
      // Title/lot details
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

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user from auth header
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
      const formData = await req.formData()
      const files = formData.getAll('files') as File[]
      
      if (!files || files.length === 0) {
        throw new Error('No files provided')
      }

      console.log(`Processing ${files.length} files for user ${user.id}`)
      
      let totalRecords = 0
      let processedFiles = 0
      const errors: string[] = []
      
      // Process files in batches to avoid memory issues
      const batchSize = 10
      for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize)
        
        for (const file of batch) {
          try {
            const content = await file.text()
            const parsedData = parseAltData(content)
            
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
                source: 'ALT_BULK_IMPORT',
                data_source_verified: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }))

              const { error: insertError } = await supabase
                .from('sales_evidence')
                .insert(salesRecords)

              if (insertError) {
                console.error(`Error inserting data from ${file.name}:`, insertError)
                errors.push(`${file.name}: ${insertError.message}`)
              } else {
                totalRecords += salesRecords.length
                processedFiles++
                console.log(`Successfully processed ${file.name}: ${salesRecords.length} records`)
              }
            }
          } catch (fileError) {
            console.error(`Error processing file ${file.name}:`, fileError)
            errors.push(`${file.name}: ${fileError instanceof Error ? fileError.message : 'Unknown error'}`)
          }
        }
        
        // Add small delay between batches
        if (i + batchSize < files.length) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }

      const result = {
        success: true,
        totalFiles: files.length,
        processedFiles,
        totalRecords,
        errors: errors.length > 0 ? errors : undefined
      }

      console.log('Bulk import completed:', result)

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
    console.error('Bulk import error:', error)
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