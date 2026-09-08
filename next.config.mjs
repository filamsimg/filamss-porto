/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['framer-motion', 'lenis'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
