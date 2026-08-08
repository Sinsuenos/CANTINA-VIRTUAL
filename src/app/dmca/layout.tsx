import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DMCA — Cantina Virtual',
  description: 'DMCA takedown notice procedure for Cantina Virtual. Report copyright infringement.',
};

export default function DmcaLayout({ children }: { children: React.ReactNode }) {
  return children;
}