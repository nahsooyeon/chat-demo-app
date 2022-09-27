/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ["lh3.googleusercontent.com"],
    minimumCacheTTL: 60,
  },
  async rewrites() {
    return [{ source: "/chat", destination: "/" }];
  },
};
