import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import { formatINR, discountPercent } from "@/lib/format";
import CountdownTimer from "@/components/CountdownTimer";
import ProductActions from "@/components/ProductActions";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const discount = discountPercent(product.originalPrice, product.price);
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container-lg py-10 md:py-16">
      <nav className="mb-8 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/store" className="hover:text-accent">
          Store
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
          {discount > 0 && (
            <span className="absolute right-4 top-4 bg-accent px-3 py-1 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
        </div>

        <div>
          <span className="text-xs font-medium tracking-wide text-accent">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            {product.title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-baseline gap-3">
            <span className="font-mono text-3xl font-semibold tnum">
              {formatINR(product.price)}
            </span>
            <span className="font-mono text-base text-muted line-through tnum">
              {formatINR(product.originalPrice)}
            </span>
          </div>

          <div className="mt-6">
            <CountdownTimer />
          </div>

          <div className="mt-6">
            <ProductActions product={product} />
          </div>

          <div className="mt-6 space-y-1.5 text-xs text-muted">
            <p>Digital product &middot; Instant access after successful payment</p>
            <p>Digital products are non-refundable.</p>
            <p>
              By purchasing, you agree to the MONETIQ{" "}
              <Link href="/terms" className="text-accent hover:underline">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-line pt-14 md:mt-28">
          <h2 className="mb-8 font-display text-xl font-semibold tracking-tight md:text-2xl">
            You may also like
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
