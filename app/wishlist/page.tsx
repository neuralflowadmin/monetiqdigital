"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="container-lg py-10 md:py-16">
      <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="mt-10 border border-dashed border-line py-16 text-center">
          <Heart size={22} className="mx-auto text-muted" />
          <p className="mt-4 font-display text-base font-medium">
            Your wishlist is empty
          </p>
          <p className="mt-1 text-sm text-muted">
            Tap the heart icon on any product to save it here.
          </p>
          <Link
            href="/store"
            className="mt-6 inline-block bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Browse the Store
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
