export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { ReviewCard, ReviewSynopsis, PortfolioGrid, ServiceAreaMap, ServiceCard, UpdatesFeed, ContactForm } from '@/components/shared';

export async function generateMetadata(): Promise<Metadata> {
  const siteData = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteData.apiSeo;
  const serviceNames = siteData.services.slice(0, 3).map((s) => s.name).join(', ');
  const title = apiSeo?.titles?.homepage ?? `${siteData.name} — Marine Services in ${siteData.city}, ${siteData.state}`;
  const description = apiSeo?.metaDescriptions?.homepage ?? `${siteData.name} provides ${serviceNames} in ${siteData.city}, ${siteData.state}. Request a quote today.`;
  const canonical = apiSeo?.canonicals?.homepage ?? (siteUrl || '/');
  return { title, description, alternates: { canonical } };
}

export default async function HomePage() {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const reviews = siteConfig.boatwork.staticReviews;
  const phone = formatPhone(siteConfig.phone);
  const hasPortfolio = siteConfig.portfolio.length > 0 || siteConfig.videos.length > 0;

  const localBusinessSchema = siteConfig.apiSeo?.jsonLd ?? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl || undefined,
    telephone: phone?.href.replace('tel:', '') ?? siteConfig.phone,
    email: siteConfig.email,
    address: { '@type': 'PostalAddress', addressLocality: siteConfig.city, addressRegion: siteConfig.state, addressCountry: 'US' },
    image: siteConfig.logoUrl,
    sameAs: [siteConfig.boatwork.profileUrl, siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean),
  };

  const serviceSchemas = siteConfig.services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: s.name,
    provider: { '@type': 'LocalBusiness', name: siteConfig.name },
    description: s.description,
    areaServed: `${siteConfig.city}, ${siteConfig.state}`,
  }));

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hasHours = siteConfig.hoursOfOperation && dayOrder.some((d) => !!siteConfig.hoursOfOperation![d]);

  return (
    <>
      {/* Hero */}
      <section id="hero">
        <p>{siteConfig.city}, {siteConfig.state}</p>
        <h1>{siteConfig.name}</h1>
        <p>{siteConfig.tagline}</p>
        <p>{siteConfig.description}</p>
        <div>
          <Link href="/contact">Get a Quote</Link>
          <Link href="/services">Our Services</Link>
        </div>
        {phone && <a href={phone.href}>{phone.display}</a>}
      </section>

      {/* Services */}
      <section id="services">
        <h2>Our Services</h2>
        <div>
          {siteConfig.services.map((s) => (
            <ServiceCard key={s.name} {...s} />
          ))}
        </div>
        <Link href="/services">View All Services</Link>
      </section>

      {/* Reviews */}
      {(siteConfig.reviewSynopsis || reviews.length > 0) && (
        <section id="reviews">
          <h2>What Our Clients Say</h2>
          {siteConfig.reviewSynopsis && (
            <ReviewSynopsis
              businessName={siteConfig.name}
              aggregateRating={siteConfig.reviewSynopsis.aggregateRating}
              totalReviewCount={siteConfig.reviewSynopsis.totalReviewCount}
              summary={siteConfig.reviewSynopsis.summary}
              keywords={siteConfig.reviewSynopsis.keywords}
            />
          )}
          {reviews.length > 0 && (
            <div>
              {reviews.map((r, i) => (
                <ReviewCard key={r.id ?? `${r.author}-${i}`} {...r} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Updates */}
      {siteConfig.updates.length > 0 && (
        <section id="updates">
          <h2>Latest Updates</h2>
          <UpdatesFeed updates={siteConfig.updates} businessName={siteConfig.name} logoUrl={siteConfig.logoUrl || undefined} />
          <Link href="/news">View All Updates</Link>
        </section>
      )}

      {/* Portfolio */}
      {hasPortfolio && (
        <section id="portfolio">
          <h2>Our Work</h2>
          <PortfolioGrid items={siteConfig.portfolio.slice(0, 6)} videos={siteConfig.videos} businessName={siteConfig.name} />
          <Link href="/portfolio">View Full Portfolio</Link>
        </section>
      )}

      {/* Service Area */}
      <section id="service-area">
        <h2>{siteConfig.serviceAreaTitle}</h2>
        <p>{siteConfig.serviceAreaDescription}</p>
        <ul>
          {siteConfig.serviceArea.map((a) => <li key={a}>{a}</li>)}
        </ul>
        <ServiceAreaMap localities={siteConfig.serviceArea} />
      </section>

      {/* Hours */}
      <section id="hours">
        <h3>Business Hours</h3>
        {hasHours ? (
          <dl>
            {dayOrder.map((day) => {
              const hours = siteConfig.hoursOfOperation![day];
              if (!hours) return null;
              return (
                <div key={day}>
                  <dt>{day}</dt>
                  <dd>{hours === 'Open' ? 'All Day' : hours}</dd>
                </div>
              );
            })}
          </dl>
        ) : (
          <p>Available 24/7</p>
        )}
      </section>

      {/* CTA */}
      <section id="cta">
        <h2>Ready to Get Started?</h2>
        <p>Speak directly with our team about your vessel.</p>
        {phone && <a href={phone.href}>{phone.display}</a>}
        <Link href="/contact">Contact Us</Link>
        <ContactForm />
      </section>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      {serviceSchemas.map((schema, i) => (
        <script key={`service-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
