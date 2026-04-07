import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // TEMPORARY: Allows all HTTPS images during frontend development
        protocol: "https",
        hostname: "**",
      },
      /* 
      // PRODUCTION SETTINGS:
      // Replace the above wildcard with your exact WooCommerce URL
      {
        protocol: 'https',
        hostname: 'your-woocommerce-domain.com.au',
        pathname: '/wp-content/uploads/**',
      },
      */
    ],
  },
};

export default nextConfig;
