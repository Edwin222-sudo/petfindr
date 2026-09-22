import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PetFindr — Reuniting Lost Pets Across America',
  description:
    'The nation\'s fastest-growing lost & found pet network. Report a lost pet or post a found pet and reunite families in minutes.',
  keywords: ['lost pet', 'found pet', 'pet finder', 'lost dog', 'found dog', 'missing pet USA'],
  openGraph: {
    title: 'PetFindr — Reuniting Lost Pets Across America',
    description: 'Report lost or found pets and reunite families.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
