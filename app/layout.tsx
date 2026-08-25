import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav";
import CustomCursor from "./components/customCursor";
import ScrollProgress from "./components/scrollProgress";
import Footer from "./components/footer";
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
  title: "Sahil Gupta | Full Stack Developer",
  description: "I am a Full stack developer building scalable web solutions",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          defer
          data-website-id="6985fc450023fc01ff69"
          data-domain="sahil.appwrite.network"
          src="https://www.insightly.live/script.js">
        </script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
