import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-AFTERPAY-PAYMENT] ${step}${detailsStr}`);
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
    logStep("Stripe key verified");

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user (optional for guest checkout)
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: userData } = await supabaseClient.auth.getUser(token);
      user = userData.user;
      logStep("User authenticated", { userId: user?.id, email: user?.email });
    } else {
      logStep("Guest checkout - no authentication required");
    }

    // Parse request body
    const { amount, currency = 'aud', description, metadata = {}, return_url, cancel_url } = await req.json();
    
    if (!amount || !description) {
      throw new Error("Amount and description are required");
    }

    logStep("Request data parsed", { amount, currency, description });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if user is an existing Stripe customer
    let customerId;
    let customerEmail;
    
    if (user?.email) {
      const customers = await stripe.customers.list({ 
        email: user.email, 
        limit: 1 
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing Stripe customer", { customerId });
      } else {
        // Create new customer
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: {
            supabase_user_id: user.id
          }
        });
        customerId = customer.id;
        logStep("Created new Stripe customer", { customerId });
      }
      customerEmail = user.email;
    }

    // Create Stripe Checkout Session with Afterpay
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: description,
              description: `Payment via Afterpay - ${description}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["afterpay_clearpay"],
      success_url: return_url || `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${req.headers.get("origin")}/payment-cancelled`,
      metadata: {
        ...metadata,
        payment_method: "afterpay",
        user_id: user?.id || "guest",
        created_via: "afterpay-checkout-component"
      },
      // Afterpay specific configurations
      payment_intent_data: {
        setup_future_usage: undefined, // Afterpay doesn't support saved payment methods
      },
      // Enable automatic tax calculation if needed
      automatic_tax: { enabled: false },
      // Set billing address collection
      billing_address_collection: "auto",
      // Configure shipping if needed
      shipping_address_collection: {
        allowed_countries: ['AU'], // Afterpay is primarily available in Australia
      },
    });

    logStep("Checkout session created successfully", { 
      sessionId: session.id, 
      url: session.url 
    });

    // Log the transaction attempt for tracking
    if (user) {
      try {
        await supabaseClient.from('payment_attempts').insert({
          user_id: user.id,
          session_id: session.id,
          amount: amount,
          currency: currency,
          payment_method: 'afterpay',
          description: description,
          metadata: metadata,
          status: 'initiated'
        });
        logStep("Payment attempt logged to database");
      } catch (dbError) {
        logStep("Failed to log payment attempt", { error: dbError });
        // Don't fail the request if logging fails
      }
    }

    return new Response(JSON.stringify({ 
      url: session.url,
      session_id: session.id,
      payment_method: "afterpay"
    }), {
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