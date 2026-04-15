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
  ['/privacy', 'Privacy'],
];

export async function Footer() {
  const siteConfig = await getSiteData();
  const phone = formatPhone(siteConfig.phone);
  const hasSocial = siteConfig.social.facebook || siteConfig.social.instagram || siteConfig.social.linkedin || siteConfig.social.youtube;

  return (
    <footer className="bg-navy text-white">
      <div className="gold-rule-full" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Brand & large logo */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              {siteConfig.logoUrl ? (
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name}
                  width={64}
                  height={64}
                  className="rounded-2xl object-cover"
                  unoptimized
                />
              ) : (
                <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gold text-white font-heading font-bold text-2xl">
                  {siteConfig.name.charAt(0)}
                </span>
              )}
              <span className="font-heading text-2xl font-extrabold tracking-tight">{siteConfig.name}</span>
            </div>
            <p className="text-white/40 text-sm font-sans leading-relaxed mb-8 max-w-sm">
              {siteConfig.tagline}
            </p>

            {hasSocial && (
              <div className="flex gap-2 mb-8">
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

            <BoatworkBadge
              profileUrl={siteConfig.badge?.profileUrl}
              badgeUrl={siteConfig.badge?.badgeUrl}
              svgUrl={siteConfig.badge?.svgUrl}
              embedCode={siteConfig.badge?.embedCode}
              inverted={true}
            />
          </div>

          {/* Right — Navigation + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-heading font-bold uppercase tracking-wider text-white/30 mb-4">Pages</p>
              <ul className="space-y-2.5">
                {navLinks.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="text-white/50 text-sm hover:text-white transition-colors font-sans">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

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
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 text-center text-white/25 text-xs font-sans">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
