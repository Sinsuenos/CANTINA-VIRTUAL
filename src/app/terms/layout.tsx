import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms — Cantina Virtual',
  description: 'Terms of use for Cantina Virtual. Age verification, third-party content, and user responsibilities.',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}