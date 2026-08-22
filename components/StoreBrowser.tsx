"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, ProductCategory } from "@/lib/products";

type SortKey = "featured" | "price-low" | "price-high" | "popular";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Best Sellers" },
];

export default function StoreBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory =
    (searchParams.get("category") as ProductCategory | null) ?? "All";
  const initialQuery = searchParams.get("q") ?? "";
  const initialSort = (searchParams.get("sort") as SortKey | null) ?? "featured";

  const [category, setCategory] = useState<ProductCategory | "All">(
    initialCategory
  );
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortKey>(initialSort);

  const updateUrl = (next: {
    category?: ProductCategory | "All";
    q?: string;
    sort?: SortKey;
  }) => {
    const params = new URLSearchParams();
    const c = next.category ?? category;
    const q = next.q ?? query;
    const s = next.sort ?? sort;
    if (c !== "All") params.set("category", c);
    if (q) params.set("q", q);
    if (s !== "featured") params.set("sort", s);
    router.replace(`/store${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        list.sort(
          (a, b) =>
            b.originalPrice - b.price - (a.originalPrice - a.price)
        );
        break;
      default:
        break;
    }

    return list;
  }, [category, query, sort]);

  return (
    <div>
      <div id="categories" className="mb-8 flex flex-col gap-4 md:mb-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUrl({ q: query });
          }}
          className="flex items-center border border-line px-4 py-2.5 text-sm md:max-w-sm"
        >
          <Search size={16} className="mr-2 shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => updateUrl({ q: query })}
            placeholder="Search products"
            aria-label="Search products"
            className="w-full bg-transparent outline-none placeholder:text-muted"
          />
        </form>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {(["All", ...CATEGORIES] as (ProductCategory | "All")[]).map(
              (c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    updateUrl({ category: c });
                  }}
                  className={`border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    category === c
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-ink/80 hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              )
            )}
          </div>

          <label className="flex items-center gap-2 text-[13px] text-muted">
            Sort by
            <select
              value={sort}
              onChange={(e) => {
                const value = e.target.value as SortKey;
                setSort(value);
                updateUrl({ sort: value });
              }}
              className="border border-line bg-paper px-2.5 py-1.5 text-ink outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-line py-20 text-center">
          <p className="font-display text-lg font-medium">No products found</p>
          <p className="mt-2 text-sm text-muted">
            Try a different search term or clear your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
