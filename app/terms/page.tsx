import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <div className="container-lg max-w-3xl py-12 md:py-20">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: [Insert Date]</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/90">
        <section>
          <h2 className="font-display text-base font-semibold">1. About MONETIQ</h2>
          <p className="mt-2">
            MONETIQ (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is operated by [Business Name /
            Sole Proprietor Name], registered at [Business Address]. These
            Terms &amp; Conditions govern your use of the MONETIQ website and
            your purchase of digital products through it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">2. Digital Products</h2>
          <p className="mt-2">
            All products sold on MONETIQ are digital products delivered
            electronically. No physical goods are shipped. Access is granted
            after a purchase is successfully verified as paid.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">3. Payments</h2>
          <p className="mt-2">
            Payments are processed by our third-party payment partner,
            Cashfree. MONETIQ does not store your card, UPI or bank details.
            Prices are shown in Indian Rupees (INR) and are inclusive of
            applicable taxes unless stated otherwise.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">4. License to Use</h2>
          <p className="mt-2">
            Upon successful payment, you are granted a limited, non-exclusive,
            non-transferable license to use the purchased digital product for
            personal or business use as described on the product page.
            Redistribution, resale or public sharing of purchased products is
            not permitted unless explicitly stated.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">5. No Guaranteed Results</h2>
          <p className="mt-2">
            Courses, toolkits and resources sold on MONETIQ are educational
            and informational in nature. We do not guarantee any specific
            income, sales, follower or business outcome from using our
            products.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">6. Refunds</h2>
          <p className="mt-2">
            Please refer to our{" "}
            <a href="/refund-policy" className="text-accent hover:underline">
              Refund Policy
            </a>{" "}
            for full details. In summary, digital products are non-refundable
            once access has been granted.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">7. Changes to These Terms</h2>
          <p className="mt-2">
            We may update these Terms from time to time. Continued use of the
            website after changes are posted constitutes acceptance of the
            revised Terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">8. Contact</h2>
          <p className="mt-2">
            Questions about these Terms can be sent to [support@monetiq.example.com]
            or via our{" "}
            <a href="/contact" className="text-accent hover:underline">
              Contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
