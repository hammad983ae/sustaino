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
    // Create admin client with service role key for server-side operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { operation, table, data, filters, userId } = await req.json();

    console.log(`Admin operation: ${operation} on table: ${table}`);

    // Verify admin access (you can implement your own admin check logic)
    const requestingUser = req.headers.get('authorization');
    if (!requestingUser) {
      throw new Error("Authorization required");
    }

    switch (operation) {
      case "read": {
        let query = supabaseAdmin.from(table).select('*');
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        const { data: result, error } = await query;

        if (error) throw error;

        return new Response(JSON.stringify({
          success: true,
          data: result
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "insert": {
        if (!data) {
          throw new Error("Data is required for insert operation");
        }

        const { data: result, error } = await supabaseAdmin
          .from(table)
          .insert(data)
          .select();

        if (error) throw error;

        return new Response(JSON.stringify({
          success: true,
          message: "Record inserted successfully",
          data: result
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "update": {
        if (!data || !filters) {
          throw new Error("Data and filters are required for update operation");
        }

        let query = supabaseAdmin.from(table).update(data);
        
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });

        const { data: result, error } = await query.select();

        if (error) throw error;

        return new Response(JSON.stringify({
          success: true,
          message: "Record updated successfully",
          data: result
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "delete": {
        if (!filters) {
          throw new Error("Filters are required for delete operation");
        }

        let query = supabaseAdmin.from(table);
        
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });

        const { data: result, error } = await query.delete();

        if (error) throw error;

        return new Response(JSON.stringify({
          success: true,
          message: "Record deleted successfully",
          data: result
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "bulk_operation": {
        // For bulk operations that need to bypass RLS
        const { query, params } = data;

        if (!query) {
          throw new Error("SQL query is required for bulk operation");
        }

        // Execute raw SQL with admin privileges
        const { data: result, error } = await supabaseAdmin.rpc(
          'execute_admin_query',
          { query_text: query, query_params: params || {} }
        );

        if (error) throw error;

        return new Response(JSON.stringify({
          success: true,
          message: "Bulk operation completed",
          data: result
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "system_stats": {
        // Get system statistics using admin privileges
        const { data: userCount, error: userError } = await supabaseAdmin.auth.admin.listUsers();
        
        if (userError) throw userError;

        // Get table counts for main tables
        const tables = ['jobs', 'properties', 'evidence_files', 'valuation_jobs'];
        const tableCounts = {};

        for (const tableName of tables) {
          try {
            const { count, error } = await supabaseAdmin
              .from(tableName)
              .select('*', { count: 'exact', head: true });
            
            if (!error) {
              tableCounts[tableName] = count;
            }
          } catch (err) {
            console.warn(`Could not get count for table ${tableName}:`, err);
            tableCounts[tableName] = 0;
          }
        }

        return new Response(JSON.stringify({
          success: true,
          stats: {
            totalUsers: userCount.users.length,
            tableCounts: tableCounts,
            timestamp: new Date().toISOString()
          }
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

  } catch (error) {
    console.error("Admin operation error:", error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});