/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
