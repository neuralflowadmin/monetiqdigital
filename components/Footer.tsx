import Link from "next/link";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { href: "/store", label: "Store" },
      { href: "/store#categories", label: "Categories" },
      { href: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/signin", label: "Sign In" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-lg grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:py-16">
        <div>
          <Link href="/" className="font-display text-xl font-semibold tracking-tight">
            MONET<span className="text-accent">IQ</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Premium digital resources for creators, learners and modern
            businesses.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm font-medium">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-lg flex flex-col gap-2 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} MONETIQ. All rights reserved.</p>
          <p>Digital products &middot; Instant access &middot; Secure checkout</p>
        </div>
      </div>
    </footer>
  );
}
