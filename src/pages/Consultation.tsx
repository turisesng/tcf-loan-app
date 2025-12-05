import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, CheckCircle, Phone, Video, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const consultationPlans = [
  {
    id: "basic",
    name: "Quick Consult",
    duration: "30 minutes",
    price: 15000,
    description: "Perfect for quick questions and basic guidance",
    features: [
      "One-on-one phone call",
      "Loan status review",
      "Basic repayment advice",
      "Email summary after call",
    ],
    icon: Phone,
    popular: false,
  },
  {
    id: "standard",
    name: "Standard Session",
    duration: "1 hour",
    price: 35000,
    description: "Comprehensive review of your loan situation",
    features: [
      "Video consultation",
      "Full loan analysis",
      "Personalized repayment plan",
      "Document review",
      "7-day email support",
    ],
    icon: Video,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Package",
    duration: "2 hours + Follow-up",
    price: 75000,
    description: "Complete support for complex loan situations",
    features: [
      "Extended video session",
      "Detailed financial assessment",
      "Custom repayment strategy",
      "Letter drafting assistance",
      "30-day priority support",
      "Follow-up session included",
    ],
    icon: Users,
    popular: false,
  },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export default function Consultation() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    loanDetails: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) {
      toast({
        title: "Please select a plan",
        description: "Choose a consultation package to continue.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Booking Request Received!",
      description: "We'll contact you within 24 hours to confirm your appointment.",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              Expert Guidance
            </span>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-6">
              Get Personalized Help With Your{" "}
              <span className="text-primary">NIRSAL TCF Loan</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Book a consultation with our experts who understand the TCF program inside out. 
              Get clear, actionable advice tailored to your specific situation.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl mb-4">
              Choose Your Consultation Plan
            </h2>
            <p className="text-muted-foreground">
              Select the package that best fits your needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {consultationPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-elegant ${
                  selectedPlan === plan.id
                    ? "ring-2 ring-primary border-primary"
                    : "border-border hover:border-primary/50"
                } ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <plan.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="font-display text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <span className="font-display text-3xl font-bold text-foreground">
                      {formatPrice(plan.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                    <Clock className="h-4 w-4" />
                    <span>{plan.duration}</span>
                  </div>
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={selectedPlan === plan.id ? "hero" : "outline"}
                    className="w-full"
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl mb-4">
                Book Your Appointment
              </h2>
              <p className="text-muted-foreground">
                Fill in your details and we'll confirm your consultation within 24 hours
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="080XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select
                        value={formData.preferredTime}
                        onValueChange={(value) => handleInputChange("preferredTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanDetails">
                      Brief Description of Your Loan Situation (Optional)
                    </Label>
                    <Textarea
                      id="loanDetails"
                      placeholder="Tell us a bit about your loan amount, current challenges, or specific questions..."
                      rows={4}
                      value={formData.loanDetails}
                      onChange={(e) => handleInputChange("loanDetails", e.target.value)}
                    />
                  </div>

                  {selectedPlan && (
                    <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">
                            {consultationPlans.find((p) => p.id === selectedPlan)?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {consultationPlans.find((p) => p.id === selectedPlan)?.duration}
                          </p>
                        </div>
                        <p className="font-display text-xl font-bold text-primary">
                          {formatPrice(
                            consultationPlans.find((p) => p.id === selectedPlan)?.price || 0
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Consultation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl mb-6">
              Why Choose Our Consultation?
            </h2>
            <div className="grid gap-6 sm:grid-cols-3 mt-10">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">TCF Experts</h3>
                <p className="text-sm text-muted-foreground">
                  Our consultants specialize in NIRSAL TCF loans
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Practical Advice</h3>
                <p className="text-sm text-muted-foreground">
                  Get real solutions that work for your situation
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Confidential</h3>
                <p className="text-sm text-muted-foreground">
                  Your information is kept strictly private
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
