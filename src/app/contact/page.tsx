export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { ContactForm, BoatworkBadge } from '@/components/shared';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteConfig.apiSeo;
  return {
    title: apiSeo?.titles?.contact ?? `Contact ${siteConfig.name} | Get a Quote — ${siteConfig.city}, ${siteConfig.state}`,
    description: apiSeo?.metaDescriptions?.contact ?? `Contact ${siteConfig.name} in ${siteConfig.city}, ${siteConfig.state}. ${siteConfig.phone ? `Call ${siteConfig.phone} or r` : 'R'}equest a quote online.`,
    alternates: { canonical: apiSeo?.canonicals?.contact ?? (siteUrl ? `${siteUrl}/contact` : '/contact') },
  };
}

export default async function ContactPage() {
  const siteConfig = await getSiteData();
  const phone = formatPhone(siteConfig.phone);
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const formatHours = (h: string) => h === 'Open' ? 'All Day' : h;
  const mapQuery = [siteConfig.address, siteConfig.city, siteConfig.state].filter(Boolean).join(', ');
  const hasHours = siteConfig.hoursOfOperation && dayOrder.some((d) => !!siteConfig.hoursOfOperation![d]);
  const hasBadge = siteConfig.badges.length > 0 || !!(siteConfig.badge && (siteConfig.badge.svgUrl || siteConfig.badge.embedCode || siteConfig.badge.badgeUrl));

  return (
    <>
      <div>
        <div>
          <div>
            <p>Contact</p>
            <h1>Get in Touch</h1>
            <p>We would love to discuss how we can care for your vessel.</p>

            <div>
              {phone && (
                <a href={phone.href ?? `tel:${siteConfig.phone}`}>
                  <div>
                    <p>Phone</p>
                    <p>{phone.display ?? siteConfig.phone}</p>
                  </div>
                </a>
              )}
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`}>
                  <div>
                    <p>Email</p>
                    <p>{siteConfig.email}</p>
                  </div>
                </a>
              )}
              <div>
                <div>
                  <p>Location</p>
                  <p>{siteConfig.address}</p>
                </div>
              </div>
              {hasHours && (
                <div>
                  <div>
                    <p>Hours</p>
                    <div>
                      {dayOrder.map((day) => {
                        const hours = siteConfig.hoursOfOperation![day];
                        if (!hours) return null;
                        return (
                          <div key={day}>
                            <span>{day.slice(0, 3)}</span>
                            <span>{formatHours(hours)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {(siteConfig.social.facebook || siteConfig.social.instagram) && (
              <div>
                {siteConfig.social.facebook && (
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                )}
                {siteConfig.social.instagram && (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                )}
              </div>
            )}

            {hasBadge && (
              <div>
                {siteConfig.badges.length > 0 ? (
                  siteConfig.badges.map((b, i) => (
                    <BoatworkBadge key={b.id ?? i} profileUrl={b.profileUrl ?? siteConfig.boatwork.profileUrl} badgeUrl={b.badgeUrl} svgUrl={b.svgUrl} embedCode={b.embedCode} inverted />
                  ))
                ) : (
                  <BoatworkBadge profileUrl={siteConfig.badge?.profileUrl ?? siteConfig.boatwork.profileUrl} badgeUrl={siteConfig.badge?.badgeUrl} svgUrl={siteConfig.badge?.svgUrl} embedCode={siteConfig.badge?.embedCode} inverted />
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <div>
            <h2>Request a Quote</h2>
            <p>Fill out the form below and we&rsquo;ll get back to you within one business day.</p>
            <ContactForm />
            <div>
              Your information is kept strictly confidential.
            </div>
          </div>
        </div>
      </div>

      {mapQuery && (
        <div>
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&z=14`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
          <div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>
      )}
    </>
  );
}
