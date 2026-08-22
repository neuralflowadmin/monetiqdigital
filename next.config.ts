import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The placeholder product artwork ships as SVG; replace with real
    // product photography (jpg/png/webp) before going live and this
    // can be removed.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
