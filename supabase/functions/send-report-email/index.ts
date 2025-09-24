import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendReportEmailRequest {
  recipientEmail: string;
  recipientName?: string;
  propertyAddress: string;
  reportType: string;
  clientName?: string;
  reportData?: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      recipientEmail, 
      recipientName, 
      propertyAddress, 
      reportType,
      clientName,
      reportData 
    }: SendReportEmailRequest = await req.json();

    console.log('Sending report email to:', recipientEmail);

    // Generate report summary for email
    const reportSummary = generateReportSummary(reportData, propertyAddress);

    const emailResponse = await resend.emails.send({
      from: "DeLorenzo Property Group <reports@delorenzopropertygroup.com>",
      to: [recipientEmail],
      subject: `Property Valuation Report - ${propertyAddress}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Property Valuation Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
            .header { background: linear-gradient(135deg, #059669, #0d9488); color: white; padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
            .header p { margin: 8px 0 0 0; opacity: 0.9; }
            .content { padding: 30px 20px; }
            .property-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin: 8px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
            .detail-label { font-weight: 600; color: #374151; }
            .detail-value { color: #6b7280; }
            .cta-button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            .logo { width: 48px; height: 48px; background: #059669; border-radius: 8px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">DL</div>
              <h1>Property Valuation Report</h1>
              <p>Professional Property Assessment & Analysis</p>
            </div>
            
            <div class="content">
              <h2>Dear ${recipientName || 'Valued Client'},</h2>
              
              <p>Your comprehensive property valuation report for <strong>${propertyAddress}</strong> has been completed and is ready for review.</p>
              
              <div class="property-details">
                <h3 style="margin-top: 0; color: #059669;">Report Summary</h3>
                <div class="detail-row">
                  <span class="detail-label">Property Address:</span>
                  <span class="detail-value">${propertyAddress}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Report Type:</span>
                  <span class="detail-value">${reportType}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Client:</span>
                  <span class="detail-value">${clientName || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Report Date:</span>
                  <span class="detail-value">${new Date().toLocaleDateString('en-AU')}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Status:</span>
                  <span class="detail-value"><strong style="color: #059669;">Completed</strong></span>
                </div>
              </div>

              ${reportSummary}
              
              <p style="margin-top: 30px;">
                <a href="#" class="cta-button">View Complete Report</a>
              </p>
              
              <div style="background: #fef3c7; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e;">
                  <strong>Important:</strong> This report contains confidential information and is intended solely for the specified recipient. Please keep this information secure and do not share without authorization.
                </p>
              </div>
              
              <p>If you have any questions about this report or require any clarifications, please don't hesitate to contact our team.</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>DeLorenzo Property Group</strong><br>
                Professional Property Valuers
              </p>
            </div>
            
            <div class="footer">
              <p><strong>DeLorenzo Property Group</strong></p>
              <p>Email: reports@delorenzopropertygroup.com | Phone: (03) 9xxx xxxx</p>
              <p style="font-size: 12px; margin-top: 16px;">
                This email and any attachments are confidential and may be subject to legal professional privilege.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Report email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id,
      message: "Report email sent successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-report-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        message: "Failed to send report email"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateReportSummary(reportData: any, propertyAddress: string): string {
  if (!reportData) {
    return `
      <div style="background: #f0f9ff; padding: 16px; border-radius: 6px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #0369a1;">Report Highlights</h4>
        <ul style="margin: 0; padding-left: 20px; color: #0f172a;">
          <li>Comprehensive property assessment completed</li>
          <li>Market analysis and comparable sales review</li>
          <li>Professional valuation certificate included</li>
          <li>Risk assessment and recommendations provided</li>
          <li>All regulatory compliance requirements met</li>
        </ul>
      </div>
    `;
  }

  // Generate summary based on actual report data
  let summary = `
    <div style="background: #f0f9ff; padding: 16px; border-radius: 6px; margin: 20px 0;">
      <h4 style="margin-top: 0; color: #0369a1;">Report Highlights</h4>
      <ul style="margin: 0; padding-left: 20px; color: #0f172a;">
  `;

  if (reportData.valuationCertificate?.valueComponent) {
    summary += `<li>Property Value: ${reportData.valuationCertificate.valueComponent}</li>`;
  }

  if (reportData.propertyDetails?.propertyType) {
    summary += `<li>Property Type: ${reportData.propertyDetails.propertyType}</li>`;
  }

  if (reportData.legalAndPlanning?.zoning) {
    summary += `<li>Zoning: ${reportData.legalAndPlanning.zoning}</li>`;
  }

  summary += `
        <li>Professional valuation analysis completed</li>
        <li>Market research and comparable sales analysis</li>
        <li>Risk assessment and recommendations included</li>
        <li>All sections reviewed and certified</li>
      </ul>
    </div>
  `;

  return summary;
}

serve(handler);