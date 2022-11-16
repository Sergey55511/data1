/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SOCKET_URL: process.env.SOCKET_URL,
    APP_VERSION: process.env.APP_VERSION,
  },
}

module.exports = nextConfig
