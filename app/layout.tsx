import type { Metadata } from "next";
import { Manrope, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Sahil Gupta | Full stack Developer",
  description: "I am Full stack developer building scalable web solutions",
  openGraph: {
    title: "Sahil Gupta",
    description: "Full Stack Developer",
    url: "https://sahil-alpha.vercel.app/",
    siteName: "Sahil Gupta",
    images: [
      {
        url: "https://sahil-alpha.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sahil Gupta",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Gupta",
    description: "Full Stack Developer",
    images: ["https://sahil-alpha.vercel.app/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
       <script
  defer
  data-website-id="6985fc450023fc01ff69"
  data-domain="sahil.appwrite.network"
  src="https://www.insightly.live/script.js">
  </script>
      </head>
      <body className={`${manrope.variable} ${dmMono.variable}`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}