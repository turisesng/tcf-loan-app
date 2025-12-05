import { Layout } from "@/components/layout/Layout";
import { Target, Heart, Users, Shield } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "We understand the stress and anxiety that comes with financial difficulties. Our tools are designed with empathy.",
  },
  {
    icon: Target,
    title: "Clarity & Simplicity",
    description: "No legal jargon, no complicated processes. Every tool is written in plain, easy-to-understand language.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "You're not alone. Thousands of Nigerians face similar challenges, and we're here to help everyone.",
  },
  {
    icon: Shield,
    title: "Your Rights Matter",
    description: "We believe in empowering you with knowledge about your legal rights as a borrower.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-warm py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-6">
              About Paying the Right Way™
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're on a mission to help Nigerian TCF loan beneficiaries navigate the repayment process with confidence, clarity, and dignity.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg text-muted-foreground space-y-4">
              <p>
                The CBN/NIRSAL Targeted Credit Facility (TCF) was created to help Nigerian businesses and households survive the economic impact of COVID-19. Millions of Naira were disbursed to beneficiaries across the country.
              </p>
              <p>
                However, as repayment time came, many beneficiaries found themselves overwhelmed. The process was confusing, communication from banks was intimidating, and many didn't know where to turn for help.
              </p>
              <p>
                <strong className="text-foreground">Paying the Right Way™</strong> was born from this need. We saw hardworking Nigerians struggling—not because they didn't want to pay, but because they didn't understand how to navigate the system.
              </p>
              <p>
                Our team of financial experts, legal advisors, and content creators came together to create simple, affordable digital tools that break down the repayment process into clear, actionable steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything we do is guided by these core principles.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="rounded-2xl bg-background p-6 border border-border animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
