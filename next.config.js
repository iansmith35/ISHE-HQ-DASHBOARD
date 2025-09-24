/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    position: 'bottom-right',
  },
  webpack: (config, { isServer }) => {
    // Ignore problematic genkit dependencies that cause build issues
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('wav', 'ansi-color');
    }
    return config;
  },
};

module.exports = nextConfig;
