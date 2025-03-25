/** @type {import('next').NextConfig} */

const NextConfig = {
  output: 'export', // This forces Next.js to generate static files
  trailingSlash: true, // Ensures all routes get an index.html file
  images: {
    unoptimized: true, // Disables the Image Optimization API
  },
};

export default NextConfig;