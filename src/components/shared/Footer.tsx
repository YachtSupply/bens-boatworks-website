import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
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
  ['/privacy', 'Privacy'],
];

export async function Footer() {
  const siteConfig = await getSiteData();
  const phone = formatPhone(siteConfig.phone);
  const hasSocial = siteConfig.social.facebook || siteConfig.social.instagram || siteConfig.social.linkedin || siteConfig.social.youtube;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-page mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand — takes more space */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              {siteConfig.logoUrl ? (
                <Image src={siteConfig.logoUrl} alt={siteConfig.name} width={44} height={44} className="rounded-lg object-cover" unoptimized />
              ) : (
                <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-gold text-navy font-serif text-xl">
                  {siteConfig.name.charAt(0)}
                </span>
              )}
              <span className="font-serif text-xl">{siteConfig.name}</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">{siteConfig.tagline}</p>

            {hasSocial && (
              <div className="flex gap-2 mb-6">
                {siteConfig.social.facebook && <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-gold/20 hover:text-gold flex items-center justify-center text-white/40 text-xs transition-all">Fb</a>}
                {siteConfig.social.instagram && <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-gold/20 hover:text-gold flex items-center justify-center text-white/40 text-xs transition-all">Ig</a>}
                {siteConfig.social.linkedin && <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-gold/20 hover:text-gold flex items-center justify-center text-white/40 text-xs transition-all">Li</a>}
                {siteConfig.social.youtube && <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-gold/20 hover:text-gold flex items-center justify-center text-white/40 text-xs transition-all">Yt</a>}
              </div>
            )}

            <BoatworkBadge profileUrl={siteConfig.badge?.profileUrl} badgeUrl={siteConfig.badge?.badgeUrl} svgUrl={siteConfig.badge?.svgUrl} embedCode={siteConfig.badge?.embedCode} inverted={true} />
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Pages</p>
            <ul className="space-y-2.5">
              {navLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/50 text-sm hover:text-gold transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Contact</p>
            <div className="space-y-3">
              {phone && (
                <a href={phone.href ?? `tel:${siteConfig.phone}`} className="flex items-center gap-2.5 text-white/50 hover:text-gold text-sm transition-colors">
                  <Phone size={14} strokeWidth={1.5} className="flex-shrink-0" /> {phone.display ?? siteConfig.phone}
                </a>
              )}
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 text-white/50 hover:text-gold text-sm transition-colors">
                  <Mail size={14} strokeWidth={1.5} className="flex-shrink-0" /> {siteConfig.email}
                </a>
              )}
              {siteConfig.address && (
                <div className="flex items-start gap-2.5 text-white/40 text-sm">
                  <MapPin size={14} strokeWidth={1.5} className="flex-shrink-0 mt-0.5" /> {siteConfig.address}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-xs">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Powered by <a href="https://boatwork.co" className="text-gold/60 hover:text-gold transition-colors">Boatwork</a></p>
        </div>
      </div>
    </footer>
  );
}
