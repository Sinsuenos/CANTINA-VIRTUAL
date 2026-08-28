import Link from 'next/link';

const products = [
  {
    title: 'Nectar Engine',
    tag: 'CONTENT ENGINE',
    description: 'Turn one affiliate offer into platform-specific campaign directions, copy, CTAs, and compliance-aware content without starting from a blank page.',
    cta: 'Get Nectar Engine',
    href: 'https://sinaloainspired.gumroad.com/l/nectar-engine',
  },
  {
    title: 'Agent Deflection',
    tag: 'AI SECURITY',
    description: 'A practical defensive layer for creators working with AI agents, designed to reduce unwanted prompt extraction and instruction hijacking.',
    cta: 'View Security Tool',
    href: '#',
  },
  {
    title: 'Creator Security Toolkit',
    tag: 'CREATOR SAFETY',
    description: 'Practical tools and guidance for creators who want more control over their content, workflows, and AI-facing surfaces.',
    cta: 'Explore Toolkit',
    href: '#',
  },
];

export default function CreatorToolsPage() {
  return (
    <main className="min-h-screen bg-[#100d18] text-white">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-300">Sinaloa Sueños • Creator Tools</p>
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl">Tools for creators who actually have things to build.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">Content generation, workflow protection, and practical AI tools built for people who are turning ideas into campaigns, products, and revenue.</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.title} className="flex min-h-[360px] flex-col rounded-3xl border border-white/10 bg-white/[0.05] p-7 shadow-2xl shadow-black/20">
              <p className="text-xs font-bold tracking-[0.2em] text-fuchsia-300">{product.tag}</p>
              <h2 className="mt-4 text-3xl font-bold">{product.title}</h2>
              <p className="mt-5 flex-1 leading-7 text-white/65">{product.description}</p>
              <Link href={product.href} className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-bold text-black transition hover:bg-fuchsia-100">{product.cta} →</Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-fuchsia-300/20 bg-fuchsia-300/[0.06] p-8">
          <h2 className="text-2xl font-bold">Built for the real workflow</h2>
          <p className="mt-3 max-w-3xl leading-7 text-white/65">Find an offer. Understand the angle. Create the content. Protect the workflow. Publish where your audience actually lives. These tools are designed to make that process faster and more deliberate.</p>
        </div>
      </section>
    </main>
  );
}
