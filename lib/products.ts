export type ProductCategory =
  | "Reel Bundles"
  | "AI & Productivity"
  | "Courses"
  | "Ebooks"
  | "Lookmaxxing"
  | "Business"
  | "Marketing";

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  image: string;
  shortDescription: string;
  description: string;
  highlights: string[];
}

export const CATEGORIES: ProductCategory[] = [
  "Reel Bundles",
  "AI & Productivity",
  "Courses",
  "Ebooks",
  "Lookmaxxing",
  "Business",
  "Marketing",
];

export const PRODUCTS: Product[] = [
  {
    id: "ai-toolkit",
    slug: "100-ai-powerful-tools-ultimate-ai-toolkit",
    title: "100 AI Powerful Tools — Ultimate AI Toolkit",
    category: "AI & Productivity",
    price: 99,
    originalPrice: 299,
    image: "/products/ai-toolkit.svg",
    shortDescription:
      "100 AI tools across writing, design, video, audio, coding and marketing.",
    description:
      "Discover 100 powerful AI tools across writing, content creation, image and design, video, audio, coding, marketing, research, ecommerce and advanced AI workflows. A practical toolkit for creators, students, marketers, freelancers and businesses.",
    highlights: [
      "100 curated tools across 10+ categories",
      "Organized by use case for fast lookup",
      "Built for creators, marketers and freelancers",
      "Instant digital download",
    ],
  },
  {
    id: "meesho-course",
    slug: "how-to-sell-products-on-meesho-complete-video-course",
    title: "How to Sell Products on Meesho — Complete Video Course",
    category: "Courses",
    price: 99,
    originalPrice: 499,
    image: "/products/meesho-course.svg",
    shortDescription:
      "A step-by-step video course on selling products on Meesho.",
    description:
      "A practical step-by-step video course covering the fundamentals of selling products on Meesho, including seller setup, product listing, receiving orders, fulfillment and getting paid.",
    highlights: [
      "Seller account setup walkthrough",
      "Product listing best practices",
      "Order fulfillment and payments explained",
      "Beginner-friendly, self-paced video lessons",
    ],
  },
  {
    id: "fitness-reels",
    slug: "mega-fitness-reel-bundle-1000-premium-reels",
    title: "Mega Fitness Reel Bundle — 1,000+ Premium Reels",
    category: "Reel Bundles",
    price: 99,
    originalPrice: 499,
    image: "/products/fitness-reels.svg",
    shortDescription:
      "1,000+ ready-to-use fitness, yoga and transformation reels.",
    description:
      "A ready-to-use collection of fitness-focused reels covering workouts, fitness motivation, yoga, diet, cardio, lifestyle and transformation content. Designed for creators building fitness-focused social media pages.",
    highlights: [
      "1,000+ reels across fitness sub-niches",
      "Workouts, yoga, diet and motivation content",
      "Ready for Instagram, YouTube Shorts and TikTok",
      "Instant access after purchase",
    ],
  },
  {
    id: "170k-reels",
    slug: "170k-ultimate-mega-reel-bundle",
    title: "170K+ Ultimate Mega Reel Bundle",
    category: "Reel Bundles",
    price: 99,
    originalPrice: 999,
    image: "/products/170k-reels.svg",
    shortDescription:
      "170K+ reels spanning AI, business, fitness, luxury and more.",
    description:
      "A massive collection of ready-to-use reels covering multiple creative niches including AI, motivation, business, fitness, lifestyle, cars, luxury, anime, nature and more.",
    highlights: [
      "170K+ reels across dozens of niches",
      "Organized folders by category",
      "Great for multi-niche content pages",
      "Instant digital download",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
