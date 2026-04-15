export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { FiPhone, FiMapPin, FiClock, FiFacebook, FiInstagram, FiMail, FiShield } from 'react-icons/fi';
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
      {/* ══════════════════════════════════════════════════════
          TWO-TONE SPLIT — Dark info left, light form right
          ══════════════════════════════════════════════════════ */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT — Dark side with all contact info */}
        <div className="bg-navy text-white px-5 sm:px-8 lg:px-14 py-16 lg:py-0 flex flex-col justify-center">
          <div className="max-w-md mx-auto lg:mx-0 pt-24 lg:pt-0">
            <p className="text-gold font-heading font-bold text-sm uppercase tracking-wider mb-4">Contact</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Get in Touch
            </h1>
            <p className="text-white/40 font-sans text-lg mb-10 leading-relaxed">
              We would love to discuss how we can care for your&nbsp;vessel.
            </p>

            {/* Contact details */}
            <div className="space-y-5 mb-10">
              {phone && (
                <a href={phone.href ?? `tel:${siteConfig.phone}`} className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 group-hover:bg-gold transition-all">
                    <FiPhone size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-heading font-bold text-white/40 mb-0.5">Phone</p>
                    <p className="font-sans text-sm">{phone.display ?? siteConfig.phone}</p>
                  </div>
                </a>
              )}
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 group-hover:bg-gold transition-all">
                    <FiMail size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-heading font-bold text-white/40 mb-0.5">Email</p>
                    <p className="font-sans text-sm">{siteConfig.email}</p>
                  </div>
                </a>
              )}
              <div className="flex items-center gap-4 text-white/70">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10">
                  <FiMapPin size={18} />
                </span>
                <div>
                  <p className="text-xs font-heading font-bold text-white/40 mb-0.5">Location</p>
                  <p className="font-sans text-sm">{siteConfig.address}</p>
                </div>
              </div>
              {hasHours && (
                <div className="flex items-start gap-4 text-white/70">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 flex-shrink-0">
                    <FiClock size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-heading font-bold text-white/40 mb-1.5">Hours</p>
                    <div className="space-y-1">
                      {dayOrder.map((day) => {
                        const hours = siteConfig.hoursOfOperation![day];
                        if (!hours) return null;
                        return (
                          <div key={day} className="flex gap-2 text-sm font-sans">
                            <span className="text-white/40 w-10">{day.slice(0, 3)}</span>
                            <span className="text-white/70">{formatHours(hours)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Social links */}
            {(siteConfig.social.facebook || siteConfig.social.instagram) && (
              <div className="flex gap-3 mb-8">
                {siteConfig.social.facebook && (
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-gold hover:text-white transition-all">
                    <FiFacebook size={16} />
                  </a>
                )}
                {siteConfig.social.instagram && (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-gold hover:text-white transition-all">
                    <FiInstagram size={16} />
                  </a>
                )}
              </div>
            )}

            {hasBadge && (
              <div className="flex flex-wrap gap-2">
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

        {/* RIGHT — Light side with form */}
        <div className="bg-cream px-5 sm:px-8 lg:px-14 py-16 lg:py-0 flex flex-col justify-center">
          <div className="max-w-md mx-auto lg:mx-0 w-full pt-8 lg:pt-24">
            <h2 className="font-heading text-3xl font-extrabold text-navy tracking-tight mb-2">Request a Quote</h2>
            <p className="text-text-light font-sans text-sm mb-8">Fill out the form below and we&rsquo;ll get back to you within one business&nbsp;day.</p>
            <ContactForm />
            <div className="flex items-center gap-2 text-xs text-text-light font-sans justify-center mt-6">
              <FiShield size={12} className="text-gold" />
              Your information is kept strictly confidential.
            </div>
          </div>
        </div>
      </div>

      {/* Map — full width below */}
      {mapQuery && (
        <div className="relative">
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
          <div className="absolute bottom-4 left-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white shadow-lg rounded-xl px-4 py-2.5 text-xs font-sans font-semibold text-navy hover:text-gold transition-colors flex items-center gap-1.5"
            >
              <FiMapPin size={12} /> Get Directions
            </a>
          </div>
        </div>
      )}
    </>
  );
}
