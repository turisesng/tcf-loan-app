import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePaystack } from "@/hooks/usePaystack";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Download, Calendar } from "lucide-react";

const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyPayment, isLoading } = usePaystack();
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [verified, setVerified] = useState(false);

  const reference = searchParams.get("reference") || searchParams.get("trxref");

  useEffect(() => {
    const verify = async () => {
      if (reference && !verified) {
        setVerified(true);
        const result = await verifyPayment(reference);
        setVerificationResult(result);
      }
    };

    verify();
  }, [reference, verified]);

  if (isLoading || (!verificationResult && reference)) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg text-muted-foreground">Verifying your payment...</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!reference) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <CardTitle>Invalid Payment Reference</CardTitle>
              <CardDescription>
                No payment reference was provided. Please try making a new purchase.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={() => navigate("/tools")}>Browse Tools</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (verificationResult?.success) {
    const isToolPurchase = verificationResult.item;
    const isConsultation = verificationResult.booking;

    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-12">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>
                {isToolPurchase
                  ? "Your purchase has been confirmed. You can now download your tool."
                  : "Your consultation booking has been confirmed."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isToolPurchase && (
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold">{verificationResult.item?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {verificationResult.item?.description}
                  </p>
                  <Button className="w-full" asChild>
                    <a
                      href={`/download?token=${verificationResult.download_token}`}
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Tool
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Download link expires in 24 hours
                  </p>
                </div>
              )}

              {isConsultation && (
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold">
                    {verificationResult.booking?.consultation_plans?.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {verificationResult.booking?.preferred_date} at{" "}
                      {verificationResult.booking?.preferred_time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We will contact you shortly to confirm your consultation appointment.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Return Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <CardTitle>Payment Failed</CardTitle>
            <CardDescription>
              {verificationResult?.error ||
                "We couldn't verify your payment. Please try again or contact support."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button onClick={() => navigate("/tools")}>Try Again</Button>
            <Button variant="outline" onClick={() => navigate("/contact")}>
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentVerify;
