'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const displayName = name || siteConfig.name;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}>
        <div className="max-w-page mx-auto px-5 sm:px-8 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            {logoUrl ? (
              <Image src={logoUrl} alt={displayName} width={32} height={32} className="rounded-lg object-cover" unoptimized />
            ) : (
              <span className="w-8 h-8 rounded-lg bg-brand text-white font-heading font-bold text-sm flex items-center justify-center">
                {displayName.charAt(0)}
              </span>
            )}
            <span className="font-heading font-bold text-brand text-[15px]">{displayName}</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-[13px] font-medium text-ink-muted hover:text-brand transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-4">
            {phone && (
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-[13px] text-ink-muted hover:text-brand transition-colors flex items-center gap-1.5">
                <Phone size={13} strokeWidth={1.5} /> {phone}
              </a>
            )}
            <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white text-[12px] font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors">
              Get a Quote
            </Link>
          </div>

          {/* Mobile */}
          <button className="lg:hidden text-brand p-1" onClick={() => setOpen(!open)} aria-label={open ? 'Close' : 'Menu'}>
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <div className={`fixed inset-0 z-40 bg-brand transition-all duration-500 ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="h-[72px]" />
        <div className="flex-1 flex flex-col items-start justify-center h-[calc(100vh-72px-80px)] px-8 sm:px-12">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white/30 hover:text-accent transition-all duration-300 py-2 ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className={`border-t border-white/10 px-8 sm:px-12 py-5 flex items-center justify-between transition-all duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`} style={{ transitionDelay: open ? '350ms' : '0ms' }}>
          {phone ? (
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-white/40 hover:text-accent text-sm flex items-center gap-2 transition-colors">
              <Phone size={14} strokeWidth={1.5} /> {phone}
            </a>
          ) : <span />}
          <Link href="/contact" className="bg-accent text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center gap-2" onClick={() => setOpen(false)}>
            Get a Quote <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </>
  );
}
