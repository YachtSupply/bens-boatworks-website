import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ParkedBlock } from '@/lib/aiContent';

// SEO-DUP-7b landing: shown when a mini-site's subscription has ended.
// Keeps the DNS/domain pointing at Vercel (so inbound traffic still
// resolves) but flips the content to a "no longer available" message
// plus similar-pro cross-sells linking back to boatwork.co. layout.tsx
// flips metadata to robots:noindex when this renders — we don't want
// Google indexing the parked state.
export function ParkedLanding({
  parked,
  businessName,
}: {
  parked: ParkedBlock;
  businessName: string;
}) {
  const { similarContractors } = parked;
  return (
    <main className="min-h-screen flex items-center justify-center bg-sand px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">
          No longer available
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-brand tracking-tight mb-4">
          {businessName} is no longer available on Boatwork.
        </h1>
        <p className="text-ink-muted text-base leading-relaxed mb-10">
          Looking for similar marine services? Here are a few verified pros you might check out.
        </p>

        {similarContractors.length > 0 ? (
          <ul className="grid gap-3 mb-10 text-left">
            {similarContractors.map((c) => (
              <li key={c.slug}>
                <Link
                  href={c.profileUrl}
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-sand-dark bg-white px-5 py-4 transition hover:border-accent/50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-heading font-bold text-brand truncate">
                        {c.name}
                      </div>
                      <div className="text-sm text-ink-muted truncate">
                        {c.primarySpecialty ?? 'Marine services'}
                        {c.city ? ` · ${c.city}${c.state ? `, ${c.state}` : ''}` : ''}
                      </div>
                    </div>
                    {typeof c.googleRating === 'number' && c.googleReviewCount ? (
                      <div className="flex-shrink-0 text-sm text-ink-muted">
                        ★ {c.googleRating.toFixed(1)}
                        <span className="text-ink-light"> · {c.googleReviewCount}</span>
                      </div>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-muted mb-10">
            Browse verified marine pros on Boatwork to find someone local.
          </p>
        )}

        <Link
          href="https://boatwork.co/pro"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider px-7 py-4 transition-colors"
        >
          Browse all pros on Boatwork
          <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </main>
  );
}
