export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
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
      <section>
        <div>
          <p>Our Services</p>
          <h1>{siteConfig.services.length} ways we can help your vessel</h1>
          <p>{siteConfig.tagline}</p>
          <Link href="/contact">
            Get a Quote
          </Link>
        </div>
      </section>

      <section>
        <div>
          <div>
            {siteConfig.services.map((s) => (
              <ServiceCard key={s.name} {...s} />
            ))}
          </div>

          {siteConfig.serviceAreaTitle !== 'Our Location' && (
            <div>
              <p>
                <span>Mobile service available</span> — we come to your marina or dock.
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <div>
          <div>
            <p>Common Projects</p>
            <h2>What We Manage</h2>
            <ul>
              {siteConfig.commonProjects?.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            {siteConfig.portfolio.length > 0 && (
              <div>
                {siteConfig.portfolio.slice(0, 2).map((photo, i) => (
                  <SafeImage
                    key={i}
                    src={photo.src}
                    alt={photo.caption || `Work by ${siteConfig.name}`}
                    fill
                    unoptimized
                  />
                ))}
              </div>
            )}
            <h3>Have a Special Project?</h3>
            <p>
              Not sure which service you need? Our team is happy to discuss your vessel and recommend the right approach.
            </p>
            <Link href="/contact">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {allFaqs.length > 0 && (
        <section>
          <div>
            <div>
              <p>FAQ</p>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div>
              {allFaqs.map((faq, i) => (
                <details key={i}>
                  <summary>{faq.question}</summary>
                  <div>
                    <p>{faq.answer}</p>
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
