export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { ContactForm, BoatworkBadge } from '@/components/shared';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

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
      {/* ─── CONTACT SPLIT ─── */}
      <div className="pt-[72px] grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Info panel */}
        <div className="bg-brand text-white px-5 sm:px-8 lg:px-14 py-20">
          <div className="max-w-lg mx-auto lg:mx-0">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">Contact</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Get in Touch</h1>
            <p className="text-white/50 text-base leading-relaxed mb-10">We would love to discuss how we can care for your vessel.</p>

            <div className="space-y-4">
              {phone && (
                <a href={phone.href ?? `tel:${siteConfig.phone}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone size={16} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.15em]">Phone</p>
                    <p className="text-white font-semibold group-hover:text-accent transition-colors">{phone.display ?? siteConfig.phone}</p>
                  </div>
                </a>
              )}
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail size={16} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.15em]">Email</p>
                    <p className="text-white font-semibold group-hover:text-accent transition-colors">{siteConfig.email}</p>
                  </div>
                </a>
              )}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} strokeWidth={1.5} className="text-accent" />
                </div>
                <div>
                  <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.15em]">Location</p>
                  <p className="text-white font-semibold">{siteConfig.address}</p>
                </div>
              </div>
              {hasHours && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} strokeWidth={1.5} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">Hours</p>
                    <div className="space-y-1">
                      {dayOrder.map((day) => {
                        const hours = siteConfig.hoursOfOperation![day];
                        if (!hours) return null;
                        return (
                          <div key={day} className="flex items-center gap-3 text-sm">
                            <span className="text-white/35 w-8">{day.slice(0, 3)}</span>
                            <span className="text-accent text-[13px]">{formatHours(hours)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {(siteConfig.social.facebook || siteConfig.social.instagram) && (
              <div className="flex gap-3 mt-10">
                {siteConfig.social.facebook && (
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-accent text-sm font-semibold transition-colors flex items-center gap-1.5">
                    Facebook <ArrowUpRight size={12} strokeWidth={2} />
                  </a>
                )}
                {siteConfig.social.instagram && (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-accent text-sm font-semibold transition-colors flex items-center gap-1.5">
                    Instagram <ArrowUpRight size={12} strokeWidth={2} />
                  </a>
                )}
              </div>
            )}

            {hasBadge && (
              <div className="mt-10 flex flex-wrap gap-4">
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

        {/* Right: Form panel */}
        <div className="bg-white px-5 sm:px-8 lg:px-14 py-20">
          <div className="max-w-md mx-auto lg:mx-0">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-brand tracking-tight mb-2">Request a Quote</h2>
            <p className="text-ink-muted text-sm mb-8">Fill out the form below and we&rsquo;ll get back to you within one business day.</p>
            <ContactForm />
            <div className="mt-6 text-ink-light text-[12px] text-center lg:text-left">
              Your information is kept strictly confidential.
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAP ─── */}
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
          <div className="absolute bottom-4 right-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider px-5 py-3 rounded-full transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              Get Directions <ArrowUpRight size={13} strokeWidth={2} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
