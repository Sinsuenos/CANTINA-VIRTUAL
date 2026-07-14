import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Cantina Virtual',
  description: 'Contact Cantina Virtual. Business inquiries, support, and creator collaboration.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}