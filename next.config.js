const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = withPWA({
  eslint: {
    dirs: ['.'],
  },
  reactStrictMode: true,
})

module.exports = nextConfig
