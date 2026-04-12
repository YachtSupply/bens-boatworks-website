export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiPhone, FiArrowRight, FiClock, FiTool, FiZap, FiUsers, FiAnchor, FiNavigation, FiDroplet, FiMapPin } from 'react-icons/fi';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { ReviewCard, ReviewSynopsis, SectionWrapper, BoatworkVerifiedBadge, PortfolioGrid, ServiceAreaMap, SmartLogo, UpdatesFeed } from '@/components/shared';

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}

const iconMap: Record<string, React.ReactNode> = {
  wheel: <FiNavigation size={22} />,
  anchor: <FiAnchor size={22} />,
  waves: <FiDroplet size={22} />,
  wrench: <FiTool size={22} />,
  electric: <FiZap size={22} />,
  engine: <FiTool size={22} />,
  captain: <FiUsers size={22} />,
};

export async function generateMetadata(): Promise<Metadata> {
  const siteData = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteData.apiSeo;
  const serviceNames = siteData.services.slice(0, 3).map((s) => s.name).join(', ');
  const title = apiSeo?.titles?.homepage ?? `${siteData.name} — Marine Services in ${siteData.city}, ${siteData.state}`;
  const description = apiSeo?.metaDescriptions?.homepage ?? `${siteData.name} provides ${serviceNames} in ${siteData.city}, ${siteData.state}. Request a quote today.`;
  const canonical = apiSeo?.canonicals?.homepage ?? (siteUrl || '/');
  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

export default async function HomePage() {
  const siteConfig = await getSiteData();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

  const reviews = siteConfig.boatwork.staticReviews;
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 5;

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
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: 'US',
    },
    image: siteConfig.logoUrl,
    sameAs: [
      siteConfig.boatwork.profileUrl,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ].filter(Boolean),
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

  const formatHours = (h: string) => h === 'Open' ? 'Open All Day' : h;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-gradient text-white overflow-hidden" style={{ minHeight: '90vh' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center" style={{ minHeight: '90vh' }}>
          <div className="mb-8">
            <SmartLogo
              src={siteConfig.logoUrl}
              alt={siteConfig.name}
              size={120}
              fallbackInitial={siteConfig.name.charAt(0)}
              className="border-2 border-white/20 rounded-2xl"
              fallbackClassName="bg-gold text-white border-2 border-white/20 rounded-2xl"
            />
          </div>

          <div className="accent-badge mb-6" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
            <FiMapPin size={12} />
            {siteConfig.city}, {siteConfig.state}
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-extrabold mb-5 leading-[1.1] tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="text-white/60 font-sans text-lg md:text-xl max-w-2xl mb-10">
            {siteConfig.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/services"
              className="btn-gold px-8 py-4 text-sm font-semibold whitespace-nowrap"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="btn-outline-light px-8 py-4 text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Get a Quote <FiArrowRight size={14} />
            </Link>
          </div>

          {phone && (
            <a href={phone.href} className="mt-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors">
              <FiPhone size={15} />
              <span className="font-sans text-sm">{phone.display}</span>
            </a>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Services Preview */}
      <SectionWrapper variant="cream" id="services">
        <div className="text-center mb-14">
          <div className="section-divider-center mb-5" />
          <h2 className="font-heading text-4xl font-extrabold text-navy mb-4 tracking-tight">What We&nbsp;Do</h2>
          <p className="text-text-light font-sans max-w-2xl mx-auto leading-relaxed">
            Comprehensive marine services delivered with expertise and&nbsp;care.
          </p>
        </div>
        <div className={`grid gap-5 ${
          siteConfig.services.length === 1 ? 'grid-cols-1' :
          siteConfig.services.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          siteConfig.services.length === 4 ? 'grid-cols-1 md:grid-cols-2' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {siteConfig.services.map((s) => (
            <div key={s.name} className="service-card bg-white p-7 group flex flex-col">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gold/10 text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                {iconMap[s.icon] ?? iconMap.anchor}
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">{s.name}</h3>
              <p className="text-text-light text-sm leading-relaxed font-sans mb-4 flex-1">
                {firstSentence(s.description)}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-gold font-sans font-semibold text-sm hover:gap-3 transition-all"
              >
                Learn more <FiArrowRight size={14} className="flex-shrink-0" />
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="btn-gold inline-flex items-center gap-2 px-6 py-3 whitespace-nowrap"
          >
            View All Services <FiArrowRight size={14} />
          </Link>
        </div>
      </SectionWrapper>

      {/* Reviews */}
      {(siteConfig.reviewSynopsis || reviews.length > 0) && (
        <SectionWrapper variant="white" id="reviews">
          <div className="text-center mb-14">
            <div className="section-divider-center mb-5" />
            <h2 className="font-heading text-4xl font-extrabold text-navy mb-4 tracking-tight">What Our Clients&nbsp;Say</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {siteConfig.boatwork.staticReviews.map((r, i) => (
                <ReviewCard key={r.id ?? `${r.author}-${i}`} {...r} />
              ))}
            </div>
          )}
        </SectionWrapper>
      )}

      {/* Updates */}
      {siteConfig.updates.length > 0 && (
        <SectionWrapper variant="cream" id="updates">
          <div className="text-center mb-14">
            <div className="section-divider-center mb-5" />
            <h2 className="font-heading text-4xl font-extrabold text-navy mb-4 tracking-tight">Latest Updates</h2>
            <p className="text-text-light font-sans max-w-2xl mx-auto leading-relaxed">
              News and updates from {siteConfig.name}.
            </p>
          </div>
          <UpdatesFeed
            updates={siteConfig.updates}
            businessName={siteConfig.name}
            logoUrl={siteConfig.logoUrl || undefined}
          />
          <div className="text-center mt-10">
            <Link
              href="/news"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 whitespace-nowrap"
            >
              View All Updates <FiArrowRight size={14} />
            </Link>
          </div>
        </SectionWrapper>
      )}

      {/* Portfolio */}
      {hasPortfolio && (
        <SectionWrapper variant="white" id="portfolio">
          <div className="text-center mb-10">
            <div className="section-divider-center mb-5" />
            <h2 className="font-heading text-4xl font-extrabold text-navy mb-4 tracking-tight">Our Work</h2>
            <p className="text-text-light font-sans max-w-xl mx-auto">
              A glimpse of what we do for local boat&nbsp;owners.
            </p>
          </div>
          <PortfolioGrid items={siteConfig.portfolio.slice(0, 6)} videos={siteConfig.videos} businessName={siteConfig.name} />
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 whitespace-nowrap"
            >
              View Full Portfolio <FiArrowRight size={14} />
            </Link>
          </div>
        </SectionWrapper>
      )}

      {/* Service Area */}
      <SectionWrapper variant="cream" id="service-area">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-divider mb-5" />
            <h2 className="font-heading text-4xl font-extrabold text-navy mb-6 tracking-tight">{siteConfig.serviceAreaTitle}</h2>
            <p className="text-text font-sans mb-6 leading-relaxed">
              {siteConfig.serviceAreaDescription}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {siteConfig.serviceArea.map((a) => (
                <div key={a} className="flex items-center gap-2.5 font-sans text-sm text-text bg-white rounded-lg px-3 py-2.5 border border-cream-dark">
                  <FiMapPin size={14} className="text-gold flex-shrink-0" />
                  <span className="font-medium">{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-96 lg:h-full min-h-[360px] rounded-2xl overflow-hidden">
            <ServiceAreaMap localities={siteConfig.serviceArea} />
          </div>
        </div>
      </SectionWrapper>

      {/* Business Hours */}
      <SectionWrapper variant="white" id="hours">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FiClock className="text-gold flex-shrink-0" size={22} />
            <h2 className="font-heading text-3xl font-extrabold text-navy tracking-tight">Business Hours</h2>
          </div>
          <div className="bg-cream rounded-2xl p-6 space-y-2.5">
            {siteConfig.hoursOfOperation && dayOrder.some((d) => !!siteConfig.hoursOfOperation![d])
              ? dayOrder.map((day) => {
                  const hours = siteConfig.hoursOfOperation![day];
                  if (!hours) return null;
                  return (
                    <div key={day} className="flex justify-between font-sans text-sm">
                      <span className="text-navy font-semibold w-28">{day}</span>
                      <span className="text-text-light">{formatHours(hours)}</span>
                    </div>
                  );
                })
              : <p className="text-text font-sans text-sm text-center py-2">Available 24/7</p>
            }
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="navy">
        <div className="text-center py-8">
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Ready to Get&nbsp;Started?</h2>
          <p className="text-white/50 font-sans mb-3 text-lg">Speak directly with our team about your&nbsp;vessel.</p>
          {phone ? (
            <a href={phone.href} className="text-gold font-heading text-3xl md:text-4xl font-extrabold block mb-10 hover:text-gold-light transition-colors">
              {phone.display}
            </a>
          ) : (
            <a href={`tel:${siteConfig.phone}`} className="text-gold font-heading text-3xl md:text-4xl font-extrabold block mb-10 hover:text-gold-light transition-colors">
              {siteConfig.phone}
            </a>
          )}
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-sm whitespace-nowrap"
          >
            Contact Us <FiArrowRight size={14} />
          </Link>
        </div>
      </SectionWrapper>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {serviceSchemas.map((schema, i) => (
        <script
          key={`service-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
