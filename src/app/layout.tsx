import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pack It Movers Heights - Professional Moving Services',
  description: 'Trusted moving company providing local, long-distance, and commercial moving services. Get your free quote today from Pack It Movers Heights.',
  keywords: 'moving company, movers, local moving, long distance moving, commercial moving, packing services, storage',
  authors: [{ name: 'Pack It Movers Heights' }],
  creator: 'Pack It Movers Heights',
  publisher: 'Pack It Movers Heights',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://packitmoversheights.com'),
  openGraph: {
    title: 'Pack It Movers Heights - Professional Moving Services',
    description: 'Trusted moving company providing local, long-distance, and commercial moving services.',
    url: 'https://packitmoversheights.com',
    siteName: 'Pack It Movers Heights',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pack It Movers Heights - Professional Moving Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pack It Movers Heights - Professional Moving Services',
    description: 'Trusted moving company providing local, long-distance, and commercial moving services.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://packitmoversheights.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              "name": "Pack It Movers Heights",
              "description": "Professional moving services including local, long-distance, and commercial moves",
              "url": "https://packitmoversheights.com",
              "telephone": "+1-555-MOVERS",
              "email": "info@packitmoversheights.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Main Street",
                "addressLocality": "Heights",
                "addressRegion": "TX",
                "postalCode": "77001",
                "addressCountry": "US"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 29.7604,
                  "longitude": -95.3698
                },
                "geoRadius": "100"
              },
              "services": [
                "Local Moving",
                "Long Distance Moving",
                "Commercial Moving",
                "Packing Services",
                "Storage Solutions"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
