'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiPhone, FiArrowRight } from 'react-icons/fi';
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
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Minimal header — logo + menu icon only */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? 'bg-white shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={displayName}
                  width={40}
                  height={40}
                  className="rounded-xl object-cover flex-shrink-0"
                  unoptimized
                />
              ) : (
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-xl font-heading font-bold text-base flex-shrink-0 transition-colors ${
                    scrolled && !open ? 'bg-navy text-white' : 'bg-white/20 text-white'
                  }`}
                >
                  {displayName.charAt(0)}
                </span>
              )}
              <span className={`font-heading font-bold text-lg tracking-tight transition-colors ${
                scrolled && !open ? 'text-navy' : 'text-white'
              }`}>
                {displayName}
              </span>
            </Link>

            {/* Menu toggle */}
            <button
              className={`p-2 transition-colors ${
                scrolled && !open ? 'text-navy hover:text-gold' : 'text-white hover:text-gold'
              }`}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-navy pt-20 flex flex-col transition-all duration-500 ease-in-out ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex-1 flex items-center justify-center">
          <nav className="flex flex-col items-center gap-2">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white/30 hover:text-gold transition-all duration-300 py-1 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className={`border-t border-white/10 px-5 sm:px-8 py-6 flex items-center justify-between transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: open ? '500ms' : '0ms' }}
        >
          {phone ? (
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-sm font-sans"
            >
              <FiPhone size={14} /> {phone}
            </a>
          ) : (
            <span />
          )}
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm whitespace-nowrap"
            onClick={() => setOpen(false)}
          >
            Get a Quote <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
