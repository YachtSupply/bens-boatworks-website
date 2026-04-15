export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSiteData } from '@/lib/siteData';
import { SafeHtmlImage } from '@/components/shared';
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
      <article>
        <div>
          {logoUrl ? (
            <SafeHtmlImage
              src={logoUrl}
              alt={businessName}
              placeholderContent={
                <div>
                  {businessName.charAt(0)}
                </div>
              }
              showPlaceholder
            />
          ) : (
            <div>
              {businessName.charAt(0)}
            </div>
          )}
          <div>
            <p>{businessName}</p>
            <p>{formatRelativeTime(update.publishedAt)}</p>
          </div>
          {update.isPinned && (
            <span>Pinned</span>
          )}
        </div>

        {update.title && (
          <h2>{update.title}</h2>
        )}

        <div>
          {linkifyContent(truncated)}
        </div>

        {update.slug && (
          <Link href={`/news/${update.slug}`}>
            Read more →
          </Link>
        )}
      </article>
    );
  }

  return (
    <article>
      <div>
        {logoUrl ? (
          <SafeHtmlImage
            src={logoUrl}
            alt={businessName}
            placeholderContent={
              <div>
                {businessName.charAt(0)}
              </div>
            }
            showPlaceholder
          />
        ) : (
          <div>
            {businessName.charAt(0)}
          </div>
        )}
        <div>
          <p>{businessName}</p>
          <p>{formatRelativeTime(update.publishedAt)}</p>
        </div>
        {update.isPinned && (
          <span>Pinned</span>
        )}
      </div>

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

      {hasImage && (
        <div>
          <img
            src={update.imageUrl!}
            alt={update.imageAlt ?? ''}
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
      <section>
        <div>
          <h1>News &amp; Updates</h1>
          <p>The latest from {siteConfig.name}</p>
        </div>
      </section>

      <section>
        <div>
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

      <section>
        <div>
          <h2>Need Marine Services?</h2>
          <p>
            Contact our team today to discuss your vessel and get a personalized quote.
          </p>
          <Link href="/contact">
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
