"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type Status = "checking" | "paid" | "failed";

export default function CheckoutReturn() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    if (!orderId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time check of the redirect URL from Cashfree
      setStatus("failed");
      return;
    }
    fetch(`/api/cashfree/verify?order_id=${encodeURIComponent(orderId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "PAID") {
          setStatus("paid");
          clearCart();
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className="container-lg flex flex-col items-center py-24 text-center md:py-32">
      {status === "checking" && (
        <>
          <Loader2 size={32} className="animate-spin text-accent" />
          <h1 className="mt-5 font-display text-xl font-semibold">
            Verifying your payment…
          </h1>
          <p className="mt-2 text-sm text-muted">This only takes a moment.</p>
        </>
      )}

      {status === "paid" && (
        <>
          <CheckCircle2 size={36} className="text-accent" />
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
            Payment successful
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Your order is confirmed. Access your product from your purchases
            page.
          </p>
          <Link
            href="/account/purchases"
            className="mt-7 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Go to My Purchases
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <XCircle size={36} className="text-danger" />
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
            We couldn&apos;t confirm this payment
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted">
            If money was deducted, it will be verified shortly. Otherwise,
            please try again.
          </p>
          <Link
            href="/checkout"
            className="mt-7 border border-ink px-6 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            Back to Checkout
          </Link>
        </>
      )}
    </div>
  );
}
