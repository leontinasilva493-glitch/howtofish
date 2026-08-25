/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/wiki', destination: '/', statusCode: 301 },
      { source: '/guide', destination: '/', statusCode: 301 },
      { source: '/guides', destination: '/walkthrough/', statusCode: 301 },
      { source: '/guides/:path*', destination: '/walkthrough/', statusCode: 301 },
      { source: '/gear', destination: '/fish/', statusCode: 301 },
      { source: '/gambling', destination: '/tips/', statusCode: 301 },
      { source: '/calculator', destination: '/tips/', statusCode: 301 },
      { source: '/checklist', destination: '/achievements/', statusCode: 301 },
      { source: '/codes', destination: '/tips/', statusCode: 301 },
      { source: '/maps', destination: '/islands/', statusCode: 301 },
      { source: '/map', destination: '/islands/', statusCode: 301 },
      { source: '/entities/verity', destination: '/bosses/', statusCode: 301 },
      { source: '/entities/bosses', destination: '/bosses/', statusCode: 301 },
      { source: '/weapons', destination: '/tips/', statusCode: 301 },
      { source: '/updates', destination: '/', statusCode: 301 },
      { source: '/community', destination: '/multiplayer/', statusCode: 301 },
      { source: '/tools', destination: '/tips/', statusCode: 301 },
      { source: '/privacy', destination: '/privacy-policy/', statusCode: 301 },
    ];
  },
};

module.exports = nextConfig;
