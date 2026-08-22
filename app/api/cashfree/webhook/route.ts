import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Cashfree signs webhook payloads as base64(HMAC_SHA256(timestamp + rawBody, secret)).
 * Docs: https://www.cashfree.com/docs/payments/online/webhooks/verify
 */
function isValidSignature(
  rawBody: string,
  timestamp: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expected = createHmac("sha256", secret)
      .update(timestamp + rawBody)
      .digest("base64");
    const a = Buffer.from(expected);
    const b = Buffer.from(signature);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-webhook-signature") ?? "";
  const timestamp = req.headers.get("x-webhook-timestamp") ?? "";
  const secret = process.env.CASHFREE_CLIENT_SECRET;

  if (!secret || !isValidSignature(rawBody, timestamp, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const orderId: string | undefined = payload?.data?.order?.order_id;
  const paymentStatus: string | undefined = payload?.data?.payment?.payment_status;

  if (!orderId) {
    return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    // Nothing to reconcile against — acknowledge so Cashfree doesn't retry
    // forever, but this setup step is required before purchases can unlock.
    return NextResponse.json({ received: true, warning: "Supabase not configured" });
  }

  if (paymentStatus === "SUCCESS") {
    await supabase
      .from("orders")
      .update({ status: "PAID", paid_at: new Date().toISOString() })
      .eq("order_id", orderId);
  } else if (paymentStatus === "FAILED" || paymentStatus === "CANCELLED") {
    await supabase
      .from("orders")
      .update({ status: "FAILED" })
      .eq("order_id", orderId);
  }

  return NextResponse.json({ received: true });
}
