"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const SUPPORT_EMAIL = "support@monetiq.example.com";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentVia, setSentVia] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email.";
    if (message.trim().length < 10) next.message = "Message must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`MONETIQ contact form — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSentVia(true);
  };

  return (
    <div className="container-lg py-12 md:py-20">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Contact Us
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Have a question about a product, an order, or access to something
            you purchased? Send us a message.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm">
            <Mail size={16} className="text-accent" />
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-accent">
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-danger">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-danger">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-danger">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-ink py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Send Message
          </button>

          {sentVia && (
            <p className="text-xs text-muted">
              Opening your email app with your message pre-filled — send it
              from there to reach us.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
