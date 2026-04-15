export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiPhone, FiArrowRight, FiMapPin, FiAnchor } from 'react-icons/fi';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { ReviewCard, ReviewSynopsis, SectionWrapper, BoatworkVerifiedBadge, PortfolioGrid, ServiceAreaMap, SmartLogo, ServiceCard, UpdatesFeed } from '@/components/shared';

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}

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

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO — Split layout: text left, gradient + logo right
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-hero-gradient text-white overflow-hidden min-h-screen">
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left — text content */}
          <div className="pt-32 pb-16 lg:py-0">
            <div className="accent-badge mb-6" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
              <FiMapPin size={12} />
              {siteConfig.city}, {siteConfig.state}
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              {siteConfig.name}
            </h1>
            <p className="text-white/50 font-sans text-lg md:text-xl max-w-md mb-8 leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/contact" className="btn-gold px-7 py-4 text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap">
                Get a Quote <FiArrowRight size={14} />
              </Link>
              <Link href="/services" className="btn-outline-light px-7 py-4 text-sm font-semibold text-center whitespace-nowrap">
                Explore Services
              </Link>
            </div>
            {phone && (
              <a href={phone.href} className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
                <FiPhone size={14} /> {phone.display}
              </a>
            )}
          </div>

          {/* Right — logo + decorative area */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Decorative rings */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5" />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-white/8" />
            <div className="absolute w-[240px] h-[240px] rounded-full bg-white/5" />
            <div className="relative z-10">
              <SmartLogo
                src={siteConfig.logoUrl}
                alt={siteConfig.name}
                size={160}
                fallbackInitial={siteConfig.name.charAt(0)}
                className="border-2 border-white/20 rounded-3xl shadow-2xl"
                fallbackClassName="bg-gold text-white border-2 border-white/20 rounded-3xl"
              />
            </div>
          </div>
        </div>
        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES — Alternating horizontal blocks
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-cream py-24 px-5 sm:px-8" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">What We Do</p>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">Our Services</h2>
            <p className="text-text-light font-sans text-lg leading-relaxed">
              Comprehensive marine services delivered with expertise and&nbsp;care.
            </p>
          </div>
          <div className="divide-y divide-cream-dark">
            {siteConfig.services.map((s, i) => (
              <ServiceCard key={s.name} {...s} variant="horizontal" flipped={i % 2 !== 0} />
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/services" className="btn-gold inline-flex items-center gap-2 px-7 py-4 text-sm whitespace-nowrap">
              View All Services <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          REVIEWS — Featured testimonial + row of cards
          ═══════════════════════════════════════════════════════ */}
      {(siteConfig.reviewSynopsis || reviews.length > 0) && (
        <section className="bg-white py-24 px-5 sm:px-8" id="reviews">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">Testimonials</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-navy tracking-tight">What Our Clients&nbsp;Say</h2>
            </div>

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
              <>
                {/* Featured first review */}
                <div className="mb-8">
                  <ReviewCard {...reviews[0]} variant="featured" />
                </div>
                {/* Remaining reviews in a row */}
                {reviews.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {reviews.slice(1).map((r, i) => (
                      <ReviewCard key={r.id ?? `${r.author}-${i}`} {...r} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          UPDATES — if available
          ═══════════════════════════════════════════════════════ */}
      {siteConfig.updates.length > 0 && (
        <section className="bg-cream py-24 px-5 sm:px-8" id="updates">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">News</p>
              <h2 className="font-heading text-4xl font-extrabold text-navy tracking-tight">Latest Updates</h2>
            </div>
            <UpdatesFeed updates={siteConfig.updates} businessName={siteConfig.name} logoUrl={siteConfig.logoUrl || undefined} />
            <div className="text-center mt-10">
              <Link href="/news" className="btn-gold inline-flex items-center gap-2 px-6 py-3 whitespace-nowrap">
                View All Updates <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          PORTFOLIO — if available
          ═══════════════════════════════════════════════════════ */}
      {hasPortfolio && (
        <section className="bg-white py-24 px-5 sm:px-8" id="portfolio">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">Portfolio</p>
              <h2 className="font-heading text-4xl font-extrabold text-navy tracking-tight">Our Work</h2>
            </div>
            <PortfolioGrid items={siteConfig.portfolio.slice(0, 6)} videos={siteConfig.videos} businessName={siteConfig.name} />
            <div className="text-center mt-10">
              <Link href="/portfolio" className="btn-gold inline-flex items-center gap-2 px-6 py-3 whitespace-nowrap">
                View Full Portfolio <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          SERVICE AREA — Full-width map with floating card overlay
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-cream" id="service-area">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Map — full height */}
          <div className="h-[400px] lg:h-auto lg:min-h-[500px] relative order-2 lg:order-1">
            <ServiceAreaMap localities={siteConfig.serviceArea} />
          </div>
          {/* Content card */}
          <div className="py-16 px-5 sm:px-8 lg:px-14 flex flex-col justify-center order-1 lg:order-2">
            <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">Service Area</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-5">{siteConfig.serviceAreaTitle}</h2>
            <p className="text-text-light font-sans leading-relaxed mb-8">{siteConfig.serviceAreaDescription}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {siteConfig.serviceArea.map((a) => (
                <div key={a} className="flex items-center gap-2.5 text-sm font-sans text-text bg-white rounded-xl px-3.5 py-2.5 border border-cream-dark">
                  <FiMapPin size={14} className="text-gold flex-shrink-0" />
                  <span className="font-medium truncate">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA — Final call to action (no hours — those are in footer)
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-navy text-white py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FiAnchor size={32} className="text-gold mx-auto mb-6" />
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Ready to Get&nbsp;Started?</h2>
          <p className="text-white/40 font-sans text-lg mb-4">Speak directly with our team about your&nbsp;vessel.</p>
          {phone ? (
            <a href={phone.href} className="text-gold font-heading text-3xl md:text-4xl font-extrabold block mb-10 hover:text-gold-light transition-colors">
              {phone.display}
            </a>
          ) : (
            <a href={`tel:${siteConfig.phone}`} className="text-gold font-heading text-3xl md:text-4xl font-extrabold block mb-10 hover:text-gold-light transition-colors">
              {siteConfig.phone}
            </a>
          )}
          <Link href="/contact" className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-sm whitespace-nowrap">
            Contact Us <FiArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      {serviceSchemas.map((schema, i) => (
        <script key={`service-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
