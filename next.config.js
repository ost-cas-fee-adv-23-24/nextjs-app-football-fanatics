/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placekitten.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'zitadel.cloud',
      },
      {
        protocol: 'https',
        hostname: 'amplifyapp.com',
      },
      {
        protocol: 'https',
        hostname: 'run.app',
      },
    ],
  },
};

module.exports = nextConfig;
