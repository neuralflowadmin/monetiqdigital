"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = getSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError(
        "Sign in is not configured yet. Add your Supabase environment variables to enable authentication."
      );
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    router.push(redirect);
  };

  return (
    <div className="container-lg flex justify-center py-16 md:py-24">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Sign In
        </h1>
        <p className="mt-2 text-sm text-muted">
          Welcome back. Sign in to access your purchases.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-xs font-medium text-muted">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-accent hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-xs text-danger">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink py-3 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="container-lg py-24" />}>
      <SignInForm />
    </Suspense>
  );
}
