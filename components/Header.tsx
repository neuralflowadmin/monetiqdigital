"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useAuth } from "@/lib/auth-context";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/store#categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    router.push(query.trim() ? `/store?q=${encodeURIComponent(query.trim())}` : "/store");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-lg flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight md:text-2xl"
        >
          MONET<span className="text-accent">IQ</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-ink/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <form
            onSubmit={submitSearch}
            className="hidden items-center border border-line px-3 py-1.5 text-sm md:flex"
          >
            <Search size={15} className="mr-2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              className="w-40 bg-transparent outline-none placeholder:text-muted"
            />
          </form>

          <Link
            href="/store"
            aria-label="Search"
            className="grid h-9 w-9 place-items-center text-ink/80 hover:text-accent md:hidden"
          >
            <Search size={19} />
          </Link>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative grid h-9 w-9 place-items-center text-ink/80 hover:text-accent"
          >
            <Heart size={19} />
            {wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-medium text-white">
                {wishCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative grid h-9 w-9 place-items-center text-ink/80 hover:text-accent"
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-medium text-white">
                {count}
              </span>
            )}
          </Link>

          <Link
            href={user ? "/account" : "/signin"}
            className="ml-1 hidden items-center gap-1.5 border border-ink px-4 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper md:flex"
          >
            <User size={15} />
            {user ? "Account" : "Sign In"}
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <div className="container-lg flex flex-col gap-1 py-3">
            <form onSubmit={submitSearch} className="mb-2 flex items-center border border-line px-3 py-2 text-sm">
              <Search size={15} className="mr-2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="w-full bg-transparent outline-none placeholder:text-muted"
              />
            </form>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-ink/80"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={user ? "/account" : "/signin"}
              onClick={() => setOpen(false)}
              className="mt-2 border border-ink py-2.5 text-center text-sm font-medium"
            >
              {user ? "Account" : "Sign In"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
