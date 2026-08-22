"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/products";
import { formatINR, discountPercent } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const discount = discountPercent(product.originalPrice, product.price);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group flex flex-col border border-line bg-paper transition-colors hover:border-line-strong">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-ink"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className="absolute left-3 top-3 border border-white/30 bg-black/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-sm">
          {product.category}
        </span>
        {discount > 0 && (
          <span className="absolute right-3 top-3 bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink transition-transform hover:scale-105"
        >
          <Heart
            size={15}
            fill={wishlisted ? "#3B5BFF" : "none"}
            color={wishlisted ? "#3B5BFF" : "currentColor"}
          />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-[15px] font-medium leading-snug">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-medium tnum">
              {formatINR(product.price)}
            </span>
            <span className="font-mono text-xs text-muted line-through tnum">
              {formatINR(product.originalPrice)}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="border border-line py-2 text-center text-[13px] font-medium transition-colors hover:border-ink"
          >
            View Product
          </Link>
          <button
            onClick={() => addItem(product.id)}
            className="flex items-center justify-center gap-1.5 bg-ink py-2 text-[13px] font-medium text-paper transition-colors hover:bg-accent"
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
