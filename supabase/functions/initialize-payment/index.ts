import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  email: string;
  amount: number;
  metadata: {
    type: "tool" | "consultation";
    item_id: string;
    item_name: string;
    user_id?: string;
    full_name?: string;
    phone?: string;
    preferred_date?: string;
    preferred_time?: string;
    message?: string;
  };
  callback_url?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecretKey) {
      throw new Error("Paystack secret key not configured");
    }

    const { email, amount, metadata, callback_url }: PaymentRequest = await req.json();

    console.log("Initializing payment:", { email, amount, type: metadata.type, item_id: metadata.item_id });

    // Amount should be in kobo (smallest currency unit)
    const amountInKobo = Math.round(amount * 100);

    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        metadata,
        callback_url: callback_url || `${req.headers.get("origin")}/payment/verify`,
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      console.error("Paystack error:", paystackData);
      throw new Error(paystackData.message || "Failed to initialize payment");
    }

    console.log("Payment initialized successfully:", paystackData.data.reference);

    // Create pending record in database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (metadata.type === "tool") {
      const { error: insertError } = await supabase.from("purchases").insert({
        email,
        amount,
        tool_id: metadata.item_id,
        payment_reference: paystackData.data.reference,
        payment_provider: "paystack",
        status: "pending",
        user_id: metadata.user_id || null,
      });

      if (insertError) {
        console.error("Error creating purchase record:", insertError);
      }
    } else if (metadata.type === "consultation") {
      const { error: insertError } = await supabase.from("consultation_bookings").insert({
        email,
        amount,
        plan_id: metadata.item_id,
        full_name: metadata.full_name || "",
        phone: metadata.phone || "",
        preferred_date: metadata.preferred_date || new Date().toISOString().split("T")[0],
        preferred_time: metadata.preferred_time || "09:00",
        message: metadata.message || null,
        payment_reference: paystackData.data.reference,
        payment_provider: "paystack",
        status: "pending",
        user_id: metadata.user_id || null,
      });

      if (insertError) {
        console.error("Error creating consultation booking:", insertError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          authorization_url: paystackData.data.authorization_url,
          reference: paystackData.data.reference,
          access_code: paystackData.data.access_code,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in initialize-payment:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
