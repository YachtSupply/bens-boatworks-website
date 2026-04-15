export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiMapPin, FiStar, FiAward, FiCalendar, FiUsers } from 'react-icons/fi';
import { getSiteData } from '@/lib/siteData';
import { BoatworkVerifiedBadge, SmartLogo } from '@/components/shared';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteConfig.apiSeo;
  const primaryService = siteConfig.services[0]?.name ?? 'Marine Services';
  const firstDesc = siteConfig.description ? siteConfig.description.match(/^[^.!?]+[.!?]/)?.[0] ?? '' : '';
  return {
    title: apiSeo?.titles?.about ?? `About ${siteConfig.name} — ${primaryService} in ${siteConfig.city}, ${siteConfig.state}`,
    description: apiSeo?.metaDescriptions?.about ?? `Learn about ${siteConfig.name}, serving ${siteConfig.city} boat owners${siteConfig.yearEstablished ? ` since ${siteConfig.yearEstablished}` : ''}. ${firstDesc}`.trim(),
    alternates: { canonical: apiSeo?.canonicals?.about ?? (siteUrl ? `${siteUrl}/about` : '/about') },
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
      {/* Hero — Split with logo right */}
      <section className="relative bg-hero-gradient text-white min-h-[70vh] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 min-h-[70vh] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="pt-28 pb-12 lg:py-0">
            <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-4">About Us</p>
            <h1 className="font-heading text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5">
              {siteConfig.name}
            </h1>
            <p className="text-white/50 font-sans text-lg max-w-md leading-relaxed mb-6">{siteConfig.tagline}</p>
            {siteConfig.yearEstablished && (
              <p className="accent-badge inline-flex" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                <FiCalendar size={12} /> Serving {siteConfig.city} since {siteConfig.yearEstablished}
              </p>
            )}
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <SmartLogo
              src={siteConfig.logoUrl}
              alt={siteConfig.name}
              size={180}
              fallbackInitial={siteConfig.name.charAt(0)}
              className="border-2 border-white/20 rounded-3xl shadow-2xl"
              fallbackClassName="bg-gold text-white border-2 border-white/20 rounded-3xl"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Bar — horizontal strip */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {yearsInBusiness && (
            <div>
              <p className="text-3xl font-heading font-extrabold text-gold">{yearsInBusiness}+</p>
              <p className="text-text-light font-sans text-sm mt-1">Years Experience</p>
            </div>
          )}
          <div>
            <p className="text-3xl font-heading font-extrabold text-gold">{siteConfig.services.length}</p>
            <p className="text-text-light font-sans text-sm mt-1">Services Offered</p>
          </div>
          <div>
            <p className="text-3xl font-heading font-extrabold text-gold">{reviews.length > 0 ? avgRating.toFixed(1) : '5.0'}</p>
            <p className="text-text-light font-sans text-sm mt-1">Star Rating</p>
          </div>
          <div>
            <p className="text-3xl font-heading font-extrabold text-gold">{siteConfig.serviceArea.length}</p>
            <p className="text-text-light font-sans text-sm mt-1">Areas Served</p>
          </div>
        </div>
      </section>

      {/* Story — single column narrative flow */}
      <section className="bg-white py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-3">Our Story</p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-10">About Our Business</h2>
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-text font-sans text-lg leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section className="bg-cream py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Rating */}
          <div className="bg-white rounded-2xl p-8 text-center border border-cream-dark">
            <div className="flex gap-1 justify-center mb-3">
              {[1,2,3,4,5].map((i) => (
                <FiStar key={i} size={20} className={i <= Math.round(avgRating) ? 'text-gold fill-gold' : 'text-cream-dark'} strokeWidth={i <= Math.round(avgRating) ? 0 : 1.5} />
              ))}
            </div>
            <p className="font-heading text-lg font-bold text-navy">{avgRating.toFixed(1)} Stars on Boatwork</p>
            <p className="text-text-light font-sans text-sm mt-1">{reviews.length} verified reviews</p>
          </div>
          {/* Badge */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center border border-cream-dark">
            <BoatworkVerifiedBadge
              size="md"
              badgeUrl={siteConfig.badge?.badgeUrl}
              svgUrl={siteConfig.badge?.svgUrl}
              embedCode={siteConfig.badge?.embedCode}
              pixelUrl={siteConfig.badge?.pixelUrl}
              profileUrl={siteConfig.badge?.profileUrl}
            />
          </div>
          {/* Service area */}
          <div className="bg-white rounded-2xl p-8 border border-cream-dark">
            <div className="flex items-center gap-2 mb-3">
              <FiMapPin className="text-gold" size={18} />
              <p className="font-heading font-bold text-navy">Coverage Area</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {siteConfig.serviceArea.slice(0, 8).map((a) => (
                <span key={a} className="text-xs font-sans font-medium text-text bg-cream px-2.5 py-1 rounded-lg">{a}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-extrabold tracking-tight mb-4">Ready to Work&nbsp;Together?</h2>
          <p className="text-white/40 font-sans text-lg mb-8 max-w-xl mx-auto">
            Contact our team today to discuss your vessel and get a personalized&nbsp;quote.
          </p>
          <Link href="/contact" className="btn-gold inline-flex items-center gap-2 px-8 py-4 whitespace-nowrap">
            Get a Quote <FiArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
