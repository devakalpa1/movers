import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/payment/'],
    },
    sitemap: 'https://packitmoversheights.com/sitemap.xml',
  };
}
