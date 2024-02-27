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
        hostname: 'localhost:3000',
      },
      {
        protocol: 'https',
        hostname: 'main.dpejyjo5wbo0b.amplifyapp.com',
      },
    ],
  },
};

module.exports = nextConfig;
