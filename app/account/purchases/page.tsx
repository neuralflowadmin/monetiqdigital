"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getProductById } from "@/lib/products";
import { formatINR } from "@/lib/format";

interface OrderRow {
  order_id: string;
  items: { id: string; title: string; price: number; quantity: number }[];
  amount: number;
  status: string;
  paid_at: string | null;
}

export default function PurchasesPage() {
  const { user, loading: authLoading, configured } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user && configured) {
      router.replace("/signin?redirect=/account/purchases");
    }
  }, [authLoading, user, configured, router]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !user) return;

    supabase
      .from("orders")
      .select("order_id, items, amount, status, paid_at")
      .eq("user_id", user.id)
      .eq("status", "PAID") // only verified, paid orders — never grant on visit alone
      .order("paid_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setFetchError(error.message);
          return;
        }
        setOrders((data as OrderRow[]) ?? []);
      });
  }, [user]);

  if (authLoading) return <div className="container-lg py-16 md:py-20" />;

  if (!configured) {
    return (
      <div className="container-lg py-16 text-center md:py-24">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Purchases unavailable
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Connect Supabase to enable accounts and verified purchase history.
        </p>
      </div>
    );
  }

  if (!user) return <div className="container-lg py-16 md:py-20" />;

  return (
    <div className="container-lg py-10 md:py-16">
      <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        My Purchases
      </h1>
      <p className="mt-2 text-sm text-muted">
        Only verified, completed payments appear here.
      </p>

      {fetchError && (
        <p className="mt-6 text-sm text-danger">
          Couldn&apos;t load purchases: {fetchError}
        </p>
      )}

      {orders && orders.length === 0 && !fetchError && (
        <div className="mt-10 border border-dashed border-line py-16 text-center">
          <Package size={22} className="mx-auto text-muted" />
          <p className="mt-4 font-display text-base font-medium">
            No purchases yet
          </p>
          <p className="mt-1 text-sm text-muted">
            Products you buy will show up here once payment is confirmed.
          </p>
          <Link
            href="/store"
            className="mt-6 inline-block bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Browse the Store
          </Link>
        </div>
      )}

      {orders && orders.length > 0 && (
        <div className="mt-8 divide-y divide-line border-y border-line">
          {orders.flatMap((order) =>
            order.items.map((item) => {
              const product = getProductById(item.id);
              return (
                <div
                  key={`${order.order_id}-${item.id}`}
                  className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-display text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {order.paid_at
                        ? new Date(order.paid_at).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}{" "}
                      &middot; {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                  {product ? (
                    <Link
                      href={`/product/${product.slug}`}
                      className="border border-ink px-5 py-2 text-center text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
                    >
                      Access Product
                    </Link>
                  ) : (
                    <span className="text-xs text-muted">Product unavailable</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
