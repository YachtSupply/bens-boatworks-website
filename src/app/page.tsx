export const dynamic = 'force-dynamic'; // v1.2
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiPhone, FiArrowRight, FiMapPin, FiAnchor, FiClock } from 'react-icons/fi';
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
  const formatHours = (h: string) => h === 'Open' ? 'All Day' : h;

  return (
    <>
      {/* ═══ Hero — Full-bleed centered oversized type ═══ */}
      <section className="relative bg-hero-gradient text-white overflow-hidden min-h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-5 sm:px-8 py-32 w-full">
          <div className="accent-badge mx-auto mb-8" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
            <FiMapPin size={12} />
            {siteConfig.city}, {siteConfig.state}
          </div>

          <h1 className="font-heading text-7xl md:text-9xl lg:text-[11rem] font-extrabold leading-[0.85] tracking-tight text-white mb-8">
            {siteConfig.name}
          </h1>

          <div className="section-divider-center mb-8" />

          <p className="text-white/50 font-sans text-xl lg:text-2xl max-w-lg mx-auto mb-6 leading-relaxed">
            {siteConfig.tagline}
          </p>

          <p className="text-white/30 font-sans text-lg max-w-xl mx-auto mb-14 leading-relaxed">
            {siteConfig.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/contact" className="btn-gold px-8 py-4 text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap">
              Get a Quote <FiArrowRight size={14} />
            </Link>
            <Link href="/services" className="btn-outline-light px-8 py-4 text-sm font-semibold text-center whitespace-nowrap">
              Explore Services
            </Link>
          </div>

          {phone && (
            <a href={phone.href} className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-sans">
              <FiPhone size={14} /> {phone.display}
            </a>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* ═══ Services — Bento grid, featured first item ═══ */}
      <section className="bg-cream py-24 px-5 sm:px-8" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">What We Do</p>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">Our Services</h2>
            <p className="text-text-light font-sans text-lg leading-relaxed">
              Comprehensive marine services delivered with expertise and&nbsp;care.
            </p>
          </div>

          <div className={`grid gap-6 ${
            siteConfig.services.length === 1 ? 'grid-cols-1 max-w-md' :
            siteConfig.services.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {siteConfig.services.map((s, i) => (
              <div key={s.name} className={i === 0 && siteConfig.services.length > 2 ? 'md:col-span-2' : ''}>
                <ServiceCard {...s} />
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/services" className="btn-gold inline-flex items-center gap-2 px-7 py-4 text-sm whitespace-nowrap">
              View All Services <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Reviews — Horizontal scrolling strip ═══ */}
      {(siteConfig.reviewSynopsis || reviews.length > 0) && (
        <section className="bg-white py-24 overflow-hidden" id="reviews">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="max-w-2xl mb-14">
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
          </div>

          {reviews.length > 0 && (
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-5 sm:px-8">
              {reviews.map((r, i) => (
                <div key={r.id ?? `${r.author}-${i}`} className="min-w-[300px] md:min-w-[360px] flex-shrink-0 snap-start">
                  <ReviewCard {...r} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ═══ Updates ═══ */}
      {siteConfig.updates.length > 0 && (
        <section className="bg-cream py-24 px-5 sm:px-8" id="updates">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
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

      {/* ═══ Portfolio — Masonry layout ═══ */}
      {hasPortfolio && (
        <section className="bg-white py-24 px-5 sm:px-8" id="portfolio">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
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

      {/* ═══ Service Area — Full-width map bg with text overlay ═══ */}
      <section className="relative bg-cream py-24 px-5 sm:px-8 overflow-hidden" id="service-area">
        <div className="absolute inset-0 opacity-[0.12]">
          <ServiceAreaMap localities={siteConfig.serviceArea} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">Service Area</p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-5">{siteConfig.serviceAreaTitle}</h2>
          <p className="text-text-light font-sans leading-relaxed mb-10 max-w-2xl mx-auto">{siteConfig.serviceAreaDescription}</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {siteConfig.serviceArea.map((a) => (
              <div key={a} className="flex items-center gap-2 text-sm font-sans text-text bg-white/80 backdrop-blur rounded-xl px-3.5 py-2.5 border border-cream-dark">
                <FiMapPin size={14} className="text-gold flex-shrink-0" />
                <span className="font-medium">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Hours — Inline horizontal bar ═══ */}
      <section className="bg-navy py-5 px-5 sm:px-8" id="hours">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <h3 className="font-heading text-base font-bold text-white flex items-center gap-2 flex-shrink-0">
              <FiClock size={15} className="text-gold" />
              Business Hours
            </h3>
            {hasHours
              ? (
                <div className="flex flex-wrap gap-x-6 gap-y-2 lg:border-l lg:border-white/10 lg:pl-8">
                  {dayOrder.map((day) => {
                    const hours = siteConfig.hoursOfOperation![day];
                    if (!hours) return null;
                    return (
                      <div key={day} className="flex items-center gap-2 text-sm font-sans">
                        <span className="text-white/40 font-medium">{day.slice(0, 3)}</span>
                        <span className="text-gold">{formatHours(hours)}</span>
                      </div>
                    );
                  })}
                </div>
              )
              : <p className="text-white/50 text-sm font-sans">Available 24/7</p>
            }
          </div>
        </div>
      </section>

      {/* ═══ CTA — Split-screen with inline contact form ═══ */}
      <section className="bg-navy text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Left — text + phone */}
          <div className="flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-20">
            <FiAnchor size={32} className="text-gold mb-6" />
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Ready to Get&nbsp;Started?</h2>
            <div className="section-divider mb-6" />
            <p className="text-white/40 font-sans text-lg mb-8 max-w-lg">
              Speak directly with our team about your&nbsp;vessel.
            </p>
            {phone ? (
              <a href={phone.href} className="text-gold font-heading text-3xl md:text-4xl font-extrabold hover:text-gold-light transition-colors">
                {phone.display}
              </a>
            ) : (
              <a href={`tel:${siteConfig.phone}`} className="text-gold font-heading text-3xl md:text-4xl font-extrabold hover:text-gold-light transition-colors">
                {siteConfig.phone}
              </a>
            )}
          </div>
          {/* Right — contact form */}
          <div className="bg-white px-5 sm:px-8 lg:px-16 py-20 flex items-center">
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <ContactForm />
            </div>
          </div>
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
