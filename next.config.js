/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  cacheComponents: true,
  experimental: {
    useCache: true,
  },
};

module.exports = nextConfig;
