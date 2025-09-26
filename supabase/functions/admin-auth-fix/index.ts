import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create admin client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { action, userId, email } = await req.json();

    console.log(`Admin auth fix action: ${action}`);

    switch (action) {
      case "reset_user_password": {
        if (!email) {
          throw new Error("Email is required for password reset");
        }

        // Admin password reset - bypasses rate limits
        const { data, error } = await supabaseAdmin.auth.admin.generateLink({
          type: 'recovery',
          email: email,
          options: {
            redirectTo: `${req.headers.get('origin')}/auth?type=recovery`
          }
        });

        if (error) throw error;

        return new Response(JSON.stringify({
          success: true,
          message: "Password reset link generated",
          data: data
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "unlock_user": {
        if (!userId) {
          throw new Error("User ID is required");
        }

        // Clear any authentication locks or issues
        const { data: user, error } = await supabaseAdmin.auth.admin.getUserById(userId);
        
        if (error) throw error;

        // Update user to clear any locks
        const { data: updatedUser, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          userId,
          {
            email_confirm: true,
            phone_confirm: true,
            user_metadata: {
              ...user.user_metadata,
              auth_issue_resolved: new Date().toISOString()
            }
          }
        );

        if (updateError) throw updateError;

        return new Response(JSON.stringify({
          success: true,
          message: "User authentication unlocked",
          user: updatedUser
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "verify_user_email": {
        if (!userId) {
          throw new Error("User ID is required");
        }

        const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
          userId,
          { email_confirm: true }
        );

        if (error) throw error;

        return new Response(JSON.stringify({
          success: true,
          message: "User email verified",
          user: data
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (error) {
    console.error("Admin auth fix error:", error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});