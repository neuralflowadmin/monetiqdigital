"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = getSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError(
        "Password reset is not configured yet. Add your Supabase environment variables to enable authentication."
      );
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/signin`
            : undefined,
      }
    );
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    setSent(true);
  };

  return (
    <div className="container-lg flex justify-center py-16 md:py-24">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Reset Password
        </h1>
        <p className="mt-2 text-sm text-muted">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        {sent ? (
          <p className="mt-8 border border-line bg-paper-dim p-4 text-sm">
            If an account exists for {email}, a reset link is on its way.
          </p>
        ) : (
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

            {error && <p className="text-xs text-danger">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink py-3 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/signin" className="text-accent hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
