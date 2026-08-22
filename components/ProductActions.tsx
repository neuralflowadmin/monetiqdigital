"use client";

import { useRouter } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export default function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const buyNow = () => {
    addItem(product.id, 1);
    router.push(`/checkout?buyNow=${product.id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <button
        onClick={buyNow}
        className="bg-accent py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Buy Now
      </button>
      <button
        onClick={() => addItem(product.id, 1)}
        className="flex items-center justify-center gap-2 border border-ink py-3.5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
      >
        <ShoppingBag size={16} />
        Add to Cart
      </button>
      <button
        onClick={() => toggle(product.id)}
        aria-pressed={wishlisted}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="flex items-center justify-center gap-2 border border-line px-4 py-3.5 text-sm font-medium transition-colors hover:border-ink"
      >
        <Heart
          size={16}
          fill={wishlisted ? "#3B5BFF" : "none"}
          color={wishlisted ? "#3B5BFF" : "currentColor"}
        />
        <span className="sm:hidden">
          {wishlisted ? "Wishlisted" : "Wishlist"}
        </span>
      </button>
    </div>
  );
}
