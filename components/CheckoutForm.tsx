"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { formatINR } from "@/lib/format";

declare global {
  interface Window {
    Cashfree?: (config: { mode: "sandbox" | "production" }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: "_self" | "_blank" | "_modal";
      }) => void;
    };
  }
}

export default function CheckoutForm() {
  const { items, ready } = useCart();
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const buyNowId = searchParams.get("buyNow");

  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the shopper arrived via "Buy Now", checkout that single product only.
  const lineItems = useMemo(() => {
    if (buyNowId) {
      const match = items.find((i) => i.product.id === buyNowId);
      return match ? [match] : items;
    }
    return items;
  }, [items, buyNowId]);

  const total = useMemo(
    () => lineItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [lineItems]
  );

  const handlePay = async () => {
    if (!agreed || lineItems.length === 0 || !user) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/cashfree/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Only IDs and quantities are sent — the server looks up the
          // authoritative price from lib/products.ts. Client-side prices
          // are never trusted.
          items: lineItems.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const { paymentSessionId, mode } = data;

      if (window.Cashfree) {
        const cashfree = window.Cashfree({ mode });
        cashfree.checkout({
          paymentSessionId,
          redirectTarget: "_self",
        });
      } else {
        setError(
          "Payment SDK failed to load. Please check your connection and try again."
        );
        setSubmitting(false);
      }
    } catch {
      setError("Something went wrong creating your order. Please try again.");
      setSubmitting(false);
    }
  };

  if (!ready) return <div className="container-lg py-16 md:py-20" />;

  if (lineItems.length === 0) {
    return (
      <div className="container-lg flex flex-col items-center py-24 text-center md:py-32">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Nothing to check out
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Your cart is empty. Add a product before checking out.
        </p>
        <Link
          href="/store"
          className="mt-7 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Browse the Store
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
      />
      <div className="container-lg py-10 md:py-16">
        <h1 className="mb-8 font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="divide-y divide-line border-y border-line">
            {lineItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 py-5">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-ink">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="font-display text-sm font-medium leading-snug">
                      {product.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">Qty {quantity}</p>
                  </div>
                  <span className="font-mono text-sm tnum">
                    {formatINR(product.price * quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit border border-line p-6">
            <h2 className="font-display text-lg font-semibold">Order Summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-mono tnum">{formatINR(total)}</span>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-medium">
                <span>Total</span>
                <span className="font-mono tnum">{formatINR(total)}</span>
              </div>
            </div>

            {!authLoading && !user ? (
              <div className="mt-6 border border-line bg-paper-dim p-4">
                <p className="text-xs leading-relaxed text-muted">
                  Sign in so your purchase can be verified and added to your
                  account.
                </p>
                <Link
                  href={`/signin?redirect=${encodeURIComponent(
                    "/checkout" + (buyNowId ? `?buyNow=${buyNowId}` : "")
                  )}`}
                  className="mt-3 block bg-ink py-2.5 text-center text-sm font-medium text-paper transition-colors hover:bg-accent"
                >
                  Sign In to Continue
                </Link>
              </div>
            ) : (
              <>
                <label className="mt-6 flex items-start gap-2.5 text-xs leading-relaxed text-muted">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#3B5BFF]"
                  />
                  <span>
                    I agree to the MONETIQ{" "}
                    <Link href="/terms" className="text-accent hover:underline">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and understand that digital products are non-refundable.
                  </span>
                </label>

                {!agreed && (
                  <p className="mt-2 text-xs text-danger">
                    Please accept the Terms &amp; Conditions before continuing.
                  </p>
                )}
                {error && <p className="mt-2 text-xs text-danger">{error}</p>}

                <button
                  onClick={handlePay}
                  disabled={!agreed || submitting}
                  className="mt-4 w-full bg-accent py-3.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? "Processing…" : `Pay ${formatINR(total)}`}
                </button>

                <p className="mt-4 text-[11px] leading-relaxed text-muted">
                  Payments are processed securely by Cashfree. MONETIQ never
                  stores your card or bank details.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
