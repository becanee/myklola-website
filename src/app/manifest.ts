import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: 'Klola',
    name: 'Klola Indonesia',
    description: 'Managing People. Anywhere. Anytime',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0B3464',
    lang: 'id',
    dir: 'ltr',
    icons: [
      {
        src: '/logo-blue.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'productivity'],
  };
}
