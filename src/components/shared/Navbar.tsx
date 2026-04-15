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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
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
                  scrolled ? 'bg-navy text-white' : 'bg-white/20 text-white'
                }`}
              >
                {displayName.charAt(0)}
              </span>
            )}
            <span className={`font-heading font-bold text-lg tracking-tight transition-colors ${
              scrolled ? 'text-navy' : 'text-white'
            }`}>
              {displayName}
            </span>
          </Link>

          {/* Desktop links — centered */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-gold after:rounded after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${
                  scrolled ? 'text-navy/70 hover:text-navy' : 'text-white/70 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  scrolled ? 'text-navy/60 hover:text-navy' : 'text-white/60 hover:text-white'
                }`}
              >
                <FiPhone size={14} />
                {phone}
              </a>
            )}
            <Link
              href="/contact"
              className="btn-gold flex items-center gap-2 px-5 py-2.5 text-sm whitespace-nowrap"
            >
              Get a Quote <FiArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-cream-dark px-5 py-6 flex flex-col gap-4 shadow-xl">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-navy py-1.5"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {phone && (
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-sm text-navy/60 py-1.5">
              <FiPhone size={14} /> {phone}
            </a>
          )}
          <Link href="/contact" className="btn-gold text-center px-6 py-3 mt-2" onClick={() => setOpen(false)}>
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
