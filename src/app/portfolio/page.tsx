export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';
import { getSiteData } from '@/lib/siteData';
import { SectionWrapper, PortfolioGrid } from '@/components/shared';

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
      <section className="bg-hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="section-divider-center mb-5" style={{ background: 'rgba(255,255,255,0.3)' }} />
          <h1 className="font-heading text-5xl font-extrabold mb-4 tracking-tight">Our Work</h1>
          <p className="text-white/60 font-sans max-w-xl mx-auto">
            A selection of recent projects from {siteConfig.name}.
          </p>
        </div>
      </section>

      <SectionWrapper variant="cream">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-extrabold text-navy mb-4 tracking-tight">Recent Projects</h2>
          <p className="text-text-light font-sans max-w-xl mx-auto">
            Click any image to view full size.
          </p>
        </div>
        <PortfolioGrid items={siteConfig.portfolio} videos={siteConfig.videos} businessName={siteConfig.name} />
      </SectionWrapper>

      <SectionWrapper variant="navy">
        <div className="text-center py-8">
          <h2 className="font-heading text-3xl font-extrabold mb-4 tracking-tight">Ready to Discuss Your&nbsp;Vessel?</h2>
          <p className="text-white/50 font-sans mb-8 text-lg">Let&apos;s talk about what your boat&nbsp;needs.</p>
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 whitespace-nowrap"
          >
            Request a Quote <FiArrowRight size={14} />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
