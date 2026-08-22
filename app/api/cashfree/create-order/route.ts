import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getProductById } from "@/lib/products";
import { getSupabaseServerClient } from "@/lib/supabase/server";

interface CartLineInput {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CartLineInput[] = Array.isArray(body.items) ? body.items : [];
    const userId: string | undefined = body.userId;
    const email: string | undefined = body.email;

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to check out." },
        { status: 401 }
      );
    }

    if (items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    // Recompute the order amount entirely from server-side product data.
    // The client only ever sends product IDs and quantities.
    let orderAmount = 0;
    const resolvedItems: { id: string; title: string; price: number; quantity: number }[] = [];

    for (const line of items) {
      const product = getProductById(line.productId);
      const quantity = Math.max(1, Math.min(10, Number(line.quantity) || 1));
      if (!product) {
        return NextResponse.json(
          { error: `Unknown product: ${line.productId}` },
          { status: 400 }
        );
      }
      orderAmount += product.price * quantity;
      resolvedItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
      });
    }

    const clientId = process.env.CASHFREE_CLIENT_ID;
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
    const env = process.env.CASHFREE_ENV === "production" ? "production" : "sandbox";

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          error:
            "Payments are not configured yet. Set CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET.",
        },
        { status: 503 }
      );
    }

    const orderId = `monetiq_${Date.now()}_${randomUUID().slice(0, 8)}`;
    const baseUrl =
      env === "production"
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders";

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin;

    const cfRes = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": clientId,
        "x-client-secret": clientSecret,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: orderAmount,
        order_currency: "INR",
        customer_details: {
          customer_id: userId,
          customer_email: email || "guest@monetiq.example.com",
          customer_phone: "9999999999",
        },
        order_meta: {
          return_url: `${siteUrl}/checkout/return?order_id={order_id}`,
        },
      }),
    });

    const cfData = await cfRes.json();

    if (!cfRes.ok) {
      return NextResponse.json(
        { error: cfData?.message ?? "Failed to create payment order." },
        { status: 502 }
      );
    }

    // Persist a PENDING order so the webhook can later verify + fulfil it,
    // and so /account/purchases only ever shows verified purchases.
    const supabase = getSupabaseServerClient();
    if (supabase) {
      await supabase.from("orders").insert({
        order_id: orderId,
        user_id: userId,
        items: resolvedItems,
        amount: orderAmount,
        status: "PENDING",
      });
    }

    return NextResponse.json({
      orderId,
      paymentSessionId: cfData.payment_session_id,
      mode: env,
    });
  } catch (err) {
    console.error("create-order error", err);
    return NextResponse.json(
      { error: "Unexpected error creating order." },
      { status: 500 }
    );
  }
}
