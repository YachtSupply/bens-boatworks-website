export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSiteData } from '@/lib/siteData';
import { SafeHtmlImage } from '@/components/shared';
import { ArrowRight, Pin } from 'lucide-react';
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
        className="text-accent hover:text-accent-dark underline transition-colors"
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
      <article className="bg-white rounded-2xl p-6 md:p-7">
        <div className="flex items-center gap-3 mb-4">
          {logoUrl ? (
            <SafeHtmlImage
              src={logoUrl}
              alt={businessName}
              placeholderContent={
                <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-heading font-bold text-sm">
                  {businessName.charAt(0)}
                </div>
              }
              showPlaceholder
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-heading font-bold text-sm">
              {businessName.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-brand text-sm">{businessName}</p>
            <p className="text-ink-light text-[12px]">{formatRelativeTime(update.publishedAt)}</p>
          </div>
          {update.isPinned && (
            <span className="inline-flex items-center gap-1 text-accent text-[11px] font-semibold uppercase tracking-wider">
              <Pin size={11} strokeWidth={2} /> Pinned
            </span>
          )}
        </div>

        {update.title && (
          <h2 className="font-heading text-xl font-extrabold text-brand tracking-tight mb-3">{update.title}</h2>
        )}

        <div className="text-ink-muted text-sm leading-relaxed whitespace-pre-line mb-4">
          {linkifyContent(truncated)}
        </div>

        {update.slug && (
          <Link href={`/news/${update.slug}`} className="text-accent hover:text-accent-dark text-[13px] font-semibold flex items-center gap-1.5 transition-colors">
            Read more <ArrowRight size={14} strokeWidth={2} />
          </Link>
        )}
      </article>
    );
  }

  return (
    <article className="bg-white rounded-2xl p-6 md:p-7">
      <div className="flex items-center gap-3 mb-4">
        {logoUrl ? (
          <SafeHtmlImage
            src={logoUrl}
            alt={businessName}
            placeholderContent={
              <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-heading font-bold text-sm">
                {businessName.charAt(0)}
              </div>
            }
            showPlaceholder
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-heading font-bold text-sm">
            {businessName.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-brand text-sm">{businessName}</p>
          <p className="text-ink-light text-[12px]">{formatRelativeTime(update.publishedAt)}</p>
        </div>
        {update.isPinned && (
          <span className="inline-flex items-center gap-1 text-accent text-[11px] font-semibold uppercase tracking-wider">
            <Pin size={11} strokeWidth={2} /> Pinned
          </span>
        )}
      </div>

      <div className="text-ink-muted text-sm leading-relaxed whitespace-pre-line mb-4">
        {linkifyContent(update.content)}
      </div>

      {hasLinkPreview && (
        <a
          href={update.linkUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-sand-dark overflow-hidden hover:border-accent/30 transition-colors"
        >
          {update.linkImage && (
            <div className="aspect-[2/1] overflow-hidden">
              <img
                src={update.linkImage}
                alt={update.linkTitle ?? ''}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <p className="font-heading font-bold text-brand text-sm mb-1">{update.linkTitle}</p>
            {update.linkDescription && (
              <p className="text-ink-muted text-[13px] line-clamp-2">{update.linkDescription}</p>
            )}
            {update.linkDomain && (
              <p className="text-ink-light text-[11px] mt-2">{update.linkDomain}</p>
            )}
          </div>
        </a>
      )}

      {hasImage && (
        <div className="rounded-xl overflow-hidden mt-2">
          <img
            src={update.imageUrl!}
            alt={update.imageAlt ?? ''}
            className="w-full h-auto"
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
      {/* ─── HERO ─── */}
      <section className="bg-brand text-white pt-[72px]">
        <div className="max-w-page mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">News</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">News &amp; Updates</h1>
            <p className="text-white/50 text-base leading-relaxed">The latest from {siteConfig.name}</p>
          </div>
        </div>
      </section>

      {/* ─── FEED ─── */}
      <section className="bg-sand py-24 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto space-y-5">
          {updates.map((update) => (
            <UpdatePost
              key={update.id}
              update={update}
              businessName={siteConfig.name}
              logoUrl={siteConfig.logoUrl || undefined}
            />
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-brand py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto text-center max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Need Marine Services?</h2>
          <p className="text-white/50 text-base leading-relaxed mb-8">
            Contact our team today to discuss your vessel and get a personalized quote.
          </p>
          <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider px-7 py-4 rounded-full transition-colors inline-flex items-center gap-2">
            Get a Quote <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
