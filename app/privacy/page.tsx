import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="container-lg max-w-3xl py-12 md:py-20">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: [Insert Date]</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/90">
        <section>
          <h2 className="font-display text-base font-semibold">
            Information We Collect
          </h2>
          <p className="mt-2">
            When you create an account or make a purchase, we collect your
            name, email address and order details. Payment information (card,
            UPI, bank details) is collected and processed directly by our
            payment partner, Cashfree — MONETIQ never sees or stores it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">
            How We Use Your Information
          </h2>
          <p className="mt-2">
            We use your information to process orders, grant access to
            purchased digital products, provide customer support, and send
            important account or order updates.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">
            Third-Party Services
          </h2>
          <p className="mt-2">
            We use Cashfree for payment processing and Supabase for account
            and order data storage. These providers process your data
            according to their own privacy and security policies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">Cookies</h2>
          <p className="mt-2">
            MONETIQ uses your browser&apos;s local storage to remember items
            in your cart and wishlist. This information stays on your device
            and is not shared with third parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">Your Rights</h2>
          <p className="mt-2">
            You can request access to, correction of, or deletion of your
            personal data by contacting us via the{" "}
            <a href="/contact" className="text-accent hover:underline">
              Contact page
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold">Contact</h2>
          <p className="mt-2">
            For privacy-related questions, reach out to
            [privacy@monetiq.example.com].
          </p>
        </section>
      </div>
    </div>
  );
}
