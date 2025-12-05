import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-8">
              Terms of Service
            </h1>

            <div className="prose prose-lg text-muted-foreground space-y-6">
              <p className="text-foreground font-medium">
                Last updated: {new Date().toLocaleDateString("en-NG", { month: "long", year: "numeric" })}
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Paying the Right Way™ website and purchasing our digital products, you agree to be bound by these Terms of Service.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">2. Digital Products</h2>
              <p>
                Our digital tools and eBooks are provided for informational purposes only. They are designed to help you understand the TCF loan repayment process but do not constitute legal or financial advice.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">3. License</h2>
              <p>
                Upon purchase, you receive a personal, non-transferable license to use the digital product for your own purposes. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Share your purchased products with others</li>
                <li>Resell or redistribute our products</li>
                <li>Modify and claim as your own work</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">4. Refund Policy</h2>
              <p>
                Due to the digital nature of our products, we generally do not offer refunds once a product has been delivered. However, if you experience technical issues accessing your purchase, please contact us immediately.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">5. Disclaimer</h2>
              <p>
                The information provided in our products is based on our research and experience. Results may vary, and we cannot guarantee specific outcomes for your loan repayment situation. Always verify information with your bank or financial institution.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">6. Limitation of Liability</h2>
              <p>
                Paying the Right Way™ shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our products or services.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">8. Contact</h2>
              <p>
                For questions about these Terms, please contact us at support@payingtherightway.ng
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
