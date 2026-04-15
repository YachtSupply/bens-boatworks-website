export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
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
      <section>
        <div>
          <div>
            <p>About Us</p>
            <h1>{siteConfig.name}</h1>
            <p>{siteConfig.tagline}</p>
            {siteConfig.yearEstablished && (
              <p>Serving {siteConfig.city} since {siteConfig.yearEstablished}</p>
            )}
          </div>
          <div>
            <SmartLogo
              src={siteConfig.logoUrl}
              alt={siteConfig.name}
              size={180}
              fallbackInitial={siteConfig.name.charAt(0)}
            />
          </div>
        </div>
      </section>

      <section>
        <div>
          {yearsInBusiness && (
            <div>
              <p>{yearsInBusiness}+</p>
              <p>Years Experience</p>
            </div>
          )}
          <div>
            <p>{siteConfig.services.length}</p>
            <p>Services Offered</p>
          </div>
          <div>
            <p>{reviews.length > 0 ? avgRating.toFixed(1) : '5.0'}</p>
            <p>Star Rating</p>
          </div>
          <div>
            <p>{siteConfig.serviceArea.length}</p>
            <p>Areas Served</p>
          </div>
        </div>
      </section>

      <section>
        <div>
          <p>Our Story</p>
          <h2>About Our Business</h2>
          <div>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div>
          <div>
            <div>
              {[1,2,3,4,5].map((i) => (
                <span key={i}>{i <= Math.round(avgRating) ? '★' : '☆'}</span>
              ))}
            </div>
            <p>{avgRating.toFixed(1)} Stars on Boatwork</p>
            <p>{reviews.length} verified reviews</p>
          </div>
          <div>
            <BoatworkVerifiedBadge
              size="md"
              badgeUrl={siteConfig.badge?.badgeUrl}
              svgUrl={siteConfig.badge?.svgUrl}
              embedCode={siteConfig.badge?.embedCode}
              pixelUrl={siteConfig.badge?.pixelUrl}
              profileUrl={siteConfig.badge?.profileUrl}
            />
          </div>
          <div>
            <div>
              <p>Coverage Area</p>
            </div>
            <div>
              {siteConfig.serviceArea.slice(0, 8).map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <h2>Ready to Work Together?</h2>
          <p>
            Contact our team today to discuss your vessel and get a personalized quote.
          </p>
          <Link href="/contact">
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
