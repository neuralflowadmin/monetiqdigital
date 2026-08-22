import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrustStrip from "@/components/TrustStrip";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full opacity-[0.05] blur-3xl"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />

        <div className="container-lg relative py-20 md:py-28">
          <div className="fade-up max-w-3xl">
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-accent">
              THE DIGITAL LIBRARY FOR YOUR NEXT MOVE
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
              Everything You Need to Learn, Create &amp; Grow.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Discover premium ebooks, courses, reel bundles and digital
              resources curated for creators, students, entrepreneurs and
              modern businesses.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/store"
                className="flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                Explore Store
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/store?sort=popular"
                className="flex items-center gap-2 border border-ink px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                View Best Sellers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="container-lg py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Explore Our Collection
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted md:text-base">
              Practical digital resources designed to help you move faster.
            </p>
          </div>
          <Link
            href="/store"
            className="flex w-fit items-center gap-1.5 border-b border-ink pb-0.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            View all products
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
