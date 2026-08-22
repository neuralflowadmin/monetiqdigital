import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
};

export default function RefundPolicyPage() {
  return (
    <div className="container-lg max-w-3xl py-12 md:py-20">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Refund Policy
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: [Insert Date]</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/90">
        <section>
          <h2 className="font-display text-base font-semibold">All Sales Are Final</h2>
          <p className="mt-2">
            Due to the digital nature of MONETIQ products, all sales are
            final and refunds are not available. Once a product has been
            purchased and access has been granted, the purchase cannot be
            reversed or refunded.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">
            Delivery or Access Issues
          </h2>
          <p className="mt-2">
            If you experience a genuine issue accessing a product you have
            purchased — for example, a failed download link or a payment
            that was deducted but not reflected in your account — please
            contact our support team through the{" "}
            <a href="/contact" className="text-accent hover:underline">
              Contact page
            </a>{" "}
            with your order details. We will investigate and help resolve
            the issue.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">
            Before You Buy
          </h2>
          <p className="mt-2">
            Please review each product&apos;s description, images and
            included highlights carefully before purchasing, since digital
            products cannot be returned once delivered.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">Contact</h2>
          <p className="mt-2">
            For any questions about this policy, reach out via our{" "}
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
