import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "masumraihan.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
