export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/siteData';
import { requireSiteUrl } from '@/lib/config';
import { BoatworkVerifiedBadge, SmartLogo } from '@/components/shared';
import { ArrowRight, MapPin } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = requireSiteUrl();
  const apiSeo = siteConfig.apiSeo;
  const primaryService = siteConfig.services[0]?.name ?? 'Marine Services';
  const firstDesc = siteConfig.description ? siteConfig.description.match(/^[^.!?]+[.!?]/)?.[0] ?? '' : '';
  return {
    title: apiSeo?.titles?.about ?? `About ${siteConfig.name} — ${primaryService} in ${siteConfig.city}, ${siteConfig.state}`,
    description: apiSeo?.metaDescriptions?.about ?? `Learn about ${siteConfig.name}, serving ${siteConfig.city} boat owners${siteConfig.yearEstablished ? ` since ${siteConfig.yearEstablished}` : ''}. ${firstDesc}`.trim(),
    alternates: { canonical: apiSeo?.canonicals?.about ?? `${siteUrl}/about` },
  };
}

export default async function AboutPage() {
  const siteConfig = await getSiteData();
  const reviews = siteConfig.boatwork.staticReviews;
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 5;
  const yearsInBusiness = siteConfig.yearEstablished ? new Date().getFullYear() - siteConfig.yearEstablished : null;

  const paragraphs = siteConfig.about
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-brand text-white pt-[72px]">
        <div className="max-w-page mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">About Us</p>
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">{siteConfig.name}</h1>
              <p className="text-white/70 text-lg leading-relaxed mb-3">{siteConfig.tagline}</p>
              {siteConfig.yearEstablished && (
                <p className="text-white/40 text-sm flex items-center gap-2">
                  <MapPin size={13} strokeWidth={1.5} className="text-accent" />
                  Serving {siteConfig.city} since {siteConfig.yearEstablished}
                </p>
              )}
            </div>
            <div className="flex-shrink-0">
              <SmartLogo
                src={siteConfig.logoUrl}
                alt={siteConfig.name}
                size={180}
                fallbackInitial={siteConfig.name.charAt(0)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-sand py-14 px-5 sm:px-8">
        <div className="max-w-page mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {yearsInBusiness && (
            <div className="bg-white rounded-2xl p-6 text-center">
              <p className="font-heading text-3xl md:text-4xl font-extrabold text-accent">{yearsInBusiness}+</p>
              <p className="text-ink-muted text-sm mt-1">Years Experience</p>
            </div>
          )}
          <div className="bg-white rounded-2xl p-6 text-center">
            <p className="font-heading text-3xl md:text-4xl font-extrabold text-accent">{siteConfig.services.length}</p>
            <p className="text-ink-muted text-sm mt-1">Services Offered</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <p className="font-heading text-3xl md:text-4xl font-extrabold text-accent">{reviews.length > 0 ? avgRating.toFixed(1) : '5.0'}</p>
            <p className="text-ink-muted text-sm mt-1">Star Rating</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <p className="font-heading text-3xl md:text-4xl font-extrabold text-accent">{siteConfig.serviceArea.length}</p>
            <p className="text-ink-muted text-sm mt-1">Areas Served</p>
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="bg-white py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto">
          <div className="max-w-3xl">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">Our Story</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight mb-8">About Our Business</h2>
            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-ink-muted text-base leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS & SERVICE AREA ─── */}
      <section className="bg-sand py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating card */}
            <div className="bg-white rounded-2xl p-7 flex flex-col items-center text-center">
              <div className="flex gap-1 text-accent text-2xl mb-3">
                {[1,2,3,4,5].map((i) => (
                  <span key={i}>{i <= Math.round(avgRating) ? '★' : '☆'}</span>
                ))}
              </div>
              <p className="font-heading text-lg font-extrabold text-brand">{avgRating.toFixed(1)} Stars on Boatwork</p>
              <p className="text-ink-muted text-sm mt-1">{reviews.length} verified reviews</p>
            </div>

            {/* Badge card */}
            <div className="bg-white rounded-2xl p-7 flex items-center justify-center">
              <BoatworkVerifiedBadge
                size="md"
                badgeUrl={siteConfig.badge?.badgeUrl}
                svgUrl={siteConfig.badge?.svgUrl}
                embedCode={siteConfig.badge?.embedCode}
                pixelUrl={siteConfig.badge?.pixelUrl}
                profileUrl={siteConfig.badge?.profileUrl}
              />
            </div>

            {/* Service area card */}
            <div className="bg-white rounded-2xl p-7">
              <div className="mb-4">
                <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em]">Coverage Area</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {siteConfig.serviceArea.slice(0, 8).map((a) => (
                  <span key={a} className="text-[13px] font-medium text-brand bg-sand rounded-full px-4 py-2">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-brand py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto text-center max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Ready to Work Together?</h2>
          <p className="text-white/50 text-base leading-relaxed mb-8">
            Contact our team today to discuss your vessel and get a personalized quote.
          </p>
          <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider px-7 py-4 rounded-full transition-colors inline-flex items-center gap-2">
            Get a Quote <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
