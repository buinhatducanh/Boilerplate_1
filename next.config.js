/** @type {import('next').NextConfig} */
const nextConfig = {
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
