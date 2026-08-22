import { FileDown, Zap, ShieldCheck, LibraryBig } from "lucide-react";

const ITEMS = [
  { icon: FileDown, label: "Digital Products" },
  { icon: Zap, label: "Instant Access" },
  { icon: ShieldCheck, label: "Secure Checkout" },
  { icon: LibraryBig, label: "Curated Resources" },
];

export default function TrustStrip() {
  return (
    <div className="border-y border-line">
      <div className="container-lg grid grid-cols-2 divide-x divide-y divide-line border-x border-line md:grid-cols-4 md:divide-y-0">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-5 py-6 md:justify-center"
          >
            <Icon size={18} className="shrink-0 text-accent" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
