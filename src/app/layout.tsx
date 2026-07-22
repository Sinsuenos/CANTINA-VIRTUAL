import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cantina Virtual — Something is Opening",
  description: "A digital speakeasy on the Pacific coast of Mexico. Three rooms. One password.",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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

/* ── GA4 consent-gated script component ──
   Reads cv_cookie_consent from localStorage; only injects gtag.js
   when the user has not explicitly rejected. This runs entirely
   client-side inside a Strategy script so localStorage is available.
   The `return` inside a beforeInteractive children string is what
   caused the original console error — we now avoid that entirely. ── */
function Ga4Scripts() {
  return (
    <>
      <Script id="ga4-loader" strategy="afterInteractive">
        {`
          (function() {
            var consent = localStorage.getItem('cv_cookie_consent');
            if (consent === 'rejected') return;
            // Load gtag.js dynamically only when consent is not rejected
            var s = document.createElement('script');
            s.src = 'https://www.googletagmanager.com/gtag/js?id=G-GENZPS9FMV';
            s.async = true;
            document.head.appendChild(s);
            s.onload = function() {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GENZPS9FMV');
            };
          })();
        `}
      </Script>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Ga4Scripts />
      </head>
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}