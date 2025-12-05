import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { sampleTools } from "@/data/tools";
import { ArrowLeft, CheckCircle, Shield, Download, Mail } from "lucide-react";

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = sampleTools.find((t) => t.id === toolId);

  if (!tool) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-8">The tool you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/tools">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Tools
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(tool.price);

  const features = [
    "Instant download after payment",
    "Written in simple, plain English",
    "Mobile-friendly format",
    "Lifetime access to updates",
    "Email support included",
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="border-b border-border bg-card">
        <div className="container py-4">
          <Link
            to="/tools"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
        </div>
      </section>

      {/* Tool Details */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                  {tool.code}
                </div>
                <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  {tool.category}
                </span>
              </div>

              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-4">
                {tool.name}
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {tool.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-foreground">What's Included:</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="flex flex-col gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Instant Download</p>
                    <p className="text-sm text-muted-foreground">Get your tool immediately after payment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email Delivery</p>
                    <p className="text-sm text-muted-foreground">Also sent to your email for safekeeping</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Purchase Card */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Price</p>
                  <p className="text-4xl font-bold text-primary">{formattedPrice}</p>
                  <p className="text-sm text-muted-foreground mt-1">One-time payment</p>
                </div>

                <Button variant="hero" size="lg" className="w-full mb-4">
                  Buy Now - {formattedPrice}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment via Paystack</span>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-3">Payment Methods</h4>
                  <div className="flex gap-2">
                    <div className="px-3 py-2 rounded-lg bg-secondary text-sm text-secondary-foreground">
                      Card
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-secondary text-sm text-secondary-foreground">
                      Bank Transfer
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-secondary text-sm text-secondary-foreground">
                      USSD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ToolDetail;
