import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24-48 hours.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-warm py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our tools or need help with your TCF loan repayment? We're here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl mb-6">
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-8">
                Reach out to us through any of these channels. We typically respond within 24-48 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">support@payingtherightway.ng</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+234 XXX XXX XXXX</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm WAT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="tools">Question about Tools</option>
                    <option value="payment">Payment Issue</option>
                    <option value="support">Need Help with Repayment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
