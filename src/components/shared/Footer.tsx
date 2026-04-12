import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube, FiPhone, FiMapPin, FiMail } from 'react-icons/fi';
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
  ['/privacy', 'Privacy Policy'],
];

export async function Footer() {
  const siteConfig = await getSiteData();
  const phone = formatPhone(siteConfig.phone);
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand — wider column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              {siteConfig.logoUrl ? (
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name}
                  width={48}
                  height={48}
                  className="rounded-xl object-cover"
                  unoptimized
                />
              ) : (
                <span className="flex items-center justify-center rounded-xl bg-gold text-white font-heading font-bold flex-shrink-0" style={{ width: 48, height: 48, fontSize: 20 }}>
                  {siteConfig.name.charAt(0)}
                </span>
              )}
              <span className="font-heading text-xl font-bold text-white">{siteConfig.name}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">{siteConfig.tagline}</p>
            <div className="space-y-3">
              <a href={phone?.href ?? `tel:${siteConfig.phone}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                  <FiPhone size={14} />
                </span>
                {phone?.display ?? siteConfig.phone}
              </a>
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                    <FiMail size={14} />
                  </span>
                  {siteConfig.email}
                </a>
              )}
              {siteConfig.address && (
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                    <FiMapPin size={14} />
                  </span>
                  {siteConfig.address}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-white/40 mb-5">Pages</p>
            <ul className="space-y-3">
              {navLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 text-sm hover:text-white transition-colors font-sans">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-white/40 mb-5">Connect</p>
            <div className="flex gap-3 mb-6">
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white/60 hover:bg-gold hover:text-white transition-all">
                  <FiFacebook size={18} />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white/60 hover:bg-gold hover:text-white transition-all">
                  <FiInstagram size={18} />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white/60 hover:bg-gold hover:text-white transition-all">
                  <FiLinkedin size={18} />
                </a>
              )}
              {siteConfig.social.youtube && (
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white/60 hover:bg-gold hover:text-white transition-all">
                  <FiYoutube size={18} />
                </a>
              )}
            </div>
            <BoatworkBadge
              profileUrl={siteConfig.badge?.profileUrl}
              badgeUrl={siteConfig.badge?.badgeUrl}
              svgUrl={siteConfig.badge?.svgUrl}
              embedCode={siteConfig.badge?.embedCode}
              inverted={true}
            />
          </div>
        </div>

        <div className="h-px bg-white/10 mt-12 mb-6" />

        <div className="text-center text-white/30 text-xs font-sans">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          {/* coastal-edge-template v{TEMPLATE_VERSION} */}
        </div>
      </div>
    </footer>
  );
}
