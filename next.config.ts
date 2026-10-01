import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const englishRedirects = [
      { source: "/how-it-works", destination: "/introduction", permanent: true },
      { source: "/coworker", destination: "/introduction", permanent: true },
      { source: "/skill-pricing", destination: "/billing", permanent: true },
      { source: "/cli-reference", destination: "/quick-start", permanent: true },
      { source: "/using-services", destination: "/quick-start", permanent: true },
      { source: "/for-agents", destination: "/quick-start", permanent: true },
      { source: "/integration/mcp-servers/:path*", destination: "/quick-start", permanent: true },
      { source: "/integration/http-clients/:path*", destination: "/quick-start", permanent: true },
      { source: "/integration/agent-frameworks/:path*", destination: "/quick-start", permanent: true },
      { source: "/capabilities", destination: "/capabilities/ai-models", permanent: true },
      ...["audio", "browser", "compute", "data", "images", "messaging", "search", "verify"].map((path) => ({
        source: `/capabilities/${path}`,
        destination: "/capabilities/ai-models",
        permanent: true,
      })),
    ];
    return [
      ...englishRedirects,
      ...englishRedirects.map(({ source, destination, permanent }) => ({
        source: `/ru${source}`,
        destination: `/ru${destination}`,
        permanent,
      })),
    ];
  },
};

export default nextConfig;
