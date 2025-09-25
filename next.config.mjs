/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    // Allow using data URLs for placeholders
    remotePatterns: [],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
