import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="container-lg max-w-2xl py-14 md:py-24">
      <p className="font-mono text-xs font-medium tracking-[0.18em] text-accent">
        ABOUT MONETIQ
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        A digital library built for people who move fast.
      </h1>
      <p className="mt-6 text-[15px] leading-relaxed text-muted">
        MONETIQ is a digital product marketplace built for creators,
        students, entrepreneurs and modern businesses. We curate and build
        practical resources — ebooks, courses, reel bundles and AI tool
        collections — designed to save you time and help you get started
        faster.
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        Every product is a digital download, delivered instantly after a
        verified purchase. No physical shipping, no waiting.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          { label: "Digital Products", value: "Ebooks, courses & bundles" },
          { label: "Instant Access", value: "Delivered after payment" },
          { label: "Secure Checkout", value: "Powered by Cashfree" },
        ].map((item) => (
          <div key={item.label} className="border border-line p-4">
            <p className="font-display text-sm font-medium">{item.label}</p>
            <p className="mt-1 text-xs text-muted">{item.value}</p>
          </div>
        ))}
      </div>

      <Link
        href="/store"
        className="mt-10 inline-block bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
      >
        Explore the Store
      </Link>
    </div>
  );
}
