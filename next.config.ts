import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        // regatas.icb.org.br -> página de inscrição da Escola de Vela (projeto externo)
        source: "/:path*",
        has: [{ type: "host", value: "regatas.icb.org.br" }],
        destination: "https://mariners-compass-icb.vercel.app/escola-vela/inscricao",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
