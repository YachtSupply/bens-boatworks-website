'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/site.config';

const ALL_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio', requires: 'portfolio' as const },
  { href: '/news', label: 'News', requires: 'updates' as const },
  { href: '/contact', label: 'Contact' },
];

interface NavbarProps {
  logoUrl?: string;
  name?: string;
  hasPortfolio?: boolean;
  hasUpdates?: boolean;
  phone?: string | null;
}

export function Navbar({ logoUrl, name, hasPortfolio = false, hasUpdates = false, phone }: NavbarProps) {
  const flags = { portfolio: hasPortfolio, updates: hasUpdates };
  const links = ALL_LINKS.filter((l) => !l.requires || flags[l.requires]);
  const [open, setOpen] = useState(false);
  const displayName = name || siteConfig.name;

  return (
    <nav>
      <div>
        <Link href="/">
          {logoUrl ? (
            <Image src={logoUrl} alt={displayName} width={40} height={40} unoptimized />
          ) : (
            <span>{displayName.charAt(0)}</span>
          )}
          <span>{displayName}</span>
        </Link>

        <div>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>

        <div>
          {phone && (
            <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
          )}
          <Link href="/contact">Get a Quote</Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          {phone && (
            <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
          )}
          <Link href="/contact" onClick={() => setOpen(false)}>Get a Quote</Link>
        </div>
      )}
    </nav>
  );
}
