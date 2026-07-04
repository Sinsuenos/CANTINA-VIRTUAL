import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}