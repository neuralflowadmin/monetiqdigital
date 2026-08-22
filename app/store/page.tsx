import { Suspense } from "react";
import type { Metadata } from "next";
import StoreBrowser from "@/components/StoreBrowser";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Browse the full MONETIQ collection — ebooks, courses, reel bundles and more.",
};

export default function StorePage() {
  return (
    <div className="container-lg py-12 md:py-16">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Store
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted md:text-base">
          Search, filter and sort the full MONETIQ collection.
        </p>
      </div>
      <Suspense fallback={<div className="h-96" />}>
        <StoreBrowser />
      </Suspense>
    </div>
  );
}
