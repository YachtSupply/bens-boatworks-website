export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi';
import { getSiteData } from '@/lib/siteData';
import { SectionWrapper, SafeHtmlImage } from '@/components/shared';
import type { BoatworkUpdate } from '@/lib/boatwork';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const apiSeo = siteConfig.apiSeo;
  return {
    title: apiSeo?.titles?.news ?? `News & Updates — ${siteConfig.name}`,
    description: apiSeo?.metaDescriptions?.news ?? `Latest news and updates from ${siteConfig.name} in ${siteConfig.city}, ${siteConfig.state}.`,
    alternates: {
      canonical: apiSeo?.canonicals?.news ?? (siteUrl ? `${siteUrl}/news` : '/news'),
    },
  };
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  const sameYear = date.getFullYear() === now.getFullYear();
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  });
}

function linkifyContent(text: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const url = match[1];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-navy underline decoration-gold/40 hover:decoration-gold transition-colors break-all"
      >
        {url}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function UpdatePost({ update, businessName, logoUrl }: { update: BoatworkUpdate; businessName: string; logoUrl?: string }) {
  const hasLinkPreview = update.linkUrl && update.linkTitle;
  const hasImage = update.imageUrl && !hasLinkPreview;

  if (update.isLongForm) {
    const truncated = update.content.length > 500
      ? update.content.slice(0, 500) + '...'
      : update.content;

    return (
      <article className="bg-white border border-cream-dark rounded-2xl p-8 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <SafeHtmlImage
              src={logoUrl}
              alt={businessName}
              className="w-12 h-12 rounded-full object-cover border border-cream-dark flex-shrink-0"
              placeholderContent={
                <div className="w-12 h-12 rounded-full bg-gold text-navy flex items-center justify-center font-heading font-bold text-base flex-shrink-0">
                  {businessName.charAt(0)}
                </div>
              }
              showPlaceholder
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gold text-navy flex items-center justify-center font-heading font-bold text-base flex-shrink-0">
              {businessName.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-heading font-semibold text-navy truncate">{businessName}</p>
            <p className="text-text-light text-sm font-sans">{formatRelativeTime(update.publishedAt)}</p>
          </div>
          {update.isPinned && (
            <span className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full flex-shrink-0">
              <FiMapPin size={10} />
              Pinned
            </span>
          )}
        </div>

        {/* Long-form title */}
        {update.title && (
          <h2 className="font-heading text-2xl font-bold text-navy leading-snug">
            {update.title}
          </h2>
        )}

        {/* Truncated content */}
        <div className="text-text font-sans leading-relaxed whitespace-pre-line">
          {linkifyContent(truncated)}
        </div>

        {/* Read more link */}
        {update.slug && (
          <Link
            href={`/news/${update.slug}`}
            className="self-start text-navy font-sans font-semibold text-sm underline decoration-gold/40 hover:decoration-gold transition-colors"
          >
            Read more →
          </Link>
        )}
      </article>
    );
  }

  return (
    <article className="bg-white border border-cream-dark rounded-2xl p-8 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <SafeHtmlImage
            src={logoUrl}
            alt={businessName}
            className="w-12 h-12 rounded-full object-cover border border-cream-dark flex-shrink-0"
            placeholderContent={
              <div className="w-12 h-12 rounded-full bg-gold text-navy flex items-center justify-center font-heading font-bold text-base flex-shrink-0">
                {businessName.charAt(0)}
              </div>
            }
            showPlaceholder
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gold text-navy flex items-center justify-center font-heading font-bold text-base flex-shrink-0">
            {businessName.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-heading font-semibold text-navy truncate">{businessName}</p>
          <p className="text-text-light text-sm font-sans">{formatRelativeTime(update.publishedAt)}</p>
        </div>
        {update.isPinned && (
          <span className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full flex-shrink-0">
            <FiMapPin size={10} />
            Pinned
          </span>
        )}
      </div>

      {/* Full content — no truncation */}
      <div className="text-text font-sans leading-relaxed whitespace-pre-line">
        {linkifyContent(update.content)}
      </div>

      {/* Link preview card */}
      {hasLinkPreview && (
        <a
          href={update.linkUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-cream-dark rounded-lg overflow-hidden hover:border-gold/40 transition-colors"
        >
          {update.linkImage && (
            <div className="relative w-full h-52 bg-cream">
              <img
                src={update.linkImage}
                alt={update.linkTitle ?? ''}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-5">
            <p className="font-heading font-bold text-navy mb-1 line-clamp-2">{update.linkTitle}</p>
            {update.linkDescription && (
              <p className="text-text-light font-sans text-sm leading-relaxed line-clamp-3 mb-2">
                {update.linkDescription}
              </p>
            )}
            {update.linkDomain && (
              <p className="text-text-light/60 font-sans text-xs">{update.linkDomain}</p>
            )}
          </div>
        </a>
      )}

      {/* Standalone image */}
      {hasImage && (
        <div className="rounded-lg overflow-hidden">
          <img
            src={update.imageUrl!}
            alt={update.imageAlt ?? ''}
            className="w-full max-h-[28rem] object-cover rounded-lg"
          />
        </div>
      )}
    </article>
  );
}

export default async function NewsPage() {
  const siteConfig = await getSiteData();
  const updates = siteConfig.updates;

  if (updates.length === 0) {
    redirect('/');
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="section-divider-center mb-5" style={{ background: 'rgba(255,255,255,0.3)' }} />
          <h1 className="font-heading text-5xl font-extrabold mb-4 tracking-tight">News & Updates</h1>
          <p className="text-white/60 font-sans text-lg">
            The latest from {siteConfig.name}
          </p>
        </div>
      </section>

      <SectionWrapper variant="cream">
        <div className="max-w-2xl mx-auto space-y-6">
          {updates.map((update) => (
            <UpdatePost
              key={update.id}
              update={update}
              businessName={siteConfig.name}
              logoUrl={siteConfig.logoUrl || undefined}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="navy">
        <div className="text-center py-8">
          <h2 className="font-heading text-4xl font-extrabold mb-4 tracking-tight">Need Marine Services?</h2>
          <p className="text-white/50 font-sans mb-8 max-w-xl mx-auto text-lg">
            Contact our team today to discuss your vessel and get a personalized quote.
          </p>
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 whitespace-nowrap"
          >
            Get a Quote <FiArrowRight size={14} />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
