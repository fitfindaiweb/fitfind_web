/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
    ],
    domains: ["localhost", "tron-bucket-dev.s3.amazonaws.com"],
  },
};

export default nextConfig;
