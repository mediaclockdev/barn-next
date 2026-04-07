import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}

/**
 * A reusable utility function to construct comprehensive Next.js Metadata.
 * Use this inside `generateMetadata` exports or `layout.tsx` files.
 */
export const constructMetadata = ({
  title,
  description,
  image = '/images/logo.png', // Replace with your default OpenGraph image
  url = 'https://barn.com',
  noIndex = false,
}: SEOProps): Metadata => {
  return {
    title,
    description,
    metadataBase: new URL('https://barn.com'),
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      siteName: 'barn',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@barn',
    },
    // Useful for empty carts, search result pages, or 404s
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};
