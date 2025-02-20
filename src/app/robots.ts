import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      }
    ],
    // // TODO: check if sitemap.xml exists
    sitemap: 'https://qubex.exchange',
  }
}
