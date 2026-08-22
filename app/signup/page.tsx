"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = getSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!supabase) {
      setError(
        "Sign up is not configured yet. Add your Supabase environment variables to enable authentication."
      );
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push("/signin"), 1500);
  };

  return (
    <div className="container-lg flex justify-center py-16 md:py-24">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-muted">
          Join MONETIQ to track your purchases.
        </p>

        {success ? (
          <p className="mt-8 border border-line bg-paper-dim p-4 text-sm">
            Account created. Check your inbox to confirm your email, then
            sign in.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
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
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>

            {error && <p className="text-xs text-danger">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink py-3 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/signin" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
