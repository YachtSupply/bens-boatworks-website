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
    <footer className="bg-brand text-white">
      <div className="max-w-page mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              {siteConfig.logoUrl ? (
                <Image src={siteConfig.logoUrl} alt={siteConfig.name} width={36} height={36} className="rounded-lg object-cover" unoptimized />
              ) : (
                <span className="w-9 h-9 rounded-lg bg-accent text-white font-heading font-bold text-sm flex items-center justify-center">
                  {siteConfig.name.charAt(0)}
                </span>
              )}
              <span className="font-heading font-bold text-[15px]">{siteConfig.name}</span>
            </div>
            <p className="text-white/40 text-[13px] leading-relaxed mb-6 max-w-xs">{siteConfig.tagline}</p>
            {hasSocial && (
              <div className="flex gap-2 mb-6">
                {siteConfig.social.facebook && <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-accent/30 hover:text-accent flex items-center justify-center text-white/40 text-[11px] transition-all">Fb</a>}
                {siteConfig.social.instagram && <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-accent/30 hover:text-accent flex items-center justify-center text-white/40 text-[11px] transition-all">Ig</a>}
                {siteConfig.social.linkedin && <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-accent/30 hover:text-accent flex items-center justify-center text-white/40 text-[11px] transition-all">Li</a>}
                {siteConfig.social.youtube && <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-accent/30 hover:text-accent flex items-center justify-center text-white/40 text-[11px] transition-all">Yt</a>}
              </div>
            )}
            <BoatworkBadge profileUrl={siteConfig.badge?.profileUrl} badgeUrl={siteConfig.badge?.badgeUrl} svgUrl={siteConfig.badge?.svgUrl} embedCode={siteConfig.badge?.embedCode} inverted={true} />
          </div>
          {/* Links */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/25 mb-4">Pages</p>
            <ul className="space-y-2">
              {navLinks.map(([href, label]) => (
                <li key={href}><Link href={href} className="text-white/45 text-[13px] hover:text-accent transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/25 mb-4">Contact</p>
            <div className="space-y-2.5">
              {phone && <a href={phone.href ?? `tel:${siteConfig.phone}`} className="flex items-center gap-2 text-white/45 hover:text-accent text-[13px] transition-colors"><Phone size={13} strokeWidth={1.5} /> {phone.display ?? siteConfig.phone}</a>}
              {siteConfig.email && <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-white/45 hover:text-accent text-[13px] transition-colors"><Mail size={13} strokeWidth={1.5} /> {siteConfig.email}</a>}
              {siteConfig.address && <div className="flex items-start gap-2 text-white/35 text-[13px]"><MapPin size={13} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" /> {siteConfig.address}</div>}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-white/20 text-[11px]">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}</p>
          <p>Powered by <a href="https://boatwork.co" className="text-accent/50 hover:text-accent transition-colors">Boatwork</a></p>
        </div>
      </div>
    </footer>
  );
}
