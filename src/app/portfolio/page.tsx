export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSiteData } from '@/lib/siteData';
import { PortfolioGrid } from '@/components/shared';

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
      <section>
        <div>
          <h1>Our Work</h1>
          <p>A selection of recent projects from {siteConfig.name}.</p>
        </div>
      </section>

      <section>
        <div>
          <h2>Recent Projects</h2>
          <p>Click any image to view full size.</p>
        </div>
        <PortfolioGrid items={siteConfig.portfolio} videos={siteConfig.videos} businessName={siteConfig.name} />
      </section>

      <section>
        <div>
          <h2>Ready to Discuss Your Vessel?</h2>
          <p>Let&apos;s talk about what your boat needs.</p>
          <Link href="/contact">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
