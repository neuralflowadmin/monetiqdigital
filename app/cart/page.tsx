"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatINR } from "@/lib/format";

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal, ready } = useCart();

  if (!ready) {
    return <div className="container-lg py-16 md:py-20" />;
  }

  if (items.length === 0) {
    return (
      <div className="container-lg flex flex-col items-center py-24 text-center md:py-32">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Your cart is empty
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Browse the store and add a product to get started.
        </p>
        <Link
          href="/store"
          className="mt-7 flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Continue Shopping
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-lg py-10 md:py-16">
      <h1 className="mb-8 font-display text-2xl font-semibold tracking-tight md:text-3xl">
        Your Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-line border-y border-line">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 py-5 md:gap-6">
              <Link
                href={`/product/${product.slug}`}
                className="relative h-24 w-20 shrink-0 overflow-hidden bg-ink md:h-28 md:w-24"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-display text-sm font-medium leading-snug md:text-base"
                    >
                      {product.title}
                    </Link>
                    <p className="mt-1 text-xs text-muted">{product.category}</p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    aria-label="Remove item"
                    className="shrink-0 text-muted transition-colors hover:text-danger"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center border border-line">
                    <button
                      onClick={() => setQuantity(product.id, quantity - 1)}
                      aria-label="Decrease quantity"
                      className="grid h-8 w-8 place-items-center hover:text-accent"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center font-mono text-sm tnum">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                      className="grid h-8 w-8 place-items-center hover:text-accent"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-mono text-sm font-medium tnum">
                    {formatINR(product.price * quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit border border-line p-6">
          <h2 className="font-display text-lg font-semibold">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono tnum">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-medium">
              <span>Total</span>
              <span className="font-mono tnum">{formatINR(subtotal)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex items-center justify-center gap-2 bg-ink py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Checkout
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/store"
            className="mt-3 block text-center text-sm text-muted transition-colors hover:text-accent"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
