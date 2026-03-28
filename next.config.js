/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.your-cms-domain.com",
      },
    ],
  },
};

module.exports = nextConfig;
