/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src')
    }
    return config
  },
  telemetry: false,
  experimental: {
    outputFileTracingIncludes: {},
    outputFileTracingExcludes: { '*': true }
  }
}

module.exports = nextConfig
