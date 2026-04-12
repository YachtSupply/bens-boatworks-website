export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiAnchor } from 'react-icons/fi';
import { getSiteData } from '@/lib/siteData';
import { ServiceCard, SafeImage } from '@/components/shared';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteConfig.apiSeo;
  const serviceList = siteConfig.services.slice(0, 3).map((s) => s.name).join(', ');
  return {
    title: apiSeo?.titles?.services ?? `Marine Services by ${siteConfig.name} | ${siteConfig.city}, ${siteConfig.state}`,
    description: apiSeo?.metaDescriptions?.services ?? `${siteConfig.name} offers ${serviceList}, and more for boat owners in ${siteConfig.city}, ${siteConfig.state}.`,
    alternates: { canonical: apiSeo?.canonicals?.services ?? (siteUrl ? `${siteUrl}/services` : '/services') },
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
      {/* Hero — left-aligned with service count */}
      <section className="relative bg-hero-gradient text-white min-h-[60vh] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 min-h-[60vh] flex flex-col justify-center pt-28 pb-16">
          <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-4">Our Services</p>
          <h1 className="font-heading text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5 max-w-2xl">
            {siteConfig.services.length} ways we can help your&nbsp;vessel
          </h1>
          <p className="text-white/50 font-sans text-lg max-w-xl mb-8">{siteConfig.tagline}</p>
          <Link href="/contact" className="btn-gold inline-flex items-center gap-2 px-7 py-4 text-sm whitespace-nowrap self-start">
            Get a Quote <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Service cards — left-accent vertical layout */}
      <section className="bg-cream py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-6 ${
            siteConfig.services.length === 1 ? 'grid-cols-1' :
            siteConfig.services.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {siteConfig.services.map((s) => (
              <ServiceCard key={s.name} {...s} />
            ))}
          </div>

          {siteConfig.serviceAreaTitle !== 'Our Location' && (
            <div className="mt-12 flex items-center gap-4 bg-white rounded-2xl px-8 py-6 max-w-xl mx-auto border border-cream-dark">
              <FiAnchor className="text-gold flex-shrink-0" size={20} />
              <p className="font-sans text-sm text-text-light">
                <span className="font-semibold text-navy">Mobile service available</span> — we come to your marina or&nbsp;dock.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Common Projects — two-column with portfolio samples */}
      <section className="bg-white py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">Common Projects</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-8">What We Manage</h2>
            <ul className="space-y-4">
              {siteConfig.commonProjects?.map((p) => (
                <li key={p} className="flex items-start gap-3 font-sans text-text">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/10 text-gold mt-0.5 flex-shrink-0">
                    <FiCheck size={13} strokeWidth={3} />
                  </span>
                  <span className="text-base">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-cream rounded-3xl p-10">
            {siteConfig.portfolio.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {siteConfig.portfolio.slice(0, 2).map((photo, i) => (
                  <SafeImage
                    key={i}
                    src={photo.src}
                    alt={photo.caption || `Work by ${siteConfig.name}`}
                    fill
                    className="object-cover rounded-2xl"
                    unoptimized
                    containerClassName="relative aspect-[4/3] overflow-hidden rounded-2xl"
                  />
                ))}
              </div>
            )}
            <h3 className="font-heading text-2xl font-extrabold text-navy tracking-tight mb-4">Have a Special&nbsp;Project?</h3>
            <p className="text-text-light font-sans leading-relaxed mb-6">
              Not sure which service you need? Our team is happy to discuss your vessel and recommend the right&nbsp;approach.
            </p>
            <Link href="/contact" className="btn-gold inline-flex items-center gap-2 px-6 py-3 whitespace-nowrap">
              Get a Quote <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      {allFaqs.length > 0 && (
        <section className="bg-cream py-24 px-5 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">FAQ</p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-navy tracking-tight">Frequently Asked&nbsp;Questions</h2>
            </div>
            <div className="space-y-3">
              {allFaqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-cream-dark overflow-hidden">
                  <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-cream/50 transition-colors">
                    <span className="font-sans font-semibold text-navy text-sm">{faq.question}</span>
                    <span className="text-gold text-xl flex-shrink-0 transition-transform group-open:rotate-45 leading-none">+</span>
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-text font-sans text-sm leading-relaxed">{faq.answer}</p>
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
