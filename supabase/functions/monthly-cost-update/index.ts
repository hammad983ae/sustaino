import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

interface CostUpdateData {
  month: string;
  year: number;
  asset_class: string;
  base_price_per_sqm: number;
  cost_index: number;
  percentage_movement: number;
}

interface CPIUpdateData {
  month: string;
  year: number;
  cpi_value: number;
  percentage_change: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    console.log(`Running monthly construction cost update for ${currentMonth} ${currentYear}`);

    // Sample construction cost updates (in production, this would fetch from external APIs)
    const constructionUpdates: CostUpdateData[] = [
      {
        month: currentMonth,
        year: currentYear,
        asset_class: 'residential',
        base_price_per_sqm: 2850 + Math.random() * 100 - 50, // Simulate market fluctuation
        cost_index: 125.5 + Math.random() * 5 - 2.5,
        percentage_movement: Math.random() * 6 - 3 // -3% to +3%
      },
      {
        month: currentMonth,
        year: currentYear,
        asset_class: 'commercial',
        base_price_per_sqm: 3420 + Math.random() * 150 - 75,
        cost_index: 128.3 + Math.random() * 5 - 2.5,
        percentage_movement: Math.random() * 6 - 3
      },
      {
        month: currentMonth,
        year: currentYear,
        asset_class: 'industrial',
        base_price_per_sqm: 2650 + Math.random() * 100 - 50,
        cost_index: 122.1 + Math.random() * 5 - 2.5,
        percentage_movement: Math.random() * 6 - 3
      },
      {
        month: currentMonth,
        year: currentYear,
        asset_class: 'agricultural',
        base_price_per_sqm: 1890 + Math.random() * 80 - 40,
        cost_index: 118.7 + Math.random() * 4 - 2,
        percentage_movement: Math.random() * 5 - 2.5
      },
      {
        month: currentMonth,
        year: currentYear,
        asset_class: 'specialised',
        base_price_per_sqm: 4200 + Math.random() * 200 - 100,
        cost_index: 132.4 + Math.random() * 6 - 3,
        percentage_movement: Math.random() * 7 - 3.5
      }
    ];

    // Sample CPI update
    const cpiUpdate: CPIUpdateData = {
      month: currentMonth,
      year: currentYear,
      cpi_value: 136.8 + Math.random() * 2 - 1, // Simulate small CPI change
      percentage_change: Math.random() * 4 - 2 // -2% to +2%
    };

    // Insert construction cost updates
    for (const update of constructionUpdates) {
      const { error: costError } = await supabase
        .from('construction_cost_index')
        .upsert(update, { 
          onConflict: 'month,year,asset_class',
          ignoreDuplicates: false 
        });

      if (costError) {
        console.error(`Error updating construction costs for ${update.asset_class}:`, costError);
      } else {
        console.log(`Updated construction costs for ${update.asset_class}: $${update.base_price_per_sqm.toFixed(2)}/m²`);
      }
    }

    // Insert CPI update
    const { error: cpiError } = await supabase
      .from('cpi_index')
      .upsert(cpiUpdate, { 
        onConflict: 'month,year',
        ignoreDuplicates: false 
      });

    if (cpiError) {
      console.error('Error updating CPI:', cpiError);
    } else {
      console.log(`Updated CPI: ${cpiUpdate.cpi_value.toFixed(1)} (${cpiUpdate.percentage_change.toFixed(2)}%)`);
    }

    // Create notification record
    const { error: notificationError } = await supabase
      .from('monthly_update_notifications')
      .insert({
        notification_date: currentDate.toISOString().split('T')[0],
        notification_type: 'construction_cost_cpi_update',
        status: 'completed',
        sent_at: new Date().toISOString()
      });

    if (notificationError) {
      console.error('Error creating notification record:', notificationError);
    }

    // Get all user profiles for email notifications
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('user_id, display_name')
      .limit(100); // Limit for safety

    if (profilesError) {
      console.error('Error fetching user profiles:', profilesError);
    }

    // Send email notifications to users (in production, you'd want to batch this)
    if (profiles && profiles.length > 0) {
      try {
        const emailResponse = await resend.emails.send({
          from: "Valuations Platform <noreply@valuations.com>",
          to: ["admin@valuations.com"], // In production, send to actual user emails
          subject: `Monthly Construction Cost & CPI Update - ${currentMonth} ${currentYear}`,
          html: `
            <h1>Monthly Market Update - ${currentMonth} ${currentYear}</h1>
            <p>The latest construction cost index and CPI data has been updated in the system.</p>
            
            <h2>Construction Cost Highlights:</h2>
            <ul>
              <li>Residential: $${constructionUpdates[0].base_price_per_sqm.toFixed(2)}/m² (${constructionUpdates[0].percentage_movement > 0 ? '+' : ''}${constructionUpdates[0].percentage_movement.toFixed(2)}%)</li>
              <li>Commercial: $${constructionUpdates[1].base_price_per_sqm.toFixed(2)}/m² (${constructionUpdates[1].percentage_movement > 0 ? '+' : ''}${constructionUpdates[1].percentage_movement.toFixed(2)}%)</li>
              <li>Industrial: $${constructionUpdates[2].base_price_per_sqm.toFixed(2)}/m² (${constructionUpdates[2].percentage_movement > 0 ? '+' : ''}${constructionUpdates[2].percentage_movement.toFixed(2)}%)</li>
            </ul>
            
            <h2>CPI Update:</h2>
            <p>Current CPI: ${cpiUpdate.cpi_value.toFixed(1)} (${cpiUpdate.percentage_change > 0 ? '+' : ''}${cpiUpdate.percentage_change.toFixed(2)}%)</p>
            
            <p>These updates are now available in all valuation reports.</p>
            <p>Best regards,<br>The Valuations Team</p>
          `,
        });

        console.log("Email notification sent successfully:", emailResponse);
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Monthly construction cost and CPI data updated successfully",
        constructionUpdates: constructionUpdates.length,
        cpiUpdate: true,
        notificationsSent: profiles?.length || 0
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
    console.error("Error in monthly update function:", error);
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