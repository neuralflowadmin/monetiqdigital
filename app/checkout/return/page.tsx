import { Suspense } from "react";
import type { Metadata } from "next";
import CheckoutReturn from "@/components/CheckoutReturn";

export const metadata: Metadata = {
  title: "Payment Status",
};

export default function CheckoutReturnPage() {
  return (
    <Suspense fallback={<div className="container-lg py-24 md:py-32" />}>
      <CheckoutReturn />
    </Suspense>
  );
}
