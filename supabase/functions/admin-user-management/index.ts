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

    const { action, userData, userId, filters } = await req.json();

    console.log(`Admin user management action: ${action}`);

    switch (action) {
      case "create_user": {
        const { email, password, displayName, role = 'user' } = userData;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // Create user with admin privileges
        const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true,
          user_metadata: {
            display_name: displayName || email.split('@')[0]
          }
        });

        if (error) throw error;

        // Add user role if specified
        if (role !== 'user') {
          await supabaseAdmin
            .from('user_roles')
            .insert({
              user_id: user.user.id,
              role: role
            });
        }

        return new Response(JSON.stringify({
          success: true,
          message: "User created successfully",
          user: user.user
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "delete_user": {
        if (!userId) {
          throw new Error("User ID is required");
        }

        const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (error) throw error;

        return new Response(JSON.stringify({
          success: true,
          message: "User deleted successfully"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "update_user": {
        if (!userId) {
          throw new Error("User ID is required");
        }

        const { email, displayName, role, emailConfirm, phoneConfirm } = userData;

        const updateData: any = {};
        
        if (email) updateData.email = email;
        if (emailConfirm !== undefined) updateData.email_confirm = emailConfirm;
        if (phoneConfirm !== undefined) updateData.phone_confirm = phoneConfirm;
        
        if (displayName) {
          updateData.user_metadata = { display_name: displayName };
        }

        const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(
          userId,
          updateData
        );

        if (error) throw error;

        // Update role if specified
        if (role) {
          await supabaseAdmin
            .from('user_roles')
            .upsert({
              user_id: userId,
              role: role
            });
        }

        return new Response(JSON.stringify({
          success: true,
          message: "User updated successfully",
          user: user.user
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "list_users": {
        const page = filters?.page || 1;
        const perPage = Math.min(filters?.perPage || 50, 1000);

        const { data, error } = await supabaseAdmin.auth.admin.listUsers({
          page: page,
          perPage: perPage
        });

        if (error) throw error;

        return new Response(JSON.stringify({
          success: true,
          users: data.users,
          pagination: {
            page: page,
            perPage: perPage,
            total: data.users.length
          }
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "get_user": {
        if (!userId) {
          throw new Error("User ID is required");
        }

        const { data: user, error } = await supabaseAdmin.auth.admin.getUserById(userId);

        if (error) throw error;

        // Get user roles
        const { data: roles } = await supabaseAdmin
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);

        return new Response(JSON.stringify({
          success: true,
          user: {
            ...user.user,
            roles: roles?.map(r => r.role) || []
          }
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (error) {
    console.error("Admin user management error:", error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});