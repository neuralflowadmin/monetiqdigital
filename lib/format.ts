export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function discountPercent(original: number, current: number): number {
  if (original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
