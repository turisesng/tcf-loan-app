import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-8">
              Privacy Policy
            </h1>

            <div className="prose prose-lg text-muted-foreground space-y-6">
              <p className="text-foreground font-medium">
                Last updated: {new Date().toLocaleDateString("en-NG", { month: "long", year: "numeric" })}
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
              <p>
                When you purchase our digital tools or eBook, we collect your name, email address, and payment information. This information is necessary to process your order and deliver your purchase.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send you purchase confirmations and download links</li>
                <li>Provide customer support</li>
                <li>Send important updates about your purchased tools</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">3. Payment Security</h2>
              <p>
                All payments are processed securely through Paystack and Flutterwave. We do not store your card details on our servers. These payment processors are PCI-DSS compliant.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">4. Data Protection</h2>
              <p>
                We implement appropriate security measures to protect your personal information. Your data is stored securely and accessed only by authorized personnel.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request correction of your data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at support@payingtherightway.ng
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
