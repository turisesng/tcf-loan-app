import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { crypto } from "https://deno.land/std@0.190.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-paystack-signature",
};

async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  );
  
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const expectedSignature = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  
  return signature === expectedSignature;
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

    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    // Verify webhook signature
    if (signature) {
      const isValid = await verifySignature(body, signature, paystackSecretKey);
      if (!isValid) {
        console.error("Invalid webhook signature");
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const event = JSON.parse(body);
    console.log("Received Paystack webhook:", event.event, event.data?.reference);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (event.event === "charge.success") {
      const { reference, metadata } = event.data;
      const paymentType = metadata?.type;

      console.log("Processing successful payment:", { reference, type: paymentType });

      if (paymentType === "tool") {
        // Generate download token
        const downloadToken = crypto.randomUUID();
        const downloadExpiresAt = new Date();
        downloadExpiresAt.setHours(downloadExpiresAt.getHours() + 24);

        const { error: updateError } = await supabase
          .from("purchases")
          .update({
            status: "completed",
            download_token: downloadToken,
            download_expires_at: downloadExpiresAt.toISOString(),
          })
          .eq("payment_reference", reference);

        if (updateError) {
          console.error("Error updating purchase:", updateError);
          throw updateError;
        }

        console.log("Purchase completed successfully:", reference);
      } else if (paymentType === "consultation") {
        const { error: updateError } = await supabase
          .from("consultation_bookings")
          .update({ status: "confirmed" })
          .eq("payment_reference", reference);

        if (updateError) {
          console.error("Error updating consultation booking:", updateError);
          throw updateError;
        }

        console.log("Consultation booking confirmed:", reference);
      }
    } else if (event.event === "charge.failed") {
      const { reference, metadata } = event.data;
      const paymentType = metadata?.type;

      console.log("Processing failed payment:", { reference, type: paymentType });

      if (paymentType === "tool") {
        await supabase
          .from("purchases")
          .update({ status: "failed" })
          .eq("payment_reference", reference);
      } else if (paymentType === "consultation") {
        await supabase
          .from("consultation_bookings")
          .update({ status: "cancelled" })
          .eq("payment_reference", reference);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in paystack-webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
