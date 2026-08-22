import { Suspense } from "react";
import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container-lg py-16 md:py-20" />}>
      <CheckoutForm />
    </Suspense>
  );
}
