import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Data extraction service for sales and leasing data
class PropertyDataExtractor {
  private supabase;
  
  constructor() {
    this.supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
  }

  // Extract from Domain.com.au listings
  async extractFromDomain(url: string, userId: string): Promise<any> {
    try {
      console.log(`Extracting from Domain URL: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      
      // Extract property data using regex patterns
      const data = this.parsePropertyHTML(html, 'domain');
      
      // Store extraction job
      await this.createExtractionJob(userId, 'sales', 'url', url, data);
      
      return {
        success: true,
        data,
        source: 'domain.com.au'
      };
    } catch (error) {
      console.error('Domain extraction failed:', error);
      await this.logExtractionError(userId, 'domain', url, error instanceof Error ? error.message : 'Unknown error');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Extract from RealEstate.com.au listings
  async extractFromRealEstate(url: string, userId: string): Promise<any> {
    try {
      console.log(`Extracting from RealEstate URL: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const html = await response.text();
      const data = this.parsePropertyHTML(html, 'realestate');
      
      await this.createExtractionJob(userId, 'sales', 'url', url, data);
      
      return {
        success: true,
        data,
        source: 'realestate.com.au'
      };
    } catch (error) {
      console.error('RealEstate extraction failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Mock RP Data API integration
  async extractFromRPData(suburb: string, state: string, userId: string): Promise<any> {
    try {
      console.log(`Extracting RP Data for ${suburb}, ${state}`);
      
      // Simulate RP Data API call
      const mockData = this.generateMockRPData(suburb, state);
      
      await this.createExtractionJob(userId, 'market_data', 'api', `rpdata-${suburb}-${state}`, mockData);
      
      return {
        success: true,
        data: mockData,
        source: 'rp-data'
      };
    } catch (error) {
      console.error('RP Data extraction failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Parse HTML content to extract property data
  private parsePropertyHTML(html: string, source: string): any {
    const data: any = {
      extractedAt: new Date().toISOString(),
      source
    };

    try {
      // Extract price
      const pricePatterns = [
        /\$[\d,]+/g,
        /"price":\s*"([^"]+)"/g,
        /data-price="([^"]+)"/g
      ];
      
      for (const pattern of pricePatterns) {
        const priceMatch = html.match(pattern);
        if (priceMatch) {
          data.price = priceMatch[0].replace(/[$,]/g, '');
          break;
        }
      }

      // Extract address
      const addressPatterns = [
        /"address":\s*"([^"]+)"/g,
        /class="address"[^>]*>([^<]+)/g,
        /data-address="([^"]+)"/g
      ];
      
      for (const pattern of addressPatterns) {
        const addressMatch = html.match(pattern);
        if (addressMatch) {
          data.address = addressMatch[1] || addressMatch[0];
          break;
        }
      }

      // Extract property details
      const bedMatch = html.match(/(\d+)\s*bed/i);
      if (bedMatch) data.bedrooms = parseInt(bedMatch[1]);

      const bathMatch = html.match(/(\d+)\s*bath/i);
      if (bathMatch) data.bathrooms = parseInt(bathMatch[1]);

      const carMatch = html.match(/(\d+)\s*car/i);
      if (carMatch) data.carSpaces = parseInt(carMatch[1]);

      // Extract property type
      const typeMatch = html.match(/"propertyType":\s*"([^"]+)"/);
      if (typeMatch) data.propertyType = typeMatch[1];

      // Extract land area
      const landMatch = html.match(/(\d+)\s*m²|(\d+)\s*sqm/i);
      if (landMatch) data.landArea = parseInt(landMatch[1] || landMatch[2]);

      console.log('Extracted data:', data);
      return data;
    } catch (error) {
      console.error('HTML parsing error:', error);
      return data;
    }
  }

  // Generate mock RP Data for testing
  private generateMockRPData(suburb: string, state: string): any {
    const basePrice = 500000 + Math.random() * 1000000;
    
    return {
      suburb,
      state,
      salesData: Array.from({ length: 10 }, (_, i) => ({
        address: `${10 + i} ${suburb} Street, ${suburb}, ${state}`,
        saleDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        salePrice: Math.round(basePrice + (Math.random() - 0.5) * 200000),
        propertyType: ['House', 'Unit', 'Townhouse'][Math.floor(Math.random() * 3)],
        bedrooms: Math.floor(Math.random() * 4) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        carSpaces: Math.floor(Math.random() * 3),
        landArea: Math.round(300 + Math.random() * 500),
        dataQualityScore: Math.floor(Math.random() * 20) + 80
      })),
      marketSummary: {
        medianPrice: Math.round(basePrice),
        priceGrowth12m: (Math.random() - 0.5) * 20,
        totalSales12m: Math.floor(Math.random() * 200) + 50,
        daysOnMarket: Math.floor(Math.random() * 40) + 20
      }
    };
  }

  // Create extraction job record
  private async createExtractionJob(userId: string, jobType: string, sourceType: string, sourceId: string, data: any) {
    try {
      const { error } = await this.supabase
        .from('data_extraction_jobs')
        .insert({
          user_id: userId,
          job_type: jobType,
          source_type: sourceType,
          source_identifier: sourceId,
          status: 'completed',
          extracted_data: data,
          records_successful: Array.isArray(data.salesData) ? data.salesData.length : 1,
          started_at: new Date().toISOString(),
          completed_at: new Date().toISOString()
        });

      if (error) {
        console.error('Failed to create extraction job:', error);
      }
    } catch (error) {
      console.error('Error creating extraction job:', error);
    }
  }

  // Log extraction errors
  private async logExtractionError(userId: string, source: string, url: string, error: string) {
    try {
      await this.supabase
        .from('data_extraction_jobs')
        .insert({
          user_id: userId,
          job_type: 'sales',
          source_type: 'url',
          source_identifier: url,
          status: 'failed',
          error_log: [{ timestamp: new Date().toISOString(), error, source }],
          started_at: new Date().toISOString(),
          completed_at: new Date().toISOString()
        });
    } catch (logError) {
      console.error('Failed to log extraction error:', logError);
    }
  }

  // Store extracted sales data
  async storeSalesData(userId: string, salesData: any[]): Promise<void> {
    try {
      const recordsToInsert = salesData.map(sale => ({
        user_id: userId,
        property_address: sale.address,
        sale_date: sale.saleDate,
        sale_price: sale.salePrice,
        property_type: sale.propertyType,
        bedrooms: sale.bedrooms,
        bathrooms: sale.bathrooms,
        car_spaces: sale.carSpaces,
        land_area: sale.landArea,
        building_area: sale.buildingArea,
        suburb: sale.suburb,
        state: sale.state,
        postcode: sale.postcode,
        data_source: sale.source || 'api',
        source_url: sale.sourceUrl,
        data_quality_score: sale.dataQualityScore || 70,
        comparable_rating: sale.comparableRating || 3
      }));

      const { error } = await this.supabase
        .from('sales_evidence')
        .insert(recordsToInsert);

      if (error) {
        console.error('Failed to store sales data:', error);
        throw error;
      }

      console.log(`Successfully stored ${recordsToInsert.length} sales records`);
    } catch (error) {
      console.error('Error storing sales data:', error);
      throw error;
    }
  }

  // Store extracted leasing data
  async storeLeasingData(userId: string, leasingData: any[]): Promise<void> {
    try {
      const recordsToInsert = leasingData.map(lease => ({
        user_id: userId,
        property_address: lease.address,
        lease_start_date: lease.leaseStartDate,
        lease_end_date: lease.leaseEndDate,
        rental_amount: lease.rentalAmount,
        rental_period: lease.rentalPeriod || 'weekly',
        property_type: lease.propertyType,
        bedrooms: lease.bedrooms,
        bathrooms: lease.bathrooms,
        car_spaces: lease.carSpaces,
        land_area: lease.landArea,
        suburb: lease.suburb,
        state: lease.state,
        postcode: lease.postcode,
        data_source: lease.source || 'api',
        source_url: lease.sourceUrl,
        data_quality_score: lease.dataQualityScore || 70,
        comparable_rating: lease.comparableRating || 3
      }));

      const { error } = await this.supabase
        .from('leasing_evidence')
        .insert(recordsToInsert);

      if (error) {
        console.error('Failed to store leasing data:', error);
        throw error;
      }

      console.log(`Successfully stored ${recordsToInsert.length} leasing records`);
    } catch (error) {
      console.error('Error storing leasing data:', error);
      throw error;
    }
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, suburb, state, extractionType, userId } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: 'User ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const extractor = new PropertyDataExtractor();
    let result;

    switch (extractionType) {
      case 'domain':
        result = await extractor.extractFromDomain(url, userId);
        break;
      case 'realestate':
        result = await extractor.extractFromRealEstate(url, userId);
        break;
      case 'rpdata':
        result = await extractor.extractFromRPData(suburb, state, userId);
        break;
      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid extraction type' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }

    // Store the extracted data if successful
    if (result.success && result.data) {
      if (result.data.salesData && Array.isArray(result.data.salesData)) {
        await extractor.storeSalesData(userId, result.data.salesData);
      }
      
      if (result.data.leasingData && Array.isArray(result.data.leasingData)) {
        await extractor.storeLeasingData(userId, result.data.leasingData);
      }
    }

    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Property data extraction error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: (error instanceof Error ? error.message : 'Unknown error') || 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});