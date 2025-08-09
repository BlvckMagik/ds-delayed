/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@mui/material', '@emotion/react', '@emotion/styled', '@mui/x-date-pickers'],
  },
}

module.exports = nextConfig 