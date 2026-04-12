export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiAnchor } from 'react-icons/fi';
import { getSiteData } from '@/lib/siteData';
import { ServiceCard, SectionWrapper, ServiceAreaMap, SafeImage } from '@/components/shared';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteConfig.apiSeo;
  const serviceList = siteConfig.services.slice(0, 3).map((s) => s.name).join(', ');
  return {
    title: apiSeo?.titles?.services ?? `Marine Services by ${siteConfig.name} | ${siteConfig.city}, ${siteConfig.state}`,
    description: apiSeo?.metaDescriptions?.services ?? `${siteConfig.name} offers ${serviceList}, and more for boat owners in ${siteConfig.city}, ${siteConfig.state}.`,
    alternates: {
      canonical: apiSeo?.canonicals?.services ?? (siteUrl ? `${siteUrl}/services` : '/services'),
    },
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
      <section className="bg-hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="section-divider-center mb-5" style={{ background: 'rgba(255,255,255,0.3)' }} />
          <h1 className="font-heading text-5xl font-extrabold mb-4 tracking-tight">Our Services</h1>
          <p className="text-white/60 font-sans max-w-xl mx-auto mb-8">{siteConfig.tagline}</p>
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 whitespace-nowrap"
          >
            Get a Quote <FiArrowRight size={14} />
          </Link>
        </div>
      </section>

      <SectionWrapper variant="cream">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl font-extrabold text-navy mb-4 tracking-tight">Comprehensive Marine&nbsp;Expertise</h2>
          <p className="text-text-light font-sans max-w-2xl mx-auto leading-relaxed">
            Every service delivered with precision and attention your investment&nbsp;deserves.
          </p>
        </div>
        <div className={`grid gap-5 ${
          siteConfig.services.length === 1 ? 'grid-cols-1' :
          siteConfig.services.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          siteConfig.services.length === 4 ? 'grid-cols-1 md:grid-cols-2' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {siteConfig.services.map((s) => (
            <div key={s.name} className="flex flex-col">
              <ServiceCard {...s} />
              <div className="px-7 pb-6 bg-white border border-cream-dark border-t-0 -mt-px rounded-b-xl">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-gold font-sans font-semibold text-sm hover:gap-3 transition-all"
                >
                  Request a Quote <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {siteConfig.serviceAreaTitle !== 'Our Location' && (
          <div className="mt-10 flex items-center justify-center gap-3 bg-white rounded-xl px-8 py-5 max-w-xl mx-auto border border-cream-dark">
            <FiAnchor className="text-gold flex-shrink-0" size={18} />
            <p className="font-sans text-sm text-text-light">
              <span className="font-semibold text-navy">Mobile service available</span> — we come to your marina or&nbsp;dock.
            </p>
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-divider mb-5" />
            <h2 className="font-heading text-3xl font-extrabold text-navy mb-8 tracking-tight">What We Manage</h2>
            <ul className="space-y-4">
              {siteConfig.commonProjects?.map((p) => (
                <li key={p} className="flex items-start gap-3 font-sans text-text">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold/10 text-gold mt-0.5 flex-shrink-0">
                    <FiCheck size={12} strokeWidth={3} />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-cream rounded-2xl p-10">
            {siteConfig.portfolio.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-6 -mx-2">
                {siteConfig.portfolio.slice(0, 2).map((photo, i) => (
                  <SafeImage
                    key={i}
                    src={photo.src}
                    alt={photo.caption || `Work by ${siteConfig.name}`}
                    fill
                    className="object-cover rounded-xl"
                    unoptimized
                    containerClassName="relative aspect-[4/3] overflow-hidden rounded-xl"
                  />
                ))}
              </div>
            )}
            <h3 className="font-heading text-2xl font-extrabold text-navy mb-4 tracking-tight">Have a Special&nbsp;Project?</h3>
            <p className="text-text-light font-sans mb-8 leading-relaxed">
              Not sure which service you need? Our team is happy to discuss your vessel and recommend the right&nbsp;approach.
            </p>
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 whitespace-nowrap"
            >
              Get a Quote <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ Accordion */}
      {allFaqs.length > 0 && (
        <SectionWrapper variant="cream">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="section-divider-center mb-5" />
              <h2 className="font-heading text-3xl font-extrabold text-navy mb-4 tracking-tight">Frequently Asked&nbsp;Questions</h2>
              <p className="text-text-light font-sans max-w-xl mx-auto">
                Common questions about our marine&nbsp;services.
              </p>
            </div>
            <div className="space-y-3">
              {allFaqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-cream-dark overflow-hidden">
                  <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-cream/50 transition-colors">
                    <span className="font-sans font-semibold text-navy text-sm">{faq.question}</span>
                    <span className="text-gold text-lg flex-shrink-0 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-text font-sans text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
