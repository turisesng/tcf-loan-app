import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Download, Shield, ArrowRight, Star } from "lucide-react";

const chapters = [
  "Understanding Your TCF Loan Agreement",
  "Calculating What You Actually Owe",
  "Your Rights as a Borrower",
  "How to Communicate with Banks",
  "Negotiating a Payment Plan",
  "Dealing with Recovery Agents",
  "Escalating Issues to CBN",
  "Rebuilding Your Credit Score",
];

const testimonials = [
  {
    name: "Chioma A.",
    location: "Lagos",
    text: "This eBook helped me understand my rights. I was able to negotiate a 40% reduction on my penalties!",
  },
  {
    name: "Emeka O.",
    location: "Abuja",
    text: "Finally, something written in language I can understand. The templates alone are worth the price.",
  },
  {
    name: "Funke B.",
    location: "Port Harcourt",
    text: "I was so stressed before reading this. Now I have a clear plan and my bank is working with me.",
  },
];

const Ebook = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-warm py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Complete Guide</span>
              </div>

              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-6">
                The TCF Loan Repayment Survival Guide
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                Everything you need to know about repaying your TCF loan, protecting your rights, and getting back on track financially. Written in plain English, with real examples and actionable steps.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row mb-8">
                <Button variant="hero" size="lg">
                  Get Instant Access - ₦5,000
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Instant PDF</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>

            {/* Book Preview */}
            <div className="relative">
              <div className="aspect-[3/4] max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 shadow-card animate-float">
                <div className="h-full flex flex-col justify-between text-primary-foreground">
                  <div>
                    <p className="text-sm font-medium opacity-80">Paying the Right Way™</p>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-2">
                      The TCF Loan Repayment Survival Guide
                    </h2>
                    <p className="text-sm opacity-80">
                      Your complete guide to navigating loan repayment
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-60">2024 Edition</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl mb-8 text-center">
              What's Inside the eBook
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-foreground">{chapter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl mb-8 text-center">
            What Readers Are Saying
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-background p-6 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 gradient-hero text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl mb-4">
            Ready to Take Control of Your Repayment?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Stop the stress and confusion. Get the complete guide today and start your journey to financial freedom.
          </p>
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Get the eBook Now - ₦5,000
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Ebook;
