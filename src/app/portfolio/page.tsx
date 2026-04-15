export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSiteData } from '@/lib/siteData';
import { PortfolioGrid } from '@/components/shared';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteConfig.apiSeo;
  return {
    title: apiSeo?.titles?.portfolio ?? `Our Work | ${siteConfig.name} — ${siteConfig.city}, ${siteConfig.state}`,
    description: apiSeo?.metaDescriptions?.portfolio ?? `See recent work by ${siteConfig.name} — marine service projects in ${siteConfig.city}, ${siteConfig.state}.`,
    alternates: {
      canonical: apiSeo?.canonicals?.portfolio ?? (siteUrl ? `${siteUrl}/portfolio` : '/portfolio'),
    },
  };
}

export default async function PortfolioPage() {
  const siteConfig = await getSiteData();

  if (siteConfig.portfolio.length === 0 && siteConfig.videos.length === 0) {
    redirect('/');
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-brand text-white pt-[72px]">
        <div className="max-w-page mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">Portfolio</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Our Work</h1>
            <p className="text-white/50 text-base leading-relaxed">A selection of recent projects from {siteConfig.name}.</p>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="bg-sand py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto">
          <div className="mb-12">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">Gallery</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight">Recent Projects</h2>
            <p className="text-ink-muted text-sm mt-2">Click any image to view full size.</p>
          </div>
          <PortfolioGrid items={siteConfig.portfolio} videos={siteConfig.videos} businessName={siteConfig.name} />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-brand py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto text-center max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Ready to Discuss Your Vessel?</h2>
          <p className="text-white/50 text-base leading-relaxed mb-8">Let&apos;s talk about what your boat needs.</p>
          <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider px-7 py-4 rounded-full transition-colors inline-flex items-center gap-2">
            Request a Quote <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
