import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 gradient-hero text-primary-foreground">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            <span>Complete Guide Available</span>
          </div>

          <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl mb-6">
            Get the Complete TCF Repayment Guide
          </h2>

          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our comprehensive eBook covers everything you need to know about TCF loan repayment. Written in simple language, with real examples and actionable steps.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/ebook">
                Get the eBook - ₦5,000
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <Link to="/tools">Browse Individual Tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
