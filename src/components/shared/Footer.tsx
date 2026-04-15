import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube, FiPhone, FiMapPin, FiMail, FiClock, FiArrowRight } from 'react-icons/fi';
import { TEMPLATE_VERSION } from '@/site.config';
import { getSiteData } from '@/lib/siteData';
import { formatPhone } from '@/lib/phoneUtils';
import { BoatworkBadge } from './BoatworkBadge';

const navLinks: [string, string][] = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/portfolio', 'Portfolio'],
  ['/contact', 'Contact'],
];

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export async function Footer() {
  const siteConfig = await getSiteData();
  const phone = formatPhone(siteConfig.phone);
  const hasHours = siteConfig.hoursOfOperation && dayOrder.some((d) => !!siteConfig.hoursOfOperation![d]);
  const hasSocial = siteConfig.social.facebook || siteConfig.social.instagram || siteConfig.social.linkedin || siteConfig.social.youtube;

  return (
    <footer className="bg-navy text-white">
      {/* Top section — CTA bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-2xl font-extrabold tracking-tight mb-1">Ready to get started?</h3>
            <p className="text-white/40 font-sans text-sm">Contact our team for a free consultation.</p>
          </div>
          <div className="flex items-center gap-4">
            {phone && (
              <a href={phone.href ?? `tel:${siteConfig.phone}`} className="text-white/60 hover:text-white transition-colors font-sans text-sm flex items-center gap-2">
                <FiPhone size={16} /> {phone.display ?? siteConfig.phone}
              </a>
            )}
            <Link href="/contact" className="btn-gold flex items-center gap-2 px-6 py-3 text-sm whitespace-nowrap">
              Contact Us <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {siteConfig.logoUrl ? (
                <Image src={siteConfig.logoUrl} alt={siteConfig.name} width={36} height={36} className="rounded-xl object-cover" unoptimized />
              ) : (
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gold text-white font-heading font-bold text-sm">{siteConfig.name.charAt(0)}</span>
              )}
              <span className="font-heading text-lg font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-white/40 text-sm font-sans leading-relaxed mb-5">{siteConfig.tagline}</p>
            {hasSocial && (
              <div className="flex gap-2">
                {siteConfig.social.facebook && (
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-gold hover:text-white transition-all">
                    <FiFacebook size={16} />
                  </a>
                )}
                {siteConfig.social.instagram && (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-gold hover:text-white transition-all">
                    <FiInstagram size={16} />
                  </a>
                )}
                {siteConfig.social.linkedin && (
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-gold hover:text-white transition-all">
                    <FiLinkedin size={16} />
                  </a>
                )}
                {siteConfig.social.youtube && (
                  <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-gold hover:text-white transition-all">
                    <FiYoutube size={16} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-white/30 mb-4">Pages</p>
            <ul className="space-y-2.5">
              {navLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/50 text-sm hover:text-white transition-colors font-sans">{label}</Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="text-white/50 text-sm hover:text-white transition-colors font-sans">Privacy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-white/30 mb-4">Contact</p>
            <div className="space-y-3">
              {phone && (
                <a href={phone.href ?? `tel:${siteConfig.phone}`} className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors text-sm font-sans">
                  <FiPhone size={14} className="flex-shrink-0" /> {phone.display ?? siteConfig.phone}
                </a>
              )}
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors text-sm font-sans">
                  <FiMail size={14} className="flex-shrink-0" /> {siteConfig.email}
                </a>
              )}
              {siteConfig.address && (
                <div className="flex items-start gap-2.5 text-white/50 text-sm font-sans">
                  <FiMapPin size={14} className="flex-shrink-0 mt-0.5" /> {siteConfig.address}
                </div>
              )}
            </div>
            <div className="mt-5">
              <BoatworkBadge
                profileUrl={siteConfig.badge?.profileUrl}
                badgeUrl={siteConfig.badge?.badgeUrl}
                svgUrl={siteConfig.badge?.svgUrl}
                embedCode={siteConfig.badge?.embedCode}
                inverted={true}
              />
            </div>
          </div>

          {/* Hours — integrated into footer */}
          <div>
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-white/30 mb-4 flex items-center gap-2">
              <FiClock size={12} /> Hours
            </p>
            {hasHours ? (
              <div className="space-y-1.5">
                {dayOrder.map((day) => {
                  const hours = siteConfig.hoursOfOperation![day];
                  if (!hours) return null;
                  return (
                    <div key={day} className="flex justify-between text-sm font-sans">
                      <span className="text-white/50">{day.slice(0, 3)}</span>
                      <span className="text-white/70">{hours === 'Open' ? 'All Day' : hours}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-white/50 text-sm font-sans">Available 24/7</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 text-center text-white/25 text-xs font-sans">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
