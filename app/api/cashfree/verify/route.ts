import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("order_id");
  if (!orderId) {
    return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
  }

  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  const env = process.env.CASHFREE_ENV === "production" ? "production" : "sandbox";

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
  }

  const baseUrl =
    env === "production"
      ? `https://api.cashfree.com/pg/orders/${orderId}`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

  const cfRes = await fetch(baseUrl, {
    headers: {
      "x-client-id": clientId,
      "x-client-secret": clientSecret,
      "x-api-version": "2023-08-01",
    },
  });

  const cfData = await cfRes.json();
  const status: string = cfData.order_status;

  // Reconcile our own record so /account/purchases reflects reality even
  // if the webhook hasn't landed yet.
  const supabase = getSupabaseServerClient();
  if (supabase) {
    if (status === "PAID") {
      await supabase
        .from("orders")
        .update({ status: "PAID", paid_at: new Date().toISOString() })
        .eq("order_id", orderId);
    } else if (status === "EXPIRED" || status === "TERMINATED") {
      await supabase.from("orders").update({ status: "FAILED" }).eq("order_id", orderId);
    }
  }

  return NextResponse.json({ status });
}
