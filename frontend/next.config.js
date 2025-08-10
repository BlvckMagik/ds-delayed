/** @type {import('next').NextConfig} */
const nextConfig = {
  // Вимикаємо строгий режим для продакшну
  reactStrictMode: process.env.NODE_ENV === 'development',
  
  // Налаштування для хостингу
  output: 'standalone',
  
  // Налаштування зображень
  images: {
    unoptimized: true,
  },
  
  // Налаштування для MUI
  transpilePackages: ['@mui/material', '@emotion/react', '@emotion/styled'],
  
  // Налаштування для зовнішніх пакетів
  experimental: {
    serverComponentsExternalPackages: ['@mui/material', '@emotion/react', '@emotion/styled'],
  },
  
  // Налаштування змінних середовища
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
};

module.exports = nextConfig; 