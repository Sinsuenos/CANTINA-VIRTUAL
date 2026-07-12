import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cantina Virtual — Something is Opening",
  description: "A digital speakeasy on the Pacific coast of Mexico. Three rooms. One password.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏮</text></svg>",
  },
  openGraph: {
    title: "Cantina Virtual",
    description: "Something is opening. Do you know the password?",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cantina Virtual",
    description: "Something is opening. Do you know the password?",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 — gtag.js */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GENZPS9FMV"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GENZPS9FMV');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}