'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/site.config';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
  logoUrl?: string;
  name?: string;
}

export function Logo({ size = 'md', inverted = false, logoUrl, name }: LogoProps) {
  const imgSize = { sm: 40, md: 48, lg: 64 }[size];
  const textSize = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }[size];
  const src = logoUrl ?? '';
  const displayName = name || siteConfig.name;
  const hasLogo = !!src;

  const [shape, setShape] = useState<'circle' | 'rounded' | 'loading'>('loading');
  const [error, setError] = useState(false);

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    setShape(ratio >= 0.75 && ratio <= 1.33 ? 'circle' : 'rounded');
  }, []);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  const isCircle = shape === 'circle' || shape === 'loading';

  return (
    <Link href="/" className="flex items-center gap-3 group">
      {hasLogo && !error ? (
        <Image
          src={src}
          alt={displayName}
          width={imgSize}
          height={imgSize}
          className={`flex-shrink-0 ${isCircle ? 'rounded-xl object-cover' : 'rounded-xl object-contain'}`}
          unoptimized
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <span
          className={`flex items-center justify-center rounded-xl flex-shrink-0 font-heading font-bold ${
            inverted ? 'bg-gold text-white' : 'bg-navy text-white'
          }`}
          style={{ width: imgSize, height: imgSize, fontSize: imgSize * 0.4 }}
        >
          {displayName.charAt(0)}
        </span>
      )}
      <span
        className={`font-heading font-bold tracking-tight ${textSize} ${
          inverted ? 'text-white' : 'text-navy'
        } group-hover:text-gold transition-colors`}
      >
        {displayName}
      </span>
    </Link>
  );
}
