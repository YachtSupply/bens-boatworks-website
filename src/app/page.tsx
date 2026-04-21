export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, Clock, ArrowUpRight } from 'lucide-react';
import { getSiteData } from '@/lib/siteData';
import { requireSiteUrl } from '@/lib/config';
import { formatPhone } from '@/lib/phoneUtils';
import { ParkedLanding } from '@/components/ParkedLanding';
import { ReviewCard, ReviewSynopsis, PortfolioGrid, ServiceAreaMap, ServiceCard, UpdatesFeed, ContactForm } from '@/components/shared';

export async function generateMetadata(): Promise<Metadata> {
  const siteData = await getSiteData();
  const siteUrl = requireSiteUrl();
  const apiSeo = siteData.apiSeo;
  const serviceNames = siteData.services.slice(0, 3).map((s) => s.name).join(', ');
  const title = apiSeo?.titles?.homepage ?? `${siteData.name} — Marine Services in ${siteData.city}, ${siteData.state}`;
  const description = apiSeo?.metaDescriptions?.homepage ?? `${siteData.name} provides ${serviceNames} in ${siteData.city}, ${siteData.state}. Request a quote today.`;
  const canonical = apiSeo?.canonicals?.homepage ?? siteUrl;
  return { title, description, alternates: { canonical } };
}

export default async function HomePage() {
  const siteConfig = await getSiteData();

  // SEO-DUP-7b: parked sites render the "no longer available" landing +
  // similar-pro cross-sells instead of the normal homepage. Early return so
  // the rest of the page logic (reviews, services, portfolio, etc.) doesn't
  // get computed for a site that won't render them.
  if (siteConfig.parked?.isActive) {
    return <ParkedLanding parked={siteConfig.parked} businessName={siteConfig.name} />;
  }

  const siteUrl = requireSiteUrl();
  const reviews = siteConfig.boatwork.staticReviews;
  const phone = formatPhone(siteConfig.phone);
  const hasPortfolio = siteConfig.portfolio.length > 0 || siteConfig.videos.length > 0;

  const localBusinessSchema = siteConfig.apiSeo?.jsonLd ?? {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name: siteConfig.name, description: siteConfig.description, url: siteUrl || undefined,
    telephone: phone?.href.replace('tel:', '') ?? siteConfig.phone, email: siteConfig.email,
    address: { '@type': 'PostalAddress', addressLocality: siteConfig.city, addressRegion: siteConfig.state, addressCountry: 'US' },
    image: siteConfig.logoUrl,
    sameAs: [siteConfig.boatwork.profileUrl, siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean),
  };

  const serviceSchemas = siteConfig.services.map((s) => ({
    '@context': 'https://schema.org', '@type': 'Service', serviceType: s.name,
    provider: { '@type': 'LocalBusiness', name: siteConfig.name },
    description: s.description, areaServed: `${siteConfig.city}, ${siteConfig.state}`,
  }));

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hasHours = siteConfig.hoursOfOperation && dayOrder.some((d) => !!siteConfig.hoursOfOperation![d]);

  return (
    <>
      {/* ─── HERO ─── Light, left-aligned, not centered */}
      <section className="min-h-[85vh] flex items-end bg-sand relative overflow-hidden pt-[72px]">
        {/* Subtle accent shape */}
        <div className="absolute top-0 right-0 w-[40vw] h-[60vh] bg-accent/[0.04] rounded-bl-[120px]" />

        <div className="max-w-page mx-auto px-5 sm:px-8 w-full py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-ink-muted text-[12px] font-medium tracking-wide mb-6">
              <MapPin size={12} strokeWidth={1.5} />
              {siteConfig.city}, {siteConfig.state}
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand leading-[1.05] tracking-tight mb-5">
              {siteConfig.name}
            </h1>

            <p className="text-accent font-heading font-bold text-lg md:text-xl mb-4">
              {siteConfig.tagline}
            </p>

            <p className="text-ink-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              {siteConfig.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider px-7 py-4 rounded-full text-center transition-colors inline-flex items-center justify-center gap-2">
                Get a Quote <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link href="/services" className="border-2 border-brand/15 hover:border-brand/30 text-brand font-semibold text-[12px] uppercase tracking-wider px-7 py-4 rounded-full text-center transition-colors">
                Our Services
              </Link>
            </div>

            {phone && (
              <a href={phone.href} className="mt-8 inline-flex items-center gap-2 text-ink-muted hover:text-accent transition-colors text-sm">
                <Phone size={14} strokeWidth={1.5} /> {phone.display}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="bg-white py-24 px-5 sm:px-8" id="services">
        <div className="max-w-page mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">What We Do</p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight">Our Services</h2>
            </div>
            <Link href="/services" className="text-accent hover:text-accent-dark text-[13px] font-semibold flex items-center gap-1.5 transition-colors">
              View All <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          </div>

          <div className={`grid gap-4 ${
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
        </div>
      </section>

      {/* ─── REVIEWS ─── Light bg, not dark */}
      {(siteConfig.reviewSynopsis || reviews.length > 0) && (
        <section className="bg-sand py-24 overflow-hidden" id="reviews">
          <div className="max-w-page mx-auto px-5 sm:px-8">
            <div className="mb-12">
              <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">Testimonials</p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight">What Our Clients Say</h2>
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
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-5 sm:px-8">
              {reviews.map((r, i) => (
                <div key={r.id ?? `${r.author}-${i}`} className="min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start">
                  <ReviewCard {...r} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ─── UPDATES ─── */}
      {siteConfig.updates.length > 0 && (
        <section className="bg-white py-24 px-5 sm:px-8" id="updates">
          <div className="max-w-page mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div>
                <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">News</p>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight">Latest Updates</h2>
              </div>
              <Link href="/news" className="text-accent hover:text-accent-dark text-[13px] font-semibold flex items-center gap-1.5 transition-colors">
                View All <ArrowUpRight size={14} strokeWidth={2} />
              </Link>
            </div>
            <UpdatesFeed updates={siteConfig.updates} businessName={siteConfig.name} logoUrl={siteConfig.logoUrl || undefined} />
          </div>
        </section>
      )}

      {/* ─── PORTFOLIO ─── */}
      {hasPortfolio && (
        <section className="bg-sand-dark py-24 px-5 sm:px-8" id="portfolio">
          <div className="max-w-page mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div>
                <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">Portfolio</p>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight">Our Work</h2>
              </div>
              <Link href="/portfolio" className="text-accent hover:text-accent-dark text-[13px] font-semibold flex items-center gap-1.5 transition-colors">
                View All <ArrowUpRight size={14} strokeWidth={2} />
              </Link>
            </div>
            <PortfolioGrid items={siteConfig.portfolio.slice(0, 6)} videos={siteConfig.videos} businessName={siteConfig.name} />
          </div>
        </section>
      )}

      {/* ─── SERVICE AREA ─── */}
      <section className="bg-white py-24 px-5 sm:px-8" id="service-area">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 flex items-center gap-2">
              <MapPin size={12} strokeWidth={1.5} /> Service Area
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight mb-5">{siteConfig.serviceAreaTitle}</h2>
            <p className="text-ink-muted leading-relaxed mb-8">{siteConfig.serviceAreaDescription}</p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.serviceArea.map((a) => (
                <span key={a} className="text-[13px] font-medium text-brand bg-sand rounded-full px-4 py-2">{a}</span>
              ))}
            </div>
          </div>
          <div className="h-80 lg:h-full min-h-[320px] rounded-2xl overflow-hidden bg-sand-dark">
            <ServiceAreaMap localities={siteConfig.serviceArea} />
          </div>
        </div>
      </section>

      {/* ─── HOURS ─── */}
      <section className="bg-brand py-5 px-5 sm:px-8" id="hours">
        <div className="max-w-page mx-auto flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8">
          <span className="text-[13px] font-semibold text-white flex items-center gap-2 flex-shrink-0">
            <Clock size={13} strokeWidth={1.5} className="text-accent" /> Hours
          </span>
          {hasHours ? (
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 lg:border-l lg:border-white/10 lg:pl-8">
              {dayOrder.map((day) => {
                const h = siteConfig.hoursOfOperation![day];
                if (!h) return null;
                return (
                  <div key={day} className="flex items-center gap-1.5 text-[13px]">
                    <span className="text-white/35">{day.slice(0, 3)}</span>
                    <span className="text-accent text-[12px]">{h === 'Open' ? 'All Day' : h}</span>
                  </div>
                );
              })}
            </div>
          ) : <p className="text-white/40 text-[13px]">Available 24/7</p>}
        </div>
      </section>

      {/* ─── CTA ─── Split: text left, form right */}
      <section className="bg-brand">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-20">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-4">Get in Touch</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Ready to Get Started?</h2>
            <div className="w-10 h-[2px] bg-accent mb-6" />
            <p className="text-white/40 text-base mb-8 max-w-md leading-relaxed">
              Speak directly with our team about your vessel.
            </p>
            {phone && (
              <a href={phone.href} className="text-accent font-heading text-2xl md:text-3xl font-extrabold hover:text-accent-light transition-colors">
                {phone.display}
              </a>
            )}
          </div>
          <div className="bg-white px-5 sm:px-8 lg:px-14 py-20">
            <div className="max-w-md mx-auto lg:mx-0">
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
