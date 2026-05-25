import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webdev-music-003b5b991590.herokuapp.com',
        pathname: '/media/**',
      },
    ],
  },
  allowedDevOrigins: ['172.30.32.1', 'localhost', '127.0.0.1'],
};

export default nextConfig;
