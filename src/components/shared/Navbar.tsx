'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? 'bg-navy shadow-xl shadow-navy/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-page mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              {logoUrl ? (
                <Image src={logoUrl} alt={displayName} width={36} height={36} className="rounded-lg object-cover" unoptimized />
              ) : (
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold text-navy font-serif text-lg">
                  {displayName.charAt(0)}
                </span>
              )}
              <span className="font-sans font-semibold text-white text-sm tracking-wide">
                {displayName}
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-white/60 hover:text-gold text-sm font-medium tracking-wide transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-5">
              {phone && (
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                  <Phone size={14} strokeWidth={1.5} />
                  <span>{phone}</span>
                </a>
              )}
              <Link
                href="/contact"
                className="bg-gold hover:bg-gold-dark text-navy font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded transition-colors"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white/80 hover:text-white p-1 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy flex flex-col transition-all duration-500 ease-in-out ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="h-20" /> {/* spacer for nav bar */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-serif text-4xl sm:text-5xl md:text-6xl text-white/25 hover:text-gold transition-all duration-300 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div
          className={`border-t border-white/10 px-5 sm:px-8 py-5 flex items-center justify-between transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: open ? '400ms' : '0ms' }}
        >
          {phone ? (
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-white/40 hover:text-gold text-sm transition-colors">
              <Phone size={14} strokeWidth={1.5} /> {phone}
            </a>
          ) : <span />}
          <Link
            href="/contact"
            className="bg-gold hover:bg-gold-dark text-navy font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded inline-flex items-center gap-2 transition-colors"
            onClick={() => setOpen(false)}
          >
            Get a Quote <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </>
  );
}
