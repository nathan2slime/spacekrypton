/** @type {import('next').NextConfig} */
const nextConfig = {
  strictNextHead: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    '@kry/types',
    '@kry/satellites',
    '@kry/i18n',
    '@kry/core',
    '@kry/envs',
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
