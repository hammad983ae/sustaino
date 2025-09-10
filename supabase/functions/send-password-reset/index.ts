import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
  resetUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, resetUrl }: PasswordResetRequest = await req.json();

    console.log('Sending password reset email to:', email);

    const emailResponse = await resend.emails.send({
      from: "DeLorenzo Property Group <noreply@delorenzopropertygroup.com>",
      to: [email],
      subject: "Reset Your Password - DeLorenzo Property Group",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2c5473 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <div style="display: inline-flex; align-items: center; gap: 15px; margin-bottom: 20px;">
              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #10b981, #059669); transform: rotate(45deg); position: relative; border-radius: 8px;">
                <div style="position: absolute; inset: 8px; background: linear-gradient(135deg, #34d399, #10b981); transform: rotate(-45deg); border-radius: 4px;"></div>
              </div>
              <div>
                <div style="color: white; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">DELORENZO</div>
                <div style="color: #b8956a; font-size: 16px; font-weight: 500; letter-spacing: 1px;">PROPERTY GROUP</div>
              </div>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
          </div>
          
          <div style="background: white; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 25px;">Hello,</p>
            
            <p style="font-size: 16px; margin-bottom: 25px;">
              We received a request to reset your password for your DeLorenzo Property Group account. 
              Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #10b981, #059669); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-weight: bold; 
                        font-size: 16px; 
                        display: inline-block;
                        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                Reset My Password
              </a>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">
                <strong>Security Note:</strong> This link will expire in 1 hour for your security. 
                If you didn't request this password reset, you can safely ignore this email.
              </p>
            </div>
            
            <p style="font-size: 14px; color: #64748b; margin-top: 30px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${resetUrl}" style="color: #10b981; word-break: break-all;">${resetUrl}</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center;">
              <p style="font-size: 14px; color: #64748b; margin: 0;">
                <strong>DeLorenzo Property Group</strong><br>
                Property Valuation and ESG Assessment<br>
                Powered By Sustaino Pro
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Password reset email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Password reset email sent successfully",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);