export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
      <section>
        <div>
          <h1>{update.title ?? 'Update'}</h1>
          <p>{formatDate(update.publishedAt)}</p>
        </div>
      </section>

      <section>
        <div>
          <Link href="/news">
            ← Back to News
          </Link>

          <article>
            {hasImage && (
              <div>
                <img
                  src={update.imageUrl!}
                  alt={update.imageAlt ?? update.title ?? ''}
                />
              </div>
            )}

            <div>
              {linkifyContent(update.content)}
            </div>

            {hasLinkPreview && (
              <a
                href={update.linkUrl!}
                target="_blank"
                rel="noopener noreferrer"
              >
                {update.linkImage && (
                  <div>
                    <img
                      src={update.linkImage}
                      alt={update.linkTitle ?? ''}
                    />
                  </div>
                )}
                <div>
                  <p>{update.linkTitle}</p>
                  {update.linkDescription && (
                    <p>{update.linkDescription}</p>
                  )}
                  {update.linkDomain && (
                    <p>{update.linkDomain}</p>
                  )}
                </div>
              </a>
            )}
          </article>

          <div>
            <Link href="/news">
              ← Back to News
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
