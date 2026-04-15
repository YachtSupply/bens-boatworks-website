import Link from 'next/link';
import Image from 'next/image';
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

  return (
    <footer>
      <div>
        {/* Brand */}
        <div>
          {siteConfig.logoUrl ? (
            <Image src={siteConfig.logoUrl} alt={siteConfig.name} width={48} height={48} unoptimized />
          ) : (
            <span>{siteConfig.name.charAt(0)}</span>
          )}
          <span>{siteConfig.name}</span>
          <p>{siteConfig.tagline}</p>
        </div>

        {/* Social */}
        <div>
          {siteConfig.social.facebook && <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
          {siteConfig.social.instagram && <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
          {siteConfig.social.linkedin && <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {siteConfig.social.youtube && <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>}
        </div>

        {/* Navigation */}
        <div>
          <ul>
            {navLinks.map(([href, label]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          {phone && <a href={phone.href ?? `tel:${siteConfig.phone}`}>{phone.display ?? siteConfig.phone}</a>}
          {siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
          {siteConfig.address && <span>{siteConfig.address}</span>}
        </div>

        {/* Badge */}
        <BoatworkBadge
          profileUrl={siteConfig.badge?.profileUrl}
          badgeUrl={siteConfig.badge?.badgeUrl}
          svgUrl={siteConfig.badge?.svgUrl}
          embedCode={siteConfig.badge?.embedCode}
          inverted={true}
        />
      </div>

      <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
    </footer>
  );
}
