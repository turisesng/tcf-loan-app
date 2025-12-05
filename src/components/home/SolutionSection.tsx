import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutions = [
  "Step-by-step repayment guides written in plain English",
  "Template letters you can use to negotiate with banks",
  "Calculators to know exactly what you owe",
  "Sample payment plans you can propose",
  "Legal rights awareness so you know what's allowed",
  "Direct contact information for resolution",
];

export function SolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-success">
              <CheckCircle className="h-4 w-4" />
              <span>The Solution</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-6">
              Simple Tools That Actually Help
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We've created easy-to-use digital tools that guide you through every step of the repayment process. No complicated legal language. No confusing forms. Just clear, actionable help.
            </p>

            <ul className="space-y-4 mb-8">
              {solutions.map((solution, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{solution}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" asChild>
              <Link to="/tools">
                Explore Our Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 md:p-12">
              <div className="space-y-4">
                {/* Mock tool cards */}
                <div className="rounded-xl bg-background p-4 shadow-soft animate-float">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      TL1
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Repayment Calculator</p>
                      <p className="text-sm text-muted-foreground">Know exactly what you owe</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 shadow-soft animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent-foreground font-bold text-sm">
                      TL2
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Negotiation Letters</p>
                      <p className="text-sm text-muted-foreground">Professional templates ready</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 shadow-soft animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center text-success font-bold text-sm">
                      TL3
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Rights Guide</p>
                      <p className="text-sm text-muted-foreground">Know your legal protection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
