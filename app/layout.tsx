import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { AuthProvider } from "@/lib/auth-context";

const SITE_URL = "https://monetiq.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MONETIQ — Premium Digital Products & Resources",
    template: "%s | MONETIQ",
  },
  description:
    "Discover premium ebooks, courses, reel bundles and digital resources curated for creators, students, entrepreneurs and modern businesses.",
  openGraph: {
    title: "MONETIQ — Premium Digital Products & Resources",
    description:
      "Discover premium ebooks, courses, reel bundles and digital resources curated for creators, students, entrepreneurs and modern businesses.",
    url: SITE_URL,
    siteName: "MONETIQ",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body
        className="flex min-h-full flex-col font-body antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
