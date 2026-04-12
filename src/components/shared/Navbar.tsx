'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiPhone, FiArrowRight } from 'react-icons/fi';
import { Logo } from './Logo';

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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg shadow-navy/5'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          <Logo logoUrl={logoUrl} name={name} />
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="navbar-link text-sm font-sans"
              >
                {l.label}
              </Link>
            ))}
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="flex items-center gap-1.5 text-sm font-sans font-medium text-navy/70 hover:text-navy transition-colors whitespace-nowrap"
              >
                <FiPhone size={14} className="text-gold" />
                {phone}
              </a>
            )}
            <Link
              href="/contact"
              className="btn-gold flex items-center gap-2 px-5 py-2.5 whitespace-nowrap"
            >
              Get a Quote
              <FiArrowRight size={14} />
            </Link>
          </div>
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-cream-dark bg-white px-4 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-sans font-medium text-navy py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-sm font-sans text-navy/70 py-1"
            >
              <FiPhone size={14} className="text-gold" />
              {phone}
            </a>
          )}
          <Link
            href="/contact"
            className="btn-gold text-center px-6 py-3 mt-2"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
