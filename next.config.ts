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
};

export default nextConfig;
