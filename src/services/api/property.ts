import { handleApiResponse, handleSingleApiResponse, handleFunctionResponse } from './base';
import { supabase } from '@/integrations/supabase/client';

export interface Property {
  id: string;
  user_id: string;
  address_line_1: string;
  address_line_2?: string;
  suburb: string;
  state: string;
  postcode: string;
  country?: string;
  property_type: string;
  latitude?: number;
  longitude?: number;
  land_area?: number;
  building_area?: number;
  year_built?: number;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  created_at: string;
  updated_at: string;
}

export interface PropertySearchParams {
  address: string;
  propertyType?: string;
}

export interface PropertyAnalysisResult {
  property: Property;
  marketData?: any;
  comparables?: any[];
  riskAssessment?: any;
}

class PropertyService {
  async getProperties(): Promise<Property[]> {
    const response = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    
    return handleApiResponse(response);
  }

  async getProperty(id: string): Promise<Property> {
    const response = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    return response.data as Property;
  }

  async createProperty(propertyData: Partial<Property>): Promise<Property> {
    const response = await supabase
      .from('properties')
      .insert(propertyData as any)
      .select()
      .single();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    return response.data as Property;
  }

  async updateProperty(id: string, propertyData: Partial<Property>): Promise<Property> {
    const response = await supabase
      .from('properties')
      .update(propertyData as any)
      .eq('id', id)
      .select()
      .single();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    return response.data as Property;
  }

  async deleteProperty(id: string): Promise<void> {
    const response = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
    
    handleApiResponse(response);
  }

  async searchAndAnalyze(params: PropertySearchParams): Promise<PropertyAnalysisResult> {
    return handleFunctionResponse('enhanced-property-analysis', params);
  }

  async getRPDataSearch(address: string) {
    return handleFunctionResponse('rp-data-search', { address });
  }

  async getPropertyRiskAssessment(propertyId: string) {
    return handleFunctionResponse('property-risk-assessment', { propertyId });
  }
}

export const propertyService = new PropertyService();