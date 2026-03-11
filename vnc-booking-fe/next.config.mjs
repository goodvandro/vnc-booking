/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configurações de ambiente
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  output: "standalone",
  experimental: {},
  // SEO: Forçar indexação (sobrescrever qualquer X-Robots-Tag: noindex do proxy)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
