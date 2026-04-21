export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/siteData';
import { requireSiteUrl } from '@/lib/config';
import { ServiceCard, SafeImage } from '@/components/shared';
import { ArrowRight, CheckCircle, Anchor } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = requireSiteUrl();
  const apiSeo = siteConfig.apiSeo;
  const serviceList = siteConfig.services.slice(0, 3).map((s) => s.name).join(', ');
  return {
    title: apiSeo?.titles?.services ?? `Marine Services by ${siteConfig.name} | ${siteConfig.city}, ${siteConfig.state}`,
    description: apiSeo?.metaDescriptions?.services ?? `${siteConfig.name} offers ${serviceList}, and more for boat owners in ${siteConfig.city}, ${siteConfig.state}.`,
    alternates: { canonical: apiSeo?.canonicals?.services ?? `${siteUrl}/services` },
  };
}

export default async function ServicesPage() {
  const siteConfig = await getSiteData();

  const allFaqs = siteConfig.specialties.flatMap((sp) =>
    sp.faqs.map((faq) => ({ ...faq, specialty: sp.name }))
  );

  const faqSchema = allFaqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-brand text-white pt-[72px]">
        <div className="max-w-page mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">Our Services</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">{siteConfig.services.length} ways we can help your vessel</h1>
            <p className="text-white/50 text-base leading-relaxed mb-8">{siteConfig.tagline}</p>
            <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider px-7 py-4 rounded-full transition-colors inline-flex items-center gap-2">
              Get a Quote <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SERVICE CARDS ─── */}
      <section className="bg-sand py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto">
          <div className={`grid gap-4 ${
            siteConfig.services.length === 1 ? 'grid-cols-1 max-w-md' :
            siteConfig.services.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {siteConfig.services.map((s) => (
              <ServiceCard key={s.name} {...s} />
            ))}
          </div>

          {siteConfig.serviceAreaTitle !== 'Our Location' && (
            <div className="mt-10 bg-white rounded-2xl p-6 flex items-center gap-3">
              <Anchor size={18} strokeWidth={1.5} className="text-accent flex-shrink-0" />
              <p className="text-ink-muted text-sm">
                <span className="font-semibold text-brand">Mobile service available</span> — we come to your marina or dock.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── COMMON PROJECTS ─── */}
      <section className="bg-white py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">Common Projects</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight mb-8">What We Manage</h2>
            <ul className="space-y-3">
              {siteConfig.commonProjects?.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-muted">
                  <CheckCircle size={18} strokeWidth={1.5} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {siteConfig.portfolio.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {siteConfig.portfolio.slice(0, 2).map((photo, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <SafeImage
                      src={photo.src}
                      alt={photo.caption || `Work by ${siteConfig.name}`}
                      fill
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="bg-sand rounded-2xl p-7">
              <h3 className="font-heading text-xl font-extrabold text-brand mb-2">Have a Special Project?</h3>
              <p className="text-ink-muted text-sm leading-relaxed mb-5">
                Not sure which service you need? Our team is happy to discuss your vessel and recommend the right approach.
              </p>
              <Link href="/contact" className="text-accent hover:text-accent-dark text-[13px] font-semibold flex items-center gap-1.5 transition-colors">
                Get a Quote <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      {allFaqs.length > 0 && (
        <section className="bg-sand-dark py-24 px-5 sm:px-8">
          <div className="max-w-page mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">FAQ</p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl space-y-3">
              {allFaqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl">
                  <summary className="cursor-pointer px-6 py-5 font-heading font-bold text-brand text-[15px] flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-accent text-xl leading-none flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-ink-muted text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
    </>
  );
}
