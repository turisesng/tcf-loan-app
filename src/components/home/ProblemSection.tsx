import { AlertTriangle, HelpCircle, FileWarning, Ban } from "lucide-react";

const problems = [
  {
    icon: FileWarning,
    title: "Confusing Letters",
    description: "You received letters from banks or CBN but don't understand what they mean or what to do next.",
  },
  {
    icon: AlertTriangle,
    title: "Threats & Pressure",
    description: "Recovery agents are calling, threatening legal action, and making you feel helpless.",
  },
  {
    icon: HelpCircle,
    title: "No Clear Guidance",
    description: "You want to pay but don't know the right steps, the right amount, or who to contact.",
  },
  {
    icon: Ban,
    title: "Fear of Blacklist",
    description: "You're worried about being blacklisted and how it will affect your future access to credit.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-4">
            Are You Facing These Challenges?
          </h2>
          <p className="text-lg text-muted-foreground">
            If you received a TCF loan and are struggling with repayment, you're not alone. Thousands of Nigerians face these same problems every day.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="group rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:shadow-card hover:border-primary/20 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive transition-colors group-hover:bg-destructive group-hover:text-destructive-foreground">
                <problem.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground text-lg">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
