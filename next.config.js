/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'baustela.hr',
      },
      {
        protocol: 'https',
        hostname: 'img.linemedia.com',
      },
      {
        protocol: 'https',
        hostname: 'fokusi.info',
      },
      {
        protocol: 'https',
        hostname: 'www.saferack.com',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
