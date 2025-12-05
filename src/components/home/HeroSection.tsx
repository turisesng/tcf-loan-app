import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-warm">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-up">
            <Shield className="h-4 w-4" />
            <span>Trusted by 5,000+ TCF Beneficiaries</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl animate-fade-up text-balance" style={{ animationDelay: "0.1s" }}>
            Finally, A Clear Path to{" "}
            <span className="text-primary">Repay Your TCF Loan</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Stop worrying about confusing letters and threats. Our simple tools help you understand exactly what to do, how to pay, and how to protect yourself.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/tools">
                Browse Our Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/ebook">Get the eBook</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>No legal jargon</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-5 w-5 text-success" />
              <span>Instant download</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-success" />
              <span>100% secure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
