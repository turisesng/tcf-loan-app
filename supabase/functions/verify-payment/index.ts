import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecretKey) {
      throw new Error("Paystack secret key not configured");
    }

    const { reference } = await req.json();

    if (!reference) {
      throw new Error("Payment reference is required");
    }

    console.log("Verifying payment:", reference);

    // Verify with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      console.error("Paystack verification error:", paystackData);
      throw new Error(paystackData.message || "Failed to verify payment");
    }

    const { status, metadata } = paystackData.data;
    const isSuccessful = status === "success";

    console.log("Payment verification result:", { reference, status, isSuccessful, metadata });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let result: any = { success: isSuccessful, status };

    if (isSuccessful) {
      if (metadata?.type === "tool") {
        // Check if purchase record exists
        const { data: purchase, error: fetchError } = await supabase
          .from("purchases")
          .select("*, tool_products(*)")
          .eq("payment_reference", reference)
          .maybeSingle();

        if (fetchError) {
          console.error("Error fetching purchase:", fetchError);
        }

        if (purchase) {
          // Update if not already completed
          if (purchase.status !== "completed") {
            const downloadToken = crypto.randomUUID();
            const downloadExpiresAt = new Date();
            downloadExpiresAt.setHours(downloadExpiresAt.getHours() + 24);

            await supabase
              .from("purchases")
              .update({
                status: "completed",
                download_token: downloadToken,
                download_expires_at: downloadExpiresAt.toISOString(),
              })
              .eq("id", purchase.id);

            result.download_token = downloadToken;
          } else {
            result.download_token = purchase.download_token;
          }

          result.item = purchase.tool_products;
        } else {
          // No purchase record found - try to look up tool from metadata
          console.log("No purchase record found, looking up tool from metadata");
          
          const toolUuid = metadata.tool_uuid;
          const toolCode = metadata.item_id;
          
          if (toolUuid) {
            const { data: tool } = await supabase
              .from("tool_products")
              .select("*")
              .eq("id", toolUuid)
              .maybeSingle();
            
            if (tool) {
              result.item = tool;
              result.download_token = crypto.randomUUID();
            }
          } else if (toolCode) {
            const { data: tool } = await supabase
              .from("tool_products")
              .select("*")
              .eq("code", toolCode)
              .maybeSingle();
            
            if (tool) {
              result.item = tool;
              result.download_token = crypto.randomUUID();
            }
          }
          
          // If still no tool found, return basic success with item name from metadata
          if (!result.item) {
            result.item = {
              name: metadata.item_name || "Your Tool",
              description: "Your purchased tool is ready.",
            };
            result.download_token = crypto.randomUUID();
          }
        }
      } else if (metadata?.type === "consultation") {
        const { data: booking, error: fetchError } = await supabase
          .from("consultation_bookings")
          .select("*, consultation_plans(*)")
          .eq("payment_reference", reference)
          .maybeSingle();

        if (fetchError) {
          console.error("Error fetching booking:", fetchError);
        }

        if (booking && booking.status !== "confirmed") {
          await supabase
            .from("consultation_bookings")
            .update({ status: "confirmed" })
            .eq("id", booking.id);
        }

        result.booking = booking;
      }
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in verify-payment:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
