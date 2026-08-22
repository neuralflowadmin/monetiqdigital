"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Package, Heart } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AccountPage() {
  const { user, loading, configured, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && configured) {
      router.replace("/signin?redirect=/account");
    }
  }, [loading, user, configured, router]);

  if (loading) return <div className="container-lg py-16 md:py-20" />;

  if (!configured) {
    return (
      <div className="container-lg py-16 text-center md:py-24">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Authentication not configured
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to
          enable sign in and accounts.
        </p>
      </div>
    );
  }

  if (!user) return <div className="container-lg py-16 md:py-20" />;

  const name = (user.user_metadata?.full_name as string) || user.email;

  return (
    <div className="container-lg py-10 md:py-16">
      <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        My Account
      </h1>

      <div className="mt-8 max-w-lg border border-line p-6">
        <p className="text-xs font-medium text-muted">Name</p>
        <p className="mt-1 text-sm">{name}</p>
        <p className="mt-4 text-xs font-medium text-muted">Email</p>
        <p className="mt-1 text-sm">{user.email}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 max-w-lg">
        <Link
          href="/account/purchases"
          className="flex items-center gap-3 border border-line p-5 transition-colors hover:border-ink"
        >
          <Package size={18} className="text-accent" />
          <span className="text-sm font-medium">My Purchases</span>
        </Link>
        <Link
          href="/wishlist"
          className="flex items-center gap-3 border border-line p-5 transition-colors hover:border-ink"
        >
          <Heart size={18} className="text-accent" />
          <span className="text-sm font-medium">Wishlist</span>
        </Link>
      </div>

      <button
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
        className="mt-8 flex items-center gap-2 border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-danger hover:text-danger"
      >
        <LogOut size={15} />
        Sign Out
      </button>
    </div>
  );
}
