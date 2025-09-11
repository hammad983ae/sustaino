import { handleApiResponse, handleFunctionResponse } from './base';
import { supabase } from '@/integrations/supabase/client';
import type { Report } from '@/types';

export interface ReportGenerationRequest {
  propertyId: string;
  reportType: string;
  sectionsData: Record<string, unknown>;
  title: string;
}

class ReportService {
  async getReports(): Promise<Report[]> {
    const response = await supabase
      .from('reports')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    return response.data as Report[];
  }

  async getReport(id: string): Promise<Report> {
    const response = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    return response.data as Report;
  }

  async createReport(reportData: Partial<Report>): Promise<Report> {
    const response = await supabase
      .from('reports')
      .insert(reportData as any)
      .select()
      .single();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    return response.data as Report;
  }

  async updateReport(id: string, reportData: Partial<Report>): Promise<Report> {
    const response = await supabase
      .from('reports')
      .update(reportData as any)
      .eq('id', id)
      .select()
      .single();
    
    if (response.error) {
      throw new Error(response.error.message);
    }
    
    return response.data as Report;
  }

  async updateReportSection(id: string, sectionKey: string, sectionData: any): Promise<Report> {
    // Get current report to merge section data
    const currentReport = await this.getReport(id);
    const updatedSectionsData = {
      ...currentReport.sections_data,
      [sectionKey]: sectionData
    };

    return this.updateReport(id, { 
      sections_data: updatedSectionsData,
      updated_at: new Date().toISOString()
    });
  }

  async generatePDF(reportData: ReportGenerationRequest): Promise<{ pdf_url: string }> {
    return handleFunctionResponse('generate-pdf-report', reportData);
  }

  async deleteReport(id: string): Promise<void> {
    const response = await supabase
      .from('reports')
      .delete()
      .eq('id', id);
    
    handleApiResponse(response);
  }
}

export const reportService = new ReportService();