import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sahil Gupta- Full stack Developer",
  description: "I am Full stack developer building scalable web solutions",
   openGraph: {
    title: 'Sahil Supta',
    description: 'Full Stack Developer ',
    url: 'https://sahil-alpha.vercel.app/',
    siteName: 'Sahil Gupta',
    images: [
      {
        url: 'https://sahil-alpha.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Sahil Gupta',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahil Gupta',
    description: 'Full stack Developer',
    images: ['https://sahil-alpha.vercel.app/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar/>
        {children}
                <Analytics />

      </body>
    </html>
  );
}
