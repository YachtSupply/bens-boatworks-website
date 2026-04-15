export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { getSiteData } from '@/lib/siteData';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const siteConfig = await getSiteData();
  const update = siteConfig.updates.find((u) => u.slug === slug && u.isLongForm);
  if (!update) return {};

  const title = update.title ?? `Update from ${siteConfig.name}`;
  const description = update.content.slice(0, 160);

  return {
    title,
    description,
  };
}

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const siteConfig = await getSiteData();
  const update = siteConfig.updates.find((u) => u.slug === slug && u.isLongForm);

  if (!update) {
    redirect('/news');
  }

  const hasLinkPreview = update.linkUrl && update.linkTitle;
  const hasImage = update.imageUrl;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-brand text-white pt-[72px]">
        <div className="max-w-page mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">News</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">{update.title ?? 'Update'}</h1>
            <p className="text-white/40 text-sm">{formatDate(update.publishedAt)}</p>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE ─── */}
      <section className="bg-sand py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="text-accent hover:text-accent-dark text-[13px] font-semibold flex items-center gap-1.5 transition-colors mb-8">
            <ArrowLeft size={14} strokeWidth={2} /> Back to News
          </Link>

          <article className="bg-white rounded-2xl p-6 md:p-10">
            {hasImage && (
              <div className="rounded-xl overflow-hidden mb-8 -mx-2 md:-mx-4">
                <img
                  src={update.imageUrl!}
                  alt={update.imageAlt ?? update.title ?? ''}
                  className="w-full h-auto"
                />
              </div>
            )}

            <div className="text-ink text-base leading-relaxed whitespace-pre-line">
              {linkifyContent(update.content)}
            </div>

            {hasLinkPreview && (
              <a
                href={update.linkUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-sand-dark overflow-hidden hover:border-accent/30 transition-colors mt-8"
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
          </article>

          <div className="mt-8">
            <Link href="/news" className="text-accent hover:text-accent-dark text-[13px] font-semibold flex items-center gap-1.5 transition-colors">
              <ArrowLeft size={14} strokeWidth={2} /> Back to News
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
