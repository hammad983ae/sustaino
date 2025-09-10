import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface PDFGenerationRequest {
  reportData: any;
  jobNumber: string;
  propertyAddress: string;
  reportType: string;
  includedSections: string[];
  userEmail: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reportData, jobNumber, propertyAddress, reportType, includedSections, userEmail }: PDFGenerationRequest = await req.json();

    console.log('PDF Generation request:', { jobNumber, propertyAddress, reportType, sectionsCount: includedSections.length });

    // Generate PDF content HTML
    const htmlContent = generateReportHTML(reportData, jobNumber, propertyAddress, reportType, includedSections);

    // In a production environment, you would use a PDF generation service
    // For now, we'll create a mock PDF response and save the data
    const pdfBuffer = new TextEncoder().encode(htmlContent); // Mock PDF data
    const fileName = `Property_Report_${jobNumber}_${propertyAddress.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    const filePath = `reports/${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Failed to upload PDF: ${uploadError.message}`);
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    // Update the report record with file information
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || 'system';

    const { error: updateError } = await supabase
      .from('reports')
      .update({
        file_path: publicUrl,
        file_size: pdfBuffer.length.toString(),
        status: 'completed',
        generated_date: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('property_address', propertyAddress);

    if (updateError) {
      console.warn('Failed to update report record:', updateError);
    }

    console.log('PDF generated and saved successfully:', fileName);

    return new Response(JSON.stringify({
      success: true,
      fileName,
      filePath: publicUrl,
      fileSize: pdfBuffer.length,
      downloadUrl: publicUrl
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function generateReportHTML(reportData: any, jobNumber: string, propertyAddress: string, reportType: string, includedSections: string[]): string {
  const currentDate = new Date().toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Property Valuation Report - ${jobNumber}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #0F766E; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #0F766E; }
        .job-number { font-size: 18px; color: #666; margin-top: 10px; }
        .property-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .section { margin: 30px 0; page-break-inside: avoid; }
        .section-title { font-size: 18px; font-weight: bold; color: #0F766E; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
        .two-column { display: flex; gap: 20px; }
        .column { flex: 1; }
        .data-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .data-table th, .data-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .data-table th { background-color: #f2f2f2; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        @media print { body { margin: 20px; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">DeLorenzo Property Group</div>
        <h1>Property Valuation Report</h1>
        <div class="job-number">Job Number: ${jobNumber}</div>
        <div>Date: ${currentDate}</div>
    </div>

    <div class="property-details">
        <h2>Property Details</h2>
        <p><strong>Address:</strong> ${propertyAddress}</p>
        <p><strong>Report Type:</strong> ${reportType}</p>
        <p><strong>Sections Included:</strong> ${includedSections.length}</p>
    </div>

    ${includedSections.map(section => `
    <div class="section">
        <h3 class="section-title">${section}</h3>
        <p>This section contains comprehensive analysis and data related to ${section.toLowerCase()}.</p>
        ${generateSectionContent(section, reportData)}
    </div>
    `).join('')}

    <div class="footer">
        <p><strong>Important Notice:</strong> This report has been prepared by DeLorenzo Property Group and is subject to the terms and conditions outlined in our engagement letter.</p>
        <p>Generated on ${currentDate} | Job ${jobNumber}</p>
        <p>© 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.</p>
    </div>
</body>
</html>
  `;
}

function generateSectionContent(sectionName: string, reportData: any): string {
  // Generate specific content based on section type
  switch (sectionName.toLowerCase()) {
    case 'executive summary and contents':
      return `
        <p>This comprehensive property valuation report provides a detailed analysis of the subject property including market positioning, comparable sales evidence, and valuation methodologies.</p>
        <p><strong>Key Findings:</strong></p>
        <ul>
          <li>Market value assessment based on current market conditions</li>
          <li>Comprehensive comparable sales analysis</li>
          <li>Risk assessment and market indicators</li>
        </ul>
      `;
    
    case 'property details':
      return `
        <table class="data-table">
          <tr><th>Attribute</th><th>Details</th></tr>
          <tr><td>Land Size</td><td>${reportData?.propertyFeatures?.landSize || 'TBA'} sqm</td></tr>
          <tr><td>Building Area</td><td>${reportData?.propertyFeatures?.buildingArea || 'TBA'} sqm</td></tr>
          <tr><td>Year Built</td><td>${reportData?.propertyFeatures?.yearBuilt || 'TBA'}</td></tr>
          <tr><td>Bedrooms</td><td>${reportData?.propertyFeatures?.bedrooms || 'TBA'}</td></tr>
          <tr><td>Bathrooms</td><td>${reportData?.propertyFeatures?.bathrooms || 'TBA'}</td></tr>
        </table>
      `;
    
    default:
      return `<p>Detailed analysis and findings for ${sectionName} will be included based on comprehensive data collection and professional assessment.</p>`;
  }
}