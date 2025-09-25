import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  type: 'view' | 'export';
  analysisData: any;
  analysisType: 'valuation' | 'report' | 'costa';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, type, analysisData, analysisType }: EmailRequest = await req.json();

    let htmlContent = '';
    let attachments = [];

    if (type === 'view') {
      // Create view email with analysis summary
      htmlContent = generateViewEmailContent(analysisData, analysisType);
    } else if (type === 'export') {
      // Create export email with downloadable content
      htmlContent = generateExportEmailContent(analysisData, analysisType);
      // You can add PDF generation here in the future
    }

    const emailResponse = await resend.emails.send({
      from: "Property Analysis <analysis@resend.dev>",
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: (emailResponse as any).id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-analysis function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateViewEmailContent(analysisData: any, analysisType: string): string {
  const baseStyles = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #0F766E, #059669); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
      .content { background: #f9f9f9; padding: 20px; }
      .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
      .stat { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #0F766E; }
      .stat-value { font-size: 1.5em; font-weight: bold; color: #0F766E; }
      .stat-label { color: #666; font-size: 0.9em; }
    </style>
  `;

  switch (analysisType) {
    case 'valuation':
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>Property Valuation Analysis</h1>
            <p>Your comprehensive property valuation results</p>
          </div>
          <div class="content">
            <div class="stat">
              <div class="stat-label">Property Address</div>
              <div class="stat-value">${analysisData.property_address || 'N/A'}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Estimated Value</div>
              <div class="stat-value">$${(analysisData.estimated_value || 0).toLocaleString()}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Valuation Type</div>
              <div class="stat-value">${analysisData.valuation_type || 'N/A'}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Confidence Score</div>
              <div class="stat-value">${analysisData.confidence_score || 0}%</div>
            </div>
            <div class="stat">
              <div class="stat-label">Methodology</div>
              <div class="stat-value">${analysisData.methodology || 'N/A'}</div>
            </div>
          </div>
          <div class="footer">
            <p>Property Valuation Platform - Professional Analysis Services</p>
          </div>
        </div>
      `;

    case 'costa':
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>Portfolio Analysis Report</h1>
            <p>${analysisData.title || 'Portfolio Analysis'}</p>
          </div>
          <div class="content">
            <div class="stat">
              <div class="stat-label">Analysis Title</div>
              <div class="stat-value">${analysisData.title || 'N/A'}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Location Count</div>
              <div class="stat-value">${analysisData.analysis_data?.locationCount || 0} locations</div>
            </div>
            <div class="stat">
              <div class="stat-label">Total Property Value</div>
              <div class="stat-value">$${(analysisData.analysis_data?.totalPropertyValue || 0).toLocaleString()}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Carbon Credit Value</div>
              <div class="stat-value">$${(analysisData.analysis_data?.carbonCreditValue || 0).toLocaleString()}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Created Date</div>
              <div class="stat-value">${new Date(analysisData.created_at).toLocaleDateString()}</div>
            </div>
          </div>
          <div class="footer">
            <p>Portfolio Analysis Platform - Comprehensive Asset Management</p>
          </div>
        </div>
      `;

    case 'report':
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>Property Report</h1>
            <p>${analysisData.title || 'Property Analysis Report'}</p>
          </div>
          <div class="content">
            <div class="stat">
              <div class="stat-label">Report Title</div>
              <div class="stat-value">${analysisData.title || 'N/A'}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Property Address</div>
              <div class="stat-value">${analysisData.property_address || 'N/A'}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Report Type</div>
              <div class="stat-value">${analysisData.report_type || 'N/A'}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Status</div>
              <div class="stat-value">${analysisData.status || 'N/A'}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Sustainability Score</div>
              <div class="stat-value">${analysisData.sustainability_score || 'N/A'}</div>
            </div>
          </div>
          <div class="footer">
            <p>Property Analysis Platform - Professional Reporting Services</p>
          </div>
        </div>
      `;

    default:
      return `
        ${baseStyles}
        <div class="container">
          <div class="header">
            <h1>Analysis Report</h1>
            <p>Your analysis results</p>
          </div>
          <div class="content">
            <p>Your analysis data has been prepared and is ready for review.</p>
          </div>
          <div class="footer">
            <p>Property Analysis Platform</p>
          </div>
        </div>
      `;
  }
}

function generateExportEmailContent(analysisData: any, analysisType: string): string {
  return `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #059669, #0F766E); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
      .content { background: #f9f9f9; padding: 20px; }
      .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
      .export-info { background: white; padding: 20px; margin: 15px 0; border-radius: 6px; border: 2px solid #059669; }
    </style>
    <div class="container">
      <div class="header">
        <h1>📊 Analysis Export Ready</h1>
        <p>Your ${analysisType} analysis has been prepared for export</p>
      </div>
      <div class="content">
        <div class="export-info">
          <h3>Export Details:</h3>
          <p><strong>Analysis Type:</strong> ${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)}</p>
          <p><strong>Export Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Status:</strong> Ready for Download</p>
        </div>
        <p>Your analysis data has been compiled and is ready for export. The data includes all relevant metrics, calculations, and supporting information.</p>
        <p><strong>Note:</strong> This export contains comprehensive analysis data. Please ensure you save this information securely.</p>
      </div>
      <div class="footer">
        <p>Property Analysis Platform - Professional Export Services</p>
      </div>
    </div>
  `;
}

serve(handler);