import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdvertisingInquiryRequest {
  packageId: string;
  packageName: string;
  platform: string;
  price: number;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      packageId,
      packageName,
      platform,
      price,
      customerEmail,
      customerName,
      customerPhone,
      message
    }: AdvertisingInquiryRequest = await req.json();

    console.log("Sending advertising inquiry:", { packageId, packageName, platform, price });

    // Send inquiry to the company
    const companyEmailResponse = await resend.emails.send({
      from: "Advertising Inquiries <info@delorenzopropertygroup.com>",
      to: ["info@delorenzopropertygroup.com"],
      subject: `New ${platform} ${packageName} Package Inquiry`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .package-info { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #3b82f6; }
            .customer-info { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .price { color: #059669; font-weight: bold; font-size: 24px; }
            .platform { color: #3b82f6; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Advertising Package Inquiry</h1>
              <p>A potential customer is interested in our advertising services</p>
            </div>
            
            <div class="content">
              <div class="package-info">
                <h2>Package Details</h2>
                <p><strong>Platform:</strong> <span class="platform">${platform}</span></p>
                <p><strong>Package:</strong> ${packageName}</p>
                <p><strong>Package ID:</strong> ${packageId}</p>
                <p><strong>Price:</strong> <span class="price">$${price.toLocaleString()}</span></p>
              </div>
              
              ${customerEmail || customerName || customerPhone ? `
                <div class="customer-info">
                  <h2>Customer Information</h2>
                  ${customerName ? `<p><strong>Name:</strong> ${customerName}</p>` : ''}
                  ${customerEmail ? `<p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>` : ''}
                  ${customerPhone ? `<p><strong>Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>` : ''}
                </div>
              ` : ''}
              
              ${message ? `
                <div class="customer-info">
                  <h2>Customer Message</h2>
                  <p>${message}</p>
                </div>
              ` : ''}
              
              <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px;">
                <p><strong>Next Steps:</strong></p>
                <ul>
                  <li>Contact the customer within 2 business hours</li>
                  <li>Prepare package details and customization options</li>
                  <li>Schedule a consultation call if needed</li>
                  <li>Send follow-up materials and pricing breakdown</li>
                </ul>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send confirmation to customer if email provided
    let customerEmailResponse = null;
    if (customerEmail) {
      customerEmailResponse = await resend.emails.send({
        from: "DeLorenzo Property Group <info@delorenzopropertygroup.com>",
        to: [customerEmail],
        subject: `Thank You for Your Interest in ${platform} ${packageName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .package-highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #3b82f6; }
              .price { color: #059669; font-weight: bold; font-size: 28px; }
              .contact-info { background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Thank You for Your Interest!</h1>
                <p>We've received your inquiry for our ${platform} advertising services</p>
              </div>
              
              <div class="content">
                <p>Dear ${customerName || 'Valued Customer'},</p>
                
                <p>Thank you for your interest in our <strong>${packageName}</strong> advertising package for <strong>${platform}</strong>.</p>
                
                <div class="package-highlight">
                  <h2>Your Selected Package: ${packageName}</h2>
                  <p class="price">$${price.toLocaleString()}</p>
                  <p><strong>Platform:</strong> ${platform}</p>
                  <p><strong>Package ID:</strong> ${packageId}</p>
                </div>
                
                <h3>What Happens Next?</h3>
                <ul>
                  <li>✅ Our advertising team will review your inquiry</li>
                  <li>📞 We'll contact you within 2 business hours</li>
                  <li>📋 We'll provide detailed package information and customization options</li>
                  <li>🎯 We'll help you create the perfect marketing strategy for your property</li>
                </ul>
                
                <div class="contact-info">
                  <h3>Contact Information</h3>
                   <p><strong>Email:</strong> <a href="mailto:info@delorenzopropertygroup.com">info@delorenzopropertygroup.com</a></p>
                   <p><strong>Phone:</strong> <a href="tel:0417693838">0417 693 838</a></p>
                   <p><strong>Business Hours:</strong> Monday - Friday, 8:45 AM - 5:15 PM AEST</p>
                </div>
                
                <p>If you have any immediate questions, please don't hesitate to contact us using the information above.</p>
                
                <p>Best regards,<br>
                <strong>The DeLorenzo Property Group Team</strong></p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    }

    console.log("Company email sent successfully:", companyEmailResponse);
    if (customerEmailResponse) {
      console.log("Customer confirmation email sent successfully:", customerEmailResponse);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Advertising inquiry sent successfully",
        companyEmailId: companyEmailResponse.data?.id,
        customerEmailId: customerEmailResponse?.data?.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-advertising-inquiry function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: "Failed to send advertising inquiry",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);