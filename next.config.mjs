let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Serve each image resized for the device, as AVIF/WebP, instead of the original file.
    formats: ['image/avif', 'image/webp'],
    imageSizes: [16, 32, 48, 64, 72, 96, 128, 144, 192, 256, 384],
    minimumCacheTTL: 31536000,
  },
  // Metadata goes in <head> for every visitor, not streamed in after the body
  // (Next only does that for crawlers it recognises, and audits read <head>).
  htmlLimitedBots: /.*/,
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    // Off on purpose. Inlining saves the stylesheet request, but Next also
    // repeats the whole stylesheet inside the page's hydration payload, so the
    // homepage carried ~245 KB of CSS text and the browser parsed it twice. On
    // Lighthouse mobile that cost more blocking time (130–240 ms against
    // 50–90 ms) than the extra request costs in paint time.
    inlineCss: false,
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
