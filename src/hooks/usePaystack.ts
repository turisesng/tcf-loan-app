import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PaymentMetadata {
  type: "tool" | "consultation";
  item_id: string;
  item_name: string;
  user_id?: string;
  full_name?: string;
  phone?: string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
}

interface InitializePaymentParams {
  email: string;
  amount: number;
  metadata: PaymentMetadata;
  callback_url?: string;
}

interface VerifyPaymentResult {
  success: boolean;
  status?: string;
  download_token?: string;
  item?: any;
  booking?: any;
  error?: string;
}

export const usePaystack = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initializePayment = async ({
    email,
    amount,
    metadata,
    callback_url,
  }: InitializePaymentParams) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("initialize-payment", {
        body: { email, amount, metadata, callback_url },
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || "Failed to initialize payment");
      }

      // Redirect to Paystack checkout
      window.location.href = data.data.authorization_url;

      return data.data;
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initialize payment",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (reference: string): Promise<VerifyPaymentResult> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-payment", {
        body: { reference },
      });

      if (error) throw error;

      return data;
    } catch (error: any) {
      console.error("Payment verification error:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initializePayment,
    verifyPayment,
    isLoading,
  };
};
