export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { FiPhone, FiMapPin, FiClock, FiFacebook, FiInstagram, FiMail, FiShield } from 'react-icons/fi';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { ContactForm, SectionWrapper, BoatworkBadge } from '@/components/shared';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteConfig.apiSeo;
  return {
    title: apiSeo?.titles?.contact ?? `Contact ${siteConfig.name} | Get a Quote — ${siteConfig.city}, ${siteConfig.state}`,
    description: apiSeo?.metaDescriptions?.contact ?? `Contact ${siteConfig.name} in ${siteConfig.city}, ${siteConfig.state}. ${siteConfig.phone ? `Call ${siteConfig.phone} or r` : 'R'}equest a quote online.`,
    alternates: {
      canonical: apiSeo?.canonicals?.contact ?? (siteUrl ? `${siteUrl}/contact` : '/contact'),
    },
  };
}

export default async function ContactPage() {
  const siteConfig = await getSiteData();
  const phone = formatPhone(siteConfig.phone);
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const formatHours = (h: string) => h === 'Open' ? 'Open All Day' : h;
  const mapQuery = [siteConfig.address, siteConfig.city, siteConfig.state].filter(Boolean).join(', ');
  const hasBadge = siteConfig.badges.length > 0 || !!(siteConfig.badge && (siteConfig.badge.svgUrl || siteConfig.badge.embedCode || siteConfig.badge.badgeUrl));

  return (
    <>
      <section className="bg-hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="section-divider-center mb-5" style={{ background: 'rgba(255,255,255,0.3)' }} />
          <h1 className="font-heading text-5xl font-extrabold mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-white/60 font-sans max-w-xl mx-auto text-lg">
            We would love to discuss how we can care for your&nbsp;vessel.
          </p>
        </div>
      </section>

      <SectionWrapper variant="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <div className="section-divider mb-5" />
            <h2 className="font-heading text-3xl font-extrabold text-navy mb-8 tracking-tight">Request a Quote</h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="section-divider mb-5" />
              <h2 className="font-heading text-3xl font-extrabold text-navy mb-8 tracking-tight">Reach Us Directly</h2>
            </div>

            <div className="bg-white rounded-2xl border border-cream-dark p-8 space-y-5">
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 text-gold flex-shrink-0">
                  <FiPhone size={18} />
                </span>
                <div>
                  <p className="text-xs font-heading font-bold text-navy mb-1">Phone</p>
                  <a href={phone?.href ?? `tel:${siteConfig.phone}`} className="text-text font-sans hover:text-gold transition-colors">
                    {phone?.display ?? siteConfig.phone}
                  </a>
                </div>
              </div>

              {siteConfig.email && (
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 text-gold flex-shrink-0">
                    <FiMail size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-heading font-bold text-navy mb-1">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-text font-sans hover:text-gold transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 text-gold flex-shrink-0">
                  <FiMapPin size={18} />
                </span>
                <div>
                  <p className="text-xs font-heading font-bold text-navy mb-1">Location</p>
                  <p className="text-text font-sans">{siteConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 text-gold flex-shrink-0">
                  <FiClock size={18} />
                </span>
                <div>
                  <p className="text-xs font-heading font-bold text-navy mb-1">Business Hours</p>
                  <div className="space-y-1">
                    {siteConfig.hoursOfOperation && dayOrder.some((d) => !!siteConfig.hoursOfOperation![d])
                      ? dayOrder.map((day) => {
                          const hours = siteConfig.hoursOfOperation![day];
                          if (!hours) return null;
                          return (
                            <div key={day} className="flex gap-2 text-sm font-sans">
                              <span className="text-navy font-semibold w-24">{day}</span>
                              <span className="text-text-light">{formatHours(hours)}</span>
                            </div>
                          );
                        })
                      : <span className="text-text font-sans text-sm">Available 24/7</span>
                    }
                  </div>
                </div>
              </div>

              {(siteConfig.social.facebook || siteConfig.social.instagram) && (
                <div className="pt-2">
                  <p className="text-xs font-heading font-bold text-navy mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    {siteConfig.social.facebook && (
                      <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-lg bg-cream text-navy hover:bg-gold hover:text-white transition-all">
                        <FiFacebook size={16} />
                      </a>
                    )}
                    {siteConfig.social.instagram && (
                      <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-lg bg-cream text-navy hover:bg-gold hover:text-white transition-all">
                        <FiInstagram size={16} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {mapQuery && (
              <div className="bg-white rounded-2xl border border-cream-dark overflow-hidden">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&z=14`}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
                <div className="px-4 py-3 border-t border-cream-dark">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans font-semibold text-gold hover:text-gold-dark transition-colors flex items-center gap-1"
                  >
                    <FiMapPin size={12} /> Get Directions
                  </a>
                </div>
              </div>
            )}

            {hasBadge && (
              <div className="bg-white rounded-2xl border border-cream-dark p-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-heading font-bold text-navy mb-1">Verified on Boatwork</p>
                  <p className="text-text-light font-sans text-xs">Read reviews from real&nbsp;clients</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.badges.length > 0 ? (
                    siteConfig.badges.map((b, i) => (
                      <BoatworkBadge
                        key={b.id ?? i}
                        profileUrl={b.profileUrl ?? siteConfig.boatwork.profileUrl}
                        badgeUrl={b.badgeUrl}
                        svgUrl={b.svgUrl}
                        embedCode={b.embedCode}
                      />
                    ))
                  ) : (
                    <BoatworkBadge
                      profileUrl={siteConfig.badge?.profileUrl ?? siteConfig.boatwork.profileUrl}
                      badgeUrl={siteConfig.badge?.badgeUrl}
                      svgUrl={siteConfig.badge?.svgUrl}
                      embedCode={siteConfig.badge?.embedCode}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-text-light font-sans justify-center pt-2">
              <FiShield size={12} className="text-gold" />
              Your information is kept strictly confidential and never&nbsp;shared.
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
