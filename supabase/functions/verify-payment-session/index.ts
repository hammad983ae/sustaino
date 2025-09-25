import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT-SESSION] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    // Parse request body
    const { session_id } = await req.json();
    
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    logStep("Request data parsed", { session_id });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['payment_intent', 'line_items']
    });

    logStep("Checkout session retrieved", { 
      sessionId: session.id, 
      status: session.status,
      paymentStatus: session.payment_status 
    });

    // Get payment intent details if available
    let paymentDetails = null;
    if (session.payment_intent && typeof session.payment_intent === 'object') {
      paymentDetails = {
        payment_intent_id: session.payment_intent.id,
        payment_method: session.payment_intent.charges?.data[0]?.payment_method_details?.type || 'unknown',
        status: session.payment_intent.status,
        amount: session.payment_intent.amount,
        currency: session.payment_intent.currency
      };
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Update payment attempt in database if exists
    try {
      if (session.metadata?.user_id && session.metadata.user_id !== 'guest') {
        await supabaseClient
          .from('payment_attempts')
          .update({
            status: session.payment_status === 'paid' ? 'completed' : 'failed',
            completed_at: new Date().toISOString(),
            session_data: {
              payment_status: session.payment_status,
              payment_intent: paymentDetails?.payment_intent_id,
              amount_total: session.amount_total
            }
          })
          .eq('session_id', session_id);
        
        logStep("Payment attempt updated in database");
      }
    } catch (dbError) {
      logStep("Failed to update payment attempt in database", { error: dbError });
      // Don't fail the request if database update fails
    }

    // Prepare response data
    const responseData = {
      session_id: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_email,
      payment_method: paymentDetails?.payment_method || 'unknown',
      payment_intent: paymentDetails?.payment_intent_id,
      metadata: session.metadata,
      created: session.created,
      success: session.payment_status === 'paid',
      description: session.line_items?.data[0]?.description || session.metadata?.description
    };

    logStep("Response prepared", { success: responseData.success });

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});