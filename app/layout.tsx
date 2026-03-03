import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./components/themeProvider";

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
  description:
    "Full stack developer who builds things for the web. Sometimes they even work on the first try.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
        <script
          defer
          data-website-id="6985fc450023fc01ff69"
          data-domain="sahil.appwrite.network"
          src="https://www.insightly.live/script.js"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
