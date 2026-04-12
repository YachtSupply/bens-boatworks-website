export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiMapPin, FiStar } from 'react-icons/fi';
import { getSiteData } from '@/lib/siteData';
import { SectionWrapper, BoatworkVerifiedBadge, SmartLogo } from '@/components/shared';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteConfig.apiSeo;
  const primaryService = siteConfig.services[0]?.name ?? 'Marine Services';
  const firstDesc = siteConfig.description ? siteConfig.description.match(/^[^.!?]+[.!?]/)?.[0] ?? '' : '';
  return {
    title: apiSeo?.titles?.about ?? `About ${siteConfig.name} — ${primaryService} in ${siteConfig.city}, ${siteConfig.state}`,
    description: apiSeo?.metaDescriptions?.about ?? `Learn about ${siteConfig.name}, serving ${siteConfig.city} boat owners${siteConfig.yearEstablished ? ` since ${siteConfig.yearEstablished}` : ''}. ${firstDesc}`.trim(),
    alternates: {
      canonical: apiSeo?.canonicals?.about ?? (siteUrl ? `${siteUrl}/about` : '/about'),
    },
  };
}

function formatAbout(text: string) {
  if (!text) return null;

  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean);

  if (paragraphs.length <= 1) {
    return (
      <div className="mb-6">
        <p className="text-text font-sans leading-relaxed">{text}</p>
      </div>
    );
  }

  const first = paragraphs[0];
  const rest = paragraphs.slice(1);

  return (
    <div className="mb-6">
      <p className="text-text font-sans leading-relaxed mb-4">{first}</p>
      <details className="group">
        <summary className="cursor-pointer list-none text-gold font-sans text-sm font-semibold hover:text-gold-dark transition-colors mb-3 inline-block select-none">
          <span className="group-open:hidden">Read more &darr;</span>
          <span className="hidden group-open:inline">Show less &uarr;</span>
        </summary>
        <div className="about-accordion overflow-hidden transition-[max-height] duration-300 ease-in-out">
          {rest.map((p, i) => (
            <p key={i} className="text-text font-sans leading-relaxed mb-4">{p}</p>
          ))}
        </div>
      </details>
      <style>{`
        .about-accordion { display: block !important; max-height: 0; }
        details[open] .about-accordion { max-height: 3000px; }
      `}</style>
    </div>
  );
}

export default async function AboutPage() {
  const siteConfig = await getSiteData();

  const reviews = siteConfig.boatwork.staticReviews;
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 5;

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="section-divider-center mb-5" style={{ background: 'rgba(255,255,255,0.3)' }} />
          <h1 className="font-heading text-5xl font-extrabold mb-4 tracking-tight">{siteConfig.name}</h1>
          <p className="text-white/60 font-sans text-lg mb-4">{siteConfig.tagline}</p>
          {siteConfig.yearEstablished && (
            <p className="accent-badge inline-flex" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
              Serving {siteConfig.city} since {siteConfig.yearEstablished}
            </p>
          )}
        </div>
      </section>

      {/* About content */}
      <SectionWrapper variant="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-divider mb-5" />
            <h2 className="font-heading text-4xl font-extrabold text-navy mb-6 tracking-tight">Our Story</h2>
            {siteConfig.yearEstablished && (
              <p className="accent-badge mb-5">
                Est. {siteConfig.yearEstablished}
              </p>
            )}
            {formatAbout(siteConfig.about)}
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 mt-2 whitespace-nowrap"
            >
              Get a Quote <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-6">
            {/* Logo + badge panel */}
            <div className="bg-cream rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="mb-6">
                <SmartLogo
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name}
                  size={120}
                  fallbackInitial={siteConfig.name.charAt(0)}
                  className="rounded-2xl"
                  fallbackClassName="bg-navy text-white rounded-2xl"
                />
              </div>
              {reviews.length > 0 ? (
                <>
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map((i) => (
                      <FiStar
                        key={i}
                        size={18}
                        className={i <= Math.round(avgRating) ? 'text-gold fill-gold' : 'text-cream-dark'}
                        strokeWidth={i <= Math.round(avgRating) ? 0 : 1.5}
                      />
                    ))}
                  </div>
                  <p className="font-heading text-lg font-bold text-navy mb-1">{avgRating.toFixed(1)} Star Rated</p>
                  <p className="text-text-light font-sans text-sm mb-6">Verified reviews from real boat&nbsp;owners</p>
                </>
              ) : (
                <>
                  <p className="font-heading text-lg font-bold text-navy mb-1">New on Boatwork</p>
                  <p className="text-text-light font-sans text-sm mb-6">No reviews yet</p>
                </>
              )}
              <BoatworkVerifiedBadge
                size="sm"
                badgeUrl={siteConfig.badge?.badgeUrl}
                svgUrl={siteConfig.badge?.svgUrl}
                embedCode={siteConfig.badge?.embedCode}
                pixelUrl={siteConfig.badge?.pixelUrl}
                profileUrl={siteConfig.badge?.profileUrl}
              />
            </div>

            {/* Service area */}
            <div className="bg-cream rounded-2xl p-8">
              <div className="flex items-center gap-2.5 mb-4">
                <FiMapPin className="text-gold" size={18} />
                <span className="font-heading font-bold text-navy">Service Area</span>
              </div>
              <p className="text-text-light font-sans text-sm mb-4">{siteConfig.serviceAreaDescription}</p>
              <div className="flex flex-wrap gap-2">
                {siteConfig.serviceArea.map((a) => (
                  <span key={a} className="text-xs font-sans font-medium text-text bg-white px-3 py-1.5 rounded-lg">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="navy">
        <div className="text-center py-8">
          <h2 className="font-heading text-4xl font-extrabold mb-4 tracking-tight">Ready to Work&nbsp;Together?</h2>
          <p className="text-white/50 font-sans mb-8 max-w-xl mx-auto text-lg">
            Contact our team today to discuss your vessel and get a personalized&nbsp;quote.
          </p>
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 whitespace-nowrap"
          >
            Get a Quote <FiArrowRight size={14} />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
