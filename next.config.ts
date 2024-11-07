import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**"
      },
      {
        protocol: "https",
        hostname: "github.blog",
        port: "",
        pathname: "/wp-content/**"
      },
      {
        protocol: "https",
        hostname: "cdn.cms-twdigitalassets.com",
        port: "",
        pathname: "/content/**"
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/xz1dnu24egyd/**"
      }
    ]
  }
};

export default nextConfig;
