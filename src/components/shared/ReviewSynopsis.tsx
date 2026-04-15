import { Star } from 'lucide-react';

interface ReviewSynopsisProps {
  businessName: string;
  aggregateRating: number;
  totalReviewCount: number;
  summary: string;
  keywords: string[];
}

export function ReviewSynopsis({ businessName, aggregateRating, totalReviewCount, summary, keywords }: ReviewSynopsisProps) {
  const fullStars = Math.round(aggregateRating);

  return (
    <div className="bg-white rounded-2xl p-8 mb-8 flex flex-col md:flex-row gap-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex flex-col items-center justify-center">
          <span className="text-2xl font-heading font-extrabold text-accent">{aggregateRating.toFixed(1)}</span>
        </div>
        <div>
          <div className="flex gap-0.5 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} strokeWidth={0} fill={i < fullStars ? '#d4654a' : '#e8dfd6'} />
            ))}
          </div>
          <p className="text-ink-muted text-[13px]">{totalReviewCount} reviews</p>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-ink text-[14px] leading-relaxed mb-3">{summary}</p>
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {keywords.slice(0, 6).map((kw) => (
              <span key={kw} className="text-[11px] font-medium text-ink-muted bg-sand px-2.5 py-1 rounded-full">{kw}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
