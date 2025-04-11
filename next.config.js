/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['v5.airtableusercontent.com', 'dl.airtable.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.airtableusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.airtable.com',
      },
    ],
  },
}

module.exports = nextConfig